"use client";

import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import "./PostLists.css";

const PostPriorityLists = ({ handleAdd }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetcher(`/naukari?page=${page}&limit=${limit}&type=null_priority`);
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

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="post-container">

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
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.naukari_id} onClick={() => handleAdd(post)}>
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

export default PostPriorityLists;

