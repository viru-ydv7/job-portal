
// import React, { useEffect, useState , useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// const JobDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//     const isCandidate = user?.role === "candidate";
//     const isRecruiter =
//     user?.role === "recruiter" ||
//     user?.role === "admin";

//     //deleteing
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     // Job State
//     const [job, setJob] = useState(null);

//     // Resume State
//     const [resume, setResume] = useState(null);

//     // Apply State
//     const [applying, setApplying] = useState(false);

//     // Resume Analysis State
//     const [analysis, setAnalysis] = useState(null);
//     const [analyzing, setAnalyzing] = useState(false);

//     // Interview Questions State
//     const [questions, setQuestions] = useState(null);
//     const [loadingQuestions, setLoadingQuestions] = useState(false);

//     // DELETE Job (Recruiter/Admin Only)
//     const handleDeleteJob = async () => {
//             try {

//             const response = await API.delete(
//                 `/jobs/${id}`
//             );

//             alert(response.data.message);
//             setShowDeleteModal(false);
//             navigate("/jobs");

//         } catch (error) {

//             console.error(error);

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to delete job"
//             );
//         }
//     };


//     // Generate Interview Questions
//     const handleGenerateQuestions = async () => {
//         try {

//             setLoadingQuestions(true);
//             setQuestions(null);

//             const response = await API.get(
//                 `/ai/interview-questions/${id}`
//             );

//             console.log(response.data);

//             setQuestions(response.data.questions);

//         } catch (error) {

//             console.error(error);
//             alert("Failed to generate questions");

//         } finally {

//             setLoadingQuestions(false);
//         }
//     };


//     // Apply Job
//     const handleApply = async () => {
//         try {

//             if (!resume) {
//                 alert("Please upload your resume (PDF)");
//                 return;
//             }

//             setApplying(true);

//             const formData = new FormData();
//             formData.append("resume", resume);

//             const response = await API.post(
//                 `/applications/apply/${id}`,
//                 formData
//             );

//             alert(response.data.message);

//         } catch (error) {

//             console.error(error);

//             alert(
//                 error.response?.data?.message ||
//                 "Application failed"
//             );

//         } finally {

//             setApplying(false);
//         }
//     };


//     // Analyze Resume
//     const handleAnalyze = async () => {
//         try {

//             if (!resume) {
//                 alert("Please upload resume first");
//                 return;
//             }

//             setAnalyzing(true);

//             const formData = new FormData();
//             formData.append("resume", resume);

//             const response = await API.post(
//                 `/resume/${id}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type":
//                             "multipart/form-data",
//                     },
//                 }
//             );

//             console.log(response.data);

//             setAnalysis(response.data);

//         } catch (error) {

//             console.error(error);

//             alert("Analysis failed");

//         } finally {

//             setAnalyzing(false);
//         }
//     };


//     // Fetch Job Details
//     useEffect(() => {

//         const fetchJob = async () => {

//             try {

//                 const response = await API.get(
//                     `/jobs/${id}`
//                 );

//                 setJob(response.data.job);

//             } catch (error) {

//                 console.error(
//                     "Failed to fetch job",
//                     error
//                 );
//             }
//         };

//         fetchJob();

//     }, [id]);


//     if (!job) {
//         return (
//             <div className="flex items-center justify-center h-screen text-gray-500">
//                 Loading...
//             </div>
//         );
//     }


//     return (
//         <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

//             <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-4">

//                 <h2 className="text-3xl font-bold text-purple-600">
//                     {job.title}
//                 </h2>

//                 <p>
//                     <strong>Location:</strong>
//                     {" "}
//                     {job.location}
//                 </p>

//                 <p>
//                     <strong>Description:</strong>
//                     {" "}
//                     {job.description}
//                 </p>

//                 <p>
//                     <strong>Job Type:</strong>
//                     {" "}
//                     {job.jobType}
//                 </p>

//                 <p>
//                     <strong>Salary:</strong>
//                     {" "}
//                     {job.salary}
//                 </p>


//                 {/* Resume Upload */}

//                 {isCandidate && (
//                     <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer">

//                     <span>
//                         {
//                             resume
//                                 ? resume.name
//                                 : "Upload Resume (PDF)"
//                         }
//                     </span>


//                     <input
//                         type="file"
//                         accept="application/pdf"
//                         className="hidden"
//                         onChange={(e) => {

