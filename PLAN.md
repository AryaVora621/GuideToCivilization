# Guide to Civilization — Content Generation Plan

## Purpose

This document is the hand-off file for AI agents (Haiku, Sonnet, etc.) tasked with writing
chapter content for the Guide to Civilization web app. Multiple agents can work in parallel
by taking different volumes. Read this entire document before writing a single word.

---

## The Project

A Next.js 16 web app that serves as a step-by-step manual for restarting human civilization
after catastrophe. 45 volumes, each with 6–12 chapters. Every chapter must be immediately
actionable — not encyclopedic — covering a specific skill or process from scratch.

**App root**: `guide-to-civilization/` (the subdirectory, not the parent)
**Content lives in**: `content/volumes/<vol-slug>/<chapter-slug>/index.mdx`

---

## Critical Rules for Every Agent

### 1. Write chapters, not essays

Every chapter must follow the template exactly (see below). The value is in the
step-by-step instructions, specific measurements, exact temperatures, and real-world
procedures. Avoid encyclopedia-style prose. Avoid hedging. If the chapter is about
making charcoal, tell the reader how to make charcoal.

### 2. Directory names are slugs, not volume numbers

The volume directories use their original slugs (e.g., `01-survival`, `05-chemistry`).
The DISPLAY numbers assigned to volumes in the new ordering (see Volume Registry below)
are different. Always use display numbers in cross-references within MDX content
(e.g., "See Vol 3, Ch 4"), but always write files to the slug-based directory.

### 3. Cross-references use display numbers

When a chapter says "See Vol X, Ch Y", use the DISPLAY number from the Volume Registry,
not the slug prefix number. Readers see display numbers on the site.

### 4. Check the existing chapters first

Before writing a chapter, read existing chapters in the same volume to match tone and
depth. Do not duplicate content already in another chapter.

### 5. Chapter quality bar

- Specific: temperatures in °C, times in hours/minutes, measurements in metric
- Practical: what tools are needed, what substitutes work
- Honest: what fails and why, what the verification looks like
- Cross-referenced: at least 2 cross-references per chapter

---

## Chapter Template (MANDATORY)

Every `index.mdx` must begin with frontmatter and use this structure:

```mdx
---
title: "Chapter Title Here"
volume: <DISPLAY_NUMBER>
chapter: <CHAPTER_NUMBER>
difficulty: immediate   # immediate | short-term | long-term
prerequisites:
  - "Vol X: Volume Title — specific reason needed"
unlocks:
  - "topic/subtopic-slug"
tags: [tag1, tag2, tag3]
summary: "One sentence describing exactly what skill this chapter imparts."
---

## Overview

One to three paragraphs. What does this chapter give you? Why does it matter for
civilization rebuilding? What is the outcome of completing these steps?

## Prerequisites

- Bulleted list of what you need to know or have before this chapter is useful.
- Link to other volumes where relevant.

## Materials & Tools

- Itemized list. Be specific about quantities and grades.
- Note substitutes where possible.
- Mark items as scavengeable vs. must-produce.

## Step-by-Step Instructions

### Step 1: [Descriptive Name]

Detailed paragraph. Specific measurements, temperatures, durations.
No vague language ("heat until hot" is wrong — "heat to 300°C for 20 minutes" is right).

### Step 2: [Descriptive Name]

...

(Continue for all steps. Minimum 5 steps, maximum 15.)

## Verification

How do you know it worked? What does success look like physically?
What does failure look like, and how do you fix it?

## Common Mistakes

- Mistake 1 and the fix
- Mistake 2 and the fix
- (4–8 bullets)

## Cross-References

- See Vol X, Ch Y — [Title] ([reason])
- See Vol X, Ch Y — [Title] ([reason])
```

---

## Volume Registry

This table maps every volume to its display number, slug, and the chapters to write.
"DONE" means a complete chapter already exists. "STUB" means the file exists but is
mostly empty. Empty means the chapter directory must be created.

**Display# | Slug | Title | Chapters**

---

### PHASE 1 — Immediate Survival (Display Vols 1–8)

#### Vol 1 | `19-civilization-roadmap` | Civilization Roadmap
Chapters to write (create dirs + index.mdx):
1. `01-how-to-use-this-guide` — Reading order, priority system, how to triage in crisis
2. `02-the-16-step-progression` — The civilization tech tree explained in narrative form
3. `03-failure-modes` — How civilizations historically collapsed and why, what to watch for
4. `04-knowledge-preservation` — How to keep this information alive: copying, teaching, archiving

#### Vol 2 | `35-wilderness-survival-tracking` | Wilderness Survival & Tracking
Chapters to write:
1. `01-tracking-and-sign` — Reading animal tracks, scat, browse, runs; aging tracks
2. `02-terrain-navigation` — Moving without GPS: ridge lines, water flows, terrain association
3. `03-edible-plants-depth` — 30+ species: identification, preparation, toxin removal
4. `04-primitive-tools` — Flint knapping, bone tools, antler working
5. `05-hunting-strategies` — Ambush, drive, snare placement based on animal behavior
6. `06-shelter-by-environment` — Desert, arctic, temperate, jungle — material selection
7. `07-emergency-signaling` — Mirror, smoke, ground signals, sound; what rescuers look for

