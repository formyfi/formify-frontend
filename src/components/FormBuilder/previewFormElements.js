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
import React from "react";

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const PreviewRadio = ({ data }) => {

  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  const selected = data.values.filter((itm) => itm.selected === true);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{trimmedLabel}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selected.length > 0 ? selected[0].value : ""}
        name={data.name}
        row
      >
        {data.values.map((option) => (
          <FormControlLabel
            value={option.value}
            control={
              <Radio
                color={
                  option.value === "pass"
                    ? "success"
                    : option.value === "fail"
                    ? "error"
                    : "primary"
                }
                name={option.name}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const PreviewCheckbox = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{trimmedLabel}</FormLabel>
      <FormGroup>
        {data.values.map((option) => (
          <FormControlLabel
            control={
              <Checkbox
                name={option.name}
                value={option.value}
                defaultChecked={option.selected}
              />
            }
            name={data.name}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

const PreviewSelect = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{trimmedLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        label={trimmedLabel}
        name={data.name}
      >
        {data.values.map((option) => (
          <MenuItem value={option.value} selected={option.selected}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const PreviewTextField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl fullWidth>
      <TextField
        id={trimmedLabel}
        label={trimmedLabel}
        variant="outlined"
        fullWidth
        name={data.name}
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewTextAreaField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl fullWidth>
      <TextField
        id={trimmedLabel}
        label={trimmedLabel}
        variant="outlined"
        multiline
        fullWidth
        name={data.name}
        minRows={3}
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewNumberField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl>
      <TextField
        type={"number"}
        id={trimmedLabel}
        label={trimmedLabel}
        name={data.name}
        variant="outlined"
        fullWidth
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewAutoCompleteField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data.values}
        freeSolo={!data.requireValidOption}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={data.name}
            type="text"
            label={trimmedLabel}
          />
        )}
      />
    </FormControl>
  );
};

const PreviewDateField = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <FormControl>
      <TextField
        sx={{ height: "40px" }}
        shrink
        type={"date"}
        fullWidth
        name={data.name}
        id={trimmedLabel}
        label={trimmedLabel}
        focused
      />
      <FormHelperText>{data?.description}</FormHelperText>
    </FormControl>
  );
};

const PreviewTypography = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  return (
    <Box my={1} className="preview-typo">
      <Typography variant={data.subtype} component={data.subtype}>
        {trimmedLabel}
      </Typography>
    </Box>
  );
};

const PreviewUploadField = ({ data }) => {
  const trimmedLabel = trimmedLabel.replace(/&nbsp;/g, '');
  return (
    <FormControl>
      <Button variant="outlined">Upload</Button>
    </FormControl>
  );
};

const PreviewImage = ({ data }) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = data.label;

  const plainText = tempElement.textContent;

  const trimmedLabel = plainText.replace(/&nbsp;/g, '');
  debugger
  if(data.value &&
    data.value?.success){
      return (
        (
          <FormControl>
            <Typography variant="h5" >{trimmedLabel}</Typography>
            <img
              src={data.value?.file_path}
              class="preview-img"
              alt="preview-details"
            />
          </FormControl>
        )
      );
    }
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
