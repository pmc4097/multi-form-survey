import { Cell, Legend, Pie, PieChart, PieLabel } from "recharts";
import Question from "../../models/question";
import { QuestionData, SectionData, Statistics } from "../../types/app";
import Panel, { PanelBody, PanelHeader } from "../common/Panel";


interface Props {
    question: Question;
    statistics: Statistics[SectionData["id"]][QuestionData['id']];
}

export default function QuestStatistics({ question, statistics }: Props) {

    if (question.type === 'longText') {
        const typedStaticistics = statistics as string[];
        return (
            <Panel className="text-gray-900">
                <PanelHeader>
                    <h6 className="text-17 font-medium mb-18">{question.title}</h6>
                    <p className="text-gray-800 text-16 mb-21">응답 {typedStaticistics.length}개</p>
                </PanelHeader>
                <PanelBody className="flex flex-col gap-y-9">
                    {
                        typedStaticistics.map((response, index) => response && (
                            <p key={index} className="text-15 text-black font-medium p-17 rounded-10 bg-bg">{response}</p>
                        ))
                    }
                </PanelBody>
            </Panel>
        )
    } else {
        const typedStaticistics = statistics as Record<string, number>;
        const entries = Object.entries(typedStaticistics);
        const total = entries.reduce((acc, cur) => acc + cur[1], 0);
        return (
            <Panel className="text-gray-900">
                <PanelHeader>
                    <h6 className="text-17 font-medium mb-18">{question.title}</h6>
                    <p className="text-gray-800 text-16 mb-21">응답 {total}개</p>
                </PanelHeader>
                <PanelBody className="flex flex-col gap-y-9 items-center">
                    <PieChart width={410} height={250}>
                        <Pie cx="35%" data={entries} nameKey={0} dataKey={1} label={renderCustomizedLabel} labelLine={false} >
                            {entries.map(([key], index) => (
                                <Cell key={key} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            align="right"
                            verticalAlign="middle"
                            layout="vertical"
                            iconType="circle"
                            iconSize={16}
                        />
                    </PieChart>
                </PanelBody>
            </Panel>
        )
    }
}

const COLORS = ['#0D00A4', '#0D00A4CC', '#0D00A499', '#0D00A466', '#0D00A433'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel: PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
        return null;
    }
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};