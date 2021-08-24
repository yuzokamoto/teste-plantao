import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { postRouter } from "./routes/postRouter";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT) || 3003;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});

app.use('/users', userRouter)
app.use('/posts', postRouter)