#### Vol 3 | `01-survival` | Survival
1. `01-water-purification` — **DONE** (full content exists)
2. `02-fire-making` — **DONE** (full content exists)
3. `03-shelter-construction` — STUB (has frontmatter only — write full content)
4. `04-food-preservation` — STUB
5. `05-hunting-trapping` — STUB
6. `06-fishing` — STUB
7. `07-first-aid` — STUB (NOTE: basic first aid only; deep medicine is Vol 4)
8. `08-rope-knots` — STUB
9. `09-primitive-tools` — STUB (NOTE: complements Vol 2 Ch 4 — focus on non-flint tools)
10. `10-navigation` — STUB

#### Vol 4 | `14-medicine` | Medicine
Chapters to write:
1. `01-anatomy-overview` — Organs, systems, what failure looks like
2. `02-wound-care` — Cleaning, closure (sutures, butterfly strips), infection signs
3. `03-germ-theory-practice` — Sterilization techniques without autoclave
4. `04-fever-and-infection` — Fever management, sepsis signs, oral rehydration
5. `05-fractures-dislocations` — Splinting, reduction of dislocations, traction
6. `06-childbirth` — Normal delivery, complications, postpartum care
7. `07-field-surgery` — Anesthesia alternatives, amputation as last resort, wound closure
8. `08-public-health` — Disease surveillance, quarantine protocols, vaccination principles
9. `09-herbal-pharmacopoeia` — 40+ plants: active compounds, preparation, dosage, contraindications

#### Vol 5 | `36-sanitation-engineering` | Sanitation Engineering
Chapters to write:
1. `01-latrine-design` — Pit latrines, vault latrines, VIP latrines for different contexts
2. `02-sewage-treatment` — Anaerobic baffled reactors, constructed wetlands
3. `03-composting-toilets` — Design, carbon-nitrogen ratio, pathogen destruction temperatures
4. `04-water-testing` — Field tests for biological and chemical contamination
5. `05-vector-control` — Mosquito larviciding, rat proofing, fly management
6. `06-waste-management` — Solid waste burial, composting, hazardous waste isolation
7. `07-greywater-systems` — Infiltration trenches, reed beds, reuse for irrigation

#### Vol 6 | `27-ethics-philosophy` | Ethics, Philosophy & Decision-Making
Chapters to write:
1. `01-ethical-frameworks` — Consequentialism, deontology, virtue ethics — which to apply when
2. `02-justice-and-rights` — What rights exist under collapse, fair trial basics, punishment theory
3. `03-resource-allocation` — How to divide food, medicine, labor fairly under scarcity
4. `04-social-contracts` — How to write founding documents, constitutions, community charters
5. `05-decision-under-uncertainty` — Bayesian thinking, expected value, when to defer
6. `06-leadership-and-authority` — Who leads, legitimate authority sources, succession

#### Vol 7 | `25-psychology-education` | Psychology & Education
Chapters to write:
1. `01-trauma-and-crisis` — PTSD basics, acute stress response, psychological first aid
2. `02-group-dynamics` — Cohesion, role differentiation, in-group vs. out-group
3. `03-conflict-resolution` — Mediation steps, principled negotiation, restorative justice
4. `04-child-development` — Piaget stages, language acquisition, what children need by age
5. `05-learning-theory` — Spaced repetition, interleaving, mastery learning
6. `06-school-design` — Multi-age classrooms, teacher-student ratios, what to teach first
7. `07-oral-tradition` — Mnemonic systems, story structure for knowledge preservation

#### Vol 8 | `18-society-governance` | Society & Governance
Chapters to write:
1. `01-property-systems` — Commons vs. private property, recording land ownership
2. `02-rule-of-law` — Basic criminal and civil law, courts without professionals
3. `03-government-structures` — Council, direct democracy, republic — trade-offs
4. `04-taxation-and-labor` — How to fund collective projects: tax, tithe, corvée
5. `05-record-keeping` — Census, land registry, vital records from scratch
6. `06-currency-from-scratch` — Commodity money to coinage: weight, purity, trust

---

### PHASE 2 — Community & Food Security (Display Vols 9–20)

#### Vol 9 | `31-military-defense` | Military History & Defense
Chapters to write:
1. `01-fortification-design` — Walls, ditches, bastions, tower placement
2. `02-perimeter-security` — Guard rotation, tripwires, alarm systems
3. `03-defensive-strategy` — Defense in depth, chokepoints, fallback positions
4. `04-siege-basics` — If you're besieged: water storage, sortie timing, negotiation
5. `05-weapon-basics` — Bows, spears, crossbows — defensive emphasis
6. `06-lessons-from-history` — Rome, Byzantium, Easter Island — what killed each

#### Vol 10 | `08-agriculture` | Agriculture
Chapters to write:
1. `01-soil-science` — Texture, pH, NPK, how to test and amend without lab equipment
2. `02-crop-selection` — Calorie density, climate matching, multi-year planning
3. `03-seed-saving` — Selection criteria, drying, storage conditions per crop family
4. `04-irrigation` — Surface, furrow, drip from gravity; scheduling by soil type
5. `05-crop-rotation` — Nitrogen fixers, break crops, multi-year rotation plans
6. `06-composting-at-scale` — Hot compost, windrows, vermicompost
7. `07-pest-control` — Companion planting, physical barriers, biological control
8. `08-livestock-integration` — Draft power, manure cycling, pasture management

