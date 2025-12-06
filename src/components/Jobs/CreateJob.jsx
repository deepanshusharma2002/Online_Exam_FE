"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";
import dynamic from "next/dynamic";
const CkEditor = dynamic(() => import("../CustomEditor/CkEditor"), { ssr: false });

const CreateJob = ({ handleCloseForm, editData }) => {
  const [editorData, setEditorData] = useState("");
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    isResult: false,
    isAdmitCard: false,
    isNewPost: false,
    postDate: "",
    slug: "",
  });

  const [seoData, setSeoData] = useState({
    seo_title: "",
    seo_keywords: "",
    seo_published_date: "",
    seo_description: "",
    seo_section: "",
    seo_sub_section: "",
    seo_category: "",
  });

  const [importantQuesAns, setImportantQuesAns] = useState([{ question: "", answer: "" }]);
  const [discoverMore, setDiscoverMore] = useState([{ display_name: "", url: "" }]);
  const [usefulLinks, setUsefulLinks] = useState([{ text: "", links: [{ display_name: "", url: "" }] }]);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [sections, setSections] = useState([]);

  // ✅ Fetch Sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetcher("/section?page=1&limit=100");
        if (res && res.data) setSections(res.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, []);

  useEffect(() => {
    if (editData) {
      setSeoData(prev => ({
        ...prev,
        seo_section: editData.seo_section || "",
      }))
    }
  }, [sections]);

  // ✅ Pre-fill form if editData exists
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        isResult: editData.isResult || false,
        isAdmitCard: editData.isAdmitCard || false,
        isNewPost: editData.status === 2 || false,
        postDate: editData.postDate ? editData.postDate.split("T")[0] : "",
        slug: editData.slug || "",
      });
      // setEditorData(editData.description || "");
      // setData(editData.description || "");
      setSeoData({
        seo_title: editData.seo_title || "",
        seo_keywords: editData.seo_keywords || "",
        seo_published_date: editData.seo_published_date
          ? editData.seo_published_date.split("T")[0]
          : "",
        seo_description: editData.seo_description || "",
        seo_section: editData.seo_section || "",
        seo_sub_section: editData.seo_sub_section || "",
        seo_category: editData.seo_category || "",
      });
      setImportantQuesAns(editData.importantQuesAns.length ? editData.importantQuesAns : [{ question: "", answer: "" }]);
      setDiscoverMore(editData.discoverMoreLinks.length ? editData.discoverMoreLinks : [{ display_name: "", url: "" }]);
      setUsefulLinks(editData.usefulLinks.length ? editData.usefulLinks : [{ text: "", links: [{ display_name: "", url: "" }] }]);
    }
  }, [editData]);

  // ✅ Handlers for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("seo_")) {
      setSeoData({ ...seoData, [name]: type === "checkbox" ? checked : value });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleQuesAnsChange = (index, field, value) => {
    const updated = [...importantQuesAns];
    updated[index][field] = value;
    setImportantQuesAns(updated);
  };

  const addQuestionAnswer = () => setImportantQuesAns([...importantQuesAns, { question: "", answer: "" }]);
  const deleteQuestionAnswer = (index) => setImportantQuesAns(importantQuesAns.filter((_, i) => i !== index));

  const handleDiscoverMoreChange = (index, field, value) => {
    const updated = [...discoverMore];
    updated[index][field] = value;
    setDiscoverMore(updated);
  };
  const handleAddDiscoverMore = () => setDiscoverMore([...discoverMore, { display_name: "", url: "" }]);
  const handleDeleteDiscoverMore = (index) => setDiscoverMore(discoverMore.filter((_, i) => i !== index));

  const handleUsefulSectionChange = (index, value) => {
    const updated = [...usefulLinks];
    updated[index].text = value;
    setUsefulLinks(updated);
  };
  const handleAddUsefulSection = () => setUsefulLinks([...usefulLinks, { text: "", links: [{ display_name: "", url: "" }] }]);
  const handleDeleteUsefulSection = (index) => setUsefulLinks(usefulLinks.filter((_, i) => i !== index));

  const handleUsefulLinkChange = (sectionIndex, linkIndex, field, value) => {
    const updated = [...usefulLinks];
    updated[sectionIndex].links[linkIndex][field] = value;
    setUsefulLinks(updated);
  };
  const handleAddUsefulLink = (sectionIndex) => {
    const updated = [...usefulLinks];
    updated[sectionIndex].links.push({ display_name: "", url: "" });
    setUsefulLinks(updated);
  };
  const handleDeleteUsefulLink = (sectionIndex, linkIndex) => {
    const updated = [...usefulLinks];
    updated[sectionIndex].links = updated[sectionIndex].links.filter((_, i) => i !== linkIndex);
    setUsefulLinks(updated);
  };

  const handleOnUpdate = (editor, field) => {
    if (field === "description") setData(editor);
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.postDate) newErrors.postDate = "Post date is required";
    if (!data.trim()) newErrors.description = "Job description is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";

    if (!seoData.seo_title.trim()) newErrors.seo_title = "SEO title is required";
    if (!seoData.seo_keywords.trim()) newErrors.seo_keywords = "SEO keywords are required";
    if (!seoData.seo_published_date) newErrors.seo_published_date = "SEO published date is required";
    if (!seoData.seo_description.trim()) newErrors.seo_description = "SEO description is required";
    if (!seoData.seo_section.trim()) newErrors.seo_section = "SEO section is required";
    if (!seoData.seo_category.trim()) newErrors.seo_category = "SEO category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        description: data,
        ...seoData,
        importantQuesAns,
        usefulLinks,
        discoverMoreLinks: discoverMore,
      };

      let result;
      if (editData) {
        // Update job
        result = await fetcher(`/naukari/${editData.naukari_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      } else {
        // Create job
        result = await fetcher("/naukari", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
      }

      if (result.success) {
        setMessage({ type: "success", text: `Job ${editData ? "updated" : "created"} successfully!` });
        handleCloseForm();
      } else {
        setMessage({ type: "error", text: result.message || `Failed to ${editData ? "update" : "create"} job` });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || `Failed to ${editData ? "update" : "create"} job` });
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
        <h2>{editData ? "Edit Job Post" : "Create Job Post"}</h2>

        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Job Info */}
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter job title..." />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Post Date</label>
            <input type="date" name="postDate" value={formData.postDate} onChange={handleChange} />
            {errors.postDate && <span className="error">{errors.postDate}</span>}
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Enter Slug..." />
            {errors.slug && <span className="error">{errors.slug}</span>}
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="isResult" checked={formData.isResult} onChange={handleChange} />
              Is Result Available
            </label>
            <label>
              <input type="checkbox" name="isAdmitCard" checked={formData.isAdmitCard} onChange={handleChange} />
              Is Admit Card Available
            </label>
            <label>
              <input type="checkbox" name="isNewPost" checked={formData.isNewPost} onChange={handleChange} />
              Is New Post
            </label>
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <CkEditor editData={editData} editorData={editorData} setEditorData={setEditorData} handleOnUpdate={(data) => handleOnUpdate(data, "description")} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>


          {/* Discover More Section */}
          <div className="seo-section">
            <h3>Discover More</h3>
            {discoverMore.map((item, index) => (
              <div key={index} className="qa-item">
                <div className="form-group">
                  <label>Display Name</label>
                  <input
                    type="text"
                    value={item.display_name}
                    onChange={(e) => handleDiscoverMoreChange(index, "display_name", e.target.value)}
                    placeholder="Enter Display Name..."
                  />
                </div>
                <div className="form-group">
                  <label>URL</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleDiscoverMoreChange(index, "url", e.target.value)}
                    placeholder="Enter URL..."
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteDiscoverMore(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="add-btn" onClick={handleAddDiscoverMore}>
                + Add Discover More
              </button>
            </div>
          </div>

          {/* Useful Important Links Section */}
          <div className="seo-section">
            <h3>Useful Important Links</h3>

            {usefulLinks.map((section, sectionIndex) => (
              <div key={sectionIndex} className="qa-item">
                <div className="form-group">
                  <label>Section Text</label>
                  <input
                    type="text"
                    value={section.text}
                    onChange={(e) => handleUsefulSectionChange(sectionIndex, e.target.value)}
                    placeholder="Enter section text..."
                  />
                </div>

                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="qa-item">
                    <div className="form-group">
                      <label>Display Name</label>
                      <input
                        type="text"
                        value={link.display_name}
                        onChange={(e) =>
                          handleUsefulLinkChange(sectionIndex, linkIndex, "display_name", e.target.value)
                        }
                        placeholder="Enter Display Name..."
                      />
                    </div>

                    <div className="form-group">
                      <label>URL</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          handleUsefulLinkChange(sectionIndex, linkIndex, "url", e.target.value)
                        }
                        placeholder="Enter URL..."
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDeleteUsefulLink(sectionIndex, linkIndex)}
                      >
                        Delete Link
                      </button>
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button
                    type="button"
                    className="add-btn"
                    onClick={() => handleAddUsefulLink(sectionIndex)}
                  >
                    + Add Link
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteUsefulSection(sectionIndex)}
                  >
                    Delete Section
                  </button>
                </div>

              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="add-btn" onClick={handleAddUsefulSection}>
                + Add More Useful Important Links
              </button>
            </div>
          </div>


          <div className="seo-section">
            <h3>Important Questions & Answers</h3>

            {importantQuesAns.map((item, index) => (
              <div key={index} className="qa-item">
                <div className="form-group">
                  <label>Question {index + 1}</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) =>
                      handleQuesAnsChange(index, "question", e.target.value)
                    }
                    placeholder="Enter question..."
                  />
                </div>

                <div className="form-group">
                  <label>Answer</label>
                  <input
                    type="text"
                    value={item.answer}
                    onChange={(e) =>
                      handleQuesAnsChange(index, "answer", e.target.value)
                    }
                    placeholder="Enter answer..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteQuestionAnswer(index)}
                  // disabled={importantQuesAns.length === 1}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="add-btn"
                onClick={addQuestionAnswer}
              >
                <FaPlus /> Add Important Question and Answer
              </button>
            </div>
          </div>

          {/* SEO Section */}
          <div className="seo-section">
            <h3>SEO Details</h3>

            <div className="form-group">
              <label>SEO Title</label>
              <input
                type="text"
                name="seo_title"
                value={seoData.seo_title}
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
                value={seoData.seo_keywords}
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
                value={seoData.seo_published_date}
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
                value={seoData.seo_description}
                onChange={handleChange}
                placeholder="Enter SEO Description..."
              />
              {errors.seo_description && (
                <span className="error">{errors.seo_description}</span>
              )}
            </div>


            <div className="form-group">
              <label>Section</label>
              <select
                name="seo_section"
                value={seoData.seo_section}
                onChange={handleChange}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section.section_id} value={section.url}>
                    {section.display_name}
                  </option>
                ))}
              </select>
              {errors.seo_section && (
                <span className="error">{errors.seo_section}</span>
              )}
            </div>

            <div className="form-group">
              <label>Sub Section (Optional)</label>
              <input
                type="text"
                name="seo_sub_section"
                value={seoData.seo_sub_section}
                onChange={handleChange}
                placeholder="Enter Sub Section..."
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="seo_category"
                value={seoData.seo_category}
                onChange={handleChange}
                placeholder="Enter Category..."
              />
              {errors.seo_category && (
                <span className="error">{errors.seo_category}</span>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {editData ? "Update Job" : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
