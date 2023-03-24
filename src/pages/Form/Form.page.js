/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog,Drawer, DialogContent, DialogTitle, Divider, Typography,  } from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import { PreviewCheckbox, PreviewRadio, PreviewSelect, PreviewTextField } from "./components/previewFormElements";
import './style.css';
import { useParams } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [];

const FormPage = (props) => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);
  let formBuilder = null;

  const params = useParams()
  const form_id = params.form_id; //This form id should be used to store the form json in forms table and should used for fetching saved form json
  useEffect(() => {
    if(formBuilder === null){
      formBuilder = $(FormBuildRef.current).formBuilder({
        formData,
        actionButtons: [{
          id: 'smile',
          className: 'btn btn-success',
          label: 'Preview',
          type: 'button',
          events: {
          click: function(codes,aaa) {
            setOpen(true)
            console.log(formBuilder.actions.getData());
            setPreviewData(formBuilder.actions.getData())
            return  true;
          }
        }
        }],
        onSave: (evt, formData) => {
          console.log(formData);
        },
      });
    }
  }, []);
  var items = [{
    key: 'Header',
    name: 'Header Text',
    icon: 'fa fa-header',
    static: true,
    content: 'Placeholder Text...'
  },
  {
    key: 'Paragraph',
    name: 'Paragraph',
    static: true,
    icon: 'fa fa-paragraph',
    content: 'Placeholder Text...'
  }];
  return ( <div>
            <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
                  Create Form
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Drawer
              open={open} 
              onClose={()=>{
                setOpen(false)
              }}
              anchor="right"
              PaperProps={{ sx: { width: "1000px" } }}
              variant={"temporary"}
            >
              <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>Preview Form</Typography>
              <Divider />
              <div>
                <form>
                  {
                    previewData.map((previewObj) => {
                      if(["h1","h2","h3","h4","h5","h6", "p"].includes(previewObj.subtype)) {
                        return <Box my={1} ><Typography variant={previewObj.subtype} component={previewObj.subtype} >{previewObj.label}</Typography></Box>
                      }
                      console.log(previewObj.type);
                      if(previewObj.type === "radio-group") {
                        return <Box my={2} ><PreviewRadio data={previewObj} /></Box>
                      }
                      if(previewObj.type === "checkbox-group") {
                        return <Box my={2} ><PreviewCheckbox data={previewObj} /></Box>
                      }
                      if(previewObj.type === "select") {
                        return <Box my={2} ><PreviewSelect data={previewObj} /></Box>
                      }
                      if(previewObj.type === "text") {
                        return <Box my={2} ><PreviewTextField data={previewObj} /></Box>
                      }
                      return false;
                    })
                  }
                </form>
              </div>
              </Drawer>
              <ReactFormBuilder url='path/to/GET/initial.json'  saveUrl='path/to/POST/built/form.json' />
      {/* <div id="fb-editor" ref={FormBuildRef} /> */}
  </div>)
};

export default FormPage;
