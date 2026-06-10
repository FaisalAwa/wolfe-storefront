# Waves Shopify Pipeline — Complete Structure, Architecture & Workflow Guide

> **Manager Briefing Document**
> Project: `waves-shopify-base` — Figma → Next.js → Live Shopify Storefront pipeline
> Prepared: 2026-06-09 | Current client in repo: **VVS Jewelers (FaisalkiTesting)**

Yeh document teen cheezein cover karta hai:
1. **Project kya hai** (system design + architecture)
2. **Har skill (`/new-client`, `/figma-to-html`, `/session1`, `/session2`) jab chalti hai to konsi files banti / badalti / delete hoti hain**
3. **Konsi files hamesha static rehti hain, konsa folder important hai, aur konsa "fzool" folder bina nuqsaan ke remove ho sakta hai**

---

## 1. Project Kya Hai — Bird's Eye View

Yeh ek **reusable starter kit** hai. Ek hi boilerplate (vercel/commerce) ke upar baar baar naye client ke storefront banaye jaate hain. Kisi bhi single client ki cheez engine mein baked nahi hai.

```
FIGMA DESIGN ──▶ HTML ──▶ Next.js Storefront ──▶ GitHub ──▶ Netlify (LIVE)
   (design)    /figma-   /session1            /session2   /session2
               to-html
```

**Stack:**
| Layer | Technology |
|---|---|
| Framework | Next.js 14+ App Router, TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-based `@theme`, koi `tailwind.config.ts` nahi) |
| Commerce | Shopify Storefront GraphQL API |
| Boilerplate | vercel/commerce |
| Deploy | Netlify (via `gh` + `netlify` CLI) |
| Automation brain | Claude Code Skills (`.claude/skills/`) |

