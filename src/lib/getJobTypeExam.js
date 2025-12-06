import axios from "axios";

// src/lib/getExamDetails.js
export async function getJobTypeExam(type) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/exam-details?filters[job_type][$contains]=${type}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_CODE}`,
        },
      }
    );

    const json = await res.data;
    return json?.data || null;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}
