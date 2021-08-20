import app from "./app.mjs";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;
app
  .listen(port, () => {
    console.log(`Server running on port: ${port}`);
  })
  .on("error", (e) => console.error(e));

process.on("SIGTERM", () => server.close());
