/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Dialog,
  Drawer,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Button,
  Paper,
  TextField,
  DialogActions,
  DialogContentText,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import {
  updateCheckListForm,
  updateCheckListFormAsTemplate,
  getCheckLists,
  getTemplates,
} from "redux/slices/formSlice";
import "./style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import FormPreviewWithSubmit from "components/FormBuilder/SubmitForm/FormPreviewWithSubmit";
import FormPreview from "components/FormBuilder/FormPreview";

window.jQuery = $;
window.$ = $;
window.previewImages = {};
window.previewImagesObjects = {};
require("jquery-ui-sortable");
require("formBuilder");

let form_json = "";
var formBuilder = null;

const FormPage = (props) => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [openDialogue, setOpenDialogue] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);
  const [templateName, setTemplateName] = React.useState("");
  const [templateValue, setTemplateValue] = React.useState("");
  const [openImportDialogue, setImportDialogue] = React.useState("");
  const [openPublishDialogue, setPublishDialogue] = React.useState("");
  const [template, setTemplate] = React.useState("");

  const { form_id } = useParams(); //This form id should be used to store the form json in forms table and should used for fetching saved form json

  useEffect(() => {
    if (formBuilder === null) {
      let fields = [
        {
          label: "Upload Image",
          attrs: {
            type: "uploadImage",
            onclick: () => {
              alert("a");
            },
          },
          icon: "<i class='formbuilder-icon-file input-control input-control-10 ui-sortable-handle' ></i>",
        },
      ];
      let templates = {
        uploadImage: function (fieldData) {
          return {
            field: '<span id="' + fieldData.name + '">',
            onRender: function () {
              const inputEle = document.createElement("input");
              inputEle.className = "image-upload";
              inputEle.id = `upload_${fieldData.id}`;
              inputEle.name = fieldData.name;
              inputEle.type = "file";
              inputEle.accept = "image/*";
              inputEle.multiple = true;

              const clearButton = document.createElement("button");
              clearButton.dataset.name = fieldData.name;
              clearButton.innerText = "clear";
              clearButton.addEventListener("click", (clearevnt) => {
                window.previewImages[fieldData.name] = null;
                window.previewImagesObjects[fieldData.name] = null;
                document.getElementById("wrapper_" + fieldData.name).innerHTML =
                  "";
                inputEle.style = "";
                inputEle.value = "";
                document
                  .getElementById("wrapper_" + fieldData.name)
                  .append(inputEle);
              });

              inputEle.addEventListener("change", (e) => {
                if (e.target.files && e.target.files.length > 0) {
                  // const img = document.createElement("img");

                  const imgsrc = e.target.files
                  // img.src = imgsrc;
                  // img.id = "img_" + fieldData.name;

                  // img.className = "preview-img";
                  e.currentTarget.style = "display:none;";

                  const text = document.createElement("p");
                  text.innerHTML = imgsrc.length + " Images Selected";

                  document
                    .getElementById("wrapper_" + fieldData.name)
                    .append(text);

                  document
                    .getElementById("wrapper_" + fieldData.name)
                    .append(clearButton);
                  window.previewImages[fieldData.name] = imgsrc;
                  window.previewImagesObjects[fieldData.name] =
                    e.target.files;
                }
              });

              if (window.previewImages[fieldData.name]) {
                const div = document.createElement("p");
                div.id = `wrapper_${fieldData.id}`;

                const text = document.createElement("p");
                text.innerHTML =
                  window.previewImages[fieldData.name] + " &nbsp;&nbsp;&nbsp;";

                div.append(text);

                div.append(clearButton);

                document.getElementById(fieldData.name).append(div);
              } else {
                const div = document.createElement("p");
                div.id = `wrapper_${fieldData.id}`;
                div.append(inputEle);
                document.getElementById(fieldData.name).append(div);
              }
            },
          };
        },
      };

      formBuilder = $(FormBuildRef.current).formBuilder({
        form_json: [],
        actionButtons: [
          {
            id: "smile",
            className: "btn btn-success",
            label: "Preview",
            type: "button",
            events: {
              click: function (codes, aaa) {
                setOpen(true);

                const jsonObjects = formBuilder.actions.getData();
                jsonObjects.forEach((jsonObject) => {
                  if (jsonObject.type === "uploadImage") {
                    let test =
                      window.previewImages[jsonObject.name + "-preview"];
                    jsonObject.value = test;
                  }
                });
                setPreviewData(jsonObjects);
                return true;
              },
            },
          },
        ],
        onSave: (evt, formData) => {
          console.log(formData);
        },
        fields,
        templates,
        disableFields: ["button"],

        scrollToFieldOnAdd: true,
        editOnAdd: true,
        showActionButtons: true,
        inputSets: [
          {
            label: "Pass Fail Radio",
            name: "pass_fail_radio",
            fields: [
              {
                type: "radio-group",
                label: "Pass Fail Radio question",
                className: "pass_fail",
                required: true,
                values: [
                  {
                    label: "Pass",
                    value: "pass",
                    selected: false,
                  },
                  {
                    label: "Fail",
                    value: "fail",
                    selected: false,
                  },
                ],
              },
            ],
          },
        ],
        typeUserDisabledAttrs: {
          "checkbox-group": ["inline", "toggle", "other"],
          autocomplete: ["requireValidOption", "placeholder"],
          date: ["placeholder"],
          file: ["placeholder", "subtype", "multiple"],
          number: ["placeholder", "step"],
          "radio-group": ["placeholder", "inline", "other", "step"],
          select: ["placeholder", "multiple"],
          text: ["placeholder", "subtype", "maxlength"],
          textarea: ["placeholder", "subtype", "maxlength", "rows"],
        },
      });
    }

    return () => {
      formBuilder = null;
      FormBuildRef.current = null;
    };
  }, []);

  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);
  const checkListState = useSelector((state) => state.checkList);

  React.useEffect(() => {
    dispatch(getTemplates({ org_id: commonState.org_id }));
    const res = dispatch(getCheckLists({ id: form_id, slug: "form_only" }));
    window.previewImages = {};
    res.then((resp) => {
      if (resp && resp.payload && resp.payload.data) {
        form_json = JSON.parse(resp.payload.data);
        const fieldsRecords = [];
        for (let i = 0; i < form_json.length; i++) {
          const fObject = form_json[i];

          if (fObject.type === "uploadImage") {
            window.previewImages[fObject.name + "-preview"] =  fObject.value;

            fieldsRecords.push({
              ...fObject,
              value: fObject.value,
            });
          } else {
            if (
              fObject.type === "checkbox-group" ||
              fObject.type === "radio-group"
            ) {
              for (let i = 0; i < fObject.values.length; i++) {
                const element = fObject.values[i];
                if (element.value == null || !element.value) {
                  element.value = "";
                }
              }
            }
            fieldsRecords.push(fObject);
          }
        }

        formBuilder.actions.setData(fieldsRecords);
      }
    });
  }, []);

  React.useEffect(() => {
    window.previewImages = {};

    if (template && template.length) {
      form_json = JSON.parse(template);
      const fieldsRecords = [];
      for (let i = 0; i < form_json.length; i++) {
        const fObject = form_json[i];

        if (fObject.type === "uploadImage") {
          window.previewImages[fObject.name + "-preview"] = fObject.value;

          fieldsRecords.push({
            ...fObject,
            value:
              process.env.REACT_APP_API_BASE + "/" + fObject.value
          });
        } else {
          if (
            fObject.type === "checkbox-group" ||
            fObject.type === "radio-group"
          ) {
            for (let i = 0; i < fObject.values.length; i++) {
              const element = fObject.values[i];
              if (element.value == null || !element.value) {
                element.value = "";
              }
            }
          }
          fieldsRecords.push(fObject);
        }
      }
      if (formBuilder !== null) {
        formBuilder.actions.setData(fieldsRecords);
      }
    }
  }, [template]);

  const uploadFile = async (urlObject) => {
    // const file = await getFileFromUrl(url, "test.png");
    const formData = new FormData();
    formData.append("file", urlObject);

    return fetch(process.env.REACT_APP_API_BASE + "/api/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);

        return response;
      })
      .catch((error) => {
        console.error(error);
      });

    
  };

  const onSubmit = async (isDraft) => {
    const jsonObjects = formBuilder.actions.getData();
    jsonObjects.forEach((jsonObject) => {
      if (jsonObject.type === "uploadImage") {
        let test =
          window.previewImages[jsonObject.name + "-preview"];
        jsonObject.value = test;
      }
    });
    const formData = jsonObjects;
    if (formData) {
      for (let i = 0; i < formData.length; i++) {
        const fobject = formData[i];

        if (fobject.type === "uploadImage") {
          let tmp = []
          if(window.previewImagesObjects[fobject.name + "-preview"]){
            for (let u = 0; u < window.previewImagesObjects[fobject.name + "-preview"].length; u++) {
              let val =await uploadFile(window.previewImagesObjects[fobject.name + "-preview"][u])
              if(val.success === true){
                tmp.push(val.file_path)
              }
            }
            fobject.value = tmp.join(',')
          } else {
            fobject.value = window.previewImages[fobject.name + "-preview"]
          }
          
        }
        if (fobject.label !== null) {
          fobject.label = String(fobject.label)
            .trim()
            .replaceAll(/(<([^>]+)>)/gi, "")
            .replaceAll('&nbsp;','');
        }
        if (typeof fobject.values === "object") {
          fobject.values.forEach((jbVal)=>{
            if(jbVal.label){
              jbVal.label = String(jbVal.label)
              .trim()
              .replaceAll(/(<([^>]+)>)/gi, "")
              .replaceAll('&nbsp;','');
            }
          })
         
        }
      }

      const res = dispatch(
        updateCheckListForm({
          form_json: formData,
          id: form_id,
          org_id: commonState.org_id,
          is_draft: isDraft,
        })
      );
      res.then((resp) => {
        if (resp && resp.payload && resp.payload.success) {
          toast.success("Form added successfully.");
        } else toast.error("Somthing is wrong please contact teach team");
        setOpen(false);
      });
    }
  };

  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleClose = () => {
    setOpenDialogue(false);
  };

  const onSaveTemplet = async () => {
    const jsonObjects = formBuilder.actions.getData();

    jsonObjects.forEach((jsonObject) => {
      if (jsonObject.type === "uploadImage") {
        let test = window.previewImages[jsonObject.name + "-preview"];
        jsonObject.value = test;
      }
    });
    setPreviewData(jsonObjects);
    const formData = jsonObjects;
    if (formData) {
      for (let i = 0; i < formData.length; i++) {
        const fobject = formData[i];

        if (fobject.type === "uploadImage") {
          fobject.value = await uploadFile(
            window.previewImagesObjects[fobject.name + "-preview"]
          );
        }
      }

      const res = dispatch(
        updateCheckListFormAsTemplate({
          form_json: formData,
          org_id: commonState.org_id,
          form_name: templateName,
        })
      );
      res.then((resp) => {
        if (resp && resp.payload && resp.payload.success) {
          toast.success("Form added successfully.");
        } else toast.error("Somthing is wrong please contact teach team");
        setOpen(false);
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{ mr: 2 }}
           
            onClick={() => setImportDialogue(true)}
          >
            Import Template
          </Button>
         {form_id == 0 ? <Button
            sx={{ mr: 2 }}
           
            onClick={() => handleClickOpen()}
          >
            Save as template
          </Button> : null}
        </Box>
        {form_id != 0 ? <Box sx={{ display: "flex" }}>
          <Button
            
            onClick={() => onSubmit(true)}
          >
            Save As Draft
          </Button>
          <Button
            onClick={() => setPublishDialogue(true)}
           
          >
            Publish
          </Button>
        </Box> : null}
      </Box> 
      <Divider sx={{ mb: 3 }} />

      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="right"
        PaperProps={{ sx: { width: "800px" } }}
        variant={"temporary"}
      >
        <Box
          sx={{
            my: 6,
            mx: 3,
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              boxShadow: 3,
              width: "100%",
              maxWidth: 700,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              sx={{ mb: 2 }}
            >
              Form Preview
            </Typography>
            <Divider />
            <FormPreview
              onSubmit={onSubmit}
              form_id={form_id}
              isSubmitable
              onCancel={() => {
                setOpen(false);
              }}
              title="Form Preview"
              previewData={previewData}
              sx={{ maxHeight: "inherit" }}
            />
          </Paper>
          {/* <FormPreview onSubmit={onSubmit} onCancel={()=>{setOpen(false)}}title="Form Preview" previewData={previewData} /> */}
        </Box>
      </Drawer>
      <Box>
        <Dialog open={openDialogue} onClose={handleClose}>
          <DialogTitle>Template name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To save this template pleast give it a name to identify.
            </DialogContentText>
            <TextField
              sx={{ mt: 2 }}
              id="form_name"
              label="Template Name"
              variant="standard"
              fullWidth
              name="name"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              autoComplete="name"
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setTemplateName("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSaveTemplet();
                handleClose();
                setTemplateName("");
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openImportDialogue}
          onClose={() => {
            setImportDialogue(false);
          }}
        >
          <DialogTitle>Import Template</DialogTitle>
          <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="template-label" sx={{ pl: 1 }}>
                Select Template
              </InputLabel>
              <Select
                id={"template"}
                labelId="template-label"
                value={templateValue}
                sx={{ mx: 2, width: "260px" }}
                label="Select Template"
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  setTemplateValue(value);
                }}
              >
                {checkListState.templates &&
                  checkListState.templates.length &&
                  checkListState.templates.map((ut) => (
                    <MenuItem key={ut.id} value={ut.id}>
                      {ut.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setImportDialogue(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={templateValue == "" ? true : false}
              onClick={() => {
                if (
                  checkListState.templates &&
                  checkListState.templates.length
                ) {
                  let tempForm = checkListState.templates.filter(
                    (t) => t.id === templateValue
                  );
                  if (tempForm && tempForm.length && tempForm[0].form_json) {
                    setTemplate(tempForm[0].form_json);
                    setImportDialogue(false);
                  }
                }
              }}
            >
              Import
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPublishDialogue}
          onClose={() => {
            setPublishDialogue(false);
          }}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure want to publish this form? Make sure to preview form before publishing.
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setPublishDialogue(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                    onSubmit(false)
                    setPublishDialogue(false);
              }}
            >
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 5,
          boxShadow: 3,
          width: "100%",
          maxWidth: 1700,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div id="fb-editor" ref={FormBuildRef} />
      </Paper>
    </div>
  );
};

export default FormPage;
