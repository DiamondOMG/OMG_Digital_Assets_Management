"use client";
import { useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import {
	Box,
	Button,
	Menu,
	MenuItem,
	ThemeProvider,
	createTheme,
	useTheme,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import * as XLSX from "xlsx";
import { exportPdf } from "../../utils/exportPdf.js"; // นำเข้าฟังก์ชัน export PDF ที่คุณสร้าง

const columns = [
	{ accessorKey: "screenId", header: "Screen ID", size: 150 },
	{ accessorKey: "label", header: "Label", size: 200 },
	{ accessorKey: "storeLocation", header: "Store Location", size: 200 },
	{ accessorKey: "storeSection", header: "Store Section", size: 150 },
	{ accessorKey: "displaysConnected", header: "Displays Connected", size: 150 },
	{ accessorKey: "lastOnline", header: "Last Online", size: 150 },
	{ accessorKey: "status", header: "Status", size: 100 },
];

const BigC = ({ data }) => {
	const [anchorElCsv, setAnchorElCsv] = useState(null);
	const [anchorElPdf, setAnchorElPdf] = useState(null);
	const [anchorElExcel, setAnchorElExcel] = useState(null);
	const globalTheme = useTheme();

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

	const csvConfig = mkConfig({
		fieldSeparator: ",",
		decimalSeparator: ".",
		useKeysAsHeaders: true,
	});

	// ฟังก์ชันสำหรับ Export CSV
	const handleExportCsv = useMemo(
		() => (rows) => {
			const rowData = rows.map((row) => row.original);
			const csv = generateCsv(csvConfig)(rowData);
			download(csvConfig)(csv);
		},
		[data] // useMemo จะทำการสร้างฟังก์ชันใหม่เมื่อ 'data' เปลี่ยนแปลง
	);

	const handleExportExcel = useMemo(
		() => (rows) => {
			const rowData = rows.map((row) => row.original);
			const worksheet = XLSX.utils.json_to_sheet(rowData);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
			XLSX.writeFile(workbook, "data.xlsx");
		},
		[data] // useMemo จะทำการสร้างฟังก์ชันใหม่เมื่อ 'data' เปลี่ยนแปลง
	);

	const handleOpenMenu = (setter) => (event) => {
		setter(event.currentTarget);
	};

	const handleCloseMenu = (setter) => () => {
		setter(null);
	};

	return (
		<div className="bg-black h-100 min-vh-100">
			<ThemeProvider theme={tableTheme}>
				<MaterialReactTable
					columns={columns}
					data={data || []}
					enableRowSelection={true}
					enableStickyHeader={true}
					enableStickyFooter={true}
					enableRowPinning={true}
					isMultiSortEvent={() => true}
					maxMultiSortColCount={3}
					columnFilterDisplayMode="popover"
					paginationDisplayMode="pages"
					positionToolbarAlertBanner="bottom"
					renderTopToolbarCustomActions={({ table }) => (
						<Box
							sx={{
								display: "flex",
								gap: "16px",
								padding: "8px",
								flexWrap: "wrap",
							}}
						>
							{/* CSV Dropdown */}
							<Button
								aria-controls="export-csv-menu"
								aria-haspopup="true"
								onClick={handleOpenMenu(setAnchorElCsv)}
								startIcon={<FileDownloadIcon />}
							>
								Export CSV
							</Button>
							<Menu
								id="export-csv-menu"
								anchorEl={anchorElCsv}
								open={Boolean(anchorElCsv)}
								onClose={handleCloseMenu(setAnchorElCsv)}
							>
								<MenuItem
									onClick={() => {
										handleExportCsv(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportCsv(table.getRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportCsv(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportCsv(table.getSelectedRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export Selected Rows
								</MenuItem>
							</Menu>

							{/* PDF Dropdown */}
							<Button
								aria-controls="export-pdf-menu"
								aria-haspopup="true"
								onClick={handleOpenMenu(setAnchorElPdf)}
								startIcon={<FileDownloadIcon />}
							>
								Export PDF
							</Button>
							<Menu
								id="export-pdf-menu"
								anchorEl={anchorElPdf}
								open={Boolean(anchorElPdf)}
								onClose={handleCloseMenu(setAnchorElPdf)}
							>
								<MenuItem
									onClick={() => {
										exportPdf(table.getPrePaginationRowModel().rows, columns);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportPdf(table.getRowModel().rows, columns);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportPdf(table.getPrePaginationRowModel().rows, columns);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportPdf(table.getSelectedRowModel().rows, columns);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export Selected Rows
								</MenuItem>
							</Menu>

							{/* Excel Dropdown */}
							<Button
								aria-controls="export-excel-menu"
								aria-haspopup="true"
								onClick={handleOpenMenu(setAnchorElExcel)}
								startIcon={<FileDownloadIcon />}
							>
								Export Excel
							</Button>
							<Menu
								id="export-excel-menu"
								anchorEl={anchorElExcel}
								open={Boolean(anchorElExcel)}
								onClose={handleCloseMenu(setAnchorElExcel)}
							>
								<MenuItem
									onClick={() => {
										handleExportExcel(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportExcel(table.getRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportExcel(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleExportExcel(table.getSelectedRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export Selected Rows
								</MenuItem>
							</Menu>
						</Box>
					)}
				/>
			</ThemeProvider>
		</div>
	);
};

export default BigC;