#### Vol 11 | `33-veterinary-medicine` | Veterinary Medicine
Chapters to write:
1. `01-cattle-and-draft-animals` — Anatomy, common diseases, working a draft animal
2. `02-pigs-and-poultry` — Husbandry, disease signs, slaughter
3. `03-goats-and-sheep` — Milking, shearing, hoof care
4. `04-field-surgery` — Castration, dehorning, wound care in animals
5. `05-parasite-control` — Worm loads, external parasites, rotation grazing
6. `06-quarantine-protocols` — When to isolate, how long, what to watch for

#### Vol 12 | `20-food-science-fermentation` | Food Science & Fermentation
Chapters to write:
1. `01-nutrition-requirements` — Macros, micros, deficiency diseases and their cures
2. `02-lacto-fermentation` — Sauerkraut, kimchi, pickles, kvass — exact salt ratios
3. `03-brewing` — Beer (malt extraction, hop substitutes), wine, mead — step-by-step
4. `04-vinegar-production` — From any alcohol; mother culture; uses
5. `05-baking-and-leavening` — Wild yeast capture, sourdough, baking chemistry
6. `06-dairy-processing` — Cheese (6 types), butter, yogurt, whey uses
7. `07-salt-curing-and-smoking` — Dry cure, brine cure, cold vs. hot smoking, nitrate sources
8. `08-spoilage-science` — Why food spoils, the preservatives (acid, salt, sugar, smoke, drying)

#### Vol 13 | `30-environmental-science-conservation` | Environmental Science & Conservation
Chapters to write:
1. `01-soil-conservation` — Erosion prevention, contour plowing, windbreaks
2. `02-water-catchment` — Watershed mapping, spring protection, groundwater recharge
3. `03-forest-management` — Coppicing, selective harvest, replanting
4. `04-carrying-capacity` — How to calculate population vs. land; adjustment strategies
5. `05-ecosystem-restoration` — Pioneer species, succession, what to plant when
6. `06-pollution-prevention` — Mining, forge, latrine placement relative to water

#### Vol 14 | `09-natural-resources` | Natural Resources
Chapters to write:
1. `01-geology-basics` — Rock types, mineral formation, reading landscape for resources
2. `02-ore-identification` — Visual + field tests (streak, hardness, acid test) for 20 key ores
3. `03-groundwater-finding` — Dowsing myth vs. geology; springs, seeps, artesian indicators
4. `04-coal-and-peat` — Identification, extraction, coke production
5. `05-mining-basics` — Open cut, shaft, drift mining; timber support; ventilation
6. `06-clay-and-limestone` — Finding and testing clay; limestone for mortar and lime

#### Vol 15 | `34-ceramics-pottery` | Ceramics & Pottery in Depth
Chapters to write:
1. `01-clay-identification` — Field tests: plasticity, shrinkage, firing test
2. `02-hand-building` — Pinch, coil, slab methods; drying without cracking
3. `03-wheel-throwing` — Building a kick wheel; centering, pulling walls
4. `04-kiln-design` — Updraft, downdraft, cross-draft kilns with brick dimensions
5. `05-glazing-chemistry` — Silica-alumina-flux system; ash glazes from wood ash
6. `06-firing-temperatures` — Earthenware vs. stoneware vs. porcelain; fuel consumption
7. `07-ceramic-applications` — Water pipes, crucibles, refractory bricks

#### Vol 16 | `21-textile-fiber-arts` | Textile & Fiber Arts
Chapters to write:
1. `01-plant-fiber-processing` — Flax retting and scutching, hemp, nettles
2. `02-animal-fiber-processing` — Wool scouring, carding, combing
3. `03-spinning` — Drop spindle step-by-step; building a walking wheel
4. `04-loom-construction` — Frame loom, backstrap loom, 4-shaft floor loom with dimensions
5. `05-weaving-patterns` — Plain weave, twill, satin; warping step-by-step
6. `06-leather-tanning` — Brain tan, bark tan, chrome tan; process comparison
7. `07-natural-dyes` — 15 plants with mordant, color, and lightfastness ratings

#### Vol 17 | `10-materials` | Materials
Chapters to write:
1. `01-woodworking` — Timber selection, green vs. seasoned, joinery without power tools
2. `02-brickmaking` — Clay composition, moulding, firing, mortar ratios
3. `03-glassmaking` — Silica + soda ash + lime; crucible temp; blowing vs. casting
4. `04-cement-and-concrete` — Lime burning; hydraulic lime; Roman concrete recipe
5. `05-charcoal-production` — Retort kiln vs. earth kiln; yield; quality assessment
6. `06-iron-smelting` — Bloomery construction and operation; bloom consolidation
7. `07-steel-production` — Cementation, crucible steel, blister steel methods
8. `08-copper-and-bronze` — Smelting native copper; tin sources; alloy ratios by use

#### Vol 18 | `22-architecture-structural-engineering` | Architecture & Structural Engineering
Chapters to write:
1. `01-load-calculations` — Dead load, live load, safety factors; simplified method
2. `02-foundations` — Soil bearing capacity tests; strip, pad, raft foundation types
3. `03-arch-vault-dome` — Centering construction; keystone placement; thrust lines
4. `04-timber-frame-joinery` — Mortise and tenon, lap joints, pegged connections
5. `05-adobe-and-rammed-earth` — Mix ratios; test block method; wall thickness for climate
6. `06-passive-solar-design` — South-facing glazing; thermal mass; overhangs by latitude
7. `07-drainage-and-waterproofing` — French drains, damp courses, roof pitches

