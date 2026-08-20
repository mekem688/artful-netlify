import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// ── Constants ──────────────────────────────────────────────────────────
const SITE_URL = "https://classy-cendol-219ec6.netlify.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const PHONE = "+237659252877";
const EMAIL = "globalwebmarketingservice@gmail.com";

// ── JSON-LD structured data ───────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: "GMS-DC",
  alternateName: [
    "GMS",
    "Global Web Marketing Service",
    "GMS Douala",
    "GMS Cameroun",
  ],
  description:
    "Agence de marketing digital et community management à Douala, Cameroun. Publicité Meta & TikTok Ads, identité visuelle, automatisation WhatsApp et sites web pour PME camerounaises.",
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.ico`,
    width: "48",
    height: "48",
  },
  image: {
    "@type": "ImageObject",
    url: OG_IMAGE,
    width: "1200",
    height: "630",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Douala",
    addressRegion: "Littoral",
    addressCountry: "CM",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "4.0511",
    longitude: "9.7679",
  },
  areaServed: [
    { "@type": "City", name: "Douala" },
    { "@type": "Country", name: "Cameroun" },
  ],
  knowsLanguage: ["fr"],
  currenciesAccepted: "XAF",
  paymentAccepted: "Mobile Money, virement bancaire, espèces",
  priceRange: "FCFA 100 000 – 400 000 / mois",
  sameAs: [
    "https://www.facebook.com/share/1ENuhoaej9/",
    "https://www.instagram.com/global_webmarketing_services",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services GMS-DC",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Community Management",
          description:
            "Stratégie éditoriale, création de contenu et animation quotidienne sur Facebook, Instagram, TikTok, LinkedIn et WhatsApp Business.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Publicité en ligne (Meta Ads & TikTok Ads)",
          description:
            "Campagnes Meta Ads & TikTok Ads ciblées sur le marché camerounais, avec optimisation du ROAS et reporting transparent.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Identité visuelle",
          description:
            "Logo, charte graphique, déclinaisons print et web. Une marque cohérente, moderne et reconnaissable partout.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatisation WhatsApp & CRM",
          description:
            "Réponses automatiques WhatsApp, planification de publications, tunnels de conversion et intégrations CRM.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Création de sites web et applications",
          description:
            "Sites vitrine, e-commerce et applications sur mesure, pensés mobile-first pour la connexion locale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vidéo & motion design",
          description:
            "Montage vidéo, stories, reels et vidéos courtes qui accrochent l'audience jeune et urbaine du Cameroun.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Pourquoi mon profil Facebook ou Instagram manque de crédibilité ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un profil incomplet — sans numéro, sans adresse, sans description claire, sans photo sérieuse — crée un doute immédiat chez le client potentiel. GMS-DC optimise votre profil pour le rendre professionnel et fiable.",
      },
    },
    {
      "@type": "Question",
      name: "À quelle fréquence faut-il publier sur les réseaux sociaux ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Des publications irrégulières donnent l'impression que l'activité est arrêtée. GMS-DC établit un calendrier éditorial régulier et automatisé pour maintenir votre présence active.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir plus d'avis et de témoignages clients ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GMS-DC met en place des stratégies de collecte d'avis : relances automatiques post-achat, mise en avant des témoignages existants et création de contenus preuve sociale.",
      },
    },
    {
      "@type": "Question",
      name: "Comment ne plus rater les messages de prospects sur WhatsApp ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GMS-DC configure des réponses automatiques WhatsApp Business qui qualifient les prospects 24h/24 et vous transfèrent les demandes chaudes.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les tarifs des packs de community management ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GMS-DC propose trois formules : Pack Starter à 100 000 FCFA/mois, Pack Standard à 220 000 FCFA/mois (le plus populaire), et Pack Premium à 400 000 FCFA/mois.",
      },
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "GMS-DC — Agence marketing digital & community management au Cameroun",
  description:
    "GMS-DC (Global Web Marketing Service) — agence digitale à Douala, Cameroun. Community management, publicité Meta & TikTok Ads, identité visuelle, automatisation WhatsApp et sites web pour PME camerounaises.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": SITE_URL },
  about: { "@id": `${SITE_URL}/#business` },
  datePublished: "2024-01-01",
  dateModified: "2026-07-17",
};

// ── Error / 404 components ────────────────────────────────────────────────────
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Erreur 404</p>
        <h1 className="mt-2 font-display text-7xl font-black text-foreground">
          Oups !
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page introuvable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-105"
          >
            Retour à l'accueil
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Une erreur s'est produite
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quelque chose s'est mal passé. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-105"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Root route ──────────────────────────────────────────────────────────
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // ── Primary meta ──────────────────────────────────────────────────────
      { title: "GMS-DC — Marketing Digital & Community Management Cameroun" },
      {
        name: "description",
        content:
          "GMS-DC, agence digitale à Douala : community management, Meta & TikTok Ads, identité visuelle, automatisation WhatsApp et sites web pour PME.",
      },
      {
        name: "keywords",
        content:
          "GMS, GMS-DC, GMS Douala, GMS Cameroun, Global Web Marketing Service, agence marketing digital Cameroun, community management Douala, publicité Meta Ads Cameroun, TikTok Ads Cameroun, sites web Cameroun",
      },
      { name: "author", content: "GMS-DC — Global Web Marketing Service" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },

      // ── Local / geographic meta ────────────────────────────────────────────
      { name: "geo.region", content: "CM-LT" },
      { name: "geo.placename", content: "Douala, Cameroun" },
      { name: "geo.position", content: "4.0511;9.7679" },
      { name: "ICBM", content: "4.0511, 9.7679" },

      // ── Mobile / browser ──────────────────────────────────────────────────
      { name: "theme-color", content: "#00c8f0" },
      { name: "msapplication-TileColor", content: "#1a0f2e" },

      // ── Verification ──────────────────────────────────────────────────────
      { name: "google-site-verification", content: "6fBOYBkJhyzstWKObZ7XWRQ60tHcZPofE5UQO6BVVQo" },

      // ── Open Graph ────────────────────────────────────────────────────────
      { property: "og:site_name", content: "GMS-DC" },
      { property: "og:locale", content: "fr_CM" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "GMS-DC — Agence Marketing Digital au Cameroun" },
      {
        property: "og:description",
        content:
          "Agence digitale à Douala : community management, publicité Meta & TikTok Ads, identité visuelle, automatisation WhatsApp et sites web pour PME camerounaises.",
      },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "GMS-DC — Agence Marketing Digital Douala Cameroun" },

      // ── Twitter / X Card ──────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@gmsdc_douala" },
      { name: "twitter:title", content: "GMS-DC — Agence Marketing Digital au Cameroun" },
      {
        name: "twitter:description",
        content:
          "Agence digitale à Douala : community management, publicité Meta & TikTok Ads, identité visuelle, automatisation WhatsApp et sites web pour PME.",
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "GMS-DC — Agence Marketing Digital Douala Cameroun" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700;800;900&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(webPageSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
