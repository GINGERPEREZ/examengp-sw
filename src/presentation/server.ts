import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

interface Options {
  port: number;
  routes?: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes?: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(express.static(this.publicPath));
    // Swagger docs
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    if (this.routes) {
      this.app.use('/api', this.routes);
    }
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      console.log(`Swagger docs available at http://localhost:${this.port}/api-docs`);
    });
  }
}