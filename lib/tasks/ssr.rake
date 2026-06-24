# frozen_string_literal: true

# rails-vite-plugin's `vite:build` builds only the client bundle. The Inertia
# SSR bundle (ssr/ssr.js) is a separate Vite build (`vite build --ssr`), so wire
# it into `assets:precompile` as well — otherwise production deploys ship without
# an SSR bundle and the Inertia renderer silently falls back to client-only
# rendering, leaving crawlers an empty <div id="app">. This restores the
# "no extra build step on deploy" behavior vite_ruby gave us via ssrBuildEnabled.
namespace :vite do
  desc "Build the Inertia SSR bundle (ssr/ssr.js)"
  task :build_ssr do
    command = "#{RailsVite::Tasks.build_command} --ssr"
    system(command) || raise("rails_vite: SSR build failed, ensure `#{command}` runs without errors")
  end
end

if Rake::Task.task_defined?("assets:precompile") &&
   !ENV["SKIP_VITE_BUILD"] && !ENV["SKIP_VITE_SSR_BUILD"]
  Rake::Task["assets:precompile"].enhance(["vite:build_ssr"])
end
