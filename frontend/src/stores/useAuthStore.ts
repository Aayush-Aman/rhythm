import { axiosInstance } from '@/lib/axios';
import {create } from 'zustand';

interface Admin {
    isAdmin:boolean;
    isLoading:boolean;
    error:string | null;

    reset: ()=>void;
    checkAdminStatus: ()=>Promise<void>;
}

export const useAuthStore = create<Admin>((set)=>({
    isAdmin:false,
    isLoading:false,
    error:null,

    reset:()=>{
        set({
            isAdmin:false,
            isLoading:false,
            error:null
        })

    },

    checkAdminStatus: async()=>{
        set({isLoading:true, error:null});
        try{
            const response = await axiosInstance.get('/admin/check');
            set({isAdmin:response.data.isAdmin});

        }
        catch(err:any){
            set({error:err.message || 'Failed to check admin status'});
        }
        finally{
            set({isLoading:false});
        }
    }

}))