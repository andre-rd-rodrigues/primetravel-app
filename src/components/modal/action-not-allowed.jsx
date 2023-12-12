import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';

function ActionNotAllowedModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h4" textAlign="center" color="error">
          Danger Zone Ahead!
        </Typography>
        <Typography marginY={3.5} textAlign="center">
          Hold on tight! Taking this action is like playing Jenga on a rollercoaster! 🎢
          <br />
          Brace yourself, because <b>this will wipe out the entire dataset</b>, leaving fellow
          recruiters with nothing but FOMO about my skills as a Web Developer. Don&apos;t worry,
          though—this action is just a placeholder for now. You can always imagine the data as a
          vast, empty canvas 🥲.
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="contained">
            Go back
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

ActionNotAllowedModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ActionNotAllowedModal;
