import moment from 'moment';

import { STATUS } from 'src/constants';

export const getStatusColor = (status) => {
  switch (status) {
    case STATUS.PENDING:
      return 'warning';

    case STATUS.CANCELED:
    case false:
      return 'error';

    case STATUS.CONFIRMED:
    case true:
      return 'success';

    default:
      return 'primary';
  }
};

export const convertPackagesToDisplayFields = (packages) =>
  packages?.flatMap((packageItem) => [
    {
      fieldName: packageItem.title,
      imageUrl: packageItem.imageUrl,
      fieldValues: [
        { fieldValueName: null, fieldValue: packageItem.description },
        { fieldValueName: 'Price', fieldValue: `${packageItem.price}€` },
      ],
    },
  ]);

export const convertBookingsToDisplayFields = (bookings) =>
  bookings?.flatMap((booking) => [
    {
      fieldValues: [
        { fieldValueName: 'Destination', fieldValue: booking.travel_info?.destination || 'N/A' },
        { fieldValueName: 'Price', fieldValue: `${booking.payment_info.total_amount}€` || 'N/A' },
        {
          fieldValueName: 'Departure',
          fieldValue:
            moment(booking.travel_info?.dates?.starting_date).format('DD-MM-YYYY') || 'N/A',
        },
        {
          fieldValueName: 'Return',
          fieldValue: moment(booking.travel_info?.dates?.end_date).format('DD-MM-YYYY') || 'N/A',
        },
        { fieldValueName: 'Payment Status', fieldValue: booking.status || 'N/A' },
      ],
    },
  ]);
