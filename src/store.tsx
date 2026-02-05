import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section from "./models/Section";

class SurveyStore {
    sections: Section[];
    focusedSectionId: number | null;
    
    constructor() {
        makeAutoObservable(this); //getter, setter, observable, action 등을 자동으로 추론해서 만들어주는 함수
        this.sections = [new Section()];
        this.focusedSectionId = this.sections[0].id;
    }
    addSection() {
        const section = new Section();
        this.sections.push(section);
        this.focusedSectionId =section.id;
    }

    addQuestion() {
        const section = this.sections.find(s => s.id === this.focusedSectionId);
        if (section) {
            section.addQuestion();
        }
    }
}

const surveyStore = new SurveyStore();
const SurveyStoreContext = createContext(surveyStore);

// eslint-disable-next-line react-refresh/only-export-components
export const useSurveyStore = () => useContext(SurveyStoreContext);
export const SurveyStoreProvider = ({children}: PropsWithChildren) => (
    <SurveyStoreContext.Provider value={surveyStore}>
        {children}
    </SurveyStoreContext.Provider>
)
