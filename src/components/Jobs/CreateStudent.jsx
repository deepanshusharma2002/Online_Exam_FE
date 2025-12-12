"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateStudent = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    class: null,
    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  /* ✅ PREFILL DATA */
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        class: editData.class || null,
        status: editData.status ?? 1,
      });
    }
  }, [editData]);

  /* ✅ HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ✅ VALIDATION */
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.class.trim())
  //     newErrors.class = "Class is required";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  /* ✅ SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // if (!validateForm()) return;

    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/student/${editData.student_id}`
        : "/student";

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Student ${isEditMode ? "updated" : "created"} successfully`,
        });

        setErrors({});
        setTimeout(() => handleCloseForm(), 800);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="create-job-container">
      <div className="header-links">
        <a className="back-link" onClick={handleCloseForm}>
          <FaArrowLeft /> Back
        </a>
      </div>

      <div className="form-card">
        <h2>
          {isEditMode ? "Edit Student" : "Create Student"}
        </h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          Name : <b>{editData.name}</b>
          <br /><br />
          Email : <b>{editData.email}</b><br /><br />
          {/* Exam Name */}
          <div className="form-group">
            <label>Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="form-select"
            >
              <option value={""}>Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Class {i + 1}
                </option>
              ))}
            </select>
            {errors.class && (
              <span className="error">{errors.class}</span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={5}>Inactive</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Student" : "Create Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
