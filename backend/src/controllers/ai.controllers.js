
const getResponse=require('../services/ai.services')

const getRes=async (req,res)=>{
    const code=req.body.code;
    if(!code){
        return res.status(400).json({error:"Prompt is required"})
    }
    const response=await getResponse(code,"give suggestions to improve code and give overall review")
    res.send(response);
}
const getTime=async (req,res)=>{
    const code=req.body.code;
    if(!code){
        return res.status(400).json({error:"Prompt is required"})
    }
    const response=await getResponse(code,"print only time complexity in one line.dont give any suggestions")
    res.send(response);
}
const getSpace=async (req,res)=>{
    const code=req.body.code;
    if(!code){
        return res.status(400).json({error:"Prompt is required"})
    }
    const response=await getResponse(code,"print only space complexity in one line. dont give any suggestions")
    res.send(response);
}
module.exports = {getRes,getTime,getSpace}