/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Typography, Button } from "@mui/material";
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
import { useForm } from "react-hook-form";
import { Field, Form, Formik } from "formik";

const FormPreviewWithSubmit = ({
  title,
  previewData,
  onSubmit,
  isSubmitable,
  filledFormValue,
  onCancel,
}) => {
  const [initVals, setInitVals] = useState(null);

  useEffect(() => {
    let initialValues = {}
    previewData.forEach((prev) => {
      if (prev.name) {

        if(prev.type === 'checkbox-group') {
          initialValues[prev.name] = [];
        } else {
          initialValues[prev.name] = "";
        }
      }
    });
    setInitVals(initialValues);
  }, [previewData]);

  if(initVals === null ){
    return <Box>loading</Box>
  }

  return (
    <Box>
      <Typography component="h2" variant="h6" color="primary" sx={{ m: 2 }}>
        {title}
      </Typography>
      <Divider />
      <Box sx={{ mt: 3, width: 700 }}>
        <Formik
          initialValues={filledFormValue?filledFormValue:(initVals?initVals:{})}
          validate={(values) => {
            // loop and check which have required text
            const errors = {};
            previewData.forEach((prev)=>{
              if(prev.required === true && values[prev.name] === '' ){
                errors[prev.name] = "required"
              }
            })
            return errors;
          }}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(initVals, null, 2));

            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              onSubmit(JSON.stringify(values, null, 2))
            }, 400);
          }}
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
                      <PreviewRadio
                          data={previewObj}
                        />  
                    </Box>
                  );
                }
                if (previewObj.type === "checkbox-group") {
                  return (
                    <Box my={2}>
                       <PreviewCheckbox data={previewObj} filledFormValue={filledFormValue} />
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
              <Box sx={{ mb: 5 }}>
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Save Form
                </Button>
                <Button
                  variant="contained"
                  onClick={() => onCancel()}
                  sx={{ mx: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default FormPreviewWithSubmit;
