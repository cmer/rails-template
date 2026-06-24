import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme, type Theme } from "@/lib/theme"

const OPTIONS: Array<{
  value: Theme
  label: string
  Icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
]

export function ThemeToggle({ block = false }: { block?: boolean }) {
  const [theme, setTheme] = useTheme()
  const active = OPTIONS.find((option) => option.value === theme) ?? OPTIONS[2]
  const ActiveIcon = active.Icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={block ? "default" : "icon"}
          className={block ? "w-full justify-start" : undefined}
          aria-label="Change theme"
        >
          <ActiveIcon />
          {block && <span>{active.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {OPTIONS.map(({ value, label, Icon }) => (
          <DropdownMenuItem key={value} onSelect={() => setTheme(value)}>
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
