import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab';
import React from 'react';
import { IconButton } from '@mui/material';
import { Add, CreateOutlined } from '@mui/icons-material';

interface TimelineWrapperProps {
    children: React.ReactNode;
    onClick: () => void;
    showConnector?: boolean;
    showEditIcon?: boolean;
}
export function TimelineWrapper({
    children,
    onClick,
    showConnector = true,
    showEditIcon = true,
}: TimelineWrapperProps) {
    return (
        <TimelineItem>
            <TimelineOppositeContent style={{ display: 'none' }} />
            <TimelineSeparator>
                <TimelineDot sx={{ padding: 0, bgcolor: '#f1f5f9' }}>
                    <IconButton
                        size='small'
                        sx={{ margin: 0 }}
                        onClick={onClick}
                    >
                        {!showEditIcon ? (
                            <Add fontSize={'small'} />
                        ) : (
                            <CreateOutlined fontSize='small' />
                        )}
                    </IconButton>
                </TimelineDot>
                {showConnector && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ marginBottom: 4 }}>
                {children}
            </TimelineContent>
        </TimelineItem>
    );
}
