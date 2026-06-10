# Waves MVMNT — Complete Workflow Guide

This project supports **3 separate workflows**. Read below to find which one matches your situation, then follow the steps exactly.

---

## Which Workflow Is Yours?

| I have... | Use Workflow |
|---|---|
| An existing Shopify store I want to edit directly | → **Workflow A** |
| A Figma design URL and want a full storefront | → **Workflow B** |
| HTML files / images and want a full storefront | → **Workflow C** |

---

---

# WORKFLOW A — Direct Shopify Store Management

**Use this when:** You already have a live Shopify store and want to add/edit products, collections, orders, themes, discounts, inventory — directly via Claude prompts. No code, no GitHub, no deployment needed.

---

### What You Need Before Starting

- Your Shopify store URL (`yourstore.myshopify.com`)
- An Admin API Access Token (`shpat_...`)

**How to get the token:**
1. Go to your Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** → **"Create an app"**
3. Name it anything (e.g. "Claude MCP") → click **Create app**
4. Go to **"Configure Admin API scopes"** tab
5. Enable these scopes:
   - `read_products`, `write_products`
   - `read_inventory`, `write_inventory`
   - `read_orders`, `write_orders`
   - `read_customers`, `write_customers`
   - `read_themes`, `write_themes`
   - `read_collections`, `write_collections`
   - `read_price_rules`, `write_price_rules`
   - `read_discounts`, `write_discounts`
6. Click **Save** → **Install app** → **Install**
7. Copy the **Admin API access token** — it starts with `shpat_`

---

### Step-by-Step

**Step 1** — Open Claude Code in any folder (this project or anywhere else)

**Step 2** — Type:
```
/shopify-store
```

**Step 3** — Give Claude your credentials when asked:
```
Store URL: yourstore.myshopify.com
Token: shpat_xxxxxxxxxxxxxxxx
```

**Step 4** — Now just talk to Claude in plain English:

```
"Show me all my products"
"Add a new product called Blue Cap, price $29.99, 100 units in stock"
"Update the price of product ID 123456 to $45"
"Show me all open orders"
"Create a 20% discount code WELCOME20"
"Add 50 units of stock to product Blue Cap"
"Show me all collections"
"List all files in my active theme"
"Edit the header section of my theme"
```

**Step 5** — Claude executes the operation and confirms what was done, including the Shopify Admin URL where you can verify the change.

---

### What Claude Can Do in Workflow A

| Category | Operations |
|---|---|
| **Products** | List, create, edit, delete, search |
| **Variants** | Add sizes/colors, update prices, edit SKUs |
| **Inventory** | Add/remove stock, check levels |
| **Collections** | Create, edit, add products to collection |
| **Orders** | View, cancel, update tags/notes |
| **Customers** | List, create, edit, add tags |
| **Themes** | Read/edit any Liquid, CSS, or JS file |
| **Discounts** | Create price rules, generate coupon codes |
| **Metafields** | Add/edit custom fields on any resource |

---

---

# WORKFLOW B — Figma Design → Full Shopify Storefront

**Use this when:** You have a Figma design URL and want to convert it into a live Next.js storefront connected to Shopify, deployed on Netlify.

**End result:** A fully deployed storefront at a Netlify URL, powered by Shopify's Storefront API.

---

### What You Need Before Starting

- A Figma file URL (e.g. `https://www.figma.com/design/xxxx/StoreName`)
- Figma account access to that file
- A Shopify store with a **Storefront API token** (different from Admin API — see below)
- A GitHub account (Claude will create the repo automatically)
- A Netlify account (Claude will create the site automatically)

**How to get Storefront API token:**
1. Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** → **"Create an app"**
3. Go to **"Storefront API scopes"** tab (not Admin API)
4. Enable: `unauthenticated_read_product_listings`, `unauthenticated_read_collection_listings`
5. Click **Save** → **Install app**
6. Copy the **Storefront API access token**

---

### Step-by-Step

---

**Step 1 — Convert Figma to HTML**

Type:
```
/figma-to-html
```

When prompted, paste your Figma URL:
```
https://www.figma.com/design/xxxx/StoreName
```

Claude will:
- Connect to Figma
- Extract every section of every page
- Save HTML files to `claude-input/` folder
- Save all images to `public/` folder

Wait for Claude to say it's done before moving on.

---

**Step 2 — Initialize the Client Project**

Type:
```
/new-client
```

Claude will ask you for:
```
Client name: (e.g. "Blue Ocean Store")
Store handle: (e.g. "blueocean" — used for folder and GitHub repo name)
Shopify store URL: yourstore.myshopify.com
Shopify Storefront API token: (the token from above — starts with shpacf_ or similar)
```

Claude will:
- Create `design.md` with layout notes
- Set up `project-registry.json` with your project info
- Confirm everything is ready for Session 1

---

**Step 3 — Convert HTML to Next.js (Session 1)**

Type:
```
/session1
```