#### Vol 19 | `28-hydraulics-water-engineering` | Hydraulics & Water Engineering
Chapters to write:
1. `01-aqueducts` — Gradient calculation (1:4800 minimum); channel cross-section; siphons
2. `02-well-digging` — Safety (gas, collapse); lining with stone or brick; pump options
3. `03-irrigation-channels` — Flow calculation; sluice gate construction; distribution
4. `04-water-mills` — Undershot vs. overshot vs. breast wheel; shaft design; gear ratios
5. `05-pumps` — Archimedes screw; suction pump limitations (10m); force pump
6. `06-sewage-systems` — Separate vs. combined sewer; gradient; venting
7. `07-flood-control` — Levee construction; spillways; floodplain mapping

#### Vol 20 | `24-music-art-cultural-preservation` | Music, Art & Cultural Preservation
Chapters to write:
1. `01-why-culture-matters` — Psychological, social, and political functions of culture
2. `02-percussion-instruments` — Drums, bells, xylophones — materials and tuning
3. `03-string-instruments` — Lutes, fiddles — resonator construction, string materials
4. `04-wind-instruments` — Flutes, reeds, horns — tuning holes, bore dimensions
5. `05-music-theory-and-notation` — Scales, intervals, rhythm, written notation
6. `06-pigments-and-painting` — Ochre, charcoal, lapis, verdigris, lead white — preparation
7. `07-bookbinding` — Sections, sewing, paste boards, leather cover — full process
8. `08-archive-strategy` — What to copy first; storage conditions; distributed copies

---

### PHASE 3 — Knowledge & Craft (Display Vols 21–32)

#### Vol 21 | `02-scientific-method` | Scientific Method
Chapters to write:
1. `01-observation-and-measurement` — Standardizing units; calibration; error estimation
2. `02-hypothesis-and-experiment` — Controlled variables; blinding; sample size
3. `03-record-keeping` — Lab notebooks; data formats; reproducibility
4. `04-statistics-basics` — Mean, variance, correlation; how to detect a real effect
5. `05-reasoning-errors` — 15 cognitive biases with examples from historical disasters
6. `06-peer-review-reconstruction` — How to organize knowledge review in a small community
7. `07-philosophy-of-science` — Falsifiability; Kuhn's paradigm shifts; what counts as evidence

#### Vol 22 | `03-mathematics` | Mathematics
Chapters to write:
1. `01-arithmetic` — Place value, fractions, ratios; practical calculation methods
2. `02-geometry` — Euclidean proofs; field surveying applications; pi derivation
3. `03-algebra` — Equations, proportion, practical problem solving
4. `04-trigonometry` — Sine/cosine/tangent from first principles; surveying and navigation use
5. `05-analytic-geometry` — Coordinates; distance; slope; circles
6. `06-calculus-concepts` — Rates of change; area under curve; practical physics applications
7. `07-probability-and-statistics` — Expected value; risk; how to count uncertain things
8. `08-number-systems` — Binary, hexadecimal (needed for Vol 44 computing)

#### Vol 23 | `04-language-communication` | Language & Communication
Chapters to write:
1. `01-reading-and-writing` — Phonetic alphabet design; teaching literacy from scratch
2. `02-grammar-essentials` — Parts of speech; sentence structure; clarity principles
3. `03-printing-methods` — Woodblock, movable type, letterpress — step-by-step
4. `04-dictionary-construction` — How to make a reference dictionary for a community
5. `05-information-storage` — Libraries, indexing, classification systems
6. `06-ciphers-and-codes` — Caesar, Vigenère, one-time pad — when and why

#### Vol 24 | `26-cartography-surveying` | Cartography & Surveying
Chapters to write:
1. `01-coordinate-systems` — How latitude and longitude are derived from stars
2. `02-land-surveying` — Chain surveying; plane table; theodolite from scratch
3. `03-triangulation` — How to map a region from baselines and angles
4. `04-map-projections` — Mercator vs. equal-area; when each matters
5. `05-terrain-mapping` — Contour intervals; spot heights; reading topographic maps
6. `06-property-boundaries` — Metes and bounds; monument placement; dispute resolution

#### Vol 25 | `32-trade-money-markets` | Trade, Money & Markets
Chapters to write:
1. `01-barter-systems` — Double coincidence problem; commodity barter best practices
2. `02-commodity-money` — What makes good money; salt, grain, metal weights
3. `03-coinage` — Assay methods; die making; minting step-by-step
4. `04-weights-and-measures` — Standardization; balance construction; fraud prevention
5. `05-accounting-and-ledgers` — Double-entry bookkeeping from scratch
6. `06-markets-and-prices` — Market design; price signals; preventing hoarding

#### Vol 26 | `23-meteorology-earth-sciences` | Meteorology & Earth Sciences
Chapters to write:
1. `01-atmosphere-basics` — Layers, pressure, why wind blows
2. `02-cloud-identification` — 10 cloud types with prediction value per type
3. `03-instrument-construction` — Barometer, thermometer, hygrometer, rain gauge
4. `04-weather-prediction` — 48-hour forecast from observation; seasonal patterns
5. `05-climate-zones` — Koppen classification; what to grow where
6. `06-flood-and-drought` — Indicators; preparation; response

