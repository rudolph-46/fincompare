import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: "test@fincompare.cm" },
    update: {},
    create: {
      email: "test@fincompare.cm",
      fullName: "Jean Test",
      phone: "+237699000001",
      passwordHash: await bcrypt.hash("password123", 12),
      userType: "CLIENT",
      city: "Douala",
      region: "Littoral",
      employmentStatus: "SALARIE_PRIVE",
    },
  });
  console.log("✅ Test user created:", testUser.email);

  // Create organisations
  const organisations = [
    {
      name: "Afriland First Bank",
      slug: "afriland",
      type: "BANQUE" as const,
      cobacApprovalNumber: "EMF-2001-001",
      description: "Première banque camerounaise, leader du financement des PME",
      headquartersCity: "Yaoundé",
      operatingRegions: JSON.stringify(["Centre", "Littoral", "Ouest", "Sud-Ouest"]),
      totalBranches: 45,
      verificationStatus: "VERIFIED" as const,
    },
    {
      name: "BICEC",
      slug: "bicec",
      type: "BANQUE" as const,
      cobacApprovalNumber: "EMF-1998-002",
      description: "Banque Internationale du Cameroun pour l'Épargne et le Crédit",
      headquartersCity: "Douala",
      operatingRegions: JSON.stringify(["Littoral", "Centre", "Ouest"]),
      totalBranches: 38,
      verificationStatus: "VERIFIED" as const,
    },
    {
      name: "Société Générale Cameroun",
      slug: "sgc",
      type: "BANQUE" as const,
      cobacApprovalNumber: "EMF-1997-003",
      description: "Filiale du groupe Société Générale",
      headquartersCity: "Douala",
      operatingRegions: JSON.stringify(["Littoral", "Centre", "Ouest", "Nord-Ouest"]),
      totalBranches: 42,
      verificationStatus: "VERIFIED" as const,
    },
    {
      name: "Express Union",
      slug: "express-union",
      type: "EMF_CAT1" as const,
      cobacApprovalNumber: "EMF-2005-045",
      description: "Leader du transfert d'argent et des microcrédits au Cameroun",
      headquartersCity: "Douala",
      operatingRegions: JSON.stringify(["Littoral", "Centre", "Ouest", "Est", "Nord"]),
      totalBranches: 120,
      verificationStatus: "VERIFIED" as const,
    },
    {
      name: "Crédit Communautaire d'Afrique",
      slug: "cca",
      type: "EMF_CAT1" as const,
      cobacApprovalNumber: "EMF-2008-078",
      description: "Microfinance spécialisée dans le crédit aux commerçants",
      headquartersCity: "Bafoussam",
      operatingRegions: JSON.stringify(["Ouest", "Centre", "Littoral"]),
      totalBranches: 25,
      verificationStatus: "VERIFIED" as const,
    },
    {
      name: "First Trust Savings & Loans",
      slug: "first-trust",
      type: "EMF_CAT2" as const,
      cobacApprovalNumber: "EMF-2010-112",
      description: "EMF spécialisé dans l'épargne et les prêts personnels",
      headquartersCity: "Douala",
      operatingRegions: JSON.stringify(["Littoral"]),
      totalBranches: 8,
      verificationStatus: "VERIFIED" as const,
    },
  ];

  for (const org of organisations) {
    const created = await prisma.organisation.upsert({
      where: { slug: org.slug },
      update: org,
      create: org,
    });
    console.log("✅ Organisation:", created.name);
  }

  // Get organisation IDs
  const afriland = await prisma.organisation.findUnique({ where: { slug: "afriland" } });
  const bicec = await prisma.organisation.findUnique({ where: { slug: "bicec" } });
  const sgc = await prisma.organisation.findUnique({ where: { slug: "sgc" } });
  const expressUnion = await prisma.organisation.findUnique({ where: { slug: "express-union" } });
  const cca = await prisma.organisation.findUnique({ where: { slug: "cca" } });

  // Create credit products
  const products = [
    // Afriland products
    {
      organisationId: afriland!.id,
      name: "Crédit Express Salarié",
      category: "CONSOMMATION" as const,
      description: "Crédit rapide pour les salariés du public et du privé",
      minAmount: 100000,
      maxAmount: 10000000,
      minDurationMonths: 3,
      maxDurationMonths: 36,
      baseInterestRate: 10.5,
      maxInterestRate: 14.0,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE"]),
      minIncome: 150000,
      avgProcessingDays: 3,
      isActive: true,
      isPromoted: true,
    },
    {
      organisationId: afriland!.id,
      name: "Crédit Immobilier Habitat",
      category: "IMMOBILIER" as const,
      description: "Financement pour l'achat ou la construction de votre logement",
      minAmount: 5000000,
      maxAmount: 100000000,
      minDurationMonths: 24,
      maxDurationMonths: 240,
      baseInterestRate: 8.5,
      maxInterestRate: 11.0,
      requiresGuarantee: true,
      guaranteeType: "Hypothèque",
      requiresDownPayment: true,
      minDownPaymentPct: 20,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE"]),
      minIncome: 300000,
      avgProcessingDays: 14,
      isActive: true,
    },
    // BICEC products
    {
      organisationId: bicec!.id,
      name: "Crédit Personnel Flex",
      category: "CONSOMMATION" as const,
      description: "Crédit flexible avec remboursement adapté à vos revenus",
      minAmount: 500000,
      maxAmount: 20000000,
      minDurationMonths: 6,
      maxDurationMonths: 60,
      baseInterestRate: 11.0,
      maxInterestRate: 15.0,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE", "INDEPENDANT"]),
      minIncome: 200000,
      avgProcessingDays: 5,
      isActive: true,
    },
    {
      organisationId: bicec!.id,
      name: "Crédit Auto BICEC",
      category: "AUTO" as const,
      description: "Financez votre véhicule neuf ou d'occasion",
      minAmount: 2000000,
      maxAmount: 50000000,
      minDurationMonths: 12,
      maxDurationMonths: 60,
      baseInterestRate: 10.0,
      maxInterestRate: 13.0,
      requiresDownPayment: true,
      minDownPaymentPct: 15,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE"]),
      minIncome: 250000,
      avgProcessingDays: 7,
      isActive: true,
      isPromoted: true,
    },
    // SGC products
    {
      organisationId: sgc!.id,
      name: "Crédit Confort",
      category: "CONSOMMATION" as const,
      description: "Le crédit pour tous vos projets personnels",
      minAmount: 1000000,
      maxAmount: 50000000,
      minDurationMonths: 12,
      maxDurationMonths: 84,
      baseInterestRate: 9.5,
      maxInterestRate: 12.5,
      requiresGuarantee: true,
      guaranteeType: "Caution sur salaire",
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE"]),
      minIncome: 300000,
      avgProcessingDays: 7,
      isActive: true,
    },
    // Express Union products
    {
      organisationId: expressUnion!.id,
      name: "Micro Crédit Rapide",
      category: "MICRO_CREDIT" as const,
      description: "Crédit rapide sans garantie pour les petits besoins",
      minAmount: 50000,
      maxAmount: 5000000,
      minDurationMonths: 1,
      maxDurationMonths: 24,
      baseInterestRate: 15.0,
      maxInterestRate: 18.0,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE", "INDEPENDANT", "AUTRE"]),
      minIncome: 50000,
      avgProcessingDays: 1,
      isActive: true,
      isPromoted: true,
    },
    {
      organisationId: expressUnion!.id,
      name: "Crédit Commerçant",
      category: "PME" as const,
      description: "Financement adapté aux commerçants et petits entrepreneurs",
      minAmount: 200000,
      maxAmount: 10000000,
      minDurationMonths: 3,
      maxDurationMonths: 36,
      baseInterestRate: 14.0,
      maxInterestRate: 18.0,
      eligibleEmployment: JSON.stringify(["INDEPENDANT"]),
      avgProcessingDays: 2,
      isActive: true,
    },
    // CCA products
    {
      organisationId: cca!.id,
      name: "Crédit Scolaire",
      category: "SCOLAIRE" as const,
      description: "Financement des frais de scolarité et fournitures",
      minAmount: 100000,
      maxAmount: 3000000,
      minDurationMonths: 3,
      maxDurationMonths: 12,
      baseInterestRate: 12.0,
      maxInterestRate: 15.0,
      eligibleEmployment: JSON.stringify(["FONCTIONNAIRE", "SALARIE_PRIVE", "INDEPENDANT"]),
      minIncome: 100000,
      avgProcessingDays: 2,
      isActive: true,
    },
  ];

  for (const product of products) {
    const created = await prisma.creditProduct.create({
      data: product,
    });
    console.log("✅ Product:", created.name);
  }

  console.log("\n🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
