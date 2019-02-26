import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", router);

app.use("/", express.static(path.resolve(__dirname, "../dist-client")));

app.listen(PORT, () => {
  console.log(`PhoneNumberGeneratorAPI listening on port ${PORT}`);
});

export default app;
