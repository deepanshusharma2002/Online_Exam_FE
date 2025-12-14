// "use client";
// import React, { useState, useEffect } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import "./CreateJob.css";
// import { fetcher } from "../fetcher";

// const CreateQuestions = ({ handleCloseForm, editData }) => {
//   const [formData, setFormData] = useState({
//     question: "",
//     option_a: "",
//     option_b: "",
//     option_c: "",
//     option_d: "",
//     ans_option: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const isEditMode = !!editData;

//   // ✅ Prefill data when editing
//   useEffect(() => {
//     if (isEditMode && editData) {
//       setFormData({
//         question: editData.question || "",
//         option_a: editData.option_a || "",
//         option_b: editData.option_b || "",
//         option_c: editData.option_c || "",
//         option_d: editData.option_d || "",
//         ans_option: editData.ans_option || "",
//       });
//     }
//   }, [editData]);

//   // ✅ Handle input & compress image if large
//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ Validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.question.trim())
//       newErrors.question = "Question is required";
//     if (!formData.option_a.trim()) newErrors.url = "Option A is required";
//     if (!formData.option_b.trim()) newErrors.type = "Option B is required";
//     if (!formData.option_c.trim()) newErrors.url = "Option C is required";
//     if (!formData.option_d.trim()) newErrors.type = "Option D is required";
//     if (!formData.ans_option.trim()) newErrors.url = "Answer Option is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ type: "", text: "" });

//     if (!validateForm()) return;

//     try {

//       const method = isEditMode ? "PUT" : "POST";
//       const endpoint = isEditMode
//         ? `/student/question-answer/${editData.student_ques_ans_id}`
//         : "/student/question-answer";

//       const result = await fetcher(endpoint, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (result.success) {
//         setMessage({
//           type: "success",
//           text: `Questions ${isEditMode ? "updated" : "created"} successfully!`,
//         });

//         setErrors({});
//         setTimeout(() => handleCloseForm(), 800);
//       } else {
//         setMessage({
//           type: "error",
//           text: result.message || "Operation failed",
//         });
//       }
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: error.message || "Something went wrong",
//       });
//     }
//   };

//   return (
//     <div className="create-job-container">
//       <div className="header-links">
//         <a className="back-link" onClick={handleCloseForm}>
//           <FaArrowLeft /> Back
//         </a>
//       </div>

//       <div className="form-card">
//         <h2>{isEditMode ? "Edit Home Links" : "Create Home Links"}</h2>

//         {message.text && (
//           <div className={`message ${message.type}`}>{message.text}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Question</label>
//             <input
//               type="text"
//               name="question"
//               value={formData.question}
//               onChange={handleChange}
//               placeholder="Enter Question..."
//             />
//             {errors.question && (
//               <span className="error">{errors.question}</span>
//             )}
//           </div>

//           <div className="form-group">
//             <label>Option A</label>
//             <input
//               type="text"
//               name="option_a"
//               value={formData.option_a}
//               onChange={handleChange}
//               placeholder="Enter Option A..."
//             />
//             {errors.option_a && <span className="error">{errors.option_a}</span>}
//           </div>

//           <div className="form-group">
//             <label>Option B</label>
//             <input
//               type="text"
//               name="option_b"
//               value={formData.option_b}
//               onChange={handleChange}
//               placeholder="Enter Option B..."
//             />
//             {errors.option_b && <span className="error">{errors.option_b}</span>}
//           </div>

//           <div className="form-group">
//             <label>Option C</label>
//             <input
//               type="text"
//               name="option_c"
//               value={formData.option_c}
//               onChange={handleChange}
//               placeholder="Enter Option C..."
//             />
//             {errors.option_c && <span className="error">{errors.option_c}</span>}
//           </div>

//           <div className="form-group">
//             <label>Option D</label>
//             <input
//               type="text"
//               name="option_d"
//               value={formData.option_d}
//               onChange={handleChange}
//               placeholder="Enter Option D..."
//             />
//             {errors.option_d && <span className="error">{errors.option_d}</span>}
//           </div>

//           <div className="form-group">
//             <label>Answer Option</label>
//             <select
//               name="ans_option"
//               value={formData.ans_option}
//               onChange={handleChange}
//             >
//               <option value="">Select Answer Option</option>
//               <option value="option_a">Option A</option>
//               <option value="option_b">Option B</option>
//               <option value="option_c">Option C</option>
//               <option value="option_d">Option D</option>
//             </select>
//             {errors.type && <span className="error">{errors.ans_option}</span>}
//           </div>


