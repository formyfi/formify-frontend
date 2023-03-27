import FormPreview from "components/FormBuilder/FormPreview";
import React from "react";
import { getTaskForm } from "redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
const { Box, Typography } = require("@mui/material")


const FormSubmission =({ handleNext, handleBack, stationValue,  partValue, vnumberValue })=>{
    const dispatch = useDispatch();
    const checkListState = useSelector((state) => state.checkList);

    
    let form_data = JSON.parse("[{\"type\":\"header\",\"subtype\":\"h3\",\"label\":\"First Checklist form to test\",\"access\":false},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Select all applicable points\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1679952261959-0\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Was measurement correct\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Diameter was correct?\",\"value\":null,\"selected\":true},{\"label\":\"Inspect properly?\",\"value\":null,\"selected\":true}]},{\"type\":\"radio-group\",\"required\":false,\"label\":\"How was your experience using this form\",\"inline\":false,\"name\":\"radio-group-1679952348851-0\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Great\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Not so great\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Worst\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"select\",\"required\":false,\"label\":\"How would you use this in future?\",\"className\":\"form-control\",\"name\":\"select-1679952382247-0\",\"access\":false,\"multiple\":false,\"values\":[{\"label\":\"Likely\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Most likely\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"I like papers\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"uploadImage\",\"required\":false,\"label\":\"Upload Image\",\"name\":\"uploadImage-1679952430404-0\",\"access\":false},{\"type\":\"textarea\",\"required\":false,\"label\":\"Enter your over all experience.\",\"className\":\"form-control\",\"name\":\"textarea-1679952449712-0\",\"access\":false,\"subtype\":\"textarea\"}]");

    React.useEffect(() => {
       const res = dispatch(getTaskForm({ station_value: stationValue,  part_value: partValue, v_number: vnumberValue }));
       res.then((resp)=>{
        if(resp && resp.success){
            form_data = JSON.parse("[{\"type\":\"header\",\"subtype\":\"h3\",\"label\":\"First Checklist form to test\",\"access\":false},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"Select all applicable points\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1679952261959-0\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Was measurement correct\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Diameter was correct?\",\"value\":null,\"selected\":true},{\"label\":\"Inspect properly?\",\"value\":null,\"selected\":true}]},{\"type\":\"radio-group\",\"required\":false,\"label\":\"How was your experience using this form\",\"inline\":false,\"name\":\"radio-group-1679952348851-0\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Great\",\"value\":\"option-1\",\"selected\":false},{\"label\":\"Not so great\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"Worst\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"select\",\"required\":false,\"label\":\"How would you use this in future?\",\"className\":\"form-control\",\"name\":\"select-1679952382247-0\",\"access\":false,\"multiple\":false,\"values\":[{\"label\":\"Likely\",\"value\":\"option-1\",\"selected\":true},{\"label\":\"Most likely\",\"value\":\"option-2\",\"selected\":false},{\"label\":\"I like papers\",\"value\":\"option-3\",\"selected\":false}]},{\"type\":\"uploadImage\",\"required\":false,\"label\":\"Upload Image\",\"name\":\"uploadImage-1679952430404-0\",\"access\":false},{\"type\":\"textarea\",\"required\":false,\"label\":\"Enter your over all experience.\",\"className\":\"form-control\",\"name\":\"textarea-1679952449712-0\",\"access\":false,\"subtype\":\"textarea\"}]");
        }
       })
    }, []);

    return <Box sx={{ mt:5 }} component="form"  >
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }} >Part name: XYZ   VNumber: 0001254887 </Typography>
       <Box sx={{ width: 300, my: 2 }} >
           <FormPreview onSubmit={()=>{
            handleNext()
           }} onCancel={()=>{
            handleBack()
           }} title="" previewData={form_data} />
       </Box>
    </Box>
}


export default FormSubmission