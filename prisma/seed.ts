import { PrismaClient, EmploymentType, WorkMode } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const round = (n: number) => Math.round(n / 50000) * 50000;

// ---------------------------------------------------------------------------
// Companies
// ---------------------------------------------------------------------------
const COLORS = [
  "#0E7490", "#7C3AED", "#DB2777", "#2563EB", "#DC2626", "#059669",
  "#D97706", "#4F46E5", "#0891B2", "#BE185D", "#15803D", "#B45309",
  "#6D28D9", "#0369A1", "#9333EA", "#C026D3", "#EA580C", "#1D4ED8",
  "#047857", "#7E22CE", "#0F766E", "#A21CAF",
];

const COMPANY_DEFS: { name: string; location: string; about: string }[] = [
  { name: "Meridian Labs", location: "Bengaluru, India", about: "Meridian Labs builds developer tooling for data teams — shipping to thousands of engineers every week." },
  { name: "Northwind Freight", location: "Mumbai, India", about: "Logistics, reimagined. Northwind moves goods across South Asia with a software-first supply chain platform." },
  { name: "Aster Health", location: "Remote (India)", about: "A telehealth company making primary care accessible, backed by leading healthcare investors." },
  { name: "Cobalt Studio", location: "Hyderabad, India", about: "A design and engineering studio crafting digital products for fintech and climate clients." },
  { name: "Tessellate Systems", location: "Bengaluru, India", about: "Infrastructure software for high-throughput distributed systems." },
  { name: "Kavach Security", location: "Pune, India", about: "Application security and threat detection for modern engineering teams." },
  { name: "Indus Payments", location: "Mumbai, India", about: "Payment rails and financial APIs powering India's next generation of fintechs." },
  { name: "Vahan Mobility", location: "Gurugram, India", about: "Fleet and mobility software connecting drivers, riders, and businesses." },
  { name: "Prayog Labs", location: "Hyderabad, India", about: "An applied R&D lab building products at the edge of AI and hardware." },
  { name: "Saarthi Analytics", location: "Bengaluru, India", about: "Decision-intelligence dashboards for operations and growth teams." },
  { name: "Neelkanth Cloud", location: "Noida, India", about: "A cloud platform simplifying deployment and observability for startups." },
  { name: "Bandhan Fintech", location: "Mumbai, India", about: "Lending and savings products for underserved markets across India." },
  { name: "Chitra Media", location: "Chennai, India", about: "A streaming and creator-tools company for regional Indian content." },
  { name: "Anvaya Health", location: "Hyderabad, India", about: "Connected care and diagnostics for hospitals and clinics." },
  { name: "Drishti AI", location: "Bengaluru, India", about: "Computer-vision products for retail, safety, and manufacturing." },
  { name: "Setu Commerce", location: "Delhi, India", about: "Headless commerce infrastructure for D2C brands." },
  { name: "Pragati EdTech", location: "Pune, India", about: "Skilling and assessment platforms for learners across India." },
  { name: "Kinara Logistics", location: "Chennai, India", about: "Last-mile delivery and warehousing technology." },
  { name: "Zenith Robotics", location: "Bengaluru, India", about: "Autonomous robots for warehouses and industrial floors." },
  { name: "Aakash Space", location: "Ahmedabad, India", about: "Small-satellite systems and ground-station software." },
  { name: "Vidyut Energy", location: "Pune, India", about: "Software for EV charging networks and grid optimization." },
  { name: "Sambandh CRM", location: "Noida, India", about: "A customer-relationship platform tailored for Indian SMBs." },
  { name: "Trimurti Games", location: "Hyderabad, India", about: "A studio building mobile-first games for global audiences." },
  { name: "Nirvana Streaming", location: "Mumbai, India", about: "Audio and podcast infrastructure with a focus on Indian languages." },
  { name: "Ganit Data", location: "Bengaluru, India", about: "A data platform for real-time analytics at scale." },
  { name: "Kalpana Cloud", location: "Kochi, India", about: "Managed data pipelines and warehousing for enterprises." },
];

// ---------------------------------------------------------------------------
// Role templates
// ---------------------------------------------------------------------------
type Role = {
  title: string;
  tags: string[];
  min: number;
  max: number;
  type?: EmploymentType;
};

