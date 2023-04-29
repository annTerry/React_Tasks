import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req: Request, res: Response, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      const [beginHTML, endHTML] = template.split('<!--ssr-out-->');
      console.log('here');
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      console.log('here2');
      console.log(url);
      const { pipe } = await render(url, {
        onShellReady() {
          res.statusCode = 200;
          res.write(beginHTML);
          pipe(res);
        },
        onAllReady() {
          res.write(endHTML);
          res.end();
        },
      });
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
    console.log('here3');
  });

  app.listen(5000);
  console.log('server running on port 5000');
}

createServer();
