/* =============================================================
   FRANCK SOLUCIONES IT — main.js
   v2.1 | Mobile menu · Scroll observer · FAQ · Lang toggle · Chatbot · Theme · Back to Top
============================================================= */

// ============================================================
// 1. MOBILE MENU
// ============================================================
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose)  navClose.addEventListener('click',  () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

// ============================================================
// 2. SCROLL ANIMATION (Intersection Observer)
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show-section');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.hidden-section').forEach(el => observer.observe(el));

// ============================================================
// 3. FAQ ACCORDION
// ============================================================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item   = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ============================================================
// 4. CONTACT FORM — Formspree AJAX
// ============================================================
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Enviando...';
        btn.disabled = true;

        const data = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                setTimeout(() => formSuccess.classList.add('hidden'), 5000);
            } else {
                alert('Hubo un error al enviar el formulario.');
            }
        } catch (error) {
            alert('Error de red. Por favor intenta por WhatsApp.');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// ============================================================
// 5. BILINGUAL SYSTEM (ES/EN) - Pure JS
// STRICT ASCII UNICODE ESCAPES TO PREVENT ENCODING CORRUPTION
// ============================================================
const translations = {
    es: {
        "meta.title": "Franck Soluciones | M\u00E1s clientes para tu negocio",
        
        "nav.home": "Inicio",
        "nav.services": "Servicios",
        "nav.portfolio": "Portfolio",
        "nav.testimonials": "Testimonios",
        "nav.cta": "Conseguir Clientes",

        "hero.badge": "Presencia digital que trae resultados",
        "hero.title": "\u00BFTu negocio todav\u00EDa<br><span class=\"gradient-text\">no aparece online?</span>",
        "hero.desc": "Ayudo a peque\u00F1os negocios y marcas personales a conseguir m\u00E1s clientes con una presencia digital profesional.<br>Sin costos fijos mensuales. El c\u00F3digo es 100% tuyo.",
        "hero.cta1": "<i class=\"ph ph-whatsapp-logo\"></i> Quiero m\u00E1s clientes",
        "hero.cta2": "Ver soluciones",

        "stats.projects": "Proyectos en producci\u00F3n",
        "stats.ownership": "C\u00F3digo tuyo, sin alquiler",
        "stats.delivery": "Tiempo m\u00E1ximo de entrega",
        "stats.fixed": "Costos fijos mensuales",

        "services.title": "Soluciones que <span class=\"accent\">consiguen clientes</span>",
        "services.subtitle": "No vendo plantillas. Construyo activos digitales que funcionan.",
        "pkg.from": "Desde",
        "pkg.popular": "M\u00E1s elegido",
        "pkg.cta": "Consultar ahora \u2192",

        "pkg1.name": "Presencia R\u00E1pida",
        "pkg1.f1": "Landing page profesional",
        "pkg1.f2": "Bot\u00F3n de WhatsApp integrado",
        "pkg1.f3": "Dise\u00F1o Mobile First",
        "pkg1.f4": "Entrega en 3\u20137 d\u00EDas h\u00E1biles",
        "pkg1.ideal": "Ideal para negocios sin presencia web",

        "pkg2.name": "Sitio Profesional",
        "pkg2.f1": "Sitio web completo (multi-secci\u00F3n)",
        "pkg2.f2": "Formulario de contacto",
        "pkg2.f3": "SEO b\u00E1sico incluido",
        "pkg2.f4": "Dise\u00F1o personalizado",
        "pkg2.f5": "Entrega en 7\u201315 d\u00EDas h\u00E1biles",
        "pkg2.ideal": "Ideal para marcas que quieren crecer",

        "pkg3.name": "Soluci\u00F3n Avanzada",
        "pkg3.f1": "E-commerce o sistema a medida",
        "pkg3.f2": "Automatizaciones e integraciones",
        "pkg3.f3": "Chatbots e IA aplicada",
        "pkg3.f4": "Soporte post-entrega incluido",
        "pkg3.f5": "Tiempos seg\u00FAn an\u00E1lisis",
        "pkg3.ideal": "Ideal para negocios que quieren escalar",

        "how.title": "\u00BFC\u00F3mo <span class=\"accent\">funciona?</span>",
        "how.subtitle": "Simple, r\u00E1pido y sin sorpresas.",
        "how.s1.title": "Me cont\u00E1s tu idea",
        "how.s1.desc": "Por WhatsApp o formulario. Sin tecnicismos. Solo contame qu\u00E9 necesit\u00E1s y qu\u00E9 objetivo ten\u00E9s.",
        "how.s2.title": "Dise\u00F1amos y desarrollamos",
        "how.s2.desc": "Trabajamos en tiempo r\u00E9cord con revisiones incluidas hasta que quedes conforme.",
        "how.s3.title": "Publicamos y empez\u00E1s",
        "how.s3.desc": "Tu sitio queda en l\u00EDnea y te ense\u00F1o a manejarlo. El c\u00F3digo es tuyo para siempre.",
        "how.cta": "<i class=\"ph ph-whatsapp-logo\"></i> Empecemos hoy",

        "portfolio.title": "Resultados <span class=\"accent\">reales</span>",
        "portfolio.subtitle": "Proyectos desplegados en producci\u00F3n \u2014 sitios reales con clientes reales.",
        "portfolio.view": "Ver proyecto",
        "p1.desc": "Cat\u00E1logo mayorista online",
        "p2.desc": "Cat\u00E1logo \u00F3ptico con pedidos online",
        "p3.desc": "Tienda con carrito a WhatsApp",
        "p4.desc": "Web institucional y captaci\u00F3n de clientes",
        "p5.desc": "Sitio promocional y captaci\u00F3n local",
        "p6.desc": "Web de gesti\u00F3n de turnos para terapeutas",
        
        "portfolio.systems": "Sistemas Internos (Web Apps)",
        "sys.exclusive": "Exclusivo",
        "sys1.desc": "Ecosistema para terapeutas",
        "sys2.name": "Gesti\u00F3n de Compras",
        "sys2.title": "Sistema de Stock",
        "sys2.desc": "Control de inventario y pedidos.",
        "sys3.name": "Control Matafuegos",
        "sys3.title": "Seguridad Industrial",
        "sys3.desc": "Auditor\u00EDa de vencimientos y alertas.",
        "sys4.name": "Pedidos Viandas",
        "sys4.title": "Log\u00EDstica Gastron\u00F3mica",
        "sys4.desc": "Gesti\u00F3n de pedidos diarios.",

        "testi.title": "Lo que dicen <span class=\"accent\">mis clientes</span>",
        "testi.subtitle": "Resultados reales de negocios reales.",
        "t1.text": "\"Antes no ten\u00EDamos presencia online. Ahora recibimos consultas todos los d\u00EDas.\"",
        "t1.name": "Sandra M.",
        "t1.role": "Sala Distribuciones",
        "t2.text": "\"El sitio qued\u00F3 espectacular y lo entreg\u00F3 en menos de una semana. Totalmente recomendable.\"",
        "t2.name": "Roberto G.",
        "t2.role": "Transporte Nu\u00F1ez",
        "t3.text": "\"Muy profesional. Ahora mis clientes pueden encontrarme y reservar turnos sin llamar.\"",
        "t3.name": "Florencia P.",
        "t3.role": "Franck Terapias Hol\u00EDsticas",

        "adv.title": "Por qu\u00E9 <span class=\"gradient-text\">trabajar conmigo</span>",
        "adv.desc": "No soy una agencia con costos fijos. Soy un desarrollador especializado que trabaja directamente con vos.",
        "adv.cta": "Hablemos de tu proyecto <i class=\"ph ph-arrow-right\"></i>",
        "adv.a1.title": "Ultrarr\u00E1pido",
        "adv.a1.desc": "HTML/CSS/JS puro. Sin plugins, sin lentitud.",
        "adv.a2.title": "Sin costos fijos",
        "adv.a2.desc": "No pag\u00E1s servidor mensual. El sitio es tuyo.",
        "adv.a3.title": "Trato directo",
        "adv.a3.desc": "Habl\u00E1s directamente con el desarrollador.",
        "adv.a4.title": "Mobile First",
        "adv.a4.desc": "Dise\u00F1o adaptativo real y comprobado.",

        "faq.title": "Preguntas <span class=\"accent\">frecuentes</span>",
        "faq.q1": "\u00BFCu\u00E1nto cuesta un sitio web?",
        "faq.a1": "Los precios arrancan desde USD 100 para una landing b\u00E1sica. Cada proyecto es diferente y el precio final depende de lo que realmente necesit\u00E1s.",
        "faq.q2": "\u00BFNecesito saber de tecnolog\u00EDa?",
        "faq.a2": "Para nada. Solo ten\u00E9s que contarme qu\u00E9 hac\u00E9s y qu\u00E9 quer\u00E9s lograr. Yo me encargo de todo lo t\u00E9cnico.",
        "faq.q3": "\u00BFEl c\u00F3digo va a ser m\u00EDo?",
        "faq.a3": "100% s\u00ED. Una vez que entregamos el proyecto, el c\u00F3digo es tuyo. Sin alquiler ni dependencias.",
        "faq.q4": "\u00BFEn cu\u00E1nto tiempo est\u00E1 listo?",
        "faq.a4": "Una landing b\u00E1sica puede estar en 3\u20137 d\u00EDas. Un sitio profesional en 7\u201315 d\u00EDas.",
        "faq.q5": "\u00BFQu\u00E9 pasa despu\u00E9s de la entrega?",
        "faq.a5": "Te ense\u00F1o a manejar tu sitio. Y si necesit\u00E1s cambios a futuro, estoy disponible.",

        "contact.title": "\u00BFListo para que tu negocio consiga <span class=\"gradient-text\">m\u00E1s clientes?</span>",
        "contact.subtitle": "Sin intermediarios. Habl\u00E1s directo con el desarrollador.",
        "contact.wa1": "Escribirme ahora",
        "contact.wa2": "Respondo en menos de 24hs",
        "contact.or": "\u2014 o complet\u00E1 el formulario \u2014",

        "form.name": "Tu nombre",
        "form.email": "Tu email",
        "form.business": "\u00BFA qu\u00E9 se dedica tu negocio?",
        "form.message": "\u00BFQu\u00E9 necesit\u00E1s?",
        "form.submit": "<i class=\"ph ph-paper-plane-tilt\"></i> Enviar consulta",
        "form.success": "\u2713 Mensaje enviado! Te respondo pronto.",

        "chat.online": "En l\u00EDnea",
        "footer.location": "Desde Mendoza, Argentina, para el mundo."
    },
    en: {
        "meta.title": "Franck Soluciones | More clients for your business",
        
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.portfolio": "Portfolio",
        "nav.testimonials": "Testimonials",
        "nav.cta": "Get Clients",

        "hero.badge": "Digital presence that brings results",
        "hero.title": "Is your business still<br><span class=\"gradient-text\">invisible online?</span>",
        "hero.desc": "I help small businesses and personal brands get more clients with a professional digital presence.<br>No monthly fees. You own 100% of the code.",
        "hero.cta1": "<i class=\"ph ph-whatsapp-logo\"></i> I want more clients",
        "hero.cta2": "View solutions",

        "stats.projects": "Live projects",
        "stats.ownership": "Your code, no renting",
        "stats.delivery": "Maximum delivery time",
        "stats.fixed": "Fixed monthly costs",

        "services.title": "Solutions that <span class=\"accent\">get clients</span>",
        "services.subtitle": "I don't sell templates. I build digital assets that work.",
        "pkg.from": "From",
        "pkg.popular": "Most Popular",
        "pkg.cta": "Contact me \u2192",

        "pkg1.name": "Quick Presence",
        "pkg1.f1": "Professional landing page",
        "pkg1.f2": "Integrated WhatsApp button",
        "pkg1.f3": "Mobile First design",
        "pkg1.f4": "Delivery in 3\u20137 business days",
        "pkg1.ideal": "Ideal for businesses with no web presence",

        "pkg2.name": "Professional Site",
        "pkg2.f1": "Complete multi-page website",
        "pkg2.f2": "Custom contact form",
        "pkg2.f3": "Basic SEO included",
        "pkg2.f4": "Custom UI design",
        "pkg2.f5": "Delivery in 7\u201315 business days",
        "pkg2.ideal": "Ideal for brands wanting to grow",

        "pkg3.name": "Advanced Solution",
        "pkg3.f1": "E-commerce or custom system",
        "pkg3.f2": "Automations & integrations",
        "pkg3.f3": "Chatbots & AI applied",
        "pkg3.f4": "Post-delivery support included",
        "pkg3.f5": "Timeframes based on scope",
        "pkg3.ideal": "Ideal for scaling businesses",

        "how.title": "How it <span class=\"accent\">works</span>",
        "how.subtitle": "Simple, fast, and no surprises.",
        "how.s1.title": "Tell me your idea",
        "how.s1.desc": "Via WhatsApp or form. No technical jargon. Just tell me what you need and your goal.",
        "how.s2.title": "Design & Development",
        "how.s2.desc": "We work in record time with revisions included until you're satisfied.",
        "how.s3.title": "Launch & Get Clients",
        "how.s3.desc": "Your site goes live and I teach you how to use it. The code is yours forever.",
        "how.cta": "<i class=\"ph ph-whatsapp-logo\"></i> Start today",

        "portfolio.title": "Real <span class=\"accent\">results</span>",
        "portfolio.subtitle": "Projects in production \u2014 real sites with real clients.",
        "portfolio.view": "View project",
        "p1.desc": "Online wholesale catalog",
        "p2.desc": "Optical catalog with online orders",
        "p3.desc": "Shop with WhatsApp cart",
        "p4.desc": "Corporate web & lead capture",
        "p5.desc": "Promotional site & local capture",
        "p6.desc": "Appointment management for therapists",
        
        "portfolio.systems": "Internal Systems (Web Apps)",
        "sys.exclusive": "Exclusive",
        "sys1.desc": "Ecosystem for therapists",
        "sys2.name": "Purchase Management",
        "sys2.title": "Stock System",
        "sys2.desc": "Inventory and order control.",
        "sys3.name": "Extinguisher Control",
        "sys3.title": "Industrial Safety",
        "sys3.desc": "Expiration audits & alerts.",
        "sys4.name": "Meal Orders",
        "sys4.title": "Food Logistics",
        "sys4.desc": "Daily order management.",

        "testi.title": "What my <span class=\"accent\">clients say</span>",
        "testi.subtitle": "Real results from real businesses.",
        "t1.text": "\"We had no online presence before. Now we get inquiries every single day.\"",
        "t1.name": "Sandra M.",
        "t1.role": "Sala Distribuciones",
        "t2.text": "\"The site turned out amazing and was delivered in under a week. Highly recommended.\"",
        "t2.name": "Roberto G.",
        "t2.role": "Transporte Nu\u00F1ez",
        "t3.text": "\"Very professional. Now my clients can find me and book appointments without calling.\"",
        "t3.name": "Florencia P.",
        "t3.role": "Franck Terapias Hol\u00EDsticas",

        "adv.title": "Why <span class=\"gradient-text\">work with me</span>",
        "adv.desc": "I'm not an agency with huge overhead. I'm a specialized developer working directly with you.",
        "adv.cta": "Let's talk about your project <i class=\"ph ph-arrow-right\"></i>",
        "adv.a1.title": "Ultra-fast",
        "adv.a1.desc": "Pure HTML/CSS/JS. No bloated plugins.",
        "adv.a2.title": "No fixed costs",
        "adv.a2.desc": "You don't pay monthly server fees.",
        "adv.a3.title": "Direct contact",
        "adv.a3.desc": "You speak directly with the developer.",
        "adv.a4.title": "Mobile First",
        "adv.a4.desc": "Real, tested responsive design.",

        "faq.title": "Frequently <span class=\"accent\">Asked Questions</span>",
        "faq.q1": "How much does a website cost?",
        "faq.a1": "Prices start at USD 100 for a basic landing page. Every project is different and we adapt to your needs.",
        "faq.q2": "Do I need technical knowledge?",
        "faq.a2": "Not at all. Just tell me what your business does and your goals. I handle all the tech.",
        "faq.q3": "Will I own the code?",
        "faq.a3": "100% yes. Once delivered, the code is entirely yours. No renting, no lock-in.",
        "faq.q4": "How long does it take?",
        "faq.a4": "A basic landing can take 3\u20137 days. A professional site takes 7\u201315 days.",
        "faq.q5": "What happens after delivery?",
        "faq.a5": "I teach you how to use your site. If you need changes later, I am available.",

        "contact.title": "Ready for your business to get <span class=\"gradient-text\">more clients?</span>",
        "contact.subtitle": "No middlemen. Talk directly to the developer.",
        "contact.wa1": "Message me now",
        "contact.wa2": "I reply in under 24hrs",
        "contact.or": "\u2014 or fill out the form \u2014",

        "form.name": "Your name",
        "form.email": "Your email",
        "form.business": "What does your business do?",
        "form.message": "What do you need?",
        "form.submit": "<i class=\"ph ph-paper-plane-tilt\"></i> Send inquiry",
        "form.success": "\u2713 Message sent! I'll reply soon.",

        "chat.online": "Online",
        "footer.location": "From Mendoza, Argentina, to the world."
    }
};

let currentLang = 'es';

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        } else {
            console.warn('Missing translation for key:', key);
        }
    });
    document.getElementById('lang-label').innerText = lang === 'es' ? 'EN' : 'ES';
    document.title = translations[lang]["meta.title"];
    
    // Switch html lang attribute
    document.getElementById('html-root').setAttribute('lang', lang);
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyLanguage(currentLang);

    // Keep FAQ closed after language switch
    document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
    });

    // Reset chatbot to new language if it was already started
    if (chatStarted) {
        chatMsgs.innerHTML = '';
        chatOptions.innerHTML = '';
        setTimeout(() => renderChatStep('start'), 200);
    }
});

