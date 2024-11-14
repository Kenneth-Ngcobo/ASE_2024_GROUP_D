import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import useState from "react";

import { useTheme } from 'next-themes'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
 

  return (
    <button className="flex justify-center items-center hover:text-teal-500" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    {theme === 'dark' ? <FaSun /> : <FaMoon />}
  </button>
  )
}

export default ThemeButton;