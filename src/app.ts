import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { scanForControllers } from './utils/ControllerScanner';
import cors from 'cors';
config();

export class App {
  app: Express;
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.setupControllers();
    this.setupRouter();
  }

  listen() {
    const PORT: number = parseInt(process.env.PORT as string, 10);
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    const corsOptions = {
      origin: process.env.APP_ENV == 'development' ? '*' : process.env.ORIGIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(corsOptions));
  }

  private setupControllers() {
    scanForControllers(this.app);
  }
  private setupRouter() {
    this.app.all('*', (_: Request, response: Response) => {
      const notFoundMessage = {
        error: 'Error 404 - Not Found',
      };
      response.status(404).json(notFoundMessage);
    });
  }
}
