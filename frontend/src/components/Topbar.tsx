import { Link } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/clerk-react"
import SignInAuthButtons from "./SignInAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
    const { isAdmin } = useAuthStore();
    const { isSignedIn } = useAuth();
    console.log("Admin status: ", isAdmin);
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '>
        <div className='flex gap-2 items-center'>
            rhythm
        </div>
        <div className='flex items-center gap-4'>
            {isAdmin && (
                <Link to={"/admin"}>
                    Admin Dashboard
                </Link>
            )}
            {!isSignedIn && (
                <SignInAuthButtons/>
            )}
            <UserButton />
        </div>
    </div>
  )
}

export default Topbar