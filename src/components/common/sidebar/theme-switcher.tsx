import { ColorScheme, useColorScheme } from "@src/stores/useColorScheme";
import clsx from "clsx";
import { MdDarkMode, MdLaptop, MdLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <div className="p-2 xl:p-4">
      <div className="hidden xl:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-1 relative z-10 transition-[background-color]">
        <div
          className="absolute p-1 left-0 top-0 bottom-0 w-1/3 -z-10 transition-[left,background-color]"
          style={{
            left:
              colorScheme === ColorScheme.Auto
                ? 0
                : colorScheme === ColorScheme.Light
                ? "33.333333%"
                : "66.6666666667%",
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-700 rounded-full"></div>
        </div>
        <button
          className={clsx(
            "flex-1 py-1 transition-[color] rounded-full",
            colorScheme === ColorScheme.Auto
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Auto)}
        >
          Auto
        </button>
        <button
          className={clsx(
            "flex-1 py-1 transition-[color] rounded-full",
            colorScheme === ColorScheme.Light
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Light)}
        >
          Light
        </button>
        <button
          className={clsx(
            "flex-1 py-1 transition-[color] rounded-full",
            colorScheme === ColorScheme.Dark
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Dark)}
        >
          Dark
        </button>
      </div>
      <button
        className="w-12 h-12 xl:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50"
        onClick={toggleColorScheme}
      >
        <span className="text-3xl">
          {colorScheme === ColorScheme.Auto ? (
            <MdLaptop />
          ) : colorScheme === ColorScheme.Light ? (
            <MdLightMode />
          ) : (
            <MdDarkMode />
          )}
        </span>
      </button>
    </div>
  );
};
export default ThemeSwitcher;
