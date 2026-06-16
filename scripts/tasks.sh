#!/usr/bin/env bash
# Task tracker for parallel agent content generation
# Usage: ./scripts/tasks.sh <command> [args]

set -euo pipefail

DB="${TASKS_DB:-$(dirname "$0")/tasks.db}"

usage() {
  cat <<EOF
Usage: $(basename "$0") <command> [args]

Commands:
  init                  Create the database and seed all chapters
  claim-next [vol-slug] Claim next unclaimed chapter (optionally within a volume)
  complete <chapter-id> Mark a chapter as done
  release <chapter-id>  Release a claimed chapter back to pending
  status                Show progress summary
  list [vol-slug]       List all chapters (optionally filtered by volume)

Examples:
  ./scripts/tasks.sh init
  ./scripts/tasks.sh claim-next
  ./scripts/tasks.sh claim-next 01-survival
  ./scripts/tasks.sh complete 01-survival/03-shelter-construction
  ./scripts/tasks.sh release 01-survival/03-shelter-construction
  ./scripts/tasks.sh status
EOF
  exit 1
}

q() { sqlite3 "$DB" "$@"; }

cmd_init() {
  if [[ -f "$DB" ]]; then
    echo "Database already exists at $DB"
    echo "To reset: rm $DB && ./scripts/tasks.sh init"
    exit 1
  fi

  q "
  CREATE TABLE chapters (
    id TEXT PRIMARY KEY,
    volume_slug TEXT NOT NULL,
    volume_display_num INTEGER NOT NULL,
    volume_title TEXT NOT NULL,
    chapter_slug TEXT NOT NULL,
    chapter_num INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    agent_id TEXT,
    claimed_at TEXT,
    completed_at TEXT,
    CHECK (status IN ('pending', 'claimed', 'done'))
  );
  CREATE INDEX idx_status ON chapters(status);
  CREATE INDEX idx_volume ON chapters(volume_slug);
  "

  seed_data

  local total
  total=$(q "SELECT COUNT(*) FROM chapters;")
  echo "Initialized $DB with $total chapters"
}

