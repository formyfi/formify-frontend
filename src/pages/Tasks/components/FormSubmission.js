import FormPreview from "components/FormBuilder/FormPreview";
import React, {useState} from "react";
import { getTaskForm, updateTaskForm } from "redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
const { Box, Typography } = require("@mui/material")


const FormSubmission =({ handleNext, handleBack, stationValue,  partValue, vnumberValue })=>{
    const dispatch = useDispatch();
    const [formData, setFormData] = useState([]);
    

    React.useEffect(() => {
       const res = dispatch(getTaskForm({ station_value: stationValue,  part_value: partValue, v_number: vnumberValue }));
       res.then((resp)=>{
        if(resp && resp.payload.form_data){
             setFormData(JSON.parse(resp.payload.form_data))
        }
       })
    }, []);

    // const res = dispatch(
    //     updateTaskForm({
    //         form_json: formData,
    //         form_id: form_id,
    //         org_id: commonState.org_id,
    //         part_id: partValue,
    //         station_id: stationValue,
    //         part_vnum: vnumberValue
    //     })
    //     );
    //     res.then((resp) => {
    //     if (resp && resp.payload && resp.payload.success) {
    //         toast.success("Form added successfully.");
    //     } else toast.error("Somthing is wrong please contact teach team");
    //     });
   
   
    return <Box sx={{ mt:5 }} component="form"  >
        <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }} >Part name: XYZ   VNumber: 0001254887 </Typography>
       <Box sx={{ width: 300, my: 2 }} >
           <FormPreview onSubmit={()=>{
                
           }} onCancel={()=>{
            handleBack()
           }} title="" previewData={formData} />
       </Box>
    </Box>
}


export default FormSubmission