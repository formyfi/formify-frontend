import $ from "jquery";
import React, { useEffect, useRef } from "react";
import './style.css';
import { Box, Button, Drawer, FormControlLabel, Grid, TextField, Typography, Autocomplete} from "@mui/material";
window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [{"type":"radio-group","required":false,"label":"Radio Group","inline":false,"name":"radio-group-1678485001702-0","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":false},{"label":"Option 2","value":"option-2","selected":false},{"label":"Option 3","value":"option-3","selected":false}]},{"type":"date","required":false,"label":"Date Field","className":"form-control","name":"date-1678485006202-0","access":false},{"type":"select","required":false,"label":"Select","className":"form-control","name":"select-1678485013169-0","access":false,"multiple":false,"values":[{"label":"Option 1","value":"option-1","selected":true},{"label":"Option 2","value":"option-2","selected":false},{"label":"Option 3","value":"option-3","selected":false}]}];

const FormPage = () => {
  const FormBuildRef = useRef(null);

  useEffect(() => {
    console.log(FormBuildRef.current);
    $(FormBuildRef.current).formBuilder({
      formData,
      fields: [
        
      ],
      onSave: (evt, formData) => {
        console.log(formData);
      },
    });
    console.log('As2d5s')
  }, []);

  const childCOunt = document.getElementById("fb-editor")?.childElementCount;

  useEffect(() => {
    const mainSelector = document.getElementById("fb-editor")
    console.log(mainSelector.childElementCount)
    if (mainSelector.childElementCount > 1) {
        mainSelector.childNodes.forEach((child)=>{
            FormBuildRef.current.removeChild(child);
        })
    }
  }, [FormBuildRef.current]);

  return ( <div>
            
            <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
                  Manage Check Lists
            </Typography>
            <div id="fb-editor" ref={FormBuildRef} /> 
          </div>)
};

export default FormPage;
