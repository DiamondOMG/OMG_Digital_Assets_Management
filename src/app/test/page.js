"use client";
import { useMemo, useState } from "react";
import {
	MRT_EditActionButtons,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import {
	QueryClient,
	QueryClientProvider,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const fakeData = [
	{
		id: 1,
		name: "John Doe",
		age: 28,
		state: "California",
		email: "john.doe@example.com",
	},
	{
		id: 2,
		name: "Jane Smith",
		age: 34,
		state: "Texas",
		email: "jane.smith@example.com",
	},
	{
		id: 3,
		name: "Mike Johnson",
		age: 22,
		state: "Florida",
		email: "mike.johnson@example.com",
	},
	{
		id: 4,
		name: "Emily Davis",
		age: 30,
		state: "New York",
		email: "emily.davis@example.com",
	},
	{
		id: 5,
		name: "William Brown",
		age: 45,
		state: "Illinois",
		email: "william.brown@example.com",
	},
	{
		id: 6,
		name: "Sophia Wilson",
		age: 27,
		state: "Georgia",
		email: "sophia.wilson@example.com",
	},
	{
		id: 7,
		name: "James Taylor",
		age: 50,
		state: "Nevada",
		email: "james.taylor@example.com",
	},
	{
		id: 8,
		name: "Isabella Martinez",
		age: 19,
		state: "Arizona",
		email: "isabella.martinez@example.com",
	},
	{
		id: 9,
		name: "Lucas Anderson",
		age: 40,
		state: "Ohio",
		email: "lucas.anderson@example.com",
	},
	{
		id: 10,
		name: "Mia Thomas",
		age: 35,
		state: "Colorado",
		email: "mia.thomas@example.com",
	},
];

const Example = () => {
	const [validationErrors, setValidationErrors] = useState({});

	const usStates = [
		{ name: "Alabama", abbreviation: "AL" },
		{ name: "Alaska", abbreviation: "AK" },
		{ name: "Arizona", abbreviation: "AZ" },
		{ name: "Arkansas", abbreviation: "AR" },
		{ name: "California", abbreviation: "CA" },
		{ name: "Colorado", abbreviation: "CO" },
		{ name: "Connecticut", abbreviation: "CT" },
		{ name: "Delaware", abbreviation: "DE" },
		{ name: "Florida", abbreviation: "FL" },
		{ name: "Georgia", abbreviation: "GA" },
		{ name: "Hawaii", abbreviation: "HI" },
		{ name: "Idaho", abbreviation: "ID" },
		{ name: "Illinois", abbreviation: "IL" },
		{ name: "Indiana", abbreviation: "IN" },
		{ name: "Iowa", abbreviation: "IA" },
		{ name: "Kansas", abbreviation: "KS" },
		{ name: "Kentucky", abbreviation: "KY" },
		{ name: "Louisiana", abbreviation: "LA" },
		{ name: "Maine", abbreviation: "ME" },
		{ name: "Maryland", abbreviation: "MD" },
		{ name: "Massachusetts", abbreviation: "MA" },
		{ name: "Michigan", abbreviation: "MI" },
		{ name: "Minnesota", abbreviation: "MN" },
		{ name: "Mississippi", abbreviation: "MS" },
		{ name: "Missouri", abbreviation: "MO" },
		{ name: "Montana", abbreviation: "MT" },
		{ name: "Nebraska", abbreviation: "NE" },
		{ name: "Nevada", abbreviation: "NV" },
		{ name: "New Hampshire", abbreviation: "NH" },
		{ name: "New Jersey", abbreviation: "NJ" },
		{ name: "New Mexico", abbreviation: "NM" },
		{ name: "New York", abbreviation: "NY" },
		{ name: "North Carolina", abbreviation: "NC" },
		{ name: "North Dakota", abbreviation: "ND" },
		{ name: "Ohio", abbreviation: "OH" },
		{ name: "Oklahoma", abbreviation: "OK" },
		{ name: "Oregon", abbreviation: "OR" },
		{ name: "Pennsylvania", abbreviation: "PA" },
		{ name: "Rhode Island", abbreviation: "RI" },
		{ name: "South Carolina", abbreviation: "SC" },
		{ name: "South Dakota", abbreviation: "SD" },
		{ name: "Tennessee", abbreviation: "TN" },
		{ name: "Texas", abbreviation: "TX" },
		{ name: "Utah", abbreviation: "UT" },
		{ name: "Vermont", abbreviation: "VT" },
		{ name: "Virginia", abbreviation: "VA" },
		{ name: "Washington", abbreviation: "WA" },
		{ name: "West Virginia", abbreviation: "WV" },
		{ name: "Wisconsin", abbreviation: "WI" },
		{ name: "Wyoming", abbreviation: "WY" },
	];

	const columns = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "Id",
				enableEditing: false,
				size: 80,
			},
			{
				accessorKey: "firstName",
				header: "First Name",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.firstName,
					helperText: validationErrors?.firstName,
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							firstName: undefined,
						}),
				},
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.lastName,
					helperText: validationErrors?.lastName,
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							lastName: undefined,
						}),
				},
			},
			{
				accessorKey: "email",
				header: "Email",
				muiEditTextFieldProps: {
					type: "email",
					required: true,
					error: !!validationErrors?.email,
					helperText: validationErrors?.email,
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							email: undefined,
						}),
				},
			},
			{
				accessorKey: "state",
				header: "State",
				editVariant: "select",
				editSelectOptions: usStates,
				muiEditTextFieldProps: {
					select: true,
					error: !!validationErrors?.state,
					helperText: validationErrors?.state,
				},
			},
		],
		[validationErrors]
	);

	const { mutateAsync: createUser } = useCreateUser();
	const {
		data: fetchedUsers = [],
		isError: isLoadingUsersError,
		isFetching: isFetchingUsers,
		isLoading: isLoadingUsers,
	} = useGetUsers();
	const { mutateAsync: updateUser } = useUpdateUser();
	const { mutateAsync: deleteUser } = useDeleteUser();

	const handleCreateUser = async ({ values, table }) => {
		const newValidationErrors = validateUser(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await createUser(values);
		table.setCreatingRow(null);
	};

	const handleSaveUser = async ({ values, table }) => {
		const newValidationErrors = validateUser(values);
		if (Object.values(newValidationErrors).some((error) => error)) {
			setValidationErrors(newValidationErrors);
			return;
		}
		setValidationErrors({});
		await updateUser(values);
		table.setEditingRow(null);
	};

	const openDeleteConfirmModal = (row) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			deleteUser(row.original.id);
		}
	};

	const table = useMaterialReactTable({
		columns,
		data: fetchedUsers,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableEditing: true,
		getRowId: (row) => row.id,
		muiToolbarAlertBannerProps: isLoadingUsersError
			? {
					color: "error",
					children: "Error loading data",
			  }
			: undefined,
		muiTableContainerProps: {
			sx: {
				minHeight: "500px",
			},
		},
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: handleCreateUser,
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: handleSaveUser,
		renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant="h3">Create New User</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					{internalEditComponents}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant="text" table={table} row={row} />
				</DialogActions>
			</>
		),
		renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
			<>
				<DialogTitle variant="h3">Edit User</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					{internalEditComponents}
				</DialogContent>
				<DialogActions>
					<MRT_EditActionButtons variant="text" table={table} row={row} />
				</DialogActions>
			</>
		),
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title="Edit">
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>
		),
		renderTopToolbarCustomActions: ({ table }) => (
			<Button variant="contained" onClick={() => table.setCreatingRow(true)}>
				Create New User
			</Button>
		),
		state: {
			isLoading: isLoadingUsers,
			isSaving: false,
			showAlertBanner: isLoadingUsersError,
			showProgressBars: isFetchingUsers,
		},
	});

	return <MaterialReactTable table={table} />;
};

