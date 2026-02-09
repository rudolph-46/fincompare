"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight,
  ChevronRight, 
  ChevronDown,
  Check,
  Star,
  BadgeCheck,
  User,
  Briefcase,
  Wallet,
  Clock,
  Phone,
  Mail,
  MapPin,
  Home,
  Car,
  GraduationCap,
  ShoppingBag,
  Landmark,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  CREDIT_CATEGORIES, 
  EMPLOYMENT_STATUS, 
  CAMEROON_REGIONS,
  type CreditCategory,
  type EmploymentStatus,
} from "@/types";
import { formatCurrency, calculateMonthlyPayment, cn } from "@/lib/utils";

// Mock results
const mockResults = [
  {
    id: "1",
    institution: "Afriland First Bank",
    logo: null,
    rating: 4.5,
    reviewCount: 234,
    badge: "Meilleur taux",
    badgeColor: "emerald",
    amount: 5000000,
    rate: 10.5,
    monthly: 221500,
    delay: "3 jours",
    isVerified: true,
  },
  {
    id: "2",
    institution: "Société Générale",
    logo: null,
    rating: 4.2,
    reviewCount: 189,
    badge: null,
    amount: 5000000,
    rate: 11.0,
    monthly: 223000,
    delay: "5 jours",
    isVerified: true,
  },
  {
    id: "3",
    institution: "BICEC",
    logo: null,
    rating: 4.0,
    reviewCount: 156,
    badge: "Populaire",
    badgeColor: "blue",
    amount: 5000000,
    rate: 11.5,
    monthly: 225000,
    delay: "4 jours",
    isVerified: true,
  },
  {
    id: "4",
    institution: "Express Union",
    logo: null,
    rating: 3.8,
    reviewCount: 312,
    badge: "Rapide",
    badgeColor: "amber",
    amount: 5000000,
    rate: 15.0,
    monthly: 237500,
    delay: "24h",
    isVerified: true,
  },
  {
    id: "5",
    institution: "Crédit Communautaire d'Afrique",
    logo: null,
    rating: 4.1,
    reviewCount: 98,
    badge: null,
    amount: 5000000,
    rate: 12.0,
    monthly: 227000,
    delay: "7 jours",
    isVerified: false,
  },
];

type Step = 1 | 2 | 3 | "results";

interface FormData {
  // Step 1 - Personal
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  region: string;
  
  // Step 2 - Project
  category: CreditCategory;
  amount: number;
  duration: number;
  purpose: string;
  // Dynamic fields per category
  propertyType?: string;
  propertyLocation?: string;
  vehicleType?: string;
  vehicleBrand?: string;
  schoolName?: string;
  businessType?: string;
  
  // Step 3 - Income
  employmentStatus: EmploymentStatus;
  employerName: string;
  employmentDuration: number;
  monthlyIncome: number;
  otherIncome: number;
  monthlyExpenses: number;
  existingLoans: number;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  city: "",
  region: "",
  category: "consommation",
  amount: 5000000,
  duration: 24,
  purpose: "",
  employmentStatus: "salarie_prive",
  employerName: "",
  employmentDuration: 0,
  monthlyIncome: 0,
  otherIncome: 0,
  monthlyExpenses: 0,
  existingLoans: 0,
};

const STEPS = [
  { id: 1, title: "Vos informations", icon: User },
  { id: 2, title: "Votre projet", icon: Briefcase },
  { id: 3, title: "Vos revenus", icon: Wallet },
];

const categoryIcons: Record<CreditCategory, typeof Home> = {
  immobilier: Home,
  auto: Car,
  consommation: ShoppingBag,
  pme: Landmark,
  micro_credit: Wallet,
  equipement: Briefcase,
  scolaire: GraduationCap,
  autre: Briefcase,
};

