import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Stack, Avatar, Button } from '@mui/material';

const AvatarLoader = ({ onSelectImage }) => {
  const [file, setFile] = useState();

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    const blob = new Blob([selectedFile], { type: selectedFile.type });
    setFile(URL.createObjectURL(blob));

    onSelectImage(selectedFile);
  };

  return (
    <Stack width="100%" alignItems="center" margin={3}>
      <Avatar src={file} alt="User Avatar" sx={{ width: 120, height: 120 }} />
      <label htmlFor="avatar-input">
        <input
          accept="image/*"
          type="file"
          id="avatar-input"
          onChange={handleImageUpload}
          style={{
            display: 'none', // Hide the default file input button
          }}
        />
        <Button component="span" variant="contained" sx={{ marginTop: 1 }}>
          Choose Image
        </Button>
      </label>
    </Stack>
  );
};

export default AvatarLoader;

AvatarLoader.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
};
