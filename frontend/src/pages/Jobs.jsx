import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";

function Jobs() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);

                const res = await API.get("/jobs/all", {
                    params: { search, location, jobType },
                });

                setJobs(res.data.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [search, location, jobType]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-gray-100">

            {/* 🔥 HERO */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
                <h1 className="text-5xl font-bold text-gray-800">
                    Find Your <span className="text-purple-600">Dream Job</span>
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    Discover opportunities that match your skills
                </p>
            </div>

            {/* 🔍 FILTER BAR */}
            <div className="max-w-7xl mx-auto px-6 mb-10">
                <div className="backdrop-blur-md bg-white/70 border border-gray-200 shadow-lg rounded-2xl p-5">

                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="🔍 Search jobs (React, Backend...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        {/* Location */}
                        <input
                            type="text"
                            placeholder="📍 Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        {/* Job Type */}
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option value="">All Types</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 💼 JOBS SECTION */}
            <div className="max-w-7xl mx-auto px-6 pb-12">

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500 text-lg">
                        Loading jobs...
                    </p>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-semibold text-gray-700">
                            No jobs found
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Try adjusting your filters
                        </p>
                    </div>
                )}

                {/* ✅ CLEAN GRID (NO WRAPPER → no hover conflicts) */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Jobs;