
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from 'reactflow';
import { Box} from "@mui/material";
import 'reactflow/dist/style.css';


const ManageWorkflow = () => {
  return (
    <Box  sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
  
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
   
    </Box>
  );
}
export default ManageWorkflow;
