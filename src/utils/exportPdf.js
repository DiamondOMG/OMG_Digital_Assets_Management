import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = (rows, columns) => {
	const doc = new jsPDF();
	const tableData = rows.map((row) => Object.values(row.original));
	const tableHeaders = columns.map((c) => c.header);

	autoTable(doc, {
		head: [tableHeaders],
		body: tableData,
	});

	// เปิด PDF ในแท็บใหม่พร้อมปุ่มดาวน์โหลด
	const pdfUrl = doc.output("bloburl");
	const newWindow = window.open();
	newWindow.document.write(`
    <iframe src="${pdfUrl}" frameborder="0" style="width:100%; height:100%;"></iframe>
  `);
};
