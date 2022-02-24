import { Event } from './Event';
import { Timeline } from '@mui/lab';
import { CircularProgress, Typography } from '@mui/material';
import { TextInput } from './TextInput';
import { useQuery } from 'react-query';
import { auth, firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { EventsType } from '../views/Timeline';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
const CustomTimeline = styled(Timeline)`
    padding: 0;
    margin: 0;
    width: 450px;
    @media (max-width: 1000px) {
        width: 100%;
    }
`;
export function Events() {
    const currentDate = useRecoilValue(currentDateState);
    const { data: events, isLoading } = useQuery(
        ['fetchEvents', currentDate],
        async () => {
            const { uid } = auth.currentUser!;
            const ref = doc(firestore, uid, currentDate);
            const snapshot = await getDoc(ref);
            if (snapshot.exists()) {
                return snapshot.data() as EventsType;
            }
            return {};
        }
    );
    const sortedKeys = events
        ? Object.keys(events).sort(
              (key1: string, key2: string) =>
                  (events[key2].createdAt as number) -
                  (events[key1].createdAt as number)
          )
        : [];

    return (
        <CustomTimeline>
            <TextInput />
            {isLoading && (
                <CircularProgress
                    size={25}
                    style={{ marginTop: 10, marginLeft: 4 }}
                />
            )}
            {!isLoading && sortedKeys.length === 0 && (
                <Typography
                    color='#64748b'
                    variant='subtitle2'
                    style={{ paddingTop: 20 }}
                >
                    No Events Found...
                </Typography>
            )}
            {sortedKeys.map((key, index) => (
                <Event
                    key={key}
                    showConnector={sortedKeys.length !== index + 1}
                    event={events![key]}
                    id={key}
                />
            ))}
        </CustomTimeline>
    );
}
