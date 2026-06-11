# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    # this allows the frontend in 5173 port to fetch for data to the backend
    allow do
        origins "http://localhost:5173"

        resource "*",
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
end