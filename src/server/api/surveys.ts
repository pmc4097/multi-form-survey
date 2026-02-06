import express from "express";
import JsonStorage from "../../utils/jsonStorage";
import path from "path";

const router = express.Router();
const storage = new JsonStorage(path.join(__dirname, "../data/surveys.json"));

router.get("/", (req, res) => {
  return res.json(storage.getAll());
});

router.post("/", (req, res) => {
  const id = Date.now();
  storage.set(id, req.body);
  return res.json({ id });
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  storage.set(id, req.body);
  return res.json({ id });
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const data = storage.get(id);
  if (!data) return res.status(404).json({ message: "Not found" });

  return res.json(data);
});

export default router;
