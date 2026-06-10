# Waves Shopify Pipeline — Figma → Next.js → Live Storefront

An automated pipeline that turns a **Figma design** into a **headless Shopify storefront** (Next.js 14 App Router + Tailwind v4 + vercel/commerce boilerplate), then pushes it to **GitHub** and deploys to **Netlify** — driven entirely by Claude Code skills.

This repo is a **reusable starter kit**. You run a handful of slash-commands and each new client storefront is generated on top of the same boilerplate. Nothing about any single client is baked into the kit.

---

## 1. What this kit does

| Skill (slash command) | What it does |
|---|---|
| `/figma-to-html` | Reads a Figma file via the Figma MCP and writes clean HTML + `design.md` into `claude-input/`, downloads images into `public/` |
| `/new-client` | Scaffolds a fresh project state: `project-registry.json`, `claude-input/design.md`, `session-handoff.md` |
| `/session1` | Converts the HTML in `claude-input/` into Next.js pages + components, wires them to the Shopify Storefront API, runs `tsc`, verifies image paths |
| `/session2` | Local build check → creates GitHub repo → deploys to Netlify (sets env vars via CLI) |
| `/verify` | Runs `tsc --noEmit` + image path check |
| `/status` | Prints current build progress from the registry |
| `/handoff` | Saves session state to `session-handoff.md` + registry |
| `/shopify-store` | Manage ANY live store directly via Admin REST API (curl). Needs store domain + `shpat_` token |
| `/shopify-mcp` | Manage a pre-connected store via the Shopify Admin MCP (50 tools, no creds in chat) |

Typical flow for a new client:

```
/figma-to-html <figma-url>   →   /new-client <Name> <store.myshopify.com>   →   /session1   →   /session2
```

---

## 2. Prerequisites (install these once)

| Tool | Version | Install |
|---|---|---|
| **Node.js** | 20+ | https://nodejs.org |
| **pnpm** | 9+ | `npm install -g pnpm` |
| **Git** | any | https://git-scm.com |
| **GitHub CLI** (`gh`) | latest | https://cli.github.com — then `gh auth login` |
| **Netlify CLI** | latest | `npm install -g netlify-cli` — then `netlify login` |
| **Claude Code** | latest | the CLI you're running these skills in |

> On Windows the skills use **PowerShell** syntax. On macOS/Linux a couple of `/session2` snippets use bash — they work the same, just run them in your shell.

---

## 3. Install the project

```bash
pnpm install
```

That installs everything in `package.json` (Next.js 15 canary, React 19, Tailwind v4, Headless UI, Heroicons, Geist, Sonner, etc.). **Do not add new npm packages** without a reason — the boilerplate is intentionally lean.

---

## 4. MCP servers (required for the skills)

The skills call three MCP integrations. Configure whichever ones you need.

### a) Shopify Admin MCP — used by `/shopify-mcp`
Add this to `~/.claude/.mcp.json` (create the file if it doesn't exist). **Use your OWN token and domain** — never commit a real `shpat_` token:

```json
{
  "mcpServers": {
    "shopify-admin": {
      "command": "npx",
      "args": ["-y", "@ajackus/shopify-mcp-server"],
      "env": {
        "SHOPIFY_ACCESS_TOKEN": "shpat_YOUR_ADMIN_TOKEN_HERE",
        "MYSHOPIFY_DOMAIN": "your-store.myshopify.com"
      }
    }
  }
}
```

Get the Admin token: **Shopify Admin → Settings → Apps and sales channels → Develop apps → [your app] → API credentials → Admin API access token** (starts with `shpat_`).

The first run downloads the server via `npx` automatically.

### b) Figma MCP — used by `/figma-to-html`
Provided by the **Figma plugin/connector for Claude Code**. Install the Figma connector and run the Figma desktop app (Dev Mode MCP). Once connected, tools like `get_metadata`, `get_design_context`, `get_screenshot` become available. No token goes in this repo.

### c) Shopify Dev MCP — referenced by `/session2`
Optional helper for validating Storefront API queries. Comes from the Shopify Dev connector; not required to ship a site.

> **`/shopify-store`** needs **no MCP** — it talks to the Admin REST API with `curl` using a domain + `shpat_` token you paste into the chat at runtime.

---

## 5. Environment variables

The kit ships only `.env.example`. For local dev, copy it to `.env.local` and fill the Storefront (not Admin) credentials:

```bash
COMPANY_NAME="Your Store Name"
SITE_NAME="Your Store Name"
SHOPIFY_REVALIDATION_SECRET="any-random-string"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-token"
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
NEXT_PUBLIC_SITE_URL="https://localhost:3000"
```

- **Storefront Access Token**: Shopify Admin → Settings → Apps → Develop apps → [app] → **API credentials → Storefront API access token**.
  Required scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_read_checkouts`, `unauthenticated_write_checkouts`.
- `/session1` writes this file for you when you paste your token.
- The boilerplate wraps all Shopify calls in try/catch, so the site still builds with placeholder/missing credentials.
- `.env.local` is **git-ignored** — it never gets committed or shared.

Run it:

```bash
pnpm dev      # http://localhost:3000
pnpm build    # production build check
```

---

## 6. What's static vs per-client (important if you fork/share this)

**Static — the reusable kit (always present, send this):**
`.claude/skills/`, `lib/` (Shopify boilerplate — never modify), the boilerplate `components/` and `app/` routes, `fonts/`, and all config: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `netlify.toml`, `.gitignore`, `.env.example`, `README.md`.

**Per-client — regenerated every build (do NOT ship a previous client's copy):**
`claude-input/`, `public/` images, `.env.local`, `project-registry.json`, `session-handoff.md`, the customized `app/page.tsx` + page/section components, `app/globals.css` theme block, and any client-named files (logos, brand components).

**Never share / never commit:** `node_modules/`, `.next/`, `.netlify/`, `.env.local`, `~/.claude/.mcp.json` (contains a live `shpat_` token), and `.claude/settings.local.json` (may contain tokens in allow-rules).

---

## 7. Protected files — never modify

- `lib/shopify/` (all files), `lib/shopify/types.ts`, `lib/shopify/queries/`
- `package.json` / `pnpm-lock.yaml`

---

## Built on

[vercel/commerce](https://github.com/vercel/commerce) — a high-performance, server-rendered Next.js App Router ecommerce template using React Server Components, Server Actions, `Suspense`, and `useOptimistic`. The original provider integrations and deployment guide remain valid; this kit layers a Figma→deploy automation on top.
