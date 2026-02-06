import { makeAutoObservable } from "mobx";
import { createContext, PropsWithChildren, useContext } from "react";
import Section, { SectionData } from "./models/Section";
import callApi from "./utils/api";

class SurveyStore {
    emailCollected: boolean;
    sections: Section[];
    focusedSectionId: number | null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true }); //getter, setter, observable, action 등을 자동으로 추론해서 만들어주는 함수
        this.sections = [new Section()];
        this.focusedSectionId = this.sections[0].id;
        this.emailCollected = false;
    }
    setFocusedSectionId(id: number) {
        this.focusedSectionId = id;
    }
    addSection() {
        const section = new Section();
        this.sections.push(section);
        this.focusedSectionId = section.id;
    }

    addQuestion() {
        const section = this.sections.find(s => s.id === this.focusedSectionId);
        if (section) {
            section.addQuestion();
        }
    }

    fetchSurvey(id: number) {
        callApi<{ sections: SectionData[]; emailCollected: boolean }>(`/surveys/${id}`)
            .then(({ sections, emailCollected }) => {
                this.sections = sections.map(section => new Section(section));
                this.emailCollected = emailCollected ?? false;
            });
    }
}

const surveyStore = new SurveyStore();
const SurveyStoreContext = createContext(surveyStore);

// eslint-disable-next-line react-refresh/only-export-components
export const useSurveyStore = () => useContext(SurveyStoreContext);
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
    <SurveyStoreContext.Provider value={surveyStore}>
        {children}
    </SurveyStoreContext.Provider>
)
