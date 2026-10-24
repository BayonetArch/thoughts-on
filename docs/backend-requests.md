# Backend requests

These are changes the frontend needs from the backend owner (Sudi).

## 1. CORS origin is hardcoded to localhost

**File:** `backend/middleware/cors.ts`

`Access-Control-Allow-Origin` is always `http://localhost:3000`. In production the
frontend is served from a different origin, so the browser blocks the response
and never stores the session cookie, even when the request uses
`credentials: "include"`.

**Needed:** allow the deployed frontend origin (ideally from an environment
variable or an allowlist), and keep `Access-Control-Allow-Credentials: true`.
The response must echo one exact origin; `*` is not allowed together with
credentials.

## 2. Session cookie options in production

**File:** `backend/controllers/userController.ts` (`loginUser`)

The cookie is set with `sameSite: "lax"`. If the frontend and API are on
different sites in production, browsers do not send a `Lax` cookie on
cross-site `fetch` requests.

**Needed:** `sameSite: "none"` together with `secure: true` (HTTPS only) when
the frontend and API are on different sites. If they share a site (for example
`app.example.com` and `api.example.com`), `Lax` is fine.

`logoutUser` should also call `clearCookie` with the same `sameSite`/`secure`
options that were used when setting the cookie.

## 3. Login/register read the wrong password field

**File:** `backend/controllers/userController.ts`

The Zod schema (`backend/schemas/userSchema.ts`) validates a field named
`password`, but `registerUser` and `loginUser` destructure a field named `pass`:

```ts
const { username, pass } = req.body;
```

`pass` is therefore always `undefined`, so `Bun.password.hash` / `verify` cannot
work and login never reaches the `res.cookie(...)` call.

**Needed:** read `password` in both controllers (or rename the schema field).

## 4. Login response shape differs from /api/auth/me

`POST /api/auth/login` returns:

```json
{ "ok": true, "loggedIn": { "username": "...", "id": "..." } }
```

but `GET /api/auth/me` returns:

```json
{ "ok": true, "user": { "username": "...", "id": "..." } }
```

The frontend currently accepts both (`data.user ?? data.loggedIn`), but one
consistent shape (preferably `user`) would be safer.

## 5. Thoughts return the author username

**File:** `backend/controllers/thoughtController.ts`

`GET /api/thoughts` and `GET /api/thoughts/me` return `user_id` only. The feed
and the profile page therefore show a raw UUID where the author name belongs.
The frontend cannot resolve the name with the current endpoints.

**Needed:** join `thoughts` with the users table and add `username` to each
thought row, keeping the existing fields.

Expected shape:

```json
{
  "ok": true,
  "thoughts": [
    {
      "id": "1",
      "user_id": "eb1c1b23-54f2-46a0-a327-d85a6f7e399b",
      "username": "sudip",
      "thought": "Hello world?",
      "created_at": "2026-10-24T08:12:00.000Z"
    }
  ]
}
```

The frontend will switch the card header from `user_id` to `username`.

