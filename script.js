/**
 * ECIT - شركة خبراء تقنية المعلومات
 * Complete Bilingual Engine (AR/EN) & Smart AI Assistant Chatbot
 */

let currentLang = localStorage.getItem('ecit_lang') || 'ar';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initProductsSystem();
  initProjectsModal();
  initServicesAccordion();
  initContactForm();
  initConsultationModal();
  initChatbot();
  initBackToTop();
  initLanguageEngine();
  initRiyadhClock();
});

/* ==================== 1. NAVBAR & SCROLL ==================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Light navbar: only toggle a soft elevated state on scroll (never dark)
    navbar.classList.toggle('nav-scrolled', window.scrollY > 30);
  }, { passive: true });

  if (mobileMenuBtn && mobileDrawer) {
    const icon = mobileMenuBtn.querySelector('i');

    function closeDrawer() {
      mobileDrawer.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      if (icon) icon.className = 'fa-solid fa-bars-staggered text-base sm:text-lg';
    }

    function openDrawer() {
      const navHeight = navbar.offsetHeight || 64;
      mobileDrawer.style.top = navHeight + 'px';
      mobileDrawer.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      if (icon) icon.className = 'fa-solid fa-xmark text-lg sm:text-xl text-cyan-400';
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileDrawer.classList.contains('hidden');
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileDrawer.classList.contains('hidden')) {
          closeDrawer();
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && !mobileDrawer.classList.contains('hidden')) {
        closeDrawer();
      }
    });
  }
}

/* ==================== 2. STATS COUNTER ANIMATION ==================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const duration = 1800;
          const step = Math.ceil(target / (duration / 25));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==================== 3. BILINGUAL DICTIONARY & ENGINE ==================== */
