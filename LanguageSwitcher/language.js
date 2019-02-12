//Variable to store translations
let Mlstrings = [
    {
        English: "Sausages",
        Polish: "Kiełbaski",
        German: "Würste",
        Russian: "Колбасные изделия", 
        Traditional: "香腸",
    },
    {
        English: "Carrot",
        Polish: "Marchewka",
        German: "Karotte",
        Russian: "Морковь",
        Traditional: "胡蘿蔔",
    }
];

let mlCodes = [
    {
        code: "bg",
        name: "Bulgarian",
    },
    {
        code: "zh",
        name: "Traditional",
    },
    {
        code: "zh",
        name: "Simplified",
    },
    {
        code: "cs",
        name: "Czech",
    },
    {
        code: "da",
        name: "Danish",
    },
    {
        code: "nl",
        name: "Dutch",
    },
    {
        code: "en",
        name: "English",
    },
    {
        code: "et",
        name: "Estonian",
    },
    
    {
        code: "de",
        name: "German",
    },
    {
        code: "el",
        name: "Greek",
    },
    
    {
        code: "hu",
        name: "Hungarian",
    },
    
    {
        code: "it",
        name: "Italian",
    },
    
    {
        code: "no",
        name: "Norwegian",
    },
    
    {
        code: "pl",
        name: "Polish",
    },
    
    {
        code: "pt",
        name: "Portuguese",
    },
    
    {
        code: "ro",
        name: "Romanian",
    },
    
    {
        code: "sk",
        name: "Slovak",
    },
    {
        code: "ru",
        name: "Russian",
    },
    
    {
        code: "es",
        name: "Spanish",
    },
    
    {
        code: "sv",
        name: "Swedish",
    }
];

let mlrLangInUse;
//This the destructuring object design in ES6
let mlr = function({
    dropID = "drop-down__Language",
    stringAttribute = "data-mlr-text",
    chosenLang = "English",
    mLstrings = MLstrings,
    countryCodes = false,
    countryCodeData = [],
} = {}) {
    //Variable to update the lang attribute in HTML
    const root = document.documentElement;
}

mlr({
    dropID: "drop-down__Language", //Id from the select element (the switcher)
    stringAttribute: "data-mlr-text", // Attribute that is going to be added to every element that has text inside
    choseLang: "English", //The initial language
    mLstrings: MLstrings, // Variable where translations are going to be stored
    countryCodes: true, //Optional boolean value to update the lang attribute in our HTML
    countryCodeData: mlCodes, // An array where is stored all language codes to update the lang attribute
});