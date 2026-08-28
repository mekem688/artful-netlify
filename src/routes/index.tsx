import { createFileRoute } from "@tanstack/react-router";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { Menu, X, ZoomIn, ChevronDown, Sun, Moon, Globe } from "lucide-react";
import heroImg from "@/assets/hero-network.jpg";
import logoImg from "@/assets/gms-logo.png";
import cat1 from "@/assets/catalogue/IMG_4437.jpeg";
import cat2 from "@/assets/catalogue/IMG_4436.jpeg";
import cat3 from "@/assets/catalogue/IMG_4428.jpeg";
import cat4 from "@/assets/catalogue/IMG_4435.jpeg";
import cat5 from "@/assets/catalogue/IMG_4431.jpeg";
import cat6 from "@/assets/catalogue/IMG_4425.jpeg";

// ── Types ─────────────────────────────────────────────────────────────────────
type Lang = "fr" | "en";
type Theme = "dark" | "light";

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  fr: {
    nav: {
      services: "Services",
      packs: "Tarifs",
      catalogue: "Catalogue",
      avisClients: "Avis clients",
      automatisation: "Automatisation",
      facebookAds: "Facebook Ads",
      faq: "FAQ",
      contact: "Contact",
      auditGratuit: "Audit gratuit",
    },
    hero: {
      badge: "Agence de marketing digital · Douala",
      title1: "Votre marque mérite",
      titleHighlight: "d'être vue.",
      subtitle:
        "Community management, publicité Meta & TikTok, identité visuelle et automatisation — nous gérons votre présence digitale pour que vous puissiez vous concentrer sur votre cœur de métier.",
      cta1: "Audit gratuit sous 48 h →",
      cta2: "Voir nos services",
    },
    stats: [
      { suffix: "+", label: "PME accompagnées" },
      { suffix: "24/7", label: "Automatisation active" },
      { suffix: " ans", label: "Expertise digitale" },
      { suffix: "Douala", label: "Basé au Cameroun" },
    ],
    services: {
      label: "Ce que nous faisons",
      heading1: "Une",
      headingHighlight: "agence complète",
      heading2: "pour votre marque.",
      sub: "Du branding à la campagne publicitaire, en passant par l'automatisation de votre relation client — nous couvrons toute la chaîne digitale.",
      items: [
        {
          title: "Community Management",
          desc: "Stratégie éditoriale, création de contenu et animation quotidienne sur Facebook, Instagram, TikTok, LinkedIn et WhatsApp Business.",
          icon: "💬",
        },
        {
          title: "Publicité en ligne",
          desc: "Campagnes Meta Ads & TikTok Ads ciblées sur le marché camerounais, avec optimisation du ROAS et reporting transparent.",
          icon: "📈",
        },
        {
          title: "Identité visuelle",
          desc: "Logo, charte graphique, déclinaisons print et web. Une marque cohérente, moderne et reconnaissable partout.",
          icon: "🎨",
        },
        {
          title: "Automatisation",
          desc: "Réponses automatiques WhatsApp, planification de publications, tunnels de conversion et intégrations CRM.",
          icon: "⚡",
        },
        {
          title: "Web & applications",
          desc: "Sites vitrine, e-commerce et applications sur mesure, pensés mobile-first pour la connexion locale.",
          icon: "🌐",
        },
        {
          title: "Vidéo & motion",
          desc: "Montage vidéo, stories, reels et vidéos courtes qui accrochent l'audience jeune et urbaine du Cameroun.",
          icon: "🎬",
        },
      ],
    },
    packs: {
      label: "Community Management",
      heading1: "Grille tarifaire",
      headingHighlight: " Community Management",
      heading2: "",
      sub: "Méthode PSSP : chaque palier repose sur une Promesse claire, un Service défini, une Stratégie cohérente et une Preuve mensuelle chiffrée.",
      perMonth: "FCFA / mois",
      cta: "Choisir ce pack",
      popular: "Recommandé",
      method: "Promesse · Service · Stratégie · Preuve",
      tabs: { promise: "Promesse", strategy: "Stratégie", proof: "Preuve" },
      networks: "Réseaux sociaux",
      pubsPerMonth: "Publications / mois",
      items: [
        {
          name: "Starter",
          price: "50 000",
          tag: "Commerces et PME qui démarrent en ligne",
          networks: ["Facebook", "TikTok"],
          pubs: "12 visuels",
          cadence: "3 publications / semaine",
          features: [
            "Planning éditorial + rapport mensuel",
            "Campagne pub pilotée par GMS (budget à la charge du client)",
          ],
          promise: "Sortez de l'invisibilité du monde numérique en 30 jours.",
          strategy: "Objectif : notoriété de base. On installe une présence professionnelle là où, aujourd'hui, il n'y a rien — pour être trouvable avant d'être vendable.",
          proof: "KPI mensuel : portée totale et évolution du nombre d'abonnés.",
          accent: false,
        },
        {
          name: "Medium",
          price: "75 000",
          tag: "PME visibles qui veulent une audience active",
          networks: ["Facebook", "TikTok"],
          pubs: "16 (8 visuels + 8 vidéos)",
          cadence: "4 publications / semaine dont 2 vidéos",
          features: [
            "Planning éditorial + rapport mensuel",
            "Campagne pub pilotée par GMS (budget à la charge du client)",
            "Suivi & partage des performances",
          ],
          promise: "Transformez vos abonnés en communauté active.",
          strategy: "Objectif : engagement. La vidéo et la cadence renforcée transforment des abonnés passifs en une communauté qui commente, partage et retient la marque.",
          proof: "KPI mensuel : taux d'engagement (likes, commentaires, partages) comparé au mois précédent.",
          accent: false,
        },
        {
          name: "Premium",
          price: "100 000",
          tag: "PME prêtes à convertir leur audience en prospects",
          networks: ["Facebook", "TikTok", "Instagram"],
          pubs: "28 (12 vidéos + 16 visuels)",
          cadence: "7 publications / semaine (3 vidéos + 4 visuels)",
          features: [
            "Planning éditorial + rapport mensuel",
            "Campagne pub pilotée par GMS (budget à la charge du client)",
            "Veille concurrentielle & interaction quotidienne avec la communauté",
            "Suivi, partage & recommandations",
            "Bonus : conseil marketing & assistance commerciale",
          ],
          promise: "Convertissez l'attention en prospects réels.",
          strategy: "Objectif : acquisition. La veille et l'interaction quotidienne transforment l'audience en contacts qualifiés — on ne publie plus seulement, on capte la demande.",
          proof: "KPI mensuel : nombre de demandes / messages entrants générés.",
          accent: false,
        },
        {
          name: "VIP",
          price: "150 000",
          tag: "PME qui veulent traduire le digital en chiffre d'affaires",
          networks: ["Facebook", "TikTok", "LinkedIn", "Instagram"],
          pubs: "28 (12 visuels + 16 vidéos)",
          cadence: "7 publications / semaine (3 visuels + 4 vidéos)",
          features: [
            "Planning éditorial + rapport mensuel",
            "Campagne pub pilotée par GMS (budget à la charge du client)",
            "Veille concurrentielle, étude de marché & interaction quotidienne",
            "Élaboration de la stratégie commerciale",
            "Bonus : assistance closing, assistance WhatsApp, suivi face-à-face",
          ],
          promise: "Passez de la communication à la vente.",
          strategy: "Objectif : commercialisation. GMS ne se limite plus à la production de contenu — l'équipe participe activement au closing, avec un accompagnement humain et personnalisé.",
          proof: "KPI mensuel : nombre de ventes ou rendez-vous commerciaux attribuables au dispositif digital.",
          accent: true,
        },
        {
          name: "Gold",
          price: "250 000",
          tag: "Dominer tous les canaux et devenir la référence du secteur",
          networks: ["Facebook", "Instagram", "WhatsApp", "LinkedIn", "TikTok", "YouTube"],
          pubs: "20 vidéos + 20 visuels + contenus additionnels + blog",
          cadence: "5 vidéos/semaine + 5 visuels/semaine (formats courts inclus)",
          features: [
            "Production complète tous formats (vidéos courtes, visuels, blog & articles)",
            "Planning éditorial + rapport mensuel",
            "Campagne pub pilotée par GMS (budget à la charge du client)",
            "Veille concurrentielle, étude de marché & interaction quotidienne",
            "Assistance & Closing",
            "Bonus : recyclage outils informatiques, WhatsApp, stratégie commerciale établie",
          ],
          promise: "Dominez tous les canaux. Devenez la référence incontestée de votre secteur.",
          strategy: "Objectif : omniprésence. Chaque canal où le client potentiel peut se trouver est occupé, avec une seule stratégie cohérente qui les relie tous.",
          proof: "KPI mensuel : part de voix face aux concurrents directs et volume de ventes générées.",
          accent: false,
        },
      ],
      addons: {
        label: "Services ponctuels",
        heading: "Prestations à la carte",
        sub: "Facturables indépendamment des packs mensuels.",
        note: "Les tarifs « à partir de » varient selon la complexité et les délais. Un devis précis est établi après le brief.",
        items: [
          { service: "Création de logo", price: "30 000 FCFA" },
          { service: "Charte graphique", price: "80 000 FCFA" },
          { service: "Carte de visite", price: "10 000 FCFA" },
          { service: "Flyer", price: "15 000 FCFA" },
          { service: "Bannière Facebook", price: "20 000 FCFA" },
          { service: "Montage vidéo", price: "À partir de 20 000 FCFA" },
          { service: "Shooting photo", price: "À partir de 50 000 FCFA" },
          { service: "Publicité Meta (hors budget)", price: "À partir de 50 000 FCFA" },
          { service: "Création de site web", price: "À partir de 250 000 FCFA" },
        ],
      },
      adCarte: {
        label: "Campagne à la carte",
        heading: "Grille tarifaire publicitaire",
        sub: "Tarifs tout inclus (budget publicitaire et frais de gestion) selon la durée choisie.",
        note: "Frais de commission avec suivi : 10 000 FCFA par mois ou 5 000 FCFA par semaine.",
        headers: { duration: "Durée", starter: "Starter", message: "Message", pme: "PME", premium: "Premium" },
        items: [
          { formula: "1 jour", starter: "2 000 FCFA", message: "3 000 FCFA", pme: "5 000 FCFA", premium: "10 000 FCFA" },
          { formula: "3 jours", starter: "6 000 FCFA", message: "9 000 FCFA", pme: "15 000 FCFA", premium: "30 000 FCFA" },
          { formula: "7 jours", starter: "14 000 FCFA", message: "21 000 FCFA", pme: "35 000 FCFA", premium: "70 000 FCFA" },
          { formula: "15 jours", starter: "30 000 FCFA", message: "45 000 FCFA", pme: "75 000 FCFA", premium: "150 000 FCFA" },
          { formula: "30 jours", starter: "60 000 FCFA", message: "90 000 FCFA", pme: "150 000 FCFA", premium: "300 000 FCFA" },
        ],
      },
      conditions: {
        heading: "Conditions générales",
        items: [
          {
            icon: "💰",
            title: "Budget publicitaire",
            desc: "Le budget média reste à la charge du client. GMS applique des frais de gestion de 12 % du budget investi.",
          },
          {
            icon: "📅",
            title: "−10 % engagement trimestriel",
            desc: "Réduction sur l'abonnement mensuel avec facturation trimestrielle anticipée.",
          },
          {
            icon: "🗓️",
            title: "−15 % engagement annuel",
            desc: "Réduction sur l'abonnement mensuel avec facturation semestrielle anticipée.",
          },
          {
            icon: "📊",
            title: "Rapport mensuel inclus",
            desc: "Chaque pack inclut un rapport mensuel présentant les indicateurs de Preuve définis pour son palier.",
          },
          {
            icon: "🔄",
            title: "Changement de palier",
            desc: "Possible à tout moment, avec effet au mois suivant, sans frais de transition.",
          },
        ],
      },
    },
    fbAds: {
      label: "Campagne publicitaire",
      heading1: "Facebook Ads —",
      headingHighlight: "touchez vos clients",
      heading2: "directement.",
      sub: "Trois niveaux de puissance pour amplifier votre visibilité sur Facebook & Instagram. Choisissez votre durée et votre intensité.",
      tab7j: "7 jours",
      tab1m: "1 mois",
      reach: "personnes touchées / jour",
      cta: "Lancer ma campagne →",
      plans: [
        {
          name: "Simple",
          stars: 3,
          price7j: "15 500",
          price1m: "60 500",
          reach: "1 500 – 3 000",
          desc: "Idéal pour tester une offre ou promouvoir un événement ponctuel.",
        },
        {
          name: "Double",
          stars: 4,
          price7j: "30 000",
          price1m: "115 500",
          reach: "3 000 – 6 000",
          desc: "Le meilleur rapport portée / budget pour une croissance régulière.",
          accent: true,
        },
        {
          name: "Triple",
          stars: 5,
          price7j: "44 500",
          price1m: "170 500",
          reach: "6 000 – 9 000",
          desc: "Maximisez votre visibilité et dominez votre marché local.",
        },
      ],
    },
    campaign: {
      label: "Pourquoi faire de la pub ?",
      heading1: "6 raisons de lancer",
      headingHighlight: "votre campagne",
      heading2: "maintenant.",
      intro:
        "Une campagne publicitaire est une série d'actions stratégiques visant à promouvoir un produit, un service ou une marque auprès d'un public cible. Son objectif : influencer le comportement des consommateurs pour acheter, s'informer ou se familiariser avec votre marque.",
      benefits: [
        {
          num: "01",
          title: "Augmentation de la notoriété",
          desc: "Elle aide à faire connaître votre marque ou votre produit à un large public, rapidement.",
          icon: "🚀",
        },
        {
          num: "02",
          title: "Attraction de nouveaux clients",
          desc: "Une campagne bien ciblée attire de nouveaux consommateurs et élargit votre clientèle.",
          icon: "🎯",
        },
        {
          num: "03",
          title: "Renforcement de l'image de marque",
          desc: "Elle permet de renforcer ou de redéfinir l'image perçue de votre marque dans l'esprit du public.",
          icon: "💎",
        },
        {
          num: "04",
          title: "Stimulation des ventes",
          desc: "Une campagne efficace génère des conversions immédiates en incitant les consommateurs à acheter.",
          icon: "📈",
        },
        {
          num: "05",
          title: "Avantage concurrentiel",
          desc: "En étant visible sur différents canaux, vous vous démarquez de vos concurrents et prenez de l'avance.",
          icon: "🏆",
        },
        {
          num: "06",
          title: "Interaction avec le public",
          desc: "Les publicités sur les réseaux sociaux permettent d'engager des conversations directes avec votre audience.",
          icon: "💬",
        },
      ],
      cta: "Démarrer ma campagne →",
    },
    problems: {
      label: "Diagnostic",
      heading1: "Pourquoi votre page",
      headingHighlight: "manque de crédibilité",
      heading2: "?",
      sub: "Vous avez peut-être un bon business… mais votre page ne rassure pas. Voici les 4 erreurs les plus fréquentes que nous corrigeons chez nos clients.",
      cta: "Qu'attendez-vous pour nous laisser gérer votre page ? →",
      items: [
        {
          num: "01",
          title: "Profil incomplet",
          desc: "Pas de numéro, pas d'adresse, pas de description claire, pas de photo sérieuse. Le client doute directement.",
        },
        {
          num: "02",
          title: "Publications irrégulières",
          desc: "Aujourd'hui tu publies… puis plus rien pendant plusieurs semaines. Le client pense que le business est arrêté ou pas fiable.",
        },
        {
          num: "03",
          title: "Peu de témoignages",
          desc: "Le client veut voir des preuves avant de faire confiance. Aucun avis, aucun retour, aucun témoignage — il hésite et part.",
        },
        {
          num: "04",
          title: "Messages sans réponse",
          desc: "Un client écrit « Bonjour, c'est combien ? ». Il attend… et finit par acheter ailleurs. Chaque message perdu = un client perdu.",
        },
      ],
    },
    catalogue: {
      label: "Catalogue",
      heading: "Quelques réalisations pour nos clients",
      sub: "Identité visuelle, cartes de visite, affiches, publications réseaux sociaux — chaque projet est pensé pour renforcer la crédibilité de votre marque.",
      cta: "Vous voulez le même niveau de rendu pour votre marque ? →",
      items: [
        {
          title: "Dare Design House",
          category: "Carte de visite",
          desc: "Identité visuelle et carte de visite recto-verso pour une entreprise de BTP et décoration.",
        },
        {
          title: "Ornel Beauty",
          category: "Publication réseaux sociaux",
          desc: "Visuel hebdomadaire pour institut de beauté — direction artistique douce et lumineuse.",
        },
        {
          title: "MCG Group & Co",
          category: "Affiche digitale",
          desc: "Communication e-commerce import/export Chine–Cameroun, mise en page dynamique.",
        },
        {
          title: "Luxklin SARL",
          category: "Logo & branding",
          desc: "Logo épuré pour société de nettoyage et d'entretien professionnel.",
        },
        {
          title: "GMS-DC",
          category: "Carrousel éducatif",
          desc: "Publication pédagogique pour expliquer les bonnes pratiques de communication digitale.",
        },
        {
          title: "MCG Group & Co",
          category: "Identité visuelle",
          desc: "Création de logo pour une entreprise spécialisée dans l'import-export et la logistique.",
        },
      ],
    },
    testimonials: {
      label: "Témoignages",
      heading1: "Ce que disent",
      headingHighlight: "nos clients",
      sub: "Des PME doualaïses et camerounaises qui ont fait confiance à GMS-DC pour leur présence digitale.",
      cta: "Votre opinion sur GMS-DC nous intéresse. Publiez un avis sur notre fiche →",
      reviewUrl: "https://g.page/r/Cb3hlAubt-5uEBI/review",
      items: [
        {
          name: "Rodrigue M.",
          role: "Gérant, Dare Design House",
          text: "Avant GMS-DC, notre page Facebook était vide. En 2 mois, on a eu nos 3 premiers contrats via les réseaux. Le rapport qualité-prix est imbattable pour Douala.",
          initials: "RM",
          rating: 5,
        },
        {
          name: "Christelle A.",
          role: "Fondatrice, Ornel Beauty",
          text: "Les visuels qu'ils créent sont à un niveau vraiment professionnel. Mes clientes me demandent toujours qui fait ma communication. Je recommande sans hésiter.",
          initials: "CA",
          rating: 5,
        },
        {
          name: "Patrick N.",
          role: "DG, MCG Group & Co",
          text: "On fait de l'import-export Chine-Cameroun. GMS-DC a su trouver exactement le bon ton pour notre communication. Les campagnes Meta Ads ont doublé nos demandes.",
          initials: "PN",
          rating: 5,
        },
        {
          name: "Marie-Claire T.",
          role: "Directrice, Luxklin SARL",
          text: "Logo, charte graphique, publications… tout est cohérent maintenant. Les clients nous reconnaissent directement. L'équipe est réactive et à l'écoute.",
          initials: "MC",
          rating: 5,
        },
        {
          name: "Armand B.",
          role: "Entrepreneur, Douala",
          text: "Le chatbot WhatsApp qu'ils ont mis en place répond à mes clients la nuit quand je dors. J'ai gagné 3 nouveaux clients en une semaine grâce à ça.",
          initials: "AB",
          rating: 5,
        },
      ],
    },
    automation: {
      label: "Automatisation",
      heading1: "Gagnez du temps.",
      heading2: "Automatisez",
      heading3: "ce qui peut l'être.",
      sub: "L'automatisation, ce n'est pas remplacer l'humain — c'est libérer votre équipe des tâches répétitives pour se concentrer sur ce qui fait vraiment vendre.",
      cta: "Parler à un expert →",
      items: [
        {
          title: "Réponses automatiques WhatsApp",
          desc: "Un chatbot qui qualifie les prospects 24 h / 24 et vous transfère les demandes chaudes.",
        },
        {
          title: "Publications programmées",
          desc: "Un calendrier éditorial validé à l'avance, publié automatiquement sur tous vos réseaux.",
        },
        {
          title: "Tunnels de conversion",
          desc: "Formulaires, e-mails et relances automatisés pour transformer chaque visiteur en client.",
        },
        {
          title: "CRM & suivi de paiements",
          desc: "Vos contrats, factures et relances Mobile Money centralisés dans un seul tableau de bord.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      heading1: "Questions",
      headingHighlight: "fréquentes",
      sub: "Tout ce que vous voulez savoir avant de nous contacter.",
      waLink: "Écrivez-nous sur WhatsApp →",
      waQuestion: "Une question non listée ?",
      items: [
        {
          q: "Quel est le délai pour voir les premiers résultats ?",
          a: "Les premières améliorations visibles (identité, publications régulières, engagements) arrivent dans les 2 premières semaines. Pour les résultats publicitaires mesurables, comptez 4 à 6 semaines selon votre secteur et votre budget.",
        },
        {
          q: "Puis-je payer en Mobile Money ?",
          a: "Oui, nous acceptons MTN Mobile Money, Orange Money, les virements bancaires et les espèces. Engagement minimum de 3 mois. Le budget publicitaire (Meta Ads, TikTok Ads) est distinct des honoraires GMS-DC.",
        },
        {
          q: "Y a-t-il un contrat d'engagement long terme ?",
          a: "L'engagement minimum est de 3 mois pour permettre à la stratégie de porter ses fruits. Après cette période, vous êtes libre de continuer, d'ajuster votre pack ou d'arrêter avec un préavis d'un mois.",
        },
        {
          q: "Est-ce que vous gérez des entreprises en dehors de Douala ?",
          a: "Absolument. Nous accompagnons des PME à Yaoundé, Bafoussam, Buea et dans d'autres villes du Cameroun. Tout se gère à distance via WhatsApp et les réunions Zoom/Meet.",
        },
        {
          q: "Que comprend l'audit digital gratuit ?",
          a: "L'audit couvre l'analyse de votre présence sur les réseaux sociaux, votre site web (si vous en avez un), la cohérence de votre identité visuelle et un benchmark de vos concurrents directs. Il est livré sous 48 h, sans engagement.",
        },
        {
          q: "Puis-je voir des exemples de votre travail avant de signer ?",
          a: "Bien sûr. Notre section Catalogue présente quelques réalisations récentes. En plus, lors de l'audit gratuit, nous partageons des exemples spécifiques à votre secteur d'activité.",
        },
      ],
    },
    contact: {
      heading1: "Prêt à propulser",
      headingHighlight: "votre marque",
      heading2: "?",
      sub: "Audit digital gratuit sous 48 h. Sans engagement.",
      location: "Beedi, Immeuble J et T, face Total Énergie — Douala",
      mapLabel: "Nous trouver",
      name: "Votre nom",
      email: "Votre e-mail",
      message: "Parlez-nous de votre projet…",
      submit: "Envoyer via WhatsApp →",
    },
    footer: {
      tagline: "Votre partenaire pour le succès en ligne",
      copy: "GMS-DC · Global Web Marketing Service · Douala, Cameroun",
    },
    whatsapp: { tooltip: "💬 Discutons sur WhatsApp !" },
    lightbox: { close: "Fermer", project: "Réalisation" },
  },
  en: {
    nav: {
      services: "Services",
      packs: "Pricing",
      catalogue: "Portfolio",
      avisClients: "Reviews",
      automatisation: "Automation",
      facebookAds: "Facebook Ads",
      faq: "FAQ",
      contact: "Contact",
      auditGratuit: "Free audit",
    },
    hero: {
      badge: "Digital marketing agency · Douala",
      title1: "Your brand deserves",
      titleHighlight: "to be seen.",
      subtitle:
        "Community management, Meta & TikTok advertising, visual identity and automation — we manage your digital presence so you can focus on your core business.",
      cta1: "Free audit in 48h →",
      cta2: "See our services",
    },
    stats: [
      { suffix: "+", label: "SMEs supported" },
      { suffix: "24/7", label: "Active automation" },
      { suffix: " yrs", label: "Digital expertise" },
      { suffix: "Douala", label: "Based in Cameroon" },
    ],
    services: {
      label: "What we do",
      heading1: "A",
      headingHighlight: "full-service agency",
      heading2: "for your brand.",
      sub: "From branding to ad campaigns, through customer relationship automation — we cover the entire digital chain.",
      items: [
        {
          title: "Community Management",
          desc: "Editorial strategy, content creation and daily engagement on Facebook, Instagram, TikTok, LinkedIn and WhatsApp Business.",
          icon: "💬",
        },
        {
          title: "Online Advertising",
          desc: "Meta Ads & TikTok Ads campaigns targeted at the Cameroonian market, with ROAS optimization and transparent reporting.",
          icon: "📈",
        },
        {
          title: "Visual Identity",
          desc: "Logo, brand guidelines, print and web assets. A consistent, modern and recognizable brand everywhere.",
          icon: "🎨",
        },
        {
          title: "Automation",
          desc: "Automatic WhatsApp replies, post scheduling, conversion funnels and CRM integrations.",
          icon: "⚡",
        },
        {
          title: "Web & Apps",
          desc: "Landing pages, e-commerce and custom applications built mobile-first for local connectivity.",
          icon: "🌐",
        },
        {
          title: "Video & Motion",
          desc: "Video editing, stories, reels and short clips that hook the young, urban Cameroonian audience.",
          icon: "🎬",
        },
      ],
    },
    packs: {
      label: "Community Management",
      heading1: "Community Management",
      headingHighlight: " Pricing",
      heading2: "",
      sub: "The PSSP method: every tier is built on a clear Promise, a defined Service, a coherent Strategy, and a monthly measurable Proof.",
      perMonth: "FCFA / month",
      cta: "Choose this plan",
      popular: "Recommended",
      method: "Promise · Service · Strategy · Proof",
      tabs: { promise: "Promise", strategy: "Strategy", proof: "Proof" },
      networks: "Social networks",
      pubsPerMonth: "Posts / month",
      items: [
        {
          name: "Starter",
          price: "50 000",
          tag: "Businesses and SMEs getting online for the first time",
          networks: ["Facebook", "TikTok"],
          pubs: "12 visuals",
          cadence: "3 posts / week",
          features: [
            "Editorial calendar + monthly report",
            "Ad campaign managed by GMS (media budget on client)",
          ],
          promise: "Get out of digital invisibility within 30 days.",
          strategy: "Goal: basic awareness. We build a regular professional presence where, today, there is nothing — so you're findable before you're sellable.",
          proof: "Monthly KPI: total reach and follower growth.",
          accent: false,
        },
        {
          name: "Medium",
          price: "75 000",
          tag: "Visible SMEs that want an engaged, not just passive, audience",
          networks: ["Facebook", "TikTok"],
          pubs: "16 (8 visuals + 8 videos)",
          cadence: "4 posts / week including 2 videos",
          features: [
            "Editorial calendar + monthly report",
            "Ad campaign managed by GMS (media budget on client)",
            "Performance tracking & sharing",
          ],
          promise: "Turn your followers into an active community.",
          strategy: "Goal: engagement. Video and an increased cadence transform passive followers into a community that comments, shares, and remembers the brand.",
          proof: "Monthly KPI: engagement rate (likes, comments, shares) vs. the previous month.",
          accent: false,
        },
        {
          name: "Premium",
          price: "100 000",
          tag: "SMEs ready to convert their audience into real leads",
          networks: ["Facebook", "TikTok", "Instagram"],
          pubs: "28 (12 videos + 16 visuals)",
          cadence: "7 posts / week (3 videos + 4 visuals)",
          features: [
            "Editorial calendar + monthly report",
            "Ad campaign managed by GMS (media budget on client)",
            "Competitive watch & daily community interaction",
            "Tracking, sharing & recommendations",
            "Bonus: marketing advice & sales assistance",
          ],
          promise: "Convert attention into real prospects.",
          strategy: "Goal: acquisition. Daily watch and interaction transform engaged audiences into qualified contacts — we don't just post, we capture demand.",
          proof: "Monthly KPI: number of inbound messages / enquiries generated.",
          accent: false,
        },
        {
          name: "VIP",
          price: "150 000",
          tag: "SMEs that want digital to translate into actual revenue",
          networks: ["Facebook", "TikTok", "LinkedIn", "Instagram"],
          pubs: "28 (12 visuals + 16 videos)",
          cadence: "7 posts / week (3 visuals + 4 videos)",
          features: [
            "Editorial calendar + monthly report",
            "Ad campaign managed by GMS (media budget on client)",
            "Competitive watch, market study & daily interaction",
            "Commercial strategy development",
            "Bonus: closing assistance, WhatsApp support, in-person follow-up",
          ],
          promise: "Go from communication to actual sales.",
          strategy: "Goal: commercialisation. GMS is no longer just a content producer — the team actively participates in closing, with hands-on personal support.",
          proof: "Monthly KPI: number of sales or commercial appointments attributable to the digital setup.",
          accent: true,
        },
        {
          name: "Gold",
          price: "250 000",
          tag: "Dominate every channel and become the undisputed reference of your sector",
          networks: ["Facebook", "Instagram", "WhatsApp", "LinkedIn", "TikTok", "YouTube"],
          pubs: "20 videos + 20 visuals + additional content + blog",
          cadence: "5 videos/week + 5 visuals/week (short formats included)",
          features: [
            "Full production — all formats (short videos, visuals, blog & articles)",
            "Editorial calendar + monthly report",
            "Ad campaign managed by GMS (media budget on client)",
            "Competitive watch, market study & daily interaction",
            "Closing assistance",
            "Bonus: IT recycling, WhatsApp support, commercial strategy",
          ],
          promise: "Dominate every channel. Become the undisputed reference of your sector.",
          strategy: "Goal: omnipresence. Every channel where a potential client might be is covered, with a single coherent strategy connecting them all.",
          proof: "Monthly KPI: share of voice vs. direct competitors and total sales volume generated.",
          accent: false,
        },
      ],
      addons: {
        label: "One-time services",
        heading: "À la carte services",
        sub: "Billable independently from monthly plans.",
        note: "'Starting from' prices vary by complexity and deadlines. An exact quote is provided after the brief.",
        items: [
          { service: "Logo creation", price: "30,000 FCFA" },
          { service: "Brand identity (charter)", price: "80,000 FCFA" },
          { service: "Business card", price: "10,000 FCFA" },
          { service: "Flyer", price: "15,000 FCFA" },
          { service: "Facebook banner", price: "20,000 FCFA" },
          { service: "Video editing", price: "From 20,000 FCFA" },
          { service: "Photo shoot", price: "From 50,000 FCFA" },
          { service: "Meta advertising (excl. budget)", price: "From 50,000 FCFA" },
          { service: "Website creation", price: "From 250,000 FCFA" },
        ],
      },
      adCarte: {
        label: "Advertising campaign pricing",
        heading: "Campaign pricing grid",
        sub: "All-inclusive rates (ad budget and management fees) based on the selected duration.",
        note: "Commission with monitoring: 10,000 FCFA monthly or 5,000 FCFA weekly.",
        headers: { duration: "Duration", starter: "Starter", message: "Message", pme: "SME", premium: "Premium" },
        items: [
          { formula: "1 day", starter: "2,000 FCFA", message: "3,000 FCFA", pme: "5,000 FCFA", premium: "10,000 FCFA" },
          { formula: "3 days", starter: "6,000 FCFA", message: "9,000 FCFA", pme: "15,000 FCFA", premium: "30,000 FCFA" },
          { formula: "7 days", starter: "14,000 FCFA", message: "21,000 FCFA", pme: "35,000 FCFA", premium: "70,000 FCFA" },
          { formula: "15 days", starter: "30,000 FCFA", message: "45,000 FCFA", pme: "75,000 FCFA", premium: "150,000 FCFA" },
          { formula: "30 days", starter: "60,000 FCFA", message: "90,000 FCFA", pme: "150,000 FCFA", premium: "300,000 FCFA" },
        ],
      },
      conditions: {
        heading: "General conditions",
        items: [
          {
            icon: "💰",
            title: "Ad budget",
            desc: "Media budget remains the client's responsibility. GMS charges a 12% management fee on the invested budget.",
          },
          {
            icon: "📅",
            title: "−10% quarterly commitment",
            desc: "Discount on the monthly subscription with upfront quarterly billing.",
          },
          {
            icon: "🗓️",
            title: "−15% annual commitment",
            desc: "Discount on the monthly subscription with upfront semi-annual billing.",
          },
          {
            icon: "📊",
            title: "Monthly report included",
            desc: "Every plan includes a monthly report showing the Proof indicators defined for that tier.",
          },
          {
            icon: "🔄",
            title: "Plan upgrade / downgrade",
            desc: "Possible at any time, effective the following month, with no transition fee.",
          },
        ],
      },
    },
    fbAds: {
      label: "Ad campaign",
      heading1: "Facebook Ads —",
      headingHighlight: "reach your customers",
      heading2: "directly.",
      sub: "Three power levels to amplify your visibility on Facebook & Instagram. Choose your duration and intensity.",
      tab7j: "7 days",
      tab1m: "1 month",
      reach: "people reached / day",
      cta: "Launch my campaign →",
      plans: [
        {
          name: "Simple",
          stars: 3,
          price7j: "15 500",
          price1m: "60 500",
          reach: "1 500 – 3 000",
          desc: "Ideal for testing an offer or promoting a one-time event.",
        },
        {
          name: "Double",
          stars: 4,
          price7j: "30 000",
          price1m: "115 500",
          reach: "3 000 – 6 000",
          desc: "Best reach-to-budget ratio for steady growth.",
          accent: true,
        },
        {
          name: "Triple",
          stars: 5,
          price7j: "44 500",
          price1m: "170 500",
          reach: "6 000 – 9 000",
          desc: "Maximize your visibility and dominate your local market.",
        },
      ],
    },
    campaign: {
      label: "Why advertise?",
      heading1: "6 reasons to launch",
      headingHighlight: "your campaign",
      heading2: "now.",
      intro:
        "An advertising campaign is a series of strategic actions aimed at promoting a product, service or brand to a target audience. Its goal: influence consumer behavior to buy, get informed, or become familiar with your brand.",
      benefits: [
        {
          num: "01",
          title: "Brand awareness boost",
          desc: "It helps make your brand or product known to a wide audience, quickly.",
          icon: "🚀",
        },
        {
          num: "02",
          title: "New customer acquisition",
          desc: "A well-targeted campaign attracts new consumers and expands your customer base.",
          icon: "🎯",
        },
        {
          num: "03",
          title: "Brand image reinforcement",
          desc: "It strengthens or redefines the perceived image of your brand in the public's mind.",
          icon: "💎",
        },
        {
          num: "04",
          title: "Sales stimulation",
          desc: "An effective campaign generates immediate conversions by prompting consumers to buy.",
          icon: "📈",
        },
        {
          num: "05",
          title: "Competitive advantage",
          desc: "By being visible across different channels, you stand out from competitors and get ahead.",
          icon: "🏆",
        },
        {
          num: "06",
          title: "Audience engagement",
          desc: "Social media ads allow direct conversations with your audience, strengthening customer relationships.",
          icon: "💬",
        },
      ],
      cta: "Start my campaign →",
    },
    problems: {
      label: "Diagnosis",
      heading1: "Why your page",
      headingHighlight: "lacks credibility",
      heading2: "?",
      sub: "You might have a great business… but your page doesn't inspire trust. Here are the 4 most common mistakes we fix for our clients.",
      cta: "What are you waiting for? Let us manage your page →",
      items: [
        {
          num: "01",
          title: "Incomplete profile",
          desc: "No phone number, no address, no clear description, no professional photo. The customer doubts immediately.",
        },
        {
          num: "02",
          title: "Irregular posts",
          desc: "You post today… then nothing for several weeks. The customer thinks the business is closed or unreliable.",
        },
        {
          num: "03",
          title: "Few testimonials",
          desc: "Customers want proof before trusting you. No reviews, no feedback, no testimonials — they hesitate and leave.",
        },
        {
          num: "04",
          title: "Unanswered messages",
          desc: "A customer writes 'Hello, how much is it?' They wait… and end up buying elsewhere. Every lost message = a lost customer.",
        },
      ],
    },
    catalogue: {
      label: "Portfolio",
      heading: "Some recent work for our clients",
      sub: "Visual identity, business cards, posters, social media posts — every project is designed to strengthen your brand's credibility.",
      cta: "Want the same quality for your brand? →",
      items: [
        {
          title: "Dare Design House",
          category: "Business card",
          desc: "Visual identity and double-sided business card for a construction and decoration company.",
        },
        {
          title: "Ornel Beauty",
          category: "Social media post",
          desc: "Weekly visual for a beauty salon — soft and luminous art direction.",
        },
        {
          title: "MCG Group & Co",
          category: "Digital poster",
          desc: "E-commerce communication for China–Cameroon import/export, dynamic layout.",
        },
        {
          title: "Luxklin SARL",
          category: "Logo & branding",
          desc: "Clean logo for a professional cleaning and maintenance company.",
        },
        {
          title: "GMS-DC",
          category: "Educational carousel",
          desc: "Educational post explaining the fundamentals of consistent digital communication.",
        },
        {
          title: "MCG Group & Co",
          category: "Visual identity",
          desc: "Logo design for a company specializing in import/export and logistics.",
        },
      ],
    },
    testimonials: {
      label: "Testimonials",
      heading1: "What",
      headingHighlight: "our clients say",
      sub: "Cameroonian SMEs that trusted GMS-DC with their digital presence.",
      cta: "Your opinion on GMS-DC matters to us. Post a review on our listing →",
      reviewUrl: "https://g.page/r/Cb3hlAubt-5uEBI/review",
      items: [
        {
          name: "Rodrigue M.",
          role: "Manager, Dare Design House",
          text: "Before GMS-DC, our Facebook page was empty. In 2 months, we got our first 3 contracts via social media. The value for money is unbeatable in Douala.",
          initials: "RM",
          rating: 5,
        },
        {
          name: "Christelle A.",
          role: "Founder, Ornel Beauty",
          text: "The visuals they create are at a truly professional level. My clients always ask who does my communication. I recommend without hesitation.",
          initials: "CA",
          rating: 5,
        },
        {
          name: "Patrick N.",
          role: "CEO, MCG Group & Co",
          text: "We do China-Cameroon import-export. GMS-DC found exactly the right tone for our communication. Meta Ads campaigns doubled our inquiries.",
          initials: "PN",
          rating: 5,
        },
        {
          name: "Marie-Claire T.",
          role: "Director, Luxklin SARL",
          text: "Logo, brand guidelines, posts… everything is consistent now. Clients recognize us immediately. The team is responsive and attentive.",
          initials: "MC",
          rating: 5,
        },
        {
          name: "Armand B.",
          role: "Entrepreneur, Douala",
          text: "The WhatsApp chatbot they set up answers my clients at night while I sleep. I gained 3 new clients in one week thanks to it.",
          initials: "AB",
          rating: 5,
        },
      ],
    },
    automation: {
      label: "Automation",
      heading1: "Save time.",
      heading2: "Automate",
      heading3: "what can be automated.",
      sub: "Automation isn't about replacing people — it's about freeing your team from repetitive tasks to focus on what truly drives sales.",
      cta: "Talk to an expert →",
      items: [
        {
          title: "Automatic WhatsApp replies",
          desc: "A chatbot that qualifies prospects 24/7 and forwards hot leads to you.",
        },
        {
          title: "Scheduled posts",
          desc: "A pre-approved editorial calendar, automatically published across all your networks.",
        },
        {
          title: "Conversion funnels",
          desc: "Automated forms, emails and follow-ups to turn every visitor into a customer.",
        },
        {
          title: "CRM & payment tracking",
          desc: "Your contracts, invoices and Mobile Money reminders centralized in one dashboard.",
        },
      ],
    },
    faq: {
      label: "FAQ",
      heading1: "Frequently",
      headingHighlight: "asked questions",
      sub: "Everything you want to know before contacting us.",
      waLink: "Write to us on WhatsApp →",
      waQuestion: "Question not listed?",
      items: [
        {
          q: "How long before seeing the first results?",
          a: "First visible improvements (identity, regular posts, engagement) arrive in the first 2 weeks. For measurable advertising results, allow 4 to 6 weeks depending on your sector and budget.",
        },
        {
          q: "Can I pay by Mobile Money?",
          a: "Yes, we accept MTN Mobile Money, Orange Money, bank transfers and cash. Minimum 3-month commitment. Advertising budget (Meta Ads, TikTok Ads) is separate from GMS-DC fees.",
        },
        {
          q: "Is there a long-term commitment contract?",
          a: "The minimum commitment is 3 months to allow the strategy to bear fruit. After that period, you are free to continue, adjust your plan or stop with one month's notice.",
        },
        {
          q: "Do you manage businesses outside Douala?",
          a: "Absolutely. We support SMEs in Yaoundé, Bafoussam, Buea and other cities in Cameroon. Everything is managed remotely via WhatsApp and Zoom/Meet meetings.",
        },
        {
          q: "What does the free digital audit include?",
          a: "The audit covers your social media presence, your website (if you have one), visual identity consistency and a benchmark of your direct competitors. Delivered within 48h, no commitment required.",
        },
        {
          q: "Can I see examples of your work before signing?",
          a: "Of course. Our Portfolio section shows some recent work. Also, during the free audit, we share specific examples relevant to your industry.",
        },
      ],
    },
    contact: {
      heading1: "Ready to boost",
      headingHighlight: "your brand",
      heading2: "?",
      sub: "Free digital audit in 48h. No commitment.",
      location: "Beedi, J & T Building, opposite Total Énergie — Douala",
      mapLabel: "Find us",
      name: "Your name",
      email: "Your email",
      message: "Tell us about your project…",
      submit: "Send via WhatsApp →",
    },
    footer: {
      tagline: "Your partner for online success",
      copy: "GMS-DC · Global Web Marketing Service · Douala, Cameroon",
    },
    whatsapp: { tooltip: "💬 Let's chat on WhatsApp!" },
    lightbox: { close: "Close", project: "Project" },
  },
} as const;

// ── Language Context ──────────────────────────────────────────────────────────
const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof T)["fr"];
}>({
  lang: "fr",
  setLang: () => {},
  t: T.fr,
});

