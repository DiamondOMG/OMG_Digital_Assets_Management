// utils/excelUtil.js
import * as XLSX from "xlsx";

// ฟังก์ชันสำหรับ Export Excel
export const exportExcel = (rows) => {
	const rowData = rows.map((row) => row.original);
	const worksheet = XLSX.utils.json_to_sheet(rowData);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
	XLSX.writeFile(workbook, "data.xlsx");
};
