
import Section from "../../models/Section";
import Panel, { PanelBody, PanelCap } from "../common/Panel";

interface Props {
    capTitle: string;
    section: Section;
}

export default function SectionTitleView({ capTitle, section }: Props) {
    return (
        <div>
            <PanelCap>{capTitle}</PanelCap>
            <Panel>
                <PanelBody className="flex flex-col">
                    <h4 className="mb-17 text-24 text-gray-900 font-semibold">
                        {section.title}
                    </h4>
                    <p className="text-16 text-gray-700">
                        {section.description}
                    </p>
                </PanelBody>
            </Panel>
        </div>
    )
}
