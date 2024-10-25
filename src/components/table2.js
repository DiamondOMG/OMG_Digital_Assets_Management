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
import { exportCsv } from "@/utils/exportCsv"; // นำเข้าฟังก์ชันจากไฟล์ที่แยกออกมา
import { exportPdf } from "@/utils/exportPdf"; // นำเข้าฟังก์ชัน export PDF ที่คุณสร้าง
import { exportExcel } from "@/utils/exportExcel";

const Table2 = ({ data, columns }) => {
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
						default: "#121212",
						paper: "#1d1d1d",
					},
					text: {
						primary: "#ffffff",
					},
				},
			}),
		[globalTheme]
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
					positionToolbarAlertBanner="bottom"
					// enableRowPinning={true}
					enableRowNumbers={true}
					isMultiSortEvent={() => true}
					maxMultiSortColCount={3}
					columnFilterDisplayMode="popover"
					paginationDisplayMode="pages"
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
										exportCsv(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportCsv(table.getRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportCsv(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElCsv)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportCsv(table.getSelectedRowModel().rows);
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
										const visibleColumns = table
											.getAllColumns()
											.filter((col) => col.getIsVisible());
										exportPdf(
											table.getPrePaginationRowModel().rows,
											visibleColumns
										);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										const visibleColumns = table
											.getAllColumns()
											.filter((col) => col.getIsVisible());
										exportPdf(table.getRowModel().rows, visibleColumns);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										const visibleColumns = table
											.getAllColumns()
											.filter((col) => col.getIsVisible());
										exportPdf(
											table.getPrePaginationRowModel().rows,
											visibleColumns
										);
										handleCloseMenu(setAnchorElPdf)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										const visibleColumns = table
											.getAllColumns()
											.filter((col) => col.getIsVisible());
										exportPdf(table.getSelectedRowModel().rows, visibleColumns);
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
										exportExcel(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export All Data
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportExcel(table.getRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export Page Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportExcel(table.getPrePaginationRowModel().rows);
										handleCloseMenu(setAnchorElExcel)();
									}}
								>
									Export All Rows
								</MenuItem>
								<MenuItem
									onClick={() => {
										exportExcel(table.getSelectedRowModel().rows);
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

export default Table2;
