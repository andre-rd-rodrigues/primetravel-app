import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Stack, Avatar, Button } from '@mui/material';

const AvatarLoader = ({ avatar, onSelectImage, loading }) => {
  const [file, setFile] = useState(avatar);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];

    const blob = new Blob([selectedFile], { type: selectedFile.type });
    setFile(URL.createObjectURL(blob));

    onSelectImage(selectedFile);
  };

  useEffect(() => {
    if (avatar) setFile(avatar);
  }, [avatar]);

  return (
    <Stack width="100%" alignItems="center" margin={3}>
      <Avatar src={file} alt="User Avatar" sx={{ width: 120, height: 120 }} />
      <label htmlFor="avatar-input">
        <input
          disabled={loading}
          accept="image/*"
          type="file"
          id="avatar-input"
          onChange={handleImageUpload}
          style={{
            display: 'none', // Hide the default file input button
          }}
        />
        <Button disabled={loading} component="span" variant="contained" sx={{ marginTop: 1 }}>
          Choose Image
        </Button>
      </label>
    </Stack>
  );
};

export default AvatarLoader;

AvatarLoader.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
  avatar: PropTypes.any,
  loading: PropTypes.bool.isRequired,
};
