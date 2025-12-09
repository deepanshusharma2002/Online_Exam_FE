"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetcher } from "@/src/components/agentFetcher";
import "./dashboard.css";

export default function StudentDashboard() {
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [liveExam, setLiveExam] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [breakup, setBreakup] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const formatDateTime = (date) => {
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getLastDateTime = (end_date, end_time) => {
    const date = new Date(end_date);

    const [hours, minutes] = end_time.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  useEffect(() => {
    const token = Cookies.get("job_portal_agent");
    const stored = localStorage.getItem("job_portal_agent");

    if (!token || !stored) {
      router.push("/student/login");
      return;
    }

    setStudent(JSON.parse(stored));
    loadResult();
  }, []);

  const loadResult = async () => {
    const res = await fetcher("/student/exam/result");
    if (res.hasExam) {
      setExamResult(res.result);
    } else {
      if (res.hasLiveExam) {
        setLiveExam(res.result);
        setLastDate(formatDateTime(getLastDateTime(res.result?.end_date, res.result?.end_time)));
      }
    }
  };

  const loadBreakup = async () => {
    const res = await fetcher(`/student/exam/breakup/${examResult.exam_id}`);
    setBreakup(res.data);
    setShowPopup(true);
  };

  if (!student) return null;

  return (
    <div className="dashboard-container">
      {/* <header className="dashboard-header">
        <h2>Student Dashboard</h2>
        <button onClick={() => {
          Cookies.remove("job_portal_agent");
          localStorage.clear();
          router.push("/student/login");
        }}>
          Logout
        </button>
      </header> */}

      <div className="dashboard-content">
        <div className="profile-card">
          <h3>Welcome, {student.name}</h3>
          <p>{student.email}</p>
        </div>

        {liveExam && (
          <div className="result-card">
            <h3>Live Exam: {liveExam.exam_name}</h3>

            <div className="result-stats enhanced">
              <div className="stat-box score">
                <span>Duration (minutes)</span>
                <strong>{liveExam.exam_time_min}</strong>
              </div>

              <div className="stat-box total">
                <span>📝 Total Questions</span>
                <strong>{liveExam.total_q}</strong>
              </div>

              <div className={`stat-box fatal warn`}>
                <span>Last Date & Time:</span>
                <span><b>{lastDate}</b></span>
              </div>
            </div>


            <button className="secondary-btn" onClick={() => router.push(`/student/exam`)}>
              Click to Start Exam
            </button>
          </div>
        )}

        {examResult && (
          <div className="result-card">
            <h3>Latest Exam Result</h3>

            <div className="result-stats enhanced">
              <div className="stat-box score">
                <span>✅ Score</span>
                <strong>{Number(examResult.score) - Number(examResult.fatal)}</strong>
              </div>

              <div className="stat-box total">
                <span>📝 Total Questions</span>
                <strong>{examResult.total}</strong>
              </div>

              <div className={`stat-box fatal ${examResult.fatal > 0 ? "warn" : ""}`}>
                <span>⚠️ Tab Switch (Fatal)</span>
                <strong>{`${examResult.fatal === 0 ? "" : "-"}${examResult.fatal}`}</strong>
                <small>Negative Impact</small>
              </div>
            </div>

            <button className="secondary-btn" onClick={loadBreakup}>
              View Breakup
            </button>
          </div>
        )}
      </div>

      {/* ✅ BREAKUP POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h3>Exam Breakup</h3>
              <button onClick={() => setShowPopup(false)}>✕</button>
            </div>

            <div className="popup-content">
              {breakup.map((b, i) => (
                <div
                  key={b.id}
                  className={`breakup-q ${b.is_correct ? "right" : "wrong"
                    }`}
                >
                  <p><strong>Q{i + 1}.</strong> {b.question.question}</p>
                  <p>
                    <b>Your Answer:</b>{" "}
                    {b.selected ? b.question[b.selected] : "Not Attempted"}
                  </p>
                  {!b.is_correct && (
                    <p>
                      <b>Correct:</b>{" "}
                      {b.question[b.question.ans_option]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
