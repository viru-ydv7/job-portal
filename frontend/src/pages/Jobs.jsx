import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";

function Jobs() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get("/jobs/all", {
                    params: {
                        search,
                        location,
                        jobType,
                    },
                });

                setJobs(res.data.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, [search, location, jobType]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Available Jobs</h2>
            <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-4">

                <div className="flex flex-row w-full justify-between items-center">
                    <h3 className="text-xl font-semibold text-black-600">Job Filter</h3>
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/3"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/4"
                    />

                    <select
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="border p-2 rounded-lg w-full md:w-1/4"
                    >
                        <option value="">All Types</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

            </div>
            {jobs.length === 0 ? (
                <p className="text-gray-700">No jobs found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Jobs;