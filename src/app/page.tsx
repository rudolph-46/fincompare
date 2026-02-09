"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Calculator, 
  ChevronRight, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  Check,
  Star,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CREDIT_CATEGORIES, EMPLOYMENT_STATUS } from "@/types";
import { formatCurrency, calculateMonthlyPayment } from "@/lib/utils";

export default function HomePage() {
  const [amount, setAmount] = useState(5000000);
  const [duration, setDuration] = useState(24);
  const [category, setCategory] = useState("consommation");
  const [employment, setEmployment] = useState("salarie_prive");

  const estimatedRate = 12; // Taux moyen estimé
  const monthlyPayment = calculateMonthlyPayment(amount, estimatedRate, duration);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">FinCompare</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/simulateur" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
              Simulateur
            </Link>
            <Link href="/institutions" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
              Institutions
            </Link>
            <Link href="/guide" className="text-sm font-medium text-slate-600 hover:text-emerald-600">
              Guide du crédit
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link href="/register" className="hidden sm:block">
              <Button size="sm">Commencer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Comparez en 2 minutes
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Trouvez le <span className="text-emerald-600">meilleur crédit</span> au Cameroun
              </h1>
              
              <p className="text-lg text-slate-600 max-w-lg">
                Comparez les offres de plus de 400 banques et microfinances. 
                Un seul dossier, plusieurs propositions.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/simulateur">
                  <Button size="lg">
                    Simuler mon crédit
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/institutions">
                  <Button variant="outline" size="lg">
                    Voir les institutions
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-slate-600">100% gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-slate-600">Agréé COBAC</span>
                </div>
              </div>
            </div>

            {/* Right - Quick Simulator */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-semibold text-lg">Simulation rapide</h2>
                </div>

                <Select
                  label="Type de crédit"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={CREDIT_CATEGORIES.map(c => ({ value: c.value, label: `${c.icon} ${c.label}` }))}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Montant souhaité
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min={100000}
                      max={50000000}
                      step={100000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="mt-2 text-2xl font-bold text-emerald-600">
                      {formatCurrency(amount)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Durée : {duration} mois
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={84}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <Select
                  label="Situation professionnelle"
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                  options={EMPLOYMENT_STATUS}
                />

                {/* Result */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <p className="text-sm text-slate-600 mb-1">Mensualité estimée</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {formatCurrency(monthlyPayment)}<span className="text-lg font-normal text-slate-500">/mois</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Taux indicatif : {estimatedRate}% • Hors assurance
                  </p>
                </div>

                <Link href="/simulateur" className="block">
                  <Button className="w-full" size="lg">
                    Voir les offres disponibles
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "400+", label: "Institutions partenaires" },
              { value: "8% - 25%", label: "Taux comparés" },
              { value: "100%", label: "Gratuit" },
              { value: "< 48h", label: "Réponse moyenne" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Comment ça marche ?</h2>
            <p className="text-slate-600">Obtenez votre crédit en 3 étapes simples</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Simulez",
                description: "Renseignez votre projet et obtenez une estimation immédiate de votre mensualité.",
                icon: Calculator,
              },
              {
                step: 2,
                title: "Comparez",
                description: "Recevez les offres personnalisées de plusieurs banques et microfinances.",
                icon: Users,
              },
              {
                step: 3,
                title: "Obtenez",
                description: "Choisissez la meilleure offre et finalisez votre dossier en ligne ou en agence.",
                icon: Check,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit types */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Tous types de crédits</h2>
            <p className="text-slate-600">Particuliers et entreprises, nous avons l&apos;offre adaptée</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CREDIT_CATEGORIES.slice(0, 8).map((cat) => (
              <Link key={cat.value} href={`/simulateur?type=${cat.value}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-5 text-center">
                    <span className="text-3xl mb-2 block">{cat.icon}</span>
                    <p className="font-medium text-sm">{cat.label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à trouver votre crédit ?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Rejoignez des milliers de Camerounais qui ont trouvé le meilleur taux grâce à FinCompare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulateur">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Simuler gratuitement
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-slate-400">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">FinCompare</span>
              </div>
              <p className="text-sm">
                La marketplace du crédit pour l&apos;Afrique Centrale.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Produits</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Crédit Immobilier</Link></li>
                <li><Link href="#" className="hover:text-white">Crédit Auto</Link></li>
                <li><Link href="#" className="hover:text-white">Crédit PME</Link></li>
                <li><Link href="#" className="hover:text-white">Micro-crédit</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Institutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Devenir partenaire</Link></li>
                <li><Link href="#" className="hover:text-white">Espace institution</Link></li>
                <li><Link href="#" className="hover:text-white">Liste COBAC</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Confidentialité</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
            © 2026 FinCompare Afrique. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
