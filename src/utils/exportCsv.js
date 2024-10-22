import { mkConfig, generateCsv, download } from "export-to-csv";

// สร้าง config สำหรับการ export CSV
const csvConfig = mkConfig({
	fieldSeparator: ",",
	decimalSeparator: ".",
	useKeysAsHeaders: true,
});

// ฟังก์ชันสำหรับ Export CSV
export const exportCsv = (rows) => {
	const rowData = rows.map((row) => row.original);
	const csv = generateCsv(csvConfig)(rowData);
	download(csvConfig)(csv);
};
