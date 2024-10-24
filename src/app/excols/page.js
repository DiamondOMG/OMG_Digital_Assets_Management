"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import Table2 from "@/components/table2";

const InventoryPage = () => {
  const [data, setData] = useState(null); // สร้าง state สำหรับเก็บข้อมูลสินค้า

  useEffect(() => {
    // จำลองข้อมูลสินค้าในคลัง
    const inventoryData = [
      {
        productId: "P001",
        productName: "นมสด",
        category: "เครื่องดื่ม",
        unit: "กล่อง",
        quantity: 100,
        price: 25,
        productionDate: "2024-09-01",
        expiryDate: "2025-01-01",
        storeLocation: "กรุงเทพมหานคร",
        storeSection: "ชั้น 1",
        lotNumber: "LOT123",
        supplier: "บริษัท A",
        status: "พร้อมขาย",
        barcode: "1234567890123",
        weight: "200g",
        color: "ขาว",
        brand: "แบรนด์ A",
        importDate: "2024-09-02",
        warehouseLocation: "คลังสินค้า A",
        manufacturer: "โรงงาน A",
        discount: "5%",
        purchaseOrder: "PO12345",
        shippingMethod: "จัดส่งทางบก",
        returnPolicy: "ไม่สามารถคืนได้",
        taxIncluded: "true",
      },
      {
        productId: "P002",
        productName: "ข้าวสาร",
        category: "อาหารแห้ง",
        unit: "กิโลกรัม",
        quantity: 200,
        price: 45,
        productionDate: "2024-08-15",
        expiryDate: "2025-08-15",
        storeLocation: "เชียงใหม่",
        storeSection: "ชั้น 2",
        lotNumber: "LOT124",
        supplier: "บริษัท B",
        status: "พร้อมขาย",
        barcode: "2345678901234",
        weight: "1kg",
        color: "ขาว",
        brand: "แบรนด์ B",
        importDate: "2024-08-20",
        warehouseLocation: "คลังสินค้า B",
        manufacturer: "โรงงาน B",
        discount: "10%",
        purchaseOrder: "PO12346",
        shippingMethod: "จัดส่งทางอากาศ",
        returnPolicy: "คืนได้ใน 7 วัน",
        taxIncluded: "false",
      },
      // เพิ่มข้อมูลสินค้าตัวอย่างเพิ่มเติม...
    ];

    setData(inventoryData); // เซ็ตข้อมูลเมื่อโหลดเสร็จ
  }, []);

  // กรณีข้อมูลยังไม่ถูกโหลด
  if (!data) {
    return <Loader />;
  }

  const columns = [
    {
      accessorKey: "productId",
      header: "รหัสสินค้า",
      size: 150,
    },
    {
      accessorKey: "productName",
      header: "ชื่อสินค้า",
      size: 200,
    },
    {
      accessorKey: "category",
      header: "หมวดหมู่",
      size: 150,
    },
    {
      accessorKey: "unit",
      header: "หน่วยสินค้า",
      size: 100,
    },
    {
      accessorKey: "quantity",
      header: "จำนวนคงเหลือ",
      size: 150,
    },
    {
      accessorKey: "price",
      header: "ราคา (บาท)",
      size: 100,
    },
    {
      accessorKey: "productionDate",
      header: "วันที่ผลิต",
      size: 150,
    },
    {
      accessorKey: "expiryDate",
      header: "วันที่หมดอายุ",
      size: 150,
    },
    {
      accessorKey: "storeLocation",
      header: "สถานที่เก็บ",
      size: 200,
    },
    {
      accessorKey: "storeSection",
      header: "ชั้นที่เก็บ",
      size: 100,
    },
    {
      accessorKey: "lotNumber",
      header: "หมายเลขล็อต",
      size: 150,
    },
    {
      accessorKey: "supplier",
      header: "ผู้จัดจำหน่าย",
      size: 200,
    },
    {
      accessorKey: "barcode",
      header: "บาร์โค้ด",
      size: 150,
    },
    {
      accessorKey: "weight",
      header: "น้ำหนัก",
      size: 100,
    },
    {
      accessorKey: "color",
      header: "สีสินค้า",
      size: 100,
    },
    {
      accessorKey: "brand",
      header: "ยี่ห้อ",
      size: 150,
    },
    {
      accessorKey: "importDate",
      header: "วันที่นำเข้า",
      size: 150,
    },
    {
      accessorKey: "warehouseLocation",
      header: "คลังสินค้า",
      size: 200,
    },
    {
      accessorKey: "shippingMethod",
      header: "วิธีการจัดส่ง",
      size: 200,
    },
    {
      accessorKey: "returnPolicy",
      header: "นโยบายการคืน",
      size: 200,
    },
    {
      accessorKey: "taxIncluded",
      header: "รวมภาษี",
      size: 100,
    },
  ];

  // แสดงข้อมูลเมื่อโหลดสำเร็จ
  return (
    <div>
      <Table2 data={data} columns={columns} />
    </div>
  );
};

export default InventoryPage;
