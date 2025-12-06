import axios from "axios";

export async function getJobList() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/exam-details`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_CODE}`,
      },
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch job list");
    }

    const json = await res.data;
    const data = json?.data || [];

    // ✅ Type mapping
    const typeMapping = {
      latest_job: "Jobs",
      admit_card: "Admit Card",
      result: "Results",
      others: "Others",
    };

    // Group by type
    const grouped = data.reduce((acc, item) => {
      let types = item?.type || [];
      if (!Array.isArray(types)) types = [types];

      types.forEach((t) => {
        const mappedType = typeMapping[t] || "Others";
        if (!acc[mappedType]) acc[mappedType] = [];

        acc[mappedType].push({
          jobTitle: item?.name_of_post,
          url: `/${item?.url}`,
        });
      });

      return acc;
    }, {});

    // Convert to array
    return Object.keys(grouped).map((key) => ({
      jobType: key,
      jobList: grouped[key],
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}
