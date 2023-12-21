import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { getStatusColor } from 'src/utils/layout.utils';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function CustomerDetailsBookingsTableRow({
  selected,
  bookingID,
  destination,
  departure,
  returnDate,
  amount,
  status,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell>{bookingID}</TableCell>

      <TableCell>{departure}</TableCell>
      <TableCell>{returnDate}</TableCell>

      <TableCell>{destination}</TableCell>

      <TableCell>{amount}€</TableCell>

      <TableCell>
        <Label color={getStatusColor(status)}>{status}</Label>
      </TableCell>
    </TableRow>
  );
}

CustomerDetailsBookingsTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  bookingID: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  returnDate: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
