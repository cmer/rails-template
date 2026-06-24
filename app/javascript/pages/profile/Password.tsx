import { FormEvent } from "react"
import { Head, useForm, usePage } from "@inertiajs/react"
import { AppShell } from "@/components/AppShell"
import { PageHeader } from "@/components/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileSubNav } from "./ProfileSubNav"

import type { PageProps } from "@/types/inertia"

export default function ProfilePassword() {
  const { props } = usePage<PageProps>()
  const errors = props.errors ?? {}

  const passwordForm = useForm({ current_password: "", password: "" })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    passwordForm.patch("/profile/password", {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
    })
  }

  return (
    <>
      <Head title="Password">
        <meta name="description" content="Change the password used to log in to your account." />
        <meta property="og:title" content="Password" />
        <meta property="og:description" content="Change the password used to log in to your account." />
      </Head>
      <AppShell>
        <PageHeader
          title="Profile"
          description="Manage your account."
          tabs={<ProfileSubNav active="password" />}
        />

        {props.flash?.notice && (
          <p className="mt-6 text-sm text-primary">{props.flash.notice}</p>
        )}

        <section className="mt-10 max-w-md">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current password</Label>
              <Input
                id="current_password"
                type="password"
                autoComplete="current-password"
                required
                aria-invalid={!!errors.current_password}
                value={passwordForm.data.current_password}
                onChange={(e) =>
                  passwordForm.setData("current_password", e.target.value)
                }
              />
              {errors.current_password && (
                <p className="text-xs text-destructive">{errors.current_password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                aria-invalid={!!errors.password}
                value={passwordForm.data.password}
                onChange={(e) =>
                  passwordForm.setData("password", e.target.value)
                }
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>
            <Button type="submit" disabled={passwordForm.processing}>
              Update password
            </Button>
          </form>
        </section>
      </AppShell>
    </>
  )
}