#### Vol 27 | `07-biology` | Biology
Chapters to write:
1. `01-cell-theory` — Cells; prokaryote vs. eukaryote; microscopy (Vol 32)
2. `02-genetics-basics` — Mendelian inheritance; selective breeding implications
3. `03-evolution` — Natural selection; speciation; why bacteria develop resistance
4. `04-ecology` — Food webs; energy pyramids; keystone species
5. `05-human-anatomy` — Systems overview; what each organ does and when it fails
6. `06-microbiology` — Bacteria, viruses, fungi, protists; germ theory applications
7. `07-taxonomy` — How to classify and name organisms; why it matters for communication
8. `08-botany-depth` — Plant reproduction; seed dispersal; flowering plants for agriculture

#### Vol 28 | `05-chemistry` | Chemistry
Chapters to write:
1. `01-atomic-theory` — Elements, compounds, mixtures; periodic table structure
2. `02-chemical-reactions` — Balancing; exo vs. endothermic; reaction rates
3. `03-acids-and-bases` — pH; indicators from plants; practical uses
4. `04-electrochemistry` — Batteries from first principles; electrolysis; plating
5. `05-making-soap` — Saponification; lye production from ash; hard vs. soft soap
6. `06-glassmaking-chemistry` — Silicate chemistry; colorants; decolorizers
7. `07-producing-sulfuric-acid` — Lead chamber process (accessible); uses in industry
8. `08-producing-fertilizers` — Nitrates from guano/urine/Haber process route
9. `09-organic-chemistry-basics` — Carbon chains; alcohols, esters, ethers; distillation

#### Vol 29 | `06-physics` | Physics
Chapters to write:
1. `01-mechanics` — Newton's laws; vectors; torque; lever calculations
2. `02-heat-and-thermodynamics` — Temperature vs. heat; conduction/convection/radiation; engines
3. `03-waves-and-sound` — Frequency, wavelength, resonance; musical instrument tuning
4. `04-optics` — Reflection; refraction; lens equations; focal length calculation
5. `05-static-electricity` — Charge; Coulomb's law; capacitors; Van de Graaff
6. `06-magnetism` — Magnetic field; right-hand rule; electromagnets
7. `07-electromagnetism` — Faraday induction; transformer principles; Maxwell summary
8. `08-nuclear-physics-basics` — Atomic nucleus; fission vs. fusion; why radiation is dangerous

#### Vol 30 | `17-astronomy-navigation` | Astronomy & Navigation
Chapters to write:
1. `01-celestial-sphere` — RA, declination, the coordinate system that predates GPS
2. `02-star-identification` — 20 key navigation stars; seasonal positions
3. `03-latitude-from-observation` — Polaris method; noon sun method; southern hemisphere
4. `04-longitude-and-time` — Why timekeeping is the problem; lunar distance method
5. `05-calendars` — Solar, lunar, lunisolar; how to determine the date from scratch
6. `06-telescope-construction` — Grinding mirrors and lenses; mount design

#### Vol 31 | `38-pharmacology-drug-production` | Pharmacology & Drug Production
Chapters to write:
1. `01-aspirin-synthesis` — Acetylsalicylic acid from willow bark or salicylic acid + acetic anhydride
2. `02-antiseptics` — Alcohol distillation for medical use; iodine from seaweed; hydrogen peroxide
3. `03-quinine-extraction` — From cinchona bark; dosing for malaria
4. `04-herbal-pharmacopoeia` — 50 plants: active compound, dose, preparation, interactions
5. `05-ether-and-anesthesia` — Diethyl ether synthesis; chloroform; proper administration
6. `06-drug-safety-testing` — Dose-response curves; LD50 concept; how to test without an IRB

#### Vol 32 | `29-optics-instrument-making` | Optics & Instrument Making
Chapters to write:
1. `01-glass-grinding` — Abrasives, pitch laps, testing with a Ronchi grating
2. `02-microscope-construction` — Leeuwenhoek simple microscope; compound microscope build
3. `03-telescope-construction` — Newtonian reflector with homemade mirror
4. `04-spectrometer-building` — Diffraction grating from CD; prism spectrometer
5. `05-precision-balance` — Knife-edge balance; calibration masses
6. `06-instrument-calibration` — How to calibrate without a reference — bootstrap methods

---

### PHASE 4 — Technology & Industry (Display Vols 33–40)

#### Vol 33 | `11-mechanical-engineering` | Mechanical Engineering
Chapters to write:
1. `01-simple-machines` — Lever classes; pulley systems; inclined plane; mechanical advantage
2. `02-gears-and-bearings` — Gear ratio; involute tooth profile; plain bearings
3. `03-water-wheels` — Overshot vs. undershot; power calculation; shaft sizing
4. `04-windmills` — Post mill vs. tower mill; rotor design; governing
5. `05-steam-engine` — Watt's improvements; cylinder, piston, valve gear; boiler safety
6. `06-internal-combustion` — Otto cycle; carburettor; ignition timing
7. `07-blueprints-and-drawings` — Technical drawing from scratch; tolerances; fits