const i18nDict = {
  ar: {
    hero_fb2_sub: "ربط مع المستثمرين",
    hero_fb2_title: "غرفة الصفقات",
    hero_fb1_sub: "واجهة الأعمال، الرياض",
    hero_fb1_title: "ECIT Hub",
    hero_m3: "شريك نجاح",
    hero_m2: "خدمة تقنية",
    hero_m1: "منصة جاهزة",
    hero_j4: "الإطلاق والاستثمار",
    hero_j3: "التطوير والتقنية",
    hero_j2: "الاحتضان والتأسيس",
    hero_j1: "الفكرة ودراسة الجدوى",
    hero_panel_live: "مباشر",
    hero_panel_title: "رحلة مشروعك معنا",
        nav_tracks: "مسارات الأعمال",
    hero_badge: "منظومة تقنية واستثمارية متكاملة • رؤية 2030",
    tracks_tag: "مسارات المنظومة والتوجهات الاستراتيجية",
    tracks_title: "منظومة متكاملة لرواد الأعمال، المستثمرين، والمؤسسات",
    tracks_sub: "نقدم حلولاً استراتيجية متكاملة تتجاوز البرمجيات التقليدية لتغطي دورة حياة المشروع الاستثماري والتقني بالكامل",
    track_1_title: "حاضنة ومسرّعة أعمال تقنية (ECIT Hub)",
    track_1_desc: "رعاية المشاريع الريادية من الفكرة إلى السوق، وتوفير باقات الاحتضان وبناء نموذج العمل والـ MVP.",
    track_2_title: "غرفة الصفقات وجولات الاستثمار",
    track_2_desc: "ربط المشاريع الريادية بشبكة المستثمرين، دراسة الجاهزية الاستثمارية، وتوقيع اتفاقيات السرية (NDA) والتمويل.",
    track_3_title: "الاستشارات ودراسات الجدوى ومحفظة الساعات",
    track_3_desc: "دراسات جدوى تقنية ونماذج مالية معتمدة، مع محفظة ساعات استشارية مرنة مع مستشارين متخصصين.",
    track_4_title: "مساحات العمل والمكاتب وقاعات الاجتماعات",
    track_4_desc: "مكاتب مجهزة وقاعات اجتماعات ذكية ومساحات عمل مشتركة لدعم رواد الأعمال في واجهة الأعمال بالرياض.",
    track_5_title: "بناء وإطلاق المنصات المؤسسية (18 منصة)",
    track_5_desc: "18 منصة وتطبيقاً برمجياً جاهزاً للتخصيص والإطلاق في قطاعات التجارة، الصحة، التعليم، والخدمات اللوجستية.",
    track_6_title: "التحول الرقمي وحلول المؤسسات المتقدمة",
    track_6_desc: "بوابات الدفع الإلكتروني المعتمدة، تكامل الأنظمة (APIs)، الأمن السيبراني، الذكاء الاصطناعي، والتحكيم الفني.",
    journey_tag: "منهجية العمل والاحتضان",
    journey_title: "رحلة مشروعك معنا في 4 مراحل واضحة",
    journey_sub: "نبني مشروعك معك خطوة بخطوة من الفكرة حتى النزول للسوق وتحقيق النمو",
    step_1_title: "1. مرحلة الفكرة والدراسة",
    step_1_desc: "جلسات استشارية، دراسات جدوى تقنية ومالية، وهيكلة نموذج العمل وقيمة المشروع السوقية.",
    step_2_title: "2. مرحلة التأسيس والاحتضان",
    step_2_desc: "الانضمام لحاضنة ECIT Hub، توفير المساحات المكتبية، استخراج التراخيص، وإعداد العقود والاتفاقيات.",
    step_3_title: "3. مرحلة التطوير والتقنية",
    step_3_desc: "تصميم تجربة المستخدم UI/UX، برمجة المنصة وتطبيقات الجوال، ربط بوابات الدفع، وإعداد البنية السحابية.",
    step_4_title: "4. مرحلة الانطلاق والاستثمار",
    step_4_desc: "إطلاق المشروع رسمياً، الإدراج في غرفة الصفقات وعرض الفرصة على شبكة المستثمرين لتحصيل التمويل.",
    track_cta_btn: "اكتشف المزيد عن المسار",
    brand_title: "شركة خبراء تقنية المعلومات",
    brand_sub: "ECIT — الحلول التقنية الذكية",
    v2030_pill: "رؤية 2030",
    nav_home: "الرئيسية",
    nav_about: "عن الشركة",
    nav_services: "خدماتنا",
    nav_products: "منتجاتنا",
    nav_projects: "مشاريعنا",
    nav_partners: "شركاؤنا",
    nav_contact: "تواصل معنا",
    cta_consultation: "طلب استشارة تقنية",
    cta_consultation_short: "استشارة تقنية",
    hero_v2030_badge: "ملتزمون بتمكين التحول الرقمي وفق مستهدفات رؤية السعودية 2030",
    hero_title: "حلول تقنية ذكية<br><span class=\"text-gradient-blue\">لنمو أعمالك واستثماراتك</span>",
    hero_tagline: "<strong class=\"text-blue-600\">ECIT</strong> و <strong class=\"text-indigo-600\">ECIT Hub</strong> — التقنية والاحتضان والاستثمار في مكان واحد",
    hero_desc: "من دراسة الفكرة وتأسيس المشروع، إلى بناء المنصات الرقمية والوصول إلى المستثمرين — نرافقك في كل مرحلة.",
    hero_btn1_title: "اطلب استشارة",
    hero_btn1_sub: "جلسة استشارية متخصصة مع خبرائنا",
    hero_btn2_title: "استكشف مساراتنا",
    hero_btn2_sub: "الحاضنة، غرفة الصفقات، و18 منصة جاهزة",
    hero_btn3_title: "بروفايل الشركة",
    hero_btn3_sub: "الملف التعريفي الرسمي وسابقة الأعمال",
    trust_1: "حاضنة أعمال معتمدة",
    trust_2: "+18 منصة جاهزة",
    trust_3: "شبكة مستثمرين",
    stat_1_title: "منتج ومنصة رقمية",
    stat_1_sub: "جاهزة للتخصيص والإطلاق السريع",
    stat_2_title: "خدمة تقنية متكاملة",
    stat_2_sub: "من الفكرة إلى البنية السحابية",
    stat_3_title: "شريك وعميل استراتيجي",
    stat_3_sub: "في مختلف قطاعات المملكة",
    stat_4_title: "توافق مع معايير 2030",
    stat_4_sub: "جودة، أمن سيبراني، وموثوقية",
    about_tag: "عن الشركة ورؤيتنا",
    about_title: "نبني مستقبلاً برمجياً <span class=\"text-gradient-cyan\">يرتقي بطموحات رواد الأعمال</span>",
    about_desc: "نحن شركة خبراء تقنية المعلومات، شريكك التقني الموثوق لتصميم وتطوير الحلول البرمجية التي تمنح أعمالك ميزة تنافسية استثنائية.",
    ceo_tag: "كلمة الرئيس التنفيذي | شركة خبراء تقنية المعلومات",
    ceo_quote: "\"شركة خبراء تقنية المعلومات حريصون على أن نحقق التزامنا الدائم بالتوافق مع رؤية المملكة العربية السعودية 2030 من خلال تقديم وتسليم مشاريع عالية الكفاءة والجودة، وتوفير الدعم لفرق العمل المُتحفِّزة والمرنة، ذات التركيز الكبير. علاوة على أننا نُقدِّر أهمية علاقاتنا، وملتزمون في التعامل بنزاهة وموضوعية مع جميع العملاء والمُورِّدين والشركاء. باختصار، نحن نساعد المنظمات العصرية على جعل خدماتها لتقنية المعلومات تستجيب لمتطلبات قطاع أعمالها.\"",
    ceo_download_btn: "تحميل البروفايل التعريفي للشركة (PDF)",
    ceo_contact_btn: "تواصل مباشرة مع الإدارة",
    leadership_title: "القيادة والالتزام المؤسسي",
    leadership_desc: "فريق تنفيذي متخصص يقود التحول الرقمي بأعلى معايير الحوكمة",
    mission_tag: "الرسالة والمهمة",
    mission_title: "رسالتنا ومهمتنا",
    mission_desc: "تطوير حلول برمجية مبتكرة بجودة عالية طبقاً للمواصفات العالمية في جودة البرمجيات وأمن المعلومات. بمجرد أن تكون عميلاً لدينا، أصبحت جزءاً من عائلة خبراء تقنية المعلومات. مهمتنا ظهور فكرتك للعالم بصورة احترافية، سهلة الاستخدام، وقادرة على التميز وسط المنافسين من خلال استخدام البرامج المتطورة.",
    vision_tag: "الطموح المستقبلي",
    vision_title: "رؤيتنا",
    vision_desc: "أن تكون شركة خبراء تقنية المعلومات (ECIT) الشريك الأمثل للشركات والمؤسسات ورواد الأعمال محلياً وعالمياً، من خلال ابتكار حلول برمجية تصنع فارقاً جوهرياً ومستداماً لشركائنا ولعملائهم على حدٍ سواء.",
    values_title: "قيمنا الجوهرية التي تقود عملنا",
    values_sub: "ركائز نلتزم بها في كل سطر برمجي وكل مشروع نطلقه",
    val_quality_title: "الجودة الفائقة",
    val_quality_desc: "حلول برمجية سلسة وفعالة تلتزم بأعلى معايير الجودة وأمن المعلومات والكفاءة التشغيلية.",
    val_innov_title: "الابتكار والتجدد",
    val_innov_desc: "نتجاوز الحدود النمطية ونبتكر حلولاً رقمية جديدة وفريدة تفوق توقعات السوق والعملاء.",
    val_focus_title: "التركيز على العميل",
    val_focus_desc: "نضع احتياجات العميل في المقام الأول لضمان رضاه التام ونجاح وازدهار أعماله على المدى الطويل.",
    method_tag: "منهجية العمل المتطورة",
    method_title: "كيف نضمن نجاح وتميز مشروعك البرمجي؟",
    method_sub: "نضمن أن يمر العمل بمراحل هندسية منظمة ومدروسة بعناية لضمان أعلى مستويات الأداء ورضا العميل التام.",
    method_1_title: "تحليل",
    method_1_desc: "نقوم بتحليل دقيق لاحتياجات العملاء وأهدافهم قبل البدء في تطوير المواقع والتطبيقات، لضمان حلول برمجية متوافقة تماماً مع رؤيتهم الاستثمارية والتشغيلية.",
    method_2_title: "تصميم",
    method_2_desc: "نقدم تصميماً احترافياً وجذاباً لواجهات وتجربة المستخدم (UI/UX) يعكس هوية علامتك التجارية بشكل مبتكر، عصري، وسهل الاستخدام على كافة الشاشات.",
    method_3_title: "تحسين الموقع",
    method_3_desc: "نقدم تحسيناً شاملاً لأداء الموقع والأمان والسرعة وقواعد البيانات وتجربة التصفح، لتوفير تجربة أسرع وأسهل وأكثر أماناً وحماية من أي ثغرات.",
    cap_tag: "القدرات والحلول البرمجية",
    cap_title: "نقدم لك كافة الخدمات البرمجية في مكان واحد",
    cap_sub: "حلول تقنية ذكية متكاملة تغطي كافة متطلبات التحول الرقمي للشركات والمؤسسات",
    cap_1_title: "أنظمة فواتير",
    cap_1_sub: "متوافقة مع اشتراطات هيئة الزكاة والضريبة والجمارك",
    cap_2_title: "تسويق رقمي",
    cap_2_sub: "حلول برمجية ذكية لإدارة الحملات وتتبع التحويلات",
    cap_3_title: "متاجر إلكترونية",
    cap_3_sub: "منصات تجارة متكاملة مع بوابات الدفع والشحن",
    cap_4_title: "الأمن السيبراني",
    cap_4_sub: "حماية البيانات والأنظمة وفق أعلى المعايير الدولية",
    cap_5_title: "أنظمة CRM",
    cap_5_sub: "إدارة علاقات العملاء ومتابعة المبيعات والفرص",
    cap_6_title: "أنظمة ERP",
    cap_6_sub: "تخطيط الموارد المؤسسية والمالية والإدارية",
    cap_7_title: "تطوير التطبيقات",
    cap_7_sub: "تطبيقات هواتف iOS وأندرويد بأداء فائق وتصميم عصري",
    cap_8_title: "البرمجيات السحابية",
    cap_8_sub: "حلول SaaS وبنية تحتية سحابية مرنة وقابلة للتوسع",
    serv_tag: "خدماتنا الشاملة",
    serv_title: "12 خدمة برمجية وتقنية متخصصة",
    serv_sub: "نقدم باقة متكاملة من الخدمات الرقمية لتلبية كافة احتياجات قطاعات الأعمال، والشركات الناشئة، والجهات الحكومية والخاصة.",
    prod_tag: "معرض المنتجات والأنظمة الجاهزة",
    prod_title: "18 منتجاً ونظاماً برمجياً متقدماً",
    prod_sub: "أنظمة وتطبيقات متكاملة تم تطويرها خصيصاً لتلبية احتياجات مختلف الأسواق والقطاعات. تصفح المنصات واطلب نسختك أو عرضاً توضيحياً مخصصاً.",
    prod_search_ph: "ابحث باسم المنتج أو التخصص...",
    prod_filter_all: "الكل (18)",
    prod_filter_mobile: "تطبيقات الهواتف",
    prod_filter_platforms: "الأنظمة المؤسسية",
    prod_filter_ecommerce: "المتاجر والوساطة",
    prod_filter_special: "حلول متخصصة",
    proj_tag: "سابقة الأعمال المعتمدة",
    proj_title: "مشاريع نفخر بتنفيذها وإدارتها",
    proj_sub: "قصص نجاح واقعية ساهمنا من خلالها في تحويل أفكار شركائنا إلى منصات عملاقة تخدم آلاف المستخدمين في المملكة والمنطقة.",
    part_tag: "شركاء المسيرة والنجاح",
    part_title: "نعتز بثقة كبرى المؤسسات والجهات",
    part_sub: "شراكات استراتيجية ناجحة في القطاعين الحكومي والخاص بالمملكة العربية السعودية",
    contact_tag: "تواصل واستشارة فورية",
    contact_title: "أرسل إلينا رسالتك وسنعاود الاتصال بك لتقديم الخدمة المناسبة",
    contact_sub: "فريقنا الهندسي والاستشاري جاهز لمناقشة متطلبات مشروعك، تقديم عروض الأسعار، ودراسة الجدوى الفنية بدقة واحترافية.",
    form_name_lbl: "الاسم الكريم *",
    form_name_ph: "أدخل اسمك أو اسم المنظمة",
    form_email_lbl: "البريد الإلكتروني *",
    form_email_ph: "example@domain.com",
    form_addr_lbl: "العنوان / المدينة / الدولة",
    form_addr_ph: "الرياض، المملكة العربية السعودية",
    form_msg_lbl: "تفاصيل الاستشارة أو المشروع *",
    form_msg_ph: "اشرح لنا فكرة مشروعك، الخدمة المطلوبة، أو الأنظمة التي ترغب في بنائها...",
    form_submit: "إرسال طلب الاستشارة التقنية",
    loc_title: "الموقع والمقر الرئيسي",
    loc_desc: "واجهة الأعمال، طريق الملك فهد، مطار الملك خالد الدولي، الرياض، المملكة العربية السعودية",
    email_title: "البريد الإلكتروني المباشر",
    phone_title: "الهاتف وخدمة العملاء",
    phone_wa_cta: "محادثة فورية عبر واتساب",
    footer_desc: "خبراء تقنية المعلومات نلتزم برؤية السعودية 2030 من خلال تنفيذ مشاريع عالية الجودة، ودعم فرق العمل المرنة، وتعزيز علاقاتنا مع العملاء والشركاء بنزاهة وموضوعية. نحن نمكّن المنظمات العصرية من تطوير خدمات تقنية المعلومات لتلبية احتياجات أعمالها.",
    footer_quick: "روابط سريعة",
    footer_services: "أبرز خدماتنا",
    footer_rights: "كل الحقوق محفوظة © 2026 ECIT | شركة خبراء تقنية المعلومات",
    footer_pdf_link: "ملف الشركة (PDF)",
    chatbot_title: "مساعد ECIT الذكي",
    chatbot_sub: "متصل الآن لخدمتك 24/7",
    chatbot_welcome: "أهلاً بك في شركة خبراء تقنية المعلومات (ECIT)! 👋 كيف يمكنني مساعدتك اليوم بخصوص خدماتنا أو منتجاتنا البرمجية؟",
    lang_switch_label: "اللغة / Language",
    drawer_home: "الرئيسية",
    drawer_about: "عن الشركة والرؤية",
    drawer_services: "خدماتنا البرمجية",
    drawer_products: "منتجاتنا الجاهزة",
    drawer_projects: "أبرز مشاريعنا المنفذة",
    drawer_partners: "شركاء النجاح",
    drawer_contact: "تواصل معنا وحجز استشارة",
    drawer_pdf: "تحميل الملف التعريفي للشركة (PDF)",
    drawer_wa: "محادثة واتساب: 966501252878+",
    footer_sub1: "حلول الدفع الإلكتروني وبوابات الدفع",
    footer_sub2: "تطوير الأنظمة والبرمجيات حسب الطلب",
    footer_sub3: "حلول الأتمتة والتحول الرقمي",
    footer_sub4: "تصميم وتطوير المواقع والتطبيقات الذكية",
    footer_sub5: "خدمات الربط والتكامل مع الأنظمة (API)",
    footer_sub6: "الأمن السيبراني والذكاء الاصطناعي",
    uptime_lbl: "نسبة التوافر",
    latency_lbl: "سرعة الاستجابة",
    cloud_card_title: "بنية سحابية وحلول متكاملة",
    cloud_card_sub: "+18 نظام نشط",
    sec_badge: "حماية سيبرانية مشفرة 256-bit",
    sec_link: "استعراض كافة المنصات",
    details_close_lbl: "إغلاق",
    chat_tooltip: "مساعد ECIT الذكي",
    chatbot_input_ph: "اكتب استفسارك هنا..."
  },
  en: {
    hero_fb2_sub: "Investor matchmaking",
    hero_fb2_title: "Deal Room",
    hero_fb1_sub: "Business Gate, Riyadh",
    hero_fb1_title: "ECIT Hub",
    hero_m3: "Partners",
    hero_m2: "Tech Services",
    hero_m1: "Ready Platforms",
    hero_j4: "Launch & Funding",
    hero_j3: "Engineering & Build",
    hero_j2: "Incubation & Setup",
    hero_j1: "Idea & Feasibility",
    hero_panel_live: "Live",
    hero_panel_title: "Your Venture Journey",
        nav_tracks: "Tracks",
    hero_badge: "Integrated Tech & Investment Ecosystem • Vision 2030",
    tracks_tag: "Strategic Ecosystem Tracks",
    tracks_title: "Integrated Ecosystem for Founders, Investors & Enterprises",
    tracks_sub: "Delivering holistic strategic capabilities beyond conventional development across the complete venture & tech lifecycle",
    track_1_title: "ECIT Hub Incubator & Accelerator",
    track_1_desc: "Nurturing early-stage ventures from ideation to launch with tailored incubation packages, business modeling, and MVP build.",
    track_2_title: "Deal Pipeline & Investor Room",
    track_2_desc: "Connecting high-potential startups with investor networks, readiness assessments, NDAs, and fundraising rounds.",
    track_3_title: "Advisory, Feasibility & Hours Wallet",
    track_3_desc: "Certified technical & financial feasibility studies with flexible advisory hours packages led by industry experts.",
    track_4_title: "Offices, Workspaces & Meeting Rooms",
    track_4_desc: "Fully equipped private offices, smart boardrooms, and collaborative spaces in Riyadh Business Gate.",
    track_5_title: "Venture Building & 18 Ready Platforms",
    track_5_desc: "18 enterprise-grade turnkey platforms ready for rapid customization across commerce, health, edtech, and logistics.",
    track_6_title: "Enterprise Digital Transformation",
    track_6_desc: "Certified payment gateways (Mada/Apple Pay), system integration (APIs), cybersecurity, AI, and code arbitration.",
    journey_tag: "The Venture Incubation Journey",
    journey_title: "Your Venture Journey in 4 Structured Stages",
    journey_sub: "We build your venture step-by-step from raw idea to market scale and investor readiness",
    step_1_title: "1. Ideation & Feasibility",
    step_1_desc: "Advisory workshops, technical and market feasibility studies, and business model canvas structuring.",
    step_2_title: "2. Incubation & Setup",
    step_2_desc: "Onboarding to ECIT Hub incubator, office allocation, regulatory licensing, and corporate agreements.",
    step_3_title: "3. Engineering & Build",
    step_3_desc: "UI/UX design, native mobile & platform development, payment gateway integration, and cloud DevOps.",
    step_4_title: "4. Launch & Fundraising",
    step_4_desc: "Official public rollout, deal room investor syndication, and growth-stage capital fundraising.",
    track_cta_btn: "Explore Track Details",
    brand_title: "Information Technology Experts Co.",
    brand_sub: "ECIT — Smart Enterprise Solutions",
    v2030_pill: "Vision 2030",
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_products: "Products",
    nav_projects: "Projects",
    nav_partners: "Partners",
    nav_contact: "Contact",
    cta_consultation: "Get Consultation",
    cta_consultation_short: "Consultation",
    hero_v2030_badge: "Committed to Enabling Digital Transformation under Saudi Vision 2030",
    hero_title: "Smart Technology<br><span class=\"text-gradient-blue\">to Grow Your Business</span>",
    hero_tagline: "<strong class=\"text-blue-600\">ECIT</strong> & <strong class=\"text-indigo-600\">ECIT Hub</strong> — technology, incubation and investment in one place",
    hero_desc: "From validating your idea and setting up your company, to building digital platforms and reaching investors — we support you at every stage.",
    hero_btn1_title: "Get Consultation",
    hero_btn1_sub: "Direct strategic session with our tech leads",
    hero_btn2_title: "Explore Our Tracks",
    hero_btn2_sub: "Fully customizable platforms and mobile apps ready to launch",
    hero_btn3_title: "Company Profile",
    hero_btn3_sub: "Official portfolio and credential brief",
    trust_1: "Certified Incubator",
    trust_2: "18+ Ready Platforms",
    trust_3: "Investor Network",
    stat_1_title: "Digital Products & Platforms",
    stat_1_sub: "Ready for Rapid Deployment",
    stat_2_title: "Specialized Tech Services",
    stat_2_sub: "From Ideation to Cloud Infrastructure",
    stat_3_title: "Strategic Clients & Partners",
    stat_3_sub: "Across Leading Saudi Sectors",
    stat_4_title: "Vision 2030 Alignment",
    stat_4_sub: "Quality, Cybersecurity & Reliability",
    about_tag: "About Us & Vision",
    about_title: "Engineering a Software Future <span class=\"text-gradient-cyan\">Elevating Entrepreneurs</span>",
    about_desc: "We are Information Technology Experts Co. (ECIT), your trusted engineering partner to architect and scale bespoke software solutions that deliver an unfair competitive advantage.",
    ceo_tag: "CEO Statement | Information Technology Experts Co.",
    ceo_quote: "\"At Information Technology Experts Company (ECIT), we are resolutely committed to aligning with the Saudi Vision 2030 by delivering high-efficiency, superior-quality software projects. We support highly motivated, agile, and focused engineering teams. Furthermore, we value our relationships and deal with integrity and objectivity across all clients, suppliers, and partners. In brief, we empower modern enterprises to align their digital capabilities with market demands.\"",
    ceo_download_btn: "Download Company Profile (PDF)",
    ceo_contact_btn: "Contact Leadership Directly",
    leadership_title: "Leadership & Corporate Commitment",
    leadership_desc: "Specialized executive leadership driving digital transformation with strict governance",
    mission_tag: "Our Mission",
    mission_title: "Our Mission & Purpose",
    mission_desc: "To engineer innovative, high-caliber software solutions adhering to international standards in software quality and cyber protection. Once you partner with us, you become a valued member of the ECIT family. Our mission is to propel your vision into the global market with unmatched distinction and user experience.",
    vision_tag: "Future Vision",
    vision_title: "Our Vision",
    vision_desc: "To be the premier digital transformation and software partner for enterprises and visionaries globally, creating tangible and sustainable value for our partners and their customers alike.",
    values_title: "Our Guiding Core Values",
    values_sub: "Foundational pillars embedded in every line of code we ship",
    val_quality_title: "Supreme Quality",
    val_quality_desc: "Seamless, high-efficiency software adhering to strict quality benchmarks and security standards.",
    val_innov_title: "Pioneering Innovation",
    val_innov_desc: "Breaking past conventional boundaries to architect unique digital products that surpass market expectations.",
    val_focus_title: "Customer-Centric Focus",
    val_focus_desc: "Placing client goals at the forefront to guarantee lasting business success and exponential growth.",
    method_tag: "Advanced Engineering Workflow",
    method_title: "How Do We Guarantee Your Project's Success?",
    method_sub: "Every project passes through rigorous, well-orchestrated phases to guarantee peak performance and total client satisfaction.",
    method_1_title: "Strategic Analysis",
    method_1_desc: "Comprehensive requirement discovery and business modeling prior to development, ensuring software aligns perfectly with operational and investment roadmaps.",
    method_2_title: "UI/UX Architecture",
    method_2_desc: "Crafting intuitive, captivating user experiences and design systems that encapsulate brand identity seamlessly across all screen sizes.",
    method_3_title: "Optimization & Cloud Launch",
    method_3_desc: "Holistic site optimization, database tuning, rigorous penetration testing, and bulletproof cloud deployment for top-tier speed and security.",
    cap_tag: "Capabilities & Solutions",
    cap_title: "All Software Services Under One Unified Roof",
    cap_sub: "Integrated intelligent technologies covering every facet of institutional digital transformation",
    cap_1_title: "Invoicing Systems",
    cap_1_sub: "Fully compliant with ZATCA Phase 2 e-invoicing mandates",
    cap_2_title: "Digital Marketing",
    cap_2_sub: "Smart data-driven campaign management and conversion tracking",
    cap_3_title: "E-Commerce Platforms",
    cap_3_sub: "Complete stores integrated with regional payment gateways and logistics",
    cap_4_title: "Cybersecurity",
    cap_4_sub: "Enterprise data and infrastructure protection complying with ISO & NCA",
    cap_5_title: "CRM Systems",
    cap_5_sub: "Customer relationship management and automated sales pipelines",
    cap_6_title: "ERP Systems",
    cap_6_sub: "Enterprise resource planning spanning finances, inventory, and HR",
    cap_7_title: "Mobile App Development",
    cap_7_sub: "High-performance native and hybrid apps for iOS and Android",
    cap_8_title: "Cloud Software & SaaS",
    cap_8_sub: "Multi-tenant SaaS platforms and elastic cloud microservices",
    serv_tag: "Comprehensive Solutions",
    serv_title: "12 Specialized Software & IT Services",
    serv_sub: "An extensive suite of digital services serving enterprises, startups, and government entities.",
    prod_tag: "Ready-Made Software Catalog",
    prod_title: "18 Advanced Ready-Made Digital Products",
    prod_sub: "Turnkey software platforms and mobile applications engineered for immediate branding and market launch.",
    prod_search_ph: "Search by product name or domain...",
    prod_filter_all: "All (18)",
    prod_filter_mobile: "Mobile Apps",
    prod_filter_platforms: "Enterprise Platforms",
    prod_filter_ecommerce: "Marketplaces & Commerce",
    prod_filter_special: "Specialized Systems",
    proj_tag: "Proven Track Record",
    proj_title: "Projects We Proudly Built & Support",
    proj_sub: "Real-world success stories transforming partner ideas into scalable systems serving thousands of active users across Saudi Arabia.",
    part_tag: "Success Partners & Clients",
    part_title: "Trusted by Leading Saudi Institutions",
    part_sub: "Proud partnerships across key government and private sectors in the Kingdom",
    contact_tag: "Consultation & Contact",
    contact_title: "Send Us Your Inquiries & We Will Reach Out Promptly",
    contact_sub: "Our engineering and advisory team is ready to evaluate your requirements, deliver detailed proposals, and perform thorough feasibility studies.",
    form_name_lbl: "Full Name *",
    form_name_ph: "Enter your name or organization name",
    form_email_lbl: "Email Address *",
    form_email_ph: "example@domain.com",
    form_addr_lbl: "Location / City / Country",
    form_addr_ph: "Riyadh, Kingdom of Saudi Arabia",
    form_msg_lbl: "Project or Consultation Details *",
    form_msg_ph: "Describe your project idea, required systems, or technical requirements...",
    form_submit: "Submit Consultation Request",
    loc_title: "Headquarters Location",
    loc_desc: "Business Gate, King Fahd Road, King Khalid International Airport, Riyadh, Saudi Arabia",
    email_title: "Direct Official Email",
    phone_title: "Phone & Client Support",
    phone_wa_cta: "Direct Chat on WhatsApp",
    footer_desc: "At ECIT, we uphold the goals of Saudi Vision 2030 through high-caliber deliverables, agile software squads, and transparent client partnerships. We empower modern entities to transform IT infrastructure to match enterprise objectives.",
    footer_quick: "Quick Links",
    footer_services: "Featured Services",
    footer_rights: "All Rights Reserved © 2026 ECIT | Information Technology Experts Co.",
    footer_pdf_link: "Company Profile (PDF)",
    chatbot_title: "ECIT AI Assistant",
    chatbot_sub: "Online & Ready 24/7",
    chatbot_welcome: "Welcome to Information Technology Experts Co. (ECIT)! 👋 How can I assist you today regarding our software services, products, or consultation?",
    lang_switch_label: "Language / اللغة",
    drawer_home: "Home",
    drawer_about: "About & Vision",
    drawer_services: "Enterprise Services",
    drawer_products: "Ready Platforms",
    drawer_projects: "Featured Projects",
    drawer_partners: "Strategic Partners",
    drawer_contact: "Contact & Consultation",
    drawer_pdf: "Download Company Profile (PDF)",
    drawer_wa: "WhatsApp: +966 50 125 2878",
    footer_sub1: "E-Payment Gateways & Mada Solutions",
    footer_sub2: "Custom Software & Enterprise Systems",
    footer_sub3: "Workflow Automation & Digital Transformation",
    footer_sub4: "Web Platforms & Native Mobile Apps",
    footer_sub5: "System Integration & Unified APIs",
    footer_sub6: "Cybersecurity & Artificial Intelligence",
    uptime_lbl: "High Availability",
    latency_lbl: "Response Latency",
    cloud_card_title: "Cloud Infrastructure & Solutions",
    cloud_card_sub: "+18 Active Platforms",
    sec_badge: "256-bit Encrypted Cybersecurity",
    sec_link: "Explore All Platforms",
    details_close_lbl: "Close",
    chat_tooltip: "ECIT AI Assistant",
    chatbot_input_ph: "Type your question here..."
  }
};