// ============================================================
// 6. BUILT-IN CHATBOT WIDGET
// ============================================================
const chatToggle   = document.getElementById('chatbot-toggle');
const chatBox      = document.getElementById('chatbot-box');
const iconOpen     = document.getElementById('chatbot-icon-open');
const iconClose    = document.getElementById('chatbot-icon-close');
const chatMsgs     = document.getElementById('chatbot-messages');
const chatOptions  = document.getElementById('chatbot-options');

let chatStarted = false;

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');

    if (!chatBox.classList.contains('hidden') && !chatStarted) {
        chatStarted = true;
        renderChatStep('start');
    }
});

// Chat flows separated by language
const CHATBOT_FLOW = {
    es: {
        start: {
            text: "\u00A1Hola! \uD83D\uDC4B Soy Franck. \u00BFEn qu\u00E9 te puedo ayudar hoy?",
            options: [
                { text: "\uD83D\uDCB0 Ver precios", next: "precios" },
                { text: "\u23F1\uFE0F Tiempos de entrega", next: "tiempos" },
                { text: "\uD83D\uDDE3\uFE0F Hablar con Franck", next: "hablar" }
            ]
        },
        precios: {
            text: "Dise\u00F1o a medida (sin plantillas) desde USD 100 hasta sistemas complejos de USD 500+. El c\u00F3digo fuente es 100% tuyo.",
            options: [
                { text: "\uD83D\uDDE3\uFE0F Hablar del proyecto", next: "hablar" },
                { text: "\u2B05\uFE0F Volver a inicio", next: "start" }
            ]
        },
        tiempos: {
            text: "Una landing est\u00E1 lista en 3-7 d\u00EDas y sitios completos o tiendas en 7-15 d\u00EDas. Todo ultrarr\u00E1pido y optimizado.",
            options: [
                { text: "\uD83D\uDDE3\uFE0F Hablar del proyecto", next: "hablar" },
                { text: "\u2B05\uFE0F Volver a inicio", next: "start" }
            ]
        },
        hablar: {
            text: "\u00A1Genial! Escribime directo por WhatsApp o complet\u00E1 el formulario y te respondo ya mismo.",
            options: [
                { text: "\uD83D\uDCF2 Ir a WhatsApp \u2192", action: () => window.open('https://wa.me/5492615717954', '_blank') },
                { text: "\uD83D\uDCEE Usar formulario \u2193", action: () => { 
                    chatBox.classList.add('hidden'); 
                    iconOpen.classList.remove('hidden'); 
                    iconClose.classList.add('hidden'); 
                    document.getElementById('contacto').scrollIntoView({behavior: 'smooth'}); 
                }}
            ]
        }
    },
    en: {
        start: {
            text: "Hi! \uD83D\uDC4B I'm Franck. How can I help you today?",
            options: [
                { text: "\uD83D\uDCB0 View pricing", next: "precios" },
                { text: "\u23F1\uFE0F Delivery times", next: "tiempos" },
                { text: "\uD83D\uDDE3\uFE0F Talk to Franck", next: "hablar" }
            ]
        },
        precios: {
            text: "Custom design (no templates) starting from USD 100 up to complex systems of USD 500+. You own 100% of the source code.",
            options: [
                { text: "\uD83D\uDDE3\uFE0F Talk about my project", next: "hablar" },
                { text: "\u2B05\uFE0F Back to start", next: "start" }
            ]
        },
        tiempos: {
            text: "Landing pages take 3-7 days, full sites and stores take 7-15 days. Everything is lightning fast.",
            options: [
                { text: "\uD83D\uDDE3\uFE0F Talk about my project", next: "hablar" },
                { text: "\u2B05\uFE0F Back to start", next: "start" }
            ]
        },
        hablar: {
            text: "Awesome! Message me on WhatsApp or fill out the form below and I'll reply ASAP.",
            options: [
                { text: "\uD83D\uDCF2 Go to WhatsApp \u2192", action: () => window.open('https://wa.me/5492615717954', '_blank') },
                { text: "\uD83D\uDCEE Use form \u2193", action: () => { 
                    chatBox.classList.add('hidden'); 
                    iconOpen.classList.remove('hidden'); 
                    iconClose.classList.add('hidden'); 
                    document.getElementById('contacto').scrollIntoView({behavior: 'smooth'}); 
                }}
            ]
        }
    }
};

