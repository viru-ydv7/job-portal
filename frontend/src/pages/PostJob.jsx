import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "full-time",
        skills: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const skillsArray = formData.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(skill => skill !== "");

            const dataToSend = {
                ...formData,
                skills: skillsArray
            };

            await axios.post("/jobs/create-job", dataToSend);

            alert("Job created successfully");
            navigate("/recruiter/dashboard");

        } catch (error) {
            console.error(error);
            alert("Error creating job");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-gray-100 py-10 px-4">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-purple-100 p-8">

                {/* 🔥 HEADER */}
                <div className="mb-6">
                    <h2 className="text-3xl mb-5 font-bold text-purple-600">
                        Post a New Job
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Fill in the details to attract the right candidates
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* TITLE */}
                    <div>
                        <label className="text-sm text-gray-600">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Frontend Developer"
                            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the role, responsibilities, etc."
                            rows="4"
                            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>

                    {/* GRID SECTION */}
                    <div className="grid md:grid-cols-2 gap-4">

                        <div>
                            <label className="text-sm text-gray-600">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Remote / Ahmedabad"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. 50000"
                                className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>

                    </div>

                    {/* JOB TYPE */}
                    <div>
                        <label className="text-sm text-gray-600">Job Type</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    {/* SKILLS */}
                    <div>
                        <label className="text-sm text-gray-600">Skills</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="React, Node.js, MongoDB"
                            className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Separate skills with commas
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="
                            mt-4 
                            bg-purple-600 
                            text-white 
                            py-3 
                            rounded-xl 
                            font-medium
                            hover:bg-purple-700 
                            transition
                        "
                    >
                        Post Job 🚀
                    </button>

                </form>
            </div>
        </div>
    );
};

export default PostJob;