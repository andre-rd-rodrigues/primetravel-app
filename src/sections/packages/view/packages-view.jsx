import { useState, useEffect } from 'react';
import { useListVals } from 'react-firebase-hooks/database';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';

import { Queries } from 'src/api';

import NoData from 'src/components/noData/noData';

import PackageCard from '../package-card';
import ProductSort from '../package-sort';
import { SORT_OPTIONS } from '../packages.constants';

// ----------------------------------------------------------------------

export default function PackagesView() {
  const [packages, loading, error] = useListVals(Queries.getPackagesQuery());

  const [sortedPackages, setSortedPackages] = useState([]);

  useEffect(() => {
    if (packages && packages.length > 0) {
      // Sort packages when the 'packages' array changes
      setSortedPackages(
        [...packages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      );
    }
  }, [packages]);

  const handleSorting = (sortBy) => {
    switch (sortBy) {
      case SORT_OPTIONS.NEWEST:
        setSortedPackages(
          [...sortedPackages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        );
        break;
      case SORT_OPTIONS.PRICE_ASC:
        setSortedPackages([...sortedPackages].sort((a, b) => a.price - b.price));
        break;
      case SORT_OPTIONS.PRICE_DESC:
        setSortedPackages([...sortedPackages].sort((a, b) => b.price - a.price));
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Packages
      </Typography>

      {/* Loading spinner  */}
      {loading && (
        <Box
          sx={{ width: 1, height: 200 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error message  */}
      {error && <NoData displayName="packages list" />}

      {!loading && !error && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductSort onselect={handleSorting} />
            </Stack>
          </Stack>
          <Grid container spacing={3}>
            {sortedPackages.map((packageItem) => (
              <Grid key={packageItem.id} xs={12} sm={6} md={4}>
                <PackageCard packageItem={packageItem} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
