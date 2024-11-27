"use client"; // บอกให้ Next.js รู้ว่านี่เป็น Client-Side Component

import { useState } from "react";
import Loader from "@/components/loader";
import Table6 from "@/components/table6";
import { useAssets } from "@/hook/useAssets";

const InventoryPage = () => {
  const [views, setViews] = useState([
    {
      name: "7777",
      filters: [{ id: "age", value: [10, 30] }],
      sorting: [],
      group: ["age"],
    },
    {
      name: "555",
      filters: [{ id: "gender", value: "Female" }],
      sorting: [],
      group: ["gender"],
    },
    // เพิ่ม views ตามโครงสร้างข้อมูล
  ]);

  const { data, isLoading, isError, error } = useAssets();

  // กรณีข้อมูลยังไม่ถูกโหลด
  if (isLoading) {
    return <Loader />;
  }

  if (isError) return <p>Error: {error.message}</p>;

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    {
      accessorKey: "gender",
      header: "Gender",
      filterFn: "equals",
      filterSelectOptions: ["Male", "Female", "Other"],
      filterVariant: "select",
    },
    { accessorKey: "age", header: "Age", filterVariant: "range" },
    { accessorKey: "job_title", header: "Job Title" },
    { accessorKey: "salary", header: "Salary", filterVariant: "range" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Phone Number" },
    {
      accessorKey: "createdOn",
      header: "Created At",
      filterVariant: "date-range",
    },
  ];

  // แสดงข้อมูลเมื่อโหลดสำเร็จ
  return (
    <div className="d-flex flex-column">
      <div style={{ height: "100px" }}></div> {/* สำหรับความสูงเต็มหน้าจอ */}
      <Table6 data={data} columns={columns} views={views} setViews={setViews} />
    </div>
  );
};

export default InventoryPage;
