# FinCompare Afrique — Roadmap & Progress

## 🎯 Vision
Marketplace de crédit pour l'Afrique Centrale — Cameroun first, extensible CEMAC.

## 📊 Stack Technique
- **Frontend**: Next.js 16 + Tailwind CSS
- **Backend**: Next.js API Routes
- **BDD**: Prisma + SQLite (Turso pour prod)
- **Auth**: NextAuth.js (credentials + OTP)
- **Deploy**: Vercel

---

## ✅ Phase 1: Foundation (DONE)
- [x] Landing page style Pretto
- [x] Simulateur multi-étapes avec capture lead
- [x] UI Components (Button, Card, Input, Select)
- [x] Types TypeScript
- [x] Deploy Vercel

## 🚧 Phase 2: Backend & Auth (IN PROGRESS)
- [ ] Setup Prisma + SQLite
- [ ] Schema BDD (toutes les tables PRD)
- [ ] Seed data (institutions, produits mock)
- [ ] NextAuth.js setup
- [ ] Pages auth: /login, /register
- [ ] API Routes: users, auth

## 📋 Phase 3: Client Dashboard
- [ ] Layout dashboard client
- [ ] Page profil utilisateur
- [ ] Page mes demandes
- [ ] Page détail demande + offres reçues
- [ ] Upload documents
- [ ] Notifications

## 🏢 Phase 4: Institution Dashboard
- [ ] Auth institution (séparé)
- [ ] Layout dashboard institution
- [ ] Page mes produits de crédit
- [ ] Création/édition produit
- [ ] Grilles de taux
- [ ] Dossiers reçus
- [ ] Répondre aux demandes (approuver/rejeter/contre-offre)

## 💬 Phase 5: Messaging & Appointments
- [ ] Conversations client ↔ institution
- [ ] Messages temps réel
- [ ] Prise de RDV
- [ ] Notifications push

## 📈 Phase 6: Admin & Analytics
- [ ] Dashboard admin plateforme
- [ ] Vérification institutions (COBAC)
- [ ] Analytics (conversions, revenus)
- [ ] Gestion abonnements institutions

---

## 📁 Structure Projet Cible

```
fincompare/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Landing, blog, etc.
│   │   ├── (auth)/             # Login, register
│   │   ├── (client)/           # Dashboard client
│   │   ├── (institution)/      # Dashboard institution
│   │   ├── (admin)/            # Admin plateforme
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── ui/                 # Primitives
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Headers, sidebars
│   │   └── features/           # Feature-specific
│   ├── lib/
│   │   ├── prisma.ts           # DB client
│   │   ├── auth.ts             # Auth helpers
│   │   └── utils.ts            # Utilities
│   └── types/
│       └── index.ts
├── public/
└── package.json
```

---

## 🔄 Current Sprint: Phase 2

### Task 2.1: Prisma Setup
- Install prisma, @prisma/client
- Create schema with all tables from PRD
- Generate client
- Create seed script

### Task 2.2: Auth Setup  
- Install next-auth
- Configure credentials provider
- Create auth pages
- Protect routes

---

*Last updated: 2026-02-09 03:00*
