
import express from "express"
import postModel from "./models/post.model.js"
import multer from "multer"
import uploadFile from "../services/storage.service.js"

const app = express()
app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/posts', async(req, res) => {
    const post = await postModel.find()
    res.status(200).json({
        message: "Posts fetched sucessfully",
        post
    })
})

app.post('/posts', upload.single("image"), async(req, res) => {
    try {
        const data = req.body

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            })
        }

        const imgBuffer = req.file.buffer
        const result = await uploadFile(imgBuffer)

        await postModel.create({
            title: data.title,
            desc: data.desc,
            imgUrl: result.url
        })

        res.status(201).json({
            message: "Post created sucessfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Post creation failed",
            error: error.message
        })
    }
})

app.delete("/posts/:id", async(req, res) => {
    const id = req.params.id
    await postModel.findOneAndDelete({ _id: id })
    res.status(200).json({
        message: "Post deleted Successfully"
    })
})

app.patch("/posts/:id", async(req, res) => {
    const id = req.params.id
    const desc = req.body.desc
    await postModel.findByIdAndUpdate({ _id: id }, { desc })
    res.status(200).json({
        message: "Post updated Successfully"
    })
})

export default app
