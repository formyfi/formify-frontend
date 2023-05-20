import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { setFormTimeLine } from "redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatInput = ({ vnumberValue, closeAddNew, stationValue }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    try {
      const selectedImage = event.target.files;
      if (selectedImage && typeof selectedImage === "object") {
        const files = [];
        const filesPrv = [];
        for (let i = 0; i < selectedImage.length; i++) {
          const file = selectedImage[i];
          files.push(file);
          filesPrv.push(URL.createObjectURL(file));
        }
        setImage(files);
        setImagePreview(filesPrv);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (urlObject) => {
    // const file = await getFileFromUrl(url, "test.png");

    const formData = new FormData();
    formData.append("file", urlObject);

    return fetch(process.env.REACT_APP_API_BASE + "/api/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSendMessage = async () => {
    if (message === "") {
      return setError("Please enter message");
    }
    const imagesNames = [];
    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      await uploadFile(img).then((response) => {
        if (response && response.file_path) {
          imagesNames.push(response.file_path);
        }
      });
    }

    // upload form
    dispatch(
      setFormTimeLine({
        form_vnumber_id: vnumberValue,
        text: message,
        type: "user_message",
        station_id: stationValue,
        org_id: commonState.org_id,
        user_id: 15,
        images: imagesNames.join(","),
      })
    ).then((runAfter) => {
      dispatch(setFormTimeLine(vnumberValue));
      closeAddNew();
    });
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ width: "auto", mb: 3 }}>
          {error}
        </Alert>
      )}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
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
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 1 }}>
          {imagePreview.map((imgPrv) => {
            return (
              <img
                src={imgPrv}
                alt={"chat-message"}
                style={{ maxWidth: "100px" }}
              />
            );
          })}
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            if (inputRef) {
              inputRef.current.click();
            }
          }}
        >
          {" "}
          Upload
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          multiple
          ref={inputRef}
          onChange={handleImageChange}
        />
      </Box>
      <Button variant="contained" onClick={handleSendMessage}>
        Add New One
      </Button>
    </Box>
  );
};

export default ChatInput;
