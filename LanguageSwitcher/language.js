//Variable to store translations
let MLstrings = [
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
//Variable to store the initia language
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
    //Get array of laguage names from the MLstring object
    let listOfLanguages = Object.keys(mLstrings[0]);
    //Set initial language 
    mlrLangInUse = chosenLang;
    //Function to get the options values and inject them in our HTML
    (function createMLDrop() {
        //Our select element
        let mbPOCControlsLangDrop = document.getElementById(dropID);
        //Reset the select
        mbPOCControlsLangDrop.innerHTML = '';
        //Creation and injection of our ooptions
        listOfLanguages.forEach((lang, index) => {
            const HTMLoption = document.createElement('option');
            HTMLoption.value = lang;
            HTMLoption.textContent = lang;
            mbPOCControlsLangDrop.appendChild(HTMLoption);
            if (lang === chosenLang) {
                mbPOCControlsLangDrop.value = lang;
            }
        });

        //Change event listener in our select element
        mbPOCControlsLangDrop.addEventListener('change', function(e) {
            //Change mlrLang variable to the selected laguage
            mlrLangInUse = mbPOCControlsLangDrop[mbPOCControlsLangDrop.selectedIndex].value;
            resolveAllMLStrings();
            //Here we update the 2-digit lang attribute if it's required
            if (countryCodes === true) {
                //If array doesn't exist and doesn't have content then:
                if(!Array.isArray(countryCodeData) || !countryCodeData.length) {
                    console.warn('Cannot access strings for language codes');
                    return;
                }
                //Here we assign the lang attribute and the corresponding value
                root.setAttribute('lang', updateCountryCodeOnHTML().code);
            }
        });
    })();

    function updateCountryCodeOnHTML() {
        //Find evaluate a function an returns the element that accomplish it
        return countryCodeData.find(this2Digit => this2Digit.name === mlrLangInUse);
    }

    function resolveAllMLStrings() {
        //Get all elements with the data-mlr-text attribute
        let stringsToBeResolved = document.querySelectorAll(`[${stringAttribute}]`);
        stringsToBeResolved.forEach(stringsToBeResolved => {
            let originalTextContent = stringsToBeResolved.textContent;
            //Call resolveMLString function with the original text of the element and the mLstrings array as parameters to return the text translation
            let resolvedText = resolveMLString(originalTextContent, mLstrings);
            stringsToBeResolved.textContent = resolvedText;
        });
    }

    function resolveMLString(stringToBeResolved, mLstrings) {
        //Here we get the object element where is the original text, evaluation our mLstrings array, the parameter function represent every element in the array
        let matchingStringIndex = mLstrings.find(function(stringObj) {
            //Here we get the property values from the first element as array
            let stringValues = Object.values(stringObj);
            //If the element includes the original text, throw true if not continuos looking in the next elements(go back to line 182)
            return stringValues.includes(stringToBeResolved);
        });
        //If the origin text was found in some of the object elements we look now for the property that has the corresponding translation if not return the same text
        if(matchingStringIndex) {
            return matchingStringIndex[mlrLangInUse];
        } else {
            return stringToBeResolved;
        }
    }
}

mlr({
    dropID: "drop-down__Language", //Id from the select element (the switcher)
    stringAttribute: "data-mlr-text", // Attribute that is going to be added to every element that has text inside
    choseLang: "English", //The initial language
    mLstrings: MLstrings, // Variable where translations are going to be stored
    countryCodes: true, //Optional boolean value to update the lang attribute in our HTML
    countryCodeData: mlCodes, // An array where is stored all language codes to update the lang attribute
});