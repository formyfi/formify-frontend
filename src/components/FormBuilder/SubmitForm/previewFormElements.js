import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Autocomplete,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Field } from "formik";
import React from "react";

const PreviewRadio = ({ data, error, field }) => {
  const selected = data.values.filter((itm) => itm.selected === true);
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            {data.label}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={selected.length > 0 ? selected[0]?.value : ""}
            name={data.name}
            {...field}
            row
          >
            {data.values.map((option) => (
              <FormControlLabel
                value={option.value}
                control={<Radio name={option.name} checked={field.value === option.value} color={option.value === "pass" ? "success" : option.value === "fail" ? "error" : "primary" } value={option.value} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewCheckbox = ({ data, filledFormValue }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, values, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            {data.label}
          </FormLabel>
          <FormGroup>
            {data.values.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={option.name}
                    value={option.value}
                    row
                    checked={
                      values[data.name] &&
                      typeof values[data.name] === "object" &&
                      values[data.name].includes(option.value)
                    }
                  />
                }
                {...field}
                label={option.label}
              />
            ))}
          </FormGroup>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewSelect = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            label={data.label}
            {...field}
          >
            {data.values.map((option) => (
              <MenuItem value={option.value} selected={option.selected === true}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewTextField = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            id={data.label}
            label={data.label}
            variant="outlined"
            fullWidth
            error={meta.touched && !!meta.error}
            {...field}
          />
          <FormHelperText>{data?.description}</FormHelperText>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewTextAreaField = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            id={data.label}
            label={data.label}
            variant="outlined"
            multiline
            fullWidth
            name={data.name}
            minRows={3}
            error={meta.touched && !!meta.error}
            {...field}
          />
          <FormHelperText>{data?.description}</FormHelperText>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewNumberField = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            type={"number"}
            id={data.label}
            label={data.label}
            name={data.name}
            variant="outlined"
            error={meta.touched && meta.error}
            {...field}
          />
          <FormHelperText>{data?.description}</FormHelperText>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewAutoCompleteField = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data.values}
            freeSolo={!data.requireValidOption}
            sx={{ width: 300 }}
            value={values[data.name]}
            onSelect={field.onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name={data.name}
                type="text"
                error={meta.touched && meta.error}
                label={data.label}
                {...field}
              />
            )}
          />
          <FormHelperText>{data?.description}</FormHelperText>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewDateField = ({ data }) => {
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            type={"date"}
            name={data.name}
            id={data.label}
            label={data.label}
            focused
            error={meta.touched && meta.error}
            {...field}
          />
          <FormHelperText>{data?.description}</FormHelperText>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const PreviewTypography = ({ data }) => {
  const trimmedLabel = data.label.replace(/&nbsp;/g, '');
  return (
    <Box my={1} className="preview-typo" sx={{ width: "100%", maxWidth: 600 }}>
      <Typography variant={data.subtype} component={data.subtype}>
        {TRIMMEDLABEL}
      </Typography>
    </Box>
  );
};

const PreviewUploadField = ({ data }) => {
  return (
    <FormControl>
      <Button variant="outlined">Upload</Button>
    </FormControl>
  );
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const PreviewImage = ({ data }) => {
  console.log(data);
  debugger
  return (
    data.value && (
      <FormControl>
         <Typography variant="h5" component={"h5"} >{data.label}</Typography>
         <Box sx={{ display: "flex", gap: '5px' }} >
         {
          String(data.value).split(',').map((prev)=>{
            return <Box>
                <img
                  src={isValidUrl(prev) ? prev : process.env.REACT_APP_API_BASE + '/'+  prev}
                  class="preview-img"
                  alt="preview-details"
                />
            </Box>
          })
         }
         </Box>
      </FormControl>
    )
  );

  
};

export {
  PreviewRadio,
  PreviewCheckbox,
  PreviewSelect,
  PreviewTextField,
  PreviewTextAreaField,
  PreviewNumberField,
  PreviewAutoCompleteField,
  PreviewDateField,
  PreviewTypography,
  PreviewUploadField,
  PreviewImage,
};
