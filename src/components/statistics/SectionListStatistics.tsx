import Section from "../../models/Section";
import { Statistics } from "../../types/app";
import SectionStatistics from "./SectionStatistics";

interface Props {
    count: number;
    sections: Section[];
    statistics: Statistics;
}

export default function SectionListStatistics({ sections, statistics }: Props) {


    return sections.map((section, index) => (
        <SectionStatistics key={section.id} capTitle={`${sections.length}개 중 ${index + 1}섹션`} section={section} statistics={statistics[section.id]} />
    ))

}