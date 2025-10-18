# DigitalOcean Deployment Update Instructions

## Important: Configuration Change Required

The MA-Landing app needs to be updated from a **static site** to a **service** configuration to support server-side rendering.

### Manual Update Steps:

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Find the `ma-landing` app
3. Click on **Settings** → **App Spec**
4. Click **Edit** and replace the entire spec with the configuration below:

```yaml
name: ma-landing
region: nyc

services:
- name: web
  github:
    repo: nabbilkhan/MA-Landing
    branch: main
    deploy_on_push: true

  build_command: npm ci && npm run build
  run_command: npm start

  environment_slug: node-js
  instance_size_slug: basic-xxs
  instance_count: 1
  http_port: 3000

  health_check:
    http_path: /
    initial_delay_seconds: 30
    period_seconds: 30
    timeout_seconds: 10
    success_threshold: 1
    failure_threshold: 3

  routes:
  - path: /

  cors:
    allow_origins:
    - prefix: https://app.mentoragile.com
    - prefix: https://mentor-agile-dashboard-sdeeo.ondigitalocean.app
    allow_methods:
    - GET
    - POST
    - PUT
    - DELETE
    - HEAD
    - OPTIONS
    allow_headers:
    - Content-Type
    - Authorization

  envs:
  - key: NODE_ENV
    value: "production"
  - key: PORT
    value: "3000"
  - key: NEXT_PUBLIC_SITE_URL
    value: "https://mentoragile.com"
  - key: NEXT_PUBLIC_API_URL
    value: "https://app.mentoragile.com/api"
```

5. Click **Save**
6. The app will automatically redeploy with the new configuration

### What Changed:

- ✅ Changed from `static_sites` to `services` (enables server-side rendering)
- ✅ Changed from static build to Node.js runtime
- ✅ Homepage now displays course-landing directly (no redirect)
- ✅ Site works exactly like the original monolith

### Verification:

After deployment completes, visit https://mentoragile.com and verify:
1. No redirect error messages
2. Course landing page loads directly
3. All animations and interactions work properly

### Alternative: Recreate the App

If updating the spec doesn't work, you can:
1. Delete the current `ma-landing` app
2. Create a new app from the GitHub repository
3. Use the spec above during creation
4. Update DNS to point to the new app URL