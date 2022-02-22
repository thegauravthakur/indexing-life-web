import styled from '@emotion/styled';
import { ClickAwayListener, TextareaAutosize } from '@mui/material';
import { TimelineWrapper } from './TimelineWrapper';
import { auth, firestore, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { queryClient } from '../index';
import { EventsType } from '../views/Timeline';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { TextInputFooter } from './TextInputFooter';
import { useFilePicker } from 'use-file-picker';

interface ContainerProps {
    isFocused: boolean;
}

const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) =>
        props.isFocused
            ? `3px 10px 24px -8px rgba(0, 0, 0, 0.79)`
            : `3px 5px 10px -8px rgba(0, 0, 0, 0.79)`};
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    border-radius: 10px;
`;

const Title = styled(TextareaAutosize)`
    border: 0;
    font-size: 17px;
    padding: 10px;
    border-radius: 10px;
    &:focus {
        outline: none;
    }
    resize: none;
    font-family: Inter sans-serif;
`;

const Description = styled(TextareaAutosize)`
    border: 0;
    font-size: 16px;
    padding: 10px;
    border-collapse: separate;
    border-radius: 10px;
    line-height: 22px;
    &:focus {
        outline: none;
    }
    resize: none;
    font-family: Inter sans-serif;
`;

export function TextInput() {
    const currentDate = useRecoilValue(currentDateState);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isDescriptionFocused, setDescriptionFocus] = useState(false);
    const [openFileSelector, { filesContent, plainFiles, clear }] =
        useFilePicker({
            readAs: 'DataURL',
            accept: 'image/*',
        });

    const uploadImage = async (sRef: any) => {
        return new Promise<string>((resolve) => {
            const progress = uploadBytesResumable(sRef, plainFiles[0]);
            progress.on(
                'state_changed',
                () => {},
                () => {},
                async () => {
                    const downloadURL = await getDownloadURL(sRef);
                    resolve(downloadURL);
                }
            );
        });
    };

    const onEventSubmit = async () => {
        const id = uuid();
        const { uid } = auth.currentUser!;
        const sRef = ref(storage, `${uid}/${currentDate}/${id}`);
        if (title || description) {
            const downloadURL = await uploadImage(sRef);
            const value = {
                image: downloadURL,
                title,
                description,
                createdAt: Date.now(),
                isLoved: false,
            };
            queryClient.setQueryData(
                ['fetchEvents', currentDate],
                (_events) => {
                    const copy = { ...(_events as EventsType) };
                    copy[id] = value;
                    return copy;
                }
            );
            const ref = doc(firestore, uid, currentDate);
            await setDoc(ref, { [id]: value }, { merge: true });
            setTitle('');
            setDescription('');
        }
    };
    return (
        <TimelineWrapper showEditIcon={false} onClick={onEventSubmit}>
            <ClickAwayListener
                onClickAway={() => {
                    setDescriptionFocus(false);
                }}
            >
                <Container isFocused={isDescriptionFocused} style={{}}>
                    {isDescriptionFocused && (
                        <Title
                            value={title}
                            onChange={(text) => setTitle(text.target.value)}
                            maxRows={4}
                            placeholder='Enter title...'
                        />
                    )}
                    <Description
                        value={description}
                        onChange={(text) => setDescription(text.target.value)}
                        onFocus={() => setDescriptionFocus(true)}
                        maxRows={8}
                        placeholder='What just happened?'
                    />
                    {isDescriptionFocused && (
                        <TextInputFooter
                            content={filesContent[0]?.content}
                            clear={clear}
                            openFileSelector={openFileSelector}
                        />
                    )}
                </Container>
            </ClickAwayListener>
        </TimelineWrapper>
    );
}
