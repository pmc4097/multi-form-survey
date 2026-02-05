import './App.css'
import MainLayout from './components/common/MainLayout'
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
        <TabPenel index={0}>Panel 1</TabPenel>
        <TabPenel index={1}>Panel 2</TabPenel>
      </TabPanels>
    </Tabs>
  </MainLayout>)
}

export default App
