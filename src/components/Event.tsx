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
    const paragraphs = description.split(/\r?\n/);
    return (
        <>
            <TimelineWrapper
                onClick={() => {
                    setShowDialog(true);
                }}
                showConnector={showConnector}
            >
                <h3 style={{ margin: 0, marginBottom: 5 }}>{title}</h3>
                <div>
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
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
                <EventItemFooter id={id} event={event} />
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
