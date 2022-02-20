import { EventType } from '../views/Timeline';
import { TimelineWrapper } from './TimelineWrapper';
import { EventItemFooter } from './EventItemFooter';

interface EventProps {
    event: EventType;
    showConnector: boolean;
}
export function Event({ event, showConnector }: EventProps) {
    const { description, title } = event;
    return (
        <TimelineWrapper onClick={() => {}} showConnector={showConnector}>
            <h3 style={{ margin: 0, marginBottom: 10 }}>{title}</h3>
            <p style={{ margin: 0 }}>{description}</p>
            <EventItemFooter event={event} />
        </TimelineWrapper>
    );
}
