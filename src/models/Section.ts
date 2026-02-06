import { makeAutoObservable } from "mobx";
import Question from "./question";

export type SectionData = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};

export default class Section implements SectionData {
  id: number;
  title: string;
  description: string;
  questions: Question[];

  constructor(
    data: SectionData = {
      id: Date.now(),
      title: "",
      description: "",
      questions: [new Question()],
    },
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.questions = data.questions.map((q) => new Question(q));
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  addQuestion() {
    this.questions.push(new Question());
  }

  removeQuestion(id: number) {
    this.questions = this.questions.filter((q) => q.id !== id);
  }

  copyQuestion(id: number) {
    const question = this.questions.find((q) => q.id === id);
    if (question)
      this.questions.push(
        new Question({
          ...question,
          id: Date.now(),
        }),
      );
  }
}
