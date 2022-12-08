import {
  createContext,
  useContext,
  useState,
  useEffect,
  type Context,
  type ReactNode,
} from "react";
import GlobalData from "../../content/global/index.json";

export type Theme = {
  mono: "slate" | "gray" | "neutral" | "zinc" | "stone";
  color:
    | "slate"
    | "gray"
    | "neutral"
    | "zinc"
    | "stone"
    | "red"
    | "orange"
    | "yellow"
    | "amber"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";
  icon: "hi";
  font: "sans" | "nunito" | "lato" | "work-sans";
  darkMode: "dark" | "light" | "system";
};

const ThemeContext: Context<Theme> = createContext(GlobalData.theme as Theme);
export const useTheme = () => useContext(ThemeContext);

const updateRenderColorMode = (themeMode: "dark" | "light") => {
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.remove("light");
    root.classList.add(themeMode);
  }
};

const getUserSystemDarkMode = () => {
  if (typeof window !== "undefined") {
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

export const Theme = ({
  data,
  children,
}: {
  data: any;
  children: ReactNode;
}) => {
  const [systemDarkMode, setSystemDarkMode] = useState(getUserSystemDarkMode());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      const updateSystemMediaPreference = (event: any) => {
        setSystemDarkMode(event.matches ? "dark" : "light");
      };

      userMedia.addEventListener("change", updateSystemMediaPreference);
      return () =>
        userMedia.removeEventListener("change", updateSystemMediaPreference);
    }
    return;
  }, [setSystemDarkMode]);

  const {
    mono = "neutral",
    color = "neutral",
    icon = "hi",
    font = "sans",
    darkMode = "system",
  } = data;

  useEffect(() => {
    updateRenderColorMode(
      darkMode === "system"
        ? systemDarkMode
        : darkMode !== ""
        ? darkMode
        : "light"
    );
  }, [systemDarkMode, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        mono,
        color,
        icon,
        font,
        darkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
