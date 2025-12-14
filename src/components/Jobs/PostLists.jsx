"use client";

import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./PostLists.css";
import ConfirmBox from "./ConfirmBox";

const PostLists = ({ handleOpenForm, handleEditData, editData }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 50;
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

  // ✅ Filters
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null);

  // ✅ Fetch posts with filters
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      let query = `/naukari?page=${page}&limit=${limit}`;

      if (selectedClass) query += `&class=${selectedClass}`;
      if (selectedSubject) query += `&subject=${selectedSubject}`;

      const data = await fetcher(query);
      if (!data.success) throw new Error(data.message);

      setPosts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Re-fetch on page, filters, or edit changes
  useEffect(() => {
    if (editData === undefined) return;
    fetchPosts();
  }, [page, selectedClass, selectedSubject, editData]);

  // ✅ Delete post
  const handleDelete = async (postId) => {
    try {
      const res = await fetcher(`/naukari/${postId}`, { method: "DELETE" });
      if (!res.success) throw new Error(res.message);

      fetchPosts();
      setDeletePost(null);
    } catch (err) {
      alert(err.message || "Failed to delete notes.");
      setDeletePost(null);
    }
  };

  // ✅ Reset filters
  const clearFilters = () => {
    setSelectedClass("");
    setSelectedSubject("");
    setPage(1);
  };

  return (
    <div className="post-container">
      {/* Header */}
      <div className="add-job-btn">
        <h2 className="post-heading">All Notes</h2>
        <button onClick={handleOpenForm}>+ Add Notes</button>
      </div>

      {/* ✅ Filters */}
      <div className="filters">
        <div className="form-group">
          <label>Class</label>
          <select
            name="class"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setPage(1);
            }}
            className="form-select"
          >
            <option value="">Select Class</option>
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
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setPage(1);
            }}
            className="form-select"
            disabled={!selectedClass}
          >
            <option value="">Select Subject</option>

            {subjectsByClass[selectedClass]?.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <button className="clear-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loader-wrap">
          <Loader size={50} color="lightgray" />
        </div>
      ) : error ? (
        <div className="error-box">{error}</div>
      ) : posts.length === 0 ? (
        <p className="no-data">No Notes found.</p>
      ) : (
        <>
          {/* Table */}
          <div className="table-wrapper">
            <table className="post-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.naukari_id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td className="truncate-title">{post.title}</td>
                    <td>Class {post.class}</td>
                    <td>{post.subject}</td>
                    <td>
                      <span
                        className={`status-badge ${post.status === 1 ? "active" : "inactive"
                          }`}
                      >
                        {post.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="action-icons">
                      <FaEye
                        className="icon view"
                        title="View"
                        onClick={() => setSelectedPost(post)}
                      />
                      <FaEdit
                        className="icon edit"
                        title="Edit"
                        onClick={() => handleEditData(post)}
                      />
                      <FaTrash
                        className="icon delete"
                        title="Delete"
                        onClick={() => setDeletePost(post)}
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

          {/* View Modal */}
          {selectedPost && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>{selectedPost.title}</h3>
                <p className="modal-date">
                  Posted on{" "}
                  {new Date(selectedPost.createdAt).toLocaleDateString("en-IN")}
                </p>
                <div
                  className="modal-description"
                  dangerouslySetInnerHTML={{
                    __html: selectedPost.description,
                  }}
                />
                <button
                  className="close-btn"
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {deletePost && (
            <ConfirmBox
              message={`Are you sure you want to delete "${deletePost.title}"?`}
              onConfirm={() => handleDelete(deletePost.naukari_id)}
              onCancel={() => setDeletePost(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostLists;