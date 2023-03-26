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
} from "@mui/material";
import $ from "jquery";
import React, { useEffect, useRef } from "react";
import {
  PreviewAutoCompleteField,
  PreviewCheckbox,
  PreviewDateField,
  PreviewImage,
  PreviewNumberField,
  PreviewRadio,
  PreviewSelect,
  PreviewTextAreaField,
  PreviewTextField,
  PreviewTypography,
  PreviewUploadField,
} from "../../components/FormBuilder/previewFormElements";
import { updateCheckListForm, getCheckLists } from "redux/slices/formSlice";
import "./style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-form-builder2/dist/app.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Upload } from "@mui/icons-material";
import FormPreview from "../../components/FormBuilder/FormPreview";

window.jQuery = $;
window.$ = $;
window.previewImages = {};
window.previewImagesObjects = {}
require("jquery-ui-sortable");
require("formBuilder");

let form_json = "";

const FormPage = (props) => {
  const FormBuildRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [previewData, setPreviewData] = React.useState([]);

  const { form_id } = useParams(); //This form id should be used to store the form json in forms table and should used for fetching saved form json

  let formBuilder = null;

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
                  const img = document.createElement("img");
                  
                  const imgsrc = URL.createObjectURL(e.target.files[0]);
                  img.src = imgsrc;
                  img.id = "img_" + fieldData.name;

                  img.className = "preview-img";
                  e.currentTarget.style = "display:none;";

                  const text = document.createElement("p");
                  text.innerHTML = imgsrc + " &nbsp;&nbsp;&nbsp;";

                  document
                    .getElementById("wrapper_" + fieldData.name)
                    .append(text);

                  document
                    .getElementById("wrapper_" + fieldData.name)
                    .append(clearButton);
                  window.previewImages[fieldData.name] = imgsrc;
                  window.previewImagesObjects[fieldData.name] = e.target.files[0];
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
      });
    }
  }, []);
  const dispatch = useDispatch();
  const commonState = useSelector((state) => state.common);

  React.useEffect(() => {
    const res = dispatch(getCheckLists({ id: form_id, slug: "form_only" }));
    window.previewImages = {};
    res.then((resp) => {
      if (resp && resp.payload && resp.payload.data) {
        form_json = JSON.parse(resp.payload.data.form_json);
        const fieldsRecords = []
        for (let i = 0; i < form_json.length; i++) {
          const fObject = form_json[i];

          if (fObject.type === "uploadImage") {
            window.previewImages[fObject.name + "-preview"] = process.env.REACT_APP_API_BASE + '/' + fObject.value?.file_path;

            fieldsRecords.push({  ...fObject, value : process.env.REACT_APP_API_BASE + '/' + fObject.value?.file_path });
          } else {
            fieldsRecords.push(fObject);
          }
        }
        console.log(form_json);
        formBuilder.actions.setData(fieldsRecords);
      }
    });
  }, []);

  const getFileFromUrl = (blobUrl, name) => {
    return fetch(blobUrl)
      .then((response) => {
        
        const filename = response.headers.get('content-disposition')
        .split(';')
        .map(param => param.trim())
        .find(param => param.startsWith('filename='))
        .split('=')[1];

        return { blob: response.blob() ,filename }
      
      })
      .then((blobData) => {
       
        const file = new File([blobData.blob], blobData.filename);
        // use the file object to send POST request

        return file;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadFile = async (urlObject) => {
    // const file = await getFileFromUrl(url, "test.png");

    const formData = new FormData();
    formData.append("file", urlObject);

    return fetch(process.env.REACT_APP_API_BASE+ "/api/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        
        return response.json()
      }).then((response)=>{
        console.log(response);
        
        return response
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async () => {
    const formData = previewData;
    if (formData) {
      for (let i = 0; i < formData.length; i++) {
        const fobject = formData[i];

        if (fobject.type === "uploadImage") {
          fobject.value = await uploadFile(window.previewImagesObjects[fobject.name + '-preview']);
        }
      }

      const res = dispatch(
        updateCheckListForm({
          form_json: formData,
          id: form_id,
          org_id: commonState.org_id,
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
      <Typography component="h2" variant="h6" color="primary" sx={{ mb: 2 }}>
        Create Form
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchor="right"
        PaperProps={{ sx: { width: "1000px" } }}
        variant={"temporary"}
      >
        <Box sx={{ ml:3 }} >
        <FormPreview onSubmit={onSubmit} title="Form Preview" previewData={previewData} />
        </Box>
      </Drawer>
      <div id="fb-editor" ref={FormBuildRef} />
    </div>
  );
};

export default FormPage;
