const recruiterOnly = (req,res,next)=>{
    if(req.user.role != "recruiter"){
        return res.status(403).json({
            success:false,
            message:"Access deneid , Recruiter only",
        })
    }
    next();
}



const candidateOnly = (req,res,next)=>{
    if(req.user.role !== "candidate"){
        return res.status(403).json({
            success:false,
            message:"Access Denied , Candidates only"
        })
    }
    next();
}


module.exports = {recruiterOnly , candidateOnly}