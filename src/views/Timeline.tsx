import { NavigationBar } from '../components/AppBar';
import { Events } from '../components/Events';
import { Container, Typography } from '@mui/material';
import { format } from 'date-fns';
import { CustomCalendar } from '../components/CustomCalendar';
export interface EventType {
    createdAt: number;
    description: string;
    isLoved: boolean;
    image: string | null;
    title: string;
}

export type EventsType = Record<string, EventType>;

export function Timeline() {
    return (
        <div>
            <NavigationBar />
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 5,
                }}
            >
                <div>
                    <Typography
                        variant={'h4'}
                        sx={{
                            fontWeight: 'bold',
                            color: '#334155',
                            marginY: 3,
                        }}
                    >
                        {format(new Date(new Date()), 'EEEE do, yyyy')}
                    </Typography>
                    <Events />
                </div>
                <div style={{ paddingTop: 40 }}>
                    <CustomCalendar />
                </div>
            </Container>
        </div>
    );
}