#### Vol 34 | `37-energy-systems` | Energy Systems
Chapters to write:
1. `01-charcoal-at-scale` — Industrial retort kiln; yield; quality grading
2. `02-biogas-digesters` — Fixed dome vs. floating drum; feedstock; gas purification
3. `03-ethanol-production` — Feedstocks; fermentation; distillation to fuel grade
4. `04-biodiesel` — Transesterification; feedstocks; winter operability
5. `05-solar-thermal` — Flat plate vs. evacuated tube; tracking vs. fixed; storage
6. `06-energy-storage` — Lead-acid batteries; flywheels; pumped hydro
7. `07-power-calculations` — Watt, joule, BTU: how to measure and plan energy needs

#### Vol 35 | `15-transportation` | Transportation
Chapters to write:
1. `01-road-construction` — Subgrade prep; drainage; gravel vs. macadam vs. concrete
2. `02-bridges` — Timber truss; arch bridge; suspension basics; load limits
3. `03-ship-construction` — Clinker vs. carvel planking; frames; caulking
4. `04-railroad-basics` — Track gauge; rail weight; grade limits; switching
5. `05-automobiles-simplified` — What makes a car work; basic maintenance; fuel systems
6. `06-aircraft-basics` — Lift theory; wing design; what it takes to build a glider first

#### Vol 36 | `39-seafaring-oceanography` | Seafaring & Oceanography
Chapters to write:
1. `01-tides-and-currents` — Tidal prediction; current charts; rip currents
2. `02-celestial-navigation-at-sea` — Sextant construction; noon sight; running fix
3. `03-hull-design` — Displacement vs. planing; stability; buoyancy calculations
4. `04-sail-and-rigging` — Rig types; sail trim; points of sail
5. `05-boat-construction` — Strip-plank; stitch-and-glue; traditional lapstrake
6. `06-fisheries-management` — Sustainable yield; gear selection; stock assessment basics

#### Vol 37 | `12-electrical-engineering` | Electrical Engineering
Chapters to write:
1. `01-static-and-basic-circuits` — Ohm's law; series/parallel; measuring instruments
2. `02-batteries` — Voltaic pile; lead-acid construction; capacity and discharge
3. `03-generator-construction` — Wound armature; permanent magnet; commutator vs. slip rings
4. `04-motors` — DC motor from generator; AC induction motor principles
5. `05-transformers` — Core construction; winding ratios; efficiency
6. `06-power-grid-basics` — Distribution voltage; substation design; grounding
7. `07-radio-basics` — Antenna theory; LC oscillator; AM transmitter and receiver circuits

#### Vol 38 | `13-manufacturing` | Manufacturing
Chapters to write:
1. `01-precision-measurement` — Calipers; micrometers; gauge blocks; surface plate
2. `02-lathe-operation` — Turning, facing, threading; tool geometry
3. `03-milling-machines` — Vertical mill; end mills; work holding
4. `04-casting` — Green sand casting; lost wax; pattern making
5. `05-forging` — Hammer types; dies; heat treatment temperatures
6. `06-mass-production-principles` — Interchangeable parts; jigs and fixtures; quality control

#### Vol 39 | `43-polymers-synthetic-materials` | Polymers & Synthetic Materials
Chapters to write:
1. `01-polymerization-basics` — Addition vs. condensation; chain length; properties
2. `02-polyethylene-and-polypropylene` — Ziegler-Natta catalyst; pressure requirements
3. `03-pvc-production` — Vinyl chloride synthesis; stabilizers; uses and hazards
4. `04-nylon-and-polyester` — Condensation polymerization; fiber drawing
5. `05-synthetic-rubber` — Emulsion polymerization of butadiene-styrene
6. `06-epoxy-resins` — Bisphenol-A + epichlorohydrin; curing agents
7. `07-bakelite` — Phenol-formaldehyde condensation; molding; first plastic
8. `08-vulcanization` — Sulfur crosslinks; temperature and time; testing hardness

#### Vol 40 | `44-precision-metrology` | Precision Metrology
Chapters to write:
1. `01-tolerance-and-fit` — ISO fit system; clearance, interference, transition
2. `02-vernier-calipers` — Reading to 0.02mm; calibration; common errors
3. `03-micrometers` — Thimble mechanics; reading; anvil types
4. `04-gauge-blocks` — Jo block grades; wringing; stack combinations
5. `05-surface-plates` — Cast iron vs. granite; care; using a surface gauge
6. `06-interferometry` — Optical flats; Newton's rings; fringe counting
7. `07-spc-basics` — Control charts; Cp and Cpk; when a process is out of control

---

### PHASE 5 — Modern Era (Display Vols 41–45)

#### Vol 41 | `45-telecommunications` | Telecommunications
Chapters to write:
1. `01-telegraph` — Morse key; relay; sounder; line construction
2. `02-telephone-basics` — Carbon microphone; magnetic earpiece; exchange design
3. `03-switching-systems` — Manual switchboard; Strowger step-by-step automatic
4. `04-cable-construction` — Insulation; twisted pair; shielding; underground vs. aerial
5. `05-multiplexing` — FDM and TDM; why one wire carries many calls
6. `06-modulation` — AM, FM, SSB — circuits and trade-offs
7. `07-digital-encoding` — PCM; Nyquist theorem; why 8kHz sampling for voice

