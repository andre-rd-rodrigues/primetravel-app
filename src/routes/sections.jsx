import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const BookingsPage = lazy(() => import('src/pages/bookings'));
export const BookingDetailsPage = lazy(() => import('src/sections/bookings/view/booking-details'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const CustomerDetailsPage = lazy(() =>
  import('src/sections/customers/view/customer-details')
);
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const { user, isLoggedIn } = useAuth();

  const routes = useRoutes([
    {
      element:
        user || isLoggedIn ? (
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ) : (
          <Navigate to="/login" replace />
        ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'bookings/:id', element: <BookingDetailsPage /> },
        { path: 'bookings', element: <BookingsPage /> },
        { path: 'customers/:id', element: <CustomerDetailsPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // Redirect to home if already logged in
    {
      path: 'login',
      element: !user ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
