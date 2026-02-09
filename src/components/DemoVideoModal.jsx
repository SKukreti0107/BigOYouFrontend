import React from 'react';
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DemoVideoModal = ({ open, handleClose, videoSrc = "/assets/BigOYou_demo.mp4" }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'black',
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative'
                }
            }}
        >
            <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1, bgcolor: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent sx={{ p: 0, mt: 4 }}>
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: '16/9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'black'
                    }}
                >
                    <video
                        controls
                        autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        src={videoSrc}
                    >
                        Your browser does not support the video tag.
                    </video>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DemoVideoModal;
