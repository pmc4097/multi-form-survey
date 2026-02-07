import { Link, useParams, useSearchParams } from "react-router-dom";
import Panel, { PanelBody, PanelCap, PanelHeader } from "../components/common/Panel";

export default function CompletePage() {
    const [searchParams] = useSearchParams();
    const { surveyId } = useParams<{ surveyId: string }>();
    return (
        <div>
            <PanelCap />
            <Panel>
                <PanelHeader className="text-gray-900 text-24 mb-12 font-semibold">
                    <h5>{searchParams.get('title') ?? '설문 와료'}</h5>
                </PanelHeader>
                <PanelBody>
                    <p className="mb-17">응답이 기록되었습니다.</p>
                    <Link className="border-b-blue-500 text-blue-500 brorder-b-1" to={`/surveys/${surveyId}`}>다른 응답 제출</Link>
                </PanelBody>
            </Panel>
        </div>
    )
}