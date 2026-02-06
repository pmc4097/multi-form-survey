import Panel, { PanelBody, PanelFooter, PanelHeader } from "../common/Panel"
import CloseIcon from '../../assets/icons/close.svg?react';
import Dropdown from "../common/Dropdown";
import Button from "../common/Button";
import callApi from "../../utils/api";

interface Props {
    surveyId: number;
    emailCollected: boolean;
    onClose: () => void;
}

export default function SendModalContents({ surveyId, emailCollected, onClose }: Props) {
    const path = `${location.host}/survey/${surveyId}`;

    const handelCopy = () => {
        navigator.clipboard.writeText(path);
        onClose();
    }

    const handleChangedEmailCollected = (value: boolean) => {
        callApi(`/surveys/${surveyId}`,
            {
                method: 'PATCH',
                body: { emailCollected: value }
            });
    }

    return (
        <Panel className="text-gray-900">
            <PanelHeader className="flex justify-between items-center mb-19">
                <h4 className="text-20 font-semibold">설문지 보내기</h4>
                <button onClick={onClose}><CloseIcon /></button>
            </PanelHeader>
            <PanelBody>
                <div className="-mx-20 px-20 bg-bg flex justify-between items-center py-13 mb-38">
                    <span className="text-16 font-medium">이메일 수집</span>
                    <Dropdown<boolean>
                        defaultValue={emailCollected}
                        options={[{ label: '수집하지 않음', value: false }, { label: '수집함', value: true }]}
                        onChange={handleChangedEmailCollected}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-17 font-semibold">링크</span>
                    <p className="pt-21 pb-16 text-gray-800 font-medium text-16">{path}</p>
                </div>
            </PanelBody>
            <PanelFooter className="flex justify-end mt-26">
                <Button variants="tertiary" onClick={onClose}>취소</Button>
                <Button variants="secondary" onClick={handelCopy}>복사</Button>
            </PanelFooter>
        </Panel>
    )
}