const onboardingModal = document.getElementById("onboardingModal");
const onboardingForm = document.getElementById("onboardingForm");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const heroSignupBtn = document.getElementById("heroSignupBtn");
const navLinks = document.querySelector(".nav-links");

const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnApp = document.getElementById("logoutBtnApp");

const allPages = document.querySelectorAll(".page");

// --- API Keys ---
// These are placeholders. In a real application, they would be loaded securely.
const OPENWEATHERMAP_API_KEY = '9f373f525f978c4b862cfb0a86993181';
const MARKET_API_KEY = '5a3f12b7a9f8b4d8122d25d19e9927d6';
const DIAGNOSIS_API_KEY = '9a13a7c6b90c1f5d2b7c7b8c2d9e1f5d';
const GEMINI_API_KEY = 'AIzaSyCbdhnXy1JqSlhLTdOVNMb643AmQs4lOaw';

// --- Page Navigation & Modals ---
/**
 * Shows a specific page and hides all others.
 * @param {string} pageId The ID of the page to show.
 */
function showPage(pageId) {
    allPages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        if (pageId === 'dashboard-page') {
            initializeDashboard();
        } else if (pageId === 'ai-page') {
            initializeAiAssistant();
        }
    }
}

/**
 * Scrolls to a specific section on the homepage.
 * @param {string} sectionId The ID of the section to scroll to.
 */
function showHomepageSection(sectionId) {
    showPage('homepage');
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Closes a modal.
 * @param {string} modalId The ID of the modal to close.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// --- User Authentication & Session Management ---
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
    const mockUsers = {
        'farmer': 'pass',
        'aman': '12345',
        'sita': 'securepass'
    };
    
    if (mockUsers[username] && mockUsers[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        loginModal.classList.remove('active');
        checkUserSession();
    } else {
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.style.display = 'block';
        }
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    checkUserSession();
    showPage('homepage');
}

/**
 * Checks the user's session state and updates the UI accordingly.
 */
function checkUserSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasProfile = localStorage.getItem('smartHarvestersProfile');

    // Update buttons visibility
    loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    signupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (heroSignupBtn) heroSignupBtn.style.display = isLoggedIn ? 'none' : 'block';
    logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
    if (logoutBtnApp) logoutBtnApp.style.display = isLoggedIn ? 'block' : 'none';

    // Add or remove Dashboard link
    const existingDashboardLink = navLinks.querySelector('a[onclick*="dashboard-page"]');
    if (isLoggedIn) {
        if (!existingDashboardLink) {
            const dashboardLink = document.createElement('a');
            dashboardLink.href = '#';
            dashboardLink.textContent = 'Dashboard';
            dashboardLink.onclick = () => showPage('dashboard-page');
            navLinks.insertBefore(dashboardLink, navLinks.firstChild);
        }
        if (hasProfile) {
            showPage('dashboard-page');
        } else {
            onboardingModal.classList.add('active');
            showPage('homepage');
        }
    } else {
        if (existingDashboardLink) {
            existingDashboardLink.remove();
        }
        showPage('homepage');
    }
}

