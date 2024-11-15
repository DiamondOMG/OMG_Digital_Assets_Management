"use client";

import { useEffect, useMemo, useState } from "react";
import {
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";

const Example = () => {
	// สร้าง mock data
	const sampleData = [
		{
			firstName: "John",
			lastName: "Doe",
			address: "123 Main St",
			state: "CA",
			phoneNumber: "123-456-7890",
		},
		{
			firstName: "Jane",
			lastName: "Smith",
			address: "456 Elm St",
			state: "NY",
			phoneNumber: "987-654-3210",
		},
		{
			firstName: "Mike",
			lastName: "Johnson",
			address: "789 Oak St",
			state: "TX",
			phoneNumber: "456-789-0123",
		},
		// เพิ่มข้อมูลเพิ่มเติมหากต้องการ
	];

	// สถานะตาราง
	const [data, setData] = useState(sampleData);
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const columns = useMemo(
		() => [
			{ accessorKey: "firstName", header: "First Name" },
			{ accessorKey: "lastName", header: "Last Name" },
			{ accessorKey: "address", header: "Address" },
			{ accessorKey: "state", header: "State" },
			{ accessorKey: "phoneNumber", header: "Phone Number" },
		],
		[]
	);

	// การตั้งค่าตาราง
	const table = useMaterialReactTable({
		columns,
		data,
		enableRowSelection: true,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		state: {
			columnFilters,
			globalFilter,
			pagination,
			sorting,
		},
	});

	// กำหนด views เป็น useState
	const [views, setViews] = useState([]);

	// ฟังก์ชันสำหรับสร้าง view ใหม่และเพิ่มใน views
	const handleAddView = () => {
		const newView = {
			filters: [...columnFilters],
			sorting: [...sorting],
			group: ["gender"], // สามารถเพิ่ม group field อื่นๆ ที่ต้องการได้
		};

		// เพิ่ม view ใหม่เข้าไปใน views array
		setViews((prevViews) => [...prevViews, newView]);

		// แสดง views ทั้งหมดใน console
		console.log([...views, newView]); // หรือใช้ views เพื่อดูรายการที่เพิ่มทั้งหมด
	};

	return (
		<div>
			<MaterialReactTable table={table} />
			<button onClick={handleAddView} style={{ marginTop: "10px" }}>
				Add New View and Show All Views
			</button>
		</div>
	);
};

export default Example;
