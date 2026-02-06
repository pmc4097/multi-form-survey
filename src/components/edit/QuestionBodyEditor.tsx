import { QuestionType } from "../../types/app";
import Input from "../common/Input";
import OptionEditor from "./OptionEditor";


interface QuestionBodyEditorProps {
    type: QuestionType
}

export default function QuestionBodyEditor({ type }: QuestionBodyEditorProps) {

    switch (type) {
        case 'shortText':
            return <div>shortText</div>;
        case 'longText':
            return <div>longText</div>;
        case 'multipleChoice':
        case 'checkbox':
        case 'dropdown':
            return <OptionEditor type={type} />;
        case 'date':
            return <div>date</div>;
        case 'time':
            return <Input disabled />;
        default: return null;
    }
}