export default function SimulateurPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const updateForm = (field: keyof FormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep("results");
  };

  const prevStep = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === "results") setStep(3);
  };

  const adjustAmount = (delta: number) => {
    const newAmount = Math.max(100000, Math.min(100000000, formData.amount + delta));
    updateForm("amount", newAmount);
  };

  const adjustDuration = (delta: number) => {
    const newDuration = Math.max(3, Math.min(84, formData.duration + delta));
    updateForm("duration", newDuration);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-3.5 h-3.5",
              star <= Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-slate-200 text-slate-200"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">FinCompare</span>
          </div>
        </div>
      </header>

      {step !== "results" ? (
        <>
          {/* Progress header */}
          <div className="bg-slate-800 border-b border-slate-700 py-6 px-4">
            <div className="container mx-auto max-w-2xl">
              <h1 className="text-2xl font-bold text-white text-center mb-6">
                Comparez les offres de crédit
              </h1>
              
              {/* Steps indicator */}
              <div className="flex items-center justify-center gap-2">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = step === s.id;
                  const isCompleted = typeof step === "number" && s.id < step;
                  
                  return (
                    <div key={s.id} className="flex items-center">
                      <div
                        className={cn(
                          "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                          isActive
                            ? "bg-emerald-600 text-white"
                            : isCompleted
                            ? "bg-emerald-600/20 text-emerald-400"
                            : "bg-slate-700 text-slate-400"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium hidden sm:inline">{s.title}</span>
                        <span className="text-sm font-medium sm:hidden">{s.id}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={cn(
                          "w-8 h-0.5 mx-1",
                          isCompleted ? "bg-emerald-600" : "bg-slate-700"
                        )} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form content */}
          <main className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-6 md:p-8">
                
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">Vos informations personnelles</h2>
                      <p className="text-slate-500 text-sm">Pour vous contacter avec les meilleures offres</p>
                    </div>

                    <div className="grid gap-4">
                      <Input
                        label="Nom complet"
                        placeholder="Jean Dupont"
                        value={formData.fullName}
                        onChange={(e) => updateForm("fullName", e.target.value)}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Email"
                          type="email"
                          placeholder="jean@email.com"
                          value={formData.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                        />
                        <Input
                          label="Téléphone"
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                        />
                      </div>

                      <Input
                        label="Date de naissance"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateForm("dateOfBirth", e.target.value)}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Ville"
                          placeholder="Douala"
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                        />
                        <Select
                          label="Région"
                          value={formData.region}
                          onChange={(e) => updateForm("region", e.target.value)}
                          placeholder="Sélectionner"
                          options={CAMEROON_REGIONS.map(r => ({ value: r, label: r }))}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Project Info */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">Votre projet</h2>
                      <p className="text-slate-500 text-sm">Détaillez votre besoin de financement</p>
                    </div>

                    {/* Category selector */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Type de crédit</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CREDIT_CATEGORIES.slice(0, 8).map((cat) => {
                          const Icon = categoryIcons[cat.value];
                          return (
                            <button
                              key={cat.value}
                              onClick={() => updateForm("category", cat.value)}
                              className={cn(
                                "p-3 rounded-xl border-2 transition-all text-center",
                                formData.category === cat.value
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 hover:border-slate-300"
                              )}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-1" />
                              <span className="text-xs font-medium">{cat.label.replace("Crédit ", "")}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Amount slider */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Montant souhaité</label>
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => adjustAmount(-500000)}
                            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600">
                              {formatCurrency(formData.amount)}
                            </div>
                          </div>
                          <button
                            onClick={() => adjustAmount(500000)}
                            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="range"
                          min={100000}
                          max={100000000}
                          step={100000}
                          value={formData.amount}
                          onChange={(e) => updateForm("amount", Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>100 000</span>
                          <span>100 000 000 FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Duration slider */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Durée de remboursement</label>
                      <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => adjustDuration(-3)}
                            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">
                              {formData.duration} <span className="text-lg font-normal text-slate-500">mois</span>
                            </div>
                            <div className="text-sm text-slate-500">
                              ({Math.floor(formData.duration / 12)} ans {formData.duration % 12 > 0 ? `${formData.duration % 12} mois` : ""})
                            </div>
                          </div>
                          <button
                            onClick={() => adjustDuration(3)}
                            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="range"
                          min={3}
                          max={84}
                          value={formData.duration}
                          onChange={(e) => updateForm("duration", Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>3 mois</span>
                          <span>7 ans</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic fields based on category */}
                    {formData.category === "immobilier" && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Select
                          label="Type de bien"
                          value={formData.propertyType || ""}
                          onChange={(e) => updateForm("propertyType", e.target.value)}
                          placeholder="Sélectionner"
                          options={[
                            { value: "appartement", label: "Appartement" },
                            { value: "maison", label: "Maison" },
                            { value: "terrain", label: "Terrain" },
                            { value: "commercial", label: "Local commercial" },
                          ]}
                        />
                        <Input
                          label="Localisation du bien"
                          placeholder="Douala, Bonamoussadi"
                          value={formData.propertyLocation || ""}
                          onChange={(e) => updateForm("propertyLocation", e.target.value)}
                        />
                      </div>
                    )}

                    {formData.category === "auto" && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Select
                          label="Type de véhicule"
                          value={formData.vehicleType || ""}
                          onChange={(e) => updateForm("vehicleType", e.target.value)}
                          placeholder="Sélectionner"
                          options={[
                            { value: "neuf", label: "Véhicule neuf" },
                            { value: "occasion", label: "Véhicule d'occasion" },
                            { value: "moto", label: "Moto" },
                          ]}
                        />
                        <Input
                          label="Marque / Modèle"
                          placeholder="Toyota Corolla"
                          value={formData.vehicleBrand || ""}
                          onChange={(e) => updateForm("vehicleBrand", e.target.value)}
                        />
                      </div>
                    )}

                    {formData.category === "scolaire" && (
                      <Input
                        label="Établissement scolaire"
                        placeholder="Nom de l'école / université"
                        value={formData.schoolName || ""}
                        onChange={(e) => updateForm("schoolName", e.target.value)}
                      />
                    )}

                    {(formData.category === "pme" || formData.category === "equipement") && (
                      <Select
                        label="Secteur d'activité"
                        value={formData.businessType || ""}
                        onChange={(e) => updateForm("businessType", e.target.value)}
                        placeholder="Sélectionner"
                        options={[
                          { value: "commerce", label: "Commerce" },
                          { value: "services", label: "Services" },
                          { value: "agriculture", label: "Agriculture" },
                          { value: "artisanat", label: "Artisanat" },
                          { value: "transport", label: "Transport" },
                          { value: "autre", label: "Autre" },
                        ]}
                      />
                    )}

                    <Input
                      label="Description du projet (optionnel)"
                      placeholder="Décrivez brièvement votre projet..."
                      value={formData.purpose}
                      onChange={(e) => updateForm("purpose", e.target.value)}
                    />
                  </div>
                )}

                {/* Step 3: Income Info */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">Vos revenus</h2>
                      <p className="text-slate-500 text-sm">Pour évaluer votre capacité d&apos;emprunt</p>
                    </div>

                    <Select
                      label="Situation professionnelle"
                      value={formData.employmentStatus}
                      onChange={(e) => updateForm("employmentStatus", e.target.value as EmploymentStatus)}
                      options={EMPLOYMENT_STATUS}
                    />

                    {(formData.employmentStatus === "salarie_prive" || formData.employmentStatus === "fonctionnaire") && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Nom de l'employeur"
                          placeholder="Nom de l'entreprise"
                          value={formData.employerName}
                          onChange={(e) => updateForm("employerName", e.target.value)}
                        />
                        <Select
                          label="Ancienneté"
                          value={String(formData.employmentDuration)}
                          onChange={(e) => updateForm("employmentDuration", Number(e.target.value))}
                          options={[
                            { value: "6", label: "Moins de 6 mois" },
                            { value: "12", label: "6 mois à 1 an" },
                            { value: "24", label: "1 à 2 ans" },
                            { value: "60", label: "2 à 5 ans" },
                            { value: "120", label: "Plus de 5 ans" },
                          ]}
                        />
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Revenu mensuel net (FCFA)"
                        type="number"
                        placeholder="350 000"
                        value={formData.monthlyIncome || ""}
                        onChange={(e) => updateForm("monthlyIncome", Number(e.target.value))}
                      />
                      <Input
                        label="Autres revenus (optionnel)"
                        type="number"
                        placeholder="0"
                        value={formData.otherIncome || ""}
                        onChange={(e) => updateForm("otherIncome", Number(e.target.value))}
                        hint="Loyers, pensions, etc."
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Charges mensuelles (FCFA)"
                        type="number"
                        placeholder="100 000"
                        value={formData.monthlyExpenses || ""}
                        onChange={(e) => updateForm("monthlyExpenses", Number(e.target.value))}
                        hint="Loyer, factures, etc."
                      />
                      <Input
                        label="Crédits en cours (mensualités)"
                        type="number"
                        placeholder="0"
                        value={formData.existingLoans || ""}
                        onChange={(e) => updateForm("existingLoans", Number(e.target.value))}
                      />
                    </div>

                    {/* Debt ratio indicator */}
                    {formData.monthlyIncome > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Taux d&apos;endettement estimé</span>
                          {(() => {
                            const totalDebt = formData.existingLoans + calculateMonthlyPayment(formData.amount, 12, formData.duration);
                            const ratio = Math.round((totalDebt / formData.monthlyIncome) * 100);
                            return (
                              <span className={cn(
                                "text-lg font-bold",
                                ratio <= 33 ? "text-emerald-600" : ratio <= 45 ? "text-amber-600" : "text-red-600"
                              )}>
                                {ratio}%
                              </span>
                            );
                          })()}
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          {(() => {
                            const totalDebt = formData.existingLoans + calculateMonthlyPayment(formData.amount, 12, formData.duration);
                            const ratio = Math.min(100, Math.round((totalDebt / formData.monthlyIncome) * 100));
                            return (
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all",
                                  ratio <= 33 ? "bg-emerald-500" : ratio <= 45 ? "bg-amber-500" : "bg-red-500"
                                )}
                                style={{ width: `${ratio}%` }}
                              />
                            );
                          })()}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Recommandé : moins de 33%
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex gap-3 mt-8">
                  {step !== 1 && (
                    <Button variant="outline" onClick={prevStep} className="flex-1">
                      <ArrowLeft className="w-4 h-4" />
                      Retour
                    </Button>
                  )}
                  <Button onClick={nextStep} className="flex-1">
                    {step === 3 ? "Voir les offres" : "Continuer"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </>
      ) : (
        /* Results page */
        <>
          {/* Results header with summary */}
          <div className="bg-slate-800 border-b border-slate-700 py-6 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Offres disponibles</h1>
                  <p className="text-slate-400">Pour {formData.fullName}</p>
                </div>
                <Button variant="outline" onClick={prevStep} className="border-slate-600 text-white hover:bg-slate-700">
                  Modifier ma recherche
                </Button>
              </div>

              {/* Quick summary */}
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustAmount(-500000)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div className="text-center min-w-[120px]">
                            <div className="text-xl font-bold text-emerald-600">{formatCurrency(formData.amount)}</div>
                            <div className="text-xs text-slate-500">Montant</div>
                          </div>
                          <button
                            onClick={() => adjustAmount(500000)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="w-px h-10 bg-slate-200 hidden md:block" />

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustDuration(-3)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div className="text-center min-w-[80px]">
                            <div className="text-xl font-bold text-slate-900">{formData.duration} mois</div>
                            <div className="text-xs text-slate-500">Durée</div>
                          </div>
                          <button
                            onClick={() => adjustDuration(3)}
                            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results list */}
          <main className="container mx-auto px-4 py-6 max-w-4xl">
            <p className="text-slate-400 text-sm mb-4">{mockResults.length} offres trouvées</p>

            <div className="space-y-4">
              {mockResults.map((result, index) => (
                <Card 
                  key={result.id}
                  className={cn(
                    "overflow-hidden transition-all",
                    index === 0 && "ring-2 ring-emerald-500"
                  )}
                >
                  {result.badge && (
                    <div className={cn(
                      "px-4 py-1.5 text-white text-sm font-medium flex items-center gap-2",
                      result.badgeColor === "emerald" ? "bg-emerald-600" :
                      result.badgeColor === "blue" ? "bg-blue-600" :
                      result.badgeColor === "amber" ? "bg-amber-500" :
                      "bg-slate-600"
                    )}>
                      {index === 0 && <Sparkles className="w-4 h-4" />}
                      {result.badge}
                    </div>
                  )}
                  
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Logo + info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-7 h-7 text-slate-400" />
                        </div>
                        
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900 truncate">{result.institution}</h3>
                            {result.isVerified && (
                              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(result.rating)}
                            <span className="text-xs text-slate-500">({result.reviewCount} avis)</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                        <div className="text-center">
                          <div className="text-lg md:text-xl font-bold text-slate-900">
                            {formatCurrency(result.amount)}
                          </div>
                          <div className="text-xs text-slate-500">Montant</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg md:text-xl font-bold text-emerald-600">
                            {result.rate}%
                          </div>
                          <div className="text-xs text-slate-500">Taux annuel</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg md:text-xl font-bold text-slate-900">
                            {formatCurrency(result.monthly)}
                          </div>
                          <div className="text-xs text-slate-500">Mensualité</div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col gap-2 md:ml-4">
                        <Button className="whitespace-nowrap">
                          Voir l&apos;offre
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                        <button
                          onClick={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
                          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1"
                        >
                          {expandedResult === result.id ? "Moins de détails" : "Plus de détails"}
                          <ChevronDown className={cn(
                            "w-4 h-4 transition-transform",
                            expandedResult === result.id && "rotate-180"
                          )} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expandedResult === result.id && (
                      <div className="mt-4 pt-4 border-t grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Délai de traitement</span>
                          <p className="font-medium flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {result.delay}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Frais de dossier</span>
                          <p className="font-medium">1% du montant</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Assurance</span>
                          <p className="font-medium">Optionnelle</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
