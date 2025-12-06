"use client";
import { useEffect, useState } from "react";
import "./contact.css";
import { fetcher } from "@/src/components/fetcher";

export default function ViewContacts() {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const limit = 10;

    const getContacts = async () => {
        setLoading(true);
        try {
            const res = await fetcher(`/contact?page=${page}&limit=${limit}`);
            if (res.success) {
                setContacts(res.data);
                setTotalPages(res.totalPages);
            }
        } catch (err) {
            console.error("Error fetching contacts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, [page]);

    const handleDelete = async () => {
        try {
            const res = await fetcher(`/contact/${deleteId}`, {
                method: "DELETE",
            });
            if (res.success) {
                alert("Contact deleted successfully!");
                setDeleteId(null);
                getContacts();
            } else {
                alert("Failed to delete contact.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error while deleting contact.");
        }
    };

    return (
        <div className="contacts-container">
            <h1>Contact Submissions</h1>

            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <>
                    {contacts.length === 0 ? (
                        <p className="no-data">No contacts found.</p>
                    ) : (
                        <table className="contacts-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((c) => (
                                    <tr key={c.contact_us_id}>
                                        <td>{c.contact_us_id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{c.subject}</td>
                                        <td>{c.message}</td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => setDeleteId(c.contact_us_id)}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* ✅ Pagination */}
                    {contacts.length > 0 && <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>}
                </>
            )}

            {/* ✅ Delete Confirmation Modal */}
            {deleteId && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this contact?</p>
                        <div className="confirm-actions">
                            <button className="confirm-btn yes" onClick={handleDelete}>
                                Yes, Delete
                            </button>
                            <button
                                className="confirm-btn no"
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
