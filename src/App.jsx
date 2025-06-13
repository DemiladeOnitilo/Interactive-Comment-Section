import React from 'react'
import Container from './components/Container'
import data from "./data.json";


const App = () => {
  return (
    <div className='flex justify-center items-center'><Container data={data} /></div>
  )
}

export default App