import mongoose from "mongoose"

const postSchema= new mongoose.Schema({
    title:String,
    desc: String,
})
const postModel = mongoose.model("post",postSchema)
export default postModel