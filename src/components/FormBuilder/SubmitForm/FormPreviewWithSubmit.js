import { Box, Button, Divider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import HistoryTimeLine from "./HistoryTimeLine";

const FormPreviewWithSubmit = ({
  title,
  previewData,
  onSubmit,
  isSubmitable,
  formLockedByUserId,
  filledFormValue,
  vnumberValue,
  onCancel,
  form_id,
  view,
  stationValue,
}) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [historyModel, setHistoryModel] = useState(false);

  useEffect(() => {
    let initialValues = {};
    previewData.forEach((prev) => {
      if (prev.name) {
        if (prev.type === "checkbox-group") {
          initialValues[prev.name] = [];
        } else {
          initialValues[prev.name] = "";
        }
      }
    });
    setFormValues({ ...initialValues, ...filledFormValue });
  }, [previewData, filledFormValue]);

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    previewData.forEach((prev) => {
      if (prev.required === true && !formValues[prev.name]) {
        errors[prev.name] = "required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (isSaveProgress) => {
    if (isSaveProgress || validateForm()) {
      onSubmit({ ...formValues, is_completed: isSaveProgress ? 0 : 1 });
    }
  };

  const openJourney = () => {
    setHistoryModel(!historyModel);
  };

  if (Object.keys(formValues).length === 0) {
    return <Box>loading</Box>;
  }

  return (
    <Box>
      <Box sx={{ mt: 3, minWidth: 400 }}>
        <form>
          {previewData.map((previewObj) => {
            const commonProps = {
              data: previewObj,
              value: formValues[previewObj.name],
              onChange: (e) =>{
                handleChange(previewObj.name, e.target.value)},
              error: formErrors[previewObj.name],
            };

            if (
              ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
                previewObj.subtype
              )
            ) {
              return <PreviewTypography {...commonProps} />;
            }
            if (previewObj.type === "radio-group") {
              return (
                <Box my={2}>
                  <PreviewRadio {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "checkbox-group") {
              return (
                <Box my={2}>
                  <PreviewCheckbox
                    {...commonProps}
                    filledFormValue={filledFormValue}
                  />
                </Box>
              );
            }
            if (previewObj.type === "select") {
              return (
                <Box my={2}>
                  <PreviewSelect {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "text") {
              return (
                <Box my={2}>
                  <PreviewTextField {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "textarea") {
              return (
                <Box my={2}>
                  <PreviewTextAreaField {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "number") {
              return (
                <Box my={2}>
                  <PreviewNumberField {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "autocomplete") {
              return (
                <Box my={2}>
                  <PreviewAutoCompleteField {...commonProps} />
                </Box>
              );
            }
            if (previewObj.type === "date") {
              return (
                <Box my={2}>
                  <PreviewDateField {...commonProps} />
                </Box>
              );
            }

            if (previewObj.type === "file") {
              return (
                <Box my={2}>
                  <PreviewUploadField {...commonProps} />
                </Box>
              );
            }

            if (previewObj.type === "uploadImage") {
              return (
                <Box my={2}>
                  <PreviewImage {...commonProps} />
                </Box>
              );
            }

            if (previewObj.type === "br") {
              return (
                <Box my={2}>
                  <Divider />
                </Box>
              );
            }

            return false;
          })}
          <Box
            sx={{
              my: 5,
              maxWidth: 600,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              {view === "completed_inspections" ? null : (
                <Button
                  variant="contained"
                  disabled={form_id === 0 || formLockedByUserId}
                  onClick={() => handleSubmit(true)}
                >
                  Save Progress
                </Button>
              )}
              <Button
                variant="contained"
                disabled={form_id === 0 || formLockedByUserId}
                onClick={() => handleSubmit(false)}
              >
                {view === "completed_inspections"
                  ? "Update Inspection"
                  : "Submit Inspection"}
              </Button>
              <Button
                variant="contained"
                onClick={() => onCancel()}
                sx={{ mx: 2 }}
              >
                Close
              </Button>
              <Button variant="outlined" onClick={openJourney}>
                Part Traveller
              </Button>
            </Stack>
          </Box>
        </form>
        <HistoryTimeLine
          open={historyModel}
          vnumberValue={vnumberValue}
          stationValue={stationValue}
          closeHandler={openJourney}
        />
      </Box>
    </Box>
  );
};

export default FormPreviewWithSubmit;
