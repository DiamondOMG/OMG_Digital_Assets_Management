"use client";
import { useMemo } from "react";
import {
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";
import { ThemeContextProvider } from "@/context/themeContext";

const Example = ({ data }) => {
	// คอลัมน์จะต้องมีการใช้ useMemo หรือถูกกำหนดไว้ข้างนอกคอมโพเนนต์
	const columns = useMemo(
		() => [
			{
				accessorKey: "screenId",
				header: "Screen ID",
				size: 150,
			},
			{
				accessorKey: "label",
				header: "Label",
				size: 200,
			},
			{
				accessorKey: "storeCode",
				header: "Store Code",
				size: 150,
			},
			{
				accessorKey: "storeLocation",
				header: "Store Location",
				size: 200,
			},
			{
				accessorKey: "storeSection",
				header: "Store Section",
				size: 150,
			},
			{
				accessorKey: "displaysConnected",
				header: "Displays Connected",
				size: 150,
			},
			{
				accessorKey: "runNumber",
				header: "Run Number",
				size: 100,
			},
			{
				accessorKey: "wifiSsid",
				header: "WiFi SSID",
				size: 150,
			},
			{
				accessorKey: "lastOnline",
				header: "Last Online",
				size: 150,
			},
			{
				accessorKey: "status",
				header: "Status",
				size: 100,
			},
		],
		[]
	);

	const table = useMaterialReactTable({
		columns,
		data: data || [], // ใช้ data ที่ส่งเข้ามา หากเป็น undefined ให้ใช้ array ว่างแทน
	});

	return (
		<ThemeContextProvider>
			<MaterialReactTable table={table} />
		</ThemeContextProvider>
	);
};

export default Example;
