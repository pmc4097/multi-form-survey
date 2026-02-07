import express from "express";
import JsonStorage from "../../utils/jsonStorage";
import path from "path";
import { QuestionData, SectionData } from "../../types/app";

const router = express.Router();
const storage = new JsonStorage<{
  sectoins: SectionData[];
  emailCollected: boolean;
  responses: SurveryResponse[];
}>(path.join(__dirname, "../data/surveys.json"));

type SurveryResponse = Record<
  SectionData["id"],
  Record<QuestionData["id"], string>
>;

router.get("/", (req, res) => {
  return res.json(storage.getAll());
});

router.post("/", (req, res) => {
  const id = Date.now();
  storage.set(id, {
    ...req.body,
    emailCollected: false,
  });
  return res.json({ id });
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  storage.set(id, req.body);
  return res.json({ id });
});
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  storage.set(id, {
    ...data,
    ...req.body,
  });
  return res.json({ id });
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const data = storage.get(id);
  if (!data) return res.status(404).json({ message: "Not found" });

  return res.json(data);
});

router.post("/:id/responses", (req, res) => {
  const id = Number(req.params.id);
  const data = storage.get(id);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  storage.set(id, {
    ...data,
    responses: [...(data.responses ?? []), req.body],
  });

  return res.status(201).json({ messge: "Response created" });
});

export default router;
