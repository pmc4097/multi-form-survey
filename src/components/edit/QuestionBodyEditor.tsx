import Question from "../../models/question";
import Input from "../common/Input";
import OptionEditor from "./OptionEditor";


interface QuestionBodyEditorProps {
    question: Question;
}

export default function QuestionBodyEditor({ question }: QuestionBodyEditorProps) {

    switch (question.type) {
        case 'shortText':
            return <div>shortText</div>;
        case 'longText':
            return <div>longText</div>;
        case 'multipleChoice':
        case 'checkbox':
        case 'dropdown':
            return <OptionEditor question={question} />;
        case 'date':
            return <div>date</div>;
        case 'time':
            return <Input disabled />;
        default: return null;
    }
}