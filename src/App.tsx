import './App.css'
import MainLayout from './components/common/MainLayout'
import Tabs, { Tab, TabList, TabPanels, TabPenel } from './components/common/Tabs'
import SectionEditorList from './components/edit/SectionEditorList'
import { SurveyStoreProvider } from './store'

function App() {

  return (
  <MainLayout>
    <SurveyStoreProvider>
      <Tabs>
        <TabList>
          <Tab index={0}>Tab 1</Tab>
          <Tab index={1}>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPenel index={0}>
            <SectionEditorList />
          </TabPenel>
          <TabPenel index={1}>Panel 2</TabPenel>
        </TabPanels>
      </Tabs>
    </SurveyStoreProvider>
  </MainLayout>)
}

export default App
