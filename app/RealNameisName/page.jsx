'use client'
import React, { useEffect, useState } from "react";
import { use } from "react"
import JobDetailsPage from "@/src/components/JobDetailsPage";
import { getExamDetails } from "@/src/lib/getExamDetails";

const JobDetails = ({ params }) => {
    const { name } = use(params);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getExamDetails(name, setLoading);
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <>
            <JobDetailsPage data={data} loading={loading} />
        </>
    );
};

export default JobDetails;