#### Vol 42 | `41-vacuum-tubes-early-electronics` | Vacuum Tubes & Early Electronics
Chapters to write:
1. `01-thermionic-emission` — Richardson-Dushman equation (qualitative); cathode materials
2. `02-diode-construction` — Glass envelope; cathode/anode; vacuum pump requirements
3. `03-triode-and-pentode` — Grid control; amplification factor; plate curves
4. `04-amplifier-circuits` — Common cathode; voltage gain; operating point
5. `05-oscillators` — Hartley; Colpitts; crystal control
6. `06-crt-construction` — Electron gun; deflection plates; phosphor screens
7. `07-radar-basics` — Pulse-echo; magnetron; antenna patterns

#### Vol 43 | `42-magnetic-analog-recording` | Magnetic & Analog Recording
1. `01-magnetic-core-memory` — **DONE** (full content — coincident-current addressing)
Write remaining chapters:
2. `02-ferrite-core-manufacture` — NiZn ferrite powder; pressing; sintering temperatures
3. `03-magnetic-tape` — Fe₂O₃ particle coating; bias oscillator; record/playback head construction
4. `04-hard-disk-principles` — Flying head; track density; index pulse; servo
5. `05-punched-card-systems` — Hollerith code; punch mechanism; sorter; tabulator
6. `06-photographic-film` — Silver halide emulsion; developer; fixer; enlarger

#### Vol 44 | `16-computing` | Computing
Chapters to write:
1. `01-binary-and-boolean` — Base 2; truth tables; De Morgan's laws
2. `02-logic-gates` — AND, OR, NOT, XOR from relay or tube — circuit diagrams
3. `03-relay-computer` — Adder; register; sequencer from relays only
4. `04-von-neumann-architecture` — ALU; registers; program counter; bus
5. `05-machine-code` — Instruction sets; memory addressing; simple program
6. `06-assembly-language` — Mnemonics; labels; assembler operation
7. `07-operating-system-basics` — Process, file, memory management from scratch
8. `08-cryptography` — Caesar to AES; why key size matters; PKI basics

#### Vol 45 | `40-semiconductor-technology` | Semiconductor Technology
1. `01-silicon-from-sand` — **DONE** (carbothermic reduction)
2. `02-purification-zone-refining` — **DONE** (zone refining + Siemens process)
Write remaining chapters:
3. `03-czochralski-crystal-growth` — Seed crystal; pull rate; temperature gradient; crystal diameter control
4. `04-wafer-preparation` — Wire saw; lapping; CMP; wafer spec (TTV, bow, warp)
5. `05-thermal-oxidation` — Dry vs. wet oxide; Deal-Grove model; oxide thickness measurement
6. `06-photolithography` — Photoresist spin; exposure (UV or contact); development; inspection
7. `07-etching` — Buffered HF (oxide); KOH (silicon); plasma etch principles
8. `08-doping` — Diffusion furnace; ion implantation concepts; junction depth measurement
9. `09-metallization` — Aluminum sputtering; shadow mask; lift-off patterning
10. `10-packaging-and-testing` — Die saw; wire bonding; encapsulation; parametric test
11. `11-from-transistor-to-ic` — Planar process history; scaling laws; Moore's law derivation
12. `12-ic-design-basics` — Schematic to layout; design rules; tape-out

---

## Appendices (12 total — all need content)

Write to: `content/appendices/<id>.mdx`

| ID | Title | Notes |
|---|---|---|
| `A-periodic-table` | Complete Periodic Table | All 118 elements in tabular form with properties |
| `B-star-charts` | Star Charts | ASCII/text descriptions + coordinates for 50 key stars |
| `C-world-maps` | World Maps | Descriptive biome/climate data by region |
| `D-seed-identification` | Seed Identification Guide | 200+ crops with germination requirements |
| `E-edible-poisonous-plants` | Edible & Poisonous Plants | Regional; key identification markers |
| `F-animal-identification` | Animal Identification Guide | Domesticable vs. edible vs. dangerous |
| `G-ore-mineral-identification` | Ore & Mineral ID | Visual + field test per mineral |
| `H-engineering-drawings` | Engineering Drawings | Drawing conventions and blueprint reading |
| `I-units-standards` | Units & Standards | SI from first principles; calibration chains |
| `J-instrument-construction` | Instrument Construction | How to build 8 key scientific instruments |
| `K-paper-ink-bookbinding` | Paper, Ink & Bookbinding | Papermaking; iron gall ink; binding |
| `L-tech-tree` | The Tech Tree | Full narrative dependency graph of all 45 vols |

---

## Parallel Agent Workflow

Task assignments are managed by a SQLite tracker. Do NOT edit `TASK_QUEUE.md` — it is
out of date. Use `scripts/tasks.sh` instead.

### Step 1 — Claim your next chapter

```bash
# From the guide-to-civilization/ directory:

# Claim next available chapter (tracker prioritizes finishing in-progress volumes first)
AGENT_ID=<your-agent-id> bash scripts/tasks.sh claim-next

# Or claim within a specific volume slug if you want to focus there:
AGENT_ID=<your-agent-id> bash scripts/tasks.sh claim-next 08-agriculture
```

The command prints the chapter id, volume, title, and file path. Only one agent can hold
a given chapter at a time — the claim is atomic.

### Step 2 — Write the chapter

Create the directory and file if they don't exist:

```bash
mkdir -p content/volumes/<vol-slug>/<chapter-slug>
# write content/volumes/<vol-slug>/<chapter-slug>/index.mdx
```

