/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Typography, Button, Stack } from "@mui/material";
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
import { Field, Form, Formik } from "formik";
import HistoryTimeLine from "./HistoryTimeLine";

const FormPreviewWithSubmit = ({
  title,
  previewData,
  onSubmit,
  isSubmitable,
  filledFormValue,
  vnumberValue,
  onCancel,
  form_id,
  stationValue,
}) => {
  const [initVals, setInitVals] = useState(null);
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
    setInitVals(initialValues);
  }, [previewData]);

  const openJourney = ()=> {
    setHistoryModel(!historyModel)
  }

  if (initVals === null) {
    return <Box>loading</Box>;
  }
  

  return (
    <Box>
      <Box sx={{ mt: 3, width: 400 }}>
        <Formik
          initialValues={{
            ...initVals,
            ...filledFormValue,
          }}
          validate={(values) => {
            // loop and check which have required text
            const errors = {};
            previewData.forEach((prev) => {
              if (prev.required === true && values[prev.name] === "") {
                errors[prev.name] = "required";
              }
            });
            return errors;
          }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              onSubmit(JSON.stringify(values, null, 2));
            }, 400);
          }}
          sx={{ width: "100%", maxWidth: 600 }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
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
                      <PreviewCheckbox
                        data={previewObj}
                        filledFormValue={filledFormValue}
                      />
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
                      <PreviewImage data={previewObj} />
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
                  <Button
                    variant="contained"
                    disabled={form_id == 0 ? true : false}
                    onClick={() => handleSubmit()}
                  >
                    Save Form
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onCancel()}
                    sx={{ mx: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={openJourney} >Part Traveller</Button>
                </Stack>
                  
              </Box>
            </Form>
          )}
        </Formik>
        <HistoryTimeLine open={historyModel} vnumberValue={vnumberValue} stationValue={stationValue} closeHandler={openJourney} />
      </Box>
    </Box>
  );
};

export default FormPreviewWithSubmit;
