import express from "express";
import { createServer as createViteServer } from "vite";
import surveyRouter from "./api/surveys";

async function startServer() {
  const app = express();
  const port = 5173;
  app.use(express.json());
  app.use("/api/surveys", surveyRouter);

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);
  return app.listen(port);
}

const server = await startServer();

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });

  import.meta.hot.dispose(() => {
    server.close();
  });
}
