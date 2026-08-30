// Training patterns supplied by the project owner. Responses are generated below so
// unverified clinic details and medical claims are never presented as confirmed facts.
export const dentalTraining = {
  "name": "Dental Clinic Chatbot Q&A Library",
  "version": "1.0",
  "intents": [
    {
      "tag": "greeting",
      "patterns": [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "how are you"
      ]
    },
    {
      "tag": "goodbye",
      "patterns": [
        "bye",
        "goodbye",
        "see you",
        "thanks bye",
        "have a good day"
      ]
    },
    {
      "tag": "thanks",
      "patterns": [
        "thank you",
        "thanks",
        "thank you so much",
        "appreciate it",
        "thx"
      ]
    },
    {
      "tag": "human_handoff",
      "patterns": [
        "talk to a human",
        "speak to a person",
        "real person",
        "customer service",
        "agent",
        "representative",
        "human"
      ]
    },
    {
      "tag": "location_hours",
      "patterns": [
        "where are you located",
        "what is your address",
        "how do I find you",
        "opening hours",
        "what time do you open",
        "are you open on saturday",
        "are you open on sunday",
        "your address",
        "directions"
      ]
    },
    {
      "tag": "contact_info",
      "patterns": [
        "phone number",
        "email address",
        "how do I contact you",
        "contact details",
        "call you",
        "your number",
        "your email"
      ]
    },
    {
      "tag": "book_appointment",
      "patterns": [
        "book an appointment",
        "make an appointment",
        "schedule a visit",
        "book a checkup",
        "i need to see a dentist",
        "book a cleaning",
        "make a booking",
        "schedule appointment"
      ]
    },
    {
      "tag": "book_checkup",
      "patterns": [
        "book a checkup",
        "routine checkup",
        "regular checkup",
        "annual checkup",
        "dental exam"
      ]
    },
    {
      "tag": "book_cleaning",
      "patterns": [
        "book a cleaning",
        "teeth cleaning",
        "dental cleaning",
        "scale and polish",
        "professional cleaning"
      ]
    },
    {
      "tag": "book_new_patient",
      "patterns": [
        "new patient",
        "first visit",
        "first appointment",
        "never been before",
        "new to the clinic"
      ]
    },
    {
      "tag": "book_returning",
      "patterns": [
        "returning patient",
        "existing patient",
        "been before",
        "i have an appointment history"
      ]
    },
    {
      "tag": "appointment_confirm",
      "patterns": [
        "confirm my appointment",
        "is my appointment confirmed",
        "check my booking",
        "did my appointment go through"
      ]
    },
    {
      "tag": "reschedule",
      "patterns": [
        "reschedule",
        "change my appointment",
        "move my appointment",
        "different time",
        "postpone"
      ]
    },
    {
      "tag": "cancel_appointment",
      "patterns": [
        "cancel my appointment",
        "cancel my booking",
        "i can't make it",
        "cancel"
      ]
    },
    {
      "tag": "appointment_cost",
      "patterns": [
        "how much is an appointment",
        "cost of a visit",
        "consultation fee",
        "price of checkup",
        "how much does a cleaning cost"
      ]
    },
    {
      "tag": "insurance_accept",
      "patterns": [
        "do you take my insurance",
        "insurance accepted",
        "do you accept insurance",
        "what insurance do you take",
        "covered by insurance"
      ]
    },
    {
      "tag": "emergency",
      "patterns": [
        "emergency",
        "severe pain",
        "bleeding",
        "knocked out tooth",
        "swelling",
        "broken tooth emergency",
        "urgent",
        "i'm in a lot of pain",
        "can't stop bleeding"
      ]
    },
    {
      "tag": "tooth_pain",
      "patterns": [
        "toothache",
        "tooth pain",
        "my tooth hurts",
        "pain in my tooth",
        "aching tooth",
        "sensitive tooth"
      ]
    },
    {
      "tag": "swelling",
      "patterns": [
        "swollen face",
        "swollen gum",
        "swelling",
        "facial swelling",
        "puffy",
        "swollen jaw"
      ]
    },
    {
      "tag": "bleeding",
      "patterns": [
        "bleeding gums",
        "my gums bleed",
        "bleeding after brushing",
        "blood in my mouth",
        "gums bleeding"
      ]
    },
    {
      "tag": "knocked_out_tooth",
      "patterns": [
        "knocked out tooth",
        "tooth fell out",
        "lost a tooth",
        "avulsed tooth"
      ]
    },
    {
      "tag": "broken_tooth",
      "patterns": [
        "broken tooth",
        "cracked tooth",
        "chipped tooth",
        "fractured tooth",
        "chipped my tooth"
      ]
    },
    {
      "tag": "abscess",
      "patterns": [
        "abscess",
        "gum boil",
        "pus",
        "infection in my mouth",
        "dental abscess"
      ]
    },
    {
      "tag": "triage_severe",
      "patterns": [
        "10",
        "9",
        "8",
        "very severe",
        "worst pain",
        "unbearable",
        "extreme pain"
      ]
    },
    {
      "tag": "triage_mild",
      "patterns": [
        "1",
        "2",
        "3",
        "4",
        "mild",
        "slight",
        "a little",
        "not too bad",
        "minor"
      ]
    },
    {
      "tag": "whitening",
      "patterns": [
        "teeth whitening",
        "whiten my teeth",
        "whitening cost",
        "is whitening safe",
        "bleaching"
      ]
    },
    {
      "tag": "implants",
      "patterns": [
        "dental implant",
        "implants",
        "replace a missing tooth",
        "implant cost",
        "are implants painful"
      ]
    },
    {
      "tag": "braces",
      "patterns": [
        "braces",
        "orthodontics",
        "straighten my teeth",
        "aligners",
        "invisalign",
        "clear aligners",
        "braces cost"
      ]
    },
    {
      "tag": "root_canal",
      "patterns": [
        "root canal",
        "root canal treatment",
        "do I need a root canal",
        "root canal pain",
        "endodontics"
      ]
    },
    {
      "tag": "extraction",
      "patterns": [
        "tooth extraction",
        "pull a tooth",
        "remove a tooth",
        "wisdom tooth removal",
        "extraction cost"
      ]
    },
    {
      "tag": "wisdom_teeth",
      "patterns": [
        "wisdom teeth",
        "wisdom tooth pain",
        "should I remove wisdom teeth",
        "impacted wisdom tooth"
      ]
    },
    {
      "tag": "crowns",
      "patterns": [
        "dental crown",
        "crown",
        "cap my tooth",
        "crown cost",
        "porcelain crown"
      ]
    },
    {
      "tag": "veneers",
      "patterns": [
        "veneers",
        "porcelain veneers",
        "smile makeover",
        "cover my teeth",
        "veneers cost"
      ]
    },
    {
      "tag": "fillings",
      "patterns": [
        "filling",
        "cavity",
        "tooth decay",
        "do I have a cavity",
        "filling cost"
      ]
    },
    {
      "tag": "gum_disease",
      "patterns": [
        "gum disease",
        "periodontitis",
        "gingivitis",
        "receding gums",
        "treat gum disease"
      ]
    },
    {
      "tag": "children_dentistry",
      "patterns": [
        "kids dentist",
        "children's dentist",
        "pediatric",
        "my child needs a dentist",
        "first tooth",
        "child toothache"
      ]
    },
    {
      "tag": "sedation",
      "patterns": [
        "sedation",
        "nervous about dentist",
        "dental anxiety",
        "afraid of dentist",
        "laughing gas",
        "nitrous oxide",
        "sleep dentistry"
      ]
    },
    {
      "tag": "cosmetic",
      "patterns": [
        "cosmetic dentistry",
        "smile makeover",
        "improve my smile",
        "cosmetic procedures",
        "aesthetic dentistry"
      ]
    },
    {
      "tag": "brushing_advice",
      "patterns": [
        "how often should i brush",
        "proper brushing",
        "how to brush",
        "how long should i brush",
        "brushing technique"
      ]
    },
    {
      "tag": "flossing_advice",
      "patterns": [
        "how to floss",
        "should i floss",
        "flossing tips",
        "do i need to floss",
        "floss everyday"
      ]
    },
    {
      "tag": "mouthwash",
      "patterns": [
        "should i use mouthwash",
        "is mouthwash good",
        "which mouthwash",
        "mouthwash recommendation"
      ]
    },
    {
      "tag": "sensitive_teeth",
      "patterns": [
        "sensitive teeth",
        "tooth sensitivity",
        "pain when eating cold",
        "sensitive to hot",
        "sensitive to sweet"
      ]
    },
    {
      "tag": "bad_breath",
      "patterns": [
        "bad breath",
        "halitosis",
        "my breath smells",
        "chronic bad breath"
      ]
    },
    {
      "tag": "dry_mouth",
      "patterns": [
        "dry mouth",
        "xerostomia",
        "my mouth is always dry",
        "not enough saliva"
      ]
    },
    {
      "tag": "bleeding_advice",
      "patterns": [
        "why do my gums bleed",
        "gums bleed when i brush",
        "bleeding gums cause"
      ]
    },
    {
      "tag": "diet_advice",
      "patterns": [
        "foods bad for teeth",
        "what foods cause cavities",
        "sugar and teeth",
        "healthy diet for teeth",
        "best foods for teeth"
      ]
    },
    {
      "tag": "smoking",
      "patterns": [
        "does smoking affect teeth",
        "smoking and oral health",
        "quit smoking teeth",
        "vaping and teeth"
      ]
    },
    {
      "tag": "pregnancy_dental",
      "patterns": [
        "dental care during pregnancy",
        "is it safe to see dentist while pregnant",
        "pregnancy and teeth",
        "pregnant dental treatment"
      ]
    },
    {
      "tag": "teeth_grinding",
      "patterns": [
        "grinding teeth",
        "bruxism",
        "clench my teeth",
        "jaw pain at night",
        "night guard"
      ]
    },
    {
      "tag": "jaw_pain",
      "patterns": [
        "jaw pain",
        "tmj",
        "tmj disorder",
        "clicking jaw",
        "jaw clicking",
        "pain when chewing"
      ]
    },
    {
      "tag": "mouth_sores",
      "patterns": [
        "canker sore",
        "mouth ulcer",
        "cold sore",
        "sores in my mouth",
        "blister in mouth"
      ]
    },
    {
      "tag": "price_list",
      "patterns": [
        "price list",
        "cost of treatments",
        "how much for",
        "treatment prices",
        "fee schedule",
        "pricing"
      ]
    },
    {
      "tag": "payment_plans",
      "patterns": [
        "payment plan",
        "pay in installments",
        "financing",
        "monthly payments",
        "can i pay later"
      ]
    },
    {
      "tag": "discounts",
      "patterns": [
        "discount",
        "any deals",
        "special offer",
        "promotion",
        "new patient special"
      ]
    },
    {
      "tag": "services",
      "patterns": [
        "what services do you offer",
        "what treatments do you have",
        "what do you do",
        "list of services",
        "what can you help with"
      ]
    },
    {
      "tag": "dentist_info",
      "patterns": [
        "who are the dentists",
        "tell me about the doctors",
        "your dentists",
        "staff",
        "who works there",
        "dentist qualifications"
      ]
    },
    {
      "tag": "out_of_scope",
      "patterns": [
        "what is the meaning of life",
        "tell me a joke",
        "random question",
        "help me with homework"
      ]
    }
  ],
  "booking_logic": {
    "flow": [
      {
        "step": "greet",
        "action": "Greet and ask reason for visit"
      },
      {
        "step": "collect_reason",
        "action": "Classify reason: checkup / cleaning / pain / treatment / new-patient",
        "intents": [
          "book_checkup",
          "book_cleaning",
          "tooth_pain",
          "book_new_patient"
        ]
      },
      {
        "step": "triage_check",
        "action": "If pain/emergency, run triage (severity, swelling, bleeding) before booking",
        "intents": [
          "emergency",
          "tooth_pain",
          "swelling",
          "bleeding",
          "knocked_out_tooth",
          "broken_tooth",
          "abscess"
        ]
      },
      {
        "step": "collect_datetime",
        "action": "Ask preferred date and time; check availability via calendar API",
        "slots": [
          "date",
          "time"
        ]
      },
      {
        "step": "collect_patient",
        "action": "Confirm name, phone, new/returning, insurance/payment",
        "slots": [
          "name",
          "phone",
          "patient_type",
          "insurance"
        ]
      },
      {
        "step": "confirm",
        "action": "Show summary (reason, date, time, dentist) and ask for confirmation"
      },
      {
        "step": "booked",
        "action": "Create appointment, send confirmation (SMS/email), offer calendar add"
      },
      {
        "step": "post_booking",
        "action": "Ask if they need reminders, directions, or anything else"
      }
    ],
    "triage_rules": {
      "emergency_immediate": [
        "knocked_out_tooth",
        "uncontrolled bleeding",
        "facial swelling with fever",
        "difficulty swallowing"
      ],
      "urgent_same_day": [
        "severe pain (8-10)",
        "abscess",
        "swelling",
        "broken tooth with pain"
      ],
      "routine": [
        "checkup",
        "cleaning",
        "mild sensitivity",
        "cosmetic consult"
      ]
    },
    "escalation": {
      "handoff": "If severity high, patient requests human, or booking API fails -> transfer to front desk",
      "medical_disclaimer": "Bot provides triage guidance only, never diagnosis; urgent cases directed to call or emergency number"
    }
  }
} as const;

