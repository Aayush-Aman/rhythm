import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
			<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjwEcKsiks6o93DUI1no4yX7u4xTf8TjTioA&s' alt='Google' className='size-5' />
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;
