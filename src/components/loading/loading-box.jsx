import React from 'react';
import PropTypes from 'prop-types';

import { Box, CircularProgress } from '@mui/material';

function LoadingBox({ loading, sx = { width: 1, height: 200 } }) {
  return loading ? (
    <Box sx={sx} display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : null;
}

export default LoadingBox;

LoadingBox.propTypes = {
  loading: PropTypes.bool.isRequired,
  sx: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
