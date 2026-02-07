import { useFormContext } from "react-hook-form";
import Question from "../../models/question";
import Panel, { PanelBody, PanelHeader } from "../common/Panel";
import QuestionForm from "./QuestionForm";
import classNames from "classnames";

interface Props {
    question: Question;
}

export default function QuestionView({ question }: Props) {
    const { formState: { errors } } = useFormContext();
    return (
        <Panel className={
            classNames({ "border-red-500 border-1": errors[question.id] })
        }>
            <PanelHeader className="flex mb-31">
                <h6 className="text-16 text-gray-900 font-medium">{question.title}</h6>
            </PanelHeader>
            <PanelBody>
                <QuestionForm question={question} />
                {
                    errors[question.id] &&
                    <p className="text-red-500 text-14 mt-10">
                        {errors[question.id]!.message?.toString() || '필수 항목 입니다..'}
                    </p>
                }
            </PanelBody>
        </Panel>
    )
}