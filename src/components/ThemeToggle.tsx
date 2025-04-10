
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="bg-background hover:bg-accent"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
