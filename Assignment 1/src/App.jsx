import { useState } from 'react'

function App() {
  let [count, setCount] = useState(0)
  function incrementFunc(){
    setCount(count += 1)
  }
  function decrementFunc(){
    if(count > 0){
      setCount(count -= 1)
    }
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={incrementFunc}>Increment</button>
      <button onClick={decrementFunc}>Decrement</button>
    </>
  )
}

export default App