function initLanguageEngine() {
  applyLanguage(currentLang);

  const langBtn = document.getElementById('lang-switch-btn');
  const langMobileBtn = document.getElementById('lang-switch-mobile-btn');

  function toggle() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('ecit_lang', currentLang);
    applyLanguage(currentLang);
  }

  if (langBtn) langBtn.addEventListener('click', toggle);
  if (langMobileBtn) langMobileBtn.addEventListener('click', toggle);
}

function applyLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const dict = i18nDict[lang];

  // Update text of all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Update language button label
  const langLabels = document.querySelectorAll('.lang-label-text');
  langLabels.forEach(l => {
    l.textContent = lang === 'ar' ? 'English' : 'عربي';
  });

  // Re-render dynamic components in the chosen language
  if (window.renderServices) {
    window.renderServices();
  }
  if (window.renderProducts) {
    window.renderProducts();
  }
  if (window.renderProjects) {
    window.renderProjects();
  }
  if (window.updateChatbotLanguage) {
    window.updateChatbotLanguage();
  }
  if (typeof initRiyadhClock === 'function') {
    initRiyadhClock();
  }
}
window.applyLanguage = applyLanguage;

/* ==================== 4. PRODUCTS DATA (BILINGUAL) ==================== */
const productsData = [
  {
    id: "p1",
    title: { ar: "منصة التغذية المدرسية", en: "School Nutrition Platform" },
    category: "platforms",
    categoryLabel: { ar: "منصات تعليمية وصحية", en: "Educational & Health Platform" },
    image: "https://ecit.com.sa/public/storage/products/ixy99H3o9u0jLZgOgaVvkT2Bc528gg8h1vVq1NhT.png",
    badge: { ar: "نظام ذكي متكامل", en: "Smart Integrated System" },
    desc: {
      ar: "منصة ذكية موجهة للطلاب والطالبات في المدارس الابتدائية، خصوصاً ممن يعانون من أمراض مزمنة. توفر بيئة مترابطة تشمل: المدرسة، الأسرة، الأخصائيين، والمقاصف، لضمان نظام غذائي صحي وآمن.",
      en: "A smart platform engineered for elementary school students, specifically tailored for children with chronic conditions. It links schools, families, pediatric specialists, and cafeterias for a secure, healthy diet."
    },
    features: {
      ar: [
        "ربط المدارس مع الأخصائيين وأولياء الأمور لحظياً",
        "ملف صحي ذكي لكل طالب لمتابعة الحساسيات والأمراض المزمنة",
        "إدارة المقاصف المدرسية والوجبات المعتمدة غذائياً",
        "تقارير دورية لأولياء الأمور والإدارة المدرسية"
      ],
      en: [
        "Real-time interconnection between schools, specialists, and guardians",
        "Individual electronic health records tracking allergies and chronic conditions",
        "Management of approved healthy school cafeteria meal plans",
        "Automated recurring analytical reports for parents and administration"
      ]
    }
  },
  {
    id: "p2",
    title: { ar: "تطبيق لصيانة السيارات", en: "Auto Maintenance Platform" },
    category: "mobile",
    categoryLabel: { ar: "تطبيقات الهواتف الذكية", en: "Mobile Applications" },
    image: "https://ecit.com.sa/public/storage/products/KNgiKDkEDIiswpXk1VKrrQxsV1sMdBVn6fnq5NTN.png",
    badge: { ar: "تطبيق خدمات ووساطة", en: "Services Marketplace App" },
    desc: {
      ar: "تطبيق جوال يعمل كوسيط بين العملاء ومقدمي خدمات صيانة السيارات، بهدف مساعدة العميل على العثور على مقدمي الخدمات المحترفين، ومساعدة مقدم الخدمة على الحصول على المزيد من فرص العمل.",
      en: "A mobile marketplace bridging vehicle owners with certified auto repair professionals, enabling effortless bookings, verified reviews, and business expansion for workshops."
    },
    features: {
      ar: [
        "يساعد العملاء في العثور على مقدمي خدمات صيانة موثوقين (كهربائيين، ميكانيكيين، فنيي تكييف)",
        "تقديم طلب الخدمة، جدولة المواعيد، ومتابعة تقدم العمل المباشر عبر الهاتف",
        "يعزز الثقة بين العملاء والفنيين عبر تقييمات حقيقية وتجارب سابقة موثقة",
        "تمكين الورش والفنيين من توسيع قاعدة عملائهم وزيادة الطلب على خدماتهم"
      ],
      en: [
        "Find verified mechanics, auto electricians, and AC technicians anytime",
        "On-demand service booking, appointment scheduling, and live tracking",
        "Transparent customer review and rating mechanisms",
        "Digital portal for workshops to scale orders and client base"
      ]
    }
  },
  {
    id: "p3",
    title: { ar: "تطبيق لخدمات البناء والتشييد", en: "Construction Services App" },
    category: "mobile",
    categoryLabel: { ar: "تطبيقات الهواتف والتشييد", en: "Mobile & Construction" },
    image: "https://ecit.com.sa/public/storage/products/Tjecp5P0YgMzgqRQPQqwAM241oSe4LTCCGGFw0Nt.png",
    badge: { ar: "قطاع المقاولات والهندسة", en: "Contracting & Engineering" },
    desc: {
      ar: "تطبيق جوال يعمل كوسيط بين العملاء ومقدمي الخدمات في مجال البناء والتشييد، حيث يوفر للعميل أدوات سهلة الاستخدام للعثور على المهندسين والمقاولين المتميزين وإدارة العقود.",
      en: "Mobile platform connecting property owners with certified civil engineers, general contractors, and construction specialists with quotation comparisons and milestones."
    },
    features: {
      ar: [
        "يسهل العثور على مهندسين ومقاولين وعمال بناء محترفين بحسب التخصص والموقع",
        "تصفح الخدمات، طلب عروض أسعار تفصيلية، ومقارنة العروض بسهولة تامة",
        "اختيار الأنسب استناداً إلى تقييمات وآراء مشاريع سابقة معتمدة",
        "منصة متكاملة للمقاولين لعرض سابقة أعمالهم وإدارة الحجوزات والتواصل"
      ],
      en: [
        "Find verified civil engineers, contractors, and builders by location",
        "Explore services, request detailed price quotations, and compare bids",
        "Review client ratings and verifiable past project portfolios",
        "Dedicated contractor management dashboard for orders and communications"
      ]
    }
  },
  {
    id: "p4",
    title: { ar: "تطبيق لنقل الشحنات واللوجستيات", en: "Freight & Logistics App" },
    category: "mobile",
    categoryLabel: { ar: "اللوجستيات والنقل", en: "Logistics & Transport" },
    image: "https://ecit.com.sa/public/storage/products/Z5jF00cnrS3f3DmqrBlEHCp5RXhTUFOO0QpHw6i6.png",
    badge: { ar: "سلاسل الإمداد والنقل", en: "Supply Chain & Cargo" },
    desc: {
      ar: "تطبيق جوال يعمل كوسيط بين العملاء ومقدمي خدمات النقل وتوصيل الشحنات، يساعد العميل على العثور على شاحنات وسائقين موثوقين، ويمكن السائقين من مضاعفة إيراداتهم.",
      en: "On-demand freight and cargo shipping app connecting shippers with licensed truck drivers, offering live GPS tracking, bill of lading digital receipts, and secure settlements."
    },
    features: {
      ar: [
        "ربط مباشر وسريع بين أصحاب الشحنات ومقدمي خدمات النقل الخفيف والثقيل",
        "تتبع الشحنة في الوقت الفعلي عبر خرائط GPS دقيقة",
        "تحديد مواعيد الاستلام والتسليم بكل مرونة مع وثائق استلام رقمية",
        "مساعدة السائقين وشركات النقل على الوصول لعملاء جدد وزيادة دخلهم"
      ],
      en: [
        "Direct pairing between cargo shippers and light/heavy freight operators",
        "Real-time turn-by-turn shipment GPS tracking",
        "Flexible pickup and delivery scheduling with digital proof of delivery",
        "Empowers transport firms and drivers to maximize trip revenue"
      ]
    }
  },
  {
    id: "p5",
    title: { ar: "تطبيق لتخطيط الأفراح والمناسبات", en: "Wedding & Event Planner App" },
    category: "special",
    categoryLabel: { ar: "منصات تنظيم الفعاليات", en: "Event Management" },
    image: "https://ecit.com.sa/public/storage/products/Oz9MuuwFJRolwxxoLvErChEDXKogZRssEh8KnjzQ.png",
    badge: { ar: "إدارة المناسبات", en: "Event Planning" },
    desc: {
      ar: "واجهة ويب وتطبيق لمساعدة المستخدمين على إدارة كل جانب من جوانب مناسباتهم. تشمل البحث عن قاعات، مصورين، تموين، وزهور مع أدوات ميزانية وحجوزات مباشرة.",
      en: "Web and mobile portal enabling complete planning of weddings and celebrations. Browse venues, photographers, caterers, and floral designers with budget trackers."
    },
    features: {
      ar: [
        "دليل شامل وموثق لمقدمي خدمات الأفراح والمناسبات",
        "مقارنة الأسعار وتخصيص الباقات بحسب الميزانية والأسلوب",
        "أدوات تنظيم متكاملة لجدول المواعيد وقوائم المدعوين",
        "لوحة تحكم خاصة بمقدمي الخدمات لإدارة الحجوزات ومتابعة العملاء"
      ],
      en: [
        "Comprehensive vendor directory for halls, catering, and decor",
        "Package customization and price comparison tools",
        "Automated attendee lists, RSVP management, and schedules",
        "Vendor operational dashboards for reservations and bookings"
      ]
    }
  },
  {
    id: "p6",
    title: { ar: "تطبيق لتنظيم المؤتمرات والفعاليات", en: "Conferences Management System" },
    category: "special",
    categoryLabel: { ar: "إدارة المؤتمرات والمعارض", en: "Conferences & Summits" },
    image: "https://ecit.com.sa/public/storage/products/kHSI32wCvpLB3pN6xR11JshtUkNcGPjWcY63JUqu.png",
    badge: { ar: "مؤتمرات ومعارض", en: "Summits & Expos" },
    desc: {
      ar: "تطبيق ويب متقدم لاكتشاف وتخطيط وإدارة الفعاليات الكبرى. يتيح تصفح المؤتمرات القادمة، حجز التذاكر بالدفع الإلكتروني، وإدارة المتحدثين وورش العمل.",
      en: "Comprehensive conference management SaaS for hosting large summits, ticketing, QR access badge generation, speaker schedules, and interactive attendee portals."
    },
    features: {
      ar: [
        "سهولة اكتشاف الفعاليات وإصدار تذاكر إلكترونية برمز QR",
        "إدارة المؤتمرات الكبرى والجلسات وقاعات النقاش بمرونة تامة",
        "نظام تسجيل المتحدثين والضيوف وإصدار بطاقات الدخول",
        "تقارير فورية لحضور وتفاعل المشاركين في الحدث"
      ],
      en: [
        "Instant event discovery with QR-code digital ticket generation",
        "Dynamic workshop and session agenda management",
        "Speaker roster and VIP badge credentials registration",
        "Live attendee engagement analytics and presence tracking"
      ]
    }
  },
  {
    id: "p7",
    title: { ar: "تطبيق للخدمات المنزلية", en: "Home Services On-Demand App" },
    category: "mobile",
    categoryLabel: { ar: "خدمات حسب الطلب", en: "On-Demand Services" },
    image: "https://ecit.com.sa/public/storage/products/NUKIyZK247Rg4HlELpNlZV1q3E1kZNopTF19ZkyG.png",
    badge: { ar: "خدمات فورية", en: "On-Demand App" },
    desc: {
      ar: "تطبيق جوال يعمل كوسيط بين العملاء والفنيين، يوفر وسيلة مريحة وموثوقة للوصول لخدمات النظافة، الكهرباء، السباكة، والتكييف في مكان واحد مع ضمان الجودة.",
      en: "On-demand mobile marketplace connecting homeowners with verified technicians for plumbing, electrical, cleaning, and HVAC maintenance with guaranteed warranties."
    },
    features: {
      ar: [
        "تغطية شاملة: تنظيف، سباكة، كهرباء، صيانة أجهزة، وتنسيق حدائق",
        "نظام تقييم ومراجعات شفاف يضمن جودة أداء الفنيين",
        "حجز الخدمة وتحديد موعد الزيارة والدفع الإلكتروني الآمن",
        "تتبع الفني على الخريطة ومتابعة إنجاز العمل خطوة بخطوة"
      ],
      en: [
        "Complete home services: plumbing, electricity, HVAC, and cleaning",
        "Vetted technicians with transparent customer reviews",
        "Instant booking, schedule selection, and secure in-app payments",
        "Live technician GPS location tracking and job stage status"
      ]
    }
  },
  {
    id: "p8",
    title: { ar: "تطبيق لمشاركة الأغراض والاحتياجات", en: "Item Sharing & Peer Rental App" },
    category: "ecommerce",
    categoryLabel: { ar: "اقتصاد المشاركة", en: "Sharing Economy" },
    image: "https://ecit.com.sa/public/storage/products/vlgxhXM9F8YsYTYyXM26CrgCyrv7qVCrTHw5UokP.png",
    badge: { ar: "الاقتصاد التشاركي", en: "Sharing Economy" },
    desc: {
      ar: "تطبيق جوال يساعد المستخدمين على نشر الأغراض التي يمكن مشاركتها مع الآخرين (بيع - إيجار - مقايضة)، لتعزيز الاستفادة من المقتنيات غير المستخدمة بأسعار رمزية.",
      en: "Community sharing marketplace facilitating peer-to-peer item sharing, temporary rentals, sales, or barter trades to monetize idle belongings sustainably."
    },
    features: {
      ar: [
        "تنويع خيارات المشاركة: بيع مباشر، تأجير يومي/شهري، أو مقايضة",
        "الاستفادة القصوى من الأجهزة والأغراض غير المستغلة",
        "توفير حلول اقتصادية وبدائل ممتازة بتكلفة منخفضة للمجتمع",
        "تعزيز الاستدامة وروح التعاون المجتمعي التشاركي"
      ],
      en: [
        "Flexible options: Direct sale, short-term rental, or item barter",
        "Monetize underutilized household appliances and tools",
        "Cost-effective alternative to buying new items for local communities",
        "Promoting sustainability and responsible consumption"
      ]
    }
  },
  {
    id: "p9",
    title: { ar: "تطبيق للجمعيات الخيرية", en: "Nonprofit & Charity Platform" },
    category: "special",
    categoryLabel: { ar: "القطاع غير الربحي", en: "Nonprofit Sector" },
    image: "https://ecit.com.sa/public/storage/products/jhqBEQIFHxRKFEG2eWrUjY6n8GL6VGBJPV0mn319.png",
    badge: { ar: "حلول الأثر المجتمعي", en: "Social Impact SaaS" },
    desc: {
      ar: "منصة متطورة لعرض المشاريع الخيرية والتنموية غير المكتملة وتمكين أفراد المجتمع ورجال الأعمال من المساهمة الرقمية المباشرة بكل شفافية وموثوقية.",
      en: "Digital fundraising and project tracking platform for charitable organizations, enabling secure donations, transparent campaign accounting, and donor reports."
    },
    features: {
      ar: [
        "دعم مباشر للمنظمات الخيرية لجمع التبرعات للمشاريع المعتمدة",
        "بوابات دفع إلكترونية متعددة لدعم الصدقات والزكاة والوقف",
        "متابعة إنجاز المشاريع الخيرية بالصور والتقارير الدورية للمتبرعين",
        "تعزيز الشفافية والمصداقية ومطابقة معايير الحوكمة غير الربحية"
      ],
      en: [
        "Direct donation facilitation for certified developmental projects",
        "Seamless digital payment gateways (Zakat, Waqf, General Charity)",
        "Visual project milestone progress updates for donors",
        "Full compliance with nonprofit regulatory governance standards"
      ]
    }
  },
  {
    id: "p10",
    title: { ar: "تطبيق لخدمات الطعام والأسر المنتجة", en: "Home Chef & Food Services App" },
    category: "ecommerce",
    categoryLabel: { ar: "التجارة والتموين", en: "Food & Beverage" },
    image: "https://ecit.com.sa/public/storage/products/2IxB7dWXoPQ3h6UizcsOMTkRFOSvUCKrdEADg2Ph.png",
    badge: { ar: "طعام منزلي وتوصيل", en: "Food Marketplace" },
    desc: {
      ar: "تطبيق جوال يسمح للعملاء بطلب وجبات منزلية صحية من الطهاة والأسر المنتجة الموهوبة محلياً، مع تصفية المأكولات بحسب نوع المطبخ والطلب المسبق.",
      en: "Culinary marketplace enabling households to order authentic home-cooked meals prepared by vetted local chefs and productive families with scheduled deliveries."
    },
    features: {
      ar: [
        "تنوع غني في خيارات الطعام المنزلي والحلويات والولائم",
        "تمكين الأسر المنتجة والطهاة المحليين من تنمية مشاريعهم",
        "تجربة طلب ودفع سلسة مع تتبع دقيق لوقت الطهي والتوصيل",
        "معايير جودة وتقييمات حية تضمن الأمان الغذائي والمذاق الأصيل"
      ],
      en: [
        "Diverse selection of healthy home-style meals and catering",
        "Economic empowerment for talented home chefs and productive families",
        "Smooth ordering, meal scheduling, and dispatch tracking",
        "Verified food hygiene standards and transparent reviews"
      ]
    }
  },
  {
    id: "p11",
    title: { ar: "تطبيق Geet لخدمات التوصيل", en: "Geet Parcel Delivery App" },
    category: "mobile",
    categoryLabel: { ar: "اللوجستيات والتوصيل", en: "Courier & Delivery" },
    image: "https://ecit.com.sa/public/storage/products/alHUI1NEoo1ogH63ins3WGQk93QQeGmHohXtglgQ.png",
    badge: { ar: "توصيل سريع", en: "Express Courier" },
    desc: {
      ar: "تطبيق جوال لمساعدة العملاء على إيجاد مندوبي توصيل ممتازين لتنفيذ طلبات الشراء ونقل الطرود بين المواقع بسرعة فائقة وخطوات مبسطة وبأسعار تنافسية.",
      en: "On-demand parcel delivery and personal courier app pairing users with vetted couriers for intra-city parcel transport and purchase fulfillment."
    },
    features: {
      ar: [
        "سهولة فائقة في الاستخدام وإرسال الطلبات في ثوانٍ معدودة",
        "أسعار تنافسية عادلة مع احتساب دقيق للمسافات",
        "شبكة مندوبين موثوقة ومفحوصة أمنياً لضمان سلامة الطرود",
        "توفير وقت وجهد العملاء مع متابعة فورية للمندوب حتى نقطة الوصول"
      ],
      en: [
        "Instant request submission in seconds with clear map drop pins",
        "Dynamic fair pricing based on accurate distance metrics",
        "Vetted, trusted courier network safeguarding parcels",
        "Live courier journey tracking until delivery sign-off"
      ]
    }
  },
  {
    id: "p12",
    title: { ar: "منصة إدارة معايير التحول الرقمي", en: "Digital Transformation Governance SaaS" },
    category: "platforms",
    categoryLabel: { ar: "الأنظمة الحكومية والمؤسسية", en: "GovTech & Governance" },
    image: "https://ecit.com.sa/public/storage/products/H9jGc2J9cRtGLoBhizUuMq6wRErcxoCXCjlPY2Bf.png",
    badge: { ar: "الحوكمة والتحول الرقمي", en: "Digital Maturity SaaS" },
    desc: {
      ar: "منصة حوكمة شاملة لقياس الامتثال لمعايير التحول الرقمي السعودية (مثل معايير هيئة الحكومة الرقمية DGA). تغطي التخطيط الاستراتيجي، المخاطر، والعمليات المؤسسية.",
      en: "Enterprise governance software measuring compliance with Saudi Digital Government Authority (DGA) standards, strategic planning, risk management, and maturity indexes."
    },
    features: {
      ar: [
        "إدارة مركزية لكافة مؤشرات ومتطلبات القياس والتحول الرقمي",
        "لوحات متابعة تفاعلية Dashboards لعرض نسبة الامتثال اللحظية",
        "تقارير أداء ومطابقة متقدمة تحدد الفجوات وخطط التحسين المطلوبة",
        "إشعارات تلقائية عند انخفاض الأداء أو استحقاق متطلبات التدقيق"
      ],
      en: [
        "Centralized repository for government digital indicators and criteria",
        "Real-time executive compliance dashboards",
        "Gap analysis reporting and automated remedial action plans",
        "Automated alerts on compliance dips or audit deadlines"
      ]
    }
  },
  {
    id: "p13",
    title: { ar: "منصة اللجان والاجتماعات الذكية", en: "Smart Committees & Board Meetings SaaS" },
    category: "platforms",
    categoryLabel: { ar: "الأنظمة المؤسسية", en: "Enterprise Governance" },
    image: "https://ecit.com.sa/public/storage/products/YhI469rXfvAstu5QQntIk7KbYedEjcvmXg5QquYK.png",
    badge: { ar: "إدارة الحوكمة والقرارات", en: "Board Governance" },
    desc: {
      ar: "منصة رقمية لتنظيم اجتماعات مجالس الإدارة واللجان المؤسسية، وتوثيق المحاضر والقرارات والتصويت الإلكتروني السري، ومتابعة تنفيذ التكليفات حتى الإغلاق.",
      en: "Digital board portal streamlining board meetings, agenda workflows, digital minutes signing, confidential voting, and executive task assignment tracking."
    },
    features: {
      ar: [
        "جدولة الاجتماعات وإرسال الدعوات وجداول الأعمال رقمياً",
        "إنشاء محاضر الاجتماعات تلقائياً وتوقيعها رقمياً",
        "توثيق القرارات وتعيين المسؤولين وتتبع نسب الإنجاز",
        "نظام تصويت إلكتروني آمن وأرشفة رقمية مشفرة للوثائق"
      ],
      en: [
        "Digital agenda distribution and automated meeting scheduling",
        "Automated meeting minutes generation with cryptographic signatures",
        "Decision logging with accountable task tracking and reminders",
        "Encrypted confidential electronic balloting and cloud archiving"
      ]
    }
  },
  {
    id: "p14",
    title: { ar: "منصة المراجعة الداخلية والرقابة", en: "Internal Audit & Risk Management SaaS" },
    category: "platforms",
    categoryLabel: { ar: "الأنظمة المؤسسية والرقابية", en: "Audit & Risk Compliance" },
    image: "https://ecit.com.sa/public/storage/products/hkhguT4CrtLP30EU0UOfUToSV9eTEKMaRtSBGKrv.png",
    badge: { ar: "الامتثال والرقابة", en: "Audit & Risk" },
    desc: {
      ar: "نظام رقابة متكامل للمراجعة الداخلية، يدير الخطة السنوية للتدقيق، ويوثق الملاحظات والتوصيات ويربطها بالإدارات المعنية مع تتبع إجراءات التصحيح.",
      en: "Comprehensive internal audit system automating annual audit charters, field observations, risk evaluation matrices, and corrective action workflows."
    },
    features: {
      ar: [
        "إعداد ومتابعة خطة المراجعة السنوية وفق المعايير الدولية",
        "توثيق نتائج الزيارات الميدانية وتسجيل الملاحظات فورياً",
        "تحليل أداء إدارات المخاطر ومتابعة إغلاق التوصيات",
        "دعم مؤشرات الجودة والامتثال للحوكمة المؤسسية"
      ],
      en: [
        "Annual audit planning complying with international IIA standards",
        "Real-time field audit findings logging and evidence archiving",
        "Risk matrix analytics and remediation milestone tracking",
        "KPI dashboards supporting institutional governance compliance"
      ]
    }
  },
  {
    id: "p15",
    title: { ar: "منصة المحاماة والاستشارات القانونية", en: "Legal Practice Management SaaS" },
    category: "platforms",
    categoryLabel: { ar: "الأنظمة العدلية والقانونية", en: "LegalTech Platform" },
    image: "https://ecit.com.sa/public/storage/products/ASzBOWqzgp6SfnuDeDzOvK0sCFTnbZxKI9zW3Nub.png",
    badge: { ar: "القطاع العدلي والقانوني", en: "LegalTech SaaS" },
    desc: {
      ar: "نظام إلكتروني شامل لأتمتة مكاتب المحاماة والشركات القانونية، بدءاً من طلب الاستشارة وحتى إدارة الجلسات واللوائح والفوترة الإلكترونية وتتبع الموكلين.",
      en: "Comprehensive practice management platform for law firms and legal counsels, automating case lifecycles, court session calendars, client portals, and ZATCA invoicing."
    },
    features: {
      ar: [
        "تحويل تلقائي من استشارة قانونية إلى قضية بملف متكامل",
        "إدارة مراحل القضايا والجلسات ومواعيد الاستئناف والتنفيذ",
        "بوابة مخصصة للموكلين لمتابعة مستجدات قضاياهم لحظياً",
        "نظام فواتير إلكترونية متوافق مع هيئة الزكاة والضريبة والجمارك"
      ],
      en: [
        "Seamless conversion of initial consultations into active case files",
        "Court session scheduling, briefs repository, and appeal deadlines",
        "Dedicated client portal for case progress updates",
        "ZATCA-compliant Phase 2 electronic invoicing"
      ]
    }
  },
  {
    id: "p16",
    title: { ar: "منصة مزارعنا للاستثمار الزراعي", en: "Mazareona AgTech Investment Portal" },
    category: "ecommerce",
    categoryLabel: { ar: "التجارة والوساطة المتخصصة", en: "AgriTech & Real Estate" },
    image: "https://ecit.com.sa/public/storage/products/xuMeqM0QoEV2sQmMpxV8AOTFlHna15auiSziY4ir.png",
    badge: { ar: "الاستثمار الزراعي", en: "AgTech Marketplace" },
    desc: {
      ar: "منصة استثمارية زراعية تربط أصحاب المزارع بالمستثمرين لبيع وتأجير الأراضي والمزارع، مع تقديم خدمات الدعم الهندسي واللوجستي والزراعي الحديث.",
      en: "Agricultural investment marketplace connecting farmland owners with institutional and individual investors for lease, acquisition, and smart farming advisory."
    },
    features: {
      ar: [
        "عرض مفصل للمزارع بالصور والمساحات، ونوع التربة والمياه وفرص التطوير",
        "ربط مباشر مع مهندسين زراعيين وموردي التقنيات والمعدات",
        "دراسات جدوى أولية وتقييمات عقارية للمزارع المعروضة",
        "دعم التوثيق والتعاقد الإلكتروني والتفاوض المباشر"
      ],
      en: [
        "Detailed farmland listings with soil, water salinity, and acreage metrics",
        "Direct connection to certified agronomists and smart irrigation suppliers",
        "Preliminary feasibility assessments and agricultural appraisals",
        "Digital contract drafting and secure offer negotiations"
      ]
    }
  },
  {
    id: "p17",
    title: { ar: "منصة المتاجر متعددة البائعين", en: "Multi-Vendor Marketplace Platform" },
    category: "ecommerce",
    categoryLabel: { ar: "الأسواق الرقمية والتجارة", en: "Multi-Vendor E-Commerce" },
    image: "https://ecit.com.sa/public/storage/products/WUOJRt4CC7gEn8Ft3608b0DzAd13rDasfqTCu0Y2.png",
    badge: { ar: "الأسواق الرقمية", en: "Marketplace SaaS" },
    desc: {
      ar: "سوق رقمي مرن يتيح لأي تاجر أو مؤسسة فتح متجر إلكتروني خاص وإدارة منتجاته دون عوائق برمجية، مع دعم احترافي لمبيعات الأسر المنتجة ورواد الأعمال.",
      en: "Enterprise multi-vendor e-commerce platform allowing thousands of merchants to operate branded sub-stores with automated commission splits, shipping, and payments."
    },
    features: {
      ar: [
        "لوحة تحكم مستقلة لكل بائع لإدارة المخزون والمبيعات والفواتير",
        "دعم أنظمة الحسابات وتوزيع العمولات التلقائية لكل عملية بيع",
        "ربط مع كبرى شركات الشحن وبوابات الدفع الإلكترونية السعودية",
        "نظام تقييمات موثوقة للعملاء لضمان جودة السلع والخدمات"
      ],
      en: [
        "Autonomous vendor dashboards for product catalog, stock, and orders",
        "Automated commission calculation and automated payout disbursement",
        "Direct integration with leading Saudi couriers and payment gateways",
        "Verified customer review and buyer protection mechanisms"
      ]
    }
  },
  {
    id: "p18",
    title: { ar: "منصة إدارة المشاريع المؤسسية", en: "Enterprise Project Management PMO" },
    category: "platforms",
    categoryLabel: { ar: "الأنظمة المؤسسية والإدارية", en: "Enterprise PMO" },
    image: "https://ecit.com.sa/public/assets/images/logo.png",
    badge: { ar: "إدارة المشاريع PMO", en: "PMO System" },
    desc: {
      ar: "نظام شامل لتخطيط وتنفيذ ومتابعة المشاريع البرمجية والإدارية داخل المنظمات، يدعم اتخاذ القرار والتحكم في الموارد والميزانيات وجداول التسليم.",
      en: "Comprehensive enterprise PMO software for orchestrating complex tech initiatives, Gantt scheduling, resource allocation, and predictive budget forecasting."
    },
    features: {
      ar: [
        "إدارة المهام والمراحل الزمنية ومخططات جانت التفاعلية",
        "تقارير تنبؤية وتحليلية للإنتاجية والالتزام بالمواعيد النهائية",
        "إدارة الميزانيات والتكاليف والمخاطر التشغيلية لكل مشروع",
        "لوحات تحكم تنفيذية تدعم صناع القرار وفرق العمل المشتركة"
      ],
      en: [
        "Interactive Gantt charts, sprint boards, and dependency tracking",
        "Predictive delivery deadline analytics and team velocity tracking",
        "Real-time budget consumption and operational risk registers",
        "Executive C-level KPI dashboards with cross-project visibility"
      ]
    }
  }
];

