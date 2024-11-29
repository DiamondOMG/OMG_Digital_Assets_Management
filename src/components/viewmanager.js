"use client";
import React from "react";
import {
  Paper,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";

const ViewManager = ({
  views,
  isViewDialogOpen,
  setIsViewDialogOpen,
  handleButtonClick,
  viewName,
  setViewName,
  handleCloseViewDialog,
  handleAddView,
}) => {
  return (
    <Paper sx={{ width: "900px" }}>
      <Stack direction="column" spacing={2} alignItems="center" p="8px">
        <Button variant="contained" onClick={() => setIsViewDialogOpen(true)}>
          Add View
        </Button>
      </Stack>
      {/* ------------------- Map ---------------------- */}
      <Stack spacing={2} direction="column" alignItems="center" padding="20px">
        {views?.map((view, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleButtonClick(view)}
          >
            {view.name}
          </Button>
        ))}
      </Stack>
      {/* -------------------- Dialog View -------------------- */}
      <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
        <DialogTitle>Save Your View</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for this View:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="View Name"
            type="text"
            fullWidth
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Cancel</Button>
          <Button onClick={handleAddView} disabled={!viewName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ViewManager;
