import {create} from 'zustand';
import type { Song } from '../types';

interface PlayState {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex: number) => void;
    setCurrentSong: (song:Song) => void;
    togglePlay: ()=>void;
    playNext: ()=>void;
    playPrevious: ()=>void;
}

export const useMusicPlayer = create<PlayState>((set,get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[])=>{
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex ===-1 ? 0 : get().currentIndex
        })

    },
    playAlbum: (songs:Song[],startIndex:number)=>{
        if(songs.length ===0) return;
        const song = songs[startIndex] || songs[0];
        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true

        })

    },
    setCurrentSong: (song:Song | null)=>{
        if(!song) return;
        const index = get().queue.findIndex(s => s._id === song._id);
        set({
            currentSong: song,
            currentIndex: index !== -1 ? index : get().currentIndex
        })
    },
    togglePlay: ()=>{
        const willStartPlaying = !get().isPlaying;

        set({
            isPlaying: willStartPlaying
        })

    },
    playNext: ()=>{
        const {queue,currentIndex} = get();
        const nextIndex= currentIndex + 1 ;
        if(nextIndex < queue.length){
            set({
                currentSong: queue[nextIndex],
                currentIndex: nextIndex,
                isPlaying: true
            })
        }
        else{
            set({
                isPlaying: false
            })
        }

    },
    playPrevious: ()=>{
        const {queue,currentIndex} = get();
        const prevIndex = currentIndex - 1;
        if(prevIndex >= 0){
            set({
                currentSong: queue[prevIndex],
                currentIndex: prevIndex,
                isPlaying: true
            })
        }
        else{
            set({
                isPlaying: false
            })
        }

    },

}));