function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("gmsdc-lang") as Lang) || "fr";
    } catch {
      return "fr";
    }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gmsdc-lang", l);
    } catch {}
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

function useLang() {
  return useContext(LangContext);
}

// ── Theme Context ─────────────────────────────────────────────────────────────
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("gmsdc-theme") as Theme) || "dark";
    } catch {
      return "dark";
    }
  });

  const applyTheme = useCallback((t: Theme) => {
    const html = document.documentElement;
    if (t === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("gmsdc-theme", next);
      } catch {}
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// ── Route ─────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  component: LandingPage,
});

const catalogueAssets = [cat1, cat2, cat3, cat4, cat5, cat6];

const statsValues = [15, 0, 5, 0];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target: number, duration = 1600, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled || target === 0) return;
    let startTime: number | null = null;
    const raf = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [target, duration, enabled]);
  return count;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Components ────────────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <ThemeProvider>
      <LangProvider>
        <LandingPageInner />
      </LangProvider>
    </ThemeProvider>
  );
}

function LandingPageInner() {
  useScrollReveal();
  const progress = useScrollProgress();

  return (
    <div className="min-h-screen">
      <div
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Packs />
        <FacebookAds />
        <CampaignBenefits />
        <Problems />
        <Catalogue />
        <Testimonials />
        <Automation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Logo GMS-DC"
      width={64}
      height={64}
      className={className}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#packs", label: t.nav.packs },
    { href: "#facebook-ads", label: t.nav.facebookAds },
    { href: "#catalogue", label: t.nav.catalogue },
    { href: "#temoignages", label: t.nav.avisClients },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">

      {/* ── Barre langue — visible dès l'entrée ── */}
      <div className="border-b border-border/30 bg-primary/[0.05]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-1.5 md:px-8">
          <p className="hidden text-[11px] text-muted-foreground/70 sm:block">
            🌍 Choisissez votre langue / Choose your language
          </p>
          <div className="mx-auto sm:mx-0 inline-flex rounded-full border border-border/60 bg-background/50 p-0.5">
            <button
              type="button"
              onClick={() => setLang("fr")}
              aria-pressed={lang === "fr"}
              className={
                "rounded-full px-4 py-1 text-[11px] font-bold transition-all " +
                (lang === "fr"
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              🇫🇷 Français
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={
                "rounded-full px-4 py-1 text-[11px] font-bold transition-all " +
                (lang === "en"
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 min-w-0">
          <Logo className="h-11 w-11 flex-none" />
          <div className="h-8 w-px bg-border/60 hidden sm:block" aria-hidden />
          <div className="leading-tight min-w-0 hidden sm:block">
            <div className="font-display text-xl font-extrabold tracking-tight">
              GMS-<span className="text-gradient">DC</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">
              Global Web Marketing Service
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Audit CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-magenta"
          >
            {t.nav.auditGratuit}
          </a>

          {/* Burger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground hover:bg-secondary/60 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            {/* Mobile controls row */}
            <div className="mt-3 flex gap-2 border-t border-border/40 pt-3">
              <button
                type="button"
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 py-2.5 text-sm font-semibold text-muted-foreground"
              >
                <Globe className="h-4 w-4" />
                {lang === "fr" ? "English" : "Français"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 py-2.5 text-sm font-semibold text-muted-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              {t.nav.auditGratuit}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28 lg:py-36">
        <div className="relative z-10">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
            {t.hero.badge}
          </div>
          <h1
            id="hero-heading"
            className="hero-title font-display text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {t.hero.title1}{" "}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              {t.hero.cta1}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/40 hover:bg-card hover:scale-[1.02]"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
        <div className="hero-visual relative flex items-center justify-center">
          <div
            className="absolute -inset-8 rounded-full bg-gradient-brand opacity-20 blur-3xl animate-float"
            aria-hidden
          />
          <img
            src={heroImg}
            alt="Réseau digital GMS-DC"
            width={600}
            height={480}
            className="relative z-10 w-full max-w-lg rounded-3xl object-cover shadow-[0_40px_100px_-20px_oklch(0_0_0/0.7)]"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
  isStatic,
  enabled,
}: {
  value: number;
  suffix: string;
  label: string;
  isStatic: boolean;
  enabled: boolean;
}) {
  const count = useCountUp(value, 1600, enabled && !isStatic);
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-gradient md:text-4xl">
        {isStatic ? suffix : `${count}${suffix}`}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  const { t } = useLang();
  const { ref, inView } = useInView(0.3);
  const isStaticFlags = [false, true, false, true];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="stats"
      aria-label="Key figures GMS-DC"
      className="border-y border-border bg-card/30"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4 md:px-8">
        {t.stats.map((s, i) => (
          <StatItem
            key={s.label}
            value={statsValues[i]}
            suffix={s.suffix}
            label={s.label}
            isStatic={isStaticFlags[i]}
            enabled={inView}
          />
        ))}
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          {s.label}
        </div>
        <h2 id="services-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
          {s.heading1}{" "}
          <span className="text-gradient">{s.headingHighlight}</span>{" "}
          {s.heading2}
        </h2>
        <p className="mt-4 text-muted-foreground">{s.sub}</p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item, i) => (
          <article
            key={item.title}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow-cyan"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              aria-hidden
            />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-2xl transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="font-display text-xl font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Packs() {
  const { t } = useLang();
  const p = t.packs;
  const [active, setActive] = useState(0);
  const pack = p.items[active];

  const networkIcons: Record<string, string> = {
    Facebook: "📘",
    TikTok: "🎵",
    Instagram: "📸",
    LinkedIn: "💼",
    YouTube: "▶️",
    WhatsApp: "💬",
  };

  return (
    <section id="packs" aria-labelledby="packs-heading" className="relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">

        {/* ── En-tête ── */}
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">{p.label}</div>
          <h2 id="packs-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {p.heading1}
            <span className="text-gradient">{p.headingHighlight}</span>
            {p.heading2}
          </h2>
          <p className="mt-4 text-muted-foreground">{p.sub}</p>
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-5 py-2 text-xs text-muted-foreground">
            <span className="font-black text-primary">PSSP</span>
            <span aria-hidden>·</span>
            <span>{p.method}</span>
          </div>
        </div>

        {/* ── Sélecteur de packs ── */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5" data-reveal>
          {p.items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 " +
                (active === i
                  ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan scale-[1.03]"
                  : "border border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground")
              }
            >
              {item.name}
              <span className={"ml-2 text-xs font-black " + (active === i ? "text-primary-foreground/80" : "text-primary")}>
                {item.price}
              </span>
            </button>
          ))}
        </div>

        {/* ── Panneau détail du pack actif ── */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Gauche — infos */}
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-black">{pack.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{pack.tag}</p>
                </div>
                {pack.accent && (
                  <span className="shrink-0 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    {p.popular}
                  </span>
                )}
              </div>

              <div className="mt-5">
                <span className="font-display text-5xl font-black">{pack.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">{p.perMonth}</span>
              </div>

              {/* Réseaux */}
              <div className="mt-6">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{p.networks}</p>
                <div className="flex flex-wrap gap-2">
                  {(pack.networks as string[]).map((n) => (
                    <span key={n} className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold">
                      <span aria-hidden>{networkIcons[n] ?? "🔗"}</span>{n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Publications */}
              <div className="mt-5 rounded-xl border border-border bg-background/40 px-4 py-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{p.pubsPerMonth}</p>
                <p className="mt-1 font-semibold text-foreground">{pack.pubs as string}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{pack.cadence as string}</p>
              </div>

              {/* Services inclus */}
              <ul className="mt-5 space-y-2.5">
                {(pack.features as string[]).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex-none text-primary" aria-hidden>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/237659252877?text=${encodeURIComponent("Bonjour GMS-DC, je suis intéressé par le Pack " + pack.name + " à " + pack.price + " FCFA/mois.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-[1.02] hover:shadow-glow-magenta"
              >
                {p.cta} — {pack.name} →
              </a>
            </div>

            {/* Droite — PSSP */}
            <div className="flex flex-col justify-center gap-4 border-t border-border bg-background/30 p-8 md:border-l md:border-t-0 md:p-12">
              <div className="rounded-2xl border border-primary/25 bg-primary/[0.07] p-5">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                  <span aria-hidden>⚡</span>{p.tabs.promise}
                </p>
                <p className="text-sm leading-relaxed">{pack.promise as string}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  <span aria-hidden>🧭</span>{p.tabs.strategy}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{pack.strategy as string}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  <span aria-hidden>📊</span>{p.tabs.proof}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{pack.proof as string}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Services ponctuels + Campagnes à la carte ── */}
        <div className="mt-14 grid gap-8 md:grid-cols-2" data-reveal>
          {/* Services ponctuels */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <div className="mb-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">{p.addons.label}</div>
            <h3 className="font-display text-xl font-black">{p.addons.heading}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.addons.sub}</p>
            <table className="mt-6 w-full text-sm" aria-label={p.addons.heading}>
              <tbody>
                {p.addons.items.map((row, i) => (
                  <tr key={row.service} className={"border-b border-border/50 " + (i % 2 === 0 ? "bg-background/25" : "")}>
                    <td className="py-2.5 pl-2 pr-4 text-foreground">{row.service}</td>
                    <td className="py-2.5 pr-2 text-right font-semibold text-primary whitespace-nowrap">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs italic text-muted-foreground/70">{p.addons.note}</p>
          </div>

          {/* Campagnes à la carte */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
            <div className="mb-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">{p.adCarte.label}</div>
            <h3 className="font-display text-xl font-black">{p.adCarte.heading}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{p.adCarte.sub}</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm" aria-label={p.adCarte.heading}>
                <thead>
                  <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2.5 pl-2 pr-4">{p.adCarte.headers.duration}</th>
                    <th className="px-2 py-2.5 text-right">{p.adCarte.headers.starter}</th>
                    <th className="px-2 py-2.5 text-right">{p.adCarte.headers.message}</th>
                    <th className="px-2 py-2.5 text-right">{p.adCarte.headers.pme}</th>
                    <th className="py-2.5 pl-2 pr-2 text-right">{p.adCarte.headers.premium}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.adCarte.items.map((row, i) => (
                    <tr key={row.formula} className={"border-b border-border/50 " + (i % 2 === 0 ? "bg-background/25" : "")}>
                      <td className="py-2.5 pl-2 pr-4 text-foreground">{row.formula}</td>
                      <td className="px-2 py-2.5 text-right font-semibold text-primary whitespace-nowrap">{row.starter}</td>
                      <td className="px-2 py-2.5 text-right font-semibold text-primary whitespace-nowrap">{row.message}</td>
                      <td className="px-2 py-2.5 text-right font-semibold text-primary whitespace-nowrap">{row.pme}</td>
                      <td className="py-2.5 pl-2 pr-2 text-right font-semibold text-primary whitespace-nowrap">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex-1 rounded-xl border border-border bg-background/40 p-4 text-xs text-muted-foreground">
              <span aria-hidden>💡 </span>{p.adCarte.note}
            </div>
          </div>
        </div>

        {/* ── Conditions générales ── */}
        <div className="mt-10" data-reveal>
          <h3 className="mb-6 text-center font-display text-xl font-black">{p.conditions.heading}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {p.conditions.items.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card/70 p-5 transition-all hover:border-primary/30 hover:shadow-card">
                <span className="text-2xl" aria-hidden>{c.icon}</span>
                <p className="mt-3 text-sm font-bold leading-snug">{c.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Facebook Ads Section ──────────────────────────────────────────────────────

function StarRow({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          className={i < count ? "text-primary" : "text-muted-foreground/30"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width={16}
          height={16}
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function FacebookAds() {
  const { t } = useLang();
  const fb = t.fbAds;
  const [tab, setTab] = useState<"7j" | "1m">("7j");

  return (
    <section
      id="facebook-ads"
      aria-labelledby="fbads-heading"
      className="relative border-t border-border/60 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-brand opacity-[0.06] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-brand opacity-[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center" data-reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1877F2]/30 bg-[#1877F2]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1877F2]">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            {fb.label}
          </div>
          <h2 id="fbads-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {fb.heading1}{" "}
            <span className="text-gradient">{fb.headingHighlight}</span>{" "}
            {fb.heading2}
          </h2>
          <p className="mt-4 text-muted-foreground">{fb.sub}</p>
        </div>

        {/* Duration toggle */}
        <div className="flex justify-center mb-10" data-reveal>
          <div className="inline-flex rounded-full border border-border bg-card/50 p-1 shadow-card">
            <button
              type="button"
              onClick={() => setTab("7j")}
              className={
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 " +
                (tab === "7j"
                  ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {fb.tab7j}
            </button>
            <button
              type="button"
              onClick={() => setTab("1m")}
              className={
                "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 " +
                (tab === "1m"
                  ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {fb.tab1m}
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {fb.plans.map((plan, i) => (
            <article
              key={plan.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className={
                "relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 " +
                (plan.accent
                  ? "border-transparent bg-card shadow-glow-magenta"
                  : "border-border bg-card/70 shadow-card hover:border-primary/40 hover:shadow-glow-cyan")
              }
            >
              {plan.accent && (
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-brand p-px" aria-hidden>
                  <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-card" />
                </div>
              )}

              {/* Facebook icon */}
              <div
                className={
                  "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white text-2xl shadow-lg " +
                  (plan.accent
                    ? "bg-[#1877F2]"
                    : "bg-[#1877F2]/80")
                }
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide">
                  {plan.name}
                </h3>
                {plan.accent && (
                  <span className="rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Best
                  </span>
                )}
              </div>

              <StarRow count={plan.stars} />

              {/* Price */}
              <div className="mt-6 transition-all duration-300">
                <div className="font-display text-4xl font-black text-gradient">
                  {tab === "7j" ? plan.price7j : plan.price1m}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  FCFA — {tab === "7j" ? fb.tab7j : fb.tab1m}
                </div>
              </div>

              {/* Reach */}
              <div className="mt-5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
                <div className="animate-shimmer font-display text-2xl font-extrabold text-orange-500">
                  {plan.reach}
                </div>
                <div className="mt-0.5 text-xs text-orange-400/80">{fb.reach}</div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {plan.desc}
              </p>

              <a
                href="https://wa.me/237659252877?text=Bonjour%20GMS-DC%2C%20je%20voudrais%20lancer%20une%20campagne%20Facebook%20Ads."
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] " +
                  (plan.accent
                    ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan hover:shadow-glow-magenta"
                    : "border border-border bg-card hover:border-primary/40 hover:bg-secondary/60")
                }
              >
                {fb.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Campaign Benefits ─────────────────────────────────────────────────────────

function CampaignBenefits() {
  const { t } = useLang();
  const c = t.campaign;
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="campagne"
      aria-labelledby="campagne-heading"
      className="relative border-t border-border/60 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            {c.label}
          </div>
          <h2 id="campagne-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {c.heading1}{" "}
            <span className="text-gradient">{c.headingHighlight}</span>{" "}
            {c.heading2}
          </h2>
          {/* Expandable intro */}
          <div className="mt-4 overflow-hidden transition-all duration-500" style={{ maxHeight: expanded ? "200px" : "0px" }}>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.intro}</p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            {expanded ? (t as typeof T["fr"]).nav.services !== "Services" ? "Show less" : "Voir moins" : (t as typeof T["fr"]).nav.services !== "Services" ? "Learn more" : "En savoir plus"}
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, i) => (
            <article
              key={b.num}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow-cyan"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                aria-hidden
              />
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-brand-soft text-xl transition-transform duration-300 group-hover:scale-110">
                  {b.icon}
                </span>
                <span className="font-display text-2xl font-black text-gradient leading-none">
                  {b.num}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center" data-reveal>
          <a
            href="https://wa.me/237659252877?text=Bonjour%20GMS-DC%2C%20je%20voudrais%20démarrer%20une%20campagne%20publicitaire."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
          >
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const { t } = useLang();
  const p = t.problems;
  return (
    <section id="problemes" aria-labelledby="problemes-heading" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">{p.label}</div>
        <h2 id="problemes-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
          {p.heading1}{" "}
          <span className="text-gradient">{p.headingHighlight}</span>
          {p.heading2}
        </h2>
        <p className="mt-4 text-muted-foreground">{p.sub}</p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {p.items.map((item, i) => (
          <article
            key={item.num}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-primary/50"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              aria-hidden
            />
            <div className="flex items-start gap-5">
              <div className="font-display text-4xl font-black text-gradient leading-none">{item.num}</div>
              <div>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex justify-center" data-reveal>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
        >
          {p.cta}
        </a>
      </div>
    </section>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  src,
  alt,
  title,
  category,
  onClose,
}: {
  src: string;
  alt: string;
  title: string;
  category: string;
  onClose: () => void;
}) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.lightbox.project} — ${title}`}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-border shadow-[0_40px_100px_-20px_oklch(0_0_0/0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.lightbox.close}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <img src={src} alt={alt} className="w-full object-contain max-h-[80vh]" />
        <div className="bg-card px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{category}</p>
          <p className="mt-1 font-display text-lg font-bold">{title}</p>
        </div>
      </div>
    </div>
  );
}

function Catalogue() {
  const { t } = useLang();
  const c = t.catalogue;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  return (
    <section id="catalogue" aria-labelledby="catalogue-heading" className="relative border-t border-border/60 bg-background py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{c.label}</p>
          <h2 id="catalogue-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {c.heading}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{c.sub}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {c.items.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow-cyan"
            >
              <button
                type="button"
                className="relative aspect-square w-full overflow-hidden bg-muted block text-left"
                onClick={() => openLightbox(i)}
                aria-label={`Agrandir ${item.title}`}
              >
                <img
                  src={catalogueAssets[i]}
                  alt={`${item.title} — ${item.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card/0 opacity-0 transition-all duration-300 group-hover:bg-card/90 group-hover:opacity-100 scale-75 group-hover:scale-100">
                    <ZoomIn className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </button>
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.category}</p>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center" data-reveal>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:scale-[1.02]"
          >
            {c.cta}
          </a>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          src={catalogueAssets[lightboxIdx]}
          alt={`${c.items[lightboxIdx].title} — ${c.items[lightboxIdx].category}`}
          title={c.items[lightboxIdx].title}
          category={c.items[lightboxIdx].category}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={i < rating ? "text-primary" : "text-muted"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width={14}
          height={14}
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: { name: string; role: string; text: string; initials: string; rating: number };
  delay: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow-cyan"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        aria-hidden
      />
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
        "{testimonial.text}"
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
          {testimonial.initials}
        </div>
        <div>
          <div className="text-sm font-semibold">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </article>
  );
}

function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;
  return (
    <section
      id="temoignages"
      aria-labelledby="temoignages-heading"
      className="relative border-t border-border/60 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{tm.label}</p>
          <h2 id="temoignages-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {tm.heading1}{" "}
            <span className="text-gradient">{tm.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{tm.sub}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tm.items.slice(0, 3).map((item, i) => (
            <TestimonialCard key={item.name} testimonial={item} delay={i * 90} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 md:mx-auto md:max-w-3xl">
          {tm.items.slice(3).map((item, i) => (
            <TestimonialCard key={item.name} testimonial={item} delay={(i + 3) * 90} />
          ))}
        </div>
        <div className="mt-12 text-center" data-reveal>
          <a
            href={tm.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-magenta"
          >
            {tm.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Automation() {
  const { t } = useLang();
  const a = t.automation;
  return (
    <section id="automatisation" aria-labelledby="automation-heading" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div data-reveal="left">
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">{a.label}</div>
          <h2 id="automation-heading" className="font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {a.heading1}
            <br />
            <span className="text-gradient">{a.heading2}</span> {a.heading3}
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{a.sub}</p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-all hover:bg-secondary hover:border-primary/40 hover:scale-[1.02]"
          >
            {a.cta}
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {a.items.map((item, idx) => (
            <div
              key={item.title}
              data-reveal
              style={{
                "--reveal-delay": `${idx * 80}ms`,
                transform: idx % 2 === 1 ? "translateY(24px)" : undefined,
              } as React.CSSProperties}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-sm font-bold text-primary-foreground">
                {idx + 1}
              </div>
              <h3 className="font-display text-base font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-muted-foreground transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
        aria-hidden={!open}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-t border-border/60 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-12 text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{f.label}</p>
          <h2 id="faq-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {f.heading1}{" "}
            <span className="text-gradient">{f.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">{f.sub}</p>
        </div>
        <div data-reveal className="rounded-2xl border border-border bg-card px-7 shadow-card">
          {f.items.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-muted-foreground" data-reveal>
          {f.waQuestion}{" "}
          <a
            href="https://wa.me/237659252877?text=Bonjour%20GMS-DC%2C%20j%27ai%20une%20question%20%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            {f.waLink}
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  const c = t.contact;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative">
      <div className="mx-auto max-w-5xl px-5 pb-24 md:px-8 md:pb-32">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card md:p-16"
        >
          <div className="absolute inset-0 bg-gradient-brand opacity-[0.08]" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-start">
            {/* Left — info */}
            <div>
              <h2 id="contact-heading" className="font-display text-3xl font-black tracking-tight md:text-4xl">
                {c.heading1} <span className="text-gradient">{c.headingHighlight}</span>
                {c.heading2}
              </h2>
              <p className="mt-4 text-muted-foreground">{c.sub}</p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="tel:+237659252877" className="flex items-center gap-3 text-foreground transition-colors hover:text-primary">
                  <span className="text-lg">📞</span>+237 659 252 877
                </a>
                <a href="mailto:globalwebmarketingservice@gmail.com" className="flex items-center gap-3 text-foreground transition-colors hover:text-primary">
                  <span className="text-lg">✉️</span>globalwebmarketingservice@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/global_webmarketing_services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">📸</span>@global_webmarketing_services
                </a>
                <a
                  href="https://www.facebook.com/share/1ENuhoaej9/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">📘</span>Global Webmarketing Services
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-lg leading-none mt-0.5">📍</span>
                  <span>{c.location}</span>
                </div>
              </div>

              {/* ── Google Map ── */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {c.mapLabel}
                </p>
                <div className="overflow-hidden rounded-2xl border border-border shadow-card">
                  <iframe
                    title="GMS-DC — Beedi, Douala"
                    src="https://maps.google.com/maps?q=Beedi+Akwa+Douala+Cameroun&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="260"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Localisation GMS-DC — Beedi, Immeuble J et T, face Total Énergie, Douala"
                  />
                </div>
                <a
                  href="https://maps.google.com/maps?q=Beedi+Akwa+Douala+Cameroun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>↗</span> Ouvrir dans Google Maps
                </a>
              </div>
            </div>

            {/* Right — form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const msg = `Bonjour GMS-DC, je m'appelle ${data.get("name")} (${data.get("email")}). ${data.get("message")}`;
                const url = `https://wa.me/237659252877?text=${encodeURIComponent(msg)}`;
                window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              <input
                required
                type="text"
                name="name"
                placeholder={c.name}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <input
                required
                type="email"
                name="email"
                placeholder={c.email}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder={c.message}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.02] hover:shadow-glow-cyan"
              >
                {c.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppWidget() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t2 = setTimeout(() => setTooltip(false), 6000);
    return () => clearTimeout(t2);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="animate-fade-in flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-card text-sm font-medium">
          {t.whatsapp.tooltip}
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setTooltip(false)}
            className="ml-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <a
        href="https://wa.me/237659252877?text=Bonjour%20GMS-DC%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20vos%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter GMS-DC sur WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_32px_-8px_rgba(37,211,102,0.7)] transition-all hover:scale-110 hover:shadow-[0_12px_40px_-8px_rgba(37,211,102,0.85)]"
        style={{ background: "#25D366" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

function Footer() {
  const { t } = useLang();
  const n = t.nav;
  const f = t.footer;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div className="h-6 w-px bg-border/60" aria-hidden />
          <div className="text-sm">
            <div className="font-display font-extrabold">GMS-DC</div>
            <div className="text-xs text-muted-foreground">{f.tagline}</div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">{n.services}</a>
          <a href="#packs" className="hover:text-foreground transition-colors">{n.packs}</a>
          <a href="#facebook-ads" className="hover:text-foreground transition-colors">{n.facebookAds}</a>
          <a href="#catalogue" className="hover:text-foreground transition-colors">{n.catalogue}</a>
          <a href="#temoignages" className="hover:text-foreground transition-colors">{n.avisClients}</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-foreground transition-colors">{n.contact}</a>
        </nav>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {f.copy}
        </div>
      </div>
    </footer>
  );
}
