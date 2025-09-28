// --- UI Element References ---
const onboardingModal = document.getElementById("onboardingModal");
const onboardingForm = document.getElementById("onboardingForm");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const heroSignupBtn = document.getElementById("heroSignupBtn");
const navLinks = document.querySelector(".nav-links");
const navDashboardLink = document.getElementById("navDashboardLink");

const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnApp = document.getElementById("logoutBtnApp");

const languageSelectorDashboard = document.getElementById('languageSelectorDashboard');
const languageSelectorAi = document.getElementById('languageSelectorAi');
const allPages = document.querySelectorAll(".page");

// ADDED reference for floating CTA
const floatingAiCta = document.getElementById('floatingAiCta');

// --- API Keys (Note: Using AIza key format as instructed for client-side) ---
// Placeholder key. Replace with a real, client-safe key to enable Gemini chat.
const GEMINI_API_KEY = 'AIzaSyCbdhnXy1JqSlhLTdOVNMb643AmQs4lOaw'; 
const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-05-20';
// --- Localization Data ---
const LOCALE_DATA = {
    'hi': {
        'severe_tag': 'अति आवश्यक', 'warning_tag': 'चेतावनी', 'info_tag': 'जानकारी',
        'alert_1': 'अगले 24 घंटों के लिए भारी वर्षा की चेतावनी। उचित जल निकासी सुनिश्चित करें।',
        'alert_2': 'संभावित कीट संक्रमण। तत्काल निरीक्षण के लिए पत्ती के निचले हिस्से की जाँच करें।',
        'alert_3': 'नई सरकारी सब्सिडी योजना की घोषणा की गई है।',
        'stages': { 'Sowing': 'बुवाई', 'Vegetative Growth': 'वनस्पति वृद्धि', 'Flowering': 'फूलना', 'Harvesting': 'कटाई' },
        'stress_level': { 'Optimal': 'इष्टतम', 'Mild Stress': 'हल्का तनाव', 'Severe Stress': 'गंभीर तनाव' },
        'sell_advice': { 'Best time to sell:': 'बेचने का सबसे अच्छा समय:', 'Sell now for best margin': 'सबसे अच्छे लाभ के लिए अभी बेचें', 'Hold for 3 more days': '3 और दिनों के लिए रोकें', 'Market price is low': 'बाजार मूल्य कम है' }
    },
    'ta': {
        'severe_tag': 'மிக அவசரம்', 'warning_tag': 'எச்சரிக்கை', 'info_tag': 'தகவல்',
        'alert_1': 'அடுத்த 24 மணி நேரத்திற்கு பலத்த மழை எச்சரிக்கை. சரியான வடிகால் இருப்பதை உறுதி செய்யவும்.',
        'alert_2': 'சாத்தியமான பூச்சி தாக்குதல். உடனடியாக பரிசோதனை செய்ய இலைகளின் அடிப்பகுதியை சரிபார்க்கவும்.',
        'alert_3': 'புதிய அரசு மானியத் திட்டம் அறிவிக்கப்பட்டுள்ளது.',
        'stages': { 'Sowing': 'விதைப்பு', 'Vegetative Growth': 'தாவர வளர்ச்சி', 'Flowering': 'பூக்கும்', 'Harvesting': 'அறுவடை' },
        'stress_level': { 'Optimal': 'உகந்தது', 'Mild Stress': 'லேசான அழுத்தம்', 'Severe Stress': 'கடுமையான அழுத்தம்' },
        'sell_advice': { 'Best time to sell:': 'விற்க சிறந்த நேரம்:', 'Sell now for best margin': 'சிறந்த லாபத்திற்கு இப்போதே விற்கவும்', 'Hold for 3 more days': 'மேலும் 3 நாட்களுக்கு வைத்திருக்கவும்', 'Market price is low': 'சந்தை விலை குறைவாக உள்ளது' }
    },
    'ma': {
        'severe_tag': 'അത്യാവശ്യം', 'warning_tag': 'മുന്നറിയിപ്പ്', 'info_tag': 'വിവരം',
        'alert_1': 'അടുത്ത 24 മണിക്കൂറിനുള്ളിൽ കനത്ത മഴയ്ക്ക് സാധ്യത. ശരിയായ നീർവാർച്ച ഉറപ്പാക്കുക.',
        'alert_2': 'കീടബാധയ്ക്ക് സാധ്യതയുണ്ട്. ഉടനടി പരിശോധനയ്ക്കായി ഇലകളുടെ അടിഭാഗം പരിശോധിക്കുക.',
        'alert_3': 'പുതിയ സർക്കാർ സബ്സിഡി പദ്ധതി പ്രഖ്യാപിച്ചു.',
        'stages': { 'Sowing': 'വിത്ത് വിതയ്ക്കൽ', 'Vegetative Growth': 'സസ്യ വളർച്ച', 'Flowering': 'പുഷ്പ്പിക്കൽ', 'Harvesting': 'വിളവെടുപ്പ്' },
        'stress_level': { 'Optimal': 'ഒപ്റ്റിമൽ', 'Mild Stress': 'മിതമായ ക്ഷാമം', 'Severe Stress': 'കഠിനമായ ക്ഷാമം' },
        'sell_advice': { 'Best time to sell:': 'വിൽക്കാൻ പറ്റിയ സമയം:', 'Sell now for best margin': 'മികച്ച ലാഭത്തിനായി ഇപ്പോൾ വിൽക്കുക', 'Hold for 3 more days': 'കൂടുതൽ 3 ദിവസത്തേക്ക് നിർത്തുക', 'Market price is low': 'വിപണി വില കുറവാണ്' }
    },
    'en': {
        'severe_tag': 'URGENT', 'warning_tag': 'WARNING',
        'info_tag': 'INFO',
        'alert_1': 'Heavy rainfall warning for the next 24 hours. Ensure proper drainage.',
        'alert_2': 'Possible pest infestation. Check the underside of leaves for immediate inspection.',
        'alert_3': 'New government subsidy program announced.',
        'stages': { 'Sowing': 'Sowing', 'Vegetative Growth': 'Vegetative Growth', 'Flowering': 'Flowering', 'Harvesting': 'Harvesting' },
        'stress_level': { 'Optimal': 'Optimal', 'Mild Stress': 'Mild Stress', 'Severe Stress': 'Severe Stress' },
        'sell_advice': { 'Best time to sell:': 'Best Time to Sell:', 'Sell now for best margin': 'Sell now for best margin', 'Hold for 3 more days': 'Hold for 3 more days', 'Market price is low': 'Market price is low' }
    }
};