// --- Mock Data for Dashboard ---
const DEMO_DATA = {
    weather: {
        temp: '29°C',
        condition: 'Partly Cloudy',
        humidity: '68%',
        wind: '12 km/h SW',
        rain: '0.8 mm',
        sunrise: '06:12 AM',
        sunset: '06:45 PM',
        forecast: [
            { day: 'Mon', icon: '☀️', temp: '30°C' },
            { day: 'Tue', icon: '🌦️', temp: '28°C' },
            { day: 'Wed', icon: '🌧️', temp: '27°C' },
            { day: 'Thu', icon: '⛅', temp: '29°C' },
            { day: 'Fri', icon: '☀️', temp: '31°C' }
        ],
        details: {
            pressure: '1012 hPa',
            uv: 'High',
            visibility: '10 km'
        }
    },
    market: {
        price: '₹2,150/quintal',
        chart: [2100, 2150, 2120, 2180, 2200, 2150, 2170],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        trend: '+2.3% this week',
        lastUpdate: 'Today, 10:30 AM'
    },
    soil: {
        npk: 'N: 120, P: 60, K: 80',
        ph: '6.7',
        chart: [6.5, 6.6, 6.7, 6.8, 6.7, 6.6, 6.7],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        moisture: '23%',
        organic: '2.1%'
    },
    crop: {
        daysSinceSowing: 42,
        stage: 'Flowering',
        progress: 65,
        yield: '3.2 tons/acre',
        yieldInsight: 'Yield is on track for a good harvest.'
    },
    alerts: [
        { tag: 'Severe', text: 'Heavy rain expected tomorrow. Take precautions.' },
        { tag: 'Moderate', text: 'Wind gusts may affect pollination.' },
        { tag: 'Info', text: 'Market price increased by 2% this week.' },
        { tag: 'Info', text: 'Soil moisture is optimal for rice.' }
    ],
    tips: [
        'Mulch your crops to retain soil moisture during hot days.',
        'Inspect your crops regularly for early signs of pests or disease.',
        'Irrigate early in the morning to reduce water loss from evaporation.',
        'Rotate crops each season to improve soil health and reduce pests.',
        'Test your soil pH every 3 months for optimal nutrient uptake.',
        'Use organic compost to boost soil fertility naturally.',
        'Keep farm records to track yield and input costs for better planning.'
    ]
};

