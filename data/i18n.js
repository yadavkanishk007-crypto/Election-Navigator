/**
 * Internationalization Data — All UI strings in multiple languages
 * Supported: English (en), Hindi (hi), Tamil (ta), Telugu (te), Bengali (bn)
 */
export const TRANSLATIONS = Object.freeze({
  en: {
    meta: { name: "English", dir: "ltr" },
    header: { phases: "Phases", timeline: "Timeline", quiz: "Quiz" },
    hero: {
      badge: "🎓 Non-Partisan • Interactive • Educational",
      terminal: "INITIALIZING NAVIGATOR...",
      titleLine1: "Your",
      titleHighlight: "Election",
      titleLine2: "Journey Starts Here",
      subtitle: "I'm your ELECTION NAVIGATOR — a high-energy, expert guide here to demystify every step of the election process. Let's make democracy easy to understand.",
      ctaLabel: "▌ Select Knowledge Level:",
      beginner: "Beginner", beginnerDesc: "New to elections",
      intermediate: "Intermediate", intermediateDesc: "Know the basics",
      expert: "Expert", expertDesc: "Deep knowledge"
    },
    region: {
      header: "▌║ 📍 Region Configuration ║▌",
      desc: "Enter your country or region for a tailored election timeline — or skip to explore general content.",
      placeholder: "e.g., United States, India, United Kingdom...",
      submit: "Generate Timeline",
      skip: "Skip — Show General Info"
    },
    progress: {
      header: "▌║ 📈 Learning Progress ║▌",
      label: "KNOWLEDGE DETECTED:"
    },
    phases: {
      header: "▌║ 📚 System Phases ║▌",
      desc: "Click any phase to dive deep. Complete the quiz to unlock the next phase.",
      statusReady: "[ STATUS: 🟢 READY ]",
      statusLocked: "[ STATUS: 🔴 LOCKED ]",
      statusComplete: "[ STATUS: ✅ COMPLETE ]"
    },
    timeline: {
      header: "▌║ 📅 Election Timeline ║▌",
      defaultDesc: "A generalized overview of the election cycle."
    },
    quickActions: {
      label: "▌ Quick-Action Terminal",
      registration: "📋 Registration",
      timeline: "📅 Timeline",
      quiz: "🧠 Quiz",
      home: "🏠 Home"
    },
    modal: {
      quizBtn: "🧠 Check for Understanding",
      close: "Close"
    },
    quiz: {
      header: "Phase {phase} — Q{current}/{total}",
      title: "🧠 Check for Understanding",
      correct: "✅ Correct!",
      wrong: "❌ Not quite.",
      next: "Next Question →",
      seeResults: "See Results",
      resultPass: "Great job! You've mastered this phase!",
      resultFail: "Keep learning! Review the material and try again.",
      completePhase: "✅ Complete Phase {phase}",
      retry: "🔄 Retry Quiz",
      review: "Review Material",
      scoreLabel: "{score}/{total} Correct ({pct}%)"
    },
    celebration: {
      title: "Congratulations!",
      text: "You've completed all phases! You're now an Election Expert!",
      btn: "Continue Exploring"
    },
    footer: {
      tagline: "🗳️ ELECTION NAVIGATOR — Non-partisan educational tool",
      disclaimer: "This tool provides general election education. Always check your local election authority for official information."
    },
    langLabel: "🌐 Language"
  },

  hi: {
    meta: { name: "हिन्दी", dir: "ltr" },
    header: { phases: "चरण", timeline: "समयरेखा", quiz: "प्रश्नोत्तरी" },
    hero: {
      badge: "🎓 गैर-पक्षपाती • इंटरैक्टिव • शैक्षिक",
      terminal: "नेविगेटर प्रारंभ हो रहा है...",
      titleLine1: "आपकी",
      titleHighlight: "चुनाव",
      titleLine2: "यात्रा यहाँ शुरू होती है",
      subtitle: "मैं आपका चुनाव नेविगेटर हूँ — चुनाव प्रक्रिया के हर चरण को सरल बनाने के लिए। आइए लोकतंत्र को समझना आसान बनाएं।",
      ctaLabel: "▌ ज्ञान स्तर चुनें:",
      beginner: "शुरुआती", beginnerDesc: "चुनाव में नए",
      intermediate: "मध्यवर्ती", intermediateDesc: "बुनियादी जानकारी",
      expert: "विशेषज्ञ", expertDesc: "गहन ज्ञान"
    },
    region: {
      header: "▌║ 📍 क्षेत्र विन्यास ║▌",
      desc: "अनुकूलित चुनाव समयरेखा के लिए अपना देश या क्षेत्र दर्ज करें — या सामान्य सामग्री देखें।",
      placeholder: "जैसे, भारत, संयुक्त राज्य अमेरिका...",
      submit: "समयरेखा बनाएं",
      skip: "छोड़ें — सामान्य जानकारी दिखाएं"
    },
    progress: {
      header: "▌║ 📈 सीखने की प्रगति ║▌",
      label: "ज्ञान का पता चला:"
    },
    phases: {
      header: "▌║ 📚 प्रणाली चरण ║▌",
      desc: "किसी भी चरण पर क्लिक करें। अगला चरण अनलॉक करने के लिए प्रश्नोत्तरी पूरी करें।",
      statusReady: "[ स्थिति: 🟢 तैयार ]",
      statusLocked: "[ स्थिति: 🔴 लॉक ]",
      statusComplete: "[ स्थिति: ✅ पूर्ण ]"
    },
    timeline: {
      header: "▌║ 📅 चुनाव समयरेखा ║▌",
      defaultDesc: "चुनाव चक्र का सामान्य अवलोकन।"
    },
    quickActions: {
      label: "▌ त्वरित कार्य",
      registration: "📋 पंजीकरण",
      timeline: "📅 समयरेखा",
      quiz: "🧠 प्रश्नोत्तरी",
      home: "🏠 होम"
    },
    modal: { quizBtn: "🧠 समझ की जाँच", close: "बंद करें" },
    quiz: {
      header: "चरण {phase} — प्र{current}/{total}",
      title: "🧠 समझ की जाँच",
      correct: "✅ सही!",
      wrong: "❌ गलत।",
      next: "अगला प्रश्न →",
      seeResults: "परिणाम देखें",
      resultPass: "बहुत बढ़िया! आपने यह चरण पूरा किया!",
      resultFail: "सीखते रहें! सामग्री की समीक्षा करें।",
      completePhase: "✅ चरण {phase} पूर्ण करें",
      retry: "🔄 पुनः प्रयास", review: "सामग्री समीक्षा",
      scoreLabel: "{score}/{total} सही ({pct}%)"
    },
    celebration: {
      title: "बधाई हो!",
      text: "आपने सभी चरण पूरे कर लिए! अब आप चुनाव विशेषज्ञ हैं!",
      btn: "और जानें"
    },
    footer: {
      tagline: "🗳️ चुनाव नेविगेटर — गैर-पक्षपाती शैक्षिक उपकरण",
      disclaimer: "यह उपकरण सामान्य चुनाव शिक्षा प्रदान करता है। आधिकारिक जानकारी के लिए अपने स्थानीय चुनाव प्राधिकरण से जाँच करें।"
    },
    langLabel: "🌐 भाषा"
  },

  ta: {
    meta: { name: "தமிழ்", dir: "ltr" },
    header: { phases: "நிலைகள்", timeline: "காலவரிசை", quiz: "வினாடி வினா" },
    hero: {
      badge: "🎓 கட்சி சார்பற்ற • ஊடாடும் • கல்வி",
      terminal: "வழிசெலுத்தி துவக்கப்படுகிறது...",
      titleLine1: "உங்கள்",
      titleHighlight: "தேர்தல்",
      titleLine2: "பயணம் இங்கே தொடங்குகிறது",
      subtitle: "நான் உங்கள் தேர்தல் வழிசெலுத்தி — தேர்தல் செயல்முறையின் ஒவ்வொரு படியையும் எளிதாக்க உதவுகிறேன்.",
      ctaLabel: "▌ அறிவு நிலையை தேர்வு செய்யவும்:",
      beginner: "தொடக்கநிலை", beginnerDesc: "தேர்தலில் புதியவர்",
      intermediate: "இடைநிலை", intermediateDesc: "அடிப்படை அறிவு",
      expert: "நிபுணர்", expertDesc: "ஆழமான அறிவு"
    },
    region: {
      header: "▌║ 📍 பிராந்திய அமைப்பு ║▌",
      desc: "தனிப்பயன் தேர்தல் காலவரிசைக்கு உங்கள் நாடு அல்லது பிராந்தியத்தை உள்ளிடவும்.",
      placeholder: "எ.கா., இந்தியா, அமெரிக்கா...",
      submit: "காலவரிசை உருவாக்கு",
      skip: "தவிர் — பொது தகவல் காட்டு"
    },
    progress: { header: "▌║ 📈 கற்றல் முன்னேற்றம் ║▌", label: "அறிவு கண்டறியப்பட்டது:" },
    phases: {
      header: "▌║ 📚 அமைப்பு நிலைகள் ║▌",
      desc: "எந்த நிலையையும் கிளிக் செய்யவும். அடுத்ததை திறக்க வினாடி வினா முடிக்கவும்.",
      statusReady: "[ நிலை: 🟢 தயார் ]",
      statusLocked: "[ நிலை: 🔴 பூட்டப்பட்டது ]",
      statusComplete: "[ நிலை: ✅ முடிந்தது ]"
    },
    timeline: { header: "▌║ 📅 தேர்தல் காலவரிசை ║▌", defaultDesc: "தேர்தல் சுழற்சியின் பொது கண்ணோட்டம்." },
    quickActions: { label: "▌ விரைவு செயல்கள்", registration: "📋 பதிவு", timeline: "📅 காலவரிசை", quiz: "🧠 வினாடி வினா", home: "🏠 முகப்பு" },
    modal: { quizBtn: "🧠 புரிதல் சோதனை", close: "மூடு" },
    quiz: {
      header: "நிலை {phase} — கே{current}/{total}", title: "🧠 புரிதல் சோதனை",
      correct: "✅ சரி!", wrong: "❌ தவறு.",
      next: "அடுத்த கேள்வி →", seeResults: "முடிவுகள் பார்",
      resultPass: "மிகச்சிறப்பு! இந்த நிலையை நீங்கள் கற்றுக்கொண்டீர்கள்!",
      resultFail: "தொடர்ந்து கற்கவும்! பொருளை மீண்டும் படிக்கவும்.",
      completePhase: "✅ நிலை {phase} முடிக்கவும்",
      retry: "🔄 மீண்டும் முயற்சி", review: "பொருள் மீளாய்வு",
      scoreLabel: "{score}/{total} சரி ({pct}%)"
    },
    celebration: { title: "வாழ்த்துக்கள்!", text: "அனைத்து நிலைகளையும் முடித்தீர்கள்! நீங்கள் தேர்தல் நிபுணர்!", btn: "மேலும் ஆராயுங்கள்" },
    footer: { tagline: "🗳️ தேர்தல் வழிசெலுத்தி — கட்சி சார்பற்ற கல்வி கருவி", disclaimer: "இது பொது தேர்தல் கல்வி வழங்குகிறது. அதிகாரப்பூர்வ தகவலுக்கு உள்ளூர் தேர்தல் ஆணையத்தைச் சரிபார்க்கவும்." },
    langLabel: "🌐 மொழி"
  },

  te: {
    meta: { name: "తెలుగు", dir: "ltr" },
    header: { phases: "దశలు", timeline: "కాలక్రమం", quiz: "క్విజ్" },
    hero: {
      badge: "🎓 పక్షపాతం లేని • ఇంటరాక్టివ్ • విద్యాసంబంధ",
      terminal: "నావిగేటర్ ప్రారంభమవుతోంది...",
      titleLine1: "మీ",
      titleHighlight: "ఎన్నికల",
      titleLine2: "ప్రయాణం ఇక్కడ మొదలవుతుంది",
      subtitle: "నేను మీ ఎన్నికల నావిగేటర్ — ఎన్నికల ప్రక్రియలోని ప్రతి అడుగును అర్థం చేసుకోవడానికి సహాయం చేస్తాను.",
      ctaLabel: "▌ జ్ఞాన స్థాయిని ఎంచుకోండి:",
      beginner: "ప్రారంభ", beginnerDesc: "ఎన్నికలకు కొత్త",
      intermediate: "మధ్యస్థ", intermediateDesc: "ప్రాథమిక అవగాహన",
      expert: "నిపుణుడు", expertDesc: "లోతైన జ్ఞానం"
    },
    region: { header: "▌║ 📍 ప్రాంత ఆకృతీకరణ ║▌", desc: "మీ దేశం లేదా ప్రాంతాన్ని నమోదు చేయండి.", placeholder: "ఉదా., భారతదేశం...", submit: "కాలక్రమం సృష్టించు", skip: "దాటవేయి" },
    progress: { header: "▌║ 📈 అభ్యాస పురోగతి ║▌", label: "జ్ఞానం గుర్తించబడింది:" },
    phases: { header: "▌║ 📚 వ్యవస్థ దశలు ║▌", desc: "ఏదైనా దశపై క్లిక్ చేయండి. తదుపరిది అన్‌లాక్ చేయడానికి క్విజ్ పూర్తి చేయండి.", statusReady: "[ స్థితి: 🟢 సిద్ధం ]", statusLocked: "[ స్థితి: 🔴 లాక్ ]", statusComplete: "[ స్థితి: ✅ పూర్తి ]" },
    timeline: { header: "▌║ 📅 ఎన్నికల కాలక్రమం ║▌", defaultDesc: "ఎన్నికల చక్రం యొక్క సాధారణ అవలోకనం." },
    quickActions: { label: "▌ శీఘ్ర చర్యలు", registration: "📋 నమోదు", timeline: "📅 కాలక్రమం", quiz: "🧠 క్విజ్", home: "🏠 హోమ్" },
    modal: { quizBtn: "🧠 అవగాహన పరీక్ష", close: "మూసివేయి" },
    quiz: { header: "దశ {phase} — ప్ర{current}/{total}", title: "🧠 అవగాహన పరీక్ష", correct: "✅ సరైనది!", wrong: "❌ తప్పు.", next: "తదుపరి ప్రశ్న →", seeResults: "ఫలితాలు చూడండి", resultPass: "అద్భుతం! ఈ దశను మీరు నేర్చుకున్నారు!", resultFail: "నేర్చుకుంటూ ఉండండి!", completePhase: "✅ దశ {phase} పూర్తి చేయండి", retry: "🔄 మళ్ళీ ప్రయత్నించు", review: "సమీక్ష", scoreLabel: "{score}/{total} సరైనవి ({pct}%)" },
    celebration: { title: "అభినందనలు!", text: "అన్ని దశలు పూర్తయ్యాయి! మీరు ఎన్నికల నిపుణుడు!", btn: "మరింత అన్వేషించండి" },
    footer: { tagline: "🗳️ ఎన్నికల నావిగేటర్ — పక్షపాతం లేని విద్యా సాధనం", disclaimer: "ఇది సాధారణ ఎన్నికల విద్యను అందిస్తుంది." },
    langLabel: "🌐 భాష"
  },

  bn: {
    meta: { name: "বাংলা", dir: "ltr" },
    header: { phases: "ধাপ", timeline: "সময়রেখা", quiz: "কুইজ" },
    hero: {
      badge: "🎓 নিরপেক্ষ • ইন্টারেক্টিভ • শিক্ষামূলক",
      terminal: "ন্যাভিগেটর শুরু হচ্ছে...",
      titleLine1: "আপনার",
      titleHighlight: "নির্বাচন",
      titleLine2: "যাত্রা এখানে শুরু",
      subtitle: "আমি আপনার নির্বাচন ন্যাভিগেটর — নির্বাচন প্রক্রিয়ার প্রতিটি ধাপ সহজ করতে সাহায্য করি।",
      ctaLabel: "▌ জ্ঞানের স্তর নির্বাচন করুন:",
      beginner: "প্রাথমিক", beginnerDesc: "নির্বাচনে নতুন",
      intermediate: "মধ্যবর্তী", intermediateDesc: "মৌলিক জ্ঞান",
      expert: "বিশেষজ্ঞ", expertDesc: "গভীর জ্ঞান"
    },
    region: { header: "▌║ 📍 অঞ্চল কনফিগারেশন ║▌", desc: "আপনার দেশ বা অঞ্চল লিখুন।", placeholder: "যেমন, ভারত...", submit: "সময়রেখা তৈরি করুন", skip: "এড়িয়ে যান" },
    progress: { header: "▌║ 📈 শেখার অগ্রগতি ║▌", label: "জ্ঞান শনাক্ত:" },
    phases: { header: "▌║ 📚 সিস্টেম ধাপ ║▌", desc: "যেকোনো ধাপে ক্লিক করুন। পরবর্তীটি আনলক করতে কুইজ সম্পন্ন করুন।", statusReady: "[ অবস্থা: 🟢 প্রস্তুত ]", statusLocked: "[ অবস্থা: 🔴 লক ]", statusComplete: "[ অবস্থা: ✅ সম্পন্ন ]" },
    timeline: { header: "▌║ 📅 নির্বাচন সময়রেখা ║▌", defaultDesc: "নির্বাচন চক্রের সাধারণ পর্যালোচনা।" },
    quickActions: { label: "▌ দ্রুত কার্য", registration: "📋 নিবন্ধন", timeline: "📅 সময়রেখা", quiz: "🧠 কুইজ", home: "🏠 হোম" },
    modal: { quizBtn: "🧠 বোধগম্যতা পরীক্ষা", close: "বন্ধ" },
    quiz: { header: "ধাপ {phase} — প্র{current}/{total}", title: "🧠 বোধগম্যতা পরীক্ষা", correct: "✅ সঠিক!", wrong: "❌ ভুল।", next: "পরবর্তী প্রশ্ন →", seeResults: "ফলাফল দেখুন", resultPass: "দারুণ! এই ধাপ আয়ত্ত করেছেন!", resultFail: "শিখতে থাকুন!", completePhase: "✅ ধাপ {phase} সম্পন্ন করুন", retry: "🔄 পুনরায় চেষ্টা", review: "পর্যালোচনা", scoreLabel: "{score}/{total} সঠিক ({pct}%)" },
    celebration: { title: "অভিনন্দন!", text: "সব ধাপ সম্পন্ন! আপনি নির্বাচন বিশেষজ্ঞ!", btn: "আরও অন্বেষণ করুন" },
    footer: { tagline: "🗳️ নির্বাচন ন্যাভিগেটর — নিরপেক্ষ শিক্ষা সরঞ্জাম", disclaimer: "এটি সাধারণ নির্বাচন শিক্ষা প্রদান করে।" },
    langLabel: "🌐 ভাষা"
  }
});

export const SUPPORTED_LANGUAGES = Object.freeze(
  Object.entries(TRANSLATIONS).map(([code, t]) => ({ code, name: t.meta.name }))
);

export const DEFAULT_LANGUAGE = 'en';
