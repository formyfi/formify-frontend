/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Dialog,
  Drawer,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import {
  PreviewAutoCompleteField,
  PreviewCheckbox,
  PreviewDateField,
  PreviewNumberField,
  PreviewRadio,
  PreviewSelect,
  PreviewTextAreaField,
  PreviewTextField,
  PreviewTypography,
  PreviewUploadField,
} from "./components/previewFormElements";
import "./style.css";
import { useParams } from "react-router-dom";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    "type": "autocomplete",
    "required": false,
    "label": "Autocomplete",
    "className": "form-control",
    "name": "autocomplete-1679678353678-0",
    "access": false,
    "requireValidOption": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "button",
    "label": "Button",
    "subtype": "button",
    "className": "btn-default btn",
    "name": "button-1679678354148-0",
    "access": false,
    "style": "default"
  },
  {
    "type": "checkbox-group",
    "required": false,
    "label": "Checkbox Group",
    "toggle": false,
    "inline": false,
    "name": "checkbox-group-1679678360648-0",
    "access": false,
    "other": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      }
    ]
  },
  {
    "type": "date",
    "required": false,
    "label": "Date Field",
    "className": "form-control",
    "name": "date-1679678361245-0",
    "access": false
  },
  {
    "type": "file",
    "required": false,
    "label": "File Upload",
    "className": "form-control",
    "name": "file-1679678361708-0",
    "access": false,
    "subtype": "file",
    "multiple": false
  },
  {
    "type": "header",
    "subtype": "h1",
    "label": "Header",
    "access": false
  },
  {
    "type": "hidden",
    "name": "hidden-1679678362853-0",
    "access": false
  },
  {
    "type": "number",
    "required": false,
    "label": "Number",
    "className": "form-control",
    "name": "number-1679678363498-0",
    "access": false
  },
  {
    "type": "paragraph",
    "subtype": "p",
    "label": "Paragraph",
    "access": false
  },
  {
    "type": "radio-group",
    "required": false,
    "label": "Radio Group",
    "inline": false,
    "name": "radio-group-1679678364412-0",
    "access": false,
    "other": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": false
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "select",
    "required": false,
    "label": "Select",
    "className": "form-control",
    "name": "select-1679678364985-0",
    "access": false,
    "multiple": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "text",
    "required": false,
    "label": "Text Field",
    "className": "form-control",
    "name": "text-1679678365597-0",
    "access": false,
    "subtype": "text"
  },
  {
    "type": "textarea",
    "required": false,
    "label": "Text Area",
    "className": "form-control",
    "name": "textarea-1679678366349-0",
    "access": false,
    "subtype": "textarea"
  }
];

const FormPage = (props) => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);
  
  const { form_id } = useParams();  //This form id should be used to store the form json in forms table and should used for fetching saved form json
  
  let formBuilder = null;

  useEffect(() => {
    
    if (formBuilder === null) {
      formBuilder = $(FormBuildRef.current).formBuilder({
        formData,
        actionButtons: [
          {
            id: "smile",
            className: "btn btn-success",
            label: "Preview",
            type: "button",
            events: {
              click: function (codes, aaa) {
                setOpen(true);
                setPreviewData(formBuilder.actions.getData());
                return true;
              },
            },
          },
        ],
        onSave: (evt, formData) => {
          console.log(formData);
        },
      });
    }
  }, []);
  
  const onSubmit = ()=>{
    const formData = formBuilder.actions.getData();
    
    console.log({formData});

  }

  return (
    <div>
      <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
        Create Form
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="right"
        PaperProps={{ sx: { width: "1000px" } }}
        variant={"temporary"}
      >
        <Typography component="h2" variant="h6" color="primary" sx={{ m: 2 }}>
          Preview Form
        </Typography>
        <Divider />
        <Box sx={{ ml:5, mt: 3, width: 700 }} >
          <Box component={'form'}>
            {previewData.map((previewObj) => {
              if (
                ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
                  previewObj.subtype
                )
              ) {
                return (
                  <PreviewTypography data={previewObj} />
                );
              }
              console.log(previewObj.type);
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
              
              return false;
            })}
          </Box>
          <Box sx={{ mb:5 }}  >
              <Button variant="contained" > Submit </Button>
              <Button variant="contained" sx={{ mx:2 }}  > Cancel </Button>
          </Box>
        </Box>
      </Drawer>
      <div id="fb-editor" ref={FormBuildRef} />
    </div>
  );
};

export default FormPage;
