"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateSection = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    url: "",
    img_url: null,
    seo_title: "",
    seo_keywords: "",
    seo_published_date: "",
    seo_description: "",
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        display_name: editData.display_name || "",
        url: editData.url || "",
        img_url: null,

        seo_title: editData.seo_title || "",
        seo_keywords: editData.seo_keywords || "",
        seo_published_date: editData.seo_published_date
          ? editData.seo_published_date.split("T")[0]
          : "",
        seo_description: editData.seo_description || ""
      });
      // setPreview(`http://localhost:5500${editData.img_url}`);
      setPreview(`https://allgovjobs.com/backend${editData.img_url}`);
    }
  }, [editData]);

  // ✅ Handle input & compress image if large
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        let compressedFile = file;

        if (file.size / 1024 / 1024 > 1) {
          compressedFile = await imageCompression(file, options);
          console.log(
            `Compressed from ${(file.size / 1024 / 1024).toFixed(2)} MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
          );
        }

        setFormData({ ...formData, img_url: compressedFile });
        setPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Image compression failed:", error);
        setMessage({ type: "error", text: "Image compression failed" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.display_name.trim())
      newErrors.display_name = "Display Name is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!isEditMode && !formData.img_url)
      newErrors.img_url = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit form (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("display_name", formData.display_name);
      data.append("seo_title", formData.seo_title);
      data.append("seo_keywords", formData.seo_keywords);
      data.append("seo_published_date", formData.seo_published_date);
      data.append("seo_description", formData.seo_description);
      data.append("url", formData.url);

      if (formData.img_url instanceof File) {
        data.append("img_url", formData.img_url);
      }

      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/section/${editData.section_id}`
        : "/section";

      const result = await fetcher(endpoint, {
        method,
        body: data,
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Section ${isEditMode ? "updated" : "created"} successfully!`,
        });

        // Reset form after success
        if (!isEditMode) {
          setFormData({ display_name: "", url: "", img_url: null });
          setPreview(null);
        }

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
        <h2>{isEditMode ? "Edit Section" : "Create Section"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Enter Display Name..."
            />
            {errors.display_name && (
              <span className="error">{errors.display_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter URL..."
            />
            {errors.url && <span className="error">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label>Section Image</label>
            <input
              type="file"
              name="img_url"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.img_url && <span className="error">{errors.img_url}</span>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  marginTop: "10px",
                  width: "120px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          {/* SEO Section */}
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
            {isEditMode ? "Update Section" : "Create Section"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;


