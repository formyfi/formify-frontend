/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Button } from "@mui/material";
import React from "react";
import {
  PreviewAutoCompleteField,
  PreviewCheckbox,
  PreviewDateField,
  PreviewImage,
  PreviewNumberField,
  PreviewRadio,
  PreviewSelect,
  PreviewTextAreaField,
  PreviewTextField,
  PreviewTypography,
  PreviewUploadField,
} from "./previewFormElements";

const FormPreview = ({
  title,
  previewData,
  onSubmit,
  isSubmitable,
  onCancel,
  form_id,
}) => {
  return (
    <Box>
      <Divider />
      <Box sx={{ mt: 3, maxWidth: 700 }}>
        <Box
          component={"form"}
          onSubmit={(e) => {
            console.log(e);
          }}
        >
          {previewData.map((previewObj) => {
            if (
              ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
                previewObj.subtype
              )
            ) {
              return <PreviewTypography data={previewObj} />;
            }
            if (previewObj.type === "radio-group") {
              return (
                <Box my={2}>
                  <PreviewRadio data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "checkbox-group") {
              return (
                <Box my={2}>
                  <PreviewCheckbox data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "select") {
              return (
                <Box my={2}>
                  <PreviewSelect data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "text") {
              return (
                <Box my={2}>
                  <PreviewTextField data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "textarea") {
              return (
                <Box my={2}>
                  <PreviewTextAreaField data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "number") {
              return (
                <Box my={2}>
                  <PreviewNumberField data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "autocomplete") {
              return (
                <Box my={2}>
                  <PreviewAutoCompleteField data={previewObj} />
                </Box>
              );
            }
            if (previewObj.type === "date") {
              return (
                <Box my={2}>
                  <PreviewDateField data={previewObj} />
                </Box>
              );
            }

            if (previewObj.type === "file") {
              return (
                <Box my={2}>
                  <PreviewUploadField data={previewObj} />
                </Box>
              );
            }

            if (previewObj.type === "uploadImage") {
              return (
                <Box my={2}>
                  {/* render multuple images */}
                  <PreviewImage data={previewObj} />
                </Box>
              );
            }

            return false;
          })}
        </Box>
        <Box sx={{ mb: 5 }}>
          <Button
            variant="contained"
            disabled={form_id ? true : false}
            onClick={() => onSubmit()}
          >
            Save Form
          </Button>
          <Button variant="contained" onClick={() => onCancel()} sx={{ mx: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPreview;
