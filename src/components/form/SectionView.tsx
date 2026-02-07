import { FormProvider, useForm } from "react-hook-form";
import Section from "../../models/Section";
import SectionTitleView from "./SectioniTitleView";
import QuestionView from "./QuestionView";
import Button from "../common/Button";
import { QuestionData } from "../../types/app";

interface Props {
    section: Section;
    last: boolean;
    onSave: (data: Record<QuestionData["id"], string | string[]>) => void;
    onNext: () => void;
}
export default function SectionView({ section, last, onSave, onNext }: Props) {
    const methods = useForm();

    const handleSubmitData = (data: Record<QuestionData["id"], string | string[]>) => {
        onSave(data);
        onNext();
    };

    return (
        <FormProvider {...methods}>
            <form className="text-gray-900 [&>*]:mb-24" onSubmit={methods.handleSubmit(handleSubmitData)}>
                <SectionTitleView section={section} />
                {section.questions.map(q => (
                    <QuestionView key={q.id} question={q} />
                ))}
                <Button type="submit">{last ? "보내기" : "다음"}</Button>
            </form>
        </FormProvider>

    )
}