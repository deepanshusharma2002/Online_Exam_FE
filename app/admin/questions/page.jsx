"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "../dashboard/dashboard.css";
import Link from "next/link";
import CreateQuestions from "@/src/components/Jobs/CreateQuestions";
import QuestionsLists from "@/src/components/Jobs/QuestionsLists";

export default function QuestionsDashboard() {
    const [adminName, setAdminName] = useState("Admin");
    const [isViewForm, setIsViewForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("job_portal");
        if (!token) {
            router.push("/admin/login");
            return;
        }

        // Get user info from localStorage
        const storedUser = localStorage.getItem("job_portal");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setAdminName(user?.name || "Admin");
        } else {
            setAdminName("Admin");
        }
    }, [router]);

    const handleLogout = () => {
        Cookies.remove("job_portal");
        localStorage.removeItem("job_portal");
        router.push("/admin/login");
    };

    const handleCloseForm = () => {
        setIsViewForm(false);
        setEditData(null);
    };

    const handleOpenForm = () => {
        setIsViewForm(true);
    };

    const handleEditData = async (data) => {
        setEditData(data);
        setIsViewForm(true);
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Question and Answers for Student</h1>
                <div className="admin-info">
                    <Link href="/admin/dashboard">Click for Dashboard</Link>
                    <span>Welcome, <b>{adminName}</b></span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>

            {isViewForm ? <CreateQuestions editData={editData} handleCloseForm={handleCloseForm} /> : <QuestionsLists handleEditData={handleEditData} handleOpenForm={handleOpenForm} />}

            <footer className="dashboard-footer">
                © {new Date().getFullYear()} Government Job Portal | All Rights Reserved
            </footer>
        </div>
    );
}
