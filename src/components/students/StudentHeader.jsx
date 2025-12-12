"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import "./StudentLayout.css";
import { fetcher } from "../agentFetcher";

const StudentHeader = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [student, setStudent] = useState(null);

    const handleLogout = () => {
        Cookies.remove("job_portal_agent");
        localStorage.clear();
        router.push("/student/login");
    };

    const validateStudent = async () => {
        if (student?.name) {
            const url = student?.class ? `/student/validate?class=${student.class}` : '/student/validate';
            try {
                const data = await fetcher(url);
                if (!data.success) {
                    Cookies.remove("job_portal_agent");
                    localStorage.clear();
                    router.push("/student/login");
                }
            } catch (err) {
                console.error("Header fetchUser error:", err);
                Cookies.remove("job_portal_agent");
                localStorage.clear();
                router.push("/student/login");
            }
        }
    };

    useEffect(() => {
        const token = Cookies.get("job_portal_agent");
        const stored = localStorage.getItem("job_portal_agent");

        if (!token || !stored) {
            Cookies.remove("job_portal_agent");
            localStorage.clear();
            router.push("/student/login");
            return;
        }
        setStudent(JSON.parse(stored));
    }, []);

    useEffect(() => {
        validateStudent();
    }, [student]);

    const navLinks = [
        { name: "Notes", path: "/student/notes" },
        { name: "Exams", path: "/student/exams" },
        { name: "Results", path: "/student/exam-results" },
    ];

    return (
        <header className="student-header">
            <div className="header-left" onClick={() => router.push("/student/notes")}>
                🎓 Student Portal
            </div>

            <nav className="header-nav">
                {navLinks.map((link) => (
                    <button
                        key={link.path}
                        className={`nav-link ${pathname.startsWith(link.path) ? "active" : ""
                            }`}
                        onClick={() => router.push(link.path)}
                    >
                        {link.name}
                    </button>
                ))}
            </nav>

            <div className="header-right">
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default StudentHeader;
