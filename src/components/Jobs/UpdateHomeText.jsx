"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const UpdateHomeText = ({ editData }) => {
  const [formData, setFormData] = useState({
    heading1: "",
    heading2: "",
    seo_title: "",
    seo_keywords: "",
    seo_published_date: "",
    seo_description: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        heading1: editData.heading1 || "",
        heading2: editData.heading2 || "",

        seo_title: editData.seo_title || "",
        seo_keywords: editData.seo_keywords || "",
        seo_published_date: editData.seo_published_date
          ? editData.seo_published_date.split("T")[0]
          : "",
        seo_description: editData.seo_description || ""
      });
    }
  }, [editData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.heading1.trim())
      newErrors.heading1 = "Display Name is required";
    if (!formData.heading2.trim()) newErrors.heading2 = "heading2 is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit form (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/home/text/${editData.home_text_id}`
        : "/home/text";

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Section ${isEditMode ? "updated" : "created"} successfully!`,
        });

        // Reset form after success
        if (!isEditMode) {
          setFormData({ heading1: "", heading2: "" });
        }

        setErrors({});
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

      <div className="form-card">
        <h2>{isEditMode ? "Edit Home Text" : "Create Home Text"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Heading 1</label>
            <input
              type="text"
              name="heading1"
              value={formData.heading1}
              onChange={handleChange}
              placeholder="Enter Heading 1..."
            />
            {errors.heading1 && (
              <span className="error">{errors.heading1}</span>
            )}
          </div>

          <div className="form-group">
            <label>Heading 2</label>
            <input
              type="text"
              name="heading2"
              value={formData.heading2}
              onChange={handleChange}
              placeholder="Enter Heading 2..."
            />
            {errors.heading2 && <span className="error">{errors.heading2}</span>}
          </div>

          <div className="seo-section">
            <h3>SEO Details</h3>

            <div className="form-group">
              <label>SEO Title</label>
              <input
                type="text"
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
                placeholder="Enter SEO title..."
              />
              {errors.seo_title && <span className="error">{errors.seo_title}</span>}
            </div>

            <div className="form-group">
              <label>SEO Keywords</label>
              <input
                type="text"
                name="seo_keywords"
                value={formData.seo_keywords}
                onChange={handleChange}
                placeholder="Enter comma-separated keywords..."
              />
              {errors.seo_keywords && (
                <span className="error">{errors.seo_keywords}</span>
              )}
            </div>

            <div className="form-group">
              <label>SEO Published Date</label>
              <input
                type="date"
                name="seo_published_date"
                value={formData.seo_published_date}
                onChange={handleChange}
              />
              {errors.seo_published_date && (
                <span className="error">{errors.seo_published_date}</span>
              )}
            </div>

            <div className="form-group">
              <label>SEO Description</label>
              <input
                type="text"
                name="seo_description"
                value={formData.seo_description}
                onChange={handleChange}
                placeholder="Enter SEO Description..."
              />
              {errors.seo_description && (
                <span className="error">{errors.seo_description}</span>
              )}
            </div>

          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Home Text" : "Create Home Text"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHomeText;


