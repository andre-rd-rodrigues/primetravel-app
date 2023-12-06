import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'bookings',
    path: '/bookings',
    icon: icon('ic_bookings'),
  },
  {
    title: 'customers',
    path: '/customers',
    icon: icon('ic_users'),
  },
  {
    title: 'Packages',
    path: '/products',
    icon: icon('ic_packages'),
  },
  {
    title: 'Destinations',
    path: '/Destinations',
    icon: icon('ic_destinations'),
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_logout'),
  },
];

export default navConfig;
