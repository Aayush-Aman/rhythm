import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import {Loader} from "lucide-react";
import {useAuth} from "@clerk/clerk-react"

const updateApiToken=(token:string | null)=>{
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }

}

const Authprovider =({children}: {children: React.ReactNode})=>{
    const {getToken} = useAuth();
    const [loading,setLoading] = useState(true);
    const { checkAdminStatus, reset } = useAuthStore();

    useEffect(()=>{
        const initAuth =async()=>{
            try{
                const token = await getToken();
                updateApiToken(token);

                if (token) {
                    await checkAdminStatus();
                } else {
                    reset();
                }

            }
            catch(err){
                updateApiToken(null);
                reset();
                console.log("Error in auth provider ",err);
            }
            finally{
                setLoading(false);
            }
        };
        initAuth();
    },[checkAdminStatus, getToken, reset]);
    if(loading){
        return(
            <div>
                <Loader/>
            </div>
        )
    }
    return <>{children}</>
    
}

export default Authprovider;