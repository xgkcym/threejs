import React, { useEffect } from 'react'
import Experience from './Experience/Experience'
import './App.css'


export default function App() {
  useEffect(() => {
    const experience = new Experience(document.querySelector('#webgl'))
    return () => {
      experience.destroy()
    }
  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
