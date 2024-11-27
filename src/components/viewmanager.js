"use client";

import React, { useState, useRef, useEffect } from "react";
import "./style/viewmanager.css";

const ViewManager = ({
	views,
	isViewDialogOpen,
	setIsViewDialogOpen,
	handleButtonClick,
	viewName,
	setViewName,
	handleCloseViewDialog,
	handleAddView,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(null); // To track which dropdown is open
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false); // ++++++++++++++++ เพิ่ม state สำหรับ Rename Modal
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // ++++++++++++++++ เพิ่ม state สำหรับ Delete Modal
	const [selectedView, setSelectedView] = useState(null); // ++++++++++++++++ เก็บข้อมูล View ที่ถูกเลือก (สำหรับ Rename/Delete)
	const [newViewName, setNewViewName] = useState(""); // ++++++++++++++++ เก็บชื่อใหม่สำหรับ Rename
	const dropdownRefs = useRef([]); // Store refs for each dropdown

	// Toggle specific dropdown
	const toggleDropdown = (index) => {
		setIsDropdownOpen(isDropdownOpen === index ? null : index);
	};

	// Handle click outside
	const handleClickOutside = (event) => {
		if (
			isDropdownOpen !== null &&
			dropdownRefs.current[isDropdownOpen] &&
			!dropdownRefs.current[isDropdownOpen].contains(event.target)
		) {
			setIsDropdownOpen(null);
		}
	};

	// Add event listener for outside clicks
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleRename = (view) => {
		console.log("Renaming view:", view.name);
		setSelectedView(view); // ++++++++++++++++ ตั้งค่า View ที่เลือก
		setNewViewName(view.name); // ++++++++++++++++ ดึงชื่อ View ปัจจุบันมาใส่ใน input
		setIsRenameModalOpen(true); // ++++++++++++++++ เปิด Rename Modal
		setIsDropdownOpen(null); // ปิด Dropdown หลังเลือกเมนู
	};

	const handleDelete = (view) => {
		console.log("Deleting view:", view.name);
		setSelectedView(view); // ++++++++++++++++ ตั้งค่า View ที่เลือก
		setIsDeleteModalOpen(true); // ++++++++++++++++ เปิด Delete Modal
		setIsDropdownOpen(null); // ปิด Dropdown หลังเลือกเมนู
	};

	// Confirm Rename
	const confirmRename = () => {
		console.log("Renamed view:", selectedView.name, "to", newViewName); // ++++++++++++++++ Console log ชื่อใหม่
		setIsRenameModalOpen(false); // ++++++++++++++++ ปิด Rename Modal
	};

	// Confirm Delete
	const confirmDelete = () => {
		console.log("Deleted view:", selectedView.name); // ++++++++++++++++ Console log การลบ
		setIsDeleteModalOpen(false); // ++++++++++++++++ ปิด Delete Modal
	};

	return (
		<div className="container" style={{ maxWidth: "282px" }}>
			<div className="card mb-3">
				<div className="card-body">
					<div className="d-flex justify-content-between">
						<h6 className="card-title fw-bold">My views</h6>

						{/* +++++++++ ปุ่ม Add views ++++++++++ */}
						<i
							className="bi bi-plus-square me-2 icon-hover"
							onClick={() => setIsViewDialogOpen(true)}
						></i>
					</div>
					<hr />

					{views.map((view, index) => (
						<div
							key={index}
							className="d-flex align-items-center justify-content-between py-2 px-2 mb-1 hover-list-view-bg"
						>
							{/* <i
								className={`bi ${
									view.isStarred ? "bi-star-fill" : "bi-star"
								} me-2`}
							></i> */}

							{/* icon table */}
							<i class="bi bi-table me-2"></i>

							<button
								className="btn btn-link text-start text-dark p-0 text-decoration-none view-menu-text"
								onClick={() => handleButtonClick(view)}
							>
								{view.name}
							</button>

							{/* Dropdown Menu */}
							<div
								className="dropdown"
								ref={(el) => (dropdownRefs.current[index] = el)} // Assign ref to each dropdown
							>
								<button
									className="btn btn-light btn-sm"
									onClick={() => toggleDropdown(index)}
								>
									<i className="bi bi-three-dots-vertical"></i>
								</button>

								{isDropdownOpen === index && (
									<ul
										className="dropdown-menu show mt-1 shadow-sm"
										style={{ display: "block" }}
									>
										<li>
											<button
												className="dropdown-item"
												onClick={() => handleRename(view)}
											>
												Rename
											</button>
										</li>
										<li>
											<button
												className="dropdown-item text-danger"
												onClick={() => handleDelete(view)}
											>
												Delete
											</button>
										</li>
									</ul>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Add View Dialog */}
			{isViewDialogOpen && (
				<div
					className="modal show d-block"
					tabIndex="-1"
					role="dialog"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Save Your View</h5>
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={handleCloseViewDialog}
								></button>
							</div>
							<div className="modal-body">
								<p>Please enter a name for this View:</p>
								<input
									type="text"
									className="form-control"
									placeholder="View Name"
									value={viewName}
									onChange={(e) => setViewName(e.target.value)}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={handleCloseViewDialog}
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={handleAddView}
									disabled={!viewName.trim()}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Rename Modal */}
			{isRenameModalOpen && ( // ++++++++++++++++ แสดง Rename Modal
				<div
					className="modal show d-block"
					tabIndex="-1"
					role="dialog"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Rename View</h5>
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => setIsRenameModalOpen(false)} // ++++++++++++++++ ปิด Modal
								></button>
							</div>
							<div className="modal-body">
								<p>Please enter a new name for this View:</p>
								<input
									type="text"
									className="form-control"
									placeholder="New View Name"
									value={newViewName} // ++++++++++++++++ แสดงชื่อใหม่
									onChange={(e) => setNewViewName(e.target.value)} // ++++++++++++++++ เก็บชื่อใหม่เมื่อผู้ใช้พิมพ์
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setIsRenameModalOpen(false)} // ++++++++++++++++ ปิด Modal
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={confirmRename} // ++++++++++++++++ ยืนยัน Rename
									disabled={!newViewName.trim()} // ++++++++++++++++ ปิดปุ่มหากชื่อว่าง
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
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
								<p>
									Are you sure you want to delete the view{" "}
									<strong>{selectedView?.name}</strong> ? 
								</p>
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
									onClick={confirmDelete} // ++++++++++++++++ ยืนยันการลบ
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

		</div>
	);
};

export default ViewManager;
