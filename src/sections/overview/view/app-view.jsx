import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppNewsUpdate from '../app-news-update';
import AppCurrentVisits from '../app-current-visits';
import AppOrderTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentSubject from '../app-current-subject';
import AppBookingsByAgency from '../app-bookings-agency';
import AppPackagesDestinations from '../app-packages-destinations';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Travels"
            total={12}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Customers"
            total={20}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Bookings"
            total={32}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Emails"
            total={56}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppBookingsByAgency
            title="Bookings by agency"
            subheader="(+32%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Agency A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Agency B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Agency C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Bookings Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '10, bookings, 4220€',
                '12 bookings have been paid',
                'John Doe bought #AmsterdamPackage',
                'New booking placed with reference #XF-2356',
                'New booking placed with reference #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppPackagesDestinations
            title="Packages destinations"
            subheader="(+21%) than last year"
            chart={{
              series: [
                { label: 'Portugal', value: 690 },
                { label: 'Italy', value: 600 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 1100 },
                { label: 'China', value: 120 },
                { label: 'Germany', value: 580 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 540 },
                { label: 'United Kingdom', value: 1000 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Activities"
            chart={{
              categories: [
                'Hiking',
                'Cultural Tours',
                'Adventure Sports',
                'Local Cuisine',
                'Photography',
                'Relaxation',
              ],
              series: [
                { name: 'Outdoor Enthusiasts', data: [75, 60, 90, 40, 85, 20] },
                { name: 'History Buffs', data: [30, 80, 20, 10, 60, 15] },
                { name: 'Thrill Seekers', data: [90, 40, 95, 20, 70, 30] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Travel News"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: faker.image.urlPicsumPhotos(),
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Destinations %"
            chart={{
              series: [
                { label: 'America', value: 1344 },
                { label: 'Asia', value: 300 },
                { label: 'Europe', value: 3443 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
