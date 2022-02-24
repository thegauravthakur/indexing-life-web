import styled from '@emotion/styled';
import { ClickAwayListener, TextareaAutosize } from '@mui/material';
import { TimelineWrapper } from './TimelineWrapper';
import { auth, firestore, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { queryClient } from '../index';
import { EventsType } from '../views/Timeline';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { TextInputFooter } from './TextInputFooter';
import { useFilePicker } from 'use-file-picker';
import Resize from 'react-image-file-resizer';

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

export const Title = styled(TextareaAutosize)`
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

export const Description = styled(TextareaAutosize)`
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFileContent, setImageFileContent] = useState<string | null>(
        null
    );
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isDescriptionFocused, setDescriptionFocus] = useState(false);
    const [openFileSelector, { plainFiles, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
    });

    useEffect(() => {
        const [file] = plainFiles;
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (result) => {
                setImageFileContent(result.target?.result as string);
            };
        } else setImageFileContent(null);
    }, [plainFiles]);
    const resizeFile = (file: File) =>
        new Promise((resolve) => {
            Resize.imageFileResizer(
                file,
                900,
                900,
                'JPEG',
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                'file'
            );
        });
    const uploadImage = async (sRef: any) => {
        if (imageFile)
            return new Promise<string>(async (resolve) => {
                const compressedImage = (await resizeFile(imageFile)) as File;
                const progress = uploadBytesResumable(sRef, compressedImage);
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
        if (title || description || imageFile) {
            const downloadURL = imageFile ? await uploadImage(sRef) : null;
            const value = {
                image: downloadURL ?? null,
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
            clear();
        }
    };

    return (
        <TimelineWrapper showEditIcon={false} onClick={onEventSubmit}>
            <ClickAwayListener
                onClickAway={() => {
                    setDescriptionFocus(false);
                }}
            >
                <Container
                    onPaste={(e) => {
                        const file = e.clipboardData.files[0];
                        if (file && file.type.split('/')[0] === 'image') {
                            setImageFile(file);
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (result) => {
                                setImageFileContent(
                                    result.target?.result as string
                                );
                            };
                        }
                    }}
                    isFocused={isDescriptionFocused}
                    style={{}}
                >
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
                            content={imageFileContent}
                            clear={clear}
                            openFileSelector={openFileSelector}
                        />
                    )}
                </Container>
            </ClickAwayListener>
        </TimelineWrapper>
    );
}
