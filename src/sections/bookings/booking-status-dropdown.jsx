import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { STATUS } from 'src/constants';

const BookingStatusDropdown = ({ onChange, value }) => (
  <FormControl fullWidth>
    <InputLabel id="status">Status</InputLabel>
    <Select labelId="status" id="status" value={value} label="Status" onChange={onChange}>
      <MenuItem value={STATUS.PENDING}>Pending</MenuItem>
      <MenuItem value={STATUS.CANCELED}>Canceled</MenuItem>
      <MenuItem value={STATUS.CONFIRMED}>Confirmed</MenuItem>
    </Select>
  </FormControl>
);

export default BookingStatusDropdown;

BookingStatusDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
