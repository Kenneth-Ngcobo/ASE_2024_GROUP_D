import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useTheme } from 'next-themes'

/**
 * ThemeButton component that allows users to toggle between dark and light themes.
 * It uses the `next-themes` library to manage the theme state.
 *
 * @component
 * @returns {JSX.Element} - The ThemeButton component that toggles the theme between 'dark' and 'light'.
 */
const ThemeButton = () => {
  const { theme, setTheme } = useTheme();


  return (
    <button className="flex justify-center items-center hover:text-[#fc9d4f]" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeButton;