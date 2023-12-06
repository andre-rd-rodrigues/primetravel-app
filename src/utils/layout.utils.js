import { STATUS } from 'src/constants';

export const getStatusColor = (status) => {
  switch (status) {
    case STATUS.PENDING:
      return 'warning';

    case STATUS.CANCELED:
      return 'error';

    case STATUS.CONFIRMED:
      return 'success';

    default:
      return 'primary';
  }
};
