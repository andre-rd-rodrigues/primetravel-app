import { Paper, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function NoData({ displayName }) {
  return (
    <Paper
      sx={{
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" paragraph>
        Something went wrong
      </Typography>

      <Typography variant="body2">
        Sorry we could not retrive the {displayName}.
        <br /> Please try again later.
      </Typography>
    </Paper>
  );
}

export default NoData;

NoData.propTypes = {
  displayName: PropTypes.string,
};
