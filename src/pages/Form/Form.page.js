/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography,  } from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import { PreviewCheckbox, PreviewRadio, PreviewSelect, PreviewTextField } from "./components/previewFormElements";
import './style.css';
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [{"type":"radio-group","required":false,"label":"Radio Group","inline":false,"name":"radio-group-1678485001702-0","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":false},{"label":"Option 2","value":"option-2","selected":false},{"label":"Option 3","value":"option-3","selected":false}]},{"type":"date","required":false,"label":"Date Field","className":"form-control","name":"date-1678485006202-0","access":false},{"type":"select","required":false,"label":"Select","className":"form-control","name":"select-1678485013169-0","access":false,"multiple":false,"values":[{"label":"Option 1","value":"option-1","selected":true},{"label":"Option 2","value":"option-2","selected":false},{"label":"Option 3","value":"option-3","selected":false}]}];

const FormPage = () => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);
  let formBuilder = null;

  useEffect(() => {
    console.log(FormBuildRef.current);
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
      console.log('As2d5s')
    }
  }, []);

  return ( <div>
            <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
                  Manage Check Lists
            </Typography>
            <Divider sx={{ mb: 2 }} />
          <Dialog open={open} onClose={()=>{
            setOpen(false)
          }} >
              <DialogTitle>Form Preview</DialogTitle>
              <Divider />
              <DialogContent>
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
              </DialogContent>
          </Dialog>
      <div id="fb-editor" ref={FormBuildRef} />
  </div>)
};

export default FormPage;
