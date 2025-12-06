"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./PostLists.css";
import ConfirmBox from "./ConfirmBox";

const GovernmentJobsLists = ({ handleOpenForm, handleEditData }) => {
    const [posts, setPosts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const limit = 10;

    const fetchPosts = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetcher(`/government/jobs?page=${page}&limit=${limit}`);

            if (!data.success) throw new Error(data.message || "Failed to fetch home sections");

            setPosts(data.data);
            setPagination(data.pagination);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong while fetching home sections.");
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
                <h2 className="post-heading">All Government Jobs</h2>
                <button onClick={handleOpenForm}>
                    + Add Government Jobs
                </button>
            </div>

            {loading ? (
                <div className="loader-wrap">
                    <Loader size={50} color="lightgray" />
                </div>
            ) : error ? (
                <div className="error-box">{error}</div>
            ) : posts.length === 0 ? (
                <p className="no-data">No Government Jobs found.</p>
            ) : (
                <>
                    <div className="table-wrapper">
                        <table className="post-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Posts</th>
                                    <th>Last Date</th>
                                    <th>URL</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.government_links_id}>
                                        <td>{(page - 1) * limit + index + 1}</td>
                                        <td className="truncate-title">{post.title}</td>
                                        <td>{post.department}</td>
                                        <td>{post.location}</td>
                                        <td>{post.posts}</td>
                                        <td>{new Date(post.last_date).toLocaleDateString()}</td>
                                        <td>{post.url}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${post.status === 1 ? "active" : "inactive"}`}
                                            >
                                                {post.status === 1 ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <FaEdit
                                                title="Edit"
                                                className="icon edit"
                                                onClick={() => handleEditData(post)}
                                            />
                                            <FaTrash
                                                title="Delete"
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


            {confirmDelete && (
                <ConfirmBox
                    message={`Are you sure you want to delete "${confirmDelete.display_name}" home Government Jobs?`}
                    onConfirm={async () => {
                        try {
                            const result = await fetcher(`/government/jobs/${confirmDelete.government_links_id}`, {
                                method: "DELETE",
                                credentials: "include",
                            });

                            if (result.success) {
                                // alert("Section deleted successfully!");
                                setConfirmDelete(null);
                                fetchPosts(); // reload list
                            } else {
                                alert(result.message || "Failed to delete Government Jobs");
                            }
                        } catch (err) {
                            alert("Something went wrong while deleting Government Jobs.");
                        }
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </div>
    );
};

export default GovernmentJobsLists;
