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

            const res = await axios.post("/jobs/create-job", formData);

            alert("Job created successfully");

            navigate("/recruiter/dashboard");

        } catch (error) {
            console.error(error);
            alert("Error creating job");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">

            <h2 className="text-2xl font-bold mb-6">Post a Job</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="border p-2"
                />

                <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="border p-2 "
                >
                    <option className="text-black" value="full-time">Full Time</option>
                    <option className="text-black" value="part-time">Part Time</option>
                    <option className="text-black" value="internship">Internship</option>
                </select>

                <button
                    type="submit"
                    className="bg-purple-600 text-white p-2 rounded"
                >
                    Post Job
                </button>

            </form>

        </div>
    );
};

export default PostJob;