// --- Mock Data for Dashboard (Comprehensive) ---
const DEMO_DATA = {
    weather: {
        temp: '29°C', condition: 'Partly Cloudy', humidity: '68%', wind: '12 km/h SW', rain: '0.8 mm', sunrise: '06:12 AM', sunset: '06:45 PM',
        forecast: [{ day: 'Mon', icon: '☀️', temp: '30°C' }, { day: 'Tue', icon: '🌦️', temp: '28°C' }, { day: 'Wed', icon: '🌧️', temp: '27°C' }, { day: 'Thu', icon: '⛅', temp: '29°C' }, { day: 'Fri', icon: '☀️', temp: '31°C' }]
    },
    market: {
        price: '₹2,150/quintal', 
        chart: [2100, 2150, 2120, 2180, 2200, 2150, 2170], // Last 7 days price trend
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sellAdviceKey: 1 // 1: Sell now (today), 2: Hold (price will rise), 3: Low (price fell)
    },
    soil: {
        npk: 'N: 120, P: 60, K: 80', ph: '6.7',
        water: {
            moistureVWC: 35, // Volumetric Water Content (in %)
            wiltingPoint: 20, // Threshold for severe stress
            fieldCapacity: 45, // Threshold for overwatering
        },
        chart: [6.5, 6.6, 6.7, 6.8, 6.7, 6.6, 6.7],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    crop: {
        daysSinceSowing: 42,
        stage: 'Flowering', // English key used for lookup
        progress: 65,
        yield: '3.2 tons/acre'
    },
    tips: [
        'Mulch your crops to retain soil moisture during hot days.',
        'Inspect your crops regularly for early signs of pests or disease.',
        'Irrigate early in the morning to reduce water loss from evaporation.',
        'Rotate crops each season to improve soil health and reduce pests.',
        'Test your soil pH every 3 months for optimal nutrient uptake.',
        'Use organic compost to boost soil fertility naturally.',
        'Keep farm records to track yield and input costs for better planning.'
    ],
    // ADDED data for full Crop Library (used in initializeCropLibrary)
    cropLibrary: [
        { name: "Rice", emoji: "🌾", description: "A staple crop. Learn about cultivation, pests, and harvest cycles for rice." },
        { name: "Maize", emoji: "🌽", description: "A comprehensive guide to growing healthy maize crops." },
        { name: "Potatoes", emoji: "🥔", description: "Tips for planting, managing, and harvesting potatoes." },
        { name: "Soybeans", emoji: "🌱", description: "An in-depth guide to growing protein-rich soybeans." },
        { name: "Coconut", emoji: "🥥", description: "Kerala's iconic crop. Tips on palm management, pests, and yield optimization." },
        { name: "Rubber", emoji: "🌳", description: "Information on tapping techniques, disease control, and soil management for rubber plantations." },
        { name: "Cardamom", emoji: "🌶️", description: "A high-value spice crop. Learn about shade management and irrigation for optimal growth." },
        { name: "Tea", emoji: "🍵", description: "Tips for pruning, plucking, and maintaining soil pH for robust tea gardens." }
    ],
    // ADDED data for full Resources section (used in initializeResources)
    resources: [
        { title: "Government Subsidies", emoji: "💰", description: "Information on farming subsidies and financial aid programs.", linkText: "Learn More" },
        { title: "Soil Testing Labs", emoji: "🧪", description: "Find accredited soil testing laboratories near you.", linkText: "Find a Lab" },
        { title: "Market Price Data", emoji: "📈", description: "Get real-time updates on commodity market prices.", linkText: "View Prices" },
        { title: "Community Forum", emoji: "💬", description: "Connect with other farmers to share tips and ask questions.", linkText: "Join Community" },
        { title: "Pest & Disease Diagnosis", emoji: "📸", description: "Upload a photo of your crop to get an instant diagnosis.", linkText: "Diagnose Now", pageId: "diagnosis-page" }
    ],
    diagnosis: {
        Rice: {
            Pest: { name: "Brown Plant Hopper (BPH)", summary: "BPH causes 'hopperburn,' leading to complete crop failure if severe.", treatment: ["Apply Neem oil 3ml/L of water.", "Introduce natural predators (spider/mirid bugs).", "Maintain optimal drainage to avoid water stagnation."] },
            Disease: { name: "Rice Blast (Magnaporthe oryzae)", summary: "Fungal disease causing diamond-shaped lesions. Very common during flowering.", treatment: ["Apply Fungicide (Tricyclazole) immediately.", "Avoid excessive nitrogen fertilizer.", "Use blast-resistant varieties for the next season."] }
        },
        Default: { name: "Nutrient Deficiency (Nitrogen)", summary: "The lower leaves are turning yellow/pale, indicating lack of Nitrogen, common in the vegetative stage.", treatment: ["Apply Urea (20kg/acre) immediately via foliar spray.", "Ensure adequate soil moisture to facilitate nutrient uptake.", "Perform a soil test for a long-term plan."] }
    }
};

// ----------------------------------------------------------------------
// --- CORE LOGIC: TEXT-TO-SPEECH (TTS) UTILITIES ---
// ----------------------------------------------------------------------

// Helper to convert base64 audio data to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Helper to convert PCM audio data (from API) into a playable WAV Blob
function pcmToWav(pcmData, sampleRate) {
    const buffer = new ArrayBuffer(44 + pcmData.length * 2);
    const view = new DataView(buffer);

    // Helper function to write strings
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // File length
    view.setUint32(4, 36 + pcmData.length * 2, true);
    // WAVE identifier
    writeString(view, 8, 'WAVE');
    // fmt chunk identifier
    writeString(view, 12, 'fmt ');
    // Format chunk length
    view.setUint32(16, 16, true);
    // Sample format (raw pcm)
    view.setUint16(20, 1, true);
    // Channel count
    view.setUint16(22, 1, true);
    // Sample rate
    view.setUint32(24, sampleRate, true);
    // Byte rate (SampleRate * ChannelCount * BitsPerSample/8)
    view.setUint32(28, sampleRate * 1 * 2, true);
    // Block align (ChannelCount * BitsPerSample/8)
    view.setUint16(32, 1 * 2, true);
    // Bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    writeString(view, 36, 'data');
    // Data chunk length
    view.setUint32(40, pcmData.length * 2, true);

    // Write PCM data
    let offset = 44;
    for (let i = 0; i < pcmData.length; i++) {
        view.setInt16(offset, pcmData[i], true);
        offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
}

const VOICE_MAP = {
    'en': { voiceName: 'Kore', langCode: 'en-US' },
    'hi': { voiceName: 'Kore', langCode: 'hi-IN' }, 
    'ta': { voiceName: 'Despina', langCode: 'ta-IN' },
    'ma': { voiceName: 'Charon', langCode: 'en-US' } 
};

async function getTtsAudio(text, lang) {
    const config = VOICE_MAP[lang] || VOICE_MAP['en'];
    const systemPrompt = `Speak the following text in a friendly, informative tone, maintaining an appropriate regional accent (Indian English, Hindi, Tamil, or Malayalam) as the AI farming assistant Vera.`;
    
    // Remove strong tags before TTS conversion
    const cleanText = text.replace(/<\/?strong>/g, '');

    const payload = {
        contents: [{
            parts: [{ text: cleanText }]
        }],
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: config.voiceName }
                }
            }
        },
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        }
    };
    
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_API_KEY}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`TTS API error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        const part = result?.candidates?.[0]?.content?.parts?.[0];
        const audioData = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType;

        if (audioData && mimeType && mimeType.startsWith("audio/L16")) {
            const match = mimeType.match(/rate=(\d+)/);
            const sampleRate = match ? parseInt(match[1], 10) : 16000;
            
            const pcmDataBuffer = base64ToArrayBuffer(audioData);
            const pcm16 = new Int16Array(pcmDataBuffer);
            const wavBlob = pcmToWav(pcm16, sampleRate);
            
            return URL.createObjectURL(wavBlob);
        } else {
            console.error("TTS response missing valid audio data or mime type.", mimeType);
            return null;
        }

    } catch (error) {
        console.error("TTS error:", error);
        return null;
    }
}


// ----------------------------------------------------------------------
// --- CORE LOGIC: LOCALIZATION ---
// ----------------------------------------------------------------------

/**
 * Dynamically updates all localized content on the page based on the selected language.
 * @param {string} lang The language code ('en', 'hi', 'ta', 'ma').
 */
function updateContentLanguage(lang) {
    const locale = LOCALE_DATA[lang] || LOCALE_DATA['en'];
    const profile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || { crop: 'crop' };
    const cropName = profile.crop;

    // 1. Update text content for elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const newText = element.getAttribute(`data-${lang}`) || element.getAttribute('data-en');
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
            element.placeholder = newText;
        } else if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            // Check if content is dynamic before overwriting
            if (!element.classList.contains('btn-logout') && !element.classList.contains('nav-links')) {
                 element.textContent = newText;
            }
        } else if (newText) {
             // Handle elements like h1, p
             const span = element.querySelector('span');
             if (span) {
                 // Preserve inner span if it exists (e.g., icons, values)
                 element.childNodes[0].nodeValue = newText.trim().replace(/\s*$/, ' ');
             } else {
                 element.textContent = newText;
             }
        }
    });

    // 2. Update descriptive labels (e.g., "Temperature: X")
    document.querySelectorAll('[data-en-label]').forEach(element => {
        const labelAttr = `data-${lang}-label`;
        const labelText = element.getAttribute(labelAttr);
        if (labelText) {
            const span = element.querySelector('span');
            // Set the label text while preserving the span content
            element.childNodes[0].nodeValue = `${labelText}: `;
            if (span) element.appendChild(span); 
        }
    });

    // 3. Update Alerts & Advisories
    const alertsList = document.getElementById('alertsList');
    if (alertsList) {
        alertsList.innerHTML = `
            <li><span class="alert-tag severe">${locale.severe_tag}</span> ${locale.alert_1}</li>
            <li><span class="alert-tag moderate">${locale.warning_tag}</span> ${locale.alert_2}</li>
            <li><span class="alert-tag info">${locale.info_tag}</span> ${locale.alert_3} ${lang !== 'en' ? cropName + ' ' : ''} farmers.</li>
        `;
    }

    // 4. Update dynamic content from DEMO_DATA that uses localization keys
    const stageElement = document.getElementById('cropStage');
    if (stageElement) {
        const stageKey = DEMO_DATA.crop.stage;
        const stageLabel = stageElement.getAttribute(`data-${lang}-label`);
        const translatedStage = locale.stages[stageKey] || stageKey;
        stageElement.textContent = `${stageLabel}: ${translatedStage}`;
    }
    
    // 5. Update Water Stress Level
    const stressLevelElement = document.getElementById('waterStressLevel');
    if(stressLevelElement) {
        const currentStressKey = stressLevelElement.getAttribute('data-stress-key') || 'Optimal';
        const stressLabel = stressLevelElement.closest('p').getAttribute(`data-${lang}-label`);
        const translatedStress = locale.stress_level[currentStressKey] || currentStressKey;
        stressLevelElement.textContent = translatedStress;
        // Re-apply label to parent <p>
        stressLevelElement.closest('p').childNodes[0].nodeValue = `${stressLabel}: `;
        stressLevelElement.closest('p').appendChild(stressLevelElement);
    }

    // 6. Update Market Advice
    const sellAdviceElement = document.getElementById('sellAdvice');
    if(sellAdviceElement) {
        const adviceKey = sellAdviceElement.getAttribute('data-advice-key');
        let adviceText = '';
        if (adviceKey == 1) adviceText = locale.sell_advice['Sell now for best margin'];
        else if (adviceKey == 2) adviceText = locale.sell_advice['Hold for 3 more days'];
        else adviceText = locale.sell_advice['Market price is low'];
        sellAdviceElement.textContent = adviceText;
    }


    // 7. Sync language selectors
    if (languageSelectorDashboard && languageSelectorDashboard.value !== lang) languageSelectorDashboard.value = lang;
    if (languageSelectorAi && languageSelectorAi.value !== lang) languageSelectorAi.value = lang;

    localStorage.setItem('currentLanguage', lang);
}

// ----------------------------------------------------------------------
// --- CORE LOGIC: NAVIGATION & AUTHENTICATION ---
// ----------------------------------------------------------------------

function showPage(pageId) {
    // If navigating away from AI page, stop any ongoing TTS
    if (document.getElementById('ai-page').classList.contains('active') && window.currentPlayingAudio) {
        window.currentPlayingAudio.pause();
        window.currentPlayingAudio = null;
    }
    
    allPages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        const currentLang = localStorage.getItem('currentLanguage') || 'en';
        
        // Initialize specific page contents
        if (pageId === 'dashboard-page') {
            initializeDashboard();
        } else if (pageId === 'ai-page') {
            initializeAiAssistant();
        } else if (pageId === 'diagnosis-page') {
            document.getElementById('fileInputDiagnosis').value = '';
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('diagnosisResult').style.display = 'none';
            document.getElementById('diagnosisLoading').style.display = 'none';
            document.getElementById('diagnosisPlaceholder').style.display = 'block';
        } else if (pageId === 'crop-library-page') {
             initializeCropLibrary();
        } else if (pageId === 'resources-page') {
             initializeResources();
        }
        
        // Always apply language after loading content
        updateContentLanguage(currentLang);
    }
}

function showHomepageSection(sectionId) {
    showPage('homepage');
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Clear error message when closing login modal
        if (modalId === 'loginModal') {
            const loginError = document.getElementById('loginError');
            if (loginError) loginError.style.display = 'none';
        }
    }
}

// Auth handlers are standard
function handleSignUp(e) {
    e.preventDefault();
    const farmerProfile = {
        name: document.getElementById("farmerName").value,
        crop: document.getElementById("farmerCrop").value,
        location: document.getElementById("farmerLocation").value,
        area: document.getElementById("farmerArea").value,
        sowingDate: document.getElementById("sowingDate").value
    };
    localStorage.setItem("smartHarvestersProfile", JSON.stringify(farmerProfile));
    localStorage.setItem('isLoggedIn', 'true');
    onboardingModal.classList.remove("active");
    checkUserSession();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const mockUsers = { 'farmer': 'pass', 'aman': '12345', 'sita': 'securepass' };
    const loginError = document.getElementById('loginError');
    
    if (mockUsers[username] && mockUsers[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        loginModal.classList.remove('active');
        if (loginError) loginError.style.display = 'none';
        
        // Set default profile if logging in without one (e.g., first time mock login)
        if (!localStorage.getItem("smartHarvestersProfile")) {
            localStorage.setItem("smartHarvestersProfile", JSON.stringify({
                name: username, crop: "Rice", location: "Kerala, India", area: "3", sowingDate: "2024-10-01"
            }));
        }
        checkUserSession();
    } else {
        if (loginError) loginError.style.display = 'block';
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('smartHarvestersProfile');
    checkUserSession();
    showPage('homepage');
}

function checkUserSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasProfile = localStorage.getItem('smartHarvestersProfile');

    // Update UI element visibility
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (heroSignupBtn) heroSignupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
    if (logoutBtnApp) logoutBtnApp.style.display = isLoggedIn ? 'block' : 'none';
    if (navDashboardLink) navDashboardLink.style.display = isLoggedIn ? 'block' : 'none';

    // NEW: Control visibility of the floating CTA
    if (floatingAiCta) {
        const showCta = isLoggedIn && hasProfile;
        floatingAiCta.style.display = showCta ? 'flex' : 'none';
    }

    if (isLoggedIn && hasProfile && document.getElementById('homepage').classList.contains('active')) {
         showPage('dashboard-page');
    } else if (isLoggedIn && !hasProfile) {
         onboardingModal.classList.add('active');
         showPage('homepage');
    }
    
    // Reapply language on UI state change
    updateContentLanguage(localStorage.getItem('currentLanguage') || 'en');
}

// ----------------------------------------------------------------------
// --- CORE LOGIC: DASHBOARD INITIALIZATION ---
// ----------------------------------------------------------------------

function initializeDashboard() {
    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || {
        name: "Demo Farmer", crop: "Rice", location: "Thrissur, Kerala", area: "2.5", sowingDate: "2025-08-01"
    };
    const currentLang = localStorage.getItem('currentLanguage') || 'en';
    const locale = LOCALE_DATA[currentLang];

    // 1. Update Farm Details
    document.getElementById('farmDetails').textContent = `${farmerProfile.name}'s Farm (${farmerProfile.crop}, ${farmerProfile.area} acres)`;

    // 2. Weather
    const weatherData = DEMO_DATA.weather;
    document.getElementById('currentTemp').textContent = weatherData.temp;
    document.getElementById('currentCondition').textContent = weatherData.condition;
    document.getElementById('currentHumidity').textContent = weatherData.humidity;
    document.getElementById('weatherWind').textContent = weatherData.wind;
    document.getElementById('weatherRain').textContent = weatherData.rain;
    document.getElementById('weatherSunrise').textContent = weatherData.sunrise;
    document.getElementById('weatherSunset').textContent = weatherData.sunset;
    const forecastList = document.getElementById('forecastList');
    if (forecastList) {
        forecastList.innerHTML = weatherData.forecast.map(day => 
            `<li><span class="emoji">${day.icon}</span> ${day.day}: ${day.temp}</li>`
        ).join('');
    }

    // 3. Water Stress & Irrigation
    const moisture = DEMO_DATA.soil.water.moistureVWC;
    const wilting = DEMO_DATA.soil.water.wiltingPoint;
    const capacity = DEMO_DATA.soil.water.fieldCapacity;
    let stressKey;
    let adviceText;

    if (moisture < wilting + 5) {
        stressKey = 'Severe Stress';
        adviceText = `URGENT: Initiate irrigation within 3 hours. Current moisture (${moisture}%) is critically low.`;
    } else if (moisture < capacity - 10) {
        stressKey = 'Mild Stress';
        adviceText = `Water is adequate, but trending low. Schedule irrigation in the next 24 hours.`;
    } else {
        stressKey = 'Optimal';
        adviceText = `Soil moisture is optimal (${moisture}%). No irrigation needed. Monitor forecast.`;
    }

    document.getElementById('soilMoisture').textContent = `${moisture}%`;
    const stressLevelElement = document.getElementById('waterStressLevel');
    stressLevelElement.setAttribute('data-stress-key', stressKey);
    // Setting text here in English, localization updates it immediately after
    stressLevelElement.textContent = stressKey; 
    document.getElementById('irrigationAdvice').textContent = adviceText;

    // Update bar visually
    const moistureBar = document.getElementById('moistureBar');
    if (moistureBar) {
        // Calculate percentage relative to field capacity
        const moisturePercent = Math.min(100, (moisture / capacity) * 100);
        moistureBar.style.width = `${moisturePercent}%`;
        
        // Color code the bar based on stress level
        if (stressKey === 'Severe Stress') moistureBar.style.backgroundColor = '#F44336'; // Red
        else if (stressKey === 'Mild Stress') moistureBar.style.backgroundColor = '#FFC107'; // Yellow
        else moistureBar.style.backgroundColor = '#2196F3'; // Blue (Optimal)
    }


    // 4. Crop Progress
    const cropData = DEMO_DATA.crop;
    document.getElementById('daysSinceSowing').querySelector('span').textContent = cropData.daysSinceSowing;
    document.getElementById('cropStage').querySelector('span').textContent = cropData.stage;
    const cropProgressBar = document.getElementById('cropProgressBar');
    if (cropProgressBar) cropProgressBar.style.width = `${cropData.progress}%`;

    // 5. Yield & Insights
    document.getElementById('projectedYield').querySelector('span').textContent = cropData.yield;
    
    // 6. Soil Health & Market
    document.getElementById('npkLevels').textContent = DEMO_DATA.soil.npk;
    document.getElementById('phLevel').textContent = DEMO_DATA.soil.ph;
    document.getElementById('currentPrice').textContent = DEMO_DATA.market.price;
    
    // 7. Market Advice
    const sellAdviceElement = document.getElementById('sellAdvice');
    const sellKey = DEMO_DATA.market.sellAdviceKey; 
    let adviceTextKey = 'Market price is low';
    if (sellKey === 1) adviceTextKey = 'Sell now for best margin';
    else if (sellKey === 2) adviceTextKey = 'Hold for 3 more days';

    sellAdviceElement.setAttribute('data-advice-key', sellKey);
    // Localization will handle text update
    sellAdviceElement.textContent = locale.sell_advice[adviceTextKey]; 
    sellAdviceElement.style.color = sellKey === 1 ? 'var(--primary-color)' : (sellKey === 3 ? '#F44336' : '#FFC107');


    // 8. Daily Tip (Randomized)
    const today = new Date().getDay();
    document.getElementById('dailyTip').textContent = DEMO_DATA.tips[today % DEMO_DATA.tips.length];

    // Reapply language to update all newly set labels
    updateContentLanguage(currentLang);
    
    // 9. Initialize Charts
    const initChart = (id, data) => {
        const chartElement = document.getElementById(id);
        if (chartElement && chartElement.chart) chartElement.chart.destroy();
        const ctx = chartElement.getContext('2d');
        chartElement.chart = new Chart(ctx, data);
    };
    
    // Yield Chart
    initChart('yieldChart', {
        type: 'line', data: {
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
            datasets: [{ label: 'Expected Yield (tons)', data: [1.2, 1.5, 1.8, 2.0, 2.1], borderColor: '#0A6640', tension: 0.2, fill: true, backgroundColor: 'rgba(10, 102, 64, 0.1)', pointRadius: 5, pointHoverRadius: 8 }]
        }, options: { 
            responsive: true, maintainAspectRatio: false, 
            plugins: { legend: { display: false } }, 
            scales: { y: { beginAtZero: true } }
        }
    });

    // Soil Chart
    initChart('soilChart', {
        type: 'bar', data: {
            labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
            datasets: [{ 
                label: 'NPK Levels (kg/ha)', 
                data: [120, 60, 80], 
                backgroundColor: ['#2E8B57', '#FFD700', '#2196F3'] 
            }]
        }, options: { 
            responsive: true, maintainAspectRatio: false, 
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } } 
        }
    });

    // Market Chart
    initChart('marketChart', {
        type: 'line', data: {
            labels: DEMO_DATA.market.labels,
            datasets: [{ label: 'Market Price (₹/quintal)', data: DEMO_DATA.market.chart, borderColor: '#2196F3', tension: 0.4, pointBackgroundColor: (ctx) => ctx.dataIndex === 5 ? 'red' : '#2196F3', pointRadius: 5, pointHoverRadius: 8 }]
        }, options: { 
            responsive: true, maintainAspectRatio: false, 
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: false } }
        }
    });
}

