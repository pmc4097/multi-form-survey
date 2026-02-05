import { observer } from "mobx-react-lite";
import QuestionEditor from "./QuestionEditor";
import Section from "../../models/Section";

interface Props {
    section: Section;
}

const SectionEditor = observer(function SectionEditor({section}: Props) {
    return (
        <div>
            {section.questions.map(q => (
                <QuestionEditor key={q.id}  question={q} />
            ))}
        </div>
    )
})

export default SectionEditor