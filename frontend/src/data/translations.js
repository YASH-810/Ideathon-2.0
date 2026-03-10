export const translations = {
    en: {
        welcome: "Hello! I’m ARIA, your banking assistant.",
        howCanIHelp: "How can I help you today?",
        welcomeUser: "Welcome",
        speechOn: "Speech: ON",
        speechOff: "Speech: OFF"
    },
    hi: {
        welcome: "नमस्ते! मैं ARIA हूँ, आपकी बैंकिंग सहायक।",
        howCanIHelp: "आज मैं आपकी कैसे मदद कर सकती हूँ?",
        welcomeUser: "स्वागत है",
        speechOn: "आवाज़: चालू",
        speechOff: "आवाज़: बंद"
    },
    mr: {
        welcome: "नमस्ते! मी ARIA आहे, तुमची बँकिंग सहाय्यक.",
        howCanIHelp: "मी आज तुम्हाला कशी मदत करू शकते?",
        welcomeUser: "सुस्वागतम",
        speechOn: "आवाज: चालू",
        speechOff: "आवाज: बंद"
    }
};

export const getText = (languageCode, key) => {
    const lang = translations[languageCode] ? languageCode : 'en';
    return translations[lang][key] || key;
};
