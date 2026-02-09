"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  ChevronRight, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  Check,
  Star,
  BadgeCheck,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Play,
  ChevronDown,
  Minus,
  Plus,
  Quote,
  Newspaper,
  HelpCircle,
  AlertTriangle,
  Headphones,
  FileCheck,
  TrendingDown,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CREDIT_CATEGORIES } from "@/types";
import { formatCurrency, calculateMonthlyPayment, cn } from "@/lib/utils";

// Partner logos (placeholder)
const partners = [
  "Afriland First Bank",
  "BICEC",
  "Société Générale",
  "Ecobank",
  "UBA",
  "Express Union",
];

// Testimonials
const testimonials = [
  {
    name: "Alain M.",
    location: "Douala",
    rating: 5,
    text: "J'ai obtenu mon crédit auto en seulement 5 jours. Le comparateur m'a fait économiser plus de 200 000 FCFA sur les intérêts !",
    amount: "3 500 000 FCFA",
    type: "Crédit Auto",
  },
  {
    name: "Marie-Claire T.",
    location: "Yaoundé", 
    rating: 5,
    text: "Simple et efficace. J'ai pu comparer 8 offres différentes sans me déplacer. Mon conseiller était très réactif.",
    amount: "15 000 000 FCFA",
    type: "Crédit Immobilier",
  },
  {
    name: "Paul K.",
    location: "Bafoussam",
    rating: 4,
    text: "En tant que commerçant, j'avais du mal à obtenir un crédit. FinCompare m'a mis en relation avec une microfinance adaptée à mon profil.",
    amount: "2 000 000 FCFA",
    type: "Crédit PME",
  },
];

// FAQ
const faqs = [
  {
    question: "FinCompare est-il vraiment gratuit ?",
    answer: "Oui, notre service est 100% gratuit pour les emprunteurs. Nous sommes rémunérés par les institutions financières partenaires uniquement lorsqu'un crédit est accordé.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Vos données sont chiffrées et ne sont partagées qu'avec les institutions que vous sélectionnez. Nous respectons la réglementation CEMAC sur la protection des données.",
  },
  {
    question: "Combien de temps pour obtenir une réponse ?",
    answer: "Vous recevez des offres personnalisées en moins de 48h. Certaines microfinances répondent même en quelques heures pour les petits montants.",
  },
  {
    question: "Quelles institutions sont partenaires ?",
    answer: "Nous travaillons avec plus de 400 institutions agréées COBAC : banques commerciales, EMF de catégorie 1, 2 et 3, et établissements de paiement au Cameroun.",
  },
  {
    question: "Puis-je obtenir un crédit si je suis indépendant ?",
    answer: "Oui ! Nous avons des partenaires spécialisés dans le financement des indépendants, commerçants et entrepreneurs. Les critères varient selon les institutions.",
  },
];

// Blog articles
const articles = [
  {
    title: "Comment négocier le meilleur taux de crédit au Cameroun en 2026",
    category: "Guide",
    date: "5 Fév 2026",
    image: null,
  },
  {
    title: "EMF vs Banques : quelle différence pour votre crédit ?",
    category: "Décryptage",
    date: "2 Fév 2026",
    image: null,
  },
  {
    title: "Les 5 erreurs à éviter lors d'une demande de crédit",
    category: "Conseils",
    date: "28 Jan 2026",
    image: null,
  },
];

