export type Difficulty = "immediate" | "short-term" | "long-term";
export type Phase = 1 | 2 | 3 | 4 | 5;

export interface VolumeMeta {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  phase: Phase;
  difficulty: Difficulty;
  color: string;
  description: string;
  keyTopics: string[];
}

export interface AppendixMeta {
  id: string;
  title: string;
  description: string;
}

/**
 * CIVILIZATION REBUILD ORDER
 *
 * Phase 1 — Immediate Survival (Days 1–30)          red      Vols 1–8
 * Phase 2 — Community & Food Security (Months 1–24) emerald  Vols 9–20
 * Phase 3 — Knowledge & Craft (Years 1–10)          amber    Vols 21–32
 * Phase 4 — Technology & Industry (Years 10–50)     blue     Vols 33–40
 * Phase 5 — Modern Era (Years 50–100+)              violet   Vols 41–45
 */

export const VOLUMES: VolumeMeta[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 1 — IMMEDIATE SURVIVAL  (Days 1–30)
  // ─────────────────────────────────────────────────────────────────────────

  {
    number: 1,
    slug: "19-civilization-roadmap",
    title: "Civilization Roadmap",
    subtitle: "Read this first — your orientation guide",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "The master tech tree. A step-by-step progression from securing water to building computers, with every dependency made explicit. Read before anything else.",
    keyTopics: [
      "The 16-step civilization tech tree",
      "Phase dependencies and unlock order",
      "Which chapters to read when",
      "Common failure modes of collapse recovery",
      "How to use this guide",
    ],
  },
  {
    number: 2,
    slug: "35-wilderness-survival-tracking",
    title: "Wilderness Survival & Tracking",
    subtitle: "Advanced fieldcraft before infrastructure exists",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Tracking, terrain reading, wilderness navigation, animal behavior, edible plant depth, and primitive tool making — the skills that bridge day one to settled life.",
    keyTopics: [
      "Advanced tracking",
      "Terrain reading and navigation by feature",
      "Animal behavior for hunting",
      "Edible plant identification depth",
      "Primitive tool making (knapping, bone tools)",
      "Shelter by environment type",
      "Emergency signaling",
    ],
  },
  {
    number: 3,
    slug: "01-survival",
    title: "Survival",
    subtitle: "Water, fire, shelter, food — the irreducible minimum",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "The non-negotiables: purifying water, making fire, building shelter, preserving food, fishing, and hunting. Without this, nobody reaches the later chapters.",
    keyTopics: [
      "Water purification (5 methods)",
      "Fire making (bow drill to flint)",
      "Shelter construction",
      "Food preservation",
      "Hunting and trapping",
      "Fishing",
      "Basic agriculture",
      "Rope and knot making",
      "Navigation without GPS",
    ],
  },
  {
    number: 4,
    slug: "14-medicine",
    title: "Medicine",
    subtitle: "Immediate healthcare without a hospital",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Anatomy, wound care, germ theory, fever management, surgery basics, and how to produce common medicines. The chapters that prevent most early deaths.",
    keyTopics: [
      "Anatomy",
      "Wound care and bleeding control",
      "Germ theory",
      "Fever and infection management",
      "Fractures and dislocations",
      "Childbirth",
      "Surgery basics",
      "Public health",
      "Herbal pharmacopoeia",
    ],
  },
  {
    number: 5,
    slug: "36-sanitation-engineering",
    title: "Sanitation Engineering",
    subtitle: "Disease kills more people than violence",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Latrine design, sewage treatment, water testing, vector control, and waste management. Disease spreads fastest in the first weeks after collapse.",
    keyTopics: [
      "Latrine design by context",
      "Sewage treatment systems",
      "Greywater and composting toilets",
      "Water testing methods",
      "Vector control (mosquitoes, rats, flies)",
      "Quarantine protocols",
      "Waste management and burial",
    ],
  },
  {
    number: 6,
    slug: "27-ethics-philosophy",
    title: "Ethics, Philosophy & Decision-Making",
    subtitle: "How to make hard decisions under scarcity",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Who is in charge? How are resources divided? What rights exist under collapse? Civilizations that fail ethically collapse even when they have the technology to survive.",
    keyTopics: [
      "Ethical frameworks (consequentialist, deontological, virtue)",
      "Justice theory and conflict resolution",
      "Resource allocation under scarcity",
      "Rights and obligations in extremis",
      "Social contracts from scratch",
      "Decision-making under uncertainty",
      "Democratic vs. hierarchical trade-offs",
    ],
  },
  {
    number: 7,
    slug: "25-psychology-education",
    title: "Psychology & Education",
    subtitle: "Trauma recovery and knowledge transmission",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Group dynamics, leadership, trauma recovery, child development, and how to transmit knowledge to the next generation. Civilization requires more than technology.",
    keyTopics: [
      "Group dynamics and leadership",
      "Conflict resolution and mediation",
      "Trauma recovery without professional infrastructure",
      "Child development stages",
      "Learning theory and pedagogy",
      "School design from scratch",
      "Memory and oral tradition techniques",
    ],
  },
  {
    number: 8,
    slug: "18-society-governance",
    title: "Society & Governance",
    subtitle: "The social operating system",
    phase: 1,
    difficulty: "immediate",
    color: "red",
    description:
      "Economics, law, property systems, markets, and government structures. How to organize a group of survivors into a functioning community.",
    keyTopics: [
      "Property systems from scratch",
      "Rule of law and dispute resolution",
      "Market organization",
      "Government structures",
      "Currency and barter",
      "Community labor organization",
      "Record keeping and census",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 2 — COMMUNITY & FOOD SECURITY  (Months 1–24)
  // ─────────────────────────────────────────────────────────────────────────

  {
    number: 9,
    slug: "31-military-defense",
    title: "Military History & Defense",
    subtitle: "Civilizations that cannot defend themselves don't survive",
    phase: 2,
    difficulty: "immediate",
    color: "emerald",
    description:
      "Fortification design, defensive strategy, perimeter security, and lessons from civilizational collapses caused by failure to defend.",
    keyTopics: [
      "Fortification design (walls, ditches, towers)",
      "Siege engineering basics",
      "Defensive strategy and perimeter security",
      "Weapon basics (defensive focus)",
      "Guard rotations and alarm systems",
      "Historical collapse lessons from military failure",
    ],
  },
  {
    number: 10,
    slug: "08-agriculture",
    title: "Agriculture",
    subtitle: "Civilizations run on calories",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Soil science, crop rotation, irrigation, seed saving, composting, pest control, and livestock care. The engine of civilization.",
    keyTopics: [
      "Soil science",
      "Crop rotation and field planning",
      "Irrigation",
      "Seed saving",
      "Composting",
      "Pest control",
      "Livestock care",
      "Plowing and draft animals",
    ],
  },
  {
    number: 11,
    slug: "33-veterinary-medicine",
    title: "Veterinary Medicine",
    subtitle: "Sick animals mean food collapse",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Animal anatomy, livestock disease identification, field surgery, parasite control, vaccination principles, and quarantine.",
    keyTopics: [
      "Animal anatomy by species",
      "Livestock disease identification",
      "Field surgery",
      "Parasite control",
      "Vaccination principles for animals",
      "Quarantine and herd management",
    ],
  },
  {
    number: 12,
    slug: "20-food-science-fermentation",
    title: "Food Science & Fermentation",
    subtitle: "Civilization's oldest technology",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Lacto-fermentation, brewing, baking chemistry, cheese, smoking, and the science of food spoilage. Fermentation predates agriculture.",
    keyTopics: [
      "Nutrition requirements",
      "Lacto-fermentation (yogurt, sauerkraut, kimchi, vinegar)",
      "Brewing (beer, wine, mead)",
      "Baking and leavening chemistry",
      "Cheese and dairy processing",
      "Salt curing and smoking",
      "Food spoilage science",
    ],
  },
  {
    number: 13,
    slug: "30-environmental-science-conservation",
    title: "Environmental Science & Conservation",
    subtitle: "Don't destroy the world you're rebuilding",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Soil conservation, deforestation prevention, watershed management, and carrying capacity. Many ancient civilizations collapsed from over-exploitation.",
    keyTopics: [
      "Soil conservation and erosion prevention",
      "Deforestation prevention",
      "Watershed management",
      "Ecosystem restoration",
      "Carrying capacity calculations",
      "Crop diversity for resilience",
    ],
  },
  {
    number: 14,
    slug: "09-natural-resources",
    title: "Natural Resources",
    subtitle: "Find it before you can use it",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Geology, rock and ore identification, groundwater finding, mining basics, and prospecting with visual identification guides.",
    keyTopics: [
      "Geology basics",
      "Rock identification",
      "Ore and mineral identification",
      "Groundwater finding",
      "Mining basics",
      "Prospecting and field tests",
      "Coal and fossil fuel location",
    ],
  },
  {
    number: 15,
    slug: "34-ceramics-pottery",
    title: "Ceramics & Pottery in Depth",
    subtitle: "The technology that unlocks storage and cooking",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Clay identification, kiln design, glazing chemistry, and firing temperatures. Pottery is one of civilization's first enabling technologies.",
    keyTopics: [
      "Clay identification and preparation",
      "Hand building vs. wheel throwing",
      "Kiln design and construction",
      "Glazing chemistry",
      "Firing temperatures",
      "Ceramic pipes and water vessels",
    ],
  },
  {
    number: 16,
    slug: "21-textile-fiber-arts",
    title: "Textile & Fiber Arts",
    subtitle: "Clothing and the foundation of trade",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Plant and animal fiber identification, spinning, loom construction, weaving, leather tanning, rope, and natural dyes.",
    keyTopics: [
      "Plant fiber identification (linen, hemp, cotton)",
      "Animal fiber processing (wool, silk)",
      "Spinning (drop spindle to wheel)",
      "Loom construction and weaving",
      "Leather tanning",
      "Rope and cordage making",
      "Natural dyes",
    ],
  },
  {
    number: 17,
    slug: "10-materials",
    title: "Materials",
    subtitle: "Where civilization starts accelerating",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Woodworking, brickmaking, glassmaking, cement, iron, steel, copper, and aluminum. The material stack that enables all machinery.",
    keyTopics: [
      "Woodworking",
      "Ceramics overview",
      "Brickmaking",
      "Glassmaking",
      "Cement and concrete",
      "Charcoal production",
      "Iron smelting",
      "Steel production",
      "Copper and bronze",
    ],
  },
  {
    number: 18,
    slug: "22-architecture-structural-engineering",
    title: "Architecture & Structural Engineering",
    subtitle: "Build things that don't fall down",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Load calculations, arches, timber framing, passive solar design, drainage, and bridge fundamentals.",
    keyTopics: [
      "Load calculations",
      "Foundation types by soil",
      "Arch and vault construction",
      "Timber frame joinery",
      "Adobe and rammed earth",
      "Passive solar design",
      "Drainage and waterproofing",
      "Bridge design basics",
    ],
  },
  {
    number: 19,
    slug: "28-hydraulics-water-engineering",
    title: "Hydraulics & Water Engineering",
    subtitle: "Water is civilization's #1 infrastructure",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Aqueducts, wells, water mills, pumps, sewage systems, and flood control. Every major ancient civilization was built around controlled water.",
    keyTopics: [
      "Aqueducts",
      "Well digging and lining",
      "Irrigation channels",
      "Water mills (design and construction)",
      "Pumps",
      "Sewage systems",
      "Flood control",
      "Water pressure and flow calculations",
    ],
  },
  {
    number: 20,
    slug: "24-music-art-cultural-preservation",
    title: "Music, Art & Cultural Preservation",
    subtitle: "Civilizations without culture don't last",
    phase: 2,
    difficulty: "short-term",
    color: "emerald",
    description:
      "Instrument construction, music theory, pigments, bookbinding, oral tradition, and why cultural cohesion is not optional.",
    keyTopics: [
      "Why culture matters for survival",
      "Instrument construction (percussion, string, wind)",
      "Music theory and notation",
      "Pigment creation and painting",
      "Bookbinding from scratch",
      "Oral tradition structure",
      "Cultural documentation and archive",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 3 — KNOWLEDGE & CRAFT  (Years 1–10)
  // ─────────────────────────────────────────────────────────────────────────

  {
    number: 21,
    slug: "02-scientific-method",
    title: "Scientific Method",
    subtitle: "The most important chapter in the book",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "If people keep scientific thinking alive, they can rebuild knowledge even if details are lost. Logic, observation, experiment design, statistics, and reasoning errors.",
    keyTopics: [
      "Logic and reasoning",
      "Observation and measurement",
      "Experiment design",
      "Record keeping",
      "Statistics",
      "Avoiding common reasoning errors",
      "Philosophy of science and falsifiability",
      "Peer review reconstruction",
    ],
  },
  {
    number: 22,
    slug: "03-mathematics",
    title: "Mathematics",
    subtitle: "The language all other sciences speak",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Build progressively from counting to calculus, with practical examples for surveying, engineering, navigation, and astronomy.",
    keyTopics: [
      "Arithmetic",
      "Fractions and ratios",
      "Geometry",
      "Algebra",
      "Trigonometry",
      "Analytic geometry",
      "Calculus",
      "Differential equations",
      "Probability and statistics",
      "Number theory basics",
    ],
  },
  {
    number: 23,
    slug: "04-language-communication",
    title: "Language & Communication",
    subtitle: "Knowledge dies if it cannot be transmitted",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Reading and writing, grammar, printing methods, information storage, cryptography, and how to create a dictionary from scratch.",
    keyTopics: [
      "Reading and writing",
      "Grammar",
      "Dictionary construction",
      "Printing methods",
      "Information storage",
      "Linguistics basics",
      "Sign languages",
      "Cryptographic ciphers",
    ],
  },
  {
    number: 24,
    slug: "26-cartography-surveying",
    title: "Cartography & Surveying",
    subtitle: "Map your territory before you govern it",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Coordinate systems from celestial observation, land surveying, triangulation, and map projection conventions.",
    keyTopics: [
      "Coordinate systems from observation",
      "Land surveying with basic tools",
      "Triangulation",
      "Map projection basics",
      "Scale and legend conventions",
      "Terrain mapping",
    ],
  },
  {
    number: 25,
    slug: "32-trade-money-markets",
    title: "Trade, Money & Markets",
    subtitle: "Economic coordination at scale",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Commodity money, barter, standardized weights, market design, contracts, and supply chain basics.",
    keyTopics: [
      "Commodity money",
      "Barter systems",
      "Standardized weights and measures",
      "Market design",
      "Contracts and accounting",
      "Ledger keeping",
      "Supply chain basics",
    ],
  },
  {
    number: 26,
    slug: "23-meteorology-earth-sciences",
    title: "Meteorology & Earth Sciences",
    subtitle: "Read the sky before the storm arrives",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Weather prediction, instrument construction from scratch, climate zones, seasonal patterns, and water cycle management.",
    keyTopics: [
      "Atmosphere structure",
      "Cloud identification",
      "Weather prediction",
      "Barometer, hygrometer, thermometer construction",
      "Seasonal patterns",
      "Climate zones",
      "Flood and drought prediction",
    ],
  },
  {
    number: 27,
    slug: "07-biology",
    title: "Biology",
    subtitle: "Life, disease, and the organisms that shape civilization",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Cell theory, genetics, evolution, ecology, anatomy, microbiology, botany, and disease identification with treatment.",
    keyTopics: [
      "Cell theory",
      "Genetics",
      "Evolution",
      "Ecology",
      "Human anatomy",
      "Microbiology",
      "Taxonomy and classification",
      "Detailed botany",
      "Virology",
    ],
  },
  {
    number: 28,
    slug: "05-chemistry",
    title: "Chemistry",
    subtitle: "Start practical — sulfuric acid unlocks all industry",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "From soap to the periodic table to industrial chemistry. Includes making glass, cement, charcoal, sulfuric acid, nitric acid, and fertilizers.",
    keyTopics: [
      "Atomic theory",
      "Periodic table",
      "Chemical reactions",
      "Acids and bases",
      "Electrochemistry",
      "Metallurgy",
      "Making soap, glass, cement",
      "Producing sulfuric acid",
      "Producing fertilizers",
      "Organic chemistry",
    ],
  },
  {
    number: 29,
    slug: "06-physics",
    title: "Physics",
    subtitle: "Focus heavily on practical experiments",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Mechanics through nuclear physics, built around experiments runnable without modern equipment. Includes optics and lens grinding.",
    keyTopics: [
      "Mechanics",
      "Heat and thermodynamics",
      "Waves and sound",
      "Light and optics",
      "Magnetism",
      "Electricity",
      "Electromagnetism",
      "Nuclear physics",
      "Lens grinding and refraction",
    ],
  },
  {
    number: 30,
    slug: "17-astronomy-navigation",
    title: "Astronomy & Navigation",
    subtitle: "Useful even without advanced technology",
    phase: 3,
    difficulty: "short-term",
    color: "amber",
    description:
      "Celestial navigation, calendars, timekeeping, planetary motion, and map making from the stars.",
    keyTopics: [
      "Celestial navigation",
      "Calendars and timekeeping",
      "Planetary motion",
      "Telescope construction",
      "Star chart reading",
      "Latitude and longitude from observation",
    ],
  },
  {
    number: 31,
    slug: "38-pharmacology-drug-production",
    title: "Pharmacology & Drug Production",
    subtitle: "Make medicines from raw materials",
    phase: 3,
    difficulty: "long-term",
    color: "amber",
    description:
      "Aspirin synthesis, antiseptic production, quinine extraction, and a complete herbal pharmacopoeia with active compounds and dosage.",
    keyTopics: [
      "Aspirin synthesis",
      "Antiseptic production",
      "Quinine extraction from cinchona bark",
      "Herbal pharmacopoeia with active compounds",
      "Dosage principles",
      "Drug safety testing",
      "Ether and anesthesia",
    ],
  },
  {
    number: 32,
    slug: "29-optics-instrument-making",
    title: "Optics & Instrument Making",
    subtitle: "See what the naked eye cannot",
    phase: 3,
    difficulty: "long-term",
    color: "amber",
    description:
      "Lens grinding from raw glass, spectrometer building, microscope construction step-by-step, telescope assembly, and calibration.",
    keyTopics: [
      "Lens grinding from raw glass",
      "Prism construction",
      "Spectrometer building",
      "Microscope construction step-by-step",
      "Telescope assembly",
      "Instrument calibration",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 4 — TECHNOLOGY & INDUSTRY  (Years 10–50)
  // ─────────────────────────────────────────────────────────────────────────

  {
    number: 33,
    slug: "11-mechanical-engineering",
    title: "Mechanical Engineering",
    subtitle: "Include complete blueprints",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Levers to steam engines with complete blueprints. The full mechanical stack from simple machines to the engine that powered the Industrial Revolution.",
    keyTopics: [
      "Levers and pulleys",
      "Gears and bearings",
      "Water wheels",
      "Windmills",
      "Steam engines",
      "Internal combustion engines",
      "Complete construction blueprints",
    ],
  },
  {
    number: 34,
    slug: "37-energy-systems",
    title: "Energy Systems",
    subtitle: "Power the machines that build everything else",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Biogas digesters, solar thermal, fuel production (charcoal, ethanol, biodiesel), energy storage, and grid design.",
    keyTopics: [
      "Biogas digesters (step-by-step)",
      "Solar thermal collectors",
      "Practical power calculations",
      "Charcoal production at scale",
      "Ethanol and biodiesel production",
      "Energy storage",
      "Basic grid design",
    ],
  },
  {
    number: 35,
    slug: "15-transportation",
    title: "Transportation",
    subtitle: "Roads, rails, sea, and air",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Roads through aircraft — plus structural engineering for bridges and tunnels.",
    keyTopics: [
      "Road construction",
      "Bridge design",
      "Ships",
      "Railroads",
      "Automobiles",
      "Aircraft",
      "Tunneling",
    ],
  },
  {
    number: 36,
    slug: "39-seafaring-oceanography",
    title: "Seafaring & Oceanography",
    subtitle: "The ocean as food, trade, and territory",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Tides, currents, deep-sea navigation, hull design, sail geometry, fisheries management, and boat construction step-by-step.",
    keyTopics: [
      "Tides and currents",
      "Deep-sea navigation",
      "Hull design principles",
      "Sail geometry and rigging",
      "Fisheries management",
      "Boat construction step-by-step",
      "Ocean weather patterns",
    ],
  },
  {
    number: 37,
    slug: "12-electrical-engineering",
    title: "Electrical Engineering",
    subtitle: "Build your first generator",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Static electricity through radio — including step-by-step generator construction and the theory needed to build the first electrical grid.",
    keyTopics: [
      "Static electricity",
      "Batteries",
      "Generators (step-by-step build)",
      "Motors",
      "Transformers",
      "Power grids",
      "Radio",
      "Electroplating",
    ],
  },
  {
    number: 38,
    slug: "13-manufacturing",
    title: "Manufacturing",
    subtitle: "Machine tools are civilization's biggest bottleneck",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Precision measurement, lathes, milling machines, casting, forging, and mass production. You cannot make modern anything without these.",
    keyTopics: [
      "Precision measurement",
      "Lathes",
      "Milling machines",
      "Casting",
      "Forging",
      "Drilling and tapping",
      "Mass production principles",
    ],
  },
  {
    number: 39,
    slug: "43-polymers-synthetic-materials",
    title: "Polymers & Synthetic Materials",
    subtitle: "Plastics, rubbers, and synthetic fibers",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Polymerization chemistry, polyethylene, PVC, nylon, synthetic rubber, epoxy resins, Bakelite, vulcanization, and wire insulation.",
    keyTopics: [
      "Addition and condensation polymerization",
      "Polyethylene and polypropylene",
      "PVC production",
      "Nylon and polyester synthesis",
      "Synthetic rubber",
      "Epoxy and phenol-formaldehyde resins",
      "Bakelite (first synthetic plastic)",
      "Vulcanization of natural rubber",
      "Wire insulation coatings",
    ],
  },
  {
    number: 40,
    slug: "44-precision-metrology",
    title: "Precision Metrology",
    subtitle: "Measure it before you can make it",
    phase: 4,
    difficulty: "long-term",
    color: "blue",
    description:
      "Gauge blocks, micrometers, interferometry, surface plates, calibration chains, and statistical process control — the measurement infrastructure of modern manufacturing.",
    keyTopics: [
      "Tolerance and fit systems",
      "Vernier calipers and micrometers",
      "Gauge blocks (Jo blocks)",
      "Surface plates and straightedges",
      "Optical flats and interferometry",
      "Thread gauges",
      "Statistical process control (SPC)",
      "Calibration chains and traceability",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 5 — MODERN ERA  (Years 50–100+)
  // ─────────────────────────────────────────────────────────────────────────

  {
    number: 41,
    slug: "45-telecommunications",
    title: "Telecommunications",
    subtitle: "Telephone, telegraph, and the first networks",
    phase: 5,
    difficulty: "long-term",
    color: "violet",
    description:
      "From Morse code to telephone switching to digital transmission — how to reconstruct long-distance communication networks.",
    keyTopics: [
      "Telegraph construction and Morse code",
      "Telephone microphone and earpiece",
      "Telephone switching (manual, Strowger, crossbar)",
      "Cable construction",
      "Multiplexing (FDM and TDM)",
      "Modulation: AM, FM, SSB",
      "Coaxial cable systems",
      "Microwave relay",
      "Digital encoding (PCM, sampling theorem)",
    ],
  },
  {
    number: 42,
    slug: "41-vacuum-tubes-early-electronics",
    title: "Vacuum Tubes & Early Electronics",
    subtitle: "The technology that computed before transistors",
    phase: 5,
    difficulty: "long-term",
    color: "violet",
    description:
      "Diodes, triodes, and pentodes built from scratch — plus oscillators, amplifiers, AM/FM radio circuits, radar, and CRT displays.",
    keyTopics: [
      "Thermionic emission and vacuum tube theory",
      "Glass blowing for tube envelopes",
      "Diode and triode construction",
      "Pentode amplifiers",
      "LC oscillators",
      "AM and FM radio circuits",
      "CRT construction",
      "Oscilloscope design",
      "Radar basics",
    ],
  },
  {
    number: 43,
    slug: "42-magnetic-analog-recording",
    title: "Magnetic & Analog Recording",
    subtitle: "Core memory, tape, and the first data storage",
    phase: 5,
    difficulty: "long-term",
    color: "violet",
    description:
      "Magnetic core memory (used on Apollo and early satellites), magnetic tape, hard disk principles, punched card systems, and film photography.",
    keyTopics: [
      "Ferrite core theory and hysteresis",
      "Making and threading magnetic core memory planes",
      "Coincident-current addressing",
      "Magnetic tape recording",
      "Hard disk principles",
      "Punched card systems",
      "Film photography (silver halide chemistry)",
      "Non-volatile storage for radiation environments",
    ],
  },
  {
    number: 44,
    slug: "16-computing",
    title: "Computing",
    subtitle: "From binary all the way to programmable computers",
    phase: 5,
    difficulty: "long-term",
    color: "violet",
    description:
      "Binary, logic gates, relays, vacuum tubes, transistors, integrated circuits, architecture, and programming — the complete progression.",
    keyTopics: [
      "Binary and Boolean logic",
      "Logic gates",
      "Relays as computing elements",
      "Vacuum tube computers",
      "Transistors",
      "Integrated circuits",
      "Computer architecture (ALU, registers, buses)",
      "Programming and instruction sets",
      "Cryptography and information security",
    ],
  },
  {
    number: 45,
    slug: "40-semiconductor-technology",
    title: "Semiconductor Technology",
    subtitle: "From beach sand to working transistors",
    phase: 5,
    difficulty: "long-term",
    color: "violet",
    description:
      "The complete 12-step process: sand → metallurgical silicon → semiconductor-grade silicon → doped crystal → wafer → photolithography → etching → metallization → packaged IC.",
    keyTopics: [
      "Carbothermic reduction of silica",
      "Zone refining and Siemens process",
      "Czochralski crystal pulling",
      "Wafer slicing and polishing",
      "Thermal oxidation (SiO2 growth)",
      "Photoresist and photolithography",
      "Wet and dry etching",
      "Diffusion doping (n-type and p-type)",
      "Aluminum metallization",
      "Wire bonding and packaging",
      "From discrete transistor to planar IC",
    ],
  },
];

export const APPENDICES: AppendixMeta[] = [
  {
    id: "A-periodic-table",
    title: "Complete Periodic Table",
    description:
      "All 118 elements: properties, natural abundance, extraction methods, key compounds",
  },
  {
    id: "B-star-charts",
    title: "Star Charts",
    description:
      "Northern and southern hemispheres, seasonal overlays, navigation stars labeled",
  },
  {
    id: "C-world-maps",
    title: "World Maps",
    description:
      "Topographic, political, biome, resource distribution, ocean current maps",
  },
  {
    id: "D-seed-identification",
    title: "Seed Identification Guide",
    description:
      "200+ crops: visual ID, germination conditions, growing requirements, storage",
  },
  {
    id: "E-edible-poisonous-plants",
    title: "Edible & Poisonous Plant Guide",
    description: "Regional variants; visual ID, preparation, toxins to avoid",
  },
  {
    id: "F-animal-identification",
    title: "Animal Identification Guide",
    description: "Domesticable, edible, dangerous; visual ID by region",
  },
  {
    id: "G-ore-mineral-identification",
    title: "Ore & Mineral Identification",
    description:
      "Visual + field tests (streak, hardness, specific gravity) for 100+ minerals",
  },
  {
    id: "H-engineering-drawings",
    title: "Engineering Drawings & Blueprints",
    description:
      "Technical drawing conventions, isometric/orthographic views, blueprint reading",
  },
  {
    id: "I-units-standards",
    title: "Units, Standards & Measurement",
    description:
      "Recreate SI from first principles; historical unit systems; calibration chains",
  },
  {
    id: "J-instrument-construction",
    title: "Scientific Instrument Construction",
    description:
      "Spectrometer, microscope, telescope, balance, thermometer, barometer — all from scratch",
  },
  {
    id: "K-paper-ink-bookbinding",
    title: "Paper, Ink & Bookbinding",
    description:
      "Papermaking from plant fiber, iron gall ink, hide glue binding, printing press basics",
  },
  {
    id: "L-tech-tree",
    title: "The Tech Tree",
    description:
      "Full visual dependency graph of all 45 volumes; the civilization roadmap",
  },
];

export const PHASE_LABELS: Record<Phase, string> = {
  1: "Immediate Survival",
  2: "Community & Food Security",
  3: "Knowledge & Craft",
  4: "Technology & Industry",
  5: "Modern Era",
};

export const PHASE_TIMEFRAMES: Record<Phase, string> = {
  1: "Days 1–30",
  2: "Months 1–24",
  3: "Years 1–10",
  4: "Years 10–50",
  5: "Years 50–100+",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  immediate: "Immediate",
  "short-term": "Short-term",
  "long-term": "Long-term",
};

export function getVolume(slug: string): VolumeMeta | undefined {
  return VOLUMES.find((v) => v.slug === slug);
}

export function getVolumeByNumber(num: number): VolumeMeta | undefined {
  return VOLUMES.find((v) => v.number === num);
}

export const COLOR_CLASSES: Record<
  string,
  { bg: string; border: string; text: string; badge: string }
> = {
  red: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-700 dark:text-red-400",
    badge:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-400",
    badge:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-700 dark:text-amber-400",
    badge:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-400",
    badge:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-800",
    text: "text-violet-700 dark:text-violet-400",
    badge:
      "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  },
};
