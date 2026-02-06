import { makeAutoObservable } from "mobx";
import { QuestionType } from "../types/app";

type QuestionData = {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
};

export default class Question implements QuestionData {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options: string[] | undefined;

  constructor(
    data: QuestionData = {
      id: Date.now(),
      title: "",
      type: "shortText",
      required: false,
    },
  ) {
    makeAutoObservable(this, {}, { autoBind: true }); //getter, setter, observable, action 등을 자동으로 추론해서 만들어주는 함수
    this.id = data.id;
    this.title = data.title;
    this.type = data.type;
    this.required = data.required;
  }

  setTitle(title: string) {
    this.title = title;
  }
  setType(type: QuestionType) {
    this.type = type;

    if (
      type === "multipleChoice" ||
      type === "checkbox" ||
      type === "dropdown"
    ) {
      this.options = this.options ?? [""];
    } else {
      this.options = undefined;
    }
  }
  setRequired(required: boolean) {
    this.required = required;
  }
  setOptions(options: string[]) {
    this.options = options;
  }
  //TODO:  하나의 옵션을 변경 할 수 있도록 하는 메소드 추가
}
