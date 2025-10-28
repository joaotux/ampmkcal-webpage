const translations = {
    'en-US': {
        'all-in-one': 'Built with love to help you live a healthier life',
        'hero-title': 'AmPmKcal puts you in control 24 hours a day.',
        'hero-subtitle': 'Manage your diet easily and practically.',
        'download-play-store': 'Download Play Store',
        'download-app-store': 'Download App Store',
        'what-is': 'What is AmPmKcal?',
        'about-description': 'AmPmKcal is the most reliable and easy-to-use solution on your mobile. Managing your diet has never been easier. A complete solution to help you achieve your goals.',
        'sales-manager': 'Calorie Control',
        'sales-description': 'Keep track of all your calories consumed and expended.',
        'digital-payment': 'Macronutrient Control',
        'payment-description': 'Easily and securely track your protein, carbohydrate and fat intake.',
        'ecommerce': 'Exercise Log',
        'ecommerce-description': 'Log all your physical activities and see how many calories you have burned.',
        'marketing': 'Weight Monitoring',
        'marketing-description': 'Track your weight and see your progress over time.',
        'ready': 'Ready to start your healthy journey?',
        'download-now': 'Download AmPmKcal now and take control of your health.',
        'useful-links': 'Useful Links',
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Use',
        'tutorials': 'Tutorials',
        'feedback': 'Feedback & Suggestion',
        'contact-us': 'Contact Us',
        'blog-footer': 'Blog',
        'newsletter-footer': 'Newsletter',
        'help-center': 'Help Center',
        'newsletter': 'Newsletter',
        'subscribe': 'Subscribe',
        'copyright': '© 2025 AmPmKcal. All rights reserved.',
    },
    'es-ES': {
        'all-in-one': 'Construido con amor para ayudarte a tener una vida más saludable',
        'hero-title': 'AmPmKcal te da el control las 24 horas del día.',
        'hero-subtitle': 'Gestiona tu dieta de forma fácil y práctica.',
        'download-play-store': 'Descargar Play Store',
        'download-app-store': 'Descargar App Store',
        'what-is': '¿Qué es AmPmKcal?',
        'about-description': 'AmPmKcal es la solución más fiable y fácil de usar en tu móvil. Gestionar tu dieta nunca ha sido tan fácil. Una solución completa para ayudarte a alcanzar tus objetivos.',
        'sales-manager': 'Control de Calorías',
        'sales-description': 'Lleva un registro de todas tus calorías consumidas y gastadas.',
        'digital-payment': 'Control de Macronutrientes',
        'payment-description': 'Rastrea de forma fácil y segura tu ingesta de proteínas, carbohidratos y grasas.',
        'ecommerce': 'Registro de Ejercicios',
        'ecommerce-description': 'Registra todas tus actividades físicas y ve cuántas calorías has quemado.',
        'marketing': 'Monitoreo de Peso',
        'marketing-description': 'Sigue tu peso y ve tu progreso a lo largo del tiempo.',
        'ready': '¿Listo para comenzar tu viaje saludable?',
        'download-now': 'Descarga AmPmKcal ahora y toma el control de tu salud.',
        'useful-links': 'Enlaces Útiles',
        'privacy': 'Política de Privacidad',
        'terms': 'Términos de Uso',
        'tutorials': 'Tutoriales',
        'feedback': 'Comentarios y Sugerencias',
        'contact-us': 'Contáctenos',
        'blog-footer': 'Blog',
        'newsletter-footer': 'Boletín',
        'help-center': 'Centro de Ayuda',
        'newsletter': 'Boletín',
        'subscribe': 'Suscribir',
        'copyright': '© 2025 AmPmKcal. Todos los derechos reservados.',
    },
    'pt-BR': {
        'all-in-one': 'AmPmKcal',
        'hero-title': 'AmPmKcal te deixa no controle 24 horas por dia',
        'hero-subtitle': 'Gerencie a sua dieta de uma forma fácil e prática.',
        'download-play-store': 'Download Play Store',
        'download-app-store': 'Download App Store',
        'what-is': 'O que é o AmPmKcal?',
        'about-description': 'O aplicativo AmPmKcal foi desenvolvido para ajudar você em todo o ciclo de controle da sua dieta, seja para perder peso, ganhar massa muscular ou simplesmente manter um estilo de vida saudável. Com uma interface intuitiva e recursos avançados, o AmPmKcal torna o gerenciamento da sua dieta mais fácil do que nunca.',
        'sales-manager': 'Controle de Calorias',
        'sales-description': 'Acompanhe todas as suas calorias consumidas e gastas.',
        'digital-payment': 'Controle de Macronutrientes',
        'payment-description': 'Acompanhe de forma fácil e segura sua ingestão de proteínas, carboidratos e gorduras.',
        'ecommerce': 'Registro de Exercícios',
        'ecommerce-description': 'Registre todas as suas atividades físicas e veja quantas calorias você queimou.',
        'marketing': 'Monitoramento de Peso',
        'marketing-description': 'Acompanhe seu peso e veja seu progresso ao longo do tempo.',
        'ready': 'Pronto para começar sua jornada saudável?',
        'download-now': 'Baixe o AmPmKcal agora e assuma o controle da sua saúde.',
        'useful-links': 'Links Úteis',
        'privacy': 'Política de Privacidade',
        'terms': 'Termos de Uso',
        'tutorials': 'Tutoriais',
        'feedback': 'Feedback e Sugestões',
        'contact-us': 'Contate-nos',
        'blog-footer': 'Blog',
        'newsletter-footer': 'Newsletter',
        'help-center': 'Central de Ajuda',
        'newsletter': 'Newsletter',
        'subscribe': 'Inscrever-se',
        'copyright': '© 2025 AmPmKcal. Todos os direitos reservados.',
    }
};

const languageIcons = {
    'pt-BR': 'assets/flag-brazil.svg',
    'en-US': 'assets/flag-us.svg',
    'es-ES': 'assets/flag-es.svg'
};

const languageNames = {
    'pt-BR': 'Português',
    'en-US': 'English',
    'es-ES': 'Español'
};

function changeLanguage(lang) {
    if (translations[lang]) {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        const langIcon = document.getElementById('lang-icon');
        const selectedLanguage = document.getElementById('selected-language');

        if (langIcon && languageIcons[lang]) {
            langIcon.src = languageIcons[lang];
            langIcon.alt = languageNames[lang];
        }
        if (selectedLanguage && languageNames[lang]) {
            selectedLanguage.innerText = languageNames[lang];
        }
    }
}

function addScrollAnimation() {
    const elements = document.querySelectorAll('.section-title, .section-description, .feature-card, .app-showcase');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'pt-BR';
    changeLanguage(savedLang);

    document.querySelectorAll('[data-lang-option]').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const lang = item.getAttribute('data-lang-option');
            changeLanguage(lang);
        });
    });

    addScrollAnimation();
});