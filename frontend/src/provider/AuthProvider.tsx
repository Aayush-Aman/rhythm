import { axiosInstance } from "@/lib/axios";
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

    useEffect(()=>{
        const initAuth =async()=>{
            try{
                const token = await getToken();
                updateApiToken(token);

            }
            catch(err){
                updateApiToken(null);
                console.log("Error in auth provider ",err);
            }
            finally{
                setLoading(false);
            }
        };
        initAuth();
    },[getToken]);
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