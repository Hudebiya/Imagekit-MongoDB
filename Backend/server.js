import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const port = 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });


