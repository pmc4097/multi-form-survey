import './App.css'
import Dropdown from './components/common/Dropdown'
import MainLayout from './components/common/MainLayout'
import Panel, { PanelBody, PanelCap, PanelFooter, PanelHeader } from './components/common/Panel'
import Tabs, { Tab, TabList, TabPanels, TabPenel } from './components/common/Tabs'
import QuestionEditor from './components/edit/QuestionEditor'

function App() {

  return (
  <MainLayout>
    <Tabs>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPenel index={0}>
          <QuestionEditor />
        </TabPenel>
        <TabPenel index={1}>Panel 2</TabPenel>
      </TabPanels>
    </Tabs>
  </MainLayout>)
}

export default App
