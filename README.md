# CampusEats deployment preparation

The repository contains `CampusEats.Api Frontend` (Vite/React) and
`CampusEats.Api Backend` (ASP.NET Core 8).

## Frontend build

Use Node.js 22.12 or later in the Node 22 series (or a compatible newer version).

```powershell
cd 'CampusEats.Api Frontend'
Copy-Item .env.example .env
npm install
npm run build
npm run preview
```

The production site is generated in `dist/`. Set `VITE_API_URL` to the backend
origin before building, for example `https://your-api.example.com`. It is read
by `src/config.js` and used to fetch `/api/menu`. Trailing slashes are removed.
If omitted, requests use the frontend's own origin (requires an API reverse proxy).
Vite embeds this value at build time; rebuild after changing it. Never put secrets
in `VITE_*` variables. Configure the static host to send client-side routes such
as `/dish/1` and `/order` to `index.html`.

## Backend configuration

ASP.NET Core already reads environment variables through its default configuration.
Double underscores map to nested configuration keys. `.env.example` is documentation;
the backend does not load it automatically.

| Tier | Variable | Value/purpose |
| --- | --- | --- |
| Frontend | `VITE_API_URL` | Public backend origin, set before the build |
| Backend | `ConnectionStrings__Default` | Database connection string; reserved for a future database implementation |
| Backend | `Jwt__Key` | Secret signing key; reserved for a future JWT implementation |
| Backend | `Cors__AllowedOrigins__0` | Frontend origin, e.g. `https://your-site.example.com`, without a trailing slash |
| Backend | `Cors__AllowedOrigins__1` | Optional second permitted frontend origin |

The current menu service stores data in memory; changes disappear on restart.
There is currently no database or JWT authentication, so the two reserved variables
are not consumed by application code. Set real secrets only on the backend host
when those features are implemented.

For local development in a separate PowerShell terminal:

```powershell
cd 'CampusEats.Api Backend'
$env:Cors__AllowedOrigins__0 = 'http://localhost:5173'
$env:Cors__AllowedOrigins__1 = 'http://localhost:4173'
dotnet run --launch-profile http
```

For a backend production build, run `dotnet publish -c Release` from the backend
folder. Use HTTPS for the production API. Review dependencies with `npm audit`.

## Repository hygiene

The root `.gitignore` excludes `node_modules/`, `dist/`, `.env` and its variants,
`bin/`, and `obj/`. Placeholder `.env.example` files are allowed. No credentials
were found in the application source or appsettings files during preparation.
Commit package manifests and `package-lock.json`; keep real secrets outside Git.
