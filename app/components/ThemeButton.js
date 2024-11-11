import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import useState from "react";

import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
 

  return (
    <button className="flex justify-center items-center" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
     Theme
  </button>
  )
}

export default ThemeButton;