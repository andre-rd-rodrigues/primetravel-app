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

export default function BookingsTableRow({ selected, booking, handleClick, onDelete, onEdit }) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewBookingDetails = () => {
    router.push(`/bookings/${booking?.id}`);
    setOpen(null);
  };

  const handleDelete = () => {
    onDelete();
    handleCloseMenu();
  };

  const handleEdit = () => {
    onEdit(booking);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{booking?.id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={booking?.customer?.first_name} src={booking?.customer?.avatar?.url} />
            <Typography variant="subtitle2" noWrap>
              {booking?.customer?.first_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{`${moment(booking?.travel_info?.dates?.starting_date).format(
          'DD-MM-YYYY'
        )} | ${moment(booking?.travel_info?.dates?.end_date).format('DD-MM-YYYY')}`}</TableCell>

        <TableCell>{booking?.travel_info?.airline?.flight_company?.name}</TableCell>

        <TableCell>{booking?.destination.location.city}</TableCell>

        <TableCell>{booking?.payment_info.total_amount}€</TableCell>

        <TableCell>
          <Label color={getStatusColor(booking?.status)}>{booking?.status}</Label>
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

        <MenuItem onClick={handleEdit}>
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
  booking: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
