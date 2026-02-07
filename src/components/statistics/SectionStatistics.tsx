import Section from "../../models/Section";
import { SectionData, Statistics } from "../../types/app";
import QuestStatistics from "./QuestStatistics";
import SectionTitleView from "./SectionTitleView";

interface Props {
    capTitle: string;
    section: Section;
    statistics: Statistics[SectionData["id"]];
}

export default function SectionStatistics({ capTitle, section, statistics }: Props) {
    return (
        <div className="[&>*]:mb-24">
            <SectionTitleView capTitle={capTitle} section={section} />
            {section.questions.map(q => (
                <QuestStatistics key={q.id} question={q} statistics={statistics[q.id]} />
            ))}
        </div>
    )
}