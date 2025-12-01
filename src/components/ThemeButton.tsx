import { useState } from "react";

type theme = "light" | "dark";

function ThemeButton() {
  const [theme, setTheme] = useState<theme>("light");

  return (
    <>
      <div
        style={
          theme === "light" ? { background: "blue" } : { background: "red" }
        }
      >
        {theme}
      </div>

      <button
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        switch theme
      </button>
    </>
  );
}

export default ThemeButton;
