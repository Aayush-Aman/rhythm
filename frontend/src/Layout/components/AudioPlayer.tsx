import { useMusicPlayer } from '@/stores/useMusicPlayer';
import React, { use, useEffect, useRef } from 'react'

export const AudioPlayer = () => {
    const audioRef =useRef<HTMLAudioElement | null>(null);
    const prevSongRef = useRef<string | null>(null);

    const {currentSong,isPlaying,playNext}= useMusicPlayer();

    //handling play and pause logic of an element 
    useEffect(()=>{
        if(isPlaying){
            audioRef.current?.play();
        }else{
            audioRef.current?.pause();
        }

    },[isPlaying])

    //handling when the songs end
    useEffect(()=>{
        const audio = audioRef.current;
        const handleEnded = ()=>{
            //yaha par jab 1 gana khatm hoga to dusra apne aap chalna chahiye 
            playNext();
        }

        audio?.addEventListener('ended',handleEnded)
        return ()=>{
            audio?.removeEventListener('ended',handleEnded)
        }
    },[playNext])

    //handling when the buttons like next,pause or previous are clicked
    useEffect(()=>{
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;

        //check if this is a new song i.e, the song has changed 

        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

        if(isSongChange){
            audio.src = currentSong?.audioUrl ;

            //reset the playback position 
            audio.currentTime = 0;

            prevSongRef.current = currentSong?.audioUrl;

            if(isPlaying){
                audio.play();
            }
        }
    },[currentSong,isPlaying])
  return (
    <audio />
  )
}
