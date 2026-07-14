import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types";
import { create } from "zustand";
import { io } from "socket.io-client";

interface ChatStore {
	users: User[];
	isLoading: boolean;
	error: string | null;
	socket: any;
	isConnected: boolean;
	currentUserId: string | null;
	onlineUsers: Set<string>;
	userActivities: Map<string, string>;
	messages: Message[];
	conversationMessages: Record<string, Message[]>;
	unreadConversations: Record<string, number>;
	selectedUser: User | null;

	fetchUsers: () => Promise<void>;
	initSocket: (userId: string) => void;
	disconnectSocket: () => void;
	sendMessage: (receiverId: string, senderId: string, content: string) => void;
	fetchMessages: (userId: string) => Promise<void>;
	setSelectedUser: (user: User | null) => void;
	selectConversation: (user: User) => Promise<void>;
}

const socketURL =
	import.meta.env.VITE_BACKEND_URL?.replace(/\/api\/?$/, "") ??
	(import.meta.env.MODE === "development" ? "http://localhost:3000" : "/");

const socket = io(socketURL, {
	autoConnect: false, // only connect if user is authenticated
	withCredentials: true,
});

const appendUniqueMessage = (messages: Message[], nextMessage: Message) => {
	if (messages.some((message) => message._id === nextMessage._id)) {
		return messages;
	}

	return [...messages, nextMessage];
};

export const useChatStore = create<ChatStore>((set, get) => ({
	users: [],
	isLoading: false,
	error: null,
	socket: socket,
	isConnected: false,
	currentUserId: null,
	onlineUsers: new Set(),
	userActivities: new Map(),
	messages: [],
	conversationMessages: {},
	unreadConversations: {},
	selectedUser: null,

	setSelectedUser: (user) =>
		set((state) => ({
			selectedUser: user,
			messages: user ? state.conversationMessages[user.clerkId] ?? [] : [],
			unreadConversations: user
				? {
					...state.unreadConversations,
					[user.clerkId]: 0,
				  }
				: state.unreadConversations,
		})),

	selectConversation: async (user) => {
		set((state) => ({
			selectedUser: user,
			messages: state.conversationMessages[user.clerkId] ?? [],
			unreadConversations: {
				...state.unreadConversations,
				[user.clerkId]: 0,
			},
		}));
		await get().fetchMessages(user.clerkId);
	},

	fetchUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users");
			const normalizedUsers = response.data.map((user: any) => ({
				...user,
				fullName: user.fullName ?? user.fullname ?? "",
			}));
			set({ users: normalizedUsers });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	initSocket: (userId) => {
		if (!get().isConnected) {
			set({ currentUserId: userId });
			socket.auth = { userId };
			socket.connect();

			socket.emit("user_connected", userId);

			socket.on("users_online", (users: string[]) => {
				set({ onlineUsers: new Set(users) });
			});

			socket.on("activities", (activities: [string, string][]) => {
				set({ userActivities: new Map(activities) });
			});

			socket.on("user_connected", (userId: string) => {
				set((state) => ({
					onlineUsers: new Set([...state.onlineUsers, userId]),
				}));
			});

			socket.on("user_disconnected", (userId: string) => {
				set((state) => {
					const newOnlineUsers = new Set(state.onlineUsers);
					newOnlineUsers.delete(userId);
					return { onlineUsers: newOnlineUsers };
				});
			});

			socket.on("receive_message", (message: Message) => {
				set((state) => {
					if (!state.currentUserId) return {};

					const conversationId =
						message.senderId === state.currentUserId ? message.receiverId : message.senderId;
					const updatedConversation = appendUniqueMessage(
						state.conversationMessages[conversationId] ?? [],
						message,
					);
						const isActiveConversation = state.selectedUser?.clerkId === conversationId;

					return {
						conversationMessages: {
							...state.conversationMessages,
							[conversationId]: updatedConversation,
						},
							messages: isActiveConversation ? updatedConversation : state.messages,
							unreadConversations: isActiveConversation
								? state.unreadConversations
								: {
									...state.unreadConversations,
									[conversationId]: (state.unreadConversations[conversationId] ?? 0) + 1,
								},
					};
				});
			});

			socket.on("message_sent", (message: Message) => {
				set((state) => {
					if (!state.currentUserId) return {};

					const conversationId =
						message.senderId === state.currentUserId ? message.receiverId : message.senderId;
					const updatedConversation = appendUniqueMessage(
						state.conversationMessages[conversationId] ?? [],
						message,
					);
						const isActiveConversation = state.selectedUser?.clerkId === conversationId;

					return {
						conversationMessages: {
							...state.conversationMessages,
							[conversationId]: updatedConversation,
						},
							messages: isActiveConversation ? updatedConversation : state.messages,
							unreadConversations: isActiveConversation
								? state.unreadConversations
								: {
									...state.unreadConversations,
									[conversationId]: (state.unreadConversations[conversationId] ?? 0) + 1,
								},
					};
				});
			});

			socket.on("activity_updated", ({ userId, activity }) => {
				set((state) => {
					const newActivities = new Map(state.userActivities);
					newActivities.set(userId, activity);
					return { userActivities: newActivities };
				});
			});

			set({ isConnected: true });
		}
	},

	disconnectSocket: () => {
		if (get().isConnected) {
			socket.disconnect();
			set({ isConnected: false });
		}
	},

	sendMessage: async (receiverId, senderId, content) => {
		const socket = get().socket;
		if (!socket) return;

		socket.emit("send_message", { receiverId, senderId, content });
	},

	fetchMessages: async (userId: string) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/users/messages/${userId}`);
			const fetchedMessages = Array.isArray(response.data) ? response.data : [];
			const mergedMessages = fetchedMessages.reduce(
				(accumulator: Message[], message: Message) => appendUniqueMessage(accumulator, message),
				get().conversationMessages[userId] ?? [],
			);
			set((state) => ({
				conversationMessages: {
					...state.conversationMessages,
					[userId]: mergedMessages,
				},
				unreadConversations: {
					...state.unreadConversations,
					[userId]: 0,
				},
				messages: state.selectedUser?.clerkId === userId ? mergedMessages : state.messages,
			}));
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));
