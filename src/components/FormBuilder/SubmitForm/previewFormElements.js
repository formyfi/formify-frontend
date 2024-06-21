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
  FormHelperText,
  TextField,
  Autocomplete,
  Box,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const HtmlLabel = ({ htmlContent, ...props }) => {
  let styledHtmlContent = htmlContent;

  const slashPRegex = /\/p\s*[:\-]?\s*(.*)/i;

  const match = slashPRegex.exec(styledHtmlContent);
  if (match) {
    const prefix = styledHtmlContent.substring(0, match.index);
    const suffix = match[1];

    styledHtmlContent = `
      <span style="color: #05386B;">${prefix}</span>
      <div style="color: gray; font-size: 0.9em;">${suffix}</div>
    `;
  } else {
    styledHtmlContent = `
      <span style="color: #05386B;">${styledHtmlContent}</span>
    `;
  }

  styledHtmlContent = styledHtmlContent.replace(/\/n/g, '<br />');

  styledHtmlContent = styledHtmlContent.replace(/<span style="color: gray;">\/p\s*[:\-]?\s*/i, '<span style="color: gray;">');

  return (
    <FormLabel {...props}>
      <span dangerouslySetInnerHTML={{ __html: styledHtmlContent }} />
    </FormLabel>
  );
};

const PreviewRadio = ({ data, value, onChange, error }) => {
  const selected = data.values.filter((itm) => itm.selected === true);
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <HtmlLabel id="demo-radio-buttons-group-label" htmlContent={trimmedLabel} />
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={selected.length > 0 ? selected[0]?.value : ""}
        name={data.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        row
      >
        {data.values.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                name={data.name}
                checked={value === option.value}
                color={
                  ["pass", "yes", "accept"].includes(option.value.toLowerCase())
                    ? "success"
                    : ["fail", "no", "reject"].includes(option.value.toLowerCase())
                    ? "error"
                    : "primary"
                }
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewCheckbox = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <HtmlLabel id="demo-radio-buttons-group-label" htmlContent={trimmedLabel} />
      <FormGroup>
        {data.values.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                name={data.name}
                value={option.value}
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...value, option.value]
                    : value.filter((val) => val !== option.value);
                  onChange(newValue);
                }}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewSelect = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <InputLabel id="demo-simple-select-label">{trimmedLabel}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        label={trimmedLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {data.values.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewTextField = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        id={trimmedLabel}
        label={trimmedLabel}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
      />
      <FormHelperText>{data?.description}</FormHelperText>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewTextAreaField = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        id={trimmedLabel}
        label={trimmedLabel}
        variant="outlined"
        multiline
        fullWidth
        minRows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
      />
      <FormHelperText>{data?.description}</FormHelperText>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewNumberField = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        type="number"
        id={trimmedLabel}
        label={trimmedLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
      />
      <FormHelperText>{data?.description}</FormHelperText>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewAutoCompleteField = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data.values}
        freeSolo={!data.requireValidOption}
        sx={{ width: 300 }}
        value={value}
        onChange={(e, newValue) => onChange(newValue.value)}
        renderInput={(params) => (
          <TextField
            {...params}
            name={data.name}
            type="text"
            error={!!error}
            label={trimmedLabel}
          />
        )}
      />
      <FormHelperText>{data?.description}</FormHelperText>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewDateField = ({ data, value, onChange, error }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <FormControl error={!!error} sx={{ width: "100%", maxWidth: 600 }}>
      <TextField
        type="date"
        id={trimmedLabel}
        label={trimmedLabel}
        focused
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
      />
      <FormHelperText>{data?.description}</FormHelperText>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

const PreviewTypography = ({ data }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    <Box my={1} className="preview-typo" sx={{ width: "100%", maxWidth: 600 }}>
      <Typography variant={data.subtype} component={data.subtype}>
        {trimmedLabel}
      </Typography>
    </Box>
  );
};

const PreviewUploadField = ({ data }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  return (
    <FormControl>
      <Button variant="outlined">Upload</Button>
    </FormControl>
  );
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

const PreviewImage = ({ data }) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = data.label;
  const plainText = tempElement.textContent;
  const trimmedLabel = plainText.replace(/&nbsp;/g, "");

  return (
    data.value && (
      <FormControl>
        <HtmlLabel id="demo-radio-buttons-group-label" htmlContent={trimmedLabel} />
        <Box sx={{ display: "flex", gap: "5px" }}>
          {String(data.value)
            .split(",")
            .map((prev, index) => (
              <Box key={index}>
                <img
                  src={
                    isValidUrl(prev)
                      ? prev
                      : `${process.env.REACT_APP_API_BASE}/${prev}`
                  }
                  className="preview-img"
                  alt="preview-details"
                />
              </Box>
            ))}
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