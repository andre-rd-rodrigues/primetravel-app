import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import ActionNotAllowedModal from 'src/components/modal/action-not-allowed';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function BookingsTableToolbar({ numSelected, filterValue, onFilterBooking }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Toolbar
        sx={{
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: (theme) => theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <OutlinedInput
            value={filterValue}
            onChange={onFilterBooking}
            placeholder="Search booking by ID..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={() => setModalOpen(true)}>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <ActionNotAllowedModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
}

BookingsTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterValue: PropTypes.string,
  onFilterBooking: PropTypes.func,
};
