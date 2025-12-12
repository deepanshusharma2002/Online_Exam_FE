"use client";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";
import "./PostLists.css";
import { FaEdit } from "react-icons/fa";

const StudentsLists = ({ handleEditData }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 100;

  // NEW STATES
  const [activeTab, setActiveTab] = useState("all"); // all, authorized, unauthorized
  const [selectedClass, setSelectedClass] = useState(""); // class filter

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      let url = `/student?page=${page}&limit=${limit}`;

      /** CHANGE API BASED ON TAB **/
      if (activeTab === "authorized") url += `&isAuthorized=true`;
      if (activeTab === "unauthorized") url += `&isAuthorized=false`;

      /** CLASS FILTER ONLY FOR AUTHORIZED **/
      if (activeTab === "authorized" && selectedClass)
        url += `&class=${selectedClass}`;

      const data = await fetcher(url);

      if (!data.success) throw new Error(data.message || "Failed to fetch Students");

      setPosts(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  /** FETCH WHEN PAGE, TAB OR CLASS CHANGES **/
  useEffect(() => {
    fetchPosts();
  }, [page, activeTab, selectedClass]);

  /** WHEN TAB CHANGES → RESET PAGE + CLASS **/
  useEffect(() => {
    setPage(1);
    setSelectedClass(""); // remove class filter when switching tab
  }, [activeTab]);

  return (
    <div className="post-container">
      {/* ------------------ TABS ------------------ */}
      <div className="tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Students
        </button>
        <button
          className={activeTab === "authorized" ? "active" : ""}
          onClick={() => setActiveTab("authorized")}
        >
          Authorized Students
        </button>
        <button
          className={activeTab === "unauthorized" ? "active" : ""}
          onClick={() => setActiveTab("unauthorized")}
        >
          Unauthorized Students
        </button>
      </div>

      {/* ------------------ CLASS FILTER (Only For Authorized) ------------------ */}
      {activeTab === "authorized" && (
        <div className="filter-box">
          <label>Search by Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ------------------ HEADING ------------------ */}
      <div className="add-job-btn">
        <h2 className="post-heading">
          {activeTab === "all"
            ? "All Students"
            : activeTab === "authorized"
            ? "Authorized Students"
            : "Unauthorized Students"}
        </h2>
      </div>

      {/* ------------------ TABLE ------------------ */}
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
                  <th>Class</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                    <td>{post?.class || "Not Assigned"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          post.status == 1 ? "active" : "inactive"
                        }`}
                      >
                        {post.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <FaEdit
                        title="Edit"
                        className="icon edit"
                        onClick={() => handleEditData(post)}
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
    </div>
  );
};

export default StudentsLists;
