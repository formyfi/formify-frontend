import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import SendIcon from '@material-ui/icons/Send';
// import AttachmentIcon from '@material-ui/icons/Attachment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSendMessage = () => {
    // Handle sending message and image logic here
    // You can access the `message` and `image` state values to send the data
    console.log('Message:', message);
    console.log('Image:', image);
    // Reset the input fields
    setMessage('');
    setImage(null);
    setImagePreview('');
  };

  return (
<Box>
<div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          style={{ maxWidth: 100, maxHeight: 100, marginRight: 16 }}
        />
      )}
      <TextField
        label="Type your message"
        value={message}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        margin="none"
        style={{ flexGrow: 1 }}
      />
    </div>
    <IconButton component="span">
        <AttachmentIcon />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
      </IconButton>
      <Button variant='contained' onClick={handleSendMessage}>
        <SendIcon /> &nbsp;&nbsp;Send
      </Button>
</Box>
  );
};

export default ChatInput;
