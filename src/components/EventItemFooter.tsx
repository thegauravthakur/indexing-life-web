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
import { updateLocalData } from '../utils/queryClientUtils';
import { updateCloudData } from '../utils/firebase';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';

interface EventItemFooterProps {
    event: EventType;
    id: string;
}
export function EventItemFooter({ event, id }: EventItemFooterProps) {
    const { createdAt, isLoved } = event;
    const currentDate = useRecoilValue(currentDateState);
    const onHeartIconClick = async () => {
        const value = { ...event, isLoved: !isLoved };
        updateLocalData(value, id, currentDate);
        await updateCloudData(value, id, currentDate);
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant={'subtitle2'}>
                <TimeAgo live={true} date={new Date(createdAt)} />
            </Typography>
            <div>
                <IconButton
                    onClick={onHeartIconClick}
                    color={isLoved ? 'error' : 'default'}
                >
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
