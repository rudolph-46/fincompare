"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowLeft, 
  ChevronRight, 
  SlidersHorizontal,
  TrendingDown,
  Clock,
  Star,
  BadgeCheck,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  CREDIT_CATEGORIES, 
  EMPLOYMENT_STATUS, 
  CAMEROON_REGIONS,
  type SimulationResult,
  type CreditProduct,
  type Organisation
} from "@/types";
import { formatCurrency, calculateMonthlyPayment, cn } from "@/lib/utils";

// Mock data
const mockResults: SimulationResult[] = [
  {
    product: {
      id: "1",
      organisationId: "org1",
      organisation: { id: "org1", name: "Afriland First Bank", slug: "afriland", type: "banque", isVerified: true, logoUrl: "" },
      name: "Crédit Express Salarié",
      category: "consommation",
      minAmount: 100000,
      maxAmount: 10000000,
      minDurationMonths: 3,
      maxDurationMonths: 36,
      baseInterestRate: 10.5,
      rateType: "fixed",
      requiresGuarantee: false,
      requiresDownPayment: false,
      insuranceRequired: true,
      isPromoted: true,
      isActive: true,
      avgProcessingDays: 3,
    },
    proposedRate: 10.5,
    monthlyPayment: 221500,
    totalCost: 5316000,
    totalInterest: 316000,
    processingFee: 50000,
    eligibilityScore: 95,
  },
  {
    product: {
      id: "2",
      organisationId: "org2",
      organisation: { id: "org2", name: "BICEC", slug: "bicec", type: "banque", isVerified: true, logoUrl: "" },
      name: "Crédit Personnel Flex",
      category: "consommation",
      minAmount: 500000,
      maxAmount: 20000000,
      minDurationMonths: 6,
      maxDurationMonths: 60,
      baseInterestRate: 11.0,
      rateType: "fixed",
      requiresGuarantee: false,
      requiresDownPayment: false,
      insuranceRequired: true,
      isPromoted: false,
      isActive: true,
      avgProcessingDays: 5,
    },
    proposedRate: 11.0,
    monthlyPayment: 223000,
    totalCost: 5352000,
    totalInterest: 352000,
    processingFee: 75000,
    eligibilityScore: 88,
  },
  {
    product: {
      id: "3",
      organisationId: "org3",
      organisation: { id: "org3", name: "Express Union", slug: "express-union", type: "emf_cat1", isVerified: true, logoUrl: "" },
      name: "Micro Crédit Rapide",
      category: "consommation",
      minAmount: 50000,
      maxAmount: 5000000,
      minDurationMonths: 1,
      maxDurationMonths: 24,
      baseInterestRate: 15.0,
      rateType: "fixed",
      requiresGuarantee: false,
      requiresDownPayment: false,
      insuranceRequired: false,
      isPromoted: false,
      isActive: true,
      avgProcessingDays: 1,
    },
    proposedRate: 15.0,
    monthlyPayment: 237500,
    totalCost: 5700000,
    totalInterest: 700000,
    processingFee: 25000,
    eligibilityScore: 100,
  },
  {
    product: {
      id: "4",
      organisationId: "org4",
      organisation: { id: "org4", name: "Société Générale Cameroun", slug: "sgc", type: "banque", isVerified: true, logoUrl: "" },
      name: "Crédit Confort",
      category: "consommation",
      minAmount: 1000000,
      maxAmount: 50000000,
      minDurationMonths: 12,
      maxDurationMonths: 84,
      baseInterestRate: 9.5,
      rateType: "fixed",
      requiresGuarantee: true,
      guaranteeType: "Caution salaire",
      requiresDownPayment: false,
      insuranceRequired: true,
      isPromoted: true,
      isActive: true,
      avgProcessingDays: 7,
    },
    proposedRate: 9.5,
    monthlyPayment: 218000,
    totalCost: 5232000,
    totalInterest: 232000,
    processingFee: 100000,
    eligibilityScore: 75,
    eligibilityIssues: ["Nécessite une caution sur salaire"],
  },
];

type SortKey = "rate" | "monthly" | "delay" | "score";

