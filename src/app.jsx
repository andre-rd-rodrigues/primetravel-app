/* eslint-disable perfectionist/sort-imports */
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'src/global.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