Follow the Chapter Template above exactly.

### Step 3 — Mark it done

```bash
bash scripts/tasks.sh complete <chapter-id>
# e.g.: bash scripts/tasks.sh complete 08-agriculture/01-soil-science
```

Then immediately claim the next chapter and repeat.

### If you need to stop mid-chapter

```bash
bash scripts/tasks.sh release <chapter-id>
```

This returns the chapter to the pending pool for another agent to pick up.

### Check overall progress

```bash
bash scripts/tasks.sh status
```

---

## How to Create a Chapter Directory

```bash
# From the guide-to-civilization directory:
mkdir -p content/volumes/<vol-slug>/<chapter-slug>
# Then write content/volumes/<vol-slug>/<chapter-slug>/index.mdx
```

Chapter slugs should be descriptive lowercase-hyphenated, e.g.:
`01-water-purification`, `02-fire-making`, `03-shelter-construction`

---

## After Writing a Batch

1. Run `npm run search:build` to update the search index
2. Run `npm run build` to verify no build errors
3. Check that all pages return 200 (the build output lists all routes)

```bash
cd "/path/to/guide-to-civilization"
npm run build
```

A passing build confirms MDX syntax is valid and all routes resolve.

---

## Cross-Reference Quick Lookup

When writing "See Vol X" cross-references, use these display numbers:

| Display | Slug | Title |
|---|---|---|
| 1 | 19-civilization-roadmap | Civilization Roadmap |
| 2 | 35-wilderness-survival-tracking | Wilderness Survival & Tracking |
| 3 | 01-survival | Survival |
| 4 | 14-medicine | Medicine |
| 5 | 36-sanitation-engineering | Sanitation Engineering |
| 6 | 27-ethics-philosophy | Ethics, Philosophy & Decision-Making |
| 7 | 25-psychology-education | Psychology & Education |
| 8 | 18-society-governance | Society & Governance |
| 9 | 31-military-defense | Military History & Defense |
| 10 | 08-agriculture | Agriculture |
| 11 | 33-veterinary-medicine | Veterinary Medicine |
| 12 | 20-food-science-fermentation | Food Science & Fermentation |
| 13 | 30-environmental-science-conservation | Environmental Science & Conservation |
| 14 | 09-natural-resources | Natural Resources |
| 15 | 34-ceramics-pottery | Ceramics & Pottery in Depth |
| 16 | 21-textile-fiber-arts | Textile & Fiber Arts |
| 17 | 10-materials | Materials |
| 18 | 22-architecture-structural-engineering | Architecture & Structural Engineering |
| 19 | 28-hydraulics-water-engineering | Hydraulics & Water Engineering |
| 20 | 24-music-art-cultural-preservation | Music, Art & Cultural Preservation |
| 21 | 02-scientific-method | Scientific Method |
| 22 | 03-mathematics | Mathematics |
| 23 | 04-language-communication | Language & Communication |
| 24 | 26-cartography-surveying | Cartography & Surveying |
| 25 | 32-trade-money-markets | Trade, Money & Markets |
| 26 | 23-meteorology-earth-sciences | Meteorology & Earth Sciences |
| 27 | 07-biology | Biology |
| 28 | 05-chemistry | Chemistry |
| 29 | 06-physics | Physics |
| 30 | 17-astronomy-navigation | Astronomy & Navigation |
| 31 | 38-pharmacology-drug-production | Pharmacology & Drug Production |
| 32 | 29-optics-instrument-making | Optics & Instrument Making |
| 33 | 11-mechanical-engineering | Mechanical Engineering |
| 34 | 37-energy-systems | Energy Systems |
| 35 | 15-transportation | Transportation |
| 36 | 39-seafaring-oceanography | Seafaring & Oceanography |
| 37 | 12-electrical-engineering | Electrical Engineering |
| 38 | 13-manufacturing | Manufacturing |
| 39 | 43-polymers-synthetic-materials | Polymers & Synthetic Materials |
| 40 | 44-precision-metrology | Precision Metrology |
| 41 | 45-telecommunications | Telecommunications |
| 42 | 41-vacuum-tubes-early-electronics | Vacuum Tubes & Early Electronics |
| 43 | 42-magnetic-analog-recording | Magnetic & Analog Recording |
| 44 | 16-computing | Computing |
| 45 | 40-semiconductor-technology | Semiconductor Technology |

---

## Content Already Complete

These chapters have FULL content and must NOT be overwritten:

- `content/volumes/01-survival/01-water-purification/index.mdx` — 5 purification methods
- `content/volumes/01-survival/02-fire-making/index.mdx` — bow drill, flint-steel, lens
- `content/volumes/40-semiconductor-technology/01-silicon-from-sand/index.mdx` — carbothermic reduction
- `content/volumes/40-semiconductor-technology/02-purification-zone-refining/index.mdx` — zone refining + Siemens
- `content/volumes/42-magnetic-analog-recording/01-magnetic-core-memory/index.mdx` — full core memory build

---

## Status Tracking

Update `TASK_QUEUE.md` (in this directory) as batches are completed:
- Move volume slug from Open → In-Progress when starting
- Move from In-Progress → Done when all chapters are written and build passes
- One agent should own one batch at a time to avoid conflicts

---

*Last updated: 2026-06-15. App at guide-to-civilization/, 45 volumes, 12 appendices, 5 phases.*
