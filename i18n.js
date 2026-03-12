const translations = {
    fr: {
        "nav.about": "À propos",
        "nav.projects": "Parcours",
        "nav.contact": "Contact",
        "hero.title": "Fatma Marzouk",
        "hero.subtitle": "Étudiante en Informatique (21 ans)",
        "about.title": "À Propos de Moi",
        "about.text": "Étudiante curieuse et motivée, avec de solides bases en programmation (Java, Python, HTML/JS) et Linux. Rigoureuse et organisée, je m'investis pleinement dans mes missions.",
        "education.title": "Formations",
        "education.1": "Licence Sciences pour l'ingénieur (UBO) - 2024-2026",
        "education.2": "Bachelor Data Science (ESLSCA Paris) - 2023-2024",
        "education.3": "Baccalauréat Sciences expérimentales - 2022-2023",
        "experience.title": "Expérience Professionnelle",
        "experience.1": "Conseillère clientèle (Decathlon) - Sept 2025-Déc 2025",
        "experience.2": "Vendeuse polyvalente (Le Fournil des Provinces)",
        "experience.3": "Factrice polyvalente (La Poste) - Déc 2023-Août 2024",
        "volunteer.title": "Bénévolat",
        "volunteer.1": "Membre titulaire JCI (2020-2022)",
        "volunteer.2": "Directrice d'action (2020)",
        "volunteer.3": "Présidente JCI Zarzouna junior (2019)",
        "sport.title": "Sports",
        "sport.1": "Voile (ILCA 6)",
        "sport.2": "Escalade",
        "sport.3": "Musculation",
        "contact.title": "Travaillons ensemble !",
        "contact.button": "Me contacter"
    },
    en: {
        "nav.about": "About",
        "nav.projects": "Background",
        "nav.contact": "Contact",
        "hero.title": "Fatma Marzouk",
        "hero.subtitle": "Computer Science Student (21 y/o)",
        "about.title": "About Me",
        "about.text": "Curious and motivated student with a strong foundation in programming (Java, Python, HTML/JS) and Linux. Rigorous and organized, I fully invest myself in my assigned tasks.",
        "education.title": "Education",
        "education.1": "BSc in Engineering Sciences (UBO) - 2024-2026",
        "education.2": "Bachelor Data Science (ESLSCA Paris) - 2023-2024",
        "education.3": "High School Diploma in Experimental Sciences - 2022-2023",
        "experience.title": "Professional Experience",
        "experience.1": "Customer Advisor (Decathlon) - Sept 2025-Dec 2025",
        "experience.2": "Versatile Saleswoman (Le Fournil des Provinces)",
        "experience.3": "Versatile Postwoman (La Poste) - Dec 2023-Aug 2024",
        "volunteer.title": "Volunteering",
        "volunteer.1": "JCI Full Member (2020-2022)",
        "volunteer.2": "Action Director (2020)",
        "volunteer.3": "Junior JCI Zarzouna President (2019)",
        "sport.title": "Sports",
        "sport.1": "Sailing (ILCA 6)",
        "sport.2": "Rock Climbing",
        "sport.3": "Weightlifting",
        "contact.title": "Let's work together!",
        "contact.button": "Get in touch"
    },
    ar: {
        "nav.about": "نبذة",
        "nav.projects": "الخلفية",
        "nav.contact": "تواصل",
        "hero.title": "فاطمة المرزوق",
        "hero.subtitle": "طالبة علوم حاسوب (21 سنة)",
        "about.title": "نبذة عني",
        "about.text": "طالبة شغوفة ومتحمسة، أمتلك أساساً قوياً في البرمجة وتقنية لينكس. دقيقة ومنظمة، وأكرس نفسي بالكامل للمهام الموكلة إلي.",
        "education.title": "التعليم",
        "education.1": "إجازة في علوم الهندسة (UBO) - 2024-2026",
        "education.2": "بكالوريوس في علوم البيانات (ESLSCA باريس) - 2023-2024",
        "education.3": "بكالوريا علوم تجريبية - 2022-2023",
        "experience.title": "الخبرة المهنية",
        "experience.1": "مستشارة عملاء (Decathlon) - سبتمبر 2025-ديسمبر 2025",
        "experience.2": "بائعة متعددة المهام (Le Fournil des Provinces)",
        "experience.3": "ساعية بريد متعددة المهام (La Poste) - ديسمبر 2023-أغسطس 2024",
        "volunteer.title": "العمل التطوعي",
        "volunteer.1": "عضو دائم في الغرفة الفتية الدولية (2020-2022)",
        "volunteer.2": "مديرة أعمال (2020)",
        "volunteer.3": "رئيسة الغرفة الفتية الدولية بنزرت (2019)",
        "sport.title": "أنشطة رياضية",
        "sport.1": "الإبحار (ILCA 6)",
        "sport.2": "التسلق",
        "sport.3": "كمال الأجسام",
        "contact.title": "دعونا نعمل معاً!",
        "contact.button": "تواصل معي"
    }
};

let currentLang = 'fr'; // Default is French

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // Setting HTML dir and lang
    const isRtl = lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Notify other modules (like Three.js) that direction changed so they can adapt 3D layout
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { isRtl } }));
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial translation setup
    setLanguage(currentLang);

    // Setup language switcher behavior
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});
