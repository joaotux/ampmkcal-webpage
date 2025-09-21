/**
 * Internationalization (i18n) System
 * Handles language detection, switching, and content translation
 */

class I18n {
    constructor() {
        this.currentLanguage = 'pt-br';
        this.translations = {};
        this.fallbackLanguage = 'pt-br';
        
        // Supported languages with their display names and codes
        this.supportedLanguages = {
            'pt-br': { name: 'Português', flag: '🇧🇷', code: 'PT' },
            'en-us': { name: 'English', flag: '🇺🇸', code: 'EN' },
            'es-es': { name: 'Español', flag: '🇪🇸', code: 'ES' }
        };
        
        this.init();
    }
    
    async init() {
        // Detect user's preferred language
        this.currentLanguage = this.detectLanguage();
        
        // Load translations for all languages
        await this.loadAllTranslations();
        
        // Apply translations to the current page
        this.applyTranslations();
        
        // Update language selector
        this.updateLanguageSelector();
        
        // Update HTML lang attribute and meta tags
        this.updateDocumentLanguage();
    }
    
    /**
     * Detect user's preferred language based on:
     * 1. Saved preference in localStorage
     * 2. Browser language
     * 3. Fallback to default
     */
    detectLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages[savedLang]) {
            return savedLang;
        }
        
        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.toLowerCase();
        
        // Map browser languages to our supported languages
        const languageMap = {
            'pt': 'pt-br',
            'pt-br': 'pt-br',
            'pt-pt': 'pt-br',
            'en': 'en-us',
            'en-us': 'en-us',
            'en-gb': 'en-us',
            'es': 'es-es',
            'es-es': 'es-es',
            'es-mx': 'es-es',
            'es-ar': 'es-es'
        };
        
        // Try exact match first
        if (languageMap[langCode]) {
            return languageMap[langCode];
        }
        
        // Try language code without region
        const primaryLang = langCode.split('-')[0];
        if (languageMap[primaryLang]) {
            return languageMap[primaryLang];
        }
        
        // Default fallback
        return this.fallbackLanguage;
    }
    
    /**
     * Load all translation files
     */
    async loadAllTranslations() {
        const loadPromises = Object.keys(this.supportedLanguages).map(async (lang) => {
            try {
                const response = await fetch(`/i18n/${lang}.json`);
                if (response.ok) {
                    this.translations[lang] = await response.json();
                } else {
                    console.warn(`Failed to load translations for ${lang}`);
                }
            } catch (error) {
                console.error(`Error loading translations for ${lang}:`, error);
            }
        });
        
        await Promise.all(loadPromises);
    }
    
    /**
     * Get translated text for a given key
     */
    t(key, lang = null) {
        const targetLang = lang || this.currentLanguage;
        const translation = this.translations[targetLang];
        
        if (!translation) {
            return this.getNestedProperty(this.translations[this.fallbackLanguage], key) || key;
        }
        
        const value = this.getNestedProperty(translation, key);
        if (value !== undefined) {
            return value;
        }
        
        // Fallback to default language
        return this.getNestedProperty(this.translations[this.fallbackLanguage], key) || key;
    }
    
    /**
     * Get nested property from object using dot notation
     */
    getNestedProperty(obj, key) {
        return key.split('.').reduce((current, prop) => {
            return current && current[prop] !== undefined ? current[prop] : undefined;
        }, obj);
    }
    
    /**
     * Apply translations to all elements with data-i18n attribute
     */
    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                // Handle different element types
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                    element.placeholder = translation;
                } else if (element.tagName === 'META') {
                    element.content = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update page title
        const titleKey = document.querySelector('title[data-i18n]')?.getAttribute('data-i18n');
        if (titleKey) {
            document.title = this.t(titleKey);
        }
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
        if (metaDesc) {
            const descKey = metaDesc.getAttribute('data-i18n');
            metaDesc.content = this.t(descKey);
        }
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"][data-i18n]');
        if (ogTitle) {
            const titleKey = ogTitle.getAttribute('data-i18n');
            ogTitle.content = this.t(titleKey);
        }
        
        const ogDesc = document.querySelector('meta[property="og:description"][data-i18n]');
        if (ogDesc) {
            const descKey = ogDesc.getAttribute('data-i18n');
            ogDesc.content = this.t(descKey);
        }
        
        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[property="twitter:title"][data-i18n]');
        if (twitterTitle) {
            const titleKey = twitterTitle.getAttribute('data-i18n');
            twitterTitle.content = this.t(titleKey);
        }
        
        const twitterDesc = document.querySelector('meta[property="twitter:description"][data-i18n]');
        if (twitterDesc) {
            const descKey = twitterDesc.getAttribute('data-i18n');
            twitterDesc.content = this.t(descKey);
        }
    }
    
    /**
     * Update the language selector button text
     */
    updateLanguageSelector() {
        const currentLangElement = document.getElementById('currentLang');
        if (currentLangElement && this.supportedLanguages[this.currentLanguage]) {
            currentLangElement.textContent = this.supportedLanguages[this.currentLanguage].code;
        }
    }
    
    /**
     * Update document language attributes
     */
    updateDocumentLanguage() {
        const html = document.documentElement;
        const translation = this.translations[this.currentLanguage];
        
        if (translation && translation.meta && translation.meta.lang) {
            html.setAttribute('lang', translation.meta.lang);
        }
    }
    
    /**
     * Change language
     */
    async setLanguage(lang) {
        if (!this.supportedLanguages[lang]) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }
        
        this.currentLanguage = lang;
        
        // Save preference
        localStorage.setItem('preferred-language', lang);
        
        // Apply translations
        this.applyTranslations();
        
        // Update language selector
        this.updateLanguageSelector();
        
        // Update document language
        this.updateDocumentLanguage();
        
        // Emit custom event for other components to react
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }
    
    /**
     * Get current language
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Get all supported languages
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
}

// Create global i18n instance
window.i18n = new I18n();
