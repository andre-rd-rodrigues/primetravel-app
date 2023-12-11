import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { getStatusColor } from 'src/utils/layout.utils';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function BookingsTableRow({
  selected,
  bookingID,
  customer,
  airline,
  destination,
  travelDate,
  amount,
  status,
  handleClick,
  onDelete,
}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewBookingDetails = () => {
    router.push(`/bookings/${bookingID}`);
    setOpen(null);
  };

  const handleDelete = () => {
    onDelete();
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{bookingID}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={customer?.first_name} src={customer?.avatar?.url} />
            <Typography variant="subtitle2" noWrap>
              {customer?.first_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{`${moment(travelDate?.starting_date).format('DD-MM-YYYY')} | ${moment(
          travelDate?.end_date
        ).format('DD-MM-YYYY')}`}</TableCell>

        <TableCell>{airline}</TableCell>

        <TableCell>{destination}</TableCell>

        <TableCell>{amount}€</TableCell>

        <TableCell>
          <Label color={getStatusColor(status)}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleViewBookingDetails}>
          <Iconify icon="fluent:open-12-regular" sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="iconamoon:edit" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

BookingsTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  bookingID: PropTypes.string.isRequired,
  customer: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  airline: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  travelDate: PropTypes.shape({
    starting_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