//                             setResume(
//                                 e.target.files[0]
//                             );

//                             setAnalysis(null);
//                             setQuestions(null);

//                         }}
//                     />

//                 </label>    

//                 )}


//                 {/* DELETE BUTTON FOR RECRUITERS */}

//                 {
//                     isRecruiter && (
//                         <button
//                             onClick={() => setShowDeleteModal(true)}
//                             className="
//                                 w-full
//                                 py-2
//                                 bg-red-600
//                                 hover:bg-red-700
//                                 text-white
//                                 rounded-lg
//                                 font-medium
//                                 transition
//                             "
//                         >
//                             🗑 Delete Job
//                         </button>
//                     )
//                 }


//                 {/* Analyze Button */}

//                 {isCandidate && (
//                     <button
//                         onClick={handleAnalyze}
//                         disabled={analyzing}
//                         className="w-full py-2 bg-blue-600 text-white rounded-lg"
//                     >
//                         {
//                             analyzing
//                                 ? "Analyzing..."
//                                 : "Analyze Resume"
//                         }
//                 </button>
//                 )}


//                 {/* Generate Questions Button */}

//                 {isCandidate && (
//                         <button
//                         onClick={handleGenerateQuestions}
//                         disabled={loadingQuestions}
//                         className="w-full py-2 bg-indigo-600 text-white rounded-lg"
//                     >
//                         {
//                             loadingQuestions
//                                 ? "Generating Questions..."
//                                 : "Prepare Me For Interview"
//                         }
//                     </button>
//                 )}

//                 {/* Apply Button */}

//                 {isCandidate && (
//                     <button
//                     onClick={handleApply}
//                     disabled={applying}
//                     className="w-full py-2 bg-purple-600 text-white rounded-lg"
//                 >
//                     {
//                         applying
//                             ? "Applying..."
//                             : "Apply Now"
//                     }
//                 </button>
//                 )}


//                 {/* Resume Analysis */}

//                 {analysis && (

//                     <div className="mt-6 p-4 border rounded-lg bg-gray-50">

//                         <h2 className="text-xl font-bold text-purple-600">
//                             Resume Match: {analysis.matchPercentage}%
//                         </h2>


//                         {/* Progress Bar */}

//                         <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

//                             <div
//                                 className="bg-green-500 h-4 rounded-full"
//                                 style={{
//                                     width: `${analysis.matchPercentage}%`
//                                 }}
//                             />

//                         </div>


//                         {/* Matched Skills */}

//                         <div className="mt-4">

//                             <p className="font-semibold text-green-600">
//                                 Matched Skills
//                             </p>

//                             <ul className="list-disc ml-5">

//                                 {
//                                     analysis.matchedSkills.map((skill, i) => (
//                                         <li key={i}>
//                                             {skill}
//                                         </li>
//                                     ))
//                                 }

//                             </ul>

//                         </div>


//                         {/* Missing Skills */}

//                         <div className="mt-4">

//                             <p className="font-semibold text-red-600">
//                                 Missing Skills
//                             </p>


//                             <ul className="list-disc ml-5">

//                                 {
//                                     analysis.missingSkills.map((skill, i) => (
//                                         <li key={i}>
//                                             {skill}
//                                         </li>
//                                     ))
//                                 }

//                             </ul>

//                         </div>


//                         {/* AI Resume Feedback */}

//                         {
//                             analysis.aiFeedback && (

//                                 <div className="mt-5">

//                                     <h3 className="text-xl font-bold text-purple-600">
//                                         AI Resume Feedback
//                                     </h3>


//                                     <div className="mt-3">

//                                         <p className="font-semibold text-green-600">
//                                             Strengths
//                                         </p>


//                                         <ul className="list-disc ml-5">

//                                             {
//                                                 analysis.aiFeedback.strengths.map((item, i) => (
//                                                     <li key={i}>
//                                                         {item}
//                                                     </li>
//                                                 ))
//                                             }

//                                         </ul>

//                                     </div>


//                                     <div className="mt-3">

//                                         <p className="font-semibold text-red-600">
//                                             Weaknesses
//                                         </p>


//                                         <ul className="list-disc ml-5">

//                                             {
//                                                 analysis.aiFeedback.weaknesses.map((item, i) => (
//                                                     <li key={i}>
//                                                         {item}
//                                                     </li>
//                                                 ))
//                                             }

//                                         </ul>

//                                     </div>


//                                     <div className="mt-3">