function renderChatStep(stepId) {
    const flow = CHATBOT_FLOW[currentLang][stepId];
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bot-msg';
    msgDiv.innerText = flow.text;
    chatMsgs.appendChild(msgDiv);
    
    // Clear old options
    chatOptions.innerHTML = '';
    
    flow.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.onclick = () => {
            // Echo user choice
            const userDiv = document.createElement('div');
            userDiv.className = 'user-msg';
            userDiv.innerText = opt.text;
            chatMsgs.appendChild(userDiv);
            
            chatOptions.innerHTML = ''; // hide options while typing

            if (opt.next) {
                // simulate typing delay
                setTimeout(() => renderChatStep(opt.next), 600);
            } else if (opt.action) {
                opt.action();
            }
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
        };
        chatOptions.appendChild(btn);
    });

    chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

// ============================================================
// 7. THEME TOGGLE (Oscuro / Claro)
// ============================================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const htmlRoot    = document.getElementById('html-root');

function applyTheme(theme) {
    if (theme === 'light') {
        htmlRoot.setAttribute('data-theme', 'light');
        themeIcon.className = 'ph ph-sun';
        themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    } else {
        htmlRoot.removeAttribute('data-theme');
        themeIcon.className = 'ph ph-moon';
        themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    }
}

// Leer preferencia guardada (o por defecto oscuro)
const savedTheme = localStorage.getItem('franck-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('franck-theme', newTheme);
});

// ============================================================
// 8. BACK TO TOP
// ============================================================
const btnBackTop = document.getElementById('btn-back-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnBackTop.classList.add('visible');
    } else {
        btnBackTop.classList.remove('visible');
    }
});

btnBackTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
