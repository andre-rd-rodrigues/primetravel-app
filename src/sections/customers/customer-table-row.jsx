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

import { USER_STATUS } from 'src/constants';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CustomerTableRow({ customer, selected, onCheck, onDelete, onEdit }) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewBookingDetails = () => {
    router.push(`/customers/${customer?.id}`);
    setOpen(null);
  };

  const handleDelete = () => {
    onDelete();
    handleCloseMenu();
  };

  const handleEdit = () => {
    onEdit(customer);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onCheck} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={customer?.first_name} src={customer?.avatar?.url} />
            <Typography variant="subtitle2" noWrap>
              {customer?.first_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{customer?.sex}</TableCell>
        <TableCell>{customer?.contacts?.email}</TableCell>
        <TableCell>{customer?.contacts?.phone_number}</TableCell>

        <TableCell>
          <Label color={getStatusColor(customer?.isActive)}>
            {customer?.isActive ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
          </Label>
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

CustomerTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    sex: PropTypes.string.isRequired,
    contacts: PropTypes.shape({
      email: PropTypes.string,
      phone_number: PropTypes.string,
    }),
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
