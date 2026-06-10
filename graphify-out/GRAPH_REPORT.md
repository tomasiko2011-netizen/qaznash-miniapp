# Graph Report - .  (2026-06-11)

## Corpus Check
- Corpus is ~2,953 words - fits in a single context window. You may not need a graph.

## Summary
- 96 nodes · 106 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_App Pages & Navigation|App Pages & Navigation]]
- [[_COMMUNITY_Telegram Auth & Session Routes|Telegram Auth & Session Routes]]
- [[_COMMUNITY_Package Config & Runtime Deps|Package Config & Runtime Deps]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Telegram Auth UI Components|Telegram Auth UI Components]]
- [[_COMMUNITY_App Layout & Fonts|App Layout & Fonts]]
- [[_COMMUNITY_Docs & CI Workflow|Docs & CI Workflow]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Vercel Deploy Config|Vercel Deploy Config]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `PageShell()` - 6 edges
3. `parseSessionValue()` - 6 edges
4. `scripts` - 5 edges
5. `getBotToken()` - 4 edges
6. `verifyTelegramAuth()` - 4 edges
7. `createSessionValue()` - 4 edges
8. `POST()` - 3 edges
9. `GET()` - 3 edges
10. `QazNash Mini App` - 3 edges

## Surprising Connections (you probably didn't know these)
- `CI Build Workflow` --references--> `QazNash Mini App`  [INFERRED]
  .github/workflows/ci.yml → README.md
- `GET()` --calls--> `parseSessionValue()`  [EXTRACTED]
  src/app/api/auth/session/route.ts → src/lib/telegram-auth.ts
- `POST()` --calls--> `createSessionValue()`  [EXTRACTED]
  src/app/api/auth/telegram/route.ts → src/lib/telegram-auth.ts
- `POST()` --calls--> `verifyTelegramAuth()`  [EXTRACTED]
  src/app/api/auth/telegram/route.ts → src/lib/telegram-auth.ts
- `GET()` --calls--> `parseSessionValue()`  [EXTRACTED]
  src/app/api/status/access/route.ts → src/lib/telegram-auth.ts

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "TypeScript Compiler Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 1 - "App Pages & Navigation"
Cohesion: 0.15
Nodes (7): links, Nav(), PageShell(), AccessStatus, TelegramStatusCard(), TelegramUser, plans

### Community 2 - "Telegram Auth & Session Routes"
Cohesion: 0.29
Nodes (9): GET(), sign(), createSessionValue(), getBotToken(), parseSessionValue(), TelegramLoginPayload, verifyTelegramAuth(), GET() (+1 more)

### Community 3 - "Package Config & Runtime Deps"
Cohesion: 0.15
Nodes (12): dependencies, next, react, react-dom, name, private, scripts, build (+4 more)

### Community 4 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 5 - "Telegram Auth UI Components"
Cohesion: 0.40
Nodes (3): TelegramAuthCard(), TelegramUser, Window

### Community 6 - "App Layout & Fonts"
Cohesion: 0.40
Nodes (3): bitter, manrope, metadata

### Community 7 - "Docs & CI Workflow"
Cohesion: 0.50
Nodes (4): Instagram Funnel, QazNashBot Telegram Bot, QazNash Mini App, CI Build Workflow

## Knowledge Gaps
- **49 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Config & Runtime Deps`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._