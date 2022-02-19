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
import { Add } from '@mui/icons-material';

interface TimelineWrapperProps {
    children: React.ReactNode;
    onClick: () => void;
    showConnector?: boolean;
}
export function TimelineWrapper({
    children,
    onClick,
    showConnector = true,
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
                        <Add fontSize={'small'} />
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