// ----------------------------------------------------------------------
// --- INITIALIZE CROP LIBRARY PAGE ---
// ----------------------------------------------------------------------

function initializeCropLibrary() {
    const cropGrid = document.querySelector('#crop-library-page .crop-grid');
    if (!cropGrid) return;
    
    // Clear existing content if any
    cropGrid.innerHTML = ''; 

    DEMO_DATA.cropLibrary.forEach(crop => {
        // Mock localization keys for the description and link text based on the English name
        const cardHtml = `
            <div class="crop-card">
                <div class="emoji">${crop.emoji}</div>
                <h3 data-en="${crop.name}" 
                    data-hi="${crop.name === 'Rice' ? 'चावल' : crop.name === 'Maize' ? 'मक्का' : crop.name === 'Potatoes' ? 'आलू' : crop.name === 'Soybeans' ? 'सोयाबीन' : crop.name === 'Coconut' ? 'नारियल' : crop.name === 'Rubber' ? 'रबर' : crop.name === 'Cardamom' ? 'इलायची' : 'चाय'}" 
                    data-ta="${crop.name === 'Rice' ? 'அரிசி' : crop.name === 'Maize' ? 'மக்காச்சோளம்' : crop.name === 'Potatoes' ? 'உருளைக்கிழங்கு' : crop.name === 'Soybeans' ? 'சோயாபீன்ஸ்' : crop.name === 'Coconut' ? 'தேங்காய்' : crop.name === 'Rubber' ? 'ரப்பர்' : crop.name === 'Cardamom' ? 'ஏலக்காய்' : 'தேயிலை'}" 
                    data-ma="${crop.name === 'Rice' ? 'നെല്ല്' : crop.name === 'Maize' ? 'ചോളം' : crop.name === 'Potatoes' ? 'ഉരുളക്കിഴങ്ങ്' : crop.name === 'Soybeans' ? 'സോയാബീൻസ്' : crop.name === 'Coconut' ? 'തെങ്ങ്' : crop.name === 'Rubber' ? 'റബ്ബർ' : crop.name === 'Cardamom' ? 'ഏലം' : 'ചായ'}">
                    ${crop.name}
                </h3>
                <p data-en="${crop.description}">${crop.description}</p>
                <a href="#" class="action-button small-btn" data-en="View Details" data-hi="विवरण देखें" data-ta="விவரங்களைப் பார்க்கவும்" data-ma="വിശദാംശങ്ങൾ കാണുക">View Details</a>
            </div>
        `;
        cropGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// ----------------------------------------------------------------------
// --- INITIALIZE RESOURCES PAGE ---
// ----------------------------------------------------------------------

function initializeResources() {
    const resourcesList = document.querySelector('#resources-page .resources-list');
    if (!resourcesList) return;

    // Clear existing content if any
    resourcesList.innerHTML = ''; 

    DEMO_DATA.resources.forEach(resource => {
        // Determine if it's a diagnosis link or general link
        const clickAction = resource.pageId ? `onclick="showPage('${resource.pageId}')"` : '';
        
        // Mock localization keys for the title and link text
        const titleHi = resource.title === 'Government Subsidies' ? 'सरकारी सब्सिडी' : resource.title === 'Soil Testing Labs' ? 'मिट्टी परीक्षण प्रयोगशालाएं' : resource.title === 'Market Price Data' ? 'बाजार मूल्य डेटा' : resource.title === 'Community Forum' ? 'सामुदायिक मंच' : 'कीट और रोग निदान';
        const linkHi = resource.linkText === 'Learn More' ? 'और जानें' : resource.linkText === 'Find a Lab' ? 'लैब खोजें' : resource.linkText === 'View Prices' ? 'कीमतें देखें' : resource.linkText === 'Join Community' ? 'समुदाय में शामिल हों' : 'निदान करें';

        const cardHtml = `
            <div class="resource-card">
                <div class="emoji">${resource.emoji}</div>
                <h3 data-en="${resource.title}" data-hi="${titleHi}">
                    ${resource.title}
                </h3>
                <p data-en="${resource.description}">${resource.description}</p>
                <a href="#" class="action-button small-btn" 
                   data-en="${resource.linkText}" 
                   data-hi="${linkHi}"
                   ${clickAction}>
                   ${resource.linkText}
                </a>
            </div>
        `;
        resourcesList.insertAdjacentHTML('beforeend', cardHtml);
    });
}

// ----------------------------------------------------------------------
// --- CORE LOGIC: AI ASSISTANT ---
// ----------------------------------------------------------------------

function initializeAiAssistant() {
    const chatBox = document.getElementById("chatBox");
    const textInput = document.getElementById("textInput");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const aiStatus = document.getElementById("aiStatus");
    const currentLang = localStorage.getItem('currentLanguage') || 'en';
    
    // Clear chat on re-initialization (e.g., language change)
    if (chatBox) chatBox.innerHTML = '';

    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || {
        name: "Demo Farmer", crop: "Rice", location: "Thrissur, Kerala"
    };
    const { name: farmerName, crop: farmerCrop, location: farmerLocation } = farmerProfile;
    const langName = { en: 'English', hi: 'Hindi', ta: 'Tamil', ma: 'Malayalam' }[currentLang];

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        text = text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
                     .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        const p = document.createElement('p');
        p.innerHTML = text;

        if (sender === 'ai') {
            const avatar = document.createElement('span');
            avatar.classList.add('ai-avatar');
            avatar.textContent = '👩‍🌾';
            messageDiv.appendChild(avatar);

            // Add TTS button
            const playBtn = document.createElement('button');
            playBtn.classList.add('tts-play-btn');
            playBtn.innerHTML = '<span class="material-icons" style="font-size: 1.5rem;">volume_up</span>';
            
            playBtn.addEventListener('click', async () => {
                const originalIcon = playBtn.innerHTML;
                const originalColor = playBtn.style.color;
                
                // Set loading state
                playBtn.innerHTML = '<span class="material-icons spin-animation" style="font-size: 1.5rem;">sync</span>';
                playBtn.style.color = '#FFD700'; 
                playBtn.disabled = true;

                const audioUrl = await getTtsAudio(p.textContent, localStorage.getItem('currentLanguage') || 'en');
                
                playBtn.innerHTML = originalIcon;
                playBtn.style.color = originalColor;
                playBtn.disabled = false;

                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    window.currentPlayingAudio = audio; // Global reference for pausing
                    
                    audio.onplaying = () => { playBtn.style.color = '#F44336'; }; // Red while playing
                    audio.onended = () => { 
                        playBtn.style.color = originalColor; 
                        window.currentPlayingAudio = null;
                        URL.revokeObjectURL(audioUrl);
                    };
                    
                    audio.play().catch(e => {
                        console.error("Audio playback failed:", e);
                        // Fallback to original state on error
                        playBtn.style.color = originalColor; 
                        window.currentPlayingAudio = null;
                        URL.revokeObjectURL(audioUrl);
                    });
                } else {
                    console.warn("Could not retrieve audio URL.");
                }
            });

            bubble.appendChild(p);
            bubble.appendChild(playBtn);
            bubble.style.backgroundColor = 'var(--primary-light)';
            bubble.style.color = 'white';
            
        } else {
            bubble.appendChild(p);
        }
        
        messageDiv.appendChild(bubble);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('ai-message');
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `<span class="ai-avatar">👩‍🌾</span><div class="message-bubble typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        if (aiStatus) {
            aiStatus.textContent = "Typing...";
            aiStatus.classList.remove('online');
            aiStatus.classList.add('typing');
        }
    }
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        if (aiStatus) {
            aiStatus.textContent = "Online";
            aiStatus.classList.remove('typing');
            aiStatus.classList.add('online');
        }
    }

    // --- REFACTORED AI RESPONSE FUNCTION ---
    async function getAiResponse(query) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
            return "Vera: I can't talk right now. Please update the **GEMINI_API_KEY** in the script to enable the AI assistant.";
        }
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
        
        const systemPrompt = `You are Vera, a helpful and highly knowledgeable **Precision Farming AI Assistant** for Smart Harvesters. You specialize in crops common to India, like Rice, Rubber, and Cardamom, focusing on sustainability, soil health, and market resilience. The user is ${farmerName}, located near ${farmerLocation}, and is growing ${farmerCrop}. You must answer concisely, using expert-level knowledge, and ONLY in the ${langName} language.`;
        
        const payload = {
            contents: [{ parts: [{ text: query }] }],
            tools: [{ "google_search": {} }], // Enable Google Search grounding
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const data = await response.json();
            
            let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            // Add sources if available
            const groundingMetadata = data.candidates?.[0]?.groundingMetadata;
            if (groundingMetadata && groundingAttributions) {
                const sources = groundingMetadata.groundingAttributions
                    .map(attribution => attribution.web?.title)
                    .filter(title => title);
                
                if (sources.length > 0) {
                    const uniqueSources = Array.from(new Set(sources)).slice(0, 3);
                    const sourceText = uniqueSources.join(', ');
                    responseText += `\n\n_(Sources: ${sourceText})_`;
                }
            }

            if (responseText) return responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return "Vera: I'm sorry, I couldn't generate a response. The API returned an invalid format.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Vera: I'm having trouble connecting right now. Please check your API key or try again later.";
        }
    }
    // --- END REFACTORED AI RESPONSE FUNCTION ---

    async function processQuery(query) {
        if (!query.trim()) return;
        addMessage(query, 'user');
        textInput.value = '';
        showTypingIndicator();
        const aiResponse = await getAiResponse(query);
        removeTypingIndicator();
        addMessage(aiResponse, 'ai');
    }

    // --- SpeechRecognition Logic (Removed voiceBtn logic from function for cleanliness) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && voiceBtn) {
        const recognition = new SpeechRecognition();
        const recognizerLang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'ta' ? 'ta-IN' : (currentLang === 'ma' ? 'ml-IN' : 'en-IN'));
        recognition.lang = recognizerLang;
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            try {
                recognition.start();
                aiStatus.textContent = "Listening...";
                aiStatus.classList.remove('online');
                aiStatus.classList.add('typing');
                voiceBtn.style.color = '#F44336';
            } catch (e) {
                console.error("Speech recognition already running or not allowed.", e);
                aiStatus.textContent = "Error";
                voiceBtn.style.color = 'var(--primary-color)';
            }
        });
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (textInput) textInput.value = transcript;
            processQuery(transcript);
        };
        
        recognition.onend = () => {
            voiceBtn.style.color = 'var(--primary-color)';
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            aiStatus.textContent = "Online";
            aiStatus.classList.remove('typing');
            aiStatus.classList.add('online');
            voiceBtn.style.color = 'var(--primary-color)';
        };
    } else if (voiceBtn) {
        console.warn("Speech Recognition not supported by your browser.");
        voiceBtn.style.display = 'none';
    }


    const welcomeMessage = {
        en: `Hello ${farmerName}! I'm Vera, your personalized farm advisor. I specialize in market trends, water stress, and pest solutions. How can I help with your ${farmerCrop} farm today?`,
        hi: `नमस्ते ${farmerName}! मैं वेरा हूँ, आपकी व्यक्तिगत कृषि सलाहकार। मैं बाजार के रुझान, जल तनाव और कीट समाधान में विशेषज्ञ हूँ। मैं आज आपके ${farmerCrop} खेत में कैसे मदद कर सकती हूँ?`,
        ta: `வணக்கம் ${farmerName}! நான் வேரா, உங்கள் தனிப்பயனாக்கப்பட்ட பண்ணை ஆலோசகர். சந்தை போக்குகள், நீர் அழுத்தம் மற்றும் பூச்சி தீர்வுகளில் நான் நிபுணத்துவம் பெற்றவள். இன்று உங்கள் ${farmerCrop} பண்ணைக்கு நான் எப்படி உதவ முடியும்?`,
        ma: `ഹലോ ${farmerName}! ഞാൻ വേര, നിങ്ങളുടെ വ്യക്തിഗത കാർഷിക ഉപദേഷ്ടാവ്. വിപണി പ്രവണതകൾ, ജലക്ഷാമം, കീടപരിഹാരങ്ങൾ എന്നിവയിൽ ഞാൻ വിദഗ്ദ്ധയാണ്. ഇന്ന് നിങ്ങളുടെ ${farmerCrop} കൃഷിയിടത്തിൽ ഞാൻ എങ്ങനെ സഹായിക്കും?`
    };

    // Only add welcome message if the chat is truly empty (prevents duplicates on language change)
    if (chatBox.children.length === 0) {
        addMessage(welcomeMessage[currentLang] || welcomeMessage.en, 'ai');
    }
    
    if (sendBtn) sendBtn.addEventListener('click', () => processQuery(textInput.value));
    if (textInput) textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processQuery(textInput.value);
    });
}

