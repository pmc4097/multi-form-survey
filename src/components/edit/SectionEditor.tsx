import { observer } from "mobx-react-lite";
import QuestionEditor from "./QuestionEditor";
import Section from "../../models/Section";
import SectionTitleEditor from "./SectionTitleEditor";

interface Props {
    section: Section;
    capTitle: string;
    onChangeFocus: (id: number) => void
}

const SectionEditor = observer(function SectionEditor({ section, capTitle, onChangeFocus }: Props) {

    const handleClickContainer = () => {
        onChangeFocus(section.id);
    }
    return (
        <div className="[&>*]:mb-24" onClick={handleClickContainer}>
            <SectionTitleEditor capTitle={capTitle} section={section} />
            {section.questions.map(q => (
                <QuestionEditor key={q.id} question={q} onCopy={section.copyQuestion} onDelete={section.removeQuestion} />
            ))}
        </div>
    )
})

export default SectionEditor