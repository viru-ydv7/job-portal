import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "full-time",
        skills: ""
    });

    const [loading, setLoading] = useState(true);


    // Fetch existing job
    useEffect(() => {

        const fetchJob = async () => {

            try {

                const response = await API.get(`/jobs/${id}`);

                const job = response.data.job;

                setForm({
                    title: job.title,
                    description: job.description,
                    location: job.location,
                    salary: job.salary,
                    jobType: job.jobType,
                    skills: job.skills.join(", ")
                });

            } catch (error) {

                console.error(error);
                alert("Failed to load job");

            } finally {

                setLoading(false);

            }

        };

        fetchJob();

    }, [id]);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = {
                ...form,
                skills: form.skills
                    .split(",")
                    .map(skill => skill.trim())
            };


            const response = await API.put(
                `/jobs/${id}`,
                data
            );


            alert(response.data.message);

            navigate("/recruiter/dashboard");


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update job"
            );

        }

    };


    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-4"
            >

                <h2 className="text-3xl font-bold text-purple-600 text-center">
                    Edit Job
                </h2>


                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full border p-3 rounded-lg"
                />


                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-3 rounded-lg"
                    rows="5"
                />


                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full border p-3 rounded-lg"
                />


                <input
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="w-full border p-3 rounded-lg"
                />


                <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="full-time">
                        Full Time
                    </option>

                    <option value="part-time">
                        Part Time
                    </option>

                    <option value="internship">
                        Internship
                    </option>

                </select>


                <input
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full border p-3 rounded-lg"
                />


                <button
                    className="
                        w-full 
                        bg-purple-600 
                        text-white 
                        py-3 
                        rounded-lg 
                        hover:bg-purple-700
                    "
                >
                    Update Job
                </button>


            </form>

        </div>

    );
}

export default EditJob;