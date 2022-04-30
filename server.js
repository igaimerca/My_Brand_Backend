import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import _ from "lodash";
import swaggerUi from "swagger-ui-express";

import routes from "./routes.js";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/portfolio", { useNewUrlParser: true })
  .then(() => {
    app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api", routes);

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "My-Brand Website",
          version: "1.0.0",
          description: "Made with ❤️ by Byiringiro Saad",
          contact: {
            name: "Saad",
            email: "byiringirosaad@gmail.com",
          },
        },

        servers: [
          {
            url: "http://localhost:5000/api",
            description: "localhost",
          },
        ],
      },
      apis: ["./routes.js"],
    };

    const specs = swaggerJSDoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });

export default app;