seed_data() {
  # Insert all chapters: id, vol_slug, vol_display_num, vol_title, ch_slug, ch_num, ch_title, status
  # Chapters already DONE are seeded as 'done'

  q "BEGIN TRANSACTION;

  -- Vol 1 | 19-civilization-roadmap
  INSERT INTO chapters VALUES ('19-civilization-roadmap/01-how-to-use-this-guide',       '19-civilization-roadmap', 1,  'Civilization Roadmap',           '01-how-to-use-this-guide',        1, 'How to Use This Guide',                   'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('19-civilization-roadmap/02-the-16-step-progression',     '19-civilization-roadmap', 1,  'Civilization Roadmap',           '02-the-16-step-progression',      2, 'The 16-Step Progression',                 'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('19-civilization-roadmap/03-failure-modes',               '19-civilization-roadmap', 1,  'Civilization Roadmap',           '03-failure-modes',                3, 'Failure Modes',                           'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('19-civilization-roadmap/04-knowledge-preservation',      '19-civilization-roadmap', 1,  'Civilization Roadmap',           '04-knowledge-preservation',       4, 'Knowledge Preservation',                  'pending', NULL, NULL, NULL);

  -- Vol 2 | 35-wilderness-survival-tracking
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/01-tracking-and-sign',   '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '01-tracking-and-sign',   1, 'Tracking and Sign',                       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/02-terrain-navigation',  '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '02-terrain-navigation',  2, 'Terrain Navigation',                      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/03-edible-plants-depth', '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '03-edible-plants-depth', 3, 'Edible Plants in Depth',                  'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/04-primitive-tools',     '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '04-primitive-tools',     4, 'Primitive Tools',                         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/05-hunting-strategies',  '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '05-hunting-strategies',  5, 'Hunting Strategies',                      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/06-shelter-by-environment', '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '06-shelter-by-environment', 6, 'Shelter by Environment',                'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('35-wilderness-survival-tracking/07-emergency-signaling', '35-wilderness-survival-tracking', 2, 'Wilderness Survival & Tracking', '07-emergency-signaling', 7, 'Emergency Signaling',                     'pending', NULL, NULL, NULL);

  -- Vol 3 | 01-survival (ch1 and ch2 already done)
  INSERT INTO chapters VALUES ('01-survival/01-water-purification',   '01-survival', 3, 'Survival', '01-water-purification',  1, 'Water Purification',    'done',    NULL, NULL, datetime('now'));
  INSERT INTO chapters VALUES ('01-survival/02-fire-making',          '01-survival', 3, 'Survival', '02-fire-making',         2, 'Fire Making',           'done',    NULL, NULL, datetime('now'));
  INSERT INTO chapters VALUES ('01-survival/03-shelter-construction', '01-survival', 3, 'Survival', '03-shelter-construction',3, 'Shelter Construction',  'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/04-food-preservation',    '01-survival', 3, 'Survival', '04-food-preservation',   4, 'Food Preservation',     'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/05-hunting-trapping',     '01-survival', 3, 'Survival', '05-hunting-trapping',    5, 'Hunting & Trapping',    'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/06-fishing',              '01-survival', 3, 'Survival', '06-fishing',             6, 'Fishing',               'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/07-first-aid',            '01-survival', 3, 'Survival', '07-first-aid',           7, 'First Aid',             'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/08-rope-knots',           '01-survival', 3, 'Survival', '08-rope-knots',          8, 'Rope & Knots',          'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/09-primitive-tools',      '01-survival', 3, 'Survival', '09-primitive-tools',     9, 'Primitive Tools',       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('01-survival/10-navigation',           '01-survival', 3, 'Survival', '10-navigation',         10, 'Navigation',            'pending', NULL, NULL, NULL);

  -- Vol 4 | 14-medicine
  INSERT INTO chapters VALUES ('14-medicine/01-anatomy-overview',    '14-medicine', 4, 'Medicine', '01-anatomy-overview',    1, 'Anatomy Overview',      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/02-wound-care',          '14-medicine', 4, 'Medicine', '02-wound-care',          2, 'Wound Care',            'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/03-germ-theory-practice','14-medicine', 4, 'Medicine', '03-germ-theory-practice',3, 'Germ Theory in Practice','pending',NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/04-fever-and-infection', '14-medicine', 4, 'Medicine', '04-fever-and-infection', 4, 'Fever and Infection',   'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/05-fractures-dislocations','14-medicine',4, 'Medicine', '05-fractures-dislocations',5,'Fractures & Dislocations','pending',NULL,NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/06-childbirth',          '14-medicine', 4, 'Medicine', '06-childbirth',          6, 'Childbirth',            'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/07-field-surgery',       '14-medicine', 4, 'Medicine', '07-field-surgery',       7, 'Field Surgery',         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/08-public-health',       '14-medicine', 4, 'Medicine', '08-public-health',       8, 'Public Health',         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('14-medicine/09-herbal-pharmacopoeia','14-medicine', 4, 'Medicine', '09-herbal-pharmacopoeia',9, 'Herbal Pharmacopoeia',  'pending', NULL, NULL, NULL);

  -- Vol 5 | 36-sanitation-engineering
  INSERT INTO chapters VALUES ('36-sanitation-engineering/01-latrine-design',    '36-sanitation-engineering', 5, 'Sanitation Engineering', '01-latrine-design',    1, 'Latrine Design',       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/02-sewage-treatment',  '36-sanitation-engineering', 5, 'Sanitation Engineering', '02-sewage-treatment',  2, 'Sewage Treatment',     'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/03-composting-toilets','36-sanitation-engineering', 5, 'Sanitation Engineering', '03-composting-toilets',3, 'Composting Toilets',   'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/04-water-testing',     '36-sanitation-engineering', 5, 'Sanitation Engineering', '04-water-testing',     4, 'Water Testing',        'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/05-vector-control',    '36-sanitation-engineering', 5, 'Sanitation Engineering', '05-vector-control',    5, 'Vector Control',       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/06-waste-management',  '36-sanitation-engineering', 5, 'Sanitation Engineering', '06-waste-management',  6, 'Waste Management',     'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('36-sanitation-engineering/07-greywater-systems', '36-sanitation-engineering', 5, 'Sanitation Engineering', '07-greywater-systems', 7, 'Greywater Systems',    'pending', NULL, NULL, NULL);

  -- Vol 6 | 27-ethics-philosophy
  INSERT INTO chapters VALUES ('27-ethics-philosophy/01-ethical-frameworks',     '27-ethics-philosophy', 6, 'Ethics & Philosophy', '01-ethical-frameworks',     1, 'Ethical Frameworks',         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('27-ethics-philosophy/02-justice-and-rights',     '27-ethics-philosophy', 6, 'Ethics & Philosophy', '02-justice-and-rights',     2, 'Justice and Rights',         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('27-ethics-philosophy/03-resource-allocation',    '27-ethics-philosophy', 6, 'Ethics & Philosophy', '03-resource-allocation',    3, 'Resource Allocation',        'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('27-ethics-philosophy/04-social-contracts',       '27-ethics-philosophy', 6, 'Ethics & Philosophy', '04-social-contracts',       4, 'Social Contracts',           'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('27-ethics-philosophy/05-decision-under-uncertainty','27-ethics-philosophy',6,'Ethics & Philosophy', '05-decision-under-uncertainty',5,'Decision Under Uncertainty','pending',NULL,NULL, NULL);
  INSERT INTO chapters VALUES ('27-ethics-philosophy/06-leadership-and-authority','27-ethics-philosophy',6, 'Ethics & Philosophy', '06-leadership-and-authority',6, 'Leadership and Authority',   'pending', NULL, NULL, NULL);

  -- Vol 7 | 25-psychology-education
  INSERT INTO chapters VALUES ('25-psychology-education/01-trauma-and-crisis',   '25-psychology-education', 7, 'Psychology & Education', '01-trauma-and-crisis',   1, 'Trauma and Crisis',       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/02-group-dynamics',      '25-psychology-education', 7, 'Psychology & Education', '02-group-dynamics',      2, 'Group Dynamics',          'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/03-conflict-resolution', '25-psychology-education', 7, 'Psychology & Education', '03-conflict-resolution', 3, 'Conflict Resolution',     'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/04-child-development',   '25-psychology-education', 7, 'Psychology & Education', '04-child-development',   4, 'Child Development',       'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/05-learning-theory',     '25-psychology-education', 7, 'Psychology & Education', '05-learning-theory',     5, 'Learning Theory',         'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/06-school-design',       '25-psychology-education', 7, 'Psychology & Education', '06-school-design',       6, 'School Design',           'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('25-psychology-education/07-oral-tradition',      '25-psychology-education', 7, 'Psychology & Education', '07-oral-tradition',      7, 'Oral Tradition',          'pending', NULL, NULL, NULL);

  -- Vol 8 | 18-society-governance
  INSERT INTO chapters VALUES ('18-society-governance/01-property-systems',      '18-society-governance', 8, 'Society & Governance', '01-property-systems',      1, 'Property Systems',        'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('18-society-governance/02-rule-of-law',           '18-society-governance', 8, 'Society & Governance', '02-rule-of-law',           2, 'Rule of Law',             'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('18-society-governance/03-government-structures', '18-society-governance', 8, 'Society & Governance', '03-government-structures', 3, 'Government Structures',   'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('18-society-governance/04-taxation-and-labor',    '18-society-governance', 8, 'Society & Governance', '04-taxation-and-labor',    4, 'Taxation and Labor',      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('18-society-governance/05-record-keeping',        '18-society-governance', 8, 'Society & Governance', '05-record-keeping',        5, 'Record Keeping',          'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('18-society-governance/06-currency-from-scratch', '18-society-governance', 8, 'Society & Governance', '06-currency-from-scratch', 6, 'Currency From Scratch',   'pending', NULL, NULL, NULL);

  -- Vol 9 | 31-military-defense
  INSERT INTO chapters VALUES ('31-military-defense/01-fortification-design',   '31-military-defense', 9, 'Military History & Defense', '01-fortification-design',  1, 'Fortification Design',    'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('31-military-defense/02-perimeter-security',     '31-military-defense', 9, 'Military History & Defense', '02-perimeter-security',    2, 'Perimeter Security',      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('31-military-defense/03-defensive-strategy',     '31-military-defense', 9, 'Military History & Defense', '03-defensive-strategy',    3, 'Defensive Strategy',      'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('31-military-defense/04-siege-basics',           '31-military-defense', 9, 'Military History & Defense', '04-siege-basics',          4, 'Siege Basics',            'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('31-military-defense/05-weapon-basics',          '31-military-defense', 9, 'Military History & Defense', '05-weapon-basics',         5, 'Weapon Basics',           'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('31-military-defense/06-lessons-from-history',   '31-military-defense', 9, 'Military History & Defense', '06-lessons-from-history',  6, 'Lessons from History',    'pending', NULL, NULL, NULL);

  -- Vol 10 | 08-agriculture
  INSERT INTO chapters VALUES ('08-agriculture/01-soil-science',          '08-agriculture', 10, 'Agriculture', '01-soil-science',         1, 'Soil Science',            'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/02-crop-selection',        '08-agriculture', 10, 'Agriculture', '02-crop-selection',       2, 'Crop Selection',          'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/03-seed-saving',           '08-agriculture', 10, 'Agriculture', '03-seed-saving',          3, 'Seed Saving',             'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/04-irrigation',            '08-agriculture', 10, 'Agriculture', '04-irrigation',           4, 'Irrigation',              'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/05-crop-rotation',         '08-agriculture', 10, 'Agriculture', '05-crop-rotation',        5, 'Crop Rotation',           'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/06-composting-at-scale',   '08-agriculture', 10, 'Agriculture', '06-composting-at-scale',  6, 'Composting at Scale',     'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/07-pest-control',          '08-agriculture', 10, 'Agriculture', '07-pest-control',         7, 'Pest Control',            'pending', NULL, NULL, NULL);
  INSERT INTO chapters VALUES ('08-agriculture/08-livestock-integration', '08-agriculture', 10, 'Agriculture', '08-livestock-integration',8, 'Livestock Integration',   'pending', NULL, NULL, NULL);

  -- Vol 11 | 33-veterinary-medicine
  INSERT INTO chapters VALUES ('33-veterinary-medicine/01-cattle-and-draft-animals','33-veterinary-medicine',11,'Veterinary Medicine','01-cattle-and-draft-animals',1,'Cattle and Draft Animals','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('33-veterinary-medicine/02-pigs-and-poultry',        '33-veterinary-medicine',11,'Veterinary Medicine','02-pigs-and-poultry',        2,'Pigs and Poultry',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('33-veterinary-medicine/03-goats-and-sheep',         '33-veterinary-medicine',11,'Veterinary Medicine','03-goats-and-sheep',         3,'Goats and Sheep',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('33-veterinary-medicine/04-field-surgery',           '33-veterinary-medicine',11,'Veterinary Medicine','04-field-surgery',           4,'Field Surgery',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('33-veterinary-medicine/05-parasite-control',        '33-veterinary-medicine',11,'Veterinary Medicine','05-parasite-control',        5,'Parasite Control',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('33-veterinary-medicine/06-quarantine-protocols',    '33-veterinary-medicine',11,'Veterinary Medicine','06-quarantine-protocols',    6,'Quarantine Protocols',    'pending',NULL,NULL,NULL);

  -- Vol 12 | 20-food-science-fermentation
  INSERT INTO chapters VALUES ('20-food-science-fermentation/01-nutrition-requirements','20-food-science-fermentation',12,'Food Science & Fermentation','01-nutrition-requirements',1,'Nutrition Requirements','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/02-lacto-fermentation',   '20-food-science-fermentation',12,'Food Science & Fermentation','02-lacto-fermentation',   2,'Lacto-Fermentation',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/03-brewing',              '20-food-science-fermentation',12,'Food Science & Fermentation','03-brewing',              3,'Brewing',              'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/04-vinegar-production',   '20-food-science-fermentation',12,'Food Science & Fermentation','04-vinegar-production',   4,'Vinegar Production',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/05-baking-and-leavening', '20-food-science-fermentation',12,'Food Science & Fermentation','05-baking-and-leavening', 5,'Baking and Leavening', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/06-dairy-processing',     '20-food-science-fermentation',12,'Food Science & Fermentation','06-dairy-processing',     6,'Dairy Processing',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/07-salt-curing-and-smoking','20-food-science-fermentation',12,'Food Science & Fermentation','07-salt-curing-and-smoking',7,'Salt Curing & Smoking','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('20-food-science-fermentation/08-spoilage-science',     '20-food-science-fermentation',12,'Food Science & Fermentation','08-spoilage-science',     8,'Spoilage Science',     'pending',NULL,NULL,NULL);

  -- Vol 13 | 30-environmental-science-conservation
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/01-soil-conservation',   '30-environmental-science-conservation',13,'Environmental Science','01-soil-conservation',   1,'Soil Conservation',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/02-water-catchment',     '30-environmental-science-conservation',13,'Environmental Science','02-water-catchment',     2,'Water Catchment',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/03-forest-management',   '30-environmental-science-conservation',13,'Environmental Science','03-forest-management',   3,'Forest Management',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/04-carrying-capacity',   '30-environmental-science-conservation',13,'Environmental Science','04-carrying-capacity',   4,'Carrying Capacity',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/05-ecosystem-restoration','30-environmental-science-conservation',13,'Environmental Science','05-ecosystem-restoration',5,'Ecosystem Restoration','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('30-environmental-science-conservation/06-pollution-prevention', '30-environmental-science-conservation',13,'Environmental Science','06-pollution-prevention', 6,'Pollution Prevention', 'pending',NULL,NULL,NULL);

  -- Vol 14 | 09-natural-resources
  INSERT INTO chapters VALUES ('09-natural-resources/01-geology-basics',       '09-natural-resources',14,'Natural Resources','01-geology-basics',       1,'Geology Basics',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('09-natural-resources/02-ore-identification',   '09-natural-resources',14,'Natural Resources','02-ore-identification',   2,'Ore Identification',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('09-natural-resources/03-groundwater-finding',  '09-natural-resources',14,'Natural Resources','03-groundwater-finding',  3,'Groundwater Finding',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('09-natural-resources/04-coal-and-peat',        '09-natural-resources',14,'Natural Resources','04-coal-and-peat',        4,'Coal and Peat',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('09-natural-resources/05-mining-basics',        '09-natural-resources',14,'Natural Resources','05-mining-basics',        5,'Mining Basics',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('09-natural-resources/06-clay-and-limestone',   '09-natural-resources',14,'Natural Resources','06-clay-and-limestone',   6,'Clay and Limestone',    'pending',NULL,NULL,NULL);

  -- Vol 15 | 34-ceramics-pottery
  INSERT INTO chapters VALUES ('34-ceramics-pottery/01-clay-identification',   '34-ceramics-pottery',15,'Ceramics & Pottery','01-clay-identification',   1,'Clay Identification',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/02-hand-building',         '34-ceramics-pottery',15,'Ceramics & Pottery','02-hand-building',         2,'Hand Building',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/03-wheel-throwing',        '34-ceramics-pottery',15,'Ceramics & Pottery','03-wheel-throwing',        3,'Wheel Throwing',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/04-kiln-design',           '34-ceramics-pottery',15,'Ceramics & Pottery','04-kiln-design',           4,'Kiln Design',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/05-glazing-chemistry',     '34-ceramics-pottery',15,'Ceramics & Pottery','05-glazing-chemistry',     5,'Glazing Chemistry',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/06-firing-temperatures',   '34-ceramics-pottery',15,'Ceramics & Pottery','06-firing-temperatures',   6,'Firing Temperatures',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('34-ceramics-pottery/07-ceramic-applications',  '34-ceramics-pottery',15,'Ceramics & Pottery','07-ceramic-applications',  7,'Ceramic Applications',  'pending',NULL,NULL,NULL);

  -- Vol 16 | 21-textile-fiber-arts
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/01-plant-fiber-processing','21-textile-fiber-arts',16,'Textile & Fiber Arts','01-plant-fiber-processing',1,'Plant Fiber Processing','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/02-animal-fiber-processing','21-textile-fiber-arts',16,'Textile & Fiber Arts','02-animal-fiber-processing',2,'Animal Fiber Processing','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/03-spinning',              '21-textile-fiber-arts',16,'Textile & Fiber Arts','03-spinning',              3,'Spinning',              'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/04-loom-construction',     '21-textile-fiber-arts',16,'Textile & Fiber Arts','04-loom-construction',     4,'Loom Construction',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/05-weaving-patterns',      '21-textile-fiber-arts',16,'Textile & Fiber Arts','05-weaving-patterns',      5,'Weaving Patterns',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/06-leather-tanning',       '21-textile-fiber-arts',16,'Textile & Fiber Arts','06-leather-tanning',       6,'Leather Tanning',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('21-textile-fiber-arts/07-natural-dyes',          '21-textile-fiber-arts',16,'Textile & Fiber Arts','07-natural-dyes',          7,'Natural Dyes',          'pending',NULL,NULL,NULL);

  -- Vol 17 | 10-materials
  INSERT INTO chapters VALUES ('10-materials/01-woodworking',         '10-materials',17,'Materials','01-woodworking',        1,'Woodworking',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/02-brickmaking',         '10-materials',17,'Materials','02-brickmaking',        2,'Brickmaking',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/03-glassmaking',         '10-materials',17,'Materials','03-glassmaking',        3,'Glassmaking',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/04-cement-and-concrete', '10-materials',17,'Materials','04-cement-and-concrete',4,'Cement and Concrete',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/05-charcoal-production', '10-materials',17,'Materials','05-charcoal-production',5,'Charcoal Production',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/06-iron-smelting',       '10-materials',17,'Materials','06-iron-smelting',      6,'Iron Smelting',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/07-steel-production',    '10-materials',17,'Materials','07-steel-production',   7,'Steel Production',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('10-materials/08-copper-and-bronze',   '10-materials',17,'Materials','08-copper-and-bronze',  8,'Copper and Bronze',    'pending',NULL,NULL,NULL);

  -- Vol 18 | 22-architecture-structural-engineering
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/01-load-calculations',    '22-architecture-structural-engineering',18,'Architecture & Structural Engineering','01-load-calculations',    1,'Load Calculations',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/02-foundations',          '22-architecture-structural-engineering',18,'Architecture & Structural Engineering','02-foundations',          2,'Foundations',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/03-arch-vault-dome',      '22-architecture-structural-engineering',18,'Architecture & Structural Engineering','03-arch-vault-dome',      3,'Arch, Vault & Dome',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/04-timber-frame-joinery', '22-architecture-structural-engineering',18,'Architecture & Structural Engineering','04-timber-frame-joinery', 4,'Timber Frame Joinery', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/05-adobe-and-rammed-earth','22-architecture-structural-engineering',18,'Architecture & Structural Engineering','05-adobe-and-rammed-earth',5,'Adobe and Rammed Earth','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/06-passive-solar-design', '22-architecture-structural-engineering',18,'Architecture & Structural Engineering','06-passive-solar-design', 6,'Passive Solar Design', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('22-architecture-structural-engineering/07-drainage-and-waterproofing','22-architecture-structural-engineering',18,'Architecture & Structural Engineering','07-drainage-and-waterproofing',7,'Drainage & Waterproofing','pending',NULL,NULL,NULL);

  -- Vol 19 | 28-hydraulics-water-engineering
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/01-aqueducts',       '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','01-aqueducts',       1,'Aqueducts',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/02-well-digging',    '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','02-well-digging',    2,'Well Digging',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/03-irrigation-channels','28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','03-irrigation-channels',3,'Irrigation Channels','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/04-water-mills',     '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','04-water-mills',     4,'Water Mills',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/05-pumps',           '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','05-pumps',           5,'Pumps',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/06-sewage-systems',  '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','06-sewage-systems',  6,'Sewage Systems',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('28-hydraulics-water-engineering/07-flood-control',   '28-hydraulics-water-engineering',19,'Hydraulics & Water Engineering','07-flood-control',   7,'Flood Control',    'pending',NULL,NULL,NULL);

  -- Vol 20 | 24-music-art-cultural-preservation
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/01-why-culture-matters',  '24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','01-why-culture-matters',  1,'Why Culture Matters',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/02-percussion-instruments','24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','02-percussion-instruments',2,'Percussion Instruments','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/03-string-instruments',   '24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','03-string-instruments',   3,'String Instruments',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/04-wind-instruments',     '24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','04-wind-instruments',     4,'Wind Instruments',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/05-music-theory-and-notation','24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','05-music-theory-and-notation',5,'Music Theory & Notation','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/06-pigments-and-painting','24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','06-pigments-and-painting',6,'Pigments and Painting',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/07-bookbinding',          '24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','07-bookbinding',          7,'Bookbinding',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('24-music-art-cultural-preservation/08-archive-strategy',     '24-music-art-cultural-preservation',20,'Music, Art & Cultural Preservation','08-archive-strategy',     8,'Archive Strategy',      'pending',NULL,NULL,NULL);

  -- Vol 21 | 02-scientific-method
  INSERT INTO chapters VALUES ('02-scientific-method/01-observation-and-measurement','02-scientific-method',21,'Scientific Method','01-observation-and-measurement',1,'Observation and Measurement','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/02-hypothesis-and-experiment',  '02-scientific-method',21,'Scientific Method','02-hypothesis-and-experiment',  2,'Hypothesis and Experiment', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/03-record-keeping',             '02-scientific-method',21,'Scientific Method','03-record-keeping',             3,'Record Keeping',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/04-statistics-basics',          '02-scientific-method',21,'Scientific Method','04-statistics-basics',          4,'Statistics Basics',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/05-reasoning-errors',           '02-scientific-method',21,'Scientific Method','05-reasoning-errors',           5,'Reasoning Errors',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/06-peer-review-reconstruction', '02-scientific-method',21,'Scientific Method','06-peer-review-reconstruction', 6,'Peer Review Reconstruction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('02-scientific-method/07-philosophy-of-science',      '02-scientific-method',21,'Scientific Method','07-philosophy-of-science',      7,'Philosophy of Science',     'pending',NULL,NULL,NULL);

  -- Vol 22 | 03-mathematics
  INSERT INTO chapters VALUES ('03-mathematics/01-arithmetic',            '03-mathematics',22,'Mathematics','01-arithmetic',           1,'Arithmetic',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/02-geometry',              '03-mathematics',22,'Mathematics','02-geometry',             2,'Geometry',             'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/03-algebra',               '03-mathematics',22,'Mathematics','03-algebra',              3,'Algebra',              'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/04-trigonometry',          '03-mathematics',22,'Mathematics','04-trigonometry',         4,'Trigonometry',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/05-analytic-geometry',     '03-mathematics',22,'Mathematics','05-analytic-geometry',    5,'Analytic Geometry',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/06-calculus-concepts',     '03-mathematics',22,'Mathematics','06-calculus-concepts',    6,'Calculus Concepts',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/07-probability-and-statistics','03-mathematics',22,'Mathematics','07-probability-and-statistics',7,'Probability & Statistics','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('03-mathematics/08-number-systems',        '03-mathematics',22,'Mathematics','08-number-systems',       8,'Number Systems',       'pending',NULL,NULL,NULL);

  -- Vol 23 | 04-language-communication
  INSERT INTO chapters VALUES ('04-language-communication/01-reading-and-writing',  '04-language-communication',23,'Language & Communication','01-reading-and-writing',  1,'Reading and Writing',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('04-language-communication/02-grammar-essentials',   '04-language-communication',23,'Language & Communication','02-grammar-essentials',   2,'Grammar Essentials',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('04-language-communication/03-printing-methods',     '04-language-communication',23,'Language & Communication','03-printing-methods',     3,'Printing Methods',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('04-language-communication/04-dictionary-construction','04-language-communication',23,'Language & Communication','04-dictionary-construction',4,'Dictionary Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('04-language-communication/05-information-storage',  '04-language-communication',23,'Language & Communication','05-information-storage',  5,'Information Storage',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('04-language-communication/06-ciphers-and-codes',    '04-language-communication',23,'Language & Communication','06-ciphers-and-codes',    6,'Ciphers and Codes',     'pending',NULL,NULL,NULL);

  -- Vol 24 | 26-cartography-surveying
  INSERT INTO chapters VALUES ('26-cartography-surveying/01-coordinate-systems','26-cartography-surveying',24,'Cartography & Surveying','01-coordinate-systems',1,'Coordinate Systems','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('26-cartography-surveying/02-land-surveying',    '26-cartography-surveying',24,'Cartography & Surveying','02-land-surveying',    2,'Land Surveying',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('26-cartography-surveying/03-triangulation',     '26-cartography-surveying',24,'Cartography & Surveying','03-triangulation',     3,'Triangulation',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('26-cartography-surveying/04-map-projections',   '26-cartography-surveying',24,'Cartography & Surveying','04-map-projections',   4,'Map Projections',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('26-cartography-surveying/05-terrain-mapping',   '26-cartography-surveying',24,'Cartography & Surveying','05-terrain-mapping',   5,'Terrain Mapping',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('26-cartography-surveying/06-property-boundaries','26-cartography-surveying',24,'Cartography & Surveying','06-property-boundaries',6,'Property Boundaries','pending',NULL,NULL,NULL);

  -- Vol 25 | 32-trade-money-markets
  INSERT INTO chapters VALUES ('32-trade-money-markets/01-barter-systems',       '32-trade-money-markets',25,'Trade, Money & Markets','01-barter-systems',       1,'Barter Systems',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('32-trade-money-markets/02-commodity-money',      '32-trade-money-markets',25,'Trade, Money & Markets','02-commodity-money',      2,'Commodity Money',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('32-trade-money-markets/03-coinage',              '32-trade-money-markets',25,'Trade, Money & Markets','03-coinage',              3,'Coinage',               'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('32-trade-money-markets/04-weights-and-measures', '32-trade-money-markets',25,'Trade, Money & Markets','04-weights-and-measures', 4,'Weights and Measures',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('32-trade-money-markets/05-accounting-and-ledgers','32-trade-money-markets',25,'Trade, Money & Markets','05-accounting-and-ledgers',5,'Accounting and Ledgers','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('32-trade-money-markets/06-markets-and-prices',   '32-trade-money-markets',25,'Trade, Money & Markets','06-markets-and-prices',   6,'Markets and Prices',    'pending',NULL,NULL,NULL);

  -- Vol 26 | 23-meteorology-earth-sciences
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/01-atmosphere-basics',     '23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','01-atmosphere-basics',     1,'Atmosphere Basics',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/02-cloud-identification',  '23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','02-cloud-identification',  2,'Cloud Identification',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/03-instrument-construction','23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','03-instrument-construction',3,'Instrument Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/04-weather-prediction',    '23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','04-weather-prediction',    4,'Weather Prediction',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/05-climate-zones',         '23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','05-climate-zones',         5,'Climate Zones',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('23-meteorology-earth-sciences/06-flood-and-drought',     '23-meteorology-earth-sciences',26,'Meteorology & Earth Sciences','06-flood-and-drought',     6,'Flood and Drought',     'pending',NULL,NULL,NULL);

  -- Vol 27 | 07-biology
  INSERT INTO chapters VALUES ('07-biology/01-cell-theory',    '07-biology',27,'Biology','01-cell-theory',    1,'Cell Theory',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/02-genetics-basics','07-biology',27,'Biology','02-genetics-basics',2,'Genetics Basics','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/03-evolution',      '07-biology',27,'Biology','03-evolution',      3,'Evolution',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/04-ecology',        '07-biology',27,'Biology','04-ecology',        4,'Ecology',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/05-human-anatomy',  '07-biology',27,'Biology','05-human-anatomy',  5,'Human Anatomy',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/06-microbiology',   '07-biology',27,'Biology','06-microbiology',   6,'Microbiology',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/07-taxonomy',       '07-biology',27,'Biology','07-taxonomy',       7,'Taxonomy',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('07-biology/08-botany-depth',   '07-biology',27,'Biology','08-botany-depth',   8,'Botany in Depth','pending',NULL,NULL,NULL);

  -- Vol 28 | 05-chemistry
  INSERT INTO chapters VALUES ('05-chemistry/01-atomic-theory',          '05-chemistry',28,'Chemistry','01-atomic-theory',         1,'Atomic Theory',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/02-chemical-reactions',     '05-chemistry',28,'Chemistry','02-chemical-reactions',    2,'Chemical Reactions',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/03-acids-and-bases',        '05-chemistry',28,'Chemistry','03-acids-and-bases',       3,'Acids and Bases',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/04-electrochemistry',       '05-chemistry',28,'Chemistry','04-electrochemistry',      4,'Electrochemistry',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/05-making-soap',            '05-chemistry',28,'Chemistry','05-making-soap',           5,'Making Soap',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/06-glassmaking-chemistry',  '05-chemistry',28,'Chemistry','06-glassmaking-chemistry', 6,'Glassmaking Chemistry',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/07-producing-sulfuric-acid','05-chemistry',28,'Chemistry','07-producing-sulfuric-acid',7,'Producing Sulfuric Acid','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/08-producing-fertilizers',  '05-chemistry',28,'Chemistry','08-producing-fertilizers', 8,'Producing Fertilizers',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('05-chemistry/09-organic-chemistry-basics','05-chemistry',28,'Chemistry','09-organic-chemistry-basics',9,'Organic Chemistry Basics','pending',NULL,NULL,NULL);

  -- Vol 29 | 06-physics
  INSERT INTO chapters VALUES ('06-physics/01-mechanics',             '06-physics',29,'Physics','01-mechanics',            1,'Mechanics',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/02-heat-and-thermodynamics','06-physics',29,'Physics','02-heat-and-thermodynamics',2,'Heat & Thermodynamics','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/03-waves-and-sound',       '06-physics',29,'Physics','03-waves-and-sound',      3,'Waves and Sound',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/04-optics',                '06-physics',29,'Physics','04-optics',               4,'Optics',               'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/05-static-electricity',    '06-physics',29,'Physics','05-static-electricity',   5,'Static Electricity',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/06-magnetism',             '06-physics',29,'Physics','06-magnetism',            6,'Magnetism',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/07-electromagnetism',      '06-physics',29,'Physics','07-electromagnetism',     7,'Electromagnetism',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('06-physics/08-nuclear-physics-basics','06-physics',29,'Physics','08-nuclear-physics-basics',8,'Nuclear Physics Basics','pending',NULL,NULL,NULL);

  -- Vol 30 | 17-astronomy-navigation
  INSERT INTO chapters VALUES ('17-astronomy-navigation/01-celestial-sphere',       '17-astronomy-navigation',30,'Astronomy & Navigation','01-celestial-sphere',       1,'Celestial Sphere',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('17-astronomy-navigation/02-star-identification',    '17-astronomy-navigation',30,'Astronomy & Navigation','02-star-identification',    2,'Star Identification',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('17-astronomy-navigation/03-latitude-from-observation','17-astronomy-navigation',30,'Astronomy & Navigation','03-latitude-from-observation',3,'Latitude from Observation','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('17-astronomy-navigation/04-longitude-and-time',     '17-astronomy-navigation',30,'Astronomy & Navigation','04-longitude-and-time',     4,'Longitude and Time',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('17-astronomy-navigation/05-calendars',              '17-astronomy-navigation',30,'Astronomy & Navigation','05-calendars',              5,'Calendars',               'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('17-astronomy-navigation/06-telescope-construction', '17-astronomy-navigation',30,'Astronomy & Navigation','06-telescope-construction', 6,'Telescope Construction',  'pending',NULL,NULL,NULL);

  -- Vol 31 | 38-pharmacology-drug-production
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/01-aspirin-synthesis',   '38-pharmacology-drug-production',31,'Pharmacology & Drug Production','01-aspirin-synthesis',   1,'Aspirin Synthesis',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/02-antiseptics',         '38-pharmacology-drug-production',31,'Pharmacology & Drug Production','02-antiseptics',         2,'Antiseptics',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/03-quinine-extraction',  '38-pharmacology-drug-production',31,'Pharmacology & Drug Production','03-quinine-extraction',  3,'Quinine Extraction',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/04-herbal-pharmacopoeia','38-pharmacology-drug-production',31,'Pharmacology & Drug Production','04-herbal-pharmacopoeia',4,'Herbal Pharmacopoeia','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/05-ether-and-anesthesia','38-pharmacology-drug-production',31,'Pharmacology & Drug Production','05-ether-and-anesthesia',5,'Ether and Anesthesia','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('38-pharmacology-drug-production/06-drug-safety-testing', '38-pharmacology-drug-production',31,'Pharmacology & Drug Production','06-drug-safety-testing', 6,'Drug Safety Testing', 'pending',NULL,NULL,NULL);

  -- Vol 32 | 29-optics-instrument-making
  INSERT INTO chapters VALUES ('29-optics-instrument-making/01-glass-grinding',        '29-optics-instrument-making',32,'Optics & Instrument Making','01-glass-grinding',        1,'Glass Grinding',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('29-optics-instrument-making/02-microscope-construction','29-optics-instrument-making',32,'Optics & Instrument Making','02-microscope-construction',2,'Microscope Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('29-optics-instrument-making/03-telescope-construction','29-optics-instrument-making',32,'Optics & Instrument Making','03-telescope-construction',3,'Telescope Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('29-optics-instrument-making/04-spectrometer-building', '29-optics-instrument-making',32,'Optics & Instrument Making','04-spectrometer-building', 4,'Spectrometer Building', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('29-optics-instrument-making/05-precision-balance',     '29-optics-instrument-making',32,'Optics & Instrument Making','05-precision-balance',     5,'Precision Balance',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('29-optics-instrument-making/06-instrument-calibration','29-optics-instrument-making',32,'Optics & Instrument Making','06-instrument-calibration',6,'Instrument Calibration','pending',NULL,NULL,NULL);

  -- Vol 33 | 11-mechanical-engineering
  INSERT INTO chapters VALUES ('11-mechanical-engineering/01-simple-machines',   '11-mechanical-engineering',33,'Mechanical Engineering','01-simple-machines',   1,'Simple Machines',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/02-gears-and-bearings','11-mechanical-engineering',33,'Mechanical Engineering','02-gears-and-bearings',2,'Gears and Bearings', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/03-water-wheels',      '11-mechanical-engineering',33,'Mechanical Engineering','03-water-wheels',      3,'Water Wheels',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/04-windmills',         '11-mechanical-engineering',33,'Mechanical Engineering','04-windmills',         4,'Windmills',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/05-steam-engine',      '11-mechanical-engineering',33,'Mechanical Engineering','05-steam-engine',      5,'Steam Engine',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/06-internal-combustion','11-mechanical-engineering',33,'Mechanical Engineering','06-internal-combustion',6,'Internal Combustion','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('11-mechanical-engineering/07-blueprints-and-drawings','11-mechanical-engineering',33,'Mechanical Engineering','07-blueprints-and-drawings',7,'Blueprints and Drawings','pending',NULL,NULL,NULL);

  -- Vol 34 | 37-energy-systems
  INSERT INTO chapters VALUES ('37-energy-systems/01-charcoal-at-scale',  '37-energy-systems',34,'Energy Systems','01-charcoal-at-scale',  1,'Charcoal at Scale',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/02-biogas-digesters',   '37-energy-systems',34,'Energy Systems','02-biogas-digesters',   2,'Biogas Digesters',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/03-ethanol-production', '37-energy-systems',34,'Energy Systems','03-ethanol-production', 3,'Ethanol Production',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/04-biodiesel',          '37-energy-systems',34,'Energy Systems','04-biodiesel',          4,'Biodiesel',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/05-solar-thermal',      '37-energy-systems',34,'Energy Systems','05-solar-thermal',      5,'Solar Thermal',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/06-energy-storage',     '37-energy-systems',34,'Energy Systems','06-energy-storage',     6,'Energy Storage',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('37-energy-systems/07-power-calculations', '37-energy-systems',34,'Energy Systems','07-power-calculations', 7,'Power Calculations',  'pending',NULL,NULL,NULL);

  -- Vol 35 | 15-transportation
  INSERT INTO chapters VALUES ('15-transportation/01-road-construction', '15-transportation',35,'Transportation','01-road-construction', 1,'Road Construction',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('15-transportation/02-bridges',           '15-transportation',35,'Transportation','02-bridges',           2,'Bridges',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('15-transportation/03-ship-construction', '15-transportation',35,'Transportation','03-ship-construction', 3,'Ship Construction',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('15-transportation/04-railroad-basics',   '15-transportation',35,'Transportation','04-railroad-basics',   4,'Railroad Basics',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('15-transportation/05-automobiles-simplified','15-transportation',35,'Transportation','05-automobiles-simplified',5,'Automobiles Simplified','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('15-transportation/06-aircraft-basics',   '15-transportation',35,'Transportation','06-aircraft-basics',   6,'Aircraft Basics',    'pending',NULL,NULL,NULL);

  -- Vol 36 | 39-seafaring-oceanography
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/01-tides-and-currents',         '39-seafaring-oceanography',36,'Seafaring & Oceanography','01-tides-and-currents',         1,'Tides and Currents',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/02-celestial-navigation-at-sea','39-seafaring-oceanography',36,'Seafaring & Oceanography','02-celestial-navigation-at-sea',2,'Celestial Navigation at Sea','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/03-hull-design',                '39-seafaring-oceanography',36,'Seafaring & Oceanography','03-hull-design',                3,'Hull Design',                'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/04-sail-and-rigging',           '39-seafaring-oceanography',36,'Seafaring & Oceanography','04-sail-and-rigging',           4,'Sail and Rigging',           'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/05-boat-construction',          '39-seafaring-oceanography',36,'Seafaring & Oceanography','05-boat-construction',          5,'Boat Construction',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('39-seafaring-oceanography/06-fisheries-management',       '39-seafaring-oceanography',36,'Seafaring & Oceanography','06-fisheries-management',       6,'Fisheries Management',       'pending',NULL,NULL,NULL);

  -- Vol 37 | 12-electrical-engineering
  INSERT INTO chapters VALUES ('12-electrical-engineering/01-static-and-basic-circuits','12-electrical-engineering',37,'Electrical Engineering','01-static-and-basic-circuits',1,'Static & Basic Circuits','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/02-batteries',                '12-electrical-engineering',37,'Electrical Engineering','02-batteries',                2,'Batteries',                'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/03-generator-construction',   '12-electrical-engineering',37,'Electrical Engineering','03-generator-construction',   3,'Generator Construction',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/04-motors',                   '12-electrical-engineering',37,'Electrical Engineering','04-motors',                   4,'Motors',                   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/05-transformers',             '12-electrical-engineering',37,'Electrical Engineering','05-transformers',             5,'Transformers',             'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/06-power-grid-basics',        '12-electrical-engineering',37,'Electrical Engineering','06-power-grid-basics',        6,'Power Grid Basics',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('12-electrical-engineering/07-radio-basics',             '12-electrical-engineering',37,'Electrical Engineering','07-radio-basics',             7,'Radio Basics',             'pending',NULL,NULL,NULL);

  -- Vol 38 | 13-manufacturing
  INSERT INTO chapters VALUES ('13-manufacturing/01-precision-measurement','13-manufacturing',38,'Manufacturing','01-precision-measurement',1,'Precision Measurement','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('13-manufacturing/02-lathe-operation',      '13-manufacturing',38,'Manufacturing','02-lathe-operation',      2,'Lathe Operation',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('13-manufacturing/03-milling-machines',     '13-manufacturing',38,'Manufacturing','03-milling-machines',     3,'Milling Machines',     'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('13-manufacturing/04-casting',              '13-manufacturing',38,'Manufacturing','04-casting',              4,'Casting',              'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('13-manufacturing/05-forging',              '13-manufacturing',38,'Manufacturing','05-forging',              5,'Forging',              'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('13-manufacturing/06-mass-production-principles','13-manufacturing',38,'Manufacturing','06-mass-production-principles',6,'Mass Production Principles','pending',NULL,NULL,NULL);

  -- Vol 39 | 43-polymers-synthetic-materials
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/01-polymerization-basics',         '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','01-polymerization-basics',         1,'Polymerization Basics',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/02-polyethylene-and-polypropylene','43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','02-polyethylene-and-polypropylene',2,'Polyethylene and Polypropylene', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/03-pvc-production',                '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','03-pvc-production',                3,'PVC Production',                 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/04-nylon-and-polyester',           '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','04-nylon-and-polyester',           4,'Nylon and Polyester',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/05-synthetic-rubber',              '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','05-synthetic-rubber',              5,'Synthetic Rubber',               'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/06-epoxy-resins',                  '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','06-epoxy-resins',                  6,'Epoxy Resins',                   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/07-bakelite',                      '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','07-bakelite',                      7,'Bakelite',                       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('43-polymers-synthetic-materials/08-vulcanization',                 '43-polymers-synthetic-materials',39,'Polymers & Synthetic Materials','08-vulcanization',                 8,'Vulcanization',                  'pending',NULL,NULL,NULL);

  -- Vol 40 | 44-precision-metrology
  INSERT INTO chapters VALUES ('44-precision-metrology/01-tolerance-and-fit',  '44-precision-metrology',40,'Precision Metrology','01-tolerance-and-fit',  1,'Tolerance and Fit',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/02-vernier-calipers',   '44-precision-metrology',40,'Precision Metrology','02-vernier-calipers',   2,'Vernier Calipers',    'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/03-micrometers',        '44-precision-metrology',40,'Precision Metrology','03-micrometers',        3,'Micrometers',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/04-gauge-blocks',       '44-precision-metrology',40,'Precision Metrology','04-gauge-blocks',       4,'Gauge Blocks',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/05-surface-plates',     '44-precision-metrology',40,'Precision Metrology','05-surface-plates',     5,'Surface Plates',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/06-interferometry',     '44-precision-metrology',40,'Precision Metrology','06-interferometry',     6,'Interferometry',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('44-precision-metrology/07-spc-basics',         '44-precision-metrology',40,'Precision Metrology','07-spc-basics',         7,'SPC Basics',          'pending',NULL,NULL,NULL);

  -- Vol 41 | 45-telecommunications
  INSERT INTO chapters VALUES ('45-telecommunications/01-telegraph',         '45-telecommunications',41,'Telecommunications','01-telegraph',         1,'Telegraph',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/02-telephone-basics',  '45-telecommunications',41,'Telecommunications','02-telephone-basics',  2,'Telephone Basics',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/03-switching-systems', '45-telecommunications',41,'Telecommunications','03-switching-systems', 3,'Switching Systems', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/04-cable-construction','45-telecommunications',41,'Telecommunications','04-cable-construction',4,'Cable Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/05-multiplexing',      '45-telecommunications',41,'Telecommunications','05-multiplexing',      5,'Multiplexing',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/06-modulation',        '45-telecommunications',41,'Telecommunications','06-modulation',        6,'Modulation',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('45-telecommunications/07-digital-encoding',  '45-telecommunications',41,'Telecommunications','07-digital-encoding',  7,'Digital Encoding',  'pending',NULL,NULL,NULL);

  -- Vol 42 | 41-vacuum-tubes-early-electronics
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/01-thermionic-emission','41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','01-thermionic-emission',1,'Thermionic Emission','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/02-diode-construction','41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','02-diode-construction',2,'Diode Construction','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/03-triode-and-pentode','41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','03-triode-and-pentode',3,'Triode and Pentode','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/04-amplifier-circuits','41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','04-amplifier-circuits',4,'Amplifier Circuits','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/05-oscillators',       '41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','05-oscillators',       5,'Oscillators',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/06-crt-construction', '41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','06-crt-construction', 6,'CRT Construction',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('41-vacuum-tubes-early-electronics/07-radar-basics',     '41-vacuum-tubes-early-electronics',42,'Vacuum Tubes & Early Electronics','07-radar-basics',     7,'Radar Basics',      'pending',NULL,NULL,NULL);

  -- Vol 43 | 42-magnetic-analog-recording (ch1 already done)
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/01-magnetic-core-memory',  '42-magnetic-analog-recording',43,'Magnetic & Analog Recording','01-magnetic-core-memory',  1,'Magnetic Core Memory',  'done',NULL,NULL,datetime('now'));
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/02-ferrite-core-manufacture','42-magnetic-analog-recording',43,'Magnetic & Analog Recording','02-ferrite-core-manufacture',2,'Ferrite Core Manufacture','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/03-magnetic-tape',         '42-magnetic-analog-recording',43,'Magnetic & Analog Recording','03-magnetic-tape',         3,'Magnetic Tape',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/04-hard-disk-principles',  '42-magnetic-analog-recording',43,'Magnetic & Analog Recording','04-hard-disk-principles',  4,'Hard Disk Principles',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/05-punched-card-systems',  '42-magnetic-analog-recording',43,'Magnetic & Analog Recording','05-punched-card-systems',  5,'Punched Card Systems',  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('42-magnetic-analog-recording/06-photographic-film',     '42-magnetic-analog-recording',43,'Magnetic & Analog Recording','06-photographic-film',     6,'Photographic Film',     'pending',NULL,NULL,NULL);

  -- Vol 44 | 16-computing
  INSERT INTO chapters VALUES ('16-computing/01-binary-and-boolean',      '16-computing',44,'Computing','01-binary-and-boolean',      1,'Binary and Boolean',      'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/02-logic-gates',             '16-computing',44,'Computing','02-logic-gates',             2,'Logic Gates',             'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/03-relay-computer',          '16-computing',44,'Computing','03-relay-computer',          3,'Relay Computer',          'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/04-von-neumann-architecture','16-computing',44,'Computing','04-von-neumann-architecture',4,'Von Neumann Architecture','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/05-machine-code',            '16-computing',44,'Computing','05-machine-code',            5,'Machine Code',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/06-assembly-language',       '16-computing',44,'Computing','06-assembly-language',       6,'Assembly Language',       'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/07-operating-system-basics', '16-computing',44,'Computing','07-operating-system-basics', 7,'Operating System Basics', 'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('16-computing/08-cryptography',            '16-computing',44,'Computing','08-cryptography',            8,'Cryptography',            'pending',NULL,NULL,NULL);

  -- Vol 45 | 40-semiconductor-technology (ch1 and ch2 already done)
  INSERT INTO chapters VALUES ('40-semiconductor-technology/01-silicon-from-sand',       '40-semiconductor-technology',45,'Semiconductor Technology','01-silicon-from-sand',       1,'Silicon from Sand',        'done',NULL,NULL,datetime('now'));
  INSERT INTO chapters VALUES ('40-semiconductor-technology/02-purification-zone-refining','40-semiconductor-technology',45,'Semiconductor Technology','02-purification-zone-refining',2,'Purification: Zone Refining','done',NULL,NULL,datetime('now'));
  INSERT INTO chapters VALUES ('40-semiconductor-technology/03-czochralski-crystal-growth','40-semiconductor-technology',45,'Semiconductor Technology','03-czochralski-crystal-growth',3,'Czochralski Crystal Growth','pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/04-wafer-preparation',       '40-semiconductor-technology',45,'Semiconductor Technology','04-wafer-preparation',       4,'Wafer Preparation',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/05-thermal-oxidation',       '40-semiconductor-technology',45,'Semiconductor Technology','05-thermal-oxidation',       5,'Thermal Oxidation',        'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/06-photolithography',        '40-semiconductor-technology',45,'Semiconductor Technology','06-photolithography',        6,'Photolithography',         'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/07-etching',                 '40-semiconductor-technology',45,'Semiconductor Technology','07-etching',                 7,'Etching',                  'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/08-doping',                  '40-semiconductor-technology',45,'Semiconductor Technology','08-doping',                  8,'Doping',                   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/09-metallization',           '40-semiconductor-technology',45,'Semiconductor Technology','09-metallization',           9,'Metallization',            'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/10-packaging-and-testing',   '40-semiconductor-technology',45,'Semiconductor Technology','10-packaging-and-testing',  10,'Packaging and Testing',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/11-from-transistor-to-ic',   '40-semiconductor-technology',45,'Semiconductor Technology','11-from-transistor-to-ic',  11,'From Transistor to IC',   'pending',NULL,NULL,NULL);
  INSERT INTO chapters VALUES ('40-semiconductor-technology/12-ic-design-basics',        '40-semiconductor-technology',45,'Semiconductor Technology','12-ic-design-basics',        12,'IC Design Basics',        'pending',NULL,NULL,NULL);

  COMMIT;"
}

cmd_claim_next() {
  local vol_filter="${1:-}"
  local agent_id="${AGENT_ID:-agent-$$}"

  # Build the SELECT subquery depending on whether a volume filter is given
  local select_sql
  if [[ -n "$vol_filter" ]]; then
    select_sql="SELECT id FROM chapters WHERE status = 'pending' AND volume_slug = '${vol_filter}' ORDER BY chapter_num ASC LIMIT 1"
  else
    # Prefer volumes already in-progress (has a claimed chapter), then fall back to lowest display num
    select_sql="
      SELECT id FROM chapters
      WHERE status = 'pending'
        AND volume_slug IN (SELECT volume_slug FROM chapters WHERE status = 'claimed')
      ORDER BY volume_display_num ASC, chapter_num ASC LIMIT 1
    "
  fi

  # Atomically claim the row in one sqlite3 invocation
  local result
  result=$(sqlite3 "$DB" "
    BEGIN IMMEDIATE;
    UPDATE chapters
      SET status = 'claimed', agent_id = '${agent_id}', claimed_at = datetime('now')
      WHERE id = (${select_sql});
    SELECT id, chapter_title, volume_title, volume_display_num, chapter_num
      FROM chapters
      WHERE agent_id = '${agent_id}' AND status = 'claimed'
      ORDER BY claimed_at DESC LIMIT 1;
    COMMIT;
  ")

  # If no in-progress volume had pending chapters, retry with any pending chapter
  if [[ -z "$result" && -z "$vol_filter" ]]; then
    result=$(sqlite3 "$DB" "
      BEGIN IMMEDIATE;
      UPDATE chapters
        SET status = 'claimed', agent_id = '${agent_id}', claimed_at = datetime('now')
        WHERE id = (
          SELECT id FROM chapters WHERE status = 'pending'
          ORDER BY volume_display_num ASC, chapter_num ASC LIMIT 1
        );
      SELECT id, chapter_title, volume_title, volume_display_num, chapter_num
        FROM chapters
        WHERE agent_id = '${agent_id}' AND status = 'claimed'
        ORDER BY claimed_at DESC LIMIT 1;
      COMMIT;
    ")
  fi

  if [[ -z "$result" ]]; then
    echo "No pending chapters available"
    exit 0
  fi

  local chapter_id ch_title vol_title vol_num ch_num
  chapter_id=$(echo "$result" | cut -d'|' -f1)
  ch_title=$(echo "$result"   | cut -d'|' -f2)
  vol_title=$(echo "$result"  | cut -d'|' -f3)
  vol_num=$(echo "$result"    | cut -d'|' -f4)
  ch_num=$(echo "$result"     | cut -d'|' -f5)

  echo "CLAIMED"
  echo "id:      $chapter_id"
  echo "volume:  Vol $vol_num -- $vol_title"
  echo "chapter: Ch $ch_num -- $ch_title"
  echo "agent:   $agent_id"
  echo "path:    content/volumes/$chapter_id/index.mdx"
}

cmd_complete() {
  local chapter_id="${1:-}"
  [[ -z "$chapter_id" ]] && { echo "Error: chapter-id required"; exit 1; }

  local rows
  rows=$(q "UPDATE chapters SET status = 'done', completed_at = datetime('now') WHERE id = '$chapter_id' AND status = 'claimed'; SELECT changes();")
  if [[ "$rows" == "0" ]]; then
    echo "Error: '$chapter_id' not found or not currently claimed"
    exit 1
  fi
  echo "DONE: $chapter_id"
}

cmd_release() {
  local chapter_id="${1:-}"
  [[ -z "$chapter_id" ]] && { echo "Error: chapter-id required"; exit 1; }

  local rows
  rows=$(q "UPDATE chapters SET status = 'pending', agent_id = NULL, claimed_at = NULL WHERE id = '$chapter_id' AND status = 'claimed'; SELECT changes();")
  if [[ "$rows" == "0" ]]; then
    echo "Error: '$chapter_id' not found or not currently claimed"
    exit 1
  fi
  echo "RELEASED: $chapter_id"
}

cmd_status() {
  local total done claimed pending
  total=$(q   "SELECT COUNT(*) FROM chapters;")
  done=$(q    "SELECT COUNT(*) FROM chapters WHERE status = 'done';")
  claimed=$(q "SELECT COUNT(*) FROM chapters WHERE status = 'claimed';")
  pending=$(q "SELECT COUNT(*) FROM chapters WHERE status = 'pending';")

  echo "=== Task Tracker Status ==="
  echo "Total:   $total chapters"
  echo "Done:    $done"
  echo "Active:  $claimed"
  echo "Pending: $pending"
  echo ""

  local active_list
  active_list=$(q "SELECT agent_id, id, claimed_at FROM chapters WHERE status = 'claimed' ORDER BY claimed_at;")
  if [[ -n "$active_list" ]]; then
    echo "--- Active Claims ---"
    echo "$active_list" | while IFS='|' read -r agent id at; do
      echo "  [$agent] $id (since $at)"
    done
    echo ""
  fi

  echo "--- Progress by Volume ---"
  q "
  SELECT
    volume_display_num,
    volume_title,
    SUM(CASE WHEN status = 'done'    THEN 1 ELSE 0 END) AS done,
    SUM(CASE WHEN status = 'claimed' THEN 1 ELSE 0 END) AS active,
    COUNT(*) AS total
  FROM chapters
  GROUP BY volume_slug
  ORDER BY volume_display_num;
  " | while IFS='|' read -r num title done active total; do
    local bar=""
    if [[ "$done" == "$total" ]]; then
      bar="COMPLETE"
    elif [[ "$active" -gt 0 ]]; then
      bar="$done/$total (${active} active)"
    else
      bar="$done/$total"
    fi
    printf "  Vol %-2s  %-45s %s\n" "$num" "$title" "$bar"
  done
}

cmd_list() {
  local vol_filter="${1:-}"
  if [[ -n "$vol_filter" ]]; then
    q "
    SELECT status, chapter_num, chapter_slug, agent_id
    FROM chapters WHERE volume_slug = '$vol_filter'
    ORDER BY chapter_num;
    " | while IFS='|' read -r status num slug agent; do
      local tag="[ ]"
      [[ "$status" == "claimed" ]] && tag="[~] ($agent)"
      [[ "$status" == "done"    ]] && tag="[x]"
      printf "  %s Ch%02d  %s\n" "$tag" "$num" "$slug"
    done
  else
    q "
    SELECT volume_display_num, volume_title, status, chapter_num, chapter_slug
    FROM chapters ORDER BY volume_display_num, chapter_num;
    " | while IFS='|' read -r vnum vtitle status cnum cslug; do
      local tag="[ ]"
      [[ "$status" == "claimed" ]] && tag="[~]"
      [[ "$status" == "done"    ]] && tag="[x]"
      printf "  %s Vol%-2s Ch%02d  %s\n" "$tag" "$vnum" "$cnum" "$cslug"
    done
  fi
}

# --- Dispatch ---
CMD="${1:-}"
shift || true

case "$CMD" in
  init)         cmd_init ;;
  claim-next)   cmd_claim_next "${1:-}" ;;
  complete)     cmd_complete "${1:-}" ;;
  release)      cmd_release "${1:-}" ;;
  status)       cmd_status ;;
  list)         cmd_list "${1:-}" ;;
  *)            usage ;;
esac
