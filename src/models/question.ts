import { makeAutoObservable } from "mobx";
import { Option, QuestionData, QuestionType } from "../types/app";

export default class Question implements QuestionData {
  id: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options: Option[] | undefined;

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
    this.options = data.options;
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
      this.options = this.options ?? [];
    } else {
      this.options = undefined;
    }
  }
  setRequired(required: boolean) {
    this.required = required;
  }
  setOptions(options: Option[]) {
    this.options = options;
  }
  setOption(id: string, option: string) {
    if (this.options) {
      const index = this.options.findIndex((opt) => opt.id === id);
      if (index !== -1) {
        this.options[index].value = option;
      }
    }
  }
}
