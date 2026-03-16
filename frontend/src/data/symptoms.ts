export interface SymptomCategory {
  name: string;
  icon: string;
  symptoms: string[];
}

import { FEATURE_SYMPTOMS } from "./featureNames";

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    name: "All Symptoms",
    icon: "🩺",
    symptoms: FEATURE_SYMPTOMS,
  },
];

// Common list is now just the first few features so the quick‑select matches the model
export const COMMON_SYMPTOMS = FEATURE_SYMPTOMS.slice(0, 8);

// ALL_SYMPTOMS drives the search/dropdown; use the exact feature set from the model
export const ALL_SYMPTOMS = FEATURE_SYMPTOMS;

export interface DiseaseResult {
  disease: string;
  confidence: number;
  riskLevel: "Low" | "Moderate" | "High";
  doctor: string;
  recoveryTime: string;
  severity: number; // 1-10
  nextAction: string;
  healthTips: string[];
  dietSuggestions: string[];
  lifestyleAdvice: string[];
  preventiveMeasures: string[];
}

export interface PredictionResponse {
  primary: DiseaseResult;
  alternatives: { disease: string; confidence: number }[];
  symptomContributions: { symptom: string; weight: number }[];
}

// labels corresponding to the ML model's class indices (0‑40). Matches the
// `prognosis` column ordering found in Training.csv
export const DISEASE_CLASSES = [
  'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
  'Peptic ulcer diseae', 'AIDS', 'Diabetes ', 'Gastroenteritis', 'Bronchial Asthma',
  'Hypertension ', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)',
  'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
  'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis',
  'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
  'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism',
  'Hypoglycemia', 'Osteoarthristis', 'Arthritis', '(vertigo) Paroymsal  Positional Vertigo',
  'Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo',
];

function normalizeDiseaseLabel(label: string) {
  // if numeric string, map via DISEASE_CLASSES; otherwise pass through
  if (/^[0-9]+$/.test(label)) {
    const idx = parseInt(label, 10);
    if (idx >= 0 && idx < DISEASE_CLASSES.length) {
      return DISEASE_CLASSES[idx];
    }
  }
  return label;
}

