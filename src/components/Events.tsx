import { Event } from './Event';
import { Timeline } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { TextInput } from './TextInput';
import { useQuery } from 'react-query';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { EventsType } from '../views/Timeline';
export function Events() {
    const { data: events, isLoading } = useQuery('fetchEvents', async () => {
        const { uid } = auth.currentUser!;
        const ref = doc(firestore, uid, '2022-02-19');
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
            return snapshot.data() as EventsType;
        }
        return {};
    });
    const sortedKeys = events
        ? Object.keys(events).sort(
              (key1: string, key2: string) =>
                  (events[key2].createdAt as number) -
                  (events[key1].createdAt as number)
          )
        : [];

    return (
        <Timeline style={{ margin: 0, padding: 0, width: 450 }}>
            <TextInput />
            {isLoading && (
                <CircularProgress
                    size={25}
                    style={{ marginTop: 10, marginLeft: 4 }}
                />
            )}
            {sortedKeys.map((key, index) => (
                <Event
                    key={key}
                    showConnector={sortedKeys.length !== index + 1}
                    event={events![key]}
                />
            ))}
        </Timeline>
    );
}
