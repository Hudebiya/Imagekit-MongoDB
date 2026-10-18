import express from "express"
import postModel from "./models/post.model.js"
import multer from "multer"
import uploadFile from "../services/storage.service.js"
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173" 
}));

app.use(express.json());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/posts', async(req, res) => {
    const post = await postModel.find().sort({ _id: -1 })
    res.status(200).json({
        message: "Posts fetched sucessfully",
        post
    })
})


app.post('/posts', upload.single("image"), async (req, res) => {
    try {
        const data = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const imgBuffer = req.file.buffer;
        const result = await uploadFile(imgBuffer);

        const post = await postModel.create({
            title: data.title,
            desc: data.desc,
            image: result.url
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Post creation failed",
            error: error.message
        });
    }
});


app.delete("/posts/:id", async(req, res) => {
    const id = req.params.id
    await postModel.findOneAndDelete({ _id: id })
    res.status(200).json({
        message: "Post deleted Successfully"
    })
})

app.patch("/posts/:id", upload.single("image"), async (req, res) => {
      console.log("PATCH HIT:", req.params.id, req.body, req.file?.originalname);
    try {
        const update = {
            title: req.body.title,
            desc: req.body.desc,
        };

        if (req.file) {
            const result = await uploadFile(req.file.buffer);
            update.image = result.url;
        }

        await postModel.findByIdAndUpdate(req.params.id, update);

        res.status(200).json({
            message: "Post updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

export default app
