import Question from "../models/question";

export type QuestionType =
  | "shortText"
  | "longText"
  | "multipleChoice"
  | "checkbox"
  | "dropdown"
  | "date"
  | "time";

export type Option = {
  id: string;
  value: string;
};
export type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: Option[];
};

export type SectionData = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};