//           <button type="submit" className="submit-btn">
//             {isEditMode ? "Update Questions" : "Create Questions"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateQuestions;


"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateQuestions = ({ handleCloseForm, editData }) => {
  const isEditMode = !!editData;

  const [formData, setFormData] = useState({
    exam_schedule_id: "",
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    ans_option: "",
    status: 1, // 1 = Active, 2 = Inactive
  });

  const [examList, setExamList] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  /* ----------------------------------
     Fetch Exam Dropdown
  ---------------------------------- */
  const fetchExams = async () => {
    try {
      const res = await fetcher("/student/exam-schedule?type=dropdown&page=1&limit=100");
      if (res.success) setExamList(res.data);
    } catch (err) {
      console.error("Failed to load exams");
    }
  };

  /* ----------------------------------
     Prefill Edit Data
  ---------------------------------- */
  useEffect(() => {
    fetchExams();

    if (isEditMode && editData) {
      setFormData({
        exam_schedule_id: editData.exam_schedule_id || "",
        question: editData.question || "",
        option_a: editData.option_a || "",
        option_b: editData.option_b || "",
        option_c: editData.option_c || "",
        option_d: editData.option_d || "",
        ans_option: editData.ans_option || "",
        status: editData.status || 1,
      });
    }
  }, [editData]);

  /* ----------------------------------
     Handle Change
  ---------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ----------------------------------
     Validation
  ---------------------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.exam_schedule_id)
      newErrors.exam_schedule_id = "Exam is required";
    if (!formData.question.trim())
      newErrors.question = "Question is required";
    if (!formData.option_a.trim())
      newErrors.option_a = "Option A is required";
    if (!formData.option_b.trim())
      newErrors.option_b = "Option B is required";
    if (!formData.option_c.trim())
      newErrors.option_c = "Option C is required";
    if (!formData.option_d.trim())
      newErrors.option_d = "Option D is required";
    if (!formData.ans_option)
      newErrors.ans_option = "Answer option is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ----------------------------------
     Submit
  ---------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/student/question-answer/${editData.student_ques_ans_id}`
        : "/student/question-answer";

      const payload = {
        ...formData,
        exam_schedule_id: Number(formData.exam_schedule_id),
        status: Number(formData.status),
      };

      const result = await fetcher(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Question ${isEditMode ? "updated" : "created"} successfully`,
        });

        setTimeout(() => handleCloseForm(), 800);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="create-job-container">
      <div className="header-links">
        <a className="back-link" onClick={handleCloseForm}>
          <FaArrowLeft /> Back
        </a>
      </div>

      <div className="form-card">
        <h2>{isEditMode ? "Edit Question" : "Create Question"}</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Exam */}
          <div className="form-group">
            <label>Exam</label>
            <select
              name="exam_schedule_id"
              value={formData.exam_schedule_id}
              onChange={handleChange}
            >
              <option value="">Select Exam</option>
              {examList.map((exam) => (
                <option
                  key={exam.exam_schedule_id}
                  value={exam.exam_schedule_id}
                >
                  {`${exam.exam_name} / Class (${exam.class}) / Sub(${exam.subject})`}
                </option>
              ))}
            </select>
            {errors.exam_schedule_id && (
              <span className="error">{errors.exam_schedule_id}</span>
            )}
          </div>

          {/* Question */}
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
            {errors.question && (
              <span className="error">{errors.question}</span>
            )}
          </div>

          {/* Options */}
          {["a", "b", "c", "d"].map((opt) => (
            <div className="form-group" key={opt}>
              <label>Option {opt.toUpperCase()}</label>
              <input
                type="text"
                name={`option_${opt}`}
                value={formData[`option_${opt}`]}
                onChange={handleChange}
              />
              {errors[`option_${opt}`] && (
                <span className="error">{errors[`option_${opt}`]}</span>
              )}
            </div>
          ))}

          {/* Answer */}
          <div className="form-group">
            <label>Correct Answer</label>
            <select
              name="ans_option"
              value={formData.ans_option}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="option_a">Option A</option>
              <option value="option_b">Option B</option>
              <option value="option_c">Option C</option>
              <option value="option_d">Option D</option>
            </select>
            {errors.ans_option && (
              <span className="error">{errors.ans_option}</span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={2}>Inactive</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Question" : "Create Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestions;
