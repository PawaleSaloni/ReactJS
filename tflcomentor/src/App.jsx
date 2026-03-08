import QuickStatistics from './components/QuickStatistics'
import DisplayLayerCards from './components/DisplayLayerCards'

function App() {
  return (
    <div>
      <QuickStatistics />
      <hr style={{ border: 'none', borderTop: '2px solid #fdf0ec', margin: '0' }} />
      <DisplayLayerCards />
      <hr style={{ border: 'none', borderTop: '2px solid #fdf0ec', margin: '0' }} />
    </div>
  )
}

export default App