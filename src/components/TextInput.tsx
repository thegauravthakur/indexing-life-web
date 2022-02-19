import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/material';
import { TimelineWrapper } from './TimelineWrapper';
import { auth, firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 6px 13px 24px -8px rgba(0, 0, 0, 0.79);
    -webkit-box-shadow: 6px 13px 24px -8px rgba(0, 0, 0, 0.79);
    -moz-box-shadow: 6px 13px 24px -8px rgba(0, 0, 0, 0.79);
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
`;

const Description = styled(TextareaAutosize)`
    border: 0;
    font-size: 15px;
    padding: 10px;
    border-collapse: separate;
    border-radius: 10px;
    line-height: 22px;
    &:focus {
        outline: none;
    }
    resize: none;
`;

export function TextInput() {
    const title = useRef<HTMLTextAreaElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const id = uuid();
    return (
        <TimelineWrapper
            onClick={async () => {
                if (title.current && description.current) {
                    const { uid } = auth.currentUser!;
                    const ref = doc(firestore, uid, '2022-02-19');
                    await setDoc(
                        ref,
                        {
                            [id]: {
                                image: null,
                                title: title.current.value,
                                description: description.current.value,
                                createdAt: Date.now(),
                            },
                        },
                        { merge: true }
                    );
                }
            }}
        >
            <Container>
                <Title ref={title} maxRows={4} placeholder='Enter title...' />
                <Description
                    ref={description}
                    maxRows={8}
                    placeholder='What just happened?'
                />
            </Container>
        </TimelineWrapper>
    );
}
