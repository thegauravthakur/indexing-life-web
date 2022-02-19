import { EventType } from '../views/Timeline';
import { TimelineWrapper } from './TimelineWrapper';

interface EventProps {
    event: EventType;
    showConnector: boolean;
}
export function Event({ event, showConnector }: EventProps) {
    return (
        <TimelineWrapper onClick={() => {}} showConnector={showConnector}>
            <p>{event.description}</p>
        </TimelineWrapper>
    );
}
