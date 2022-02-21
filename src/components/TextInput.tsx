import styled from '@emotion/styled';
import { ClickAwayListener, TextareaAutosize } from '@mui/material';
import { TimelineWrapper } from './TimelineWrapper';
import { auth, firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { queryClient } from '../index';
import { EventsType } from '../views/Timeline';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { TextInputFooter } from './TextInputFooter';

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

    const onEventSubmit = async () => {
        const id = uuid();
        if (title || description) {
            const { uid } = auth.currentUser!;
            const value = {
                image: null,
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
                    {isDescriptionFocused && <TextInputFooter />}
                </Container>
            </ClickAwayListener>
        </TimelineWrapper>
    );
}
