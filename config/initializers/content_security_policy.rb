# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy.
# See the Securing Rails Applications Guide for more information:
# https://guides.rubyonrails.org/security.html#content-security-policy-header

# Rails.application.configure do
#   config.content_security_policy do |policy|
#     policy.default_src :self, :https
#     policy.font_src    :self, :https, :data
#     policy.img_src     :self, :https, :data
#     policy.object_src  :none
#     policy.script_src  :self, :https
# Allow the Vite dev server (@vite/client + HMR) in development. RailsVite.dev_server_csp_source
# resolves per request, so it tracks Vite's actual port and adds nothing when the server is down.
#    if Rails.env.development?
#      policy.script_src  *policy.script_src, :unsafe_eval, RailsVite.dev_server_csp_source
#      policy.style_src   *policy.style_src, RailsVite.dev_server_csp_source
#      policy.connect_src *policy.connect_src, RailsVite.dev_server_csp_source(websocket: true)
#    end

# You may need to enable this in production as well depending on your setup.
#    policy.script_src *policy.script_src, :blob if Rails.env.test?

#     policy.style_src   :self, :https

#     # Specify URI for violation reports
#     # policy.report_uri "/csp-violation-report-endpoint"
#   end
#
#   # Generate session nonces for permitted importmap, inline scripts, and inline styles.
#   config.content_security_policy_nonce_generator = ->(request) { request.session.id.to_s }
#   config.content_security_policy_nonce_directives = %w(script-src style-src)
#
#   # Report violations without enforcing the policy.
#   # config.content_security_policy_report_only = true
# end
