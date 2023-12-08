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

export const convertPackagesToDisplayFields = (packages) =>
  packages?.flatMap((packageItem) => [
    {
      fieldName: packageItem.title,
      imageUrl: packageItem.images[0],
      fieldValues: [
        { fieldValueName: null, fieldValue: packageItem.description },
        { fieldValueName: 'Price', fieldValue: `${packageItem.price}€` },
      ],
    },
  ]);
