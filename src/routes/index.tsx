import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
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
        <Automation />
        <Contact />
      </main>
      <Footer />
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
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow-cyan"
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
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundPosition: "center right",
          backgroundSize: "cover",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 45%, black 100%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-7">
          <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
            Agence digitale · Douala, Cameroun
          </div>
          <h1 className="hero-title font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Votre partenaire
            <br />
            pour le succès{" "}
            <span className="text-gradient">en ligne.</span>
          </h1>
          <p className="hero-desc mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Nous propulsons les PME camerounaises avec une identité visuelle
            forte, une présence digitale professionnelle et l'automatisation
            de leur communication.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap gap-4">
            <a
              href="#packs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-magenta transition-all hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Découvrir nos packs
              <span aria-hidden>→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-card hover:border-primary/50"
            >
              Voir nos services
            </a>
          </div>
        </div>
        <div className="hero-visual relative md:col-span-5">
          <div className="animate-float relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-6 rounded-3xl bg-gradient-brand-soft blur-2xl" />
            <div className="relative flex h-full items-center justify-center rounded-3xl border border-border bg-card/40 p-10 backdrop-blur-xl shadow-card">
              <img
                src={logoImg}
                alt="Logo GMS-DC"
                width={512}
                height={512}
                className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(255,0,255,0.35)]"
              />
            </div>
          </div>
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
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="max-w-2xl" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Nos expertises
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
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
    <section id="packs" className="relative">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Formules d'abonnement
          </div>
          <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
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
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-black">{p.price}</span>
                <span className="text-sm text-muted-foreground">FCFA / mois</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-gradient-brand"
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={
                  "mt-10 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] " +
                  (p.accent
                    ? "bg-gradient-brand text-primary-foreground shadow-glow-cyan hover:shadow-glow-magenta"
                    : "border border-border bg-secondary text-foreground hover:bg-secondary/80 hover:border-primary/40")
                }
              >
                Choisir {p.name}
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
    <section id="problemes" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-2xl text-center" data-reveal>
        <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Diagnostic
        </div>
        <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl">
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

function Catalogue() {
  return (
    <section id="catalogue" className="relative border-t border-border/60 bg-background py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center" data-reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Catalogue
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt={`Réalisation ${item.title} — ${item.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
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
    </section>
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
    <section id="automatisation" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div data-reveal="left">
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Automatisation
          </div>
          <h2 className="font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
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

function Contact() {
  return (
    <section id="contact" className="relative">
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
              <h2 className="font-display text-3xl font-black tracking-tight md:text-4xl">
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
                window.location.href = `https://wa.me/237659252877?text=${encodeURIComponent(msg)}`;
              }}
            >
              <input
                required
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
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} GMS-DC · Global Web Marketing Service · Douala, Cameroun
        </div>
      </div>
    </footer>
  );
}
