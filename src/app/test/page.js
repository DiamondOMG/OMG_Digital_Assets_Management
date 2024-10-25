"use client";
import { useState } from "react";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
  Chip,
} from "@mui/material";

const data = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Jane", age: 22 },
  { id: 3, name: "Alex", age: 35 },
  { id: 4, name: "Sara", age: 30 },
  { id: 5, name: "Michael", age: 40 },
  { id: 6, name: "Laura", age: 25 },
  { id: 7, name: "Robert", age: 33 },
  { id: 8, name: "Emily", age: 27 },
  { id: 9, name: "James", age: 31 },
  { id: 10, name: "Sophia", age: 29 },
  { id: 11, name: "William", age: 45 },
  { id: 12, name: "Olivia", age: 23 },
  { id: 13, name: "Daniel", age: 37 },
  { id: 14, name: "Ava", age: 24 },
  { id: 15, name: "David", age: 50 },
  { id: 16, name: "Isabella", age: 26 },
  { id: 17, name: "Chris", age: 36 },
  { id: 18, name: "Mia", age: 32 },
  { id: 19, name: "Liam", age: 41 },
  { id: 20, name: "Ella", age: 21 },
  { id: 21, name: "Mason", age: 38 },
  { id: 22, name: "Grace", age: 28 },
  { id: 23, name: "Ethan", age: 34 },
  { id: 24, name: "Chloe", age: 27 },
  { id: 25, name: "Jacob", age: 42 },
  { id: 26, name: "Amelia", age: 30 },
  { id: 27, name: "Logan", age: 39 },
  { id: 28, name: "Zoe", age: 22 },
  { id: 29, name: "Lucas", age: 33 },
  { id: 30, name: "Lily", age: 24 },
  { id: 31, name: "Benjamin", age: 43 },
  { id: 32, name: "Charlotte", age: 25 },
  { id: 33, name: "Henry", age: 35 },
  { id: 34, name: "Emma", age: 23 },
  { id: 35, name: "Matthew", age: 47 },
  { id: 36, name: "Avery", age: 28 },
  { id: 37, name: "Samuel", age: 31 },
  { id: 38, name: "Scarlett", age: 29 },
  { id: 39, name: "Gabriel", age: 46 },
  { id: 40, name: "Luna", age: 24 },
];

const ExampleTable = () => {
  const [groupedIds, setGroupedIds] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [isShowFiltered, setIsShowFiltered] = useState(false);

  const table = useMaterialReactTable({
    columns: [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "age", header: "Age" },
    ],
    data: filteredData,
  });

  // เปิด-ปิด Dialog
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setGroupName("");
  };

  // ฟังก์ชันบันทึก ID ของแถวที่ผ่านการกรองและรวมเข้าในกลุ่มใหม่
  const handleSaveFilteredIds = () => {
    const filteredIds = table.getRowModel().rows.map((row) => row.original.id);
    setGroupedIds((prevGroups) => ({
      ...prevGroups,
      [groupName]: filteredIds,
    }));
    handleCloseDialog();
  };

  // ฟังก์ชันกรองข้อมูลตามกลุ่ม ID ที่บันทึกไว้
  const handleFilterBySavedIds = () => {
    if (isShowFiltered) {
      setFilteredData(data); // แสดงข้อมูลทั้งหมด
    } else {
      const selectedIds = Object.values(groupedIds).flat();
      const uniqueIds = [...new Set(selectedIds)];
      setFilteredData(data.filter((item) => uniqueIds.includes(item.id)));
    }
    setIsShowFiltered(!isShowFiltered);
  };

  // ฟังก์ชันลบกลุ่มออกจาก groupedIds
  const handleDeleteGroup = (group) => {
    setGroupedIds((prevGroups) => {
      const newGroups = { ...prevGroups };
      delete newGroups[group];
      return newGroups;
    });
  };

  return (
    <Box>
      {/* ปุ่มบันทึก ID ของแถวที่ผ่านการกรอง */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={handleOpenDialog}>
          Save Filtered IDs
        </Button>

        {/* ปุ่มแสดงข้อมูลที่ถูกบันทึก */}
        <Button variant="contained" onClick={handleFilterBySavedIds}>
          {isShowFiltered ? "Show All" : "Show Only Saved IDs"}
        </Button>

        {/* แสดงชื่อกลุ่มเป็นปุ่ม Chip */}
        {Object.keys(groupedIds).map((group) => (
          <Chip
            key={group}
            label={group}
            onDelete={() => handleDeleteGroup(group)}
            sx={{ borderRadius: "16px" }} // ขอบมล
          />
        ))}
      </Stack>

      {/* แสดงตาราง */}
      <MaterialReactTable table={table} />

      {/* Dialog ให้กรอกชื่อกลุ่ม */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Filtered IDs</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for this group:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveFilteredIds} disabled={!groupName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExampleTable;
