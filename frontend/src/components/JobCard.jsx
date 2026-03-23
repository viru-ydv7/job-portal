import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/jobs/${job._id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="border border-gray-300 p-6 mb-4 rounded-lg cursor-pointer hover:shadow-lg hover:border-purple-600 transition min-h-[150px] flex flex-col justify-between"
        >
            <h3 className="text-xl font-semibold text-purple-600">{job.title}</h3>
            <p className="text-gray-700 text-base mt-2">{job.company}</p>
            <p className="text-gray-500 mt-1">{job.location}</p>
        </div>
    );
}

export default JobCard;