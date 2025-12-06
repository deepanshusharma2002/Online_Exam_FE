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
  const [selectedPost, setSelectedPost] = useState(null);
  const [deletePost, setDeletePost] = useState(null); // post to delete
  const limit = 10;

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetcher(`/naukari?page=${page}&limit=${limit}`);
      if (!data.success) throw new Error(data.message || "Failed to fetch posts");

      setPosts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, [page]);

  // useEffect(() => {
  //   if (!editData) {
  //     fetchPosts();
  //   }
  // }, [editData]);

  useEffect(() => {
    if (editData === undefined) return;

    fetchPosts();
  }, [page, editData]);

  // Handle deletion
  const handleDelete = async (postId) => {
    try {
      const res = await fetcher(`/naukari/${postId}`, { method: "DELETE" });
      if (!res.success) throw new Error(res.message || "Failed to delete post");
      fetchPosts(); // Refresh posts
      setDeletePost(null); // Close confirm modal
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete post.");
      setDeletePost(null);
    }
  };

  return (
    <div className="post-container">
      <div className="add-job-btn">
        <h2 className="post-heading">All Job Posts</h2>
        <button onClick={handleOpenForm}>+ Add Job</button>
      </div>

      {loading ? (
        <div className="loader-wrap">
          <Loader size={50} color="lightgray" />
        </div>
      ) : error ? (
        <div className="error-box">{error}</div>
      ) : posts.length === 0 ? (
        <p className="no-data">No posts found.</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="post-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>SEO Title</th>
                  <th>Keywords</th>
                  <th>Status</th>
                  <th>Post Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.naukari_id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td className="truncate-title">{post.title}</td>
                    <td className="truncate-title">{post.seo_title || "—"}</td>
                    <td className="truncate-title">{post.seo_keywords || "—"}</td>
                    <td>
                      <span
                        className={`status-badge ${post.status === 1 ? "active" : "inactive"
                          }`}
                      >
                        {post.status === 0 ? "Inactive" : post.status === 2 ? "New" : "Active"}
                      </span>
                    </td>
                    <td>
                      {new Date(post.postDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="action-icons">
                      <FaEye
                        title="View"
                        className="icon view"
                        onClick={() => setSelectedPost(post)}
                      />
                      <FaEdit
                        title="Edit"
                        className="icon edit"
                        onClick={() => handleEditData(post)}
                      />
                      <FaTrash
                        title="Delete"
                        className="icon delete"
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

          {/* Modal for viewing full description */}
          {selectedPost && (
            <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>{selectedPost.title}</h3>
                <p className="modal-date">
                  Posted on:{" "}
                  {new Date(selectedPost.postDate).toLocaleDateString("en-IN")}
                </p>
                <div
                  className="modal-description"
                  dangerouslySetInnerHTML={{ __html: selectedPost.description }}
                />
                <button className="close-btn" onClick={() => setSelectedPost(null)}>
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ConfirmBox for deletion */}
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