// --- Dashboard Initialization and Data Rendering ---
async function initializeDashboard() {
    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || {
        name: "Demo Farmer",
        crop: "Rice",
        location: "Thrissur, Kerala",
        area: "2.5",
        sowingDate: "2025-08-01"
    };

    // Update farm details
    const farmDetails = document.getElementById('farmDetails');
    if (farmDetails) {
        farmDetails.textContent = `${farmerProfile.name}'s Farm (${farmerProfile.crop}, ${farmerProfile.area} acres)`;
    }

    // Update weather card
    const weatherData = DEMO_DATA.weather;
    document.getElementById('currentTemp').textContent = weatherData.temp;
    document.getElementById('currentCondition').textContent = weatherData.condition;
    document.getElementById('currentHumidity').textContent = weatherData.humidity;
    document.getElementById('weatherWind').textContent = weatherData.details.wind;
    document.getElementById('weatherRain').textContent = weatherData.details.rain;
    document.getElementById('weatherSunrise').textContent = weatherData.details.sunrise;
    document.getElementById('weatherSunset').textContent = weatherData.details.sunset;
    // Update forecast list
    const forecastList = document.getElementById('forecastList');
    if (forecastList) {
        forecastList.innerHTML = weatherData.forecast.map(day => 
            `<li><span class="emoji">${day.icon}</span> ${day.day}: ${day.temp}</li>`
        ).join('');
    }

    // Update crop progress
    const cropData = DEMO_DATA.crop;
    document.getElementById('daysSinceSowing').textContent = `Days since Sowing: ${cropData.daysSinceSowing}`;
    document.getElementById('cropStage').textContent = `Stage: ${cropData.stage}`;
    const cropProgressBar = document.getElementById('cropProgressBar');
    if (cropProgressBar) {
        cropProgressBar.style.width = `${cropData.progress}%`;
    }

    // Update yield and insights
    document.getElementById('projectedYield').textContent = `Projected Yield: ${cropData.yield}`;
    document.getElementById('yieldInsight').textContent = cropData.yieldInsight;

    // Update alerts
    const alertsList = document.getElementById('alertsList');
    if (alertsList) {
        alertsList.innerHTML = DEMO_DATA.alerts.map(alert => 
            `<li><span class="alert-tag ${alert.tag.toLowerCase()}">${alert.tag}</span> ${alert.text}</li>`
        ).join('');
    }

    // Update daily tip
    const today = new Date().getDay();
    document.getElementById('dailyTip').textContent = DEMO_DATA.tips[today % DEMO_DATA.tips.length];

    // Update soil health
    const soilData = DEMO_DATA.soil;
    document.getElementById('npkLevels').textContent = soilData.npk;
    document.getElementById('phLevel').textContent = soilData.ph;
    
    // Update market prices
    const marketData = DEMO_DATA.market;
    document.getElementById('currentPrice').textContent = marketData.price;

    // Initialize charts
    if (window.Chart) {
        const yieldCtx = document.getElementById('yieldChart').getContext('2d');
        new Chart(yieldCtx, {
            type: 'line', data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{ label: 'Expected Yield (tons)', data: [1.2, 1.5, 1.8, 2.0, 2.1], borderColor: '#0A6640', tension: 0.1 }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        const soilCtx = document.getElementById('soilChart').getContext('2d');
        new Chart(soilCtx, {
            type: 'bar', data: {
                labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
                datasets: [{ label: 'NPK Levels (kg/ha)', data: [120, 80, 150], backgroundColor: ['#2E8B57', '#FFD700', '#2F4F4F'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });

        const marketCtx = document.getElementById('marketChart').getContext('2d');
        new Chart(marketCtx, {
            type: 'line', data: {
                labels: marketData.labels,
                datasets: [{ label: 'Market Price (₹/kg)', data: marketData.chart, borderColor: '#2196F3', tension: 0.4 }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    console.log("Dashboard Initialized with demo data.");
}

// --- Functions for AI Assistant ---
function initializeAiAssistant() {
    const chatBox = document.getElementById("chatBox");
    const textInput = document.getElementById("textInput");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const aiStatus = document.getElementById("aiStatus");
    
    if (chatBox) chatBox.innerHTML = '';

    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile")) || {
        name: "Demo Farmer",
        crop: "Rice",
        location: "Thrissur, Kerala"
    };
    const { name: farmerName, crop: farmerCrop, location: farmerLocation } = farmerProfile;

    /**
     * Appends a message to the chat box.
     * @param {string} text The message text.
     * @param {'user'|'ai'} sender The sender of the message.
     */
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.innerHTML = `<p>${text}</p>`;
        if (sender === 'ai') {
            const avatar = document.createElement('span');
            avatar.classList.add('ai-avatar');
            avatar.textContent = '👩‍🌾';
            messageDiv.appendChild(avatar);
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

    async function getAiResponse(query) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            return "Please add your Gemini API key in the script to enable the AI assistant.";
        }
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const prompt = `You are Vera, a helpful AI farming assistant for an app called Smart Harvesters. The user's name is ${farmerName}. They are located in/near ${farmerLocation}. They are currently growing ${farmerCrop}. You must answer their questions concisely and in a helpful, friendly tone, specifically for their crop and location. If the user asks a general question, greet them by name. User's question: "${query}"`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            if (!response.ok) {
                console.error('API response error:', await response.text());
                throw new Error(`API error: ${response.statusText}`);
            }
            const data = await response.json();
            const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (responseText) {
                return responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }
            return "I'm sorry, I couldn't generate a response. The API returned an invalid format.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "I'm having trouble connecting right now. Please try again later.";
        }
    }

    async function processQuery(query) {
        if (!query.trim()) return;
        addMessage(query, 'user');
        textInput.value = '';
        showTypingIndicator();
        const aiResponse = await getAiResponse(query);
        removeTypingIndicator();
        addMessage(aiResponse, 'ai');
    }

    // --- SpeechRecognition Logic ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Set language to Indian English
        recognition.continuous = false;
        recognition.interimResults = false;

        if (voiceBtn) {
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
        }
        
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
    } else {
        console.warn("Speech Recognition not supported by your browser.");
        if (voiceBtn) voiceBtn.style.display = 'none';
    }

    if (sendBtn) sendBtn.addEventListener('click', () => processQuery(textInput.value));
    if (textInput) textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processQuery(textInput.value);
    });

    addMessage(`Hello ${farmerName}! I'm Vera, your personalized farm advisor. How can I help with your ${farmerCrop} farm today?`, 'ai');
}

// --- Global Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    checkUserSession();

    if (signupBtn) signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onboardingModal.classList.add("active");
    });
    if (heroSignupBtn) heroSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onboardingModal.classList.add("active");
    });
    if (loginBtn) loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add("active");
    });

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutBtnApp) logoutBtnApp.addEventListener('click', handleLogout);

    if (onboardingForm) onboardingForm.addEventListener("submit", handleSignUp);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});
