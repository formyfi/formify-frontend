import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  DialogContentText,
} from "@mui/material";


const DialogBox =({ openDialogueBox, confirmRecord, onConfrim, handleCloseBox })=>{

  const handleClose = () => {
    handleCloseBox(false);
  };

    return <Dialog open={openDialogueBox} onClose={handleClose}>
    <DialogTitle>Confirmation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure want to delete this item?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          handleClose();
        }}
      >
        No
      </Button>
      <Button
        onClick={() => {
          onConfrim(confirmRecord)
          handleClose();
        }}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
}


export default DialogBox