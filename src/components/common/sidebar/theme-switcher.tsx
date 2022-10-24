import { ColorScheme, useColorScheme } from "@src/stores/useColorScheme";
import clsx from "clsx";
import { MdDarkMode, MdLaptop, MdLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <div className="p-2 xl:p-4">
      <div className="relative z-10 hidden items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-gray-800 xl:flex">
        <div
          className="absolute left-0 top-0 bottom-0 -z-10 w-1/3 p-1 transition-[left]"
          style={{
            left:
              colorScheme === ColorScheme.Auto
                ? 0
                : colorScheme === ColorScheme.Light
                ? "33.333333%"
                : "66.6666666667%",
          }}
        >
          <div className="h-full w-full rounded-full bg-white dark:bg-gray-700"></div>
        </div>
        <button
          className={clsx(
            "flex-1 rounded-full py-1",
            colorScheme === ColorScheme.Auto
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Auto)}
        >
          Auto
        </button>
        <button
          className={clsx(
            "flex-1 rounded-full py-1",
            colorScheme === ColorScheme.Light
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Light)}
        >
          Light
        </button>
        <button
          className={clsx(
            "flex-1 rounded-full py-1",
            colorScheme === ColorScheme.Dark
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          )}
          onClick={() => setColorScheme(ColorScheme.Dark)}
        >
          Dark
        </button>
      </div>
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 xl:hidden"
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
