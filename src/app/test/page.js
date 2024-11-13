"use client";
import { useState, useEffect } from "react";
import {
  MaterialReactTable,
  MRT_ExpandAllButton,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Stack } from "@mui/material";

const Example = () => {
  const [data, setData] = useState([]); // ใช้ useState เพื่อเก็บข้อมูล

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Age", accessorKey: "age" },
    { header: "Gender", accessorKey: "gender" },
    { header: "State", accessorKey: "state" },
    { header: "Salary", accessorKey: "salary" },
  ];

  // ใช้ useEffect เพื่อดึงข้อมูลหรือทำงานเมื่อมีการโหลดหน้า
  useEffect(() => {
    // ตัวอย่างข้อมูลที่จำลองการดึงข้อมูลจาก API
    const fetchData = async () => {
      const dataFromAPI = [
        {
          firstName: "John",
          lastName: "Doe",
          age: 30,
          gender: "Male",
          state: "California",
          salary: 60000,
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          age: 25,
          gender: "Female",
          state: "Texas",
          salary: 50000,
        },
        {
          firstName: "Michael",
          lastName: "Johnson",
          age: 40,
          gender: "Male",
          state: "Florida",
          salary: 70000,
        },
        {
          firstName: "Emily",
          lastName: "Davis",
          age: 35,
          gender: "Female",
          state: "New York",
          salary: 55000,
        },
      ];
      setData(dataFromAPI); // ตั้งค่าข้อมูลใน state
    };

    fetchData(); // เรียกใช้งานฟังก์ชันดึงข้อมูล
  }, []); // useEffect จะทำงานเพียงครั้งเดียวเมื่อ component mount

  // ใช้ useMaterialReactTable เพื่อสร้างตาราง
  const table = useMaterialReactTable({
    columns,
    data,
    displayColumnDefOptions: {
      "mrt-row-expand": {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
          }),
        }),
        size: 200,
      },
    },
    enableGrouping: true,
    enableColumnResizing: true,
    groupedColumnMode: "remove",
    initialState: {
      density: "compact",
      expanded: true,
      grouping: [],
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "state", desc: false }],
    },
  });

  // Render ตาราง MaterialReactTable
  return <MaterialReactTable table={table} />;
};

export default Example;
