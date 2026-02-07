import Section from "../../models/Section";
import Panel, { PanelBody, PanelCap } from "../common/Panel";
interface Props {
    section: Section;
}

function SectionTitleView({ section }: Props) {
    return (
        <div>
            <PanelCap />
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

export default SectionTitleView