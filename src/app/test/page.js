"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const Example = () => {
  // สร้าง mock data
  const sampleData = [
    {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      state: "CA",
      phoneNumber: "123-456-7890",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Elm St",
      state: "NY",
      phoneNumber: "987-654-3210",
    },
    {
      firstName: "Mike",
      lastName: "Johnson",
      address: "789 Oak St",
      state: "TX",
      phoneNumber: "456-789-0123",
    },
    // เพิ่มข้อมูลเพิ่มเติมหากต้องการ
  ];

  // สถานะตาราง
  const [data, setData] = useState(sampleData);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "phoneNumber", header: "Phone Number" },
    ],
    []
  );

  // การตั้งค่าตาราง
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      sorting,
    },
  });

  // ฟังก์ชันสำหรับแสดงค่า filters และ sorting ใน console
  const handleShowCurrentState = () => {
    console.log("Column Filters:", columnFilters);
    console.log("Global Filter:", globalFilter);
    console.log("Sorting:", sorting);
  };

  return (
    <div>
      <MaterialReactTable table={table} />
      <button onClick={handleShowCurrentState} style={{ marginTop: "10px" }}>
        Show Current Filters & Sorting
      </button>
    </div>
  );
};

export default Example;
