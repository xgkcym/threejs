import React, { useEffect } from 'react'
import Experience from './Experience/Experience'
import './App.css'

document.title = '一期一楼'
export default function App() {
  useEffect(() => {
    const experience = new Experience(document.querySelector('#webgl'))
    return () => {
      experience.destroy()
    }
  }, [])
  return (
    <div>
      <canvas canvas id={'webgl'}></canvas>
      <div className={"spinner"}>
        <div className={"rect1"}></div>
        <div className={"rect2"}></div>
        <div className={"rect3"}></div>
        <div className={"rect4"}></div>
        <div className={"rect5"}></div>
      </div>
    </div>
  )
}