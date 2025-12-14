"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "./Notes.css";
import { fetcher } from "@/src/components/agentFetcher";
import Link from "next/link";

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

const NotesStudentPage = () => {
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [notes, setNotes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const token = Cookies.get("job_portal_agent");
    const stored = localStorage.getItem("job_portal_agent");

    if (!token || !stored || !JSON.parse(stored).class) {
      router.push("/student/login");
      return;
    }

    setStudent(JSON.parse(stored));
  }, []);

  /* ✅ Load default subject */
  useEffect(() => {
    if (!student?.class) return;

    const subjectList = subjectsByClass[student.class];
    if (!subjectList?.length) return;

    const defaultSubject = subjectList[0];
    setSelectedSubject(defaultSubject);
    setPage(1);
  }, [student?.class]);

  /* ✅ Fetch notes (pagination aware) */
  const fetchNotes = async (subject, currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetcher(
        `/naukari?class=${student.class}&subject=${subject}&page=${currentPage}&limit=${limit}`
      );

      setNotes(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Refetch on page / subject change */
  useEffect(() => {
    if (!student?.class || !selectedSubject) return;
    fetchNotes(selectedSubject, page);
  }, [page, selectedSubject]);

  /* ✅ Subject change */
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setPage(1);
  };

  return (
    <div className="notes-container">
      <h1 className="notes-title">📘 Class {student?.class} Notes</h1>

      {/* Subjects */}
      <div className="subject-tabs">
        {subjectsByClass[student?.class]?.map((subject) => (
          <button
            key={subject}
            className={`subject-btn ${selectedSubject === subject ? "active" : ""
              }`}
            onClick={() => handleSubjectChange(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="loading-text">Loading notes...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : notes.length === 0 ? (
        <p className="no-notes">No notes available for this subject.</p>
      ) : (
        <>
          <div className="notes-grid">
            {/* {notes.map((note) => (
              <div key={note.naukari_id} className="note-card" onClick={() => router.push(`/student/notes/${note.naukari_id}`)}>
                <h3 className="note-title">{note.title}</h3>

                <div
                  className="note-desc"
                  dangerouslySetInnerHTML={{
                    __html: note.description,
                  }}
                />

                <p className="note-date">
                  Updated on{" "}
                  {new Date(note.updatedAt).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))} */}
            {notes.map((note) => (
              <Link
                key={note.naukari_id}
                href={`/student/notes/${note.naukari_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="note-link"
              >
                <div className="note-card">
                  <h3 className="note-title">{note.title}</h3>

                  <div
                    className="note-desc"
                    dangerouslySetInnerHTML={{
                      __html: note.description,
                    }}
                  />

                  <p className="note-date">
                    Updated on{" "}
                    {new Date(note.updatedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* ✅ Pagination */}
          {pagination && pagination.totalPages > 1 && (
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

export default NotesStudentPage;
