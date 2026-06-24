import * as React from "react"
import { Link, router, usePage } from "@inertiajs/react"
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"
import type { PageProps } from "@/types/inertia"

const STORAGE_KEY = "main-nav-open"
const BRAND = "cmer's Rails Template"

export type NavItemDef = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  match: (url: string) => boolean
}

const DEFAULT_NAV_ITEMS: NavItemDef[] = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
    match: (url) => url === "/" || url.startsWith("/dashboard"),
  },
]

function useMainNavOpen() {
  const [open, setOpen] = React.useState<boolean>(true)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored !== null) setOpen(stored === "true")
  }, [])
  React.useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, String(open))
  }, [open])
  return [open, setOpen] as const
}

export function MainNav({
  items = DEFAULT_NAV_ITEMS,
  brandHref = "/dashboard",
}: {
  items?: NavItemDef[]
  brandHref?: string
} = {}) {
  const [open, setOpen] = useMainNavOpen()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-background transition-[width] duration-200 lg:flex",
          open ? "w-56" : "w-14",
        )}
      >
        <RailBody
          open={open}
          onToggle={() => setOpen(!open)}
          items={items}
          brandHref={brandHref}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-background shadow-xl">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
              <span className="font-heading text-sm font-semibold text-foreground">
                {BRAND}
              </span>
              <Button
                type="button"
                onClick={() => setMobileOpen(false)}
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <RailNav open items={items} onClose={() => setMobileOpen(false)} />
            <div className="border-t border-border p-2">
              <UserMenu open />
            </div>
          </aside>
        </div>
      )}

      <Button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed right-3 top-3 z-30 lg:hidden"
        variant="outline"
        size="icon"
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </>
  )
}

function RailBody({
  open,
  onToggle,
  items,
  brandHref,
}: {
  open: boolean
  onToggle: () => void
  items: NavItemDef[]
  brandHref: string
}) {
  return (
    <>
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-3 border-b border-border px-3",
          open ? "justify-between" : "justify-center",
        )}
      >
        <Link
          href={brandHref}
          className="flex min-w-0 items-center gap-2 text-foreground no-underline"
          aria-label={BRAND}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent font-heading text-sm font-semibold text-accent-foreground">
            {BRAND.charAt(0)}
          </span>
          {open && (
            <span className="truncate font-heading text-sm font-semibold">
              {BRAND}
            </span>
          )}
        </Link>
        {open && (
          <Button
            type="button"
            onClick={onToggle}
            variant="ghost"
            size="icon"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      <RailNav open={open} items={items} />

      {!open && (
        <div className="border-t border-border p-2">
          <Button
            type="button"
            onClick={onToggle}
            className="w-full"
            variant="ghost"
            size="icon"
            aria-label="Expand sidebar"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="border-t border-border p-2">
        <UserMenu open={open} />
      </div>
    </>
  )
}

function RailNav({
  open,
  items,
  onClose,
}: {
  open: boolean
  items: NavItemDef[]
  onClose?: () => void
}) {
  const { url } = usePage()
  return (
    <nav
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1 p-2 text-sm",
        open ? "overflow-x-hidden overflow-y-auto" : "overflow-visible",
      )}
    >
      {items.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          active={item.match(url)}
          open={open}
          onClick={onClose}
        />
      ))}
    </nav>
  )
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  open,
  onClick,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
  open: boolean
  onClick?: () => void
}) {
  return (
    <div className="group/nav-item relative">
      <Link
        href={href}
        onClick={onClick}
        aria-label={open ? undefined : label}
        className={cn(
          "flex items-center gap-3 rounded-md no-underline",
          open ? "px-3 py-2" : "mx-auto h-9 w-9 justify-center",
          active
            ? "bg-accent text-accent-foreground"
            : "text-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {open && <span className="truncate">{label}</span>}
      </Link>
      {!open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-[13px] -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover/nav-item:opacity-100"
        >
          {label}
        </span>
      )}
    </div>
  )
}

function UserMenu({ open }: { open: boolean }) {
  const { props } = usePage<PageProps>()
  const email = props.current_user?.email ?? ""
  const isAdmin = props.current_user?.admin ?? false
  const initial = email.charAt(0).toUpperCase() || "?"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={open ? undefined : email || "Account"}
          className={cn(
            "group/user relative flex w-full cursor-pointer items-center gap-3 rounded-md text-left text-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            open ? "px-2 py-2" : "h-10 justify-center",
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {initial}
          </span>
          {open ? (
            <span className="min-w-0 flex-1 truncate text-sm">{email}</span>
          ) : (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity group-hover/user:opacity-100">
              {email}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuLabel className="normal-case tracking-normal">
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
            Signed in as
          </span>
          <span className="block truncate text-xs font-medium text-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="no-underline">
            <User /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="no-underline">
            <Settings /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <ThemeToggle block />
        </div>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/admin/users" className="no-underline">
              <Shield /> Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            router.delete("/logout")
          }}
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
