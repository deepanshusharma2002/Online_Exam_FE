import axios from "axios";

// src/lib/getExamDetails.js
export async function getExamDetails(name, setLoading) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/exam-details?filters[url][$eq]=${name}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_CODE}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch exam details");
    }

    const json = await res.data;
    return json?.data[0] || null;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  } finally {
    setLoading(false);
  }
}
