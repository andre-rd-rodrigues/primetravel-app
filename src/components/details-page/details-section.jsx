import React from 'react';
import PropTypes from 'prop-types';

import { Box, Card, Stack, Typography } from '@mui/material';

function DetailsSection({ content, fieldsContainerProps }) {
  const { title, fields } = content;

  return (
    <Card
      component={Stack}
      spacing={3}
      sx={{
        px: 5,
        py: 5,
        borderRadius: 2,
      }}
      marginBottom={3}
    >
      {title && (
        <Stack>
          <Typography variant="h4">{title}</Typography>
        </Stack>
      )}

      <Stack display="flex" direction="row" gap={3} {...fieldsContainerProps} flexWrap="wrap">
        {fields?.map(({ fieldName, fieldValues, imageUrl }, i) => (
          <>
            {imageUrl && (
              <Box
                style={{ marginBottom: '9px' }}
                component="img"
                src={imageUrl}
                alt={fieldName}
                width="100px"
                height="100px"
                borderRadius="15%"
                objectFit="cover"
                boxShadow={12}
              />
            )}
            {fieldName && (
              <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
                {fieldName}
              </Typography>
            )}
            {fieldValues?.map(({ fieldValue, fieldValueName }, vi) => (
              <Typography key={vi} fontSize={13}>
                <Typography component="span" fontSize={13} sx={{ fontWeight: '600' }}>
                  {fieldValueName && `${fieldValueName}: `}
                </Typography>
                {fieldValue}
              </Typography>
            ))}
          </>
        ))}
      </Stack>
    </Card>
  );
}

export default DetailsSection;

DetailsSection.propTypes = {
  fieldsContainerProps: PropTypes.any,
  content: PropTypes.shape({
    title: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
        fieldName: PropTypes.string.isRequired,
        fieldValues: PropTypes.arrayOf(
          PropTypes.shape({
            fieldValueName: PropTypes.string.isRequired,
            fieldValue: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
  }),
};
