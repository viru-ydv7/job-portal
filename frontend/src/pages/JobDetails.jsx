import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [applying, setApplying] = useState(false);
    const [resume, setResume] = useState(null);

    // NEW STATES
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    // APPLY FUNCTION (unchanged)
    const handleApply = async () => {
        try {
            if (!resume) {
                alert("Please upload your resume (PDF)");
                return;
            }

            setApplying(true);

            const formData = new FormData();
            formData.append("resume", resume);

            const response = await API.post(
                `/applications/apply/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert(response.data.message);

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Application failed");
        } finally {
            setApplying(false);
        }
    };

    // NEW: ANALYZE FUNCTION
    const handleAnalyze = async () => {
        try {
            if (!resume) {
                alert("Please upload resume first");
                return;
            }

            setAnalyzing(true);

            const formData = new FormData();
            formData.append("resume", resume);

            const response = await API.post(
                `/test/resume/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            console.log(response.data);
            setAnalysis(response.data);

        } catch (error) {
            console.error(error);
            alert("Analysis failed");
        } finally {
            setAnalyzing(false);
        }
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await API.get(`/jobs/${id}`);
                setJob(response.data.job);
            } catch (error) {
                console.error("Failed to fetch job", error);
            }
        };
        fetchJob();
    }, [id]);

    if (!job) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-4">

                <h2 className="text-3xl font-bold text-purple-600">{job.title}</h2>
                <p><strong className="text-gray-700">Location:</strong> {job.location}</p>
                <p><strong className="text-gray-700">Description:</strong> {job.description}</p>
                <p><strong className="text-gray-700">Job Type:</strong> {job.jobType}</p>
                <p><strong className="text-gray-700">Salary:</strong> {job.salary}</p>

                {/* Resume Upload */}
                <label className="mt-4 w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-purple-500 transition">
                    <span className="text-gray-600 text-sm">
                        {resume ? resume.name : "Click to upload your resume (PDF)"}
                    </span>

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                            setResume(e.target.files[0]);
                            setAnalysis(null); // reset analysis on new upload
                        }}
                        className="hidden"
                    />
                </label>

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className={`mt-3 w-full py-2 rounded-lg text-white font-medium transition ${
                        analyzing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                </button>

                {/* Apply Button */}
                <button
                    onClick={handleApply}
                    disabled={applying}
                    className={`mt-2 w-full py-2 rounded-lg text-white font-medium transition ${
                        applying ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                    {applying ? "Applying..." : "Apply Now"}
                </button>

                {/* Analysis Result */}
                {analysis && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <h3 className="text-xl font-semibold text-purple-600">
                            Match: {analysis.matchPercentage}%
                        </h3>

                        <div className="mt-3">
                            <p className="font-medium text-green-600">Matched Skills:</p>
                            <ul className="list-disc ml-5">
                                {analysis.matched.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-3">
                            <p className="font-medium text-red-600">Missing Skills:</p>
                            <ul className="list-disc ml-5">
                                {analysis.missing.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default JobDetails;