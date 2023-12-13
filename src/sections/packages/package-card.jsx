import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function PackageCard({ packageItem }) {
  const renderImg = (
    <Box
      component="img"
      alt={packageItem.title}
      src={packageItem.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = <Typography variant="subtitle1">{packageItem.price}€</Typography>;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {packageItem.title}
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {packageItem.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <b>Location: </b>
          {packageItem.location.city}, {packageItem.location.country}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <b>Activities:</b>
        </Typography>
        <ul>
          {packageItem.activities.map((activity) => (
            <Typography variant="body2" color="text.secondary" component="li" key={activity.id}>
              {activity.name} - {activity.description}
            </Typography>
          ))}
        </ul>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

PackageCard.propTypes = {
  packageItem: PropTypes.object,
};
