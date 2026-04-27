# 🛒 Marketplace Benin

Une marketplace multi-vendeurs moderne et professionnelle pour le Bénin, construite avec Next.js 14.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Fonctionnalités

- 🏪 **Multi-Vendeurs** - Système complet de gestion des vendeurs
- 📦 **Produits Physiques** - Catalogue avec filtres, tri, ventes flash
- 🛠️ **Services** - Réservation de services (développement, design, réparation, livraison)
- 📚 **Ebooks** - Vente de livres numériques
- 💬 **Chat en Temps Réel** - Communication entre clients et vendeurs
- 🤖 **Assistant IA** - Guide interactif pour les utilisateurs
- 💳 **Paiements Locaux** - MTN MoMo, Moov Money, Celtiis Cash
- 🚚 **Livraison** - Zones: Cotonou, Abomey-Calavi, Porto-Novo, National
- 📱 **Responsive** - Design mobile-first
- 🌍 **Localisé** - Devise en FCAF, localisation Benin

## 🚀 Démarrage Rapide

```bash
# Cloner le projet
git clone <repo-url>

# Installer les dépendances
cd marketplace
npm install

# Lancer en développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 🛠️ Stack Technique

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, CSS Modules
- **Animations**: Framer Motion
- **Icônes**: Lucide React
- **Police**: Google Fonts (Playfair Display, DM Sans, Space Mono)

## 📁 Structure

```
src/
├── app/           # Pages Next.js
│   ├── page.tsx              # Page d'accueil
│   ├── boutique/             # Boutique
│   └── layout.tsx            # Layout principal
├── components/    # Composants React
│   ├── Header.tsx            # Navigation
│   ├── Footer.tsx            # Pied de page
│   ├── ProductCard.tsx       # Carte produit
│   ├── ServiceCard.tsx       # Carte service
│   ├── EbookCard.tsx         # Carte ebook
│   ├── VendorCard.tsx        # Carte vendeur
│   ├── Chat.tsx              # Chat en direct
│   └── AIAssistant.tsx       # Assistant IA
├── contexts/      # État global
│   └── AppContext.tsx        # Panier, utilisateur, chat
├── data/          # Données mockées
│   └── mockData.ts           # Produits, services, ebooks
├── styles/        # Styles globaux
│   └── globals.css           # Variables CSS, reset
└── types/         # Types TypeScript
    └── css.d.ts              # Déclarations CSS modules
```

## 🌐 Déploiement sur Vercel

Le moyen le plus simple de déployer cette application est d'utiliser [Vercel](https://vercel.com).

1. Poussez votre code sur GitHub
2. Connectez votre dépôt à Vercel
3. Déployez automatiquement!

### Variables d'environnement

Aucune variable d'environnement n'est nécessaire pour le développement local.

## 📝 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Développé avec ❤️ pour le marché béninois