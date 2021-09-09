// import express, { Request, Response } from "express";
import { OrchestrationService } from "../services/orchestration-service";
import { exampleApplicationBody } from "./example-application-body";

// const app = express();
// app.use(express.json());

// app.get("/", function (req: any, res: any) {
//   res.send("Hello World");
// });

// app.post("/", function (request: Request, response: Response) {
//   const body = request.body;
//   const stringBody = JSON.stringify(request.body);
//   console.log(stringBody);

//   OrchestrationService.processApplicationSubmission(stringBody, true);
//   response.send("Post");
// });

// console.log("App is ready at localhost:3000");
// app.listen(3000);

const stringBody = JSON.stringify(exampleApplicationBody);

console.log("App is starting!");
OrchestrationService.processApplicationSubmission(stringBody, true);
console.log("App is done");
