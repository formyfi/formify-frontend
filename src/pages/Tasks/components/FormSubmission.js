import React, {useState} from "react";
import {getTaskForm, updateTaskForm} from "redux/slices/formSlice";
import {useDispatch, useSelector} from "react-redux";
import FormPreviewWithSubmit from "components/FormBuilder/SubmitForm/FormPreviewWithSubmit";
import {ToastContainer, toast} from 'react-toastify';

const {Box, Typography, Paper, Divider} = require("@mui/material");


const FormSubmission = ({
  handleNext,
  handleBack,
  stationValue,
  partValue,
  vnumberValue,
  form_json,
  form_value,
  form_id,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(form_json ? form_json : []);
  const [formValue, setFormValue] = useState(form_value ? form_value : []);
  const [formID, setFormID] = useState(form_id ? form_id : '');
  const commonState = useSelector((state) => state.common);
  React.useEffect(() => {
    if (!formData.length || !formValue.length) {
      const res = dispatch(
        getTaskForm({
          station_value: stationValue,
          part_value: partValue,
          v_number: vnumberValue,
        })
      );
      res.then((resp) => {
        if (resp && resp.payload.form_data && resp.payload.form_data.form_json) {
          setFormData(JSON.parse(resp.payload.form_data.form_json));
          setFormID(resp.payload.form_data.form_id);
        }
        if (resp && resp.payload.form_data && resp.payload.form_data.form_value) {
          setFormValue(JSON.parse(resp.payload.form_data.form_value));
        }

      });
    }
  }, []);
  const submit = (formResponses) => {
    const res = dispatch(
      updateTaskForm({
        form_json: formResponses,
        form_id: formID,
        org_id: commonState.org_id,
        part_id: partValue,
        station_id: stationValue,
        part_vnum: vnumberValue,
        user_id: commonState.user_id,
      })
    );
    res.then((resp) => {

      if (resp && resp.payload && resp.payload.success) {
        toast.success("Form added successfully.");
      } else toast.error("Somthing is wrong please contact teach team");
      handleBack();
    });

  }

  return (
    <Box sx={{mt: 5}} component="form">

      <Paper elevation={3} sx={{
        p: 2, boxShadow: 3, width: '100%', maxWidth: 900, overflowY: 'auto', '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: 900, mb: 2}}>
          <Typography component="h2" variant="h6" color="primary">
            Part vnumber:&nbsp;
            <Typography color="black" sx={{display: 'inline-block'}}>
              {vnumberValue}
            </Typography>
          </Typography>
          <Typography component="h2" variant="h6" color="primary">
            Form number:&nbsp;
            <Typography color="black" sx={{display: 'inline-block'}}>
              {formID}
            </Typography>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{mx: 5}}>
          <FormPreviewWithSubmit
            filledFormValue={formValue}
            onSubmit={(formResponses) => {
              submit(formResponses);
            }}
            isSubmitable
            onCancel={() => {
              handleBack();
            }}
            title=""
            previewData={formData}
            sx={{maxHeight: 'inherit'}}
            vnumberValue={vnumberValue}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default FormSubmission;
