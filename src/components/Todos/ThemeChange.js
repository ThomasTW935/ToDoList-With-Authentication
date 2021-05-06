import React, {useState,useEffect} from 'react'
import moon from '../../images/icon-moon.svg'
import sun from '../../images/icon-sun.svg';

export default function ThemeChange() {
  const [darkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    const getTheme = localStorage.getItem('Theme')
    if(getTheme === 'dark') {
      setDarkTheme(true)
      return document.body.classList.add('dark-mode')
    }
  }, [])

  useEffect(()=>{
    if(darkTheme){
      localStorage.setItem('Theme','dark')
      document.body.classList.add('dark-mode')
      return
    } 
    localStorage.setItem('Theme','light')
    document.body.classList.remove('dark-mode')
  },[darkTheme])

  return (
    <button className='btn' onClick={ () => {setDarkTheme(prevTheme => !prevTheme)} }><img src={ !darkTheme ? moon : sun } alt='Change Theme' /></button>
  )
}
