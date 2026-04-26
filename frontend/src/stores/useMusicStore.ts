import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import {create} from 'zustand'



interface MusicStore {
    albums:Album[];
    songs:Song[];
    isLoading:boolean;
    error:string | null;
    currentAlbum:Album | null;
    featuredSongs:Song[];
    trendingSongs:Song[];
    MadeForYouSongs:Song[];

    fetchAlbums:()=>Promise<void>;
    fetchAlbumById:(albumId:string)=>Promise<void>;
    fetchFeaturedSongs:()=>Promise<void>;
    fetchTrendingSongs:()=>Promise<void>;
    fetchMadeForYouSongs:()=>Promise<void>;

}


export const useMusicStore = create<MusicStore>((set)=>({
    albums:[],
    songs:[],
    isLoading:false,
    error:null,
    currentAlbum:null,
    featuredSongs:[],
    trendingSongs:[],
    MadeForYouSongs:[],


    fetchAlbums:async()=>{
        set({isLoading:true,error:null});

        try{
            const response = await axiosInstance.get('/albums');
            set({albums:response.data})
        }
        catch(err:any){
            set({error:err.message || 'Failed to fetch albums'})
        }
        finally{
            set({isLoading:false})
        }



    },
    fetchAlbumById:async(albumId:string)=>{
        set({isLoading:true,error:null});
        try{
            const response = await axiosInstance.get(`/albums/${albumId}`);
            set({currentAlbum:response.data})
            console.log("Album fetched successfully:", response.data);
        }
        catch(err:any){
            set({error:err.message || 'Failed to fetch album'})
        }
        finally{
            set({isLoading:false})
        }
    },

    fetchFeaturedSongs:async()=>{
        set({isLoading:true,error:null});
        try{
            const response = await axiosInstance.get('songs/featured');
            set({featuredSongs:response.data});
        }
        finally{set({isLoading:false})}
    },

    fetchMadeForYouSongs:async()=>{
        set({isLoading:true,error:null});
         try{
            const response = await axiosInstance.get('songs/made-for-you');
            set({MadeForYouSongs:response.data});
         }
        catch(err:any){
            set({error:err.message || 'Failed to fetch made for you songs'})
        }
        finally{set({isLoading:false})}
    },
    
    fetchTrendingSongs:async()=>{
        set({isLoading:true,error:null});
         try{
            const response = await axiosInstance.get('songs/trending');
            set({trendingSongs:response.data});
         }
        catch(err:any){
            set({error:err.message || 'Failed to fetch trending songs'})
        }
        finally{set({isLoading:false})}
    }
}))
