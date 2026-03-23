import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

const Applicants = () => {
    const { id } = useParams(); // jobId
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState(null);

    const fetchApplicants = async () => {
        try {
            const res = await axios.get(`/applications/job/${id}`);
            setApplications(res.data.applications);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchJob = async () => {
        try {
            const res = await axios.get(`/jobs/${id}`);
            setJob(res.data.job);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    }

    useEffect(() => {
        fetchJob();
        fetchApplicants();
    }, []);

    // update status (accept / reject)
    const updateStatus = async (applicationId, newStatus) => {
        try {
            await axios.put(`/applications/${applicationId}/status`, {
                status: newStatus,
            });

            // refresh list after update
            fetchApplicants();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Applicants</h2>

            <h1 className="text-xl font-bold text-black-600 mb-6" >Applicants {job && `for ${job.title}`}</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-700">No applicants yet</p>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="border border-gray-300 p-6 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <p><span className="font-semibold">Name:</span> {app.applicant.name}</p>
                            <p><span className="font-semibold">Email:</span> {app.applicant.email}</p>
                            {/* Resume Section */}
                            <div className="mt-3">
                                <span className="font-semibold">Resume:</span>{" "}

                                {app.resume ? (
                                    <div className="flex gap-2 mt-1">

                                        <a
                                            href={`http://localhost:5000/${app.resume}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                                        >
                                            View
                                        </a>

                                        <a
                                            href={`http://localhost:5000/${app.resume}`}
                                            download
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                                        >
                                            Download
                                        </a>

                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No resume uploaded</p>
                                )}
                            </div>
                            <p className="mt-2">
                                <span className="font-semibold">Status:</span>{" "}
                                <span
                                    className={
                                        app.status === "accepted"
                                            ? "text-green-600 font-semibold"
                                            : app.status === "rejected"
                                                ? "text-red-600 font-semibold"
                                                : "text-yellow-600 font-semibold"
                                    }
                                >
                                    {app.status}
                                </span>
                            </p>

                            {/* show buttons only if pending */}
                            {app.status === "pending" && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => updateStatus(app._id, "accepted")}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => updateStatus(app._id, "rejected")}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applicants;