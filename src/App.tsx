import './App.css'
import MainLayout from './components/common/MainLayout'
import Panel, { PanelBody, PanelCap, PanelFooter, PanelHeader } from './components/common/Panel'
import Tabs, { Tab, TabList, TabPanels, TabPenel } from './components/common/Tabs'

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
          <PanelCap>Cap</PanelCap>
          <Panel>
            <PanelHeader>Header</PanelHeader>
            <PanelBody>Body</PanelBody>
            <PanelFooter>Footer</PanelFooter>
          </Panel>
        </TabPenel>
        <TabPenel index={1}>Panel 2</TabPenel>
      </TabPanels>
    </Tabs>
  </MainLayout>)
}

export default App
