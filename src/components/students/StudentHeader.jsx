"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import "./StudentLayout.css";

const StudentHeader = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        Cookies.remove("job_portal_agent");
        localStorage.clear();
        router.push("/student/login");
    };

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
