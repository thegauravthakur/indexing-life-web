import { EventType } from '../views/Timeline';
import { TimelineWrapper } from './TimelineWrapper';
import { EventItemFooter } from './EventItemFooter';

interface EventProps {
    event: EventType;
    showConnector: boolean;
}
export function Event({ event, showConnector }: EventProps) {
    const { description, title, image } = event;
    return (
        <TimelineWrapper onClick={() => {}} showConnector={showConnector}>
            <h3 style={{ margin: 0, marginBottom: 5 }}>{title}</h3>
            <p style={{ margin: 0 }}>{description}</p>
            {image && (
                <img
                    width='100%'
                    style={{
                        maxHeight: 200,
                        objectFit: 'cover',
                        borderRadius: 15,
                        margin: '10px 0 5px 0',
                    }}
                    src={image}
                    alt=''
                />
            )}
            <EventItemFooter event={event} />
        </TimelineWrapper>
    );
}