// Assign professional custom cover images for all products
productsData.forEach(p => {
  p.cover = 'images/products/' + p.id + '.png';
});

function initProductsSystem() {
  const container = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const searchInput = document.getElementById('product-search');

  if (!container) return;

  window.renderProducts = function() {
    const activeBtn = document.querySelector('.product-filter-btn.bg-blue-600');
    const filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

    let items = productsData;
    if (filter !== 'all') {
      items = items.filter(p => p.category === filter);
    }
    if (query) {
      items = items.filter(p => {
        const title = (p.title[currentLang] || p.title['ar']).toLowerCase();
        const desc = (p.desc[currentLang] || p.desc['ar']).toLowerCase();
        return title.includes(query) || desc.includes(query);
      });
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 glass-card rounded-2xl p-8 border border-slate-800">
          <i class="fa-solid fa-magnifying-glass text-4xl mb-4 text-slate-500"></i>
          <h4 class="text-xl font-bold text-white mb-2">${currentLang === 'ar' ? 'لم يتم العثور على منتجات مطابقة' : 'No matching products found'}</h4>
          <p class="text-sm">${currentLang === 'ar' ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة' : 'Try another search term or filter category'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(p => {
      const coverUrl = p.cover || ('images/products/' + p.id + '.png');
      return `
      <div class="executive-card product-card-dazzle card-shimmer rounded-3xl overflow-hidden flex flex-col border border-slate-200/90 group bg-white shadow-md hover-glow-blue relative" data-cat="${p.category}">
        <div class="relative h-56 overflow-hidden bg-slate-100">
          <img src="${coverUrl}" alt="${p.title[currentLang]}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${p.image}';this.classList.remove('object-cover');this.classList.add('object-contain','p-6');" class="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-900/10 to-transparent pointer-events-none"></div>
          <span class="absolute top-3.5 right-3.5 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-blue-700 border border-white shadow-md backdrop-blur-md flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            ${p.badge[currentLang]}
          </span>
        </div>
        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-xs text-blue-600 font-bold mb-2.5 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              ${p.categoryLabel[currentLang]}
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              ${p.title[currentLang]}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
              ${p.desc[currentLang]}
            </p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button onclick="openProductModal('${p.id}')" class="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 group-hover:gap-3 transition-all" aria-label="${currentLang === 'ar' ? 'عرض تفاصيل ' + p.title[currentLang] : 'View details of ' + p.title[currentLang]}">
              <span>${currentLang === 'ar' ? 'عرض التفاصيل والمميزات' : 'View Details & Features'}</span>
              <i class="fa-solid fa-arrow-left ${currentLang === 'en' ? 'rotate-180' : ''} text-xs"></i>
            </button>
            <button onclick="openConsultationForProduct('${p.title[currentLang]}')" class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 flex items-center justify-center text-xs transition-colors shadow-sm" title="${currentLang === 'ar' ? 'طلب استشارة أو ديمو' : 'Request Demo'}" aria-label="${currentLang === 'ar' ? 'طلب استشارة أو ديمو لـ ' + p.title[currentLang] : 'Request Demo for ' + p.title[currentLang]}">
              <i class="fa-solid fa-headset"></i>
            </button>
          </div>
        </div>
      </div>
    `}).join('');
  };

  window.renderProducts();

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      window.renderProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      window.renderProducts();
    });
  }
}

