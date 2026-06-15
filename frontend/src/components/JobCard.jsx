import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/jobs/${job._id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="
                cursor-pointer
                rounded-2xl 
                bg-gradient-to-br from-white to-purple-50
                border border-purple-100 
                p-5

                transform transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500
            "
        >
            {/* 🔹 TITLE */}
            <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
            </h3>

            {/* 🔹 COMPANY */}
            <p className="text-purple-600 text-sm mt-1 font-medium">
                {job.company?.name || "Company"}
            </p>

            {/* 🔹 INFO */}
            <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p>📍 {job.location}</p>
                {job.salary && <p>💰 ₹{job.salary}</p>}
            </div>

            {/* 🔹 FOOTER */}
            <div className="mt-6 pt-3 border-t border-purple-100 flex justify-between items-center">
                <span className="text-xs text-purple-500 font-medium">
                    {job.jobType || "Full Time"}
                </span>
            </div>
        </div>
    );
}

export default JobCard;