**Architecture — 3 layers:**

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — THE ENGINE (static, har client mein same rehta)    │
│  lib/shopify/  •  boilerplate components  •  config files     │
│  package.json  •  .claude/skills/ (automation logic)          │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 — PER-CLIENT INPUT (har build pe wipe + refill)      │
│  claude-input/ (HTML + design.md)  •  public/ (images)        │
│  .env.local (tokens)  •  project-registry.json (state)        │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3 — GENERATED OUTPUT (skills jo likhti hain)           │
│  app/*/page.tsx  •  components/home/*  •  globals.css theme    │
│  → GitHub repo → Netlify live URL                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Directory Structure (Annotated)

```
waves-shopify-base/
│
├── .claude/                    ⭐ AUTOMATION BRAIN — sabse important
│   ├── skills/                 ← saari skill definitions (SKILL.md) yahan hain
│   │   ├── new-client/
│   │   ├── figma-to-html/
│   │   ├── session1/
│   │   ├── session2/
│   │   ├── verify/
│   │   ├── handoff/
│   │   ├── status/
│   │   ├── shopify-store/      (live store — Admin REST API, koi bhi store)
│   │   └── shopify-mcp/        (live store — MCP, faisallstore3testing)
│   ├── settings.json           (shared settings)
│   ├── settings.local.json     (machine-local, gitignored)
│   └── worktrees/              🗑️ FZOOL — purani agent worktree (neeche dekho)
│
├── app/                        ⭐ GENERATED PAGES (Next.js routes)
│   ├── page.tsx                home page          (per-client edit)
│   ├── about/page.tsx          about page         (per-client edit)
│   ├── product/[handle]/       product page       (mostly wired, light edit)
│   ├── collections/[handle]/   collection page    (per-client edit)
│   ├── cart/page.tsx           cart page
│   ├── search/                 search/filter (boilerplate, static)
│   ├── [page]/                 Shopify CMS pages (boilerplate, static)
│   ├── api/revalidate/         webhook (boilerplate, static)
│   ├── globals.css             ⚙️ @theme block yahan update hota hai
│   ├── layout.tsx              fonts yahan add hote hain
│   ├── error.tsx / not-found.tsx / robots.ts / sitemap.ts  (static)
│   └── opengraph-image.tsx / favicon.ico
│
├── components/                 ⭐ GENERATED + BOILERPLATE mix
│   ├── home/                   ← per-client sections (Hero, FeaturedProducts...)
│   │                             ⚠️ yahan purane clients ka cruft jama hota hai
│   ├── collection/             CollectionGrid, Filters, Sort, Header
│   ├── cart/                   🔒 boilerplate cart system (static)
│   ├── product/                gallery, variant-selector (static)
│   ├── grid/, layout/, icons/  boilerplate (mostly static)
│   └── price.tsx, label.tsx, prose.tsx ... (boilerplate utils, static)
│
├── lib/                        🔒🔒 PROTECTED — KABHI MODIFY NAHI KARNA
│   ├── shopify/                Storefront API client + GraphQL queries
│   │   ├── index.ts, types.ts
│   │   ├── queries/, mutations/, fragments/
│   ├── constants.ts, utils.ts, type-guards.ts
│
├── claude-input/               🔁 PER-CLIENT INPUT (wipe + refill each build)
│   ├── design.md               brand colors, fonts, pages, images map
│   ├── *.html                  Figma se bani HTML files
│   └── screenshots/            *.manifest.json + *-reference.json (verify ke liye)
│
├── public/                     🔁 PER-CLIENT IMAGES (wipe + refill each build)
│   ├── home/, collection/, product/, about/   (current: VVS jewelry images)
│   └── logo.svg, vvs-logo.png
│
├── fonts/                      Inter-Bold.ttf (boilerplate, static)
│
├── node_modules/               🗑️ regenerable (363 MB) — pnpm install se wapas
├── .next/                      🗑️ build cache (72 MB) — gitignored
├── .netlify/                   🗑️ local netlify state (3 MB) — gitignored
│
├── project-registry.json       🔁 STATE FILE — har skill isse parhti/likhti hai
├── session-handoff.md          🔁 STATE FILE — session ke beech progress
├── .env.local                  🔁 PER-CLIENT secrets (tokens) — gitignored
├── .env.example                🔒 template (static)
│
├── package.json                🔒 PROTECTED
├── pnpm-lock.yaml              🔒 PROTECTED
├── pnpm-workspace.yaml         🔒 static
├── next.config.ts              ⚙️ config (static)
├── netlify.toml                ⚙️ deploy config (static)
├── postcss.config.mjs          ⚙️ config (static)
├── tsconfig.json               ⚙️ config (static)
├── next-env.d.ts               auto-generated (gitignored)
├── tsconfig.tsbuildinfo        🗑️ TS cache (232 KB) — regenerable
│
├── make-clean-kit.ps1          🛠️ utility: clean kit copy banata hai (optional)
├── README.md                   📄 docs
├── PROJECT-ANALYSIS.md         📄 purani planning note (fzool — neeche)
├── WORKFLOWS.md                📄 workflow reference doc
├── shopify-access-comparison.md 📄 reference note (fzool — neeche)
└── analysis/                   📄 purani planning note (fzool — neeche)
    └── figma-pipeline-analysis.md
```

**Legend:** ⭐ core/important · 🔒 protected (modify mat karo) · ⚙️ config · 🔁 per-client (badalta hai) · 🗑️ disposable/regenerable · 📄 docs only · 🛠️ utility

---

## 3. Skill-by-Skill Workflow — Konsi Files Change Hoti Hain

Yeh exact behaviour `.claude/skills/*/SKILL.md` se nikala gaya hai.

### 🟢 `/new-client [name] [store-handle]`
**Maqsad:** Naye client ka project initialize karna (khaali shell banata hai).

| Action | Files |
|---|---|
| ✅ CREATE | `claude-input/` folder, `public/` folder |
| ✅ CREATE | `project-registry.json` (sab flags `false`, store handle set) |
| ✅ CREATE | `claude-input/design.md` (default template) |
| ✅ CREATE | `session-handoff.md` (status: NOT STARTED) |
| ❌ DELETE | kuch nahi |
| 🔒 UNTOUCHED | `lib/`, `app/`, `components/`, saari config files |

> **Note:** Agar pehle se ek client repo mein hai aur aap doosra `/new-client` chalate hain, to `project-registry.json` aur `design.md` **overwrite** ho jaate hain.

---

### 🟢 `/figma-to-html [figma-url]`
**Maqsad:** Figma design ko parh kar saaf HTML + design.md banana. **Yeh skill purana client data WIPE karti hai.**

| Action | Files |
|---|---|
| 🗑️ DELETE (Step 0) | `claude-input/*.html`, `claude-input/design.md`, `claude-input/screenshots/` |
| 🗑️ DELETE (Step 0) | `public/` ki saari files **siwaye** `next.svg`, `vercel.svg`, `favicon.ico` |
| ✅ CREATE | `claude-input/screenshots/{page}-reference.json` (har page) |
| ✅ CREATE | `claude-input/screenshots/{page}.manifest.json` (section/logo/icon contract) |
| ✅ CREATE | `public/*.jpg/.png` (Figma se nikaale images) |
| ✅ CREATE | `claude-input/{page}.html` (har full-page frame) |
| ✅ WRITE | `claude-input/design.md` (brand colors, fonts, images, icons, navbar) |
| ✏️ UPDATE | `project-registry.json` (`pages_expected`, `figma_url`, `figma_frames_found`) |
| 🔒 UNTOUCHED | `lib/`, `app/`, `components/`, config |

> ⚠️ **Manager note:** Yeh wahi step hai jahan purana client poora wipe hota hai. Naya Figma chalanay se pehle agar purana client ka kaam save karna hai to backup/commit zaroori hai.

---

### 🟢 `/session1`
**Maqsad:** `claude-input/` ki HTML ko asli Next.js pages + components mein convert karna. **Yeh sabse bara generation step hai.**

| Action | Files |
|---|---|
| ✏️ UPDATE | `app/globals.css` — `@theme {}` block mein brand colors + fonts |
| ✏️ UPDATE | `app/layout.tsx` — Google Fonts import |
| ✏️ WRITE | `.env.local` — Shopify token + store domain + site name (user se token lekar) |
| ✅ CREATE | `app/[route]/page.tsx` — har HTML page ka Next.js version (home, about, product, collection...) |
| ✅ CREATE | `components/home/*.tsx` — har section ka reusable component |
| ✏️ UPDATE | `components/layout/navbar/index.tsx` — links + collections dropdown |
| ✏️ UPDATE | `components/cart/open-cart.tsx`, `modal.tsx` — brand colors |
| ✏️ REWRITE | `FeaturedProducts`, `CollectionGrid`, `CollectionFilters`, `CartUI` → hardcoded data hatao, **Shopify API se data lo** |
| ✅ CREATE | `components/collection/SortSelector.tsx` (client component) |
| ✏️ UPDATE | `project-registry.json` (`session1_complete: true`, `typescript_clean`, `images_verified`, pages_done) |
| ✏️ UPDATE | `session-handoff.md` |
| 🔒 UNTOUCHED | `lib/` (sirf import karta hai, modify nahi), `package.json` |
| 🔧 RUN | `npx tsc --noEmit` (TypeScript check), `next dev` on port 3001 (visual verify), `/compact` |

> **Key rule:** `lib/shopify/` ko sirf **import** kiya jaata hai, kabhi edit nahi. Har product/collection list Shopify API se aati hai — hardcoded arrays mana hain.

---

### 🟢 `/session2`
**Maqsad:** Shopify wiring confirm karna, GitHub repo banana, Netlify pe deploy karna. **Yeh code generate nahi karta — deploy karta hai.**

| Action | Files / Systems |
|---|---|
| 🔧 RUN | `pnpm build` (clean build verify), dev server 200-check |
| 🌐 CREATE | GitHub repo (`gh repo create [client]-storefront`) |
| 🌐 CREATE | Netlify site (`netlify sites:create --name [slug]`) |
| 🌐 SET | Netlify env vars (4 vars: domain, token, secret, site URL) |
| ✏️ WRITE | `.env.local` (agar zaroori ho) |
| ✏️ UPDATE | `project-registry.json` (`github_repo`, `netlify_url`, `session2_complete: true`) |
| ✏️ UPDATE | `session-handoff.md` (sab complete mark) |
| 🔒 UNTOUCHED | `lib/`, koi component/page code (sirf deploy) |

> **Manual step:** Agar GitHub→Netlify auto-link fail ho to ek dafa dashboard se repo link karna parta hai (branch `main`, build `pnpm run build`, publish `.next`).

---

### Helper skills (code change nahi karte)
| Skill | Kaam | Files |
|---|---|---|
| `/verify` | TypeScript + image path + manifest check | sirf parhta; `project-registry.json` ke flags update karta |
| `/handoff` | Session state save | `session-handoff.md` + `project-registry.json` |
| `/status` | Progress dashboard dikhana | sirf READ — kuch change nahi |
| `/shopify-store` | **Live** Shopify store edit (REST API, koi bhi store) | repo files nahi — live store data |
| `/shopify-mcp` | **Live** store edit (MCP, faisallstore3testing) | repo files nahi — live store data |

---

## 4. Hamesha Static Files (Engine — Inhe Haath Mat Lagao)

Yeh wo files hain jo **kisi bhi client ke build mein nahi badaltin** — yahi reusable engine hai:

| Category | Files | Status |
|---|---|---|
| **Shopify core** | `lib/shopify/` (poora — index, types, queries, mutations, fragments) | 🔒🔒 PROTECTED (CLAUDE.md rule) |
| **Lib utils** | `lib/constants.ts`, `lib/utils.ts`, `lib/type-guards.ts` | 🔒 static |
| **Package** | `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` | 🔒🔒 PROTECTED |
| **Config** | `next.config.ts`, `netlify.toml`, `postcss.config.mjs`, `tsconfig.json`, `.env.example` | ⚙️ static |
| **Boilerplate components** | `components/cart/` (actions, context, modal, buttons), `components/product/`, `components/grid/`, `components/layout/search/`, `price.tsx`, `prose.tsx`, `label.tsx`, `loading-dots.tsx`, `carousel.tsx` | 🔒 static engine |
| **Boilerplate routes** | `app/search/`, `app/[page]/`, `app/api/revalidate/`, `app/error.tsx`, `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts` | 🔒 static |
| **Skills** | `.claude/skills/*/SKILL.md` | ⭐ automation brain — static (sirf tab badlo jab pipeline behaviour badalna ho) |
| **Fonts** | `fonts/Inter-Bold.ttf` | static |

---

## 5. Sabse Important Folders (Project Ki Jaan)

| Rank | Folder | Kyun important |
|---|---|---|
| 1️⃣ | `lib/shopify/` | Poori commerce functionality. Yeh toot gaya to kuch kaam nahi karega. **Protected.** |
| 2️⃣ | `.claude/skills/` | Pura automation isi pe chalta hai. Yeh hi "pipeline" hai. |
| 3️⃣ | `app/` + `components/` | Asli storefront jo user ko dikhta hai (generated). |
| 4️⃣ | `claude-input/` | Har client ka design input (HTML + design.md + manifests). |
| 5️⃣ | `public/` | Client ki saari images. |
| 6️⃣ | `project-registry.json` | Single source of truth — har skill state yahan se parhti hai. |

---

## 6. 🗑️ "Fzool" Folders/Files — Safely Remove Ho Sakte Hain

Yeh wo cheezein hain jinhe hata dene se **workflow / project pe koi asar nahi** parega.

### A) Bilkul safe — regenerable build artifacts (auto-wapas aa jate hain)
| Item | Size | Wapas kaise aata hai | Git mein? |
|---|---|---|---|
| `node_modules/` | **363 MB** | `pnpm install` | gitignored ✅ |
| `.next/` | **72 MB** | `pnpm build` / `next dev` | gitignored ✅ |
| `.netlify/` | **3 MB** | `netlify` CLI dobara banata | gitignored ✅ |
| `tsconfig.tsbuildinfo` | 232 KB | `npx tsc` | gitignored ✅ |

> Inhe delete karna 100% safe hai (sirf pehli baar dobara `pnpm install` / build chalana parega). **~438 MB** free ho jayega.

### B) Safe — purani documentation / analysis notes (kisi skill ne use nahi karte)
| Item | Kya hai |
|---|---|
| `analysis/figma-pipeline-analysis.md` | 2026-06-08 ki purani planning note |
| `PROJECT-ANALYSIS.md` | 2026-06-04 ka one-time fix-plan |
| `shopify-access-comparison.md` | access methods ka reference (read-once) |

> Yeh sirf reference docs hain — koi skill inhe parhti ya likhti nahi. Remove karne se workflow pe **zero asar**. (`README.md` aur `WORKFLOWS.md` rakhna behtar hai — woh actual usage guide hain.)

### C) Safe lekin **special tareeqe se** — purani git worktree
| Item | Size | Catch |
|---|---|---|
| `.claude/worktrees/trusting-bouman-6b8788/` | 0.5 MB (+ index) | Yeh ek **registered git worktree** hai (branch `claude/trusting-bouman-6b8788`) — ek purane background-agent session ka bacha hua near-full duplicate copy. |

> ⚠️ Ise plain delete **mat** karo — git confuse ho jayega. Sahi tareeqa:
> ```powershell
> git worktree remove .claude/worktrees/trusting-bouman-6b8788 --force
> ```
> Iske baad branch bhi hata sakte ho: `git branch -D claude/trusting-bouman-6b8788`. Workflow pe koi asar nahi.

### D) Optional — agar yeh tumhara apna kit-banane wala tool nahi
| Item | Note |
|---|---|
| `make-clean-kit.ps1` | Sirf tab kaam ka jab kisi dost ko clean (no-client) kit bhejni ho. Workflow ke liye zaroori nahi — par chhoti file hai, rakhne mein harj nahi. |

### E) ⚠️ Cleanup karne layak (delete nahi, lekin cruft) — `components/home/`
Yahan **multiple clients ke leftover components** jama ho gaye hain:
- **Current client (VVS):** `VVSHero`, `VVSCategoryCards`, `VVSCustomSection`, `VVSDesignedMoments`, `VVSMetalTrading`, `VVSTestimonials`, `VVSTrustBar`, `VVSUpgradeCTA`
- **Purane client (HealthAndHolistics) ka cruft:** `DragonsDen`, `PureSource`, `Sustainability`, `WhyItWorks`, `ExpertSection`, `TrustBar`, `AnnounceBar`, `FAQAccordion`, `CategoryGrid`, `Banner`, `HeroSection`, `Testimonials`, `Newsletter`

> `Hero.tsx` aur `FeaturedProducts.tsx` generic engine pieces hain — rakho. Baaki jo current `app/page.tsx` import nahi kar raha, woh purana cruft hai. Yeh build tor nahi raha (sirf import na hone se dead code hai) lekin confuse karta hai. Naye client ke `/figma-to-html` + `/session1` se yeh **auto clean nahi hota** — manually ya naye client ke liye `components/home/` khaali karke shuru karna behtar hai.

---

## 7. Summary Table — Ek Nazar Mein

| Folder/File | Type | Build pe asar | Remove kar sakte? |
|---|---|---|---|
| `lib/` | 🔒 Engine | Critical | ❌ NAHI (protected) |
| `.claude/skills/` | ⭐ Brain | Critical | ❌ NAHI |
| `app/`, `components/` | Generated | Critical (live site) | ❌ NAHI (per-client edit hota) |
| `claude-input/`, `public/` | 🔁 Per-client | Current client | ⚠️ figma-to-html khud wipe karta |
| `project-registry.json`, `session-handoff.md` | 🔁 State | Pipeline state | ❌ NAHI |
| `.env.local` | 🔁 Secrets | Runtime | ❌ NAHI |
| Config files (next/netlify/ts/postcss) | ⚙️ | Build | ❌ NAHI |
| `node_modules/`, `.next/`, `.netlify/`, `*.tsbuildinfo` | 🗑️ Artifact | Koi nahi (regenerate) | ✅ HAAN (438 MB free) |
| `analysis/`, `PROJECT-ANALYSIS.md`, `shopify-access-comparison.md` | 📄 Docs | Koi nahi | ✅ HAAN |
| `.claude/worktrees/...` | 🗑️ Stale | Koi nahi | ✅ HAAN (`git worktree remove`) |
| `components/home/` purane client | ⚠️ Cruft | Dead code | ✅ HAAN (manual cleanup) |
| `make-clean-kit.ps1` | 🛠️ Utility | Koi nahi | ⚪ optional |

---

## 8. Manager Ke Liye One-Line Pitch

> "Hamare paas ek reusable Next.js + Shopify storefront engine hai (`lib/` + boilerplate + `.claude/skills/`). Har naye client ke liye hum 4 automated commands chalate hain — `/new-client` (setup), `/figma-to-html` (design import), `/session1` (Next.js generation + Shopify wiring), `/session2` (GitHub + Netlify live). Engine kabhi nahi badalta; sirf `claude-input/`, `public/`, aur generated `app/`+`components/home/` per-client badalte hain. Repo ko slim rakhne ke liye `node_modules`, `.next`, `.netlify` (438 MB) aur stale worktree/docs kabhi bhi safely delete ho sakte hain."
