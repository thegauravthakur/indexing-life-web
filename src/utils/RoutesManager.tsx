import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from 'firebase/auth';
import { auth } from '../firebase';
import { LoginView } from '../views/LoginView';
import { Timeline } from '../views/Timeline';

export function RoutesManager() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<Auth.User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((_user) => {
            setUser(_user);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <p>loading...</p>;
    }

    return (
        <Routes>
            <Route
                path='/'
                element={user ? <Timeline /> : <Navigate to={'/login'} />}
            />
            <Route
                path='/login'
                element={!user ? <LoginView /> : <Navigate to={'/'} />}
            />
        </Routes>
    );
}
