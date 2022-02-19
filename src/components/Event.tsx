import { EventType } from '../views/Timeline';

interface EventProps {
    event: EventType;
}
export function Event({ event }: EventProps) {
    return (
        <div>
            <p>{event.description}</p>
        </div>
    );
}