export default function HomePage() {
  const [amount, setAmount] = useState(5000000);
  const [duration, setDuration] = useState(24);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const estimatedRate = 12;
  const monthlyPayment = calculateMonthlyPayment(amount, estimatedRate, duration);

  const adjustAmount = (delta: number) => {
    setAmount(Math.max(100000, Math.min(100000000, amount + delta)));
  };

  const adjustDuration = (delta: number) => {
    setDuration(Math.max(3, Math.min(84, duration + delta)));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">FinCompare</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600">
                  Crédit immobilier
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600">
                  Simulation de prêt
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <Link href="/institutions" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
                Nos partenaires
              </Link>
              <Link href="/guide" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
                Guide du crédit
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">Se connecter</Button>
              </Link>
              <Link href="/simulateur">
                <Button size="sm">
                  Simuler mon prêt
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <button 
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white py-4 px-4">
            <nav className="flex flex-col gap-3">
              <Link href="/simulateur" className="text-sm font-medium py-2">Simulation de prêt</Link>
              <Link href="/institutions" className="text-sm font-medium py-2">Nos partenaires</Link>
              <Link href="/guide" className="text-sm font-medium py-2">Guide du crédit</Link>
              <Link href="/login" className="text-sm font-medium py-2">Se connecter</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Comparez en 2 minutes, gratuitement
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Le comparateur<br />
                de crédit qui<br />
                <span className="text-emerald-400">défend vos intérêts</span>
              </h1>
              
              <p className="text-lg text-slate-300 max-w-lg">
                Comparez les offres de plus de 400 banques et microfinances au Cameroun. 
                Un seul dossier, plusieurs propositions, zéro frais.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/simulateur">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Simuler mon prêt
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Play className="w-5 h-5 mr-2" />
                  Comment ça marche
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                  ))}
                  <span className="text-white ml-2 font-medium">4.8/5</span>
                </div>
                <span className="text-slate-400 text-sm">+2 500 avis clients</span>
              </div>
            </div>

            {/* Right - Stats card */}
            <div className="hidden lg:block">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <p className="text-slate-300 mb-2">Meilleur taux obtenu ce mois</p>
                    <p className="text-5xl font-bold text-emerald-400">8,5%</p>
                    <p className="text-sm text-slate-400 mt-1">Crédit immobilier • Fonctionnaire</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-3xl font-bold">400+</p>
                      <p className="text-sm text-slate-400">Institutions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">48h</p>
                      <p className="text-sm text-slate-400">Réponse moyenne</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">25K+</p>
                      <p className="text-sm text-slate-400">Utilisateurs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">100%</p>
                      <p className="text-sm text-slate-400">Gratuit</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Value props banner */}
      <section className="bg-slate-50 border-y">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Shield, title: "400+ institutions agréées", desc: "Banques et EMF vérifiés par la COBAC" },
              { icon: TrendingDown, title: "Économisez jusqu'à 30%", desc: "En comparant les offres du marché" },
              { icon: FileCheck, title: "Un seul dossier", desc: "Soumettez une fois, recevez plusieurs offres" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline simulator section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simulez votre crédit en quelques clics
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Obtenez une estimation immédiate de votre mensualité et découvrez les meilleures offres disponibles.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-xl border-0">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Sliders */}
                <div className="space-y-8">
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Montant du prêt
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustAmount(-500000)}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-slate-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <div className="text-3xl font-bold text-emerald-600">
                          {formatCurrency(amount)}
                        </div>
                      </div>
                      <button
                        onClick={() => adjustAmount(500000)}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-slate-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={100000000}
                      step={100000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full mt-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>100K</span>
                      <span>100M FCFA</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Durée du prêt
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustDuration(-3)}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-slate-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="flex-1 text-center">
                        <div className="text-3xl font-bold text-slate-900">
                          {duration} <span className="text-lg font-normal text-slate-500">mois</span>
                        </div>
                      </div>
                      <button
                        onClick={() => adjustDuration(3)}
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-slate-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={84}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full mt-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>3 mois</span>
                      <span>7 ans</span>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white flex flex-col justify-center">
                  <p className="text-emerald-100 text-sm mb-2">Mensualité estimée</p>
                  <p className="text-4xl md:text-5xl font-bold mb-1">
                    {formatCurrency(monthlyPayment)}
                  </p>
                  <p className="text-emerald-100 text-sm mb-6">
                    Taux indicatif : {estimatedRate}% • Hors assurance
                  </p>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-100">Coût total du crédit</span>
                      <span className="font-semibold">{formatCurrency(monthlyPayment * duration - amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-100">Montant total à rembourser</span>
                      <span className="font-semibold">{formatCurrency(monthlyPayment * duration)}</span>
                    </div>
                  </div>

                  <Link href="/simulateur">
                    <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50" size="lg">
                      Comparer les offres
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Credit types quick links */}
              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-slate-500 mb-4">Types de crédit populaires :</p>
                <div className="flex flex-wrap gap-2">
                  {CREDIT_CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.value}
                      href={`/simulateur?type=${cat.value}`}
                      className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                    >
                      {cat.icon} {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Les experts qui simplifient votre crédit
            </h2>
            <p className="text-lg text-slate-600">
              De la simulation à l&apos;obtention de votre prêt, nous vous accompagnons
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Comparez",
                description: "Renseignez votre projet en 2 minutes et accédez aux offres de +400 institutions.",
                icon: "🔍",
              },
              {
                step: 2,
                title: "Choisissez",
                description: "Comparez les taux, mensualités et conditions. Sélectionnez les offres qui vous conviennent.",
                icon: "✅",
              },
              {
                step: 3,
                title: "Obtenez",
                description: "Finalisez votre dossier en ligne ou en agence. Recevez votre crédit sous 48h à 7 jours.",
                icon: "🎉",
              },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/simulateur">
              <Button size="lg">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-16 px-4 border-y">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              400+ institutions partenaires
            </h2>
            <p className="text-slate-600">
              Banques commerciales et microfinances agréées COBAC
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, i) => (
              <div
                key={i}
                className="w-32 h-16 bg-slate-100 rounded-lg flex items-center justify-center px-4"
              >
                <span className="text-xs font-medium text-slate-500 text-center">{partner}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/institutions" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center gap-1">
              Voir toutes nos institutions partenaires
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4 bg-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ils ont obtenu leur crédit grâce à FinCompare
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-600">4.8/5 basé sur +2 500 avis</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(star => (
                      <Star 
                        key={star} 
                        className={cn(
                          "w-4 h-4",
                          star <= testimonial.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "fill-slate-200 text-slate-200"
                        )}
                      />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-emerald-200 mb-2" />
                  <p className="text-slate-600 flex-1 mb-4">{testimonial.text}</p>
                  
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                        {testimonial.type}
                      </span>
                      <span className="text-slate-500">{testimonial.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / Articles */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                L&apos;actu crédit par FinCompare
              </h2>
              <p className="text-slate-600 mt-1">Conseils et actualités pour votre projet</p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700">
              Tous les articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <Newspaper className="w-12 h-12 text-slate-300" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="text-emerald-600 font-medium inline-flex items-center gap-1">
              Tous les articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              FinCompare répond à vos questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-slate-400 shrink-0 transition-transform",
                    openFaq === i && "rotate-180"
                  )} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alert banner */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">
                Attention aux tentatives de fraude
              </h3>
              <p className="text-sm text-slate-600">
                FinCompare ne vous demandera jamais de payer des frais avant l&apos;obtention de votre crédit. 
                Méfiez-vous des faux conseillers qui demandent des virements.
              </p>
            </div>
            <Link href="/securite" className="text-emerald-600 font-medium text-sm whitespace-nowrap">
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à trouver votre crédit ?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Rejoignez +25 000 Camerounais qui ont trouvé le meilleur taux grâce à FinCompare.
          </p>
          <Link href="/simulateur">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              Simuler mon prêt gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-slate-400">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">FinCompare</span>
              </div>
              <p className="text-sm">
                Le comparateur de crédit pour l&apos;Afrique Centrale. Gratuit, transparent, efficace.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="hover:text-white"><MessageCircle className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white"><Phone className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Simulateurs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Crédit Immobilier</Link></li>
                <li><Link href="#" className="hover:text-white">Crédit Auto</Link></li>
                <li><Link href="#" className="hover:text-white">Crédit Consommation</Link></li>
                <li><Link href="#" className="hover:text-white">Crédit PME</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Guide du crédit</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Glossaire</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">FinCompare</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">À propos</Link></li>
                <li><Link href="#" className="hover:text-white">Nos partenaires</Link></li>
                <li><Link href="#" className="hover:text-white">Devenir partenaire</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2026 FinCompare Afrique. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-white">Mentions légales</Link>
              <Link href="#" className="hover:text-white">CGU</Link>
              <Link href="#" className="hover:text-white">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
