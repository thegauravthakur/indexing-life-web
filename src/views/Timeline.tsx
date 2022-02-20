import { NavigationBar } from '../components/AppBar';
import { Events } from '../components/Events';
import { Container, Typography } from '@mui/material';
import { format } from 'date-fns';
import { CustomCalendar } from '../components/CustomCalendar';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
export interface EventType {
    createdAt: number;
    description: string;
    isLoved: boolean;
    image: string | null;
    title: string;
}

export type EventsType = Record<string, EventType>;

const CalendarWrapper = styled.div`
    padding-top: 90px;
    @media (max-width: 1000px) {
        display: none;
    }
`;
export function Timeline() {
    const currentDate = useRecoilValue(currentDateState);
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
                        {format(new Date(currentDate), 'EEEE do, yyyy')}
                    </Typography>
                    <Events />
                </div>
                <CalendarWrapper>
                    <CustomCalendar />
                </CalendarWrapper>
            </Container>
        </div>
    );
}
