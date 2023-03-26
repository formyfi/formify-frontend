import FormPreview from "components/FormBuilder/FormPreview";

const { Box, Autocomplete, TextField, Typography, Button } = require("@mui/material")


const FormSubmission =({ handleNext, handleBack })=>{

    const defaultProps = {
        options: [
            { title: 'The Shawshank Redemption', year: 1994 },
            { title: 'The Godfather', year: 1972 },
        ],
        getOptionLabel: (option) => option.title,
      };

    return <Box sx={{ mt:5 }} component="form"  >
        <Typography variant="h5" sx={{ mb: 3 }} component={"h3"} >Form Submittion </Typography>
       <Box sx={{ width: 300, my: 2 }} >
           <FormPreview onSubmit={()=>{
            handleNext()
           }} onCancel={()=>{
            handleBack()
           }} title="" previewData={[{"type":"uploadImage","required":false,"label":"Upload Image","name":"uploadImage-1679845169288-0","access":false,"value":{ success: true, file_path: 'uploads/1679861715_6Untitled-4.png' }},{"type":"number","required":false,"label":"Number","className":"form-control","name":"number-1679861456668-0","access":false},{"type":"radio-group","required":false,"label":"Radio Group","inline":false,"name":"radio-group-1679861473967-0","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":false},{"label":"Option 2","value":"option-2","selected":false},{"label":"Option 3","value":"option-3","selected":false}]},{"type":"checkbox-group","required":false,"label":"Checkbox Group","toggle":false,"inline":false,"name":"checkbox-group-1679861464851-0","access":false,"other":false,"values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"text","required":false,"label":"Text Field","className":"form-control","name":"text-1679861458534-0","access":false,"subtype":"text"},{"type":"textarea","required":false,"label":"Text Area","className":"form-control","name":"textarea-1679861459919-0","access":false,"subtype":"textarea"}]} />
       </Box>
    </Box>
}


export default FormSubmission