const PHONE = "023 67 67 897";
const ADDRESS = "#77 Street 110, Sangkat Wat Phnom, Khan Daun Penh, Phnom Penh";

const directAnswers: Record<string, string> = {
  greeting: "Hello! Welcome to LaBelle Dental Clinic. Are you looking to book a visit, ask about a treatment, or get help with a dental concern?",
  goodbye: "Thank you for contacting LaBelle. You can return anytime or call the clinic at " + PHONE + ".",
  thanks: "You're welcome. Is there anything else you would like help with?",
  human_handoff: "Of course. A member of LaBelle’s front desk team can help. Please call " + PHONE + ". Live chat transfer is a planned production feature and is not active in this demo.",
  location_hours: "LaBelle Dental Clinic is located at " + ADDRESS + ". Please call " + PHONE + " to confirm today’s opening hours before travelling.",
  contact_info: "You can reach LaBelle’s front desk at " + PHONE + ".",
  book_appointment: "I can prepare an appointment request. Please share the reason for your visit, preferred date and time, whether you are a new or returning patient, your name and phone number.",
  book_checkup: "I can help request a checkup. What date and time would you prefer, and are you a new or returning patient?",
  book_cleaning: "I can help request a cleaning. What date and time would you prefer, and what name and phone number should the clinic use?",
  book_new_patient: "Welcome! Please share your dental concern, preferred date and time, name and phone number. LaBelle will confirm what records or payment information are needed.",
  book_returning: "Welcome back. Please share your name, preferred date and time, and the reason for your visit so the clinic can check the request.",
  appointment_confirm: "This demonstration cannot access LaBelle’s live appointment records. Please call " + PHONE + " with your name and requested date to confirm.",
  reschedule: "Please provide your name, current appointment time and preferred new time, or call " + PHONE + ". The clinic must confirm any change.",
  cancel_appointment: "Please call " + PHONE + " with your name and appointment date. This demo cannot cancel a real booking.",
  appointment_cost: "Treatment prices depend on an examination and the work required. I do not have a clinic-approved price list yet, so please call " + PHONE + " for a current quote.",
  insurance_accept: "Insurance and direct-billing arrangements have not been confirmed for this demo. Please call " + PHONE + " with your provider’s name.",
  emergency: "If you have difficulty breathing or swallowing, uncontrolled bleeding, rapidly spreading facial swelling, or another life-threatening concern, seek emergency medical care now. Otherwise, tell me what happened, your pain level from 0–10, and whether you have swelling, fever or bleeding, then call LaBelle at " + PHONE + ".",
  tooth_pain: "I’m sorry you’re in pain. What is the pain level from 0–10? Is it constant or triggered by hot, cold or sweets? Do you have swelling, fever, difficulty swallowing or bleeding? This helps the clinic prioritize an assessment; it is not a diagnosis.",
  swelling: "Dental or facial swelling can require prompt assessment. If you have trouble breathing or swallowing, rapidly spreading swelling, or feel seriously unwell, seek emergency medical care now. Otherwise call LaBelle at " + PHONE + ".",
  bleeding: "If bleeding is heavy or will not stop, seek urgent medical care. For lighter or recurring gum bleeding, arrange a dental assessment rather than relying on a chatbot diagnosis.",
  knocked_out_tooth: "A knocked-out adult tooth is time-sensitive. Hold it by the crown, not the root; if visibly dirty, gently rinse it without scrubbing; keep it moist in milk or an appropriate tooth-preservation solution and seek urgent dental care immediately. Call " + PHONE + ".",
  broken_tooth: "A broken or chipped tooth should be assessed. Tell me whether there is pain, bleeding, sensitivity or a sharp edge, and call " + PHONE + " for an urgent request.",
  abscess: "A suspected dental infection needs professional assessment. Fever, facial swelling, difficulty breathing or swallowing, or rapidly worsening symptoms require urgent medical attention. Call LaBelle at " + PHONE + ".",
  triage_severe: "Severe pain needs prompt professional assessment. Call LaBelle at " + PHONE + "; if you also have difficulty breathing or swallowing, uncontrolled bleeding or rapidly spreading swelling, seek emergency medical care now.",
  triage_mild: "Even mild symptoms can need an examination if they persist. I can help prepare a routine appointment request. Do you prefer morning or afternoon?",
  brushing_advice: "General guidance is to brush gently twice daily for about two minutes with fluoride toothpaste and a soft-bristled brush. A dentist may adjust advice for your needs.",
  flossing_advice: "Cleaning between the teeth daily is generally recommended. If bleeding persists, is heavy, or you have pain or swelling, arrange a dental assessment.",
  mouthwash: "Mouthwash can supplement but does not replace brushing and interdental cleaning. Ask LaBelle which product is suitable for your specific needs.",
  diet_advice: "Frequent sugary or acidic foods and drinks can increase tooth-decay or erosion risk. Water and regular meals are generally kinder to teeth; ask a dentist for personal advice.",
  smoking: "Smoking and vaping can harm oral health. A medical or dental professional can help you find appropriate quitting support.",
  mouth_sores: "A mouth sore that lasts more than two weeks, repeatedly returns, or is unusually painful should be professionally assessed.",
  services: "LaBelle can discuss checkups and cleaning, orthodontics, implants, fillings and repairs, crowns, root-canal care and cosmetic consultations. The clinic must confirm individual treatment availability and suitability.",
  dentist_info: "The clinic’s current dentist biographies and qualifications have not yet been approved for this demo. Please call " + PHONE + " to ask for the appropriate clinician.",
  price_list: "I do not have a LaBelle-approved price list. The clinic should provide current pricing after learning what treatment or examination you need. Call " + PHONE + ".",
  payment_plans: "Payment-plan and financing details have not been confirmed for this demo. Please ask LaBelle directly at " + PHONE + ".",
  discounts: "I do not have any clinic-approved promotions. Please call " + PHONE + " for current offers.",
  out_of_scope: "I’m here to help with LaBelle Dental Clinic information, dental visit preparation and appointment requests. What would you like to know about your visit?"
};

const treatmentLabels: Record<string, string> = {
  whitening: "professional whitening", implants: "dental implants", braces: "braces or aligners",
  root_canal: "root-canal treatment", extraction: "tooth extraction", wisdom_teeth: "wisdom-tooth assessment",
  crowns: "dental crowns", veneers: "veneers", fillings: "fillings", gum_disease: "gum care",
  children_dentistry: "children’s dental care", sedation: "anxiety or sedation options", cosmetic: "cosmetic dentistry",
  sensitive_teeth: "tooth sensitivity", bad_breath: "persistent bad breath", dry_mouth: "persistent dry mouth",
  bleeding_advice: "bleeding gums", pregnancy_dental: "dental care during pregnancy", teeth_grinding: "teeth grinding",
  jaw_pain: "jaw pain or clicking"
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function scorePattern(question: string, pattern: string) {
  const q = normalize(question);
  const p = normalize(pattern);
  if (!q || !p) return 0;
  if (q === p) return 100 + p.length;
  if (q.includes(p)) return 60 + p.split(" ").length * 5;
  const qWords = new Set(q.split(" "));
  const pWords = p.split(" ");
  const overlap = pWords.filter(word => word.length > 2 && qWords.has(word)).length;
  return overlap >= Math.min(2, pWords.length) ? overlap * 8 : 0;
}

export function answerDentalQuestion(question: string): { tag: string; answer: string } {
  let bestTag = "out_of_scope";
  let bestScore = 0;
  for (const intent of dentalTraining.intents) {
    for (const pattern of intent.patterns) {
      const score = scorePattern(question, pattern);
      if (score > bestScore) {
        bestScore = score;
        bestTag = intent.tag;
      }
    }
  }

  if (bestScore < 8) return { tag: "out_of_scope", answer: directAnswers["out_of_scope"]! };
  const direct = directAnswers[bestTag];
  if (direct) return { tag: bestTag, answer: direct };
  const treatment = treatmentLabels[bestTag];
  if (treatment) return {
    tag: bestTag,
    answer: "LaBelle can assess questions about " + treatment + ". Suitability, timing, availability and price depend on a dentist’s examination, so I won’t guess. Would you like to prepare an appointment request?"
  };
  return { tag: bestTag, answer: directAnswers["out_of_scope"]! };
}
