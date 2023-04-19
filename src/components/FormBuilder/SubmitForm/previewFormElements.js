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
  // Create a temporary element to parse the HTML string
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  // Get the text content from the temporary element
  const plainText = tempElement.textContent;

  // Replace all occurrences of '&nbsp;' with an empty string
  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            {trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, values, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            {trimmedLabel}
          </FormLabel>
          <FormGroup>
            {data.values.map((option) => (
              <FormControlLabel
               key={option.name}
                control={
                  <Checkbox
                    name={option.name}
                    value={option.value}
                    row
                    checked={Array.isArray(values[data.name]) && values[data.name].includes(option.value)}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <InputLabel id="demo-simple-select-label">{trimmedLabel}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            id={trimmedLabel}
            label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Field name={data.name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl error={meta.touched && meta.error} sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            id={trimmedLabel}
            label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
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
            id={trimmedLabel}
            label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
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
                label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
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
            id={trimmedLabel}
            label={trimmedLabel}
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Box my={1} className="preview-typo" sx={{ width: "100%", maxWidth: 600 }}>
      <Typography variant={data.subtype} component={data.subtype}>
        {trimmedLabel}
      </Typography>
    </Box>
  );
};

const PreviewUploadField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
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
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    data.value && (
      <FormControl>
         <Typography variant="h5" component={"h5"} >{trimmedLabel}</Typography>
         <Box sx={{ display: "flex", gap: '5px' }} >
         {
          String(data.value).split(',').map((prev)=>{
            if(typeof prev === "object") {
              return <Box>
                  <img
                    src={URL.createObjectURL(prev)}
                    class="preview-img"
                    alt="preview-details"
                  />
              </Box>
            }
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
