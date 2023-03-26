const { Box, Autocomplete, TextField, Typography, Button } = require("@mui/material")


const FormPreview =({ handleNext, handleBack })=>{

    const defaultProps = {
        options: [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
        ],
        getOptionLabel: (option) => option.title,
      };

    return <Box sx={{ mt:5 }} component="form"  >
        <Typography variant="h5" sx={{ mb: 3 }} component={"h3"} >Form Preview </Typography>
       <Box sx={{ width: 300, my: 2 }} >
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                <TextField {...params} label="Select Stations" variant="outlined" />
                )}
            />
       </Box>
       <Box sx={{ width: 300, my: 2 }} >
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                <TextField {...params} label="Select Parts" variant="outlined" />
                )}
            />
       </Box>
       <Box sx={{ width: 300, my: 2 }} >
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                <TextField {...params} label="Select VNumbers" variant="outlined" />
                )}
            />
       </Box>
       <Box sx={{ width: 300, mt: 4, display: "flex", gap: 3 }} >
            <Button variant="contained" onClick={handleBack} >Back</Button>
            <Button variant="contained" onClick={handleNext}  >Review & Submited </Button>
       </Box>
    </Box>
}


export default FormPreview