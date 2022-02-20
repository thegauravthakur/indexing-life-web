import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Google } from '@mui/icons-material';
import { auth } from '../firebase';
import { Button, Typography } from '@mui/material';
export function LoginView() {
    const googleAuthProvider = new GoogleAuthProvider();
    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{}}>
                    <Typography
                        variant='h3'
                        style={{ fontWeight: 'bold' }}
                        align={'center'}
                    >
                        Welcome Back
                    </Typography>
                    <Typography
                        align='center'
                        style={{
                            maxWidth: 300,
                            margin: '0 auto',
                            marginBottom: 70,
                        }}
                    >
                        Just a minute away from experiencing clean UI experience
                    </Typography>

                    <Button
                        fullWidth
                        onClick={async () => {
                            await signInWithPopup(auth, googleAuthProvider);
                        }}
                        variant='outlined'
                        className={''}
                        startIcon={<Google />}
                    >
                        Login with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
