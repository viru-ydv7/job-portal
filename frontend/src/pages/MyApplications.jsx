import { useEffect, useState } from "react";
import axios from "../api/axios";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    const getStatusColor = (status) => {
        switch (status) {
            case "accepted":
                return "bg-green-100 text-green-700";
            case "rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const fetchApplications = async () => {
        const res = await axios.get("/applications/me");
        setApplications(res.data.applications);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-100">

            <h1 className="text-3xl font-bold text-purple-600 mb-6">
                My Applications
            </h1>

            {applications.length === 0 ? (
                <p className="text-gray-500">
                    You haven't applied to any jobs yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-purple-600">
                                        {app.job.title}
                                    </h2>
                                    <p className="text-gray-700">{app.job.company}</p>
                                    <p className="text-sm text-gray-500">{app.job.location}</p>
                                </div>

                                <span
                                    className={`mt-3 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}
                                >
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default MyApplications;