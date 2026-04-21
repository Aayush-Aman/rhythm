import { Loader, } from 'lucide-react'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { axiosInstance } from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'

const authCallbackPage = () => {
  const {isLoaded,user}=useUser();
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!isLoaded || !user)return;

    const syncUser =async()=>{
      try{
        await axiosInstance.post('/auth/callback',{
          id:user.id,
          firstName:user.firstName,
          lastName:user.lastName,
          imageUrl:user.imageUrl,
        })
        console.log("User data synced successfully");
      }
      catch(err){
        console.log("Error syncing user data:",err);
    
      }
      finally{
        navigate("/");
      }

    }
    syncUser();
    
  
  },[isLoaded,user]);


  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
			<Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
				<CardContent className='flex flex-col items-center gap-4 pt-6'>
					<Loader className='size-6 text-emerald-500 animate-spin' />
					<h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
					<p className='text-zinc-400 text-sm'>Redirecting...</p>
				</CardContent>
			</Card>
		</div>
  )
}

export default authCallbackPage
