"use client";
import React from "react";
import { MaterialReactTable } from "material-react-table";

const ExampleTable = () => {
  // Sample data for demonstration
  const data = [
    { name: "Alice", age: 25, role: "Developer" },
    { name: "Bob", age: 30, role: "Designer" },
    { name: "Charlie", age: 35, role: "Manager" },
    { name: "Dave", age: 28, role: "Developer" },
    { name: "Eve", age: 40, role: "Manager" },
  ];

  // Define columns
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "role", header: "Role" },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{
        // Default filter on the 'role' column to only show 'Developer' rows
        columnFilters: [{ id: "role", value: "Developer" }],

        // Default sort on the 'age' column in ascending order
        sorting: [{ id: "age", desc: false }],

        // Group rows by the 'role' column
        grouping: ["role"],
      }}
      enableColumnFilters
      enableSorting
      enableGrouping
    />
  );
};

export default ExampleTable;
