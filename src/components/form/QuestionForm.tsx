import { Controller, useFormContext } from "react-hook-form";
import Question from "../../models/question";
import Input from "../common/Input";
import Dropdown from "../common/Dropdown";
import Textarea, { AutoGrow } from "../common/Textarea";
import Radio from "../common/Radio";
import Checkbox from "../common/Checkbox";


interface Props {
    question: Question;
}
export default function QuestionForm({ question }: Props) {
    const { control, register } = useFormContext();

    switch (question.type) {
        case "shortText":
            return <Input
                className="pb-16 pt-0 border-b-2 focus:border-b-main focus:bg-transparent w-full"
                {...register(`${question.id}`, {
                    required: {
                        value: question.required,
                        message: "필수 항목 입니다."
                    }
                })} />;
        case "date":
            return (
                <Input type="text" {...register(`${question.id}`, {
                    required: {
                        value: question.required,
                        message: "필수 항목 입니다."
                    }
                })} />
            );
        case "time":
            return (
                <Input type="time" {...register(`${question.id}`, {
                    required: {
                        value: question.required,
                        message: "필수 항목 입니다."
                    }
                })} />
            );
        case "dropdown":
            return (
                <Controller name={`${question.id}`} control={control} render={({ field }) => (
                    <Dropdown options={question.options!.map(option => ({
                        label: <span>{option.value}</span>,
                        value: option.value
                    }))}
                        onChange={field.onChange} />
                )}
                    rules={{
                        required: {
                            value: question.required,
                            message: "필수 항목 입니다."
                        }
                    }}
                />
            );
        case "longText":
            return (
                <AutoGrow className="w-full" forTextarea={`${question.id}`}>
                    <Textarea className="w-full border-b-2 focus:border-b-main bg-transparent"
                        rows={1}
                        {...register(`${question.id}`, {
                            required: {
                                value: question.required,
                                message: "필수 항목 입니다."
                            }
                        })} />
                </AutoGrow>
            );
        case "multipleChoice":
            return (
                <div className="flex flex-col gap-y-20">
                    {question.options!.map((option) => (
                        <Radio key={option.id} label={option.value} value={option.value} {...register(`${question.id}`, {
                            required: {
                                value: question.required,
                                message: "필수 항목 입니다."
                            }
                        })} />
                    ))}
                </div>
            );
        case "checkbox":
            return (
                <div className="flex flex-col gap-y-20">
                    {question.options!.map((option) => (
                        <Checkbox key={option.id} label={option.value} value={option.value} {...register(`${question.id}`, {
                            required: {
                                value: question.required,
                                message: "1개 이상의 항목을 선택해 주세요."
                            }
                        })} />
                    ))}
                </div>
            );
        default:
            return null;
    }
}