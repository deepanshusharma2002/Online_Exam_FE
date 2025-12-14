"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./PostLists.css";
import ConfirmBox from "./ConfirmBox";

const ExamScheduleList = ({ handleOpenForm, handleEditData }) => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const limit = 10;

    const [showResultPopup, setShowResultPopup] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [studentResults, setStudentResults] = useState([]);
    const [resultPagination, setResultPagination] = useState(null);
    const [resultPage, setResultPage] = useState(1);
    const [searchName, setSearchName] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [showBreakupPopup, setShowBreakupPopup] = useState(false);
    const [breakupData, setBreakupData] = useState([]);
    const [loadingBreakup, setLoadingBreakup] = useState(false);
    const [selectedStudentExam, setSelectedStudentExam] = useState(null);

    const viewBreakup = async (exam_id) => {
        setLoadingBreakup(true);
        setSelectedStudentExam(exam_id);

        const data = await fetcher(`/student/exam/breakup/${exam_id}`);

        if (data.success) {
            setBreakupData(data.data);
            setShowBreakupPopup(true);
        }

        setLoadingBreakup(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchName);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchName]);

    const openResultPopup = (exam) => {
        setSelectedExam(exam);
        setResultPage(1);
        setSearchName("");
        setShowResultPopup(true);
    };

    const fetchStudentResults = async () => {
        if (!selectedExam) return;

        const params = new URLSearchParams({
            exam_schedule_id: selectedExam.exam_schedule_id,
            page: resultPage,
            ...(debouncedSearch && { search: debouncedSearch }),
        });

        const data = await fetcher(
            `/student/exam/result/admin?${params.toString()}`
        );

        if (data.success) {
            setStudentResults(data.data);
            setResultPagination(data.pagination);
        }
    };

    useEffect(() => {
        setResultPage(1);
    }, [debouncedSearch]);


    useEffect(() => {
        if (showResultPopup) fetchStudentResults();
    }, [showResultPopup, resultPage, debouncedSearch]);

    // 🔹 Filters
    const [filters, setFilters] = useState({
        status: "",
        class: "",
        subject: "",
    });

    const subjectsByClass = {
        1: ["English", "Hindi", "Math", "EVS"],
        2: ["English", "Hindi", "Math", "EVS"],
        3: ["English", "Hindi", "Math", "EVS", "GK"],
        4: ["English", "Hindi", "Math", "EVS", "GK"],
        5: ["English", "Hindi", "Math", "EVS", "GK"],
        6: ["English", "Hindi", "Math", "Science", "Social Science"],
        7: ["English", "Hindi", "Math", "Science", "Social Science"],
        8: ["English", "Hindi", "Math", "Science", "Social Science"],
        9: ["English", "Hindi", "Math", "Science", "Social Science"],
        10: ["English", "Hindi", "Math", "Science", "Social Science"],
        11: ["Physics", "Chemistry", "Math", "Biology"],
        12: ["Physics", "Chemistry", "Math", "Biology"],
    };

    // 🔹 Fetch Exams
    const fetchPosts = async () => {
        setLoading(true);
        setError("");

        try {
            const params = new URLSearchParams({
                page,
                limit,
                ...(filters.status && { status: filters.status }),
                ...(filters.class && { class: filters.class }),
                ...(filters.subject && { subject: filters.subject }),
            });

            const data = await fetcher(`/student/exam-schedule?${params.toString()}`);

            if (!data.success) throw new Error(data.message || "Failed to fetch exams");

            setPosts(data.data);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong while fetching exams.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "class" ? { subject: "" } : {}),
        }));

        setPage(1);
    };

    // 🔹 Effects
    useEffect(() => {
        fetchPosts();
    }, [page, filters]);

    return (
        <div className="post-container">
            {/* Header */}
            <div className="add-job-btn">
                <h2 className="post-heading">All Exams</h2>
                <button onClick={handleOpenForm}>+ Add Exam</button>
            </div>

            {/* Filters */}
            <div className="filter-row">
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="form-select"
                    >
                        <option value="">All</option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Class</label>
                    <select
                        name="class"
                        value={filters.class}
                        onChange={handleFilterChange}
                        className="form-select"
                    >
                        <option value="">All Classes</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Class {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Subject</label>
                    <select
                        name="subject"
                        value={filters.subject}
                        onChange={handleFilterChange}
                        className="form-select"
                        disabled={!filters.class}
                    >
                        <option value="">All Subjects</option>
                        {subjectsByClass[filters.class]?.map((sub, i) => (
                            <option key={i} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="loader-wrap">
                    <Loader size={50} color="lightgray" />
                </div>
            ) : error ? (
                <div className="error-box">{error}</div>
            ) : posts.length === 0 ? (
                <p className="no-data">No exams found.</p>
            ) : (
                <>
                    <div className="table-wrapper">
                        <table className="post-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Exam Name</th>
                                    <th>Start Date</th>
                                    <th>Start Time</th>
                                    <th>End Date</th>
                                    <th>End Time</th>
                                    <th>No. of Questions</th>
                                    <th>Exam Time (Min)</th>
                                    <th>Class</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.exam_schedule_id}>
                                        <td>{(page - 1) * limit + index + 1}</td>
                                        <td className="truncate-title">{post.exam_name}</td>
                                        <td>{new Date(post.start_date).toLocaleDateString("en-IN")}</td>
                                        <td>{post.start_time}</td>
                                        <td>{new Date(post.end_date).toLocaleDateString("en-IN")}</td>
                                        <td>{post.end_time}</td>
                                        <td>{post.total_q}</td>
                                        <td>{post.exam_time_min}</td>
                                        <td>{post.class}</td>
                                        <td>{post.subject}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${post.status === 1 ? "active" : "inactive"
                                                    }`}
                                            >
                                                {post.status === 1 ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <FaEye
                                                className="icon view"
                                                title="View Results"
                                                onClick={() => openResultPopup(post)}
                                            />
                                            <FaEdit
                                                className="icon edit"
                                                onClick={() => handleEditData(post)}
                                            />
                                            <FaTrash
                                                className="icon delete"
                                                onClick={() => setConfirmDelete(post)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination && (
                        <div className="pagination">
                            <button
                                disabled={!pagination.hasPrevPage}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Prev
                            </button>
                            <span>
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <button
                                disabled={!pagination.hasNextPage}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation */}
            {confirmDelete && (
                <ConfirmBox
                    message={`Are you sure you want to delete "${confirmDelete.exam_name}"?`}
                    onConfirm={async () => {
                        const result = await fetcher(
                            `/student/exam-schedule/${confirmDelete.exam_schedule_id}`,
                            { method: "DELETE" }
                        );
                        if (result.success) {
                            setConfirmDelete(null);
                            fetchPosts();
                        }
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}

            {showResultPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <div className="popup-header">
                            <h3>Exam Results – {selectedExam.exam_name}</h3>
                            <button onClick={() => setShowResultPopup(false)}>✕</button>
                        </div>

                        <div className="popup-content">
                            {/* 🔍 Search */}
                            <input
                                type="text"
                                placeholder="Search by student name..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="search-input"
                            />

                            {studentResults.length === 0 ? (
                                <p className="no-data">No students found.</p>
                            ) : (
                                <table className="post-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Student</th>
                                            <th>Exam Name</th>
                                            <th>Class</th>
                                            <th>Subject</th>
                                            <th>Score</th>
                                            <th>Fatal</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentResults.map((s, i) => (
                                            <tr key={s.exam_id}>
                                                <td>{(resultPage - 1) * 10 + i + 1}</td>
                                                <td>{s.student?.name}</td>
                                                <td>{selectedExam.exam_name}</td>
                                                <td>{selectedExam.class}</td>
                                                <td>{selectedExam.subject}</td>
                                                <td>{s.score}</td>
                                                <td>{s.fatal ?? 0}</td>
                                                <td>
                                                    <FaEye
                                                        className="icon view"
                                                        title="View Breakup"
                                                        onClick={() => viewBreakup(s.exam_id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {/* Pagination */}
                            {resultPagination && (
                                <div className="pagination">
                                    <button
                                        disabled={!resultPagination.hasPrevPage}
                                        onClick={() => setResultPage((p) => p - 1)}
                                    >
                                        Prev
                                    </button>
                                    <span>
                                        Page {resultPagination.currentPage} of{" "}
                                        {resultPagination.totalPages}
                                    </span>
                                    <button
                                        disabled={!resultPagination.hasNextPage}
                                        onClick={() => setResultPage((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showBreakupPopup && (
                <div className="popup-overlay">
                    <div className="popup-box large">
                        <div className="popup-header">
                            <h3>Answer Breakup</h3>
                            <button onClick={() => setShowBreakupPopup(false)}>✕</button>
                        </div>

                        <div className="popup-content">
                            {loadingBreakup ? (
                                <p className="center">Loading breakup...</p>
                            ) : (
                                breakupData.map((b, i) => (
                                    <div
                                        key={i}
                                        className={`breakup-q ${b.selected === b.question.ans_option ? "right" : "wrong"
                                            }`}
                                    >
                                        <p>
                                            <strong>Q{i + 1}.</strong> {b.question.question}
                                        </p>

                                        <p>
                                            <b>Student Answer:</b>{" "}
                                            {b.selected
                                                ? b.question[b.selected]
                                                : "Not Attempted"}
                                        </p>

                                        {b.selected !== b.question.ans_option && (
                                            <p>
                                                <b>Correct:</b>{" "}
                                                {b.question[b.question.ans_option]}
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ExamScheduleList;
