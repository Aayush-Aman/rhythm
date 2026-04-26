import React, { useEffect } from 'react'
import { useChatStore } from '@/stores/useChatStore'; // Placeholder for music store
import { useUser } from '@clerk/clerk-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginPrompt from '@/pages/login prompt/LoginPrompt';
import { useAuthStore } from '@/stores/useAuthStore';


const FriendsActivity = () => {
  const { users, isLoading, fetchUsers } = useChatStore();
  const { user, isLoaded } = useUser(); 
  const { checkAdminStatus} = useAuthStore(); // Assuming you have an auth store to check admin status
  useEffect(() => {
    // Only fetch if the user is fully loaded and logged in
    if (isLoaded && user) {
      fetchUsers();
      checkAdminStatus();
    }
  }, [fetchUsers, user, isLoaded]);

  if (isLoading) {
    return (
      <div className='h-full bg-zinc-900 rounded-lg flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500' />
      </div>
    );
  }

  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
      {/* Header */}
      <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
        <div className='flex items-center gap-2'>
          <Users className='size-5 shrink-0 text-emerald-500' />
          <h2 className='font-semibold'>What they're listening to</h2>
        </div>
      </div>

      {!user ? (
        <LoginPrompt />
      ) : (
        <ScrollArea className='flex-1'>
          <div className='p-4 space-y-4'>
            {users.length === 0 ? (
               <p className='text-zinc-500 text-sm text-center mt-10'>No activity found</p>
            ) : (
              users.map((friend) => (
                <div
                  key={friend._id}
                  className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-all group'
                >
                  <div className='flex items-start gap-3'>
                    <div className='relative'>
                      <Avatar className='size-10 border border-zinc-800'>
                        <AvatarImage src={friend.imageUrl} alt={friend.fullName} />
                        <AvatarFallback>{friend.fullName?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      {/* Placeholder for Online/Offline Dot */}
                      <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-zinc-500' />
                    </div>

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium text-sm text-white truncate'>
                          {friend.fullName}
                        </span>
                      </div>
                      <p className='text-xs text-zinc-400 truncate'>Idle</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default FriendsActivity;