// ----------------------------------------------------------------------
// --- CORE LOGIC: DIAGNOSIS TOOL ---
// ----------------------------------------------------------------------

function handleDiagnosis(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgPreview = document.getElementById('imagePreview');
        imgPreview.src = e.target.result;
        imgPreview.style.display = 'block';
        document.getElementById('diagnosisPlaceholder').style.display = 'none';
        
        // Show loading and hide previous result
        const loading = document.getElementById('diagnosisLoading');
        const resultCard = document.getElementById('diagnosisResult');
        loading.style.display = 'block';
        resultCard.style.display = 'none';

        // --- Mock Diagnosis Logic (Simulating AI processing) ---
        setTimeout(() => {
            const profile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || { crop: 'Default' };
            const cropType = profile.crop;
            const diagnosisKey = ['Pest', 'Disease', 'Default'][Math.floor(Math.random() * 3)];
            
            const diagnosisResult = DEMO_DATA.diagnosis[cropType] ? 
                                        (DEMO_DATA.diagnosis[cropType][diagnosisKey] || DEMO_DATA.diagnosis.Default) : 
                                        DEMO_DATA.diagnosis.Default;
            
            const currentLang = localStorage.getItem('currentLanguage') || 'en';
            const isDefault = diagnosisKey === 'Default';
            
            // Note: LOCALE_DATA doesn't have diagnosis names, so we use English fallback for the mock data result title
            const nameKey = isDefault ? 'Nutrient Deficiency (Nitrogen)' : diagnosisResult.name;
            const summaryText = diagnosisResult.summary;
            const treatments = diagnosisResult.treatment;

            document.getElementById('resultTitle').textContent = nameKey;
            document.getElementById('resultSummary').textContent = summaryText;
            document.getElementById('treatmentList').innerHTML = treatments.map(item => `<li>${item}</li>`).join('');

            loading.style.display = 'none';
            resultCard.style.display = 'block';
            
            // Reapply language for titles/buttons
            updateContentLanguage(currentLang);
        }, 2500); // 2.5 second delay to simulate API call
    };
    reader.readAsDataURL(file);
}

// ----------------------------------------------------------------------
// --- EVENT LISTENERS ---
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Initial language setup
    const initialLang = localStorage.getItem('currentLanguage') || 'en';
    
    // Set up language selector event listeners
    if (languageSelectorDashboard) languageSelectorDashboard.addEventListener('change', (e) => showPage('dashboard-page'));
    if (languageSelectorAi) languageSelectorAi.addEventListener('change', (e) => initializeAiAssistant());

    // Core Auth/Session Management
    checkUserSession();

    // Modals & Links
    if (signupBtn) signupBtn.addEventListener('click', (e) => { e.preventDefault(); onboardingModal.classList.add("active"); });
    if (heroSignupBtn) heroSignupBtn.addEventListener('click', (e) => { e.preventDefault(); onboardingModal.classList.add("active"); });
    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add("active"); });
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutBtnApp) logoutBtnApp.addEventListener('click', handleLogout);
    if (onboardingForm) onboardingForm.addEventListener("submit", handleSignUp);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    
    // Diagnosis Tool Listener
    const fileInputDiagnosis = document.getElementById('fileInputDiagnosis');
    if(fileInputDiagnosis) fileInputDiagnosis.addEventListener('change', handleDiagnosis);
});