export default function SimulateurPage() {
  const [step, setStep] = useState<"form" | "results">("form");
  const [amount, setAmount] = useState(5000000);
  const [duration, setDuration] = useState(24);
  const [category, setCategory] = useState("consommation");
  const [employment, setEmployment] = useState("salarie_prive");
  const [income, setIncome] = useState("");
  const [region, setRegion] = useState("");
  
  const [sortBy, setSortBy] = useState<SortKey>("rate");
  const [results, setResults] = useState<SimulationResult[]>([]);

  const handleSimulate = () => {
    // In real app, this would call an API
    setResults(mockResults);
    setStep("results");
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "rate":
        return a.proposedRate - b.proposedRate;
      case "monthly":
        return a.monthlyPayment - b.monthlyPayment;
      case "delay":
        return (a.product.avgProcessingDays || 99) - (b.product.avgProcessingDays || 99);
      case "score":
        return b.eligibilityScore - a.eligibilityScore;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Simulateur</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {step === "form" ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Simulez votre crédit</h1>
              <p className="text-slate-600 mt-1">Comparez les offres en quelques clics</p>
            </div>

            <Card>
              <CardContent className="p-5 space-y-5">
                <Select
                  label="Type de crédit"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={CREDIT_CATEGORIES.map(c => ({ value: c.value, label: `${c.icon} ${c.label}` }))}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Montant souhaité
                  </label>
                  <input
                    type="range"
                    min={100000}
                    max={50000000}
                    step={100000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-emerald-600 mt-2">
                    {formatCurrency(amount)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Durée de remboursement : {duration} mois ({Math.floor(duration / 12)} ans {duration % 12} mois)
                  </label>
                  <input
                    type="range"
                    min={3}
                    max={84}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Select
                  label="Situation professionnelle"
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                  options={EMPLOYMENT_STATUS}
                />

                <Input
                  label="Revenu mensuel net (optionnel)"
                  type="number"
                  placeholder="Ex: 350000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  hint="Pour des offres plus précises"
                />

                <Select
                  label="Région (optionnel)"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  options={[
                    { value: "", label: "Toutes les régions" },
                    ...CAMEROON_REGIONS.map(r => ({ value: r, label: r }))
                  ]}
                />

                <Button onClick={handleSimulate} className="w-full" size="lg">
                  Voir les offres
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary */}
            <Card className="bg-emerald-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-100 text-sm">Votre recherche</p>
                    <p className="text-xl font-bold">{formatCurrency(amount)}</p>
                    <p className="text-emerald-100 text-sm">sur {duration} mois</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setStep("form")}
                    className="text-white hover:bg-emerald-500"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sort */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              <span className="text-sm text-slate-500 whitespace-nowrap">Trier par :</span>
              {[
                { key: "rate" as SortKey, label: "Taux" },
                { key: "monthly" as SortKey, label: "Mensualité" },
                { key: "delay" as SortKey, label: "Délai" },
                { key: "score" as SortKey, label: "Éligibilité" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    sortBy === opt.key
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-600 border"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm text-slate-600">
              {results.length} offres disponibles
            </p>

            {/* Results */}
            <div className="space-y-3">
              {sortedResults.map((result, index) => (
                <Card key={result.product.id} className={cn(
                  "overflow-hidden",
                  index === 0 && "ring-2 ring-emerald-500"
                )}>
                  {index === 0 && (
                    <div className="bg-emerald-600 text-white text-xs font-medium px-3 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Meilleure offre
                    </div>
                  )}
                  {result.product.isPromoted && index !== 0 && (
                    <div className="bg-amber-500 text-white text-xs font-medium px-3 py-1">
                      Sponsorisé
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Logo placeholder */}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-slate-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {result.product.organisation?.name}
                          </h3>
                          {result.product.organisation?.isVerified && (
                            <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500 truncate">{result.product.name}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div>
                            <p className="text-xs text-slate-500">Taux</p>
                            <p className="font-bold text-emerald-600">{result.proposedRate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Mensualité</p>
                            <p className="font-bold">{formatCurrency(result.monthlyPayment)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Délai</p>
                            <p className="font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {result.product.avgProcessingDays}j
                            </p>
                          </div>
                        </div>

                        {result.eligibilityIssues && result.eligibilityIssues.length > 0 && (
                          <p className="text-xs text-amber-600 mt-2">
                            ⚠️ {result.eligibilityIssues[0]}
                          </p>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                          result.eligibilityScore >= 90 
                            ? "bg-emerald-100 text-emerald-700"
                            : result.eligibilityScore >= 70
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        )}>
                          {result.eligibilityScore}%
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1" size="sm">
                        Détails
                      </Button>
                      <Button className="flex-1" size="sm">
                        Soumettre
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
