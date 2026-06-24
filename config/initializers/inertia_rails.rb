# frozen_string_literal: true

InertiaRails.configure do |config|
  config.version = RailsVite.digest
  # Encrypting full page props into history.state on every navigation accumulates
  # memory + Web Crypto work that pushes iOS standalone (Home Screen PWA) sessions
  # toward WebKit's tighter memory ceiling, causing mid-session freezes. Leave off
  # unless an app genuinely needs encrypted history for a security reason.
  config.encrypt_history = false
  config.always_include_errors_hash = true

  # Inertia.js v3's client (@inertiajs/core 3.x) reads the initial page from a
  # <script type="application/json" data-page> element, not the legacy
  # <div id="app" data-page="..."> attribute. The gem still defaults this to
  # false, so without it the React app never mounts ("Cannot read properties of
  # null (reading 'component')"). Required for the v3 frontend in this template.
  config.use_script_element_for_initial_page = true

  # Server-side rendering. Inertia POSTs the page name + props to the SSR
  # Node process (default port 13714) which returns rendered HTML so search
  # engines and LLM crawlers see real content, not an empty <div id="app">.
  # Enabled in production by default; opt in locally with INERTIA_SSR=1
  # after running `npm run build:ssr` and then `npm run ssr`.
  config.ssr_enabled = ENV.fetch("INERTIA_SSR") { Rails.env.production? ? "1" : "0" } == "1"
  config.ssr_url = ENV.fetch("INERTIA_SSR_URL", "http://localhost:13714")
end
