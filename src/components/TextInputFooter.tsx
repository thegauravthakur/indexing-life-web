import { CameraAlt } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export function TextInputFooter() {
    return (
        <>
            {/*{content && (*/}
            {/*    <div*/}
            {/*        style={{*/}
            {/*            backgroundImage: `url(${content})`,*/}
            {/*            height: 150,*/}
            {/*            backgroundPosition: 'center',*/}
            {/*            position: 'relative',*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <IconButton*/}
            {/*            onClick={clear}*/}
            {/*            color='secondary'*/}
            {/*            size='small'*/}
            {/*            style={{*/}
            {/*                backgroundColor: '#475569',*/}
            {/*                color: '#f8fafc',*/}
            {/*                position: 'absolute',*/}
            {/*                right: 10,*/}
            {/*                top: 10,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Close fontSize='small' />*/}
            {/*        </IconButton>*/}
            {/*    </div>*/}
            {/*)}*/}
            <IconButton style={{ alignSelf: 'start', marginLeft: 5 }}>
                <CameraAlt fontSize='small' />
            </IconButton>
        </>
    );
}
