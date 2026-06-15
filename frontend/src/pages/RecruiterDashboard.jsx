import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const res = await axios.get("/jobs/my-jobs");
            setJobs(res.data.jobs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">
                My Company Jobs
            </h2>

            {jobs.length === 0 ? (
                <p className="text-gray-700">No jobs posted yet</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition flex flex-col md:flex-row md:justify-between items-start md:items-center"
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold text-purple-600">{job.title}</h3>
                                <p className="text-gray-700">{job.location}</p>
                                <p className="text-gray-500">{job.jobType}</p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/recruiter/job/${job._id}/applicants`);
                                }}
                                className="mt-4 md:mt-0 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                            >
                                View Applicants
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecruiterDashboard;