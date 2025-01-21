"use client";
import { useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_TableHeadCellFilterContainer,
} from "material-react-table";
import {
  Paper,
  Stack,
  useMediaQuery,
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportCsv } from "@/utils/exportCsv"; // นำเข้าฟังก์ชันจากไฟล์ที่แยกออกมา
import { exportPdf } from "@/utils/exportPdf"; // นำเข้าฟังก์ชัน export PDF ที่คุณสร้าง
import { exportExcel } from "@/utils/exportExcel";
import { MRT_ExpandAllButton } from "material-react-table";
import ViewManager from "./viewmanager";
import { Delete, Add, Edit } from "@mui/icons-material";
import {
  useCreateAsset,
  useDeleteAsset,
  useUpdateAsset,
} from "@/hook/useAssets";
import { useCreateView, useDeleteView, useUpdateView } from "@/hook/useViews";

const Table6 = ({
  data,
  columns,
  views,
  setViews,
  showSidebarLeft,
  setShowSidebarLeft,
  showSidebarRight,
  setShowSidebarRight,
}) => {
  const [anchorElCsv, setAnchorElCsv] = useState(null); //ใช้ในการเปิดปิดเมนู
  const [anchorElPdf, setAnchorElPdf] = useState(null); //ใช้ในการเปิดปิดเมนู
  const [anchorElExcel, setAnchorElExcel] = useState(null); //ใช้ในการเปิดปิดเมนู

  const [groupedIds, setGroupedIds] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [isShowFiltered, setIsShowFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState(data); // เพิ่มตัวแปร state ของ filteredData
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null); // ++++++++++++++++ เก็บข้อมูล View ที่ถูกเลือก (สำหรับ Rename/Delete)
  //save view
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);

  //reponsive
  const isMobile = useMediaQuery("(max-width: 1000px)");
  //ฟังชั่นเปิดขปิดเมนู
  const handleOpenMenu = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleCloseMenu = (setter) => () => {
    setter(null);
  };

  //!--------------Create Delete Edit--------------------------------
  const { mutateAsync: createAsset } = useCreateAsset();
  const { mutateAsync: updateAsset } = useUpdateAsset();
  const { mutateAsync: deleteAsset } = useDeleteAsset();

  useEffect(() => {
    if (data) {
      setFilteredData(data); // อัปเดต tableData เมื่อ assets เปลี่ยน
    }
  }, [data]);

  const handleCreateRow = (newRow) => {
    createAsset(newRow.values);
    table.setCreatingRow(null); // ซ่อน UI การสร้าง row
  };

  const handleSaveRow = (updatedRow) => {
    updateAsset({
      id: updatedRow.values.id, // ส่ง id ของแถวที่ต้องการอัปเดต
      updatedAsset: updatedRow.values, // ส่งข้อมูลใหม่ของแถว
    });
    table.setEditingRow(null); // ซ่อน UI การสร้าง row
  };

  const handleDeleteRow = (rowToDelete) => {
    setIsDeleteModalOpen(true); // ++++++++++++++++ เปิด Delete Modal
    setSelectedAsset(rowToDelete);
  };

  const confirmDeleteRow = () => {
    deleteAsset(selectedAsset.id);
    setIsDeleteModalOpen(false);
  };
  //!-----------------------------------------------------------------

  // สร้าง table instance
  const table = useMaterialReactTable({
    columns,
    data: filteredData, // Using filteredData in the table
    enableEditing: true, // Enable editing
    enableColumnOrdering: true,
    //---------------------------------------------Action-----------------------------------------
    renderRowActions: ({ row, table }) => (
      <Box style={{ display: "flex" }}>
        {/* Edit Button */}
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        {/* Delete Button */}
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeleteRow(row.original)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    onEditingRowSave: (updatedRow) => handleSaveRow(updatedRow),
    onCreatingRowSave: (newRow) => handleCreateRow(newRow),
    ///Group---------------------------------------------------------------
    displayColumnDefOptions: {
      "mrt-row-expand": {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                ? theme.palette.secondary.main
                : undefined,
          }),
        }),
        size: 200,
      },
    },
    enableGrouping: true,
    groupedColumnMode: "remove",
    ///ค่าเริ่มต้น-------------------------------------------------------------------------
    initialState: {
      density: "compact",
      expanded: true, // ปิดการขยายกรุ๊ปเริ่มต้น
      pagination: { pageIndex: 0, pageSize: 30 },
    },
    ///
    enableRowSelection: true, //check box
    enableStickyHeader: true, // ล็อคหัว
    positionToolbarAlertBanner: "top", //แจ้งเตือนถ้าอยากให้ group ไปข้างล่างก็bottomซะ
    enableRowNumbers: true, // เลขแถว
    ///
    isMultiSortEvent: () => true,
    maxMultiSortColCount: 3,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    /// แก้ text กับ style
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
      sx: {
        "& .MuiInputLabel-root": {
          color: "",
        },
        "& .MuiInputBase-root": {
          borderColor: "",
        },
        "& .MuiInputBase-input": {
          color: "blue", // เปลี่ยนสีข้อความภายใน TextField เป็นฟ้า
        },
      },
    }),
    ///ตารางยืดดด-------------------------------------------------------------------------------------
    muiTableBodyProps: {
      sx: {
        overflow: "unset", // ยกเลิกการเลื่อนอัตโนมัติในแนวตั้ง
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "unset", // ตั้งค่า maxHeight เป็น 'unset' เพื่อให้ตารางไม่จำกัดความสูง
      },
    },
    /// save view----------------------------------------------------------------------------
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    state: {
      columnFilters,
      sorting,
      grouping,
    },
    /// แถบ toolbar-------------------------------------------------------------------------------------------
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title="Create">
          <Button
            variant="contained"
            onClick={() => {
              table.setCreatingRow(true);
            }}
          >
            <Add />
          </Button>
        </Tooltip>
        {/* CSV Dropdown */}
        <Button
          aria-controls="export-csv-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElCsv)}
          startIcon={<FileDownloadIcon />}
        >
          Export CSV
        </Button>
        <Menu
          id="export-csv-menu"
          anchorEl={anchorElCsv}
          open={Boolean(anchorElCsv)}
          onClose={handleCloseMenu(setAnchorElCsv)}
        >
          <MenuItem
            onClick={() => {
              exportCsv(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportCsv(table.getSelectedRowModel().rows);
              handleCloseMenu(setAnchorElCsv)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>

        {/* PDF Dropdown */}
        <Button
          aria-controls="export-pdf-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElPdf)}
          startIcon={<FileDownloadIcon />}
        >
          Export PDF
        </Button>
        <Menu
          id="export-pdf-menu"
          anchorEl={anchorElPdf}
          open={Boolean(anchorElPdf)}
          onClose={handleCloseMenu(setAnchorElPdf)}
        >
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getPrePaginationRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getPrePaginationRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              const visibleColumns = table
                .getAllColumns()
                .filter((col) => col.getIsVisible());
              exportPdf(table.getSelectedRowModel().rows, visibleColumns);
              handleCloseMenu(setAnchorElPdf)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>

        {/* Excel Dropdown */}
        <Button
          aria-controls="export-excel-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu(setAnchorElExcel)}
          startIcon={<FileDownloadIcon />}
        >
          Export Excel
        </Button>
        <Menu
          id="export-excel-menu"
          anchorEl={anchorElExcel}
          open={Boolean(anchorElExcel)}
          onClose={handleCloseMenu(setAnchorElExcel)}
        >
          <MenuItem
            onClick={() => {
              exportExcel(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export All Data
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export Page Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getPrePaginationRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export All Rows
          </MenuItem>
          <MenuItem
            onClick={() => {
              exportExcel(table.getSelectedRowModel().rows);
              handleCloseMenu(setAnchorElExcel)();
            }}
          >
            Export Selected Rows
          </MenuItem>
        </Menu>
      </Box>
    ),
  });

  ///ฟังชั่นเพิ่ม merge filter-------------------------------------------------------------------
  // เปิด-ปิด Dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setGroupName("");
  };

  // ฟังก์ชันบันทึก ID ของแถวที่ผ่านการกรองและรวมเข้าในกลุ่มใหม่
  const handleSaveFilteredIds = () => {
    const filteredIds = table.getRowModel().rows.map((row) => row.original.id);
    setGroupedIds((prevGroups) => ({
      ...prevGroups,
      [groupName]: filteredIds,
    }));
    setColumnFilters([]);
    handleCloseDialog();
  };

  // ฟังก์ชันกรองข้อมูลตามกลุ่ม ID ที่บันทึกไว้
  const handleFilterBySavedIds = () => {
    if (isShowFiltered) {
      setFilteredData(data); // แสดงข้อมูลทั้งหมด
    } else {
      const selectedIds = Object.values(groupedIds).flat();
      const uniqueIds = [...new Set(selectedIds)];
      setFilteredData(data.filter((item) => uniqueIds.includes(item.id)));
    }
    setIsShowFiltered(!isShowFiltered);
  };

  // ฟังก์ชันลบกลุ่มออกจาก groupedIds
  const handleDeleteGroup = (group) => {
    setGroupedIds((prevGroups) => {
      const newGroups = { ...prevGroups };
      delete newGroups[group];
      return newGroups;
    });
  };
  //!-----------------------------------------------Create Edit Delete views-----------------------------------------------------------------------
  const { mutateAsync: createView } = useCreateView();
  const { mutateAsync: updateView } = useUpdateView();
  const { mutateAsync: deleteView } = useDeleteView();

  const handleAddView = () => {
    const filteredFilters = columnFilters.filter((filter) => {
      // ตรวจสอบว่า value ของ filter เป็น array หรือไม่ และใน array นั้นไม่มีค่า null หรือ undefined
      if (Array.isArray(filter.value)) {
        // กรอง array ที่มีค่า null หรือ undefined
        return filter.value.every((val) => val !== null && val !== undefined);
      }
      // ถ้า value ไม่เป็น array ก็ให้ส่งข้อมูลไปปกติ
      return true;
    });
    const newView = {
      id_user: "b47b3ac6-8c40-4f05-ad6f-98a7d1e74b39",
      data_type: "Asset",
      name: viewName,
      levelView: 1,
      filters: filteredFilters,
      sorting: [...sorting],
      group: [...grouping], // สามารถเพิ่ม group field อื่นๆ ที่ต้องการได้
    };
    createView(newView);
    handleCloseViewDialog();
  };

  const handleDeleteView = (view) => {
    deleteView(view.id);
  };

  const handleEditView = (view, newName) => {
    const newEditView = {
      name: newName,
    };
    updateView({
      id: view.id, // ส่ง id ของแถวที่ต้องการอัปเดต
      updatedView: newEditView, // ส่งข้อมูลใหม่ของแถว
    });
  };

  // เปิด-ปิด Dialog
  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setViewName("");
  };

  const handleButtonClick = (view) => {
    setColumnFilters(view.filters);
    setSorting(view.sorting);
    setGrouping(view.group);
  };
  //!----------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={isMobile ? "column-reverse" : "row"} gap="8px">
        <ViewManager
          views={views}
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          handleButtonClick={handleButtonClick}
          viewName={viewName}
          setViewName={setViewName}
          handleCloseViewDialog={handleCloseViewDialog}
          handleAddView={handleAddView}
          showSidebarLeft={showSidebarLeft}
          setShowSidebarLeft={setShowSidebarLeft}
          handleDeleteView={handleDeleteView}
          handleEditView={handleEditView}
        />
        {/* Table หลัก -----------------------------------------------------------------*/}
        <MaterialReactTable table={table} />

        {/* Filter ด้านขวา ---------------------------------------------------------------*/}
        {showSidebarRight && (
          <Paper>
            <Stack p="8px" gap="8px" sx={{ width: "300px" }}>
              {/* ปุ่มและ Dialog สำหรับจัดการกลุ่ม----------------------------------- */}
              <Stack direction="column" spacing={2} alignItems="center">
                {/* กล่องบน: ปุ่ม 2 ปุ่ม */}
                <Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      variant="contained"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Merge Filtered
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleFilterBySavedIds}
                      sx={{ ml: 2 }}
                    >
                      {isShowFiltered ? "Show All" : "Show Merge"}
                    </Button>
                  </Stack>
                </Box>

                {/* กล่องล่าง: Chips */}
                <Box>
                  {Object.keys(groupedIds).map((group) => (
                    <Chip
                      key={group}
                      label={group}
                      onDelete={() => handleDeleteGroup(group)}
                      sx={{ borderRadius: "16px", m: 0.5 }} // เพิ่มช่องว่างเล็กน้อยรอบ ๆ ชิป
                    />
                  ))}
                </Box>
              </Stack>
              {/* Dialog ให้กรอกชื่อกลุ่ม --------------------------------------------*/}
              <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Save Filtered IDs</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter a name for this group:
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Group Name"
                    type="text"
                    fullWidth
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button
                    onClick={handleSaveFilteredIds}
                    disabled={!groupName.trim()}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              {/*  */}
              {/* filter sidebar --------------------------------------------------------------- */}
              {table
                .getLeafHeaders()
                .map(
                  (header) =>
                    header.id !== "mrt-row-select" &&
                    header.id !== "mrt-row-numbers" &&
                    header.id !== "mrt-row-actions" && (
                      <MRT_TableHeadCellFilterContainer
                        key={header.id}
                        header={header}
                        table={table}
                      />
                    )
                )}
            </Stack>
          </Paper>
        )}
        {/* Delete Modal */}
        {isDeleteModalOpen && ( // ++++++++++++++++ แสดง Delete Modal
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setIsDeleteModalOpen(false)} // ++++++++++++++++ ปิด Modal
                  ></button>
                </div>
                <div className="modal-body">
                  {/* // ++++++++++++++++ แสดงชื่อ View ที่จะลบ */}
                  <p>Are you sure you want to delete</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsDeleteModalOpen(false)} // ++++++++++++++++ ปิด Modal
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDeleteRow} // ++++++++++++++++ ยืนยันการลบ
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default Table6;