window.openProductModal = function(id) {
  const product = productsData.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById('details-modal');
  const modalBody = document.getElementById('details-modal-body');

  const coverImg = product.cover || ('images/products/' + product.id + '.png');
  modalBody.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="rounded-2xl border border-slate-200 overflow-hidden shadow-md bg-slate-100 aspect-[16/10]">
        <img src="${coverImg}" alt="${product.title[currentLang]}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${product.image}';this.classList.remove('object-cover');this.classList.add('object-contain','p-6');" class="w-full h-full object-cover">
      </div>
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            ${product.badge[currentLang]}
          </span>
          <span class="text-xs font-semibold text-slate-500">${product.categoryLabel[currentLang]}</span>
        </div>
        <h3 class="text-2xl md:text-3xl font-black text-slate-900 mb-4">${product.title[currentLang]}</h3>
        <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-6">${product.desc[currentLang]}</p>
        
        <div class="mb-6">
          <h4 class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i class="fa-solid fa-list-check"></i>
            <span>${currentLang === 'ar' ? 'أبرز المميزات والخصائص التقنية:' : 'Key Technical Capabilities:'}</span>
          </h4>
          <ul class="space-y-2.5">
            ${product.features[currentLang].map(f => `
              <li class="flex items-start gap-2.5 text-sm text-slate-700">
                <i class="fa-solid fa-circle-check text-emerald-600 mt-1 flex-shrink-0"></i>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
          <button onclick="openConsultationForProduct('${product.title[currentLang]}')" class="flex-1 py-3 px-6 rounded-xl btn-primary-blue text-white font-bold text-sm shadow-md transition-all text-center">
            ${currentLang === 'ar' ? 'طلب عرض فني وتجربة المنصة' : 'Request Technical Demo'}
          </button>
          <a href="https://wa.me/966501252878?text=${encodeURIComponent((currentLang === 'ar' ? 'السلام عليكم، أود الاستفسار عن: ' : 'Hello, I want to inquire about: ') + product.title[currentLang])}" target="_blank" class="py-3 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>${currentLang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
};

/* ==================== 5. PROJECTS DATA (BILINGUAL) ==================== */
const projectsData = [
  {
    name: { ar: "منصة واسطة", en: "Wastah Platform" },
    image: "https://ecit.com.sa/public/assets/images/products/logowastah.png",
    tag: { ar: "تطبيق تجاري وتسوق ذكي", en: "Smart Retail & Offers App" },
    description: {
      ar: "منصة واسطة هي تطبيق ذكي يربط المستخدمين بأفضل العروض والخصومات في مجالات التسوق، المطاعم، الكافيهات، والترفيه. نسعى لتقديم تجربة تسوق ممتعة وموفّرة، من خلال شراكات استراتيجية مع أبرز العلامات التجارية.",
      en: "Wastah connects consumers with premier promotional discounts across retail, dining, and lifestyle sectors through strategic brand alliances."
    }
  },
  {
    name: { ar: "منصة المحاماة", en: "Mohamah Legal Portal" },
    image: "https://ecit.com.sa/public/assets/images/products/laywer.png",
    tag: { ar: "بوابة قانونية وعدلية", en: "Legal & Advisory Portal" },
    description: {
      ar: "بوابة قانونية سعودية متخصصة في تقديم خدمات المحاماة والاستشارات القانونية وأتمتة إدارة القضايا واللوائح وتوثيق العقود.",
      en: "Specialized Saudi legal tech portal delivering law advisory, automated case management, and contract lifecycle digitization."
    }
  },
  {
    name: { ar: "حلول بيئتي", en: "Biati Solutions" },
    image: "https://ecit.com.sa/public/assets/images/products/biati.png",
    tag: { ar: "إدارة الحاويات والبيئة", en: "Waste & Logistics Platform" },
    description: {
      ar: "منصة وساطة وتسويق سعودية متخصصة في إدارة وتأجير الحاويات والنفايات والخدمات اللوجستية الداعمة للاستدامة البيئية.",
      en: "Saudi brokerage and marketing platform specialized in container rentals, waste handling, and green ecological logistics."
    }
  },
  {
    name: { ar: "مجموعة المستقبل", en: "Future Group Education" },
    image: "https://ecit.com.sa/public/assets/images/products/edu.png",
    tag: { ar: "منظومة التعليم الإلكتروني", en: "EdTech Learning Ecosystem" },
    description: {
      ar: "منصة تعليمية سعودية تقدم برامج أكاديمية وتدريبية متقدمة عبر أحدث تقنيات الفصول الافتراضية والتعلم الذكي.",
      en: "EdTech platform delivering accredited academic curricula and virtual classrooms with interactive learning tools."
    }
  },
  {
    name: { ar: "تطبيق استحواذ", en: "Istihwath Deals Platform" },
    image: "https://ecit.com.sa/public/assets/images/products/istihwath.png",
    tag: { ar: "منصة الصفقات والاستثمار", en: "M&A Investment Portal" },
    description: {
      ar: "منصة تربط البائعين بالمستثمرين ورجال الأعمال لشراء المشاريع أو الأفكار التجارية وفق اشتراكات وصفقات سلسة وموثقة.",
      en: "Investment matchmaking platform pairing business sellers with verified investors to acquire business assets and ventures."
    }
  },
  {
    name: { ar: "منصة مستواك", en: "Mostawak Learning Platform" },
    image: "https://ecit.com.sa/public/assets/images/products/riada.png",
    tag: { ar: "منصة تعليمية ذكية", en: "Smart E-Learning System" },
    description: {
      ar: "منصة تعليمية متكاملة للتعلم عن بُعد تشمل موقعاً وتطبيقاً ذكياً، مع بيئة شاملة لحسابات المشرفين والمعلمين والطلاب وأولياء الأمور.",
      en: "Comprehensive distance learning platform uniting teachers, students, supervisors, and parents with gamified achievements."
    }
  },
  {
    name: { ar: "المنصة الرقمية للإعلانات", en: "Digital Ads Network" },
    image: "https://ecit.com.sa/public/assets/images/products/unnamed.png",
    tag: { ar: "المحتوى الرقمي والمكافآت", en: "AdTech & Creator Rewards" },
    description: {
      ar: "بيئة متكاملة لإنشاء ومشاركة المحتوى الإعلاني التفاعلي مع مكافآت مالية مباشرة للمستخدمين بناءً على تفاعل الجمهور.",
      en: "Interactive advertising platform empowering content creators and paying audiences transparent engagement rewards via digital wallets."
    }
  },
  {
    name: { ar: "مشروع FityDiet", en: "FityDiet Nutrition Project" },
    image: "https://ecit.com.sa/public/assets/images/products/fity.png",
    tag: { ar: "الصحة والتغذية الرقمية", en: "Health & Diet Tech" },
    description: {
      ar: "مشروع متكامل لتقديم حلول غذائية مخصصة للمهتمين بالصحة مع خطط وجبات قابلة للتخصيص ودمج كامل لوسائل الدفع وتتبع النتائج.",
      en: "Digital health platform generating personalized meal plans, nutritional calorie tracking, and seamless e-payment fulfillment."
    }
  },
  {
    name: { ar: "منصة Art Ziad", en: "Art Ziad Creative Marketplace" },
    image: "https://ecit.com.sa/public/assets/images/products/ZIADART.png",
    tag: { ar: "الفنون والتجارة الإبداعية", en: "Fine Art E-Commerce" },
    description: {
      ar: "منصة إلكترونية لبيع اللوحات الفنية والتصاميم الإبداعية، مصممة وفق أفضل معايير UX/UI لضمان أداء فائق وتجربة تسوق آمنة.",
      en: "Creative marketplace showcasing fine art pieces and design work, delivering supreme browsing speed and secure global checkout."
    }
  }
];

function initProjectsModal() {
  window.renderProjects = function() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const isAr = currentLang === 'ar';
    const detailBtnText = isAr ? 'تفاصيل المشروع والتقنيات' : 'Project Details & Architecture';

    container.innerHTML = projectsData.map((p, idx) => {
      const name = p.name[currentLang] || p.name['ar'];
      const tag = p.tag[currentLang] || p.tag['ar'];
      const desc = p.description[currentLang] || p.description['ar'];

      return `
        <div class="executive-card card-shimmer hover-glow-emerald rounded-3xl p-7 border border-slate-200/90 flex flex-col justify-between group bg-white shadow-md transition-all duration-300 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 p-2 border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-emerald-300 transition-colors">
                <img src="${p.image}" alt="${name}" class="w-full h-full object-contain">
              </div>
              <div>
                <span class="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ${tag}
                </span>
                <h3 class="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">${name}</h3>
              </div>
            </div>
            <p class="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">${desc}</p>
          </div>
          <button onclick="openProjectModal(${idx})" class="w-full py-3 rounded-xl bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white border border-slate-200 hover:border-emerald-600 text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-sm group/btn">
            <span>${detailBtnText}</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-emerald-500 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"></i>
          </button>
        </div>
      `;
    }).join('');
  };

  window.renderProjects();
  window.openProjectModal = function(index) {
    const project = projectsData[index];
    if (!project) return;

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('details-modal-body');

    modalBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex items-center justify-center shadow-sm">
          <img src="${project.image}" alt="${project.name[currentLang]}" class="max-h-48 max-w-full object-contain rounded-2xl shadow-md">
        </div>
        <div>
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ${project.tag[currentLang]}
          </span>
          <h3 class="text-3xl font-black text-slate-900 mt-3 mb-4">${project.name[currentLang]}</h3>
          <p class="text-slate-600 text-base leading-relaxed mb-6">${project.description[currentLang]}</p>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 shadow-sm">
            <div class="text-xs text-slate-500 mb-1 font-semibold">${currentLang === 'ar' ? 'حالة المشروع' : 'Project Status'}</div>
            <div class="text-sm font-bold text-emerald-700 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              ${currentLang === 'ar' ? 'منجز ويعمل بكفاءة عالية في السوق السعودي' : 'Deployed and running successfully in production'}
            </div>
          </div>
          <button onclick="openConsultationForProduct('${project.name[currentLang]}')" class="w-full py-3 px-6 rounded-xl btn-primary-blue text-white font-bold text-sm transition-all text-center shadow-md">
            ${currentLang === 'ar' ? 'اطلب نظاماً برمجياً مماثلاً لمشروعك' : 'Request Similar System for Your Enterprise'}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('overflow-hidden');
  };
}

/* ==================== 6. SERVICES (BILINGUAL) ==================== */
const servicesData = {
  "epayment-solutions": {
    title: { ar: "حلول الدفع الإلكتروني", en: "E-Payment Solutions" },
    icon: "fa-credit-card",
    desc: {
      ar: "نقدم في 'خبراء تقنية المعلومات' حلول دفع إلكتروني آمنة ومتكاملة، تُمكّن الشركات والمتاجر من استقبال المدفوعات عبر الإنترنت بسهولة واحترافية.",
      en: "Secure, comprehensive payment gateway integration enabling Saudi enterprises to accept online transactions seamlessly."
    },
    features: {
      ar: [
        "دعم بوابات الدفع العالمية والمحلية (مدى، Visa، MasterCard، Apple Pay)",
        "تكامل سلس مع مواقع التجارة الإلكترونية وتطبيقات الهواتف",
        "تقارير تحليلية فورية ومفصلة للحركات المالية والتسويات",
        "نظام حماية قوي وتشفير متقدم لضمان أمان المعاملات المالية"
      ],
      en: [
        "Support for Mada, Apple Pay, Visa, and Mastercard gateways",
        "Frictionless integration with e-commerce stores and mobile apps",
        "Real-time financial reconciliation and transactional analytics",
        "PCI-DSS compliant encrypted payment pipelines"
      ]
    }
  },
  "custom-software-development": {
    title: { ar: "تطوير الأنظمة والبرمجيات حسب الطلب", en: "Custom Software Development" },
    icon: "fa-code",
    desc: {
      ar: "نطور حلولاً برمجية مخصصة تلبي احتياجات أعمالك بدقة متناهية. فريقنا يصمم ويبني أنظمة داخلية، وتطبيقات إدارة، ولوحات تحكم ذكية.",
      en: "Architecting bespoke enterprise software systems, internal management tools, and business intelligence dashboards tailored to unique workflows."
    },
    features: {
      ar: [
        "تحليل معمق لاحتياجات العمل وبناء هندسة برمجية قابلة للتوسع",
        "تصميم واجهات مستخدم حديثة وسهلة الاستخدام بأعلى المعايير",
        "دعم وصيانة مستمرة مع مواكبة أحدث التقنيات البرمجية",
        "مرونة عالية للتعديل وإضافة الخصائص مع نمو المنظمة"
      ],
      en: [
        "Deep requirement analysis and scalable software architecture",
        "Modern, intuitive UI/UX design adhering to international standards",
        "Long-term SLA maintenance and technology stack modernizations",
        "Elastic scalability supporting organizational growth"
      ]
    }
  },
  "automation-solutions": {
    title: { ar: "حلول الأتمتة والتحول الرقمي", en: "Workflow Automation Solutions" },
    icon: "fa-gears",
    desc: {
      ar: "نوفر حلول أتمتة متكاملة تهدف إلى تحسين الكفاءة التشغيلية وتقليل التكاليف من خلال تحويل المهام اليدوية الروتينية إلى عمليات رقمية مؤتمتة وسريعة.",
      en: "Automating repetitive workflows, customer service, and back-office operations to eliminate human error and slash operational expenses."
    },
    features: {
      ar: [
        "تصميم وهندسة تدفقات سير العمل الآلية Workflow",
        "أتمتة المهام المتكررة بدقة عالية لتفادي الأخطاء البشرية",
        "ربط الأنظمة والبرامج لتعمل بتزامن وتناغم انسيابي",
        "تقارير فورية ولوحات متابعة لتحليل وتحسين الأداء التشغيلي"
      ],
      en: [
        "Custom workflow design and intelligent process automation",
        "Error-free execution of high-volume repetitive tasks",
        "Seamless synchronization across ERP and CRM systems",
        "Live operational bottlenecks analytics and efficiency KPIs"
      ]
    }
  },
  "web-development": {
    title: { ar: "تصميم وتطوير المواقع والمنصات الإلكترونية", en: "Web & Portal Development" },
    icon: "fa-globe",
    desc: {
      ar: "نقدم خدمات تصميم مواقع احترافية تراعي تجربة المستخدم والهوية البصرية لعلامتك التجارية. من المواقع التعريفية إلى منصات الأعمال العملاقة.",
      en: "Engineering responsive, ultra-fast corporate websites and web portals reflecting distinct brand aesthetics with maximum SEO efficiency."
    },
    features: {
      ar: [
        "تصميم متجاوب وسريع متوافق مع كافة أحجام الشاشات والأجهزة",
        "لوحات تحكم ذكية وسهلة الاستخدام لإدارة المحتوى",
        "تهيئة متقدمة لمحركات البحث SEO وسرعة تحميل قياسية",
        "ربط متكامل مع بوابات الدفع الإلكتروني والنماذج التفاعلية"
      ],
      en: [
        "Mobile-first, lightning-fast design matching all screens",
        "Intuitive CMS administration dashboards",
        "Advanced technical SEO optimization and performance audits",
        "Integrated interactive forms and electronic payment flows"
      ]
    }
  },
  "system-integration": {
    title: { ar: "خدمات الربط والتكامل مع الأنظمة", en: "System Integration & APIs" },
    icon: "fa-network-wired",
    desc: {
      ar: "نساعدك على ربط الأنظمة المختلفة لتعمل كوحدة واحدة متجانسة، مما يوفر الوقت ويمنع تكرار البيانات ويقلل الأخطاء التشغيلية.",
      en: "Connecting disparate systems, legacy databases, and 3rd-party services into unified, synchronized data pipelines via robust APIs."
    },
    features: {
      ar: [
        "تكامل شامل بين أنظمة ERP، والمحاسبة، وإدارة علاقات العملاء CRM",
        "بناء وتطوير واجهات برمجة التطبيقات API المخصصة والآمنة",
        "تقارير موحدة ذكية تعكس صورة شاملة عن أداء المنظمة",
        "تقليل التكرار الإداري وزيادة الإنتاجية وكفاءة الموارد"
      ],
      en: [
        "End-to-end integration between ERP, CRM, and accounting engines",
        "Custom REST and GraphQL secure API development",
        "Unified business reporting and data lake synchronization",
        "Zero data duplication and optimized operational throughput"
      ]
    }
  },
  "e-learning": {
    title: { ar: "الأنظمة والمنصات التعليمية المتطورة", en: "E-Learning & LMS Systems" },
    icon: "fa-graduation-cap",
    desc: {
      ar: "نقدم منصات تعليمية إلكترونية مصممة لتوفير تجربة تعليم تفاعلية وسهلة الاستخدام تشمل الفصول الذكية، تسجيل الطلاب، والاختبارات الرقمية.",
      en: "Scalable Learning Management Systems (LMS) powering universities, training academies, and corporate continuous education programs."
    },
    features: {
      ar: [
        "تصميم مخصص للمؤسسات التعليمية والجامعات ومراكز التدريب",
        "دعم كامل للفيديوهات والوسائط المتعددة والبث الحي التفاعلي",
        "إدارة متقدمة للطلاب، الصفوف، المناهج، والشهادات الرقمية",
        "إمكانية التوسع لاستيعاب آلاف الطلاب المتزامنين بكل ثبات"
      ],
      en: [
        "Bespoke architectures for universities, schools, and academies",
        "Interactive virtual classrooms and rich multimedia streaming",
        "Student enrollment, grading, curriculum, and certificate automation",
        "Elastic concurrency scaling for thousands of active learners"
      ]
    }
  },
  "cybersecurity": {
    title: { ar: "الأمن السيبراني وحماية البيانات", en: "Cybersecurity & InfoSec" },
    icon: "fa-shield-halved",
    desc: {
      ar: "أمنك الرقمي أولويتنا القصوى. نقدم حلول أمن معلومات متكاملة تحمي بياناتك وبنيتك التحتية من الاختراقات والهجمات الإلكترونية وفق أعلى المعايير العالمية.",
      en: "Protecting enterprise digital assets, cloud servers, and proprietary data against zero-day exploits, breaches, and ransomware."
    },
    features: {
      ar: [
        "فحص الثغرات الأمنية واختبارات الاختراق وتقييم المخاطر",
        "حماية الشبكات، الخوادم السحابية، والأجهزة الطرفية",
        "مراقبة مستمرة وتنبيهات فورية ضد أي محاولات وصول مشبوهة",
        "توافق مع ضوابط الأمن السيبراني الوطنية ومعايير ISO العالمية"
      ],
      en: [
        "Vulnerability scanning, penetration testing, and threat audits",
        "Cloud perimeter defense, WAF setup, and endpoint protection",
        "24/7 SIEM monitoring and incident response alarms",
        "Alignment with Saudi NCA Essential Controls and ISO 27001"
      ]
    }
  },
  "mobile-app-development": {
    title: { ar: "تطوير تطبيقات الهواتف الذكية", en: "Mobile App Development" },
    icon: "fa-mobile-screen-button",
    desc: {
      ar: "تطبيقات عملية وسهلة الاستخدام. نطوّر تطبيقات جوال ذكية تعمل بكفاءة على نظامي iOS وAndroid وتلبي احتياجات السوق وتطلعات المستخدمين.",
      en: "Engineering cutting-edge mobile apps for iOS and Android, focusing on seamless interactions, speed, and business monetization."
    },
    features: {
      ar: [
        "تطوير تطبيقات أصلية Native وهجينة Hybrid بأحدث التقنيات",
        "واجهات استخدام سلسة وجذابة تعزز تفاعل وولاء المستخدمين",
        "ربط آمن بالخوادم وقواعد البيانات السحابية السريعة",
        "إشعارات وتنبيهات مدمجة ودعم المدفوعات وخدمات الموقع GPS"
      ],
      en: [
        "Native Swift/Kotlin and hybrid Flutter/React Native builds",
        "Delightful, friction-free UX engineered for high retention",
        "Encrypted cloud backend pairing and real-time syncing",
        "Push notifications, location telemetry, and Apple/Google Pay"
      ]
    }
  },
  "domain-hosting": {
    title: { ar: "تسجيل النطاق والاستضافة السحابية", en: "Domain & Cloud Hosting" },
    icon: "fa-server",
    desc: {
      ar: "كل ما تحتاجه لتكون حاضراً على الإنترنت بقوة وأمان. نوفر خدمات حجز النطاقات الاحترافية، واستضافة سحابية فائقة السرعة والموثوقية.",
      en: "Tier-3/Tier-4 cloud hosting solutions offering 99.9% uptime, daily redundant backups, and localized Saudi (.sa) domain registration."
    },
    features: {
      ar: [
        "حجز وإدارة النطاقات المحلية (.sa) والعالمية بكل يسر",
        "باقات استضافة سحابية مرنة مع نسبة توافر 99.9% Uptime",
        "نسخ احتياطي يومي تلقائي ومراقبة مستمرة على مدار الساعة",
        "شهادات أمان SSL وجدران حماية متقدمة ضد هجمات DDoS"
      ],
      en: [
        "Domain registration for Saudi (.sa) and global extensions",
        "Elastic scalable cloud servers with 99.9% SLA uptime",
        "Automated daily incremental backups and 24/7 telemetry",
        "Complimentary SSL certificates and multi-layered DDoS shields"
      ]
    }
  },
  "artificial-intelligence-solutions": {
    title: { ar: "حلول الذكاء الاصطناعي", en: "Artificial Intelligence & ML" },
    icon: "fa-brain",
    desc: {
      ar: "نقدم حلول الذكاء الاصطناعي المتطورة المصممة خصيصاً لعملك - بدءاً من نماذج التعلم الآلي وتحليلات البيانات الضخمة إلى الروبوتات الذكية والأنظمة التنبؤية.",
      en: "Harnessing deep learning, generative AI, and predictive models to unlock automated decision-making and operational excellence."
    },
    features: {
      ar: [
        "بناء روبوتات محادثة ذكية (Chatbots) تفاعلية لخدمة العملاء",
        "تحليلات تنبؤية للبيانات تدعم اتخاذ القرارات الاستراتيجية",
        "معالجة اللغات الطبيعية ورؤية الكمبيوتر الحاسوبية المتطورة",
        "أتمتة ذكية مدعومة بالذكاء الاصطناعي لرفع كفاءة العمليات"
      ],
      en: [
        "Domain-tuned conversational AI chatbots for customer support",
        "Predictive enterprise analytics and demand forecasting models",
        "Natural language processing (NLP) and computer vision solutions",
        "Smart automated decision engines reducing administrative load"
      ]
    }
  },
  "technical-arbitration-code-review": {
    title: { ar: "التحكيم الفني ومراجعة الأكواد", en: "Technical Arbitration & Code Audit" },
    icon: "fa-scale-balanced",
    desc: {
      ar: "نقدم خدمات تحكيم فني متخصصة لتقييم المشاريع البرمجية وفض النزاعات التقنية، إلى جانب مراجعة الأكواد لضمان الجودة والأمان وقابلية الصيانة.",
      en: "Expert independent code reviews, technical due diligence for M&A, and dispute arbitration for software contracts."
    },
    features: {
      ar: [
        "تقييم فني مستقل ومحايد للمشاريع والتعاقدات البرمجية",
        "مراجعة دقيقة للأكواد (Code Review) واكتشاف الثغرات والضعف",
        "إعداد تقارير خبرة فنية معتمدة لحل النزاعات البرمجية",
        "توصيات هندسية لتحسين جودة الهيكلية وقابلية التوسع"
      ],
      en: [
        "Impartial technical audits of contractual deliverables",
        "Deep static and dynamic code quality and vulnerability reviews",
        "Certified expert witness and arbitration reports for legal disputes",
        "Architecture refactoring roadmaps for maintainability"
      ]
    }
  },
  "technical-support-services": {
    title: { ar: "خدمات الدعم الفني والصيانة", en: "Technical Support & Maintenance" },
    icon: "fa-headset",
    desc: {
      ar: "فريق دعم فني متخصص لمساعدة المنظمات والأفراد في حل المشكلات التقنية المتعلقة بالأنظمة والبرمجيات والخوادم لضمان استمرارية الأعمال دون انقطاع.",
      en: "Dedicated 24/7 technical helpdesk, server maintenance, proactive infrastructure monitoring, and rapid emergency incident resolution."
    },
    features: {
      ar: [
        "دعم فني عن بُعد عبر القنوات المباشرة وسرعة استجابة فائقة",
        "صيانة وقائية دورية ومراقبة الأنظمة لمنع الأعطال مسبقاً",
        "إعداد وتركيب الأنظمة البرمجية وضبط إعدادات الخوادم",
        "إدارة الشبكات ومتابعة أداء البنية التحتية وحل اختناقات الاتصال"
      ],
      en: [
        "Remote enterprise helpdesk with rapid response SLAs",
        "Preventive system health checks preventing downtime",
        "Server provisioning, OS patch management, and migrations",
        "Network telemetry and latency bottleneck optimization"
      ]
    }
  }
};

function initServicesAccordion() {
  window.renderServices = function() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    const isAr = currentLang === 'ar';
    const detailBtnText = isAr ? 'تفاصيل الخدمة والمميزات' : 'Service Details & Specs';
    const arrowIcon = isAr ? 'fa-arrow-left' : 'fa-arrow-right';

    const keys = Object.keys(servicesData);
    container.innerHTML = keys.map(key => {
      const s = servicesData[key];
      const title = s.title[currentLang] || s.title['ar'];
      const desc = s.desc[currentLang] || s.desc['ar'];

      return `
        <div class="executive-card card-shimmer hover-glow-blue rounded-3xl p-7 flex flex-col justify-between group bg-white border border-slate-200/90 shadow-md transition-all duration-300 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 text-blue-600 flex items-center justify-center text-2xl mb-5 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <i class="fa-solid ${s.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">${title}</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">${desc}</p>
          </div>
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button onclick="openServiceModal('${key}')" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group/btn">
              <span>${detailBtnText}</span>
              <i class="fa-solid ${arrowIcon} text-[10px] group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform"></i>
            </button>
            <span class="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <i class="fa-solid fa-circle-check text-blue-500 text-[10px]"></i>
              ECIT Specialized
            </span>
          </div>
        </div>
      `;
    }).join('');
  };

  window.renderServices();
  window.openServiceModal = function(key) {
    const service = servicesData[key];
    if (!service) return;

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('details-modal-body');

    modalBody.innerHTML = `
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-200 shadow-sm">
            <i class="fa-solid ${service.icon}"></i>
          </div>
          <div>
            <span class="text-xs text-blue-600 font-bold">${currentLang === 'ar' ? 'خدمات خبراء تقنية المعلومات المعتمدة' : 'ECIT Certified Enterprise Services'}</span>
            <h3 class="text-2xl font-black text-slate-900">${service.title[currentLang]}</h3>
          </div>
        </div>

        <p class="text-slate-600 text-base leading-relaxed mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
          ${service.desc[currentLang]}
        </p>

        <div class="mb-8">
          <h4 class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="fa-solid fa-circle-check"></i>
            <span>${currentLang === 'ar' ? 'نطاق العمل والمخرجات المقدمة:' : 'Deliverables & Scope of Work:'}</span>
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${service.features[currentLang].map(f => `
              <div class="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm">
                <i class="fa-solid fa-check text-emerald-600 mt-1 flex-shrink-0"></i>
                <span class="text-sm text-slate-700 leading-snug font-medium">${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
          <button onclick="openConsultationForProduct('${service.title[currentLang]}')" class="flex-1 py-3.5 px-6 rounded-xl btn-primary-blue text-white font-bold text-sm shadow-md transition-all text-center">
            ${currentLang === 'ar' ? 'طلب استشارة وعرض سعر للخدمة' : 'Request Proposal & Pricing'}
          </button>
          <a href="https://wa.me/966501252878?text=${encodeURIComponent((currentLang === 'ar' ? 'السلام عليكم، أود استشارة حول: ' : 'Hello, I want consultation regarding: ') + service.title[currentLang])}" target="_blank" class="py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>${currentLang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp'}</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.classList.add('overflow-hidden');
  };
}

/* ==================== 7. MODAL HELPERS ==================== */
function initConsultationModal() {
  const modal = document.getElementById('details-modal');
  const closeBtn = document.getElementById('close-details-modal');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) {
        closeModal();
      }
      const chatbotWin = document.getElementById('chatbot-window');
      const chatbotBtn = document.getElementById('chatbot-toggle-btn');
      if (chatbotWin && chatbotWin.classList.contains('open')) {
        chatbotWin.classList.remove('open');
        if (chatbotBtn) {
          chatbotBtn.setAttribute('aria-expanded', 'false');
          chatbotBtn.focus();
        }
      }
      const drawer = document.getElementById('mobile-drawer');
      const mobileBtn = document.getElementById('mobile-menu-btn');
      if (drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        if (mobileBtn) {
          mobileBtn.setAttribute('aria-expanded', 'false');
          const icon = mobileBtn.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars-staggered text-base sm:text-lg';
          mobileBtn.focus();
        }
      }
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
}

/* ==================== EXECUTIVE TOAST NOTIFICATIONS (ENHANCED UX) ==================== */
function showExecutiveToast(msg, type = 'success') {
  let toast = document.getElementById('executive-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'executive-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  const isSuccess = type === 'success';
  toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto text-sm font-bold border backdrop-blur-md ${
    isSuccess ? 'bg-slate-900/95 text-emerald-400 border-emerald-500/50 shadow-emerald-500/20' : 'bg-slate-900/95 text-rose-400 border-rose-500/50 shadow-rose-500/20'
  }`;
  toast.innerHTML = `
    <i class="fa-solid ${isSuccess ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation text-rose-400'} text-lg"></i>
    <span class="text-white">${msg}</span>
  `;
  toast.style.opacity = '1';
  toast.style.transform = 'translate(-50%, 0)';

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -15px)';
    toast.classList.remove('pointer-events-auto');
  }, 4000);
}
window.showExecutiveToast = showExecutiveToast;

window.openConsultationForProduct = function(topic) {
  const modal = document.getElementById('details-modal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const msgInput = document.getElementById('form-message');
    if (msgInput) {
      msgInput.value = currentLang === 'ar' 
        ? `السلام عليكم، أود طلب استشارة وتفاصيل بخصوص: ${topic}` 
        : `Hello, I would like to request consultation regarding: ${topic}`;
      msgInput.focus();
    }
  }
};

/* ==================== 8. CONTACT FORM ==================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successBox = document.getElementById('form-success-box');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const address = document.getElementById('form-address').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showExecutiveToast(currentLang === 'ar' ? 'يرجى ملء كافة الحقول المطلوبة الإلزامية (*)' : 'Please fill all required fields (*)', 'error');
      return;
    }

    const whatsappText = `*${currentLang === 'ar' ? 'طلب استشارة تقنية جديدة عبر الموقع' : 'New Website Technical Consultation'}*\n\n*${currentLang === 'ar' ? 'الاسم' : 'Name'}:* ${name}\n*${currentLang === 'ar' ? 'البريد' : 'Email'}:* ${email}\n*${currentLang === 'ar' ? 'العنوان' : 'Location'}:* ${address || '-'}\n*${currentLang === 'ar' ? 'الرسالة' : 'Details'}:* ${message}`;
    const whatsappUrl = `https://wa.me/966501252878?text=${encodeURIComponent(whatsappText)}`;

    if (successBox) {
      successBox.classList.remove('hidden');
      showExecutiveToast(currentLang === 'ar' ? 'تم إرسال طلبك بنجاح! جاري تحويلك لمستشارنا...' : 'Consultation request sent! Redirecting to WhatsApp...', 'success');
      form.reset();
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    }
  });
}

/* ==================== 9. SMART AI CHATBOT (ABOVE WHATSAPP) ==================== */
function initChatbot() {
  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('close-chatbot-btn');
  const resetBtn = document.getElementById('reset-chatbot-btn');
  const messagesBox = document.getElementById('chatbot-messages');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');

  if (!toggleBtn || !windowEl || !messagesBox || !form || !input) return;

  function toggleChatbot() {
    const isOpen = windowEl.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      setTimeout(() => input.focus(), 150);
    }
  }

  toggleBtn.addEventListener('click', toggleChatbot);
  if (closeBtn) closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus();
  });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    messagesBox.innerHTML = '';
    renderWelcome();
  });

  function renderWelcome() {
    const isAr = currentLang === 'ar';
    const welcomeText = isAr 
      ? "أهلاً بك في شركة خبراء تقنية المعلومات (ECIT)! 👋 أنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم بخصوص خدماتنا أو منتجاتنا البرمجية؟"
      : "Welcome to Information Technology Experts Co. (ECIT)! 👋 I am your AI assistant. How can I help you today with our services or software platforms?";

    appendBotMessage(welcomeText);
    renderPills();
  }

  function renderPills() {
    const isAr = currentLang === 'ar';
    const pills = isAr ? [
      { text: "ما هي خدماتكم؟", query: "خدمات" },
      { text: "استعراض المنتجات", query: "منتجات" },
      { text: "طلب استشارة مع مهندس", query: "استشارة" },
      { text: "الموقع ورقم الهاتف", query: "تواصل" },
      { text: "رؤية السعودية 2030", query: "رؤية" }
    ] : [
      { text: "What services do you provide?", query: "services" },
      { text: "Explore ready products", query: "products" },
      { text: "Book an engineering consultation", query: "consultation" },
      { text: "Office location & phone", query: "contact" },
      { text: "Saudi Vision 2030", query: "vision" }
    ];

    const pillsDiv = document.createElement('div');
    pillsDiv.className = 'flex flex-wrap gap-1.5 my-2';
    pillsDiv.innerHTML = pills.map(p => `
      <button type="button" class="chat-quick-pill px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 shadow-sm transition-all">
        ${p.text}
      </button>
    `).join('');

    pillsDiv.querySelectorAll('.chat-quick-pill').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        handleUserInput(pills[idx].text);
      });
    });

    messagesBox.appendChild(pillsDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'flex justify-end mb-3';
    msg.innerHTML = `
      <div class="chat-bubble-user text-white text-xs sm:text-sm py-2.5 px-4 max-w-[85%] shadow-md">
        ${text}
      </div>
    `;
    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function appendBotMessage(html) {
    const msg = document.createElement('div');
    msg.className = 'flex justify-start mb-3 items-start gap-2';
    msg.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 mt-1">
        <i class="fa-solid fa-headset"></i>
      </div>
      <div class="chat-bubble-bot text-slate-700 text-xs sm:text-sm py-2.5 px-4 max-w-[85%] shadow-sm leading-relaxed">
        ${html}
      </div>
    `;
    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'typing-indicator-' + Date.now();
    const ind = document.createElement('div');
    ind.id = id;
    ind.className = 'flex justify-start mb-3 items-center gap-2';
    ind.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-xs flex-shrink-0">
        <i class="fa-solid fa-headset"></i>
      </div>
      <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 typing-dot"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 typing-dot"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500 typing-dot"></span>
      </div>
    `;
    messagesBox.appendChild(ind);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function handleUserInput(userText) {
    appendUserMessage(userText);
    const indId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(indId);
      const reply = generateSmartAnswer(userText.toLowerCase());
      appendBotMessage(reply);
    }, 700);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    handleUserInput(val);
  });

  window.updateChatbotLanguage = function() {
    messagesBox.innerHTML = '';
    renderWelcome();
  };

  renderWelcome();
}

