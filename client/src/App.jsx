import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TransactionForm from './components/TransactionForm'
import TransactionHistory from './components/TransactionHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Constomer Payment</h1>

          <div>
            <h4>Check history</h4>
            <TransactionHistory/>
          </div>
            <br /><br />

            <div>
              <h4>New Transfer</h4>
              <TransactionForm/>
            </div>

      </div>
      
    </>
  )
}

export default App
