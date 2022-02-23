import { CameraAlt, Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface TextInputFooterProps {
    openFileSelector: () => void;
    clear: () => void;
    content: string | null;
}

export function TextInputFooter({
    openFileSelector,
    content,
    clear,
}: TextInputFooterProps) {
    return (
        <>
            {content && (
                <div
                    style={{
                        backgroundImage: `url(${content})`,
                        borderRadius: 15,
                        margin: 5,
                        height: 150,
                        backgroundPosition: 'center',
                        position: 'relative',
                    }}
                >
                    <IconButton
                        onClick={clear}
                        color='secondary'
                        size='small'
                        style={{
                            backgroundColor: '#475569',
                            color: '#f8fafc',
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Close fontSize='small' />
                    </IconButton>
                </div>
            )}
            <IconButton
                onClick={openFileSelector}
                style={{ alignSelf: 'start', marginLeft: 5 }}
            >
                <CameraAlt fontSize='small' />
            </IconButton>
        </>
    );
}
