import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dispatch, SetStateAction, useRef } from 'react';
import { EventType } from '../views/Timeline';
import { Description, Title } from './TextInput';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { updateLocalData } from '../utils/queryClientUtils';
import { updateCloudData } from '../utils/firebase';

interface EditDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    event: EventType;
    id: string;
}

export function EditDialog({
    setShowDialog,
    showDialog,
    event,
    id,
}: EditDialogProps) {
    const theme = useTheme();
    const { title, description } = event;
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const currentDate = useRecoilValue(currentDateState);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setShowDialog(false);
    };

    const onSaveClick = async () => {
        const newTitle = titleRef.current?.value ?? '';
        const newDescription = descriptionRef.current?.value ?? '';
        const value = {
            ...event,
            title: newTitle,
            description: newDescription,
        };
        updateLocalData(value, id, currentDate);
        setShowDialog(false);
        await updateCloudData(value, id, currentDate);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={showDialog}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
        >
            <DialogTitle id='responsive-dialog-title'>Edit Event</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 500,
                }}
            >
                <Title
                    ref={titleRef}
                    placeholder='Enter Title...'
                    style={{
                        borderRadius: 0,
                        padding: 0,
                        marginBottom: 10,
                        fontSize: 18,
                        fontWeight: 500,
                    }}
                    defaultValue={title}
                />
                <Description
                    ref={descriptionRef}
                    placeholder='Enter Description'
                    style={{ borderRadius: 0, padding: 0 }}
                    defaultValue={description}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={onSaveClick} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
