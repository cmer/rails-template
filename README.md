# cmer's Rails Template

A full-stack Rails application template with **Rails 8**, **Inertia.js**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn**, and **PostgreSQL**.

This template is meant to be a practical starting point for product apps: authentication, admin scaffolding, a shadcn-backed design-system reference, SSR, background jobs, caching, WebSockets, and deployment notes are already wired up.

## What's Included

- Rails 8 + Inertia.js, with React pages in `app/javascript/pages`
- React 19 + TypeScript 6 + Vite 8
- Tailwind CSS v4 and shadcn components in `app/frontend/components/ui`
- Live design-system reference at `/admin/design-system`
- Session authentication, signup, password reset, profile email/password updates
- Admin namespace with user index/detail pages
- PostgreSQL as the single database for Active Record, Solid Queue, Solid Cache, and Solid Cable
- Inertia SSR support for crawler-visible public pages
- Minitest, system tests, RuboCop, Brakeman, and TypeScript checking
- Hatchbox deployment notes in `docs/hatchbox-deployment-guide.md`

## Quick Start

```bash
bin/setup      # installs gems, creates and migrates the database
npm install    # installs JS dependencies
bin/dev        # starts Rails (:3000), Vite (:5173), and Solid Queue
```

Requires:

- Ruby 4.0.5
- Node 22.12+
- PostgreSQL 10+

## Design System

The design system is shadcn-backed. Use `components.json` as the source of truth for aliases, component paths, and theme configuration.

This repo includes the shadcn/ui AI skill at `.agents/skills/shadcn`, locked in `skills-lock.json`. The skill reads `components.json` and gives compatible agents project-aware shadcn context for component APIs, installed components, theming, registries, and CLI workflows.

Useful commands:

```bash
npx shadcn@latest info --json
npx shadcn@latest add button --diff
npx shadcn@latest add dialog -y
npx shadcn@latest docs button dialog select
```

The live reference page is available at `/admin/design-system` for admin users.

## Development Checks

```bash
npm run check          # TypeScript
bin/rails test         # Rails tests
bin/rails test:system  # System tests
bin/rubocop            # Ruby style
bin/brakeman           # Security scan
```

## Forking Into a Real App

After creating an app from this template, search and replace the template placeholders with the real application name.

Replace these strings:

- `cmer's Rails Template` → your human-readable app name, for example `Acme`
- `cmer-rails-template` → your package/app identifier, for example `acme`
- `Starter landing page for cmer's Rails Template` → your real public landing-page description

Then update the remaining app-specific details:

- App name in `app/views/layouts/application.html.erb`, `app/frontend/components/MainNav.tsx`, and `app/views/pwa/manifest.json.erb`
- Public landing-page copy in `app/javascript/pages/Home.tsx`
- `APP_HOST`, `public/robots.txt`, and `public/llms.txt`
- Icons in `public/`
- Deployment-specific settings and credentials

## Attribution

This template was forked from [buildermethods/build-new](https://github.com/buildermethods/build-new) and adapted for cmer's shadcn design-system workflow.
