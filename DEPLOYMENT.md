# Task 03: Backend API deployment

## Status

Docker deployment files and environment-based CORS are prepared. A live Render
deployment has not been created or verified from this session: no connected Render
account/browser session is available. Docker is also unavailable locally, so the
container image itself has not been built here. Complete the dashboard steps below
and capture the real screenshots after deployment. No deployed URL is claimed.

## Render deployment steps

1. Sign in at https://dashboard.render.com and choose **New → Web Service**.
2. Connect https://github.com/sadilapunchihewa/campusEats and select branch `main`.
3. Name the service `campuseats-api`, choose **Docker** runtime, and select the
   desired region and instance plan.
4. Set **Root Directory** to `CampusEats.Api Backend`. With this root, set
   **Dockerfile Path** to `./Dockerfile` and Docker context to `.` if requested.
   Leave the Docker command override empty: the image already has an entrypoint.
5. Set **Health Check Path** to `/health`.
6. Set `ASPNETCORE_ENVIRONMENT=Production` and
   `Cors__AllowedOrigins__0=https://YOUR-FRONTEND.vercel.app`. Replace the example
   with the actual frontend origin, with no path or trailing slash. Do not add quotes
   in the dashboard. Add further origins as `Cors__AllowedOrigins__1`, etc.
7. Create the web service and wait for the deploy status to become **Live**.
8. Copy the actual Render service URL. Open `https://YOUR-SERVICE.onrender.com/api/menu`
   and `/health`. The menu should return a JSON array of the three initial dishes;
   health should return `{"status":"healthy"}`.
9. Set the frontend host's `VITE_API_URL` to that actual backend origin and redeploy
   the frontend, because Vite embeds this variable during the build. Check the menu
   in the deployed frontend to verify CORS as well as API availability.

Alternatively, create a **Blueprint** from this repository. The root `render.yaml`
already supplies the Dockerfile/context paths and health endpoint; enter the actual
frontend origin when prompted for `Cors__AllowedOrigins__0`.

## Environment variables

| Variable | Purpose | Required now? |
| --- | --- | --- |
| `PORT` | Host-provided HTTP port; code binds to `0.0.0.0` | Supplied by the platform |
| `ASPNETCORE_ENVIRONMENT` | Run the API in `Production` | Set to `Production` |
| `Cors__AllowedOrigins__0` | Actual deployed frontend origin | Yes, for browser calls |
| `ConnectionStrings__Default` | Future database connection secret | No database code yet |
| `Jwt__Key` | Future JWT signing secret | No JWT code yet |

ASP.NET Core reads environment variables by default. Do not commit real connection
strings or signing keys. `.env.example` is documentation and is not automatically
loaded by the API. The current service uses in-memory data; writes are lost on
restart. Swagger is enabled only in Development, so use `/api/menu` in production.
The Render/Railway edge serves HTTPS; the container listens on HTTP internally.

## Local Docker verification (when Docker is installed)

Run from the repository root:

```powershell
docker build -t campuseats-api './CampusEats.Api Backend'
docker run --rm -p 8080:8080 -e PORT=8080 -e Cors__AllowedOrigins__0=http://localhost:5173 campuseats-api
```

Open http://localhost:8080/api/menu and http://localhost:8080/health.

## Railway alternative

Create a project from the same GitHub repository. Set the service root to
`CampusEats.Api Backend` so Railway finds the Dockerfile. Use the same environment
variables above, generate a public domain, then test `/api/menu` and `/health`.
The application honours Railway's `PORT`; .NET auto-detection is not required.

## Screenshot evidence to capture after deployment

- Render dashboard showing the service name, **Live** status, and actual public URL.
- Browser showing that public URL followed by `/api/menu` and the successful JSON response.
- Optional: deployed frontend displaying the menu successfully.

Dashboard and public-response screenshots are pending until a real cloud deployment
is completed. Local build/startup checks do not replace cloud deployment evidence.

## References

- https://render.com/docs/docker
- https://render.com/docs/web-services#port-binding
- https://render.com/docs/configure-environment-variables
- https://render.com/docs/blueprint-spec
