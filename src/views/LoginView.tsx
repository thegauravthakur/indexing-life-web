import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
export function LoginView() {
    const p = new GoogleAuthProvider();
    return (
        <div>
            <p>login page</p>
            <button
                onClick={() => {
                    signInWithPopup(auth, p);
                }}
            >
                login
            </button>
        </div>
    );
}
