"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/components/agentFetcher";
import { useRouter } from "next/navigation";
import "./exam.css";
import Loader from "@/src/components/Loader/Loader";

export default function StudentExam() {
  const router = useRouter();

  const [examTime, setExamTime] = useState(3600);
  const [fatal, setFatal] = useState(0);

  const [examStarted, setExamStarted] = useState(false);
  const [examId, setExamId] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState({});
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ score: 0, total: 0 });

  useEffect(() => {
    startExam();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("⚠️ User switched tab during exam");
        setFatal((p) => p + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!examStarted) return;
    if (examTime <= 0) submitExam();

    const t = setInterval(() => setExamTime((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [examStarted, examTime]);

  const startExam = async () => {
    try {
      const res = await fetcher("/student/exam/questions", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ total_q: 50 }),
      });

      if (!res.success && res.code === "EXAM_ALREADY_COMPLETED") {
        router.push("/student/dashboard");
        return;
      }

      setQuestions(res.data);
      setExamId(res.exam_id);
      setExamTime(res.duration);
      setExamStarted(true);

    } catch (err) {
      router.push("/student/dashboard");
    }
  };

  const selectAnswer = (qid, opt) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  const submitExam = async () => {
    setShowConfirmSubmit(false);
    setSubmitted(true);

    const formatted = Object.keys(answers).map((qid) => ({
      question_id: Number(qid),
      selected: answers[qid],
    }));

    try {
      const res = await fetcher("/student/exam/submit", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          exam_id: examId,
          answers: formatted,
          fatal
        }),
      });

      setResult({
        score: res.score,
        total: res.total,
      });

      setShowResult(true);

      setTimeout(() => {
        router.push("/student/dashboard");
      }, 3000);
    } catch (err) {
      alert("Submission failed");
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!examStarted) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  const q = questions[currentIndex];
  const selected = answers[q.student_ques_ans_id];

  return (
    <div className="exam-layout">
      {/* HEADER */}
      <header className="exam-header">
        <div className="left-info">
          <span className="timer">⏱ {formatTime(examTime)}</span>

          <span className={`fatal-badge ${fatal > 0 ? "warn" : ""}`}>
            ⚠ Tab Switch: {fatal}
          </span>
        </div>

        <button onClick={() => setShowConfirmSubmit(true)} className="submit-btn">
          Submit Exam
        </button>
      </header>
      {/* <header className="exam-header">
        <div>⏱ {formatTime(examTime)}</div>
        <button onClick={() => setShowConfirmSubmit(true)} className="submit-btn">
          Submit Exam
        </button>
      </header> */}

      {/* QUESTION */}
      <div className="question-card">
        <h3>
          Question {currentIndex + 1} of {questions.length}
        </h3>

        <p className="question-text">{q.question}</p>

        <div className="options">
          {["option_a", "option_b", "option_c", "option_d"].map((opt) => (
            <label
              key={opt}
              className={`option ${selected === opt ? "selected" : ""}`}
            >
              <input
                type="radio"
                disabled={submitted}
                checked={selected === opt}
                onChange={() => selectAnswer(q.student_ques_ans_id, opt)}
              />
              {q[opt]}
            </label>
          ))}
        </div>

        <div className="actions">
          {!selected && (
            <button className="skip-btn" onClick={nextQuestion}>
              Skip
            </button>
          )}
          {selected && (
            <button className="next-btn" onClick={nextQuestion}>
              Save & Next
            </button>
          )}
        </div>
      </div>

      {/* <div className="question-panel">
        {questions.map((item, i) => (
          <span
            key={item.student_ques_ans_id}
            className={`q-dot ${answers[item.student_ques_ans_id] ? "attempted" : ""
              }`}
          >
            {i + 1}
          </span>
        ))}
      </div> */}
      <div className="question-panel">
        {questions.map((item, i) => {
          const isAttempted = answers[item.student_ques_ans_id];
          const isActive = i === currentIndex;

          return (
            <span
              key={item.student_ques_ans_id}
              className={`q-dot 
          ${isAttempted ? "attempted" : ""}
          ${isActive ? "active" : ""}
        `}
              onClick={() => setCurrentIndex(i)}
            >
              {i + 1}
            </span>
          );
        })}
      </div>


      {showConfirmSubmit && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Submission</h3>
            <p>Once submitted, you cannot change answers.</p>
            <div className="confirm-actions">
              <button onClick={() => setShowConfirmSubmit(false)}>
                Cancel
              </button>
              <button className="danger" onClick={submitExam}>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {showResult && (
        <div className="result-overlay">
          <div className="result-box">
            <h2>Exam Submitted</h2>

            <div className="result-stats">
              <div>
                <span>✅ Correct</span>
                <strong>{result.score}</strong>
              </div>
              <div>
                <span>📝 Attempted</span>
                <strong>{result.total}</strong>
              </div>
            </div>

            <p className="redirect-text">
              Redirecting to results...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