function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (user) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return Promise.resolve();
		},
		onMutate: (newUserInfo) => {
			queryClient.setQueryData(["users"], (prevUsers) => [
				...prevUsers,
				{ ...newUserInfo, id: Date.now().toString() },
			]);
		},
	});
}

function useGetUsers() {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return Promise.resolve(fakeData);
		},
		refetchOnWindowFocus: false,
	});
}

function useUpdateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (user) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return Promise.resolve();
		},
		onMutate: (newUserInfo) => {
			queryClient.setQueryData(["users"], (prevUsers) =>
				prevUsers.map((prevUser) =>
					prevUser.id === newUserInfo.id ? newUserInfo : prevUser
				)
			);
		},
	});
}

function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (userId) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return Promise.resolve();
		},
		onMutate: (userId) => {
			queryClient.setQueryData(["users"], (prevUsers) =>
				prevUsers.filter((user) => user.id !== userId)
			);
		},
	});
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
	<QueryClientProvider client={queryClient}>
		<Example />
	</QueryClientProvider>
);

export default ExampleWithProviders;

function validateRequired(value) {
	return !!value.length;
}

function validateEmail(email) {
	return !!email.length && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUser(user) {
	return {
		firstName: !validateRequired(user.firstName)
			? "First Name is Required"
			: "",
		lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
		email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
	};
}
