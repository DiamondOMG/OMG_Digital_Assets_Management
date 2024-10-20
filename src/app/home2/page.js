"use client";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

//column definitions...

//data definitions...

const Example = () => {
	const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

	const columns = useMemo(
		() => [
			{
				accessorKey: "id", //id is used to access row data
				header: "ID",
				size: 50,
			},
			{
				accessorKey: "name", //accessorKey for 'name' column
				header: "Name",
				size: 150,
			},
			{
				accessorKey: "age",
				header: "Age",
				size: 50,
			},
			{
				accessorKey: "email",
				header: "Email",
				size: 200,
			},
			{
				accessorKey: "status",
				header: "Status",
				size: 100,
			},
		],
		[]
	);

	const data = useMemo(
		() => [
			{
				id: 1,
				name: "John Doe",
				age: 28,
				email: "john.doe@example.com",
				status: "Active",
			},
			{
				id: 2,
				name: "Jane Smith",
				age: 34,
				email: "jane.smith@example.com",
				status: "Inactive",
			},
			{
				id: 3,
				name: "Samuel Green",
				age: 25,
				email: "samuel.green@example.com",
				status: "Active",
			},
			{
				id: 4,
				name: "Alice Johnson",
				age: 42,
				email: "alice.johnson@example.com",
				status: "Inactive",
			},
			{
				id: 5,
				name: "David Brown",
				age: 30,
				email: "david.brown@example.com",
				status: "Active",
			},
		],
		[]
	);

	const tableTheme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: "dark",
					background: {
						default: "#121212", // Dark background for the entire table
						paper: "#1d1d1d", // Darker background for individual cells
					},
					text: {
						primary: "#ffffff", // White text
					},
				},
			}),
		[globalTheme]
	);

	return (
		<>
			<ThemeProvider theme={tableTheme}>
				<MaterialReactTable
					columns={columns}
					data={data}
					enableRowSelection
					enableColumnOrdering
					enableColumnPinning
				/>
			</ThemeProvider>
		</>
	);
};

export default Example;