Claude will:
- Read all HTML files in `claude-input/`
- Convert each page into a Next.js 14 App Router page
- Build reusable React components
- Wire up TypeScript types
- Verify all images are correctly referenced
- Run TypeScript check — fix any errors
- Update the project registry

This step takes the longest. Let Claude finish completely before moving on.

---

**Step 4 — Wire Shopify + Deploy (Session 2)**

Type:
```
/session2
```

Claude will automatically:
- Connect Shopify Storefront API to your Next.js app
- Create a GitHub repository and push all code
- Create a Netlify site
- Deploy your storefront to Netlify
- Give you the live URL

At the end, Claude will show:
```
GitHub: https://github.com/yourusername/blueocean-store
Netlify: https://blueocean-store.netlify.app
```

---

**Step 5 — Verify (Optional but Recommended)**

At any point you can run:
```
/verify
```

This checks:
- TypeScript errors (must be zero)
- Image paths (all images must be found in `public/`)

---

---

# WORKFLOW C — HTML Files → Full Shopify Storefront

**Use this when:** You already have HTML files and image assets, and want to convert them into a live Next.js storefront connected to Shopify, deployed on Netlify.

**End result:** Same as Workflow B — a live Netlify URL powered by Shopify.

---

### What You Need Before Starting

- Your HTML files (homepage, product page, collection page, etc.)
- Your image/asset files
- A Shopify Storefront API token (see Workflow B → "How to get Storefront API token")
- A GitHub account
- A Netlify account

---

### Step-by-Step

---

**Step 1 — Place Your Files**

Manually copy your files into the project:

```
claude-input/
  ├── index.html          ← homepage
  ├── product.html        ← product page
  ├── collection.html     ← collection/shop page
  ├── about.html          ← about page (if any)
  └── contact.html        ← contact page (if any)

public/
  ├── hero-image.jpg
  ├── logo.png
  └── (all other images)
```

> **Note:** Put ALL HTML files in `claude-input/` and ALL images in `public/`. Claude will find them automatically.

---

**Step 2 — Initialize the Client Project**

Type:
```
/new-client
```

Claude will ask you for:
```
Client name: (e.g. "Faisal Store")
Store handle: (e.g. "faisalstore" — used for folder and GitHub repo name)
Shopify store URL: yourstore.myshopify.com
Shopify Storefront API token: (your token)
```

Claude will:
- Create `design.md` describing the layout based on your HTML
- Set up `project-registry.json`
- Confirm everything is ready

---

**Step 3 — Convert HTML to Next.js (Session 1)**

Type:
```
/session1
```

Claude will:
- Read all your HTML files from `claude-input/`
- Convert each one into a Next.js page component
- Build shared components (header, footer, etc.)
- Fix all image paths to use `next/image`
- Run TypeScript check
- Update the project registry

---

**Step 4 — Wire Shopify + Deploy (Session 2)**

Type:
```
/session2
```

Claude will automatically:
- Connect your Shopify Storefront API
- Create a GitHub repo and push code
- Create and deploy to Netlify
- Give you the live URL

---

**Step 5 — Verify (Optional but Recommended)**

```
/verify
```

Checks TypeScript errors and image paths.

---

---

# Skills Reference

| Skill | When to Use | What It Does |
|---|---|---|
| `/shopify-store` | Workflow A | Direct store management via Shopify Admin API |
| `/figma-to-html` | Workflow B (Step 1) | Converts Figma design to HTML + images |
| `/new-client` | Workflow B & C (Step 2) | Initializes project, saves credentials |
| `/session1` | Workflow B & C (Step 3) | HTML → Next.js conversion |
| `/session2` | Workflow B & C (Step 4) | Shopify wiring + GitHub + Netlify deploy |
| `/verify` | Workflow B & C (anytime) | TypeScript check + image path validation + Playwright visual check |
| `/status` | Workflow B & C (anytime) | Shows what's done and what's next |
| `/handoff` | End of any session | Saves session state for next time |

---

# Common Questions

**Q: Can I use Workflow A and Workflow B/C together?**
Yes. They are completely separate. Workflow A edits your live store directly. Workflows B/C build a Next.js frontend and deploy it. They don't interfere with each other.

**Q: What's the difference between Admin API token and Storefront API token?**
- **Admin API token** (`shpat_...`) — for Workflow A. Full access to your store backend. Keep it private.
- **Storefront API token** — for Workflows B/C. Read-only access to products/collections for the frontend. Safe to include in frontend code.

**Q: My session was interrupted. How do I continue?**
Type `/status` — Claude will read the saved state and tell you exactly where to continue.

**Q: I got a TypeScript error in Session 1. What do I do?**
Don't run `/session2` yet. Tell Claude the error and it will fix it. Then re-run `/verify` to confirm it's clean.

**Q: Can I run multiple client projects?**
Yes. Each `/new-client` sets up a separate project tracked in `project-registry.json`. Use `/status` to see the current active project.

---

*Waves MVMNT Shopify Pipeline — Built with Next.js 14, Tailwind CSS, Shopify Storefront API, GitHub, Netlify*
