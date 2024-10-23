import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { font } from "@/utils/Sarabun-Regular-normal";

export const exportPdf = (rows, columns) => {
	// สร้าง PDF เป็นแนวนอน
	const doc = new jsPDF({ orientation: "landscape" });

	// เพิ่มฟอนต์ที่ต้องการใช้
	doc.addFileToVFS("MyFont.ttf", font);
	doc.addFont("MyFont.ttf", "MyFont", "normal");
	doc.setFont("MyFont");

	// สร้างข้อมูลตาราง
	const tableData = rows.map((row) => Object.values(row.original));
	const tableHeaders = columns.map((c) => c.header);

	// ใช้ autoTable และกำหนดฟอนต์ใน styles
	autoTable(doc, {
		head: [tableHeaders],
		body: tableData,
		styles: {
			font: "MyFont", // กำหนดฟอนต์สำหรับข้อความในตาราง
		},
	});

	// เปิด PDF ในแท็บใหม่พร้อมปุ่มดาวน์โหลด
	const pdfUrl = doc.output("bloburl");
	const newWindow = window.open();
	newWindow.document.write(`
    <iframe src="${pdfUrl}" frameborder="0" style="width:100%; height:100%;"></iframe>
  `);
};