//                                         <p className="font-semibold text-blue-600">
//                                             Suggestions
//                                         </p>


//                                         <ul className="list-disc ml-5">

//                                             {
//                                                 analysis.aiFeedback.suggestions.map((item, i) => (
//                                                     <li key={i}>
//                                                         {item}
//                                                     </li>
//                                                 ))
//                                             }

//                                         </ul>

//                                     </div>

//                                 </div>

//                             )

//                         }

//                     </div>

//                 )}


//                 {/* AI Interview Questions */}
//                 {/* NOTICE: This is OUTSIDE analysis block */}

//                 {/* AI Interview Questions */}
//                 {questions && (
//                     <div
//                         className="
//         mt-8 
//         p-6 
//         rounded-2xl 
//         bg-gradient-to-br 
//         from-indigo-50 
//         to-purple-50 
//         border 
//         border-indigo-200 
//         shadow-md"
//                     >

//                         <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
//                             🤖 AI Interview Questions
//                         </h2>

//                         <p className="text-gray-600 mt-1">
//                             Personalized questions generated based on the job role and required skills.
//                         </p>


//                         {/* Technical Questions */}
//                         {questions.technicalQuestions.length > 0 && (
//                             <div className="mt-6">

//                                 <h3 className="text-lg font-semibold text-blue-700 mb-3">
//                                     🧠 Technical Questions
//                                 </h3>

//                                 <div className="space-y-3">
//                                     {questions.technicalQuestions.map((q, i) => (
//                                         <div
//                                             key={i}
//                                             className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
//                                         >
//                                             <span className="font-bold text-indigo-600">
//                                                 Q{i + 1}.
//                                             </span>{" "}
//                                             {q}
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>
//                         )}


//                         {/* Behavioral Questions */}
//                         {questions.behavioralQuestions.length > 0 && (
//                             <div className="mt-6">

//                                 <h3 className="text-lg font-semibold text-green-700 mb-3">
//                                     💼 Behavioral Questions
//                                 </h3>

//                                 <div className="space-y-3">
//                                     {questions.behavioralQuestions.map((q, i) => (
//                                         <div
//                                             key={i}
//                                             className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
//                                         >
//                                             <span className="font-bold text-green-600">
//                                                 Q{i + 1}.
//                                             </span>{" "}
//                                             {q}
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>
//                         )}


//                         {/* Scenario Questions */}
//                         {questions.scenarioQuestions.length > 0 && (
//                             <div className="mt-6">

//                                 <h3 className="text-lg font-semibold text-purple-700 mb-3">
//                                     🚀 Scenario Questions
//                                 </h3>

//                                 <div className="space-y-3">
//                                     {questions.scenarioQuestions.map((q, i) => (
//                                         <div
//                                             key={i}
//                                             className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
//                                         >
//                                             <span className="font-bold text-purple-600">
//                                                 Q{i + 1}.
//                                             </span>{" "}
//                                             {q}
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>
//                         )}

//                     </div>
//                 )}


//             </div>
//             {
// showDeleteModal && (
//     <div className="
//         fixed inset-0 
//         bg-black/50 
//         flex items-center justify-center
//         z-50
//     ">

//         <div className="
//             bg-white 
//             rounded-2xl 
//             p-6 
//             w-96 
//             shadow-xl
//         ">

//             <h2 className="
//                 text-xl 
//                 font-bold 
//                 text-red-600
//             ">
//                 ⚠️ Delete Job
//             </h2>

//             <p className="mt-3 text-gray-600">
//                 Are you sure you want to delete this job?
//             </p>

//             <p className="text-sm text-red-500 mt-2">
//                 This action cannot be undone.
//             </p>


//             <div className="
//                 mt-6 
//                 flex 
//                 justify-end 
//                 gap-3
//             ">

//                 <button
//                     onClick={() =>
//                         setShowDeleteModal(false)
//                     }
//                     className="
//                         px-4 py-2 
//                         rounded-lg 
//                         bg-gray-200 
//                         hover:bg-gray-300
//                     "
//                 >
//                     Cancel
//                 </button>


//                 <button
//                     onClick={handleDeleteJob}
//                     className="
//                         px-4 py-2 
//                         rounded-lg 
//                         bg-red-600 
//                         text-white 
//                         hover:bg-red-700
//                     "
//                 >
//                     Delete
//                 </button>

//             </div>

//         </div>