const ROLES: Role[] = [
  { title: "Senior Frontend Engineer", tags: ["React", "TypeScript", "Next.js", "Design Systems"], min: 2500000, max: 4200000 },
  { title: "Frontend Engineer", tags: ["React", "JavaScript", "CSS", "HTML"], min: 1200000, max: 2400000 },
  { title: "Backend Engineer", tags: ["Node.js", "PostgreSQL", "REST APIs"], min: 1800000, max: 3500000 },
  { title: "Senior Backend Engineer", tags: ["Java", "Spring Boot", "Microservices"], min: 2500000, max: 4500000 },
  { title: "Full-Stack Engineer", tags: ["React", "Node.js", "MongoDB"], min: 1500000, max: 3200000 },
  { title: "Python Backend Engineer", tags: ["Python", "Django", "PostgreSQL"], min: 1600000, max: 3000000 },
  { title: "Golang Engineer", tags: ["Go", "gRPC", "Kubernetes"], min: 2200000, max: 4000000 },
  { title: ".NET Developer", tags: ["C#", ".NET", "Azure"], min: 1400000, max: 2800000 },
  { title: "Android Engineer", tags: ["Kotlin", "Android", "Jetpack Compose"], min: 1600000, max: 3200000 },
  { title: "iOS Engineer", tags: ["Swift", "SwiftUI", "iOS"], min: 1700000, max: 3400000 },
  { title: "React Native Developer", tags: ["React Native", "TypeScript", "Mobile"], min: 1500000, max: 3000000 },
  { title: "Flutter Developer", tags: ["Flutter", "Dart", "Mobile"], min: 1300000, max: 2600000 },
  { title: "DevOps Engineer", tags: ["Kubernetes", "Terraform", "CI/CD"], min: 2000000, max: 3800000 },
  { title: "Site Reliability Engineer", tags: ["SRE", "Prometheus", "Linux"], min: 2400000, max: 4200000 },
  { title: "Cloud Engineer", tags: ["AWS", "Terraform", "Networking"], min: 1800000, max: 3500000 },
  { title: "Data Engineer", tags: ["Spark", "Airflow", "SQL"], min: 2000000, max: 3800000 },
  { title: "Data Analyst", tags: ["SQL", "Power BI", "Excel"], min: 800000, max: 1800000 },
  { title: "Data Scientist", tags: ["Python", "Machine Learning", "Statistics"], min: 2000000, max: 4000000 },
  { title: "Machine Learning Engineer", tags: ["PyTorch", "MLOps", "Python"], min: 2500000, max: 4800000 },
  { title: "AI Engineer", tags: ["LLMs", "RAG", "Python"], min: 2800000, max: 5200000 },
  { title: "QA Engineer", tags: ["Manual Testing", "Test Plans", "JIRA"], min: 700000, max: 1600000 },
  { title: "SDET", tags: ["Selenium", "Cypress", "Automation"], min: 1400000, max: 2800000 },
  { title: "Security Engineer", tags: ["AppSec", "Pentesting", "OWASP"], min: 2200000, max: 4200000 },
  { title: "Platform Engineer", tags: ["Go", "Kubernetes", "Observability"], min: 2400000, max: 4400000 },
  { title: "Database Administrator", tags: ["PostgreSQL", "MySQL", "Backups"], min: 1500000, max: 2900000 },
  { title: "Solutions Architect", tags: ["System Design", "AWS", "Architecture"], min: 3500000, max: 6000000 },
  { title: "Engineering Manager", tags: ["Leadership", "Hiring", "Delivery"], min: 4000000, max: 6800000 },
  { title: "Tech Lead", tags: ["System Design", "Mentoring", "Architecture"], min: 3000000, max: 5200000 },
  { title: "Product Designer", tags: ["Figma", "Prototyping", "UX"], min: 1500000, max: 3000000 },
  { title: "UX Researcher", tags: ["User Research", "Usability", "Interviews"], min: 1400000, max: 2600000 },
  { title: "Product Manager", tags: ["Roadmap", "Analytics", "Strategy"], min: 2500000, max: 5000000 },
  { title: "Business Analyst", tags: ["Requirements", "SQL", "Agile"], min: 1000000, max: 2200000 },
  { title: "Salesforce Developer", tags: ["Apex", "LWC", "Salesforce"], min: 1600000, max: 3200000 },
  { title: "WordPress Developer", tags: ["PHP", "WordPress", "MySQL"], min: 600000, max: 1400000 },
  { title: "Embedded Systems Engineer", tags: ["C", "RTOS", "Firmware"], min: 1500000, max: 3000000 },
  { title: "Blockchain Developer", tags: ["Solidity", "Web3", "Ethereum"], min: 2000000, max: 4200000 },
  { title: "Technical Writer", tags: ["Documentation", "Markdown", "APIs"], min: 900000, max: 1800000 },
  { title: "Support Engineer", tags: ["Troubleshooting", "SQL", "Customer Success"], min: 700000, max: 1500000 },
  { title: "Angular Developer", tags: ["Angular", "TypeScript", "RxJS"], min: 1400000, max: 2800000 },
  { title: "Vue.js Developer", tags: ["Vue", "TypeScript", "Nuxt"], min: 1400000, max: 2700000 },
];

