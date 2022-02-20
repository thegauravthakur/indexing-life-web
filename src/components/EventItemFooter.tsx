import TimeAgo from 'react-timeago';
import { EventType } from '../views/Timeline';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
    FavoriteBorder,
    ShareOutlined,
    MoreVertOutlined,
    Favorite,
} from '@mui/icons-material';

interface EventItemFooterProps {
    event: EventType;
}
export function EventItemFooter({ event }: EventItemFooterProps) {
    const { createdAt, isLoved } = event;
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
            }}
        >
            <Typography variant={'subtitle2'}>
                <TimeAgo live={true} date={new Date(createdAt)} />
            </Typography>
            <div>
                <IconButton color={isLoved ? 'error' : 'default'}>
                    {isLoved ? (
                        <Favorite fontSize='small' />
                    ) : (
                        <FavoriteBorder fontSize='small' />
                    )}
                </IconButton>
                <IconButton>
                    <ShareOutlined fontSize='small' />
                </IconButton>
                <IconButton>
                    <MoreVertOutlined fontSize='small' />
                </IconButton>
            </div>
        </div>
    );
}