function generateSmartAnswer(query) {
  const isAr = currentLang === 'ar';

  if (query.includes('حاضن') || query.includes('مسرع') || query.includes('hub') || query.includes('incubator') || query.includes('مكتب') || query.includes('قاع') || query.includes('office') || query.includes('room')) {
    return isAr
      ? `<strong>حاضنة ومسرّعة ECIT Hub:</strong><br>نقدم منظومة متكاملة لدعم رواد الأعمال تشمل:<br>• باقات احتضان مرنة ومسرّعات نمو.<br>• مكاتب مجهزة وقاعات اجتماعات ذكية في واجهة الأعمال بالرياض.<br>• محفظة ساعات استشارية متخصصة.<br>• إدراج المشاريع في غرفة الصفقات للتأهيل الاستثماري.<br><a href="#tracks" class="text-blue-600 underline font-bold mt-2 block">استكشف مسارات ECIT Hub بالتفصيل</a>`
      : `<strong>ECIT Hub Incubator & Accelerator:</strong><br>We provide a turnkey venture ecosystem including:<br>• Tailored incubation packages & acceleration tracks.<br>• Fully serviced offices & smart boardrooms in Riyadh Business Gate.<br>• Advisory Hours Wallet with certified specialists.<br>• Deal room access for investor syndication.<br><a href="#tracks" class="text-blue-600 underline font-bold mt-2 block">Explore ECIT Hub Tracks</a>`;
  }

  if (query.includes('استثمار') || query.includes('تمويل') || query.includes('صفق') || query.includes('invest') || query.includes('deal') || query.includes('fund')) {
    return isAr
      ? `<strong>غرفة الصفقات وبوابة المستثمرين:</strong><br>نربط الشركات الناشئة الجاهزة للاستثمار مع شبكة المستثمرين المعتمدين، مع توفير دراسات الجاهزية الاستثمارية وتوقيع اتفاقيات السرية (NDA) وإدارة جولات التمويل.<br><a href="#tracks" class="text-blue-600 underline font-bold mt-2 block">عرض تفاصيل بوابة الاستثمار</a>`
      : `<strong>Deal Pipeline & Investor Portal:</strong><br>We connect investment-ready ventures with our accredited investor network, providing investment readiness assessments, NDA management, and fundraising deal rooms.<br><a href="#tracks" class="text-blue-600 underline font-bold mt-2 block">View Investment Pipeline</a>`;
  }
  if (query.includes('خدم') || query.includes('service') || query.includes('offer')) {
    return isAr
      ? `نقدم في <strong>ECIT</strong> 12 خدمة برمجية متكاملة تشمل:<br>• تطوير البرمجيات والأنظمة المخصصة.<br>• تطوير تطبيقات الجوال (iOS / Android).<br>• بوابات وحلول الدفع الإلكتروني.<br>• حلول الأتمتة والربط والـ APIs.<br>• الأمن السيبراني واختبار الاختراق.<br>• الاستضافة السحابية والذكاء الاصطناعي.<br><a href="#services" class="text-blue-600 underline font-bold mt-2 block">تصفح الخدمات الـ 12 بالتفصيل</a>`
      : `At <strong>ECIT</strong>, we provide 12 specialized services including:<br>• Custom enterprise software.<br>• Mobile apps (iOS & Android).<br>• E-payment & Mada gateway integration.<br>• Workflow automation & APIs.<br>• Cybersecurity & code audits.<br>• Cloud hosting and AI solutions.<br><a href="#services" class="text-blue-600 underline font-bold mt-2 block">Explore all 12 services</a>`;
  }

  if (query.includes('منتج') || query.includes('product') || query.includes('platform') || query.includes('منص')) {
    return isAr
      ? `لدينا <strong>18 منتجاً ونظاماً برمجياً جاهزاً</strong> للإطلاق تشمل: منصة التغذية المدرسية، تطبيق صيانة السيارات، تطبيق لخدمات البناء، تطبيق لنقل الشحنات، منصة معايير التحول الرقمي، منصة إدارة اللجان، منصة المحاماة، ومتاجر متعددة البائعين.<br><a href="#products" class="text-blue-600 underline font-bold mt-2 block">عرض معرض الـ 18 منتجاً مع الصور</a>`
      : `We offer <strong>18 turnkey software products</strong> ready for customization: School Nutrition, Auto Maintenance, Construction Logistics, Digital Maturity Governance, Board Committees SaaS, Legal Practice, and Multi-Vendor E-Commerce.<br><a href="#products" class="text-blue-600 underline font-bold mt-2 block">Browse all 18 products</a>`;
  }

  if (query.includes('استشار') || query.includes('سعر') || query.includes('price') || query.includes('cost') || query.includes('consult')) {
    return isAr
      ? `يسرنا تقديم استشارة تقنية ودراسة فنية لمشروعك مجاناً! يمكنك تعبئة <a href="#contact" class="text-blue-600 underline font-bold">نموذج الاستشارة بالأسفل</a> أو التحدث مباشرة مع خبرائنا عبر الواتساب:<br><a href="https://wa.me/966501252878" target="_blank" class="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"><i class="fa-brands fa-whatsapp ml-1"></i> فتح محادثة واتساب فورية</a>`
      : `We are glad to offer a free technical consultation and project proposal! You can fill our <a href="#contact" class="text-blue-600 underline font-bold">contact form below</a> or chat immediately with our engineering leads via WhatsApp:<br><a href="https://wa.me/966501252878" target="_blank" class="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"><i class="fa-brands fa-whatsapp mr-1"></i> Chat on WhatsApp Now</a>`;
  }

  if (query.includes('موقع') || query.includes('عنوان') || query.includes('هاتف') || query.includes('رقم') || query.includes('location') || query.includes('address') || query.includes('contact')) {
    return isAr
      ? `<strong>مقر الشركة:</strong> واجهة الأعمال، طريق الملك فهد، مطار الملك خالد الدولي، الرياض.<br><strong>الهاتف / واتساب:</strong> +966501252878<br><strong>البريد:</strong> info@ecit.com.sa<br><a href="#contact" class="text-blue-600 underline font-bold mt-1 block">عرض الخريطة التفاعلية</a>`
      : `<strong>Headquarters:</strong> Business Gate, King Fahd Road, King Khalid Int'l Airport, Riyadh, Saudi Arabia.<br><strong>Phone/WhatsApp:</strong> +966501252878<br><strong>Email:</strong> info@ecit.com.sa<br><a href="#contact" class="text-blue-600 underline font-bold mt-1 block">View interactive map</a>`;
  }

  if (query.includes('رؤي') || query.includes('2030') || query.includes('vision')) {
    return isAr
      ? `نلتزم في <strong>شركة خبراء تقنية المعلومات</strong> بالتوافق الكامل مع رؤية المملكة 2030 من خلال دعم التحول الرقمي الحكومي والخاص، وتطبيق أعلى معايير الحوكمة والأمن السيبراني، وتمكين رواد الأعمال السعوديين بحلول تقنية وطنية منافسة عالمياً.`
      : `At <strong>ECIT</strong>, we are committed to the objectives of Saudi Vision 2030 by powering digital transformation across public and private sectors, implementing high-level cybersecurity, and equipping Saudi enterprises with world-class technology.`;
  }

  return isAr
    ? `شكراً لتواصلك! لمعرفة المزيد حول هذا الاستفسار ومناقشة تفاصيل مشروعك التقني، يسعدنا التحدث معك مباشرة عبر واتساب: <br><a href="https://wa.me/966501252878" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"><i class="fa-brands fa-whatsapp ml-1"></i> تواصل مع المستشار التقني (+966501252878)</a>`
    : `Thank you for reaching out! To discuss your project specifications directly with an engineering consultant, connect with us on WhatsApp: <br><a href="https://wa.me/966501252878" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"><i class="fa-brands fa-whatsapp mr-1"></i> WhatsApp Consultant (+966501252878)</a>`;
}

/* ==================== 10. BACK TO TOP ==================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==================== 11. RIYADH LIVE CLOCK (KSA TIMEZONE) ==================== */
function initRiyadhClock() {
  const clockEl = document.getElementById('riyadh-time');
  if (!clockEl) return;

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Riyadh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      clockEl.textContent = new Intl.DateTimeFormat(currentLang === 'ar' ? 'ar-SA' : 'en-US', options).format(now);
    } catch (e) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString();
    }
  }
  update();
  if (!window.riyadhClockInterval) {
    window.riyadhClockInterval = setInterval(update, 1000);
  }
}
window.initRiyadhClock = initRiyadhClock;
