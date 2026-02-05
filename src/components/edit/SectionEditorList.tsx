import { useSurveyStore } from "../../store";
import SectionEditor from "./SectionEditor";

export default function SectionEditorList() {
    const surveyStore = useSurveyStore();
    return (
        <div className="relative">
            <div className="absolute top-0 -right-50">
                <button onClick={() =>  surveyStore.addQuestion()}>+</button>
            </div>
            <div>
                {surveyStore.sections.map(s => (
                    <SectionEditor key={s.id} section={s} />
                ))}
            </div>
        </div>
    )
}