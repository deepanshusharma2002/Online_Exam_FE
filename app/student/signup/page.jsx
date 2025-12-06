"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";
import { fetcher } from "@/src/components/agentFetcher";
import Cookies from "js-cookie";

export default function StudentSignup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        age: "",
        gender: "",
    });

    useEffect(() => {
        const token = Cookies.get("job_portal_agent");
        const storedStudent = localStorage.getItem("job_portal_agent");

        if (token || storedStudent) {
            router.push("/student/dashboard");
            return;
        }

    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetcher("/student/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            router.push(`/student/verify-otp?email=${form.email}`);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Student Signup</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Full Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <input name="age" placeholder="Age" onChange={handleChange} />

                <select name="gender" onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>

                <button disabled={loading}>
                    {loading ? "Please wait..." : "Signup"}
                </button>
            </form>

            {/* ✅ Login link */}
            <p className="login-link">
                Already have an account?{" "}
                <span onClick={() => router.push("/student/login")}>
                    Login
                </span>
            </p>
        </div>
    );
}