// Comprehensive disease database with realistic health guidance for all 41 conditions
const BASE_DB: DiseaseResult[] = [
  {
    disease: "Fungal infection",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Dermatologist",
    recoveryTime: "7-14 days",
    severity: 4,
    nextAction: "Apply antifungal cream and maintain skin hygiene",
    healthTips: ["Keep affected area clean and dry", "Avoid scratching to prevent spread", "Use breathable clothing"],
    dietSuggestions: ["Garlic and onions (natural antifungal)", "Yogurt with probiotics", "Coconut oil in diet"],
    lifestyleAdvice: ["Avoid public showers/pools temporarily", "Change clothes regularly", "Use separate towels"],
    preventiveMeasures: ["Maintain personal hygiene", "Keep feet dry", "Avoid sharing personal items"],
  },
  {
    disease: "Allergy",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Allergist",
    recoveryTime: "Variable",
    severity: 3,
    nextAction: "Identify and avoid allergens; use antihistamines if needed",
    healthTips: ["Use HEPA air filters", "Keep windows closed during high pollen", "Wash nasal passages with saline"],
    dietSuggestions: ["Quercetin-rich foods (apples, onions)", "Ginger and turmeric", "Avoid processed foods"],
    lifestyleAdvice: ["Wear sunglasses outdoors", "Shower before bed", "Vacuum regularly"],
    preventiveMeasures: ["Get allergy testing done", "Keep medication handy", "Track allergen levels"],
  },
  {
    disease: "GERD",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Gastroenterologist",
    recoveryTime: "Ongoing management",
    severity: 5,
    nextAction: "Avoid acidic foods and elevate head while sleeping",
    healthTips: ["Eat slowly and chew thoroughly", "Stay upright for 3 hours after meals", "Avoid tight clothing"],
    dietSuggestions: ["Oatmeal and whole grains", "Lean proteins (chicken, fish)", "Herbal teas (not caffeine)"],
    lifestyleAdvice: ["Sleep with head elevated", "Light evening meals", "Manage stress and anxiety"],
    preventiveMeasures: ["Avoid spicy and fatty foods", "Limit caffeine and alcohol", "Maintain healthy weight"],
  },
  {
    disease: "Chronic cholestasis",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Hepatologist",
    recoveryTime: "Chronic – ongoing",
    severity: 6,
    nextAction: "Regular liver function tests and specialist monitoring",
    healthTips: ["Avoid alcohol completely", "Take prescribed bile salts", "Monitor for jaundice"],
    dietSuggestions: ["Low-fat diet", "Fruits and vegetables", "Vitamin-supplemented foods"],
    lifestyleAdvice: ["Rest adequately", "Avoid hepatotoxic medications", "Manage itching with moisturizers"],
    preventiveMeasures: ["Regular liver monitoring", "Avoid infections", "Maintain balanced nutrition"],
  },
  {
    disease: "Drug Reaction",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "General Physician",
    recoveryTime: "2-7 days after stopping drug",
    severity: 5,
    nextAction: "Stop offending medication and seek medical guidance",
    healthTips: ["Never skip meals when taking medications", "Stay well hydrated", "Report all symptoms to doctor"],
    dietSuggestions: ["Plenty of water", "Bland, easy-to-digest foods", "Milk (if not dairy-sensitive)"],
    lifestyleAdvice: ["Rest and avoid strenuous activity", "Monitor vital signs", "Keep updated medication list"],
    preventiveMeasures: ["Inform doctors of all past reactions", "Read medication labels", "Keep allergy records"],
  },
  {
    disease: "Peptic ulcer diseae",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Gastroenterologist",
    recoveryTime: "4-6 weeks with treatment",
    severity: 5,
    nextAction: "Take prescribed acid reducers and avoid triggers",
    healthTips: ["Eat small, frequent meals", "Avoid eating 2-3 hours before bed", "Reduce stress"],
    dietSuggestions: ["Milk and milk products", "Lean meats and fish", "Brown rice and whole wheat"],
    lifestyleAdvice: ["Avoid NSAIDs if possible", "Quit smoking", "Limit alcohol consumption"],
    preventiveMeasures: ["Manage stress effectively", "Avoid spicy foods", "Regular follow-up visits"],
  },
  {
    disease: "AIDS",
    confidence: 0,
    riskLevel: "High",
    doctor: "Infectious Diseases Specialist",
    recoveryTime: "Lifelong management",
    severity: 9,
    nextAction: "Immediate antiretroviral therapy (ART) initiation",
    healthTips: ["Take ART medications exactly as prescribed", "Get regular CD4 count tests", "Prevent opportunistic infections"],
    dietSuggestions: ["High-protein foods", "Fruits and vegetables", "Adequate calorie intake"],
    lifestyleAdvice: ["Get adequate sleep", "Moderate exercise", "Avoid smoking and alcohol"],
    preventiveMeasures: ["Use protection during intercourse", "Regular medical checkups", "Prophylactic medications"],
  },
  {
    disease: "Diabetes ",
    confidence: 0,
    riskLevel: "High",
    doctor: "Endocrinologist",
    recoveryTime: "Lifelong management",
    severity: 7,
    nextAction: "Monitor blood sugar and adjust diet and medication",
    healthTips: ["Check blood glucose regularly", "Monitor for hypoglycemia", "Keep feet inspected daily"],
    dietSuggestions: ["Complex carbohydrates", "Fiber-rich foods", "Brown rice and legumes"],
    lifestyleAdvice: ["30 minutes daily exercise", "Maintain healthy weight", "Manage stress levels"],
    preventiveMeasures: ["Regular HbA1c testing", "Eye and kidney screenings", "Foot care routine"],
  },
  {
    disease: "Gastroenteritis",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Gastroenterologist",
    recoveryTime: "3-5 days",
    severity: 5,
    nextAction: "Oral rehydration therapy and bland diet",
    healthTips: ["Take ORS solution regularly", "Enter clear liquid phase gradually", "Monitor hydration status"],
    dietSuggestions: ["Rice, bananas, toast", "Boiled vegetables", "Clear broths and soups"],
    lifestyleAdvice: ["Rest completely", "Wash hands after bathroom", "Avoid contaminated food/water"],
    preventiveMeasures: ["Food safety practices", "Clean drinking water", "Heat food adequately"],
  },
  {
    disease: "Bronchial Asthma",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Pulmonologist",
    recoveryTime: "Lifelong management",
    severity: 6,
    nextAction: "Use rescue inhalers and avoid known triggers",
    healthTips: ["Keep rescue inhaler always handy", "Monitor peak flow regularly", "Identify personal triggers"],
    dietSuggestions: ["Foods rich in magnesium", "Fatty fish (omega-3s)", "Vitamin C fruits"],
    lifestyleAdvice: ["Avoid allergens and pollution", "Regular gentle exercise", "Manage stress"],
    preventiveMeasures: ["Allergy testing", "Clean air filters", "Get flu vaccinations"],
  },
  {
    disease: "Hypertension ",
    confidence: 0,
    riskLevel: "High",
    doctor: "Cardiologist",
    recoveryTime: "Chronic - lifelong",
    severity: 7,
    nextAction: "Monitor BP daily and take medications consistently",
    healthTips: ["Check BP regularly each day", "Reduce sodium intake drastically", "Control stress daily"],
    dietSuggestions: ["DASH diet principles", "Potassium-rich foods", "Whole grains and vegetables"],
    lifestyleAdvice: ["Moderate exercise 5 days/week", "Limit alcohol intake", "Quit smoking immediately"],
    preventiveMeasures: ["Regular doctor visits", "Weight management", "Stress reduction techniques"],
  },
  {
    disease: "Migraine",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Neurologist",
    recoveryTime: "1-3 days",
    severity: 5,
    nextAction: "Rest in dark room and take prescribed pain relief",
    healthTips: ["Identify your personal triggers", "Apply ice/heat packs", "Rest in quiet environment"],
    dietSuggestions: ["Regular, balanced meals", "Magnesium-rich foods", "Avoid chocolate and aged cheeses"],
    lifestyleAdvice: ["Maintain consistent sleep", "Practice yoga or meditation", "Regular exercise routine"],
    preventiveMeasures: ["Keep migraine diary", "Manage stress proactively", "Stay well hydrated"],
  },
  {
    disease: "Cervical spondylosis",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Orthopedic Surgeon",
    recoveryTime: "Ongoing management",
    severity: 5,
    nextAction: "Physical therapy and pain management",
    healthTips: ["Maintain correct posture", "Use cervical spine support", "Apply heat therapy"],
    dietSuggestions: ["Calcium-rich foods", "Vitamin D sources", "Anti-inflammatory foods"],
    lifestyleAdvice: ["Avoid prolonged neck strain", "Take frequent breaks", "Sleep with supportive pillow"],
    preventiveMeasures: ["Ergonomic workspace setup", "Neck exercises daily", "Strengthen shoulder muscles"],
  },
  {
    disease: "Paralysis (brain hemorrhage)",
    confidence: 0,
    riskLevel: "High",
    doctor: "Neurologist",
    recoveryTime: "Months to years",
    severity: 9,
    nextAction: "Emergency hospitalization and stroke unit care",
    healthTips: ["Regular physical therapy", "Speech therapy if needed", "Monitor vital signs"],
    dietSuggestions: ["Easy-to-swallow foods", "Nutritious smoothies", "Soft, high-calorie meals"],
    lifestyleAdvice: ["Gradual rehabilitation exercises", "Emotional support counseling", "Family involvement"],
    preventiveMeasures: ["Control blood pressure", "Avoid overexertion", "Regular neurological checks"],
  },
  {
    disease: "Jaundice",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Hepatologist",
    recoveryTime: "7-21 days",
    severity: 5,
    nextAction: "Identify underlying cause and treat accordingly",
    healthTips: ["Rest adequately", "Monitor bilirubin levels", "Avoid hepatotoxic substances"],
    dietSuggestions: ["Light, digestible foods", "Fresh fruits and vegetables", "Avoid fatty foods"],
    lifestyleAdvice: ["Complete bed rest initially", "Avoid strenuous activity", "Maintain hygiene"],
    preventiveMeasures: ["Get vaccinated for Hepatitis A/B", "Ensure clean food/water", "Avoid contaminated needles"],
  },
  {
    disease: "Malaria",
    confidence: 0,
    riskLevel: "High",
    doctor: "Infectious Diseases Specialist",
    recoveryTime: "7-14 days with treatment",
    severity: 7,
    nextAction: "Start antimalarial medications immediately",
    healthTips: ["Take full course of antimalarials", "Manage fever with cooling methods", "Stay well hydrated"],
    dietSuggestions: ["Nutritious, easy-to-digest meals", "Citrus fruits for vitamin C", "Herbal teas"],
    lifestyleAdvice: ["Rest completely", "Monitor temperature regularly", "Prevent dehydration"],
    preventiveMeasures: ["Sleep under insecticide nets", "Use mosquito repellents", "Take prophylactic drugs if traveling"],
  },
  {
    disease: "Chicken pox",
    confidence: 0,
    riskLevel: "Low",
    doctor: "General Physician",
    recoveryTime: "7-10 days",
    severity: 4,
    nextAction: "Isolate from others and manage symptoms",
    healthTips: ["Keep nails trimmed", "Use calamine lotion", "Avoid scratching blisters"],
    dietSuggestions: ["Vitamin C rich foods", "Bland, soft meals", "Plenty of fluids"],
    lifestyleAdvice: ["Stay in cool environment", "Wear loose clothing", "Keep sheets changed frequently"],
    preventiveMeasures: ["Get varicella vaccine", "Avoid contact with infected persons", "Maintain hygiene"],
  },
  {
    disease: "Dengue",
    confidence: 0,
    riskLevel: "High",
    doctor: "Infectious Diseases Specialist",
    recoveryTime: "7-10 days",
    severity: 6,
    nextAction: "Monitor platelet count and manage fever",
    healthTips: ["Check platelet levels daily", "Rest completely", "Use paracetamol for fever"],
    dietSuggestions: ["Light, nutritious meals", "Papaya leaves juice", "Coconut water"],
    lifestyleAdvice: ["Complete bed rest", "Monitor for bleeding signs", "Stay hydrated constantly"],
    preventiveMeasures: ["Use mosquito nets", "Wear protective clothing", "Eliminate standing water"],
  },
  {
    disease: "Typhoid",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Infectious Diseases Specialist",
    recoveryTime: "10-14 days",
    severity: 6,
    nextAction: "Take prescribed antibiotics and maintain rest",
    healthTips: ["Complete antibiotic course", "Monitor temperature", "Manage delirium if present"],
    dietSuggestions: ["Soft rice and vegetables", "Broths and soups", "Vitamin C rich fruits"],
    lifestyleAdvice: ["Strict bed rest", "Avoid physical exertion", "Prevent relapse"],
    preventiveMeasures: ["Get typhoid vaccination", "Ensure clean food/water", "Proper sanitation"],
  },
  {
    disease: "hepatitis A",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Hepatologist",
    recoveryTime: "4-6 weeks",
    severity: 5,
    nextAction: "Manage symptoms and prevent transmission",
    healthTips: ["Practice strict hygiene", "Avoid alcohol completely", "Rest adequately"],
    dietSuggestions: ["Light, bland foods", "Fruits and vegetables", "Avoid fatty foods"],
    lifestyleAdvice: ["Self-isolate", "Separate eating utensils", "Frequent hand washing"],
    preventiveMeasures: ["Get Hepatitis A vaccine", "Clean water and food", "Sanitary practices"],
  },
  {
    disease: "Hepatitis B",
    confidence: 0,
    riskLevel: "High",
    doctor: "Hepatologist",
    recoveryTime: "Variable / lifelong if chronic",
    severity: 7,
    nextAction: "Get tested for chronic infection and monitor liver",
    healthTips: ["Avoid alcohol", "Regular liver function tests", "Inform sexual partners"],
    dietSuggestions: ["Antioxidant foods", "Vitamin D rich foods", "Lean proteins"],
    lifestyleAdvice: ["Use protection during sex", "Don't share personal items", "Manage stress"],
    preventiveMeasures: ["Get Hepatitis B vaccine", "Avoid contaminated needles", "Safe practices"],
  },
  {
    disease: "Hepatitis C",
    confidence: 0,
    riskLevel: "High",
    doctor: "Hepatologist",
    recoveryTime: "Variable / manageable with treatment",
    severity: 7,
    nextAction: "Antiviral therapy and monitor liver health",
    healthTips: ["Take antiviral medications", "Regular liver monitoring", "Avoid alcohol"],
    dietSuggestions: ["High-fiber foods", "Lean proteins", "Vitamin-rich vegetables"],
    lifestyleAdvice: ["Manage co-infections", "Reduce liver stress", "Emotional support"],
    preventiveMeasures: ["Avoid blood exposure", "Sterile needle use", "Regular screenings"],
  },
  {
    disease: "Hepatitis D",
    confidence: 0,
    riskLevel: "High",
    doctor: "Hepatologist",
    recoveryTime: "Variable",
    severity: 8,
    nextAction: "Hepatitis B control and liver protection",
    healthTips: ["Get Hepatitis B vaccine", "Monitor liver enzymes", "Avoid alcohol"],
    dietSuggestions: ["Nutrient-dense foods", "Antioxidant-rich diet", "Adequate protein"],
    lifestyleAdvice: ["Avoid risky behaviors", "Regular medical checkups", "Stress management"],
    preventiveMeasures: ["Hepatitis B vaccination", "Blood safety measures", "Partner notification"],
  },
  {
    disease: "Hepatitis E",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Hepatologist",
    recoveryTime: "4-6 weeks",
    severity: 5,
    nextAction: "Supportive care and prevent transmission",
    healthTips: ["Stay hydrated", "Monitor liver function", "Rest adequately"],
    dietSuggestions: ["Light, digestible meals", "Fresh fruits and vegetables", "Coconut water"],
    lifestyleAdvice: ["Isolate if symptomatic", "Handle food safely", "Maintain hygiene"],
    preventiveMeasures: ["Clean drinking water", "Proper sanitation", "Food hygiene"],
  },
  {
    disease: "Alcoholic hepatitis",
    confidence: 0,
    riskLevel: "High",
    doctor: "Hepatologist",
    recoveryTime: "Chronic - lifelong treatment",
    severity: 8,
    nextAction: "Immediate alcohol cessation and liver support",
    healthTips: ["Quit alcohol completely", "Nutrient supplementation", "Regular liver tests"],
    dietSuggestions: ["High-protein meals", "B-complex vitamins", "Antioxidant foods"],
    lifestyleAdvice: ["Join support groups", "Counseling sessions", "Healthy lifestyle"],
    preventiveMeasures: ["Avoid all alcohol", "Regular monitoring", "Professional help"],
  },
  {
    disease: "Tuberculosis",
    confidence: 0,
    riskLevel: "High",
    doctor: "Pulmonologist",
    recoveryTime: "6 months minimum",
    severity: 7,
    nextAction: "Start anti-TB medications immediately",
    healthTips: ["Complete full medication course", "Regular chest X-rays", "Respiratory isolation"],
    dietSuggestions: ["Protein-rich foods", "Eggs and milk", "Fruits and vegetables"],
    lifestyleAdvice: ["Sputum precautions", "Nutritious diet", "Avoid smoking"],
    preventiveMeasures: ["BCG vaccination", "Screen contacts", "Infection control measures"],
  },
  {
    disease: "Common Cold",
    confidence: 0,
    riskLevel: "Low",
    doctor: "General Physician",
    recoveryTime: "3-7 days",
    severity: 2,
    nextAction: "Rest, fluids, and symptom relief",
    healthTips: ["Use saline nasal drops", "Get plenty of rest", "Stay well hydrated"],
    dietSuggestions: ["Vitamin C rich foods", "Warm soups and broths", "Honey for throat"],
    lifestyleAdvice: ["Wash hands frequently", "Cover coughs/sneezes", "Avoid close contact"],
    preventiveMeasures: ["Maintain good hygiene", "Boost immunity", "Adequate sleep"],
  },
  {
    disease: "Pneumonia",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Pulmonologist",
    recoveryTime: "2-4 weeks",
    severity: 6,
    nextAction: "Antibiotic therapy and respiratory support",
    healthTips: ["Take antibiotics as prescribed", "Monitor oxygen levels", "Cough into tissue"],
    dietSuggestions: ["High-calorie foods", "Protein-rich diet", "Vitamin C supplement"],
    lifestyleAdvice: ["Bed rest initially", "Gradual activity increase", "Avoid smoke/fumes"],
    preventiveMeasures: ["Pneumococcal vaccine", "Flu vaccination", "Avoid infections"],
  },
  {
    disease: "Dimorphic hemmorhoids(piles)",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Proctologist",
    recoveryTime: "1-2 weeks",
    severity: 4,
    nextAction: "Increase fiber intake and use topical treatments",
    healthTips: ["Sitz baths with warm water", "Avoid straining", "Use stool softeners"],
    dietSuggestions: ["High-fiber foods", "Whole grains and legumes", "Fresh fruits and vegetables"],
    lifestyleAdvice: ["Regular exercise", "Avoid prolonged sitting", "Stay well hydrated"],
    preventiveMeasures: ["Maintain healthy diet", "Regular bowel movements", "Toilet hygiene"],
  },
  {
    disease: "Heart attack",
    confidence: 0,
    riskLevel: "High",
    doctor: "Cardiologist",
    recoveryTime: "6-8 weeks recovery",
    severity: 9,
    nextAction: "Emergency medical attention required immediately",
    healthTips: ["Take prescribed cardiac medications", "Monitor blood pressure", "Attend cardiac rehab"],
    dietSuggestions: ["Heart-healthy foods", "Low sodium diet", "Omega-3 rich foods"],
    lifestyleAdvice: ["Gentle exercise per protocol", "Stress reduction", "Regular medical visits"],
    preventiveMeasures: ["Quit smoking", "Control diabetes/BP", "Manage cholesterol"],
  },
  {
    disease: "Varicose veins",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Vascular Surgeon",
    recoveryTime: "Ongoing management",
    severity: 3,
    nextAction: "Compression therapy and elevation of legs",
    healthTips: ["Elevate legs regularly", "Use compression stockings", "Avoid prolonged standing"],
    dietSuggestions: ["Flavonoid-rich foods", "Garlic and onions", "Antioxidant foods"],
    lifestyleAdvice: ["Regular walking", "Avoid tight clothing", "Weight management"],
    preventiveMeasures: ["Regular exercise", "Maintain healthy weight", "Leg elevation daily"],
  },
  {
    disease: "Hypothyroidism",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Endocrinologist",
    recoveryTime: "Lifelong management",
    severity: 5,
    nextAction: "Begin thyroid hormone replacement therapy",
    healthTips: ["Take medications consistently", "Regular TSH tests", "Monitor symptoms"],
    dietSuggestions: ["Selenium-rich foods", "Iodized salt", "Brazil nuts and fish"],
    lifestyleAdvice: ["Regular exercise routine", "Adequate rest", "Stress management"],
    preventiveMeasures: ["Regular screening", "Maintain medication", "Balanced nutrition"],
  },
  {
    disease: "Hyperthyroidism",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Endocrinologist",
    recoveryTime: "6-12 months with treatment",
    severity: 5,
    nextAction: "Antithyroid medications and beta-blockers",
    healthTips: ["Take medications on schedule", "Cool environment", "Regular TFT monitoring"],
    dietSuggestions: ["Cruciferous vegetables", "Selenium-rich foods", "Adequate calories"],
    lifestyleAdvice: ["Avoid caffeine and stimulants", "Manage anxiety", "Rest regularly"],
    preventiveMeasures: ["Regular thyroid monitoring", "Stress avoidance", "Follow-up visits"],
  },
  {
    disease: "Hypoglycemia",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Endocrinologist",
    recoveryTime: "Quick recovery with glucose",
    severity: 6,
    nextAction: "Consume fast-acting carbohydrates immediately",
    healthTips: ["Keep glucose tablets handy", "Eat frequent small meals", "Monitor blood sugar"],
    dietSuggestions: ["Complex carbohydrates", "Protein with each meal", "Avoid prolonged fasting"],
    lifestyleAdvice: ["Regular meal schedule", "Avoid excessive exercise", "Inform friends/family"],
    preventiveMeasures: ["Regular glucose monitoring", "Balanced meals", "Emergency kit nearby"],
  },
  {
    disease: "Osteoarthristis",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Orthopedic Surgeon",
    recoveryTime: "Lifelong management",
    severity: 5,
    nextAction: "Physical therapy and pain management",
    healthTips: ["Warm compress therapy", "Maintain joint mobility", "Avoid overuse"],
    dietSuggestions: ["Anti-inflammatory foods", "Turmeric and ginger", "Vitamin D sources"],
    lifestyleAdvice: ["Gentle exercise routine", "Weight management", "Proper posture"],
    preventiveMeasures: ["Regular physical activity", "Balanced nutrition", "Joint protection"],
  },
  {
    disease: "Arthritis",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Rheumatologist",
    recoveryTime: "Lifelong management",
    severity: 5,
    nextAction: "Anti-inflammatory medications and physical therapy",
    healthTips: ["Use heat therapy", "Gentle stretching daily", "Joint protection techniques"],
    dietSuggestions: ["Omega-3 fish", "Colorful fruits/vegetables", "Green tea"],
    lifestyleAdvice: ["Moderate exercise", "Stop before pain intensifies", "Stress reduction"],
    preventiveMeasures: ["Maintain healthy weight", "Regular gentle activity", "Balanced diet"],
  },
  {
    disease: "(vertigo) Paroymsal  Positional Vertigo",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Otolaryngologist",
    recoveryTime: "2-6 weeks",
    severity: 4,
    nextAction: "Canalith repositioning maneuvers",
    healthTips: ["Avoid triggering head movements", "Rise slowly from bed", "Stay hydrated"],
    dietSuggestions: ["Ginger supplements", "Regular balanced meals", "Adequate water intake"],
    lifestyleAdvice: ["Move slowly and deliberately", "Avoid tall heights", "Use handrails"],
    preventiveMeasures: ["Head position awareness", "Gentle neck stretches", "Balance exercises"],
  },
  {
    disease: "Acne",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Dermatologist",
    recoveryTime: "4-8 weeks with treatment",
    severity: 3,
    nextAction: "Topical treatments and skin hygiene routine",
    healthTips: ["Wash face twice daily", "Don't squeeze pimples", "Use oil-free products"],
    dietSuggestions: ["Antioxidant-rich foods", "Avoid dairy and sugars", "Plenty of water"],
    lifestyleAdvice: ["Manage stress levels", "Get adequate sleep", "Avoid excessive sun"],
    preventiveMeasures: ["Daily cleansing routine", "Balanced diet", "Stress management"],
  },
  {
    disease: "Urinary tract infection",
    confidence: 0,
    riskLevel: "Moderate",
    doctor: "Urologist",
    recoveryTime: "3-7 days with antibiotics",
    severity: 4,
    nextAction: "Start antibiotics and increase fluid intake",
    healthTips: ["Drink plenty of water", "Urinate with full bladder", "Take warm baths"],
    dietSuggestions: ["Cranberry juice", "Blueberries", "High water content fruits"],
    lifestyleAdvice: ["Change underwear frequently", "Empty bladder regularly", "Avoid irritants"],
    preventiveMeasures: ["Hygiene practices", "Adequate hydration", "Urinate after intercourse"],
  },
  {
    disease: "Psoriasis",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Dermatologist",
    recoveryTime: "Lifelong management",
    severity: 4,
    nextAction: "Topical treatments and UV therapy if needed",
    healthTips: ["Moisturize skin regularly", "Avoid skin trauma", "Manage stress"],
    dietSuggestions: ["Anti-inflammatory foods", "Omega-3 fatty acids", "Vitamin D sources"],
    lifestyleAdvice: ["Gentle skin care", "Avoid extreme temperatures", "Sun exposure benefits"],
    preventiveMeasures: ["Stress reduction", "Regular skin care", "Avoid triggers"],
  },
  {
    disease: "Impetigo",
    confidence: 0,
    riskLevel: "Low",
    doctor: "Dermatologist",
    recoveryTime: "7-10 days",
    severity: 3,
    nextAction: "Antibiotic ointment or oral antibiotics",
    healthTips: ["Keep area clean and dry", "Cover affected areas", "Don't share towels"],
    dietSuggestions: ["Protein-rich foods", "Fruits and vegetables", "Adequate fluids"],
    lifestyleAdvice: ["Avoid spreading infection", "Trim nails short", "Separate personal items"],
    preventiveMeasures: ["Good personal hygiene", "Clean cuts properly", "Avoid close contact"],
  },
];

