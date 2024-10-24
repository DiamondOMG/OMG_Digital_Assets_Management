import ExcelJS from "exceljs";

// ฟังก์ชันสำหรับตั้งค่าเส้นขอบ
const setCellBorder = (cell) => {
  cell.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
};

// ฟังก์ชันสำหรับตั้งค่าสีพื้นหลัง
const setCellFill = (cell, color) => {
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: color },
  };
};

// ฟังก์ชันสำหรับ Export Excel พร้อมสไตล์
export const exportExcel = async (rows) => {
  console.log({ rows });
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // กำหนดสไตล์สำหรับ Header
  const headerKeys = Object.keys(rows[0].original); // นับจำนวนคอลัมน์จาก object แรก
  const headerRow = worksheet.addRow(headerKeys);
  headerRow.font = { bold: true, size: 14 };

  // กำหนดเส้นขอบและสีสำหรับ Header (แถว 1)
  for (let colNum = 1; colNum <= headerKeys.length; colNum++) {
    const cell = worksheet.getCell(1, colNum);
    setCellBorder(cell); // ตีเส้นขอบ
    setCellFill(cell, "FFFF00"); // ลงสีพื้นหลังสีเหลือง
  }

  // เพิ่มข้อมูลในแต่ละแถวพร้อมกำหนดเส้นขอบ
  rows.forEach((row, rowIndex) => {
    const rowData = Object.values(row.original);
    const newRow = worksheet.addRow(rowData);
    newRow.font = { size: 12 };

    // ตีเส้นขอบสำหรับข้อมูลในแต่ละแถว
    newRow.eachCell((cell) => {
      setCellBorder(cell); // ตีเส้นขอบ
    });
  });

  // กำหนดความกว้างของคอลัมน์ (เพิ่ม Gap ในแกน X)
  headerKeys.forEach((_, index) => {
    worksheet.getColumn(index + 1).width = 20; // ความกว้างของคอลัมน์
  });

  // กำหนดความสูงของแถว (เพิ่ม Gap ในแกน Y)
  worksheet.eachRow((row) => {
    row.height = 25; // ความสูงของแถว
  });

  // Export ไฟล์ Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // สร้างลิงก์สำหรับดาวน์โหลดไฟล์
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "custom_data.xlsx";
  link.click();

  // ล้างลิงก์ที่ถูกสร้างขึ้น
  URL.revokeObjectURL(link.href);
};
