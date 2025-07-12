import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, facebookProvider } from "../firebase";

// Facebook Login Handler using Firebase Auth
export const handleFacebookAuth = async (onSuccess, onError) => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    
    // Get the user's access token
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    
    console.log('Facebook login successful:', user.displayName);
    
    const userData = {
      token: accessToken,
      user: {
        name: user.displayName,
        email: user.email,
        facebookId: user.uid,
        photoURL: user.photoURL
      }
    };
    
    onSuccess(userData);
  } catch (error) {
    console.error('Facebook login error:', error);
    
    // Handle specific error cases
    if (error.code === 'auth/popup-closed-by-user') {
      onError("Facebook login was cancelled.");
    } else if (error.code === 'auth/popup-blocked') {
      onError("Facebook login popup was blocked. Please allow popups for this site.");
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      onError("An account already exists with the same email address but different sign-in credentials.");
    } else {
      onError("Facebook login failed. Please try again.");
    }
  }
}; 