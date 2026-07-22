import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ZoomIn, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-network.jpg";
import logoImg from "@/assets/gms-logo.png";
import cat1 from "@/assets/IMG_4437.jpeg.asset.json";
import cat2 from "@/assets/IMG_4436.jpeg.asset.json";
import cat3 from "@/assets/IMG_4428.jpeg.asset.json";
import cat4 from "@/assets/IMG_4435.jpeg.asset.json";

const catalogue = [
  {
    src: cat1.url,
    title: "Dare Design House",
    category: "Carte de visite",
    desc: "Identité visuelle et carte de visite recto-verso pour une entreprise de BTP et décoration.",
  },
  {
    src: cat2.url,
    title: "Ornel Beauty",
    category: "Publication réseaux sociaux",
    desc: "Visuel hebdomadaire pour institut de beauté — direction artistique douce et lumineuse.",
  },
  {
    src: cat3.url,
    title: "MCG Group & Co",
    category: "Affiche digitale",
    desc: "Communication e-commerce import/export Chine–Cameroun, mise en page dynamique.",
  },
  {
    src: cat4.url,
    title: "Luxklin SARL",
    category: "Logo & branding",
    desc: "Logo épuré pour société de nettoyage et d'entretien professionnel.",
  },
];

const testimonials = [
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
];

const faqItems = [
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
];

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const services = [
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
];

const packs = [
  {
    name: "Starter",
    price: "100 000",
    tag: "Idéal pour démarrer",
    features: [
      "1 réseau social géré",
      "8 publications / mois",
      "Visuels basiques",
      "Reporting trimestriel",
      "Support WhatsApp",
    ],
    accent: false,
  },
  {
    name: "Standard",
    price: "220 000",
    tag: "Le plus populaire",
    features: [
      "2 réseaux sociaux",
      "16 publications / mois",
      "Visuels personnalisés",
      "1 campagne publicitaire / mois",
      "Reporting mensuel",
    ],
    accent: true,
  },
  {
    name: "Premium",
    price: "400 000",
    tag: "Croissance rapide",
    features: [
      "3 réseaux + WhatsApp Business",
      "24 publications + Stories",
      "Vidéos courtes incluses",
      "2 campagnes publicitaires / mois",
      "Reporting détaillé & stratégie",
    ],
    accent: false,
  },
];

const problems = [
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
];

