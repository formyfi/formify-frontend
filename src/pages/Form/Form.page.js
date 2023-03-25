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
import { updateCheckListForm, getCheckLists } from "redux/slices/formSlice";
import "./style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-form-builder2/dist/app.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

let form_json = "";

const FormPage = (props) => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);
  const [formJson, setFormJson] = React.useState({});
  
  const { form_id } = useParams();  //This form id should be used to store the form json in forms table and should used for fetching saved form json
  
  let formBuilder = null;

  useEffect(() => {
    
    if (formBuilder === null) {
      let fields = [
        {
          label: "Upload Image",
          attrs: {
            type: "uploadImage",
            onclick: ()=>{
              alert('a')
            }
          },
          icon: "<i class='formbuilder-icon-file input-control input-control-10 ui-sortable-handle' ></i>",
        },
      ];
      let templates = {
        uploadImage: function (fieldData) {
          return {
            field: '<span id="' + fieldData.name + '">',
            onRender: function () {
              document.getElementById(fieldData.name).innerHTML = `<div class="wrapper_${fieldData.id}" ><input class="form-control image-upload" name="${fieldData.name}" type="file" id="${fieldData.id}" /></div>`
  
              const imageUpload = document.getElementsByClassName('image-upload');
              if(imageUpload.length > 0){
                // imageUpload[0].addEventListener('change',()=>{
                //   // alert('a');
                // })
              }
            },
          };
        },
      };

      formBuilder = $(FormBuildRef.current).formBuilder({
        form_json: formJson,
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
        fields,
        templates
      });
    }
  }, []);
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);

  React.useEffect(() => {
    const res = dispatch(getCheckLists({ id: form_id, slug: 'form_only' }));
    res.then((resp) => {
      if(resp && resp.payload && resp.payload.data){
        form_json = JSON.parse(resp.payload.data.form_json)
        setFormJson(form_json);
        formBuilder.actions.setData(form_json)
      } 
    });
  }, []);
  
  const onSubmit = ()=>{
    const formData = previewData;
    if(formData){
      const res = dispatch(updateCheckListForm({ form_json: formData, id: form_id , org_id: commonState.org_id }));
      res.then((resp) => {
        if(resp && resp.payload && resp.payload.success){
          toast.success("Form added successfully.");
        } else toast.error("Somthing is wrong please contact teach team");
        setOpen(false);
      });
    }
  }

  return (
    <div>
        <ToastContainer />
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
              <Button variant="contained" onClick={()=>onSubmit()}> Submit </Button>
              <Button variant="contained" sx={{ mx:2 }}  > Cancel </Button>
          </Box>
        </Box>
      </Drawer>
      <div id="fb-editor" ref={FormBuildRef} />
    </div>
  );
};

export default FormPage;
