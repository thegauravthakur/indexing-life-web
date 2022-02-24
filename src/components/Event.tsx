import { EventType } from '../views/Timeline';
import { TimelineWrapper } from './TimelineWrapper';
import { EventItemFooter } from './EventItemFooter';
import { useState } from 'react';
import { EditDialog } from './EditDialog';

interface EventProps {
    event: EventType;
    showConnector: boolean;
    id: string;
}
export function Event({ event, showConnector, id }: EventProps) {
    const [showDialog, setShowDialog] = useState(false);
    const { description, title, image } = event;
    return (
        <>
            <TimelineWrapper
                onClick={() => {
                    setShowDialog(true);
                }}
                showConnector={showConnector}
            >
                <h3 style={{ margin: 0, marginBottom: 5 }}>{title}</h3>
                <p style={{ margin: 0 }}>{description}</p>
                {image && (
                    <img
                        width='100%'
                        style={{
                            height: 200,
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
            <EditDialog
                event={event}
                id={id}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </>
    );
}
