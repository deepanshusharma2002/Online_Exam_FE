"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import "./PostLists.css";

const StudentsLists = ({ handleOpenForm, handleEditData }) => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const limit = 100;

    const fetchPosts = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetcher(`/student?page=${page}&limit=${limit}`);

            if (!data.success) throw new Error(data.message || "Failed to fetch Questions");
            handleEditData(data?.exam_scheduled)
            setPosts(data.data);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong while fetching Questions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page]);

    return (
        <div className="post-container">

            <div className="add-job-btn">
                <h2 className="post-heading">All Students</h2>
                <button onClick={handleOpenForm}>
                    Scheduled Exam
                </button>
            </div>

            {loading ? (
                <div className="loader-wrap">
                    <Loader size={50} color="lightgray" />
                </div>
            ) : error ? (
                <div className="error-box">{error}</div>
            ) : posts.length === 0 ? (
                <p className="no-data">No Students found.</p>
            ) : (
                <>
                    <div className="table-wrapper">
                        <table className="post-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Caste</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.student_id}>
                                        <td>{(page - 1) * limit + index + 1}</td>
                                        <td className="truncate-title">{post.name}</td>
                                        <td>{post.email}</td>
                                        <td>{post.mobile}</td>
                                        <td>{post.age}</td>
                                        <td>{post.gender}</td>
                                        <td>{post?.caste}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${post.status === 1 ? "active" : "inactive"}`}
                                            >
                                                {post.is_verified ? "Verified" : "Not Verified"}
                                            </span>
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

        </div>
    );
};

export default StudentsLists;
