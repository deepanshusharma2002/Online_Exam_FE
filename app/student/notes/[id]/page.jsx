"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { fetcher } from "@/src/components/agentFetcher";
import "./NoteDetails.css";
import Loader from "@/src/components/Loader/Loader";
import Head from "next/head";

const NoteDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* ✅ Auth check */
    useEffect(() => {
        const token = Cookies.get("job_portal_agent");
        if (!token) {
            router.push("/student/login");
        }
    }, []);

    /* ✅ Fetch single note */
    useEffect(() => {
        if (!id) return;

        const fetchNote = async () => {
            try {
                setLoading(true);
                const res = await fetcher(`/naukari?naukari_id=${id}`);

                if (!res.success || !res.data?.length) {
                    throw new Error("Note not found");
                }

                setNote(res.data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) return
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
        }}
    >
        <Loader size={50} />
    </div>;
    if (error) return <p className="error-text">{error}</p>;
    if (!note) return null;

    return (
        <>
            <Head>
                <title>{note.title} | Online Exam Notes</title>

                <meta
                    name="description"
                    content={`Class ${note.class} ${note.subject} notes. Updated on ${new Date(
                        note.updatedAt
                    ).toLocaleDateString("en-IN")}.`}
                />

                <meta
                    name="keywords"
                    content={`Class ${note.class}, ${note.subject}, online exam notes, student notes`}
                />

                {/* Open Graph */}
                <meta property="og:title" content={note.title} />
                <meta
                    property="og:description"
                    content={`Class ${note.class} ${note.subject} notes`}
                />
                <meta property="og:type" content="article" />

                {/* SEO */}
                <meta name="robots" content="index, follow" />
            </Head>
            <div className="note-details-container">
                {/* <button className="back-btn" onClick={() => router.back()}>
                ← Back
            </button> */}

                <h1 className="note-details-title">{note.title}</h1>

                <div className="note-meta">
                    <span>Class {note.class}</span>
                    <span>{note.subject}</span>
                    <span>
                        Updated on{" "}
                        {new Date(note.updatedAt).toLocaleDateString("en-IN")}
                    </span>
                </div>

                {/* ✅ Full HTML Content */}
                <div
                    className="note-details-content"
                    dangerouslySetInnerHTML={{ __html: note.description }}
                />

                {/* ✅ Important Questions */}
                {note.importantQuesAns?.length > 0 && (
                    <div className="important-qa">
                        <h2>Important Questions & Answers</h2>

                        {note.importantQuesAns.map((item) => (
                            <div key={item.id} className="qa-item">
                                <p className="question">Q. {item.question}</p>
                                <p className="answer">Ans. {item.answer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default NoteDetailsPage;
