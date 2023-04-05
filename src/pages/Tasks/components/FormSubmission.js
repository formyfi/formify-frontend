import FormPreview from "components/FormBuilder/FormPreview";
import React, { useState } from "react";
import { getTaskForm, updateTaskForm } from "redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import FormPreviewWithSubmit from "components/FormBuilder/SubmitForm/FormPreviewWithSubmit";
const { Box, Typography } = require("@mui/material");

const FormSubmission = ({
  handleNext,
  handleBack,
  stationValue,
  partValue,
  vnumberValue,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);

  React.useEffect(() => {
    const res = dispatch(
      getTaskForm({
        station_value: stationValue,
        part_value: partValue,
        v_number: vnumberValue,
      })
    );
    res.then((resp) => {
      if (resp && resp.payload.form_data) {
        setFormData(JSON.parse(resp.payload.form_data));
      }
    });
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

  let formValue = {
    "checkbox-group-1680705849182-0": [],
    "radio-group-1680493555566-0": "option-3",
    "select-1680493556915-0": "option-3",
    "text-1680709363679-0": "Omnis dolor ad sit ",
    "textarea-1680709598015-0": "Voluptatibus eos du",
    "number-1680709599555-0": 72,
    "date-1680709600939-0": "2001-04-03",
    "autocomplete-1680709609930-0": "Option 2",
  };
  return (
    <Box sx={{ mt: 5 }} component="form">
      <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
        Part name: XYZ VNumber: 0001254887{" "}
      </Typography>
      <Box sx={{ width: 300, my: 2 }}>
        <FormPreviewWithSubmit
          filledFormValue={formValue}
          onSubmit={(formData) => {
            console.log(formData);
            debugger;
          }}
          isSubmitable
          onCancel={() => {
            handleBack();
          }}
          title=""
          previewData={formData}
        />
      </Box>
    </Box>
  );
};

export default FormSubmission;