//     </div>
// )
// }

//         </div>

//     );

// };


// export default JobDetails;


























import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const JobDetails = () => {

    

    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);


    // Roles
    const isCandidate = user?.role === "candidate";

    const isRecruiter =
        user?.role === "recruiter" ||
        user?.role === "admin";
    
  

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    // Job State
    const [job, setJob] = useState(null);
    const canManageJob =
    isRecruiter &&
    job?.company?.toString() === user?.company?._id?.toString();

    // console.log("Job company:", job?.company);
    // console.log("User company:", user?.company);
    // Resume State
    const [resume, setResume] = useState(null);


    // Application State
    const [applying, setApplying] = useState(false);

    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const [applicationStatus, setApplicationStatus] = useState("");


    // Resume Analysis State
    const [analysis, setAnalysis] = useState(null);

    const [analyzing, setAnalyzing] = useState(false);


    // Interview Questions State
    const [questions, setQuestions] = useState(null);

    const [loadingQuestions, setLoadingQuestions] = useState(false);



    // Delete Job
    const handleDeleteJob = async () => {

        try {

            const response = await API.delete(
                `/jobs/${id}`
            );

            alert(response.data.message);

            setShowDeleteModal(false);

            navigate("/jobs");


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete job"
            );
        }
    };



    // Generate Interview Questions
    const handleGenerateQuestions = async () => {

        try {

            setLoadingQuestions(true);

            setQuestions(null);


            const response = await API.get(
                `/ai/interview-questions/${id}`
            );


            setQuestions(
                response.data.questions
            );


        } catch (error) {

            console.error(error);

            alert(
                "Failed to generate questions"
            );


        } finally {

            setLoadingQuestions(false);

        }

    };



    // Apply For Job
    const handleApply = async () => {

        try {

            if (!resume) {

                alert(
                    "Please upload your resume (PDF)"
                );

                return;
            }


            setApplying(true);


            const formData = new FormData();

            formData.append(
                "resume",
                resume
            );


            const response = await API.post(
                `/applications/apply/${id}`,
                formData
            );


            alert(
                response.data.message
            );


            // Immediately update UI after applying
            setAlreadyApplied(true);

            setApplicationStatus("pending");


        } catch (error) {


            console.error(error);


            alert(
                error.response?.data?.message ||
                "Application failed"
            );


        } finally {

            setApplying(false);

        }

    };



    // Analyze Resume
    const handleAnalyze = async () => {


        try {


            if (!resume) {

                alert(
                    "Please upload resume first"
                );

                return;
            }


            setAnalyzing(true);


            const formData = new FormData();

            formData.append(
                "resume",
                resume
            );


            const response = await API.post(
                `/resume/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );


            setAnalysis(
                response.data
            );


        } catch (error) {


            console.error(error);


            alert(
                "Analysis failed"
            );


        } finally {


            setAnalyzing(false);

        }

    };



    // Fetch Job + Check Application
    useEffect(() => {


        const fetchJob = async () => {


            try {


                const response = await API.get(
                    `/jobs/${id}`
                );


                setJob(
                    response.data.job
                );


            } catch (error) {


                console.error(
                    "Failed to fetch job",
                    error
                );


            }

        };


        const checkApplication = async () => {


            if (!isCandidate) return;


            try {


                const response = await API.get(
                    "/applications/me"
                );


                const application =
                    response.data.applications.find(
                        app => app.job?._id === id
                    );

                    console.log(response.data.applications);
                if (application) {


                    setAlreadyApplied(true);

                    setApplicationStatus(
                        application.status
                    );

                }


            } catch (error) {


                console.error(
                    "Failed to check application",
                    error
                );


            }

        };


        fetchJob();

        checkApplication();


    }, [id, isCandidate]);


        if (!job) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Loading...
            </div>
        );
    }


    return (

        <div className="bg-gray-100 min-h-[calc(100vh-64px)] flex justify-center p-6">


            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-4">


                {/* Job Details */}

                <h2 className="text-3xl font-bold text-purple-600">
                    {job.title}
                </h2>


                <p>
                    <strong>Location:</strong>
                    {" "}
                    {job.location}
                </p>


                <p>
                    <strong>Description:</strong>
                    {" "}
                    {job.description}
                </p>


                <p>
                    <strong>Job Type:</strong>
                    {" "}
                    {job.jobType}
                </p>


                <p>
                    <strong>Salary:</strong>
                    {" "}
                    {job.salary}
                </p>


                {/* Resume Upload */}
                {
                    isCandidate && !alreadyApplied && (

                        <label className="
                            w-full 
                            flex 
                            flex-col 
                            items-center 
                            justify-center 
                            border-2 
                            border-dashed 
                            border-gray-300 
                            rounded-lg 
                            p-4 
                            cursor-pointer
                        ">

                            <span>
                                {
                                    resume
                                        ? resume.name
                                        : "Upload Resume (PDF)"
                                }
                            </span>


                            <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => {

                                    setResume(
                                        e.target.files[0]
                                    );

                                    setAnalysis(null);

                                }}
                            />

                        </label>

                    )
                }

                {/* EDIT JOB */}
                {
                    canManageJob && (
                        <button
                            onClick={() =>
                                navigate(`/jobs/edit/${job._id}`)
                            }
                            className="
                                w-full
                                py-2
                                bg-yellow-500
                                hover:bg-yellow-600
                                text-white
                                rounded-lg
                                font-medium
                                transition
                            "
                        >

                            ✏️ Edit Job

                        </button>
                    )
                }

                {/* Delete Job - Recruiter/Admin */}

                {
                    canManageJob && (

                        <button
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            className="
                                w-full
                                py-2
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                rounded-lg
                                font-medium
                                transition
                            "
                        >

                            🗑 Delete Job

                        </button>

                    )
                }



                {/* Analyze Resume */}

                {
                    isCandidate && !alreadyApplied && (

                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className="
                                w-full
                                py-2
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                rounded-lg
                            "
                        >

                            {
                                analyzing
                                    ? "Analyzing..."
                                    : "Analyze Resume"
                            }

                        </button>

                    )
                }



                {/* AI Interview Questions */}
                {/* Candidate can use this even after applying */}

                {
                    isCandidate && (

                        <button
                            onClick={handleGenerateQuestions}
                            disabled={loadingQuestions}
                            className="
                                w-full
                                py-2
                                bg-indigo-600
                                hover:bg-indigo-700
                                text-white
                                rounded-lg
                            "
                        >

                            {
                                loadingQuestions
                                    ? "Generating Questions..."
                                    : "Prepare Me For Interview"
                            }

                        </button>

                    )
                }



                {/* Apply Button */}

                {
                    isCandidate && !alreadyApplied && (

                        <button
                            onClick={handleApply}
                            disabled={applying}
                            className="
                                w-full
                                py-2
                                bg-purple-600
                                hover:bg-purple-700
                                text-white
                                rounded-lg
                            "
                        >

                            {
                                applying
                                    ? "Applying..."
                                    : "Apply Now"
                            }

                        </button>

                    )
                }



                {/* Already Applied Message */}

                {
                    isCandidate && alreadyApplied && (

                        <div className="
                            bg-green-100
                            border
                            border-green-300
                            rounded-xl
                            p-4
                            text-center
                        ">


                            <h3 className="
                                text-green-700
                                font-bold
                                text-lg
                            ">
                                ✅ Application Submitted
                            </h3>


                            <p className="text-green-600 mt-1">
                                Status: {applicationStatus}
                            </p>


                        </div>

                    )
                }
                                {/* Resume Analysis */}

                {analysis && (

                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">

                        <h2 className="text-xl font-bold text-purple-600">
                            Resume Match: {analysis.matchPercentage}%
                        </h2>


                        {/* Progress Bar */}

                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{
                                    width: `${analysis.matchPercentage}%`
                                }}
                            />

                        </div>


                        {/* Matched Skills */}

                        <div className="mt-4">

                            <p className="font-semibold text-green-600">
                                Matched Skills
                            </p>

                            <ul className="list-disc ml-5">

                                {
                                    analysis.matchedSkills.map((skill, i) => (
                                        <li key={i}>
                                            {skill}
                                        </li>
                                    ))
                                }

                            </ul>

                        </div>


                        {/* Missing Skills */}

                        <div className="mt-4">

                            <p className="font-semibold text-red-600">
                                Missing Skills
                            </p>


                            <ul className="list-disc ml-5">

                                {
                                    analysis.missingSkills.map((skill, i) => (
                                        <li key={i}>
                                            {skill}
                                        </li>
                                    ))
                                }

                            </ul>

                        </div>


                        {/* AI Resume Feedback */}

                        {
                            analysis.aiFeedback && (

                                <div className="mt-5">

                                    <h3 className="text-xl font-bold text-purple-600">
                                        AI Resume Feedback
                                    </h3>


                                    {/* Strengths */}

                                    <div className="mt-3">

                                        <p className="font-semibold text-green-600">
                                            Strengths
                                        </p>


                                        <ul className="list-disc ml-5">

                                            {
                                                analysis.aiFeedback.strengths.map((item, i) => (
                                                    <li key={i}>
                                                        {item}
                                                    </li>
                                                ))
                                            }

                                        </ul>

                                    </div>


                                    {/* Weaknesses */}

                                    <div className="mt-3">

                                        <p className="font-semibold text-red-600">
                                            Weaknesses
                                        </p>


                                        <ul className="list-disc ml-5">

                                            {
                                                analysis.aiFeedback.weaknesses.map((item, i) => (
                                                    <li key={i}>
                                                        {item}
                                                    </li>
                                                ))
                                            }

                                        </ul>

                                    </div>


                                    {/* Suggestions */}

                                    <div className="mt-3">

                                        <p className="font-semibold text-blue-600">
                                            Suggestions
                                        </p>


                                        <ul className="list-disc ml-5">

                                            {
                                                analysis.aiFeedback.suggestions.map((item, i) => (
                                                    <li key={i}>
                                                        {item}
                                                    </li>
                                                ))
                                            }

                                        </ul>

                                    </div>


                                </div>

                            )

                        }

                    </div>

                )}



                {/* AI Interview Questions */}

                {questions && (

                    <div
                        className="
        mt-8 
        p-6 
        rounded-2xl 
        bg-gradient-to-br 
        from-indigo-50 
        to-purple-50 
        border 
        border-indigo-200 
        shadow-md"
                    >

                        <h2 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
                            🤖 AI Interview Questions
                        </h2>

                        <p className="text-gray-600 mt-1">
                            Personalized questions generated based on the job role and required skills.
                        </p>


                        {/* Technical Questions */}
                        {questions.technicalQuestions.length > 0 && (
                            <div className="mt-6">

                                <h3 className="text-lg font-semibold text-blue-700 mb-3">
                                    🧠 Technical Questions
                                </h3>

                                <div className="space-y-3">
                                    {questions.technicalQuestions.map((q, i) => (
                                        <div
                                            key={i}
                                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                                        >
                                            <span className="font-bold text-indigo-600">
                                                Q{i + 1}.
                                            </span>{" "}
                                            {q}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}


                        {/* Behavioral Questions */}
                        {questions.behavioralQuestions.length > 0 && (
                            <div className="mt-6">

                                <h3 className="text-lg font-semibold text-green-700 mb-3">
                                    💼 Behavioral Questions
                                </h3>

                                <div className="space-y-3">
                                    {questions.behavioralQuestions.map((q, i) => (
                                        <div
                                            key={i}
                                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                                        >
                                            <span className="font-bold text-green-600">
                                                Q{i + 1}.
                                            </span>{" "}
                                            {q}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}


                        {/* Scenario Questions */}
                        {questions.scenarioQuestions.length > 0 && (
                            <div className="mt-6">

                                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                                    🚀 Scenario Questions
                                </h3>

                                <div className="space-y-3">
                                    {questions.scenarioQuestions.map((q, i) => (
                                        <div
                                            key={i}
                                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
                                        >
                                            <span className="font-bold text-purple-600">
                                                Q{i + 1}.
                                            </span>{" "}
                                            {q}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}

                    </div>
                )}

            </div>


            {/* Delete Confirmation Modal */}

            {
                showDeleteModal && (

                    <div className="
                        fixed inset-0 
                        bg-black/50 
                        flex items-center justify-center 
                        z-50
                    ">

                        <div className="
                            bg-white 
                            p-6 
                            rounded-2xl 
                            shadow-xl 
                            w-96
                        ">

                            <h2 className="text-xl font-bold text-red-600">
                                ⚠️ Delete Job
                            </h2>


                            <p className="mt-3 text-gray-600">
                                Are you sure you want to delete this job?
                            </p>


                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="
                                        px-4 py-2 
                                        rounded-lg 
                                        bg-gray-200
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={handleDeleteJob}
                                    className="
                                        px-4 py-2 
                                        rounded-lg 
                                        bg-red-600 
                                        text-white
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

};


export default JobDetails;