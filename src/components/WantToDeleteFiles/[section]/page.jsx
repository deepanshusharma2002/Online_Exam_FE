"use client";

import { fetcher } from "@/src/components/fetcher";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import '../../latest-jobs/latest-job.scss';
import '../../latest-jobs/ViewJobs.css';
import { useRouter } from "next/navigation";
import Loader from "@/src/components/Loader/Loader";

const SectionDynamicPage = () => {
    const params = useParams();

    const { category, section } = params;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const limit = 10;

    const fetchJobs = async (pageNum = 1) => {
        try {
            setLoading(true);
            const res = await fetcher(`/naukari?page=${pageNum}&limit=${limit}&category=${category}&section=${section}`);
            setJobs(res?.data || []);
            setTotalPages(res?.pagination?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(page);
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    if (loading) return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}><Loader size={50} /></div>

    return (
        <div className="admin-card-container">
            <h1 className="heading">Section Jobs</h1>
            <p className='text'>Welcome to <strong>Sarkari Result.</strong> Stay informed about the
                Admit Card of various competitive exams conducted by government bodies across India, whether
                you are waiting for the Admit Card of any recruitment exam, entrance exam or any other
                government exam then we update the Admit Card from time to time to keep
                you informed. <a href="">Let’s update.</a></p>
            <p className="text"><strong>Sarkari Result</strong> में आपका स्वागत है। भारत भर में सरकारी निकायों द्वारा आयोजित विभिन्न प्रतियोगी परीक्षाओं के एडमिट कार्ड के बारे में सूचित रहें, चाहे आप किसी भी भर्ती परीक्षा, प्रवेश परीक्षा या किसी अन्य सरकारी परीक्षा के एडमिट कार्ड का इंतजार कर रहे हों तो हम आपको सूचित रखने के लिए समय-समय पर एडमिट कार्ड अपडेट करते हैं।</p>
            <h2>All Latest <span className="highlight">Jobs</span></h2>

            <div className="jobs-list">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div
                            key={job.naukari_id}
                            className="job-title"
                            onClick={() => router.push(`/${job.seo_section}/${job.slug}`)}
                        >
                            {job.title}
                        </div>
                    ))
                ) : (
                    <p className="no-jobs">No jobs available.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={handlePrev} disabled={page === 1}>
                        Prev
                    </button>
                    <span className="page-info">
                        Page {page} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionDynamicPage;