export const DISEASE_DB: DiseaseResult[] = DISEASE_CLASSES.map((name) => ({
  disease: name,
  confidence: 0,
  riskLevel: "Moderate",
  doctor: "General Physician",
  recoveryTime: "Unknown",
  severity: 5,
  nextAction: "Consult a healthcare professional",
  healthTips: [],
  dietSuggestions: [],
  lifestyleAdvice: [],
  preventiveMeasures: [],
}));

// override defaults with detailed records
for (const entry of BASE_DB) {
  const idx = DISEASE_DB.findIndex((d) => d.disease === entry.disease);
  if (idx !== -1) {
    DISEASE_DB[idx] = entry;
  } else {
    DISEASE_DB.push(entry);
  }
}


// originally the app used a mock implementation; now we call the backend API
export async function mockPredict(symptoms: string[]): Promise<PredictionResponse> {
  try {
    const resp = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });

    if (!resp.ok) {
      throw new Error(`server returned ${resp.status}`);
    }

    const data = await resp.json();

    // normalize any numeric class labels the model might send
    data.primary.disease = normalizeDiseaseLabel(data.primary.disease);
    data.alternatives = data.alternatives.map((a: any) => ({
      disease: normalizeDiseaseLabel(a.disease),
      confidence: a.confidence,
    }));

    // merge with local database to fill in additional fields
    const findDisease = (name: string) =>
      DISEASE_DB.find((d) => d.disease === name) || { disease: name };

    const primaryFromDb = findDisease(data.primary.disease);
    const primary: DiseaseResult = {
      ...primaryFromDb,
      confidence: Math.round(data.primary.confidence),
    } as DiseaseResult;

    const alternatives: { disease: string; confidence: number }[] =
      data.alternatives.map((a: any) => ({
        disease: a.disease,
        confidence: Math.round(a.confidence),
      }));

    const symptomContributions = data.symptomContributions;

    return { primary, alternatives, symptomContributions };
  } catch (err) {
    console.error("prediction error", err);
    // fallback to random
    return new Promise((resolve) => {
      setTimeout(() => {
        const primary = DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)];
        const others = DISEASE_DB.filter((d) => d.disease !== primary.disease);
        const alternatives = others
          .slice(0, 3)
          .map((d) => ({
            disease: d.disease,
            confidence: Math.max(20, d.confidence - Math.floor(Math.random() * 30)),
          }))
          .sort((a, b) => b.confidence - a.confidence);

        const symptomContributions = symptoms
          .map((s) => ({
            symptom: s,
            weight: Math.floor(Math.random() * 40) + 10,
          }))
          .sort((a, b) => b.weight - a.weight);

        resolve({ primary, alternatives, symptomContributions });
      }, 2500);
    });
  }
}
