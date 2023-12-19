/* eslint-disable perfectionist/sort-imports */
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'src/global.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { ErrorBoundary } from 'react-error-boundary';
import { analytics } from './config/firebaseConfig';
import ErrorPage from './pages/error-page';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => logEvent(analytics, 'app_open'), []);

  useScrollToTop();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Router />
        </ErrorBoundary>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
