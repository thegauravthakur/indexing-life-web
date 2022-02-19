import { NavigationBar } from '../components/AppBar';
import { useQuery } from 'react-query';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { Events } from '../components/Events';

export interface EventType {
    createdAt: number;
    description: string;
    image: string | null;
    title: string;
}

export type EventsType = Record<string, EventType>;

export function Timeline() {
    const { data } = useQuery('fetchEvents', async () => {
        const { uid } = auth.currentUser!;
        const ref = doc(firestore, uid, '2022-02-19');
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            return snapshot.data();
        }
        return {};
    });

    return (
        <div>
            <NavigationBar />
            <Events />
        </div>
    );
}