const CITIES = [
  "Bengaluru, India", "Mumbai, India", "Hyderabad, India", "Pune, India",
  "Chennai, India", "Gurugram, India", "Noida, India", "Delhi, India",
  "Kolkata, India", "Ahmedabad, India", "Kochi, India", "Jaipur, India",
  "Chandigarh, India", "Indore, India",
];

const CLOSERS = [
  "We value clear thinking and solid fundamentals over any single framework.",
  "You'll own meaningful problems from day one and ship to real users.",
  "We care about good tests, thoughtful trade-offs, and readable code.",
  "Expect autonomy, close collaboration with product, and a fast feedback loop.",
  "We're a small team that moves quickly and takes craft seriously.",
];

function makeDescription(title: string, company: string, city: string, tags: string[], i: number) {
  const stack = tags.slice(0, 3).join(", ");
  return (
    `${company} is hiring a ${title} to join our team in ${city}. ` +
    `You'll work day to day with ${stack}, partnering across product and engineering ` +
    `to ship features that reach users at scale.\n\n` +
    `${CLOSERS[i % CLOSERS.length]} This is a great fit if you enjoy ownership and want your work to matter.`
  );
}

async function main() {
  console.log("Seeding database…");
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();

  // Create companies
  const companies = [];
  for (let i = 0; i < COMPANY_DEFS.length; i++) {
    const def = COMPANY_DEFS[i];
    const c = await prisma.company.create({
      data: {
        name: def.name,
        slug: slugify(def.name),
        location: def.location,
        about: def.about,
        website: "https://example.com",
        logoColor: COLORS[i % COLORS.length],
      },
    });
    companies.push(c);
  }

  const now = Date.now();
  const jobs: {
    title: string; description: string; location: string;
    employmentType: EmploymentType; workMode: WorkMode;
    salaryMin: number; salaryMax: number; tags: string[];
    companyId: string; createdAt: Date;
  }[] = [];

  const TOTAL = 100;
  for (let i = 0; i < TOTAL; i++) {
    const role = ROLES[i % ROLES.length];
    const company = companies[i % companies.length];

    // employment type: mostly full-time, sprinkle the rest
    let employmentType: EmploymentType = "FULL_TIME";
    if (i % 17 === 0) employmentType = "INTERNSHIP";
    else if (i % 23 === 0) employmentType = "CONTRACT";
    else if (i % 29 === 0) employmentType = "PART_TIME";

    // work mode + location
    let workMode: WorkMode;
    let location: string;
    if (i % 7 === 0) {
      workMode = "REMOTE";
      location = "Remote (India)";
    } else {
      workMode = i % 2 === 0 ? "ONSITE" : "HYBRID";
      location = CITIES[i % CITIES.length];
    }

    // salary (internships get a smaller stipend-like band)
    let salaryMin: number;
    let salaryMax: number;
    if (employmentType === "INTERNSHIP") {
      salaryMin = 40000;
      salaryMax = 80000;
    } else {
      salaryMin = round(role.min + (i % 4) * 100000);
      salaryMax = round(Math.max(salaryMin + 200000, role.max - (i % 3) * 100000));
    }

    jobs.push({
      title: role.title,
      description: makeDescription(role.title, company.name, location, role.tags, i),
      location,
      employmentType,
      workMode,
      salaryMin,
      salaryMax,
      tags: role.tags,
      companyId: company.id,
      // newest first: subtract more hours as i grows (~6h steps => ~25 days span)
      createdAt: new Date(now - i * 6 * 3600 * 1000),
    });
  }

  await prisma.job.createMany({ data: jobs });

  console.log(`Seeded ${companies.length} companies and ${jobs.length} jobs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });