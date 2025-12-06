"use client";

import React, { useEffect, useState } from "react";
import "./DraggableTable.css";
import PostPriorityLists from "./PostPriorityLists";
import Loader from "../Loader/Loader";
import { fetcher } from "../fetcher";

const DraggableTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isJobSelect, setIsJobSelect] = useState(false);

    // Fetch posts
    const fetchPosts = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetcher(`/naukari?page=1&limit=10&type=priority`);
            if (!data.success) throw new Error(data.message || "Failed to fetch posts");

            setData(data.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong while fetching posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const newData = [...data];
        const [movedRow] = newData.splice(draggedIndex, 1);
        newData.splice(index, 0, movedRow);

        setData(newData);
        setDraggedIndex(null);

        console.log("Updated Order:", newData);
    };

    const handleOpen = () => {
        setIsJobSelect(true);
    };

    const handleAdd = (rowData) => {
        setData([...data, rowData]);
        setIsJobSelect(false);
    };

    const handleSave = async () => {
        try {
            let result = await fetcher("/naukari/priority", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({items: data}),
                credentials: "include",
            });

            if (result.success) {
                fetchPosts();
                alert("Priority saved successfully!");
            }
        } catch (error) {
            console.error("Save Error:", error);
        }
    };

    return (
        <div className="table-container">
            <h2 className="heading">Set Jobs Priority</h2>

            <div className="button-group">
                {data?.length < 10 && (
                    <button className="btn add-btn" onClick={handleOpen}>
                        ➕ Add
                    </button>
                )}
                <button className="btn save-btn" onClick={handleSave}>
                    💾 Save
                </button>
            </div>

            {loading ? (
                <div className="loader-wrap">
                    <Loader size={50} color="lightgray" />
                </div>
            ) : error ? (
                <div className="error-box">{error}</div>
            ) : data?.length > 0 ? (
                <table className="drag-table">
                    <thead>
                        <tr>
                            <th>Priority</th>
                            <th>Naukari Id</th>
                            <th>Title</th>
                            <th>SEO Title</th>
                            <th>Keywords</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((job, index) => (
                            <tr
                                key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(index)}
                                className={draggedIndex === index ? "dragging" : ""}
                            >
                                <td>{index + 1}</td>
                                <td>{job.naukari_id}</td>
                                <td className="truncate-title">{job.title}</td>
                                <td className="truncate-title">{job.seo_title || "—"}</td>
                                <td className="truncate-title">{job.seo_keywords || "—"}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            setData(data.filter((_, i) => i !== index))
                                        }
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No posts found.</p>
            )}

            {isJobSelect && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <button className="close-btn" onClick={() => setIsJobSelect(false)}>
                            ✖
                        </button>
                        <PostPriorityLists handleAdd={handleAdd} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DraggableTable;