const stats = [
  { value: 15, suffix: "+", label: "PME accompagnées", static: false },
  { value: 0, suffix: "24 / 7", label: "Automatisation active", static: true },
  { value: 5, suffix: " ans", label: "Expertise digitale", static: false },
  { value: 0, suffix: "Douala", label: "Basé au Cameroun", static: true },
];

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
        <Problems />
        <Catalogue />
        <Testimonials />
        <Automation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {/* Floating WhatsApp widget — always visible */}
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
  const links = [
    { href: "#services", label: "Services" },
    { href: "#packs", label: "Packs PME" },
    { href: "#catalogue", label: "Catalogue" },
    { href: "#temoignages", label: "Avis clients" },
    { href: "#automatisation", label: "Automatisation" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
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
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
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
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-magenta"
          >
            Audit gratuit
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground hover:bg-secondary/60 transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
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
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Audit gratuit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28 lg:py-36">
        <div className="relative z-10">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"
              aria-hidden
            />
            Agence de marketing digital · Douala
          </div>
          <h1
            id="hero-heading"
            className="hero-title font-display text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Votre marque mérite{" "}
            <span className="text-gradient">d'être vue.</span>
          </h1>
          <p className="hero-subtitle mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Community management, publicité Meta & TikTok, identité visuelle et
            automatisation — nous gérons votre présence digitale pour que vous
            puissiez vous concentrer sur votre cœur de métier.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Audit gratuit sous 48 h
              <span aria-hidden>→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/40 hover:bg-card hover:scale-[1.02]"
            >
              Voir nos services
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
  const { ref, inView } = useInView(0.3);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="stats"
      aria-label="Chiffres clés GMS-DC"
      className="border-y border-border bg-card/30"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4 md:px-8">
        {stats.map((s) => (
          <StatItem
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            isStatic={s.static}
            enabled={inView}
          />
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Ce que nous faisons
        </div>
        <h2 id="services-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
          Une <span className="text-gradient">agence complète</span> pour votre
          marque.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Du branding à la campagne publicitaire, en passant par
          l'automatisation de votre relation client — nous couvrons toute la
          chaîne digitale.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <article
            key={s.title}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow-cyan"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              aria-hidden
            />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-2xl transition-transform duration-300 group-hover:scale-110">
              {s.icon}
            </div>
            <h3 className="font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Packs() {
  return (
    <section id="packs" aria-labelledby="packs-heading" className="relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Formules d'abonnement
          </div>
          <h2 id="packs-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
            Des packs <span className="text-gradient">pensés pour les PME</span>{" "}
            camerounaises.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Paiement Mobile Money, virement ou espèces. Engagement minimum de 3
            mois. Budget publicitaire distinct des honoraires.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <article
              key={p.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className={
                "relative rounded-3xl border p-8 transition-all duration-300 " +
                (p.accent
                  ? "border-transparent bg-card shadow-glow-magenta hover:-translate-y-1.5"
                  : "border-border bg-card/70 shadow-card hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow-cyan")
              }
            >
              {p.accent && (
                <div
                  className="absolute inset-0 -z-10 rounded-3xl bg-gradient-brand p-px"
                  aria-hidden
                >
                  <div className="h-full w-full rounded-[calc(1.5rem-1px)] bg-card" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-extrabold">{p.name}</h3>
                {p.accent && (
                  <span className="rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Populaire
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </div>
              <div className="mt-6">
                <span className="font-display text-3xl font-black">
                  {p.price}
                </span>
                <span className="text-sm text-muted-foreground"> FCFA / mois</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex-none text-primary" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={
                  "mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] " +
                  (p.accent
                    ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan hover:shadow-glow-magenta"
                    : "border border-border bg-card hover:border-primary/40 hover:bg-secondary/60")
                }
              >
                Choisir ce pack
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problems() {
  return (
    <section id="problemes" aria-labelledby="problemes-heading" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Diagnostic
        </div>
        <h2 id="problemes-heading" className="font-display text-4xl font-black tracking-tight md:text-5xl">
          Pourquoi votre page{" "}
          <span className="text-gradient">manque de crédibilité</span> ?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Vous avez peut-être un bon business… mais votre page ne rassure pas.
          Voici les 4 erreurs les plus fréquentes que nous corrigeons chez nos clients.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {problems.map((p, i) => (
          <article
            key={p.num}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1.5 hover:border-primary/50"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
              aria-hidden
            />
            <div className="flex items-start gap-5">
              <div className="font-display text-4xl font-black text-gradient leading-none">
                {p.num}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
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
          Qu'attendez-vous pour nous laisser gérer votre page ?
          <span aria-hidden>→</span>
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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
      aria-label={`Réalisation — ${title}`}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-border shadow-[0_40px_100px_-20px_oklch(0_0_0/0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full object-contain max-h-[80vh]"
        />
        <div className="bg-card px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {category}
          </p>
          <p className="mt-1 font-display text-lg font-bold">{title}</p>
        </div>
      </div>
    </div>
  );
}

function Catalogue() {
  const [lightbox, setLightbox] = useState<(typeof catalogue)[0] | null>(null);
  const openLightbox = useCallback((item: (typeof catalogue)[0]) => {
    setLightbox(item);
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="catalogue" aria-labelledby="catalogue-heading" className="relative border-t border-border/60 bg-background py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Catalogue
          </p>
          <h2 id="catalogue-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quelques réalisations pour nos clients
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Identité visuelle, cartes de visite, affiches, publications réseaux sociaux — chaque projet est
            pensé pour renforcer la crédibilité de votre marque.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {catalogue.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow-cyan"
            >
              <button
                type="button"
                className="relative aspect-square w-full overflow-hidden bg-muted block text-left"
                onClick={() => openLightbox(item)}
                aria-label={`Agrandir la réalisation ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={`Réalisation ${item.title} — ${item.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Zoom overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card/0 opacity-0 transition-all duration-300 group-hover:bg-card/90 group-hover:opacity-100 group-hover:scale-100 scale-75">
                    <ZoomIn className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </button>
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {item.category}
                </p>
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
            Vous voulez le même niveau de rendu pour votre marque ?
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={`Réalisation ${lightbox.title} — ${lightbox.category}`}
          title={lightbox.title}
          category={lightbox.category}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
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

function Testimonials() {
  return (
    <section
      id="temoignages"
      aria-labelledby="temoignages-heading"
      className="relative border-t border-border/60 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Témoignages
          </p>
          <h2
            id="temoignages-heading"
            className="font-display text-4xl font-black tracking-tight md:text-5xl"
          >
            Ce que disent{" "}
            <span className="text-gradient">nos clients</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Des PME doualaïses et camerounaises qui ont fait confiance à GMS-DC pour leur présence digitale.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} delay={i * 90} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 md:mx-auto md:max-w-3xl">
          {testimonials.slice(3).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} delay={(i + 3) * 90} />
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-all hover:scale-[1.03] hover:shadow-glow-magenta"
          >
            Rejoindre nos clients satisfaits
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  delay,
}: {
  testimonial: (typeof testimonials)[0];
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

function Automation() {
  const items = [
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
  ];
  return (
    <section id="automatisation" aria-labelledby="automation-heading" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div data-reveal="left">
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Automatisation
          </div>
          <h2 id="automation-heading" className="font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
            Gagnez du temps.
            <br />
            <span className="text-gradient">Automatisez</span> ce qui peut l'être.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            L'automatisation, ce n'est pas remplacer l'humain — c'est libérer
            votre équipe des tâches répétitives pour se concentrer sur ce qui
            fait vraiment vendre.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-all hover:bg-secondary hover:border-primary/40 hover:scale-[1.02]"
          >
            Parler à un expert
            <span aria-hidden>→</span>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, idx) => (
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

// ── FAQ ───────────────────────────────────────────────────────────────────────

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
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative border-t border-border/60 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="mb-12 text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display text-4xl font-black tracking-tight md:text-5xl"
          >
            Questions{" "}
            <span className="text-gradient">fréquentes</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tout ce que vous voulez savoir avant de nous contacter.
          </p>
        </div>
        <div
          data-reveal
          className="rounded-2xl border border-border bg-card px-7 shadow-card"
        >
          {faqItems.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-muted-foreground" data-reveal>
          Une question non listée ?{" "}
          <a
            href="https://wa.me/237659252877?text=Bonjour%20GMS-DC%2C%20j%27ai%20une%20question%20%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Écrivez-nous sur WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative">
      <div className="mx-auto max-w-5xl px-5 pb-24 md:px-8 md:pb-32">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card md:p-16"
        >
          <div
            className="absolute inset-0 bg-gradient-brand opacity-[0.08]"
            aria-hidden
          />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 id="contact-heading" className="font-display text-3xl font-black tracking-tight md:text-4xl">
                Prêt à propulser <span className="text-gradient">votre marque</span> ?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Audit digital gratuit sous 48 h. Sans engagement.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a
                  href="tel:+237659252877"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">📞</span>
                  +237 659 252 877
                </a>
                <a
                  href="mailto:globalwebmarketingservice@gmail.com"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">✉️</span>
                  globalwebmarketingservice@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/global_webmarketing_services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">📸</span>
                  @global_webmarketing_services
                </a>
                <a
                  href="https://www.facebook.com/share/1ENuhoaej9/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg">📘</span>
                  Global Webmarketing Services
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-lg">📍</span>
                  Douala, Cameroun
                </div>
              </div>
            </div>
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
                placeholder="Votre nom"
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Votre e-mail"
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Parlez-nous de votre projet…"
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.02] hover:shadow-glow-cyan"
              >
                Envoyer via WhatsApp
                <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp floating widget ──────────────────────────────────────────────────

function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    // Show widget after 2 seconds
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Hide tooltip after 6 seconds
    if (!visible) return;
    const t = setTimeout(() => setTooltip(false), 6000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="animate-fade-in flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-card text-sm font-medium">
          💬 Discutons sur WhatsApp !
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
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div className="h-6 w-px bg-border/60" aria-hidden />
          <div className="text-sm">
            <div className="font-display font-extrabold">GMS-DC</div>
            <div className="text-xs text-muted-foreground">
              Votre partenaire pour le succès en ligne
            </div>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#packs" className="hover:text-foreground transition-colors">Packs PME</a>
          <a href="#catalogue" className="hover:text-foreground transition-colors">Catalogue</a>
          <a href="#temoignages" className="hover:text-foreground transition-colors">Avis clients</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} GMS-DC · Global Web Marketing Service · Douala, Cameroun
        </div>
      </div>
    </footer>
  );
}
