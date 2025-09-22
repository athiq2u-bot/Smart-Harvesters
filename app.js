const onboardingModal = document.getElementById("onboardingModal");
const onboardingForm = document.getElementById("onboardingForm");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const heroSignupBtn = document.getElementById("heroSignupBtn");
const navLinks = document.querySelector(".nav-links");

// FIX: Corrected variable names to match the actual element IDs in your HTML
const logoutBtn = document.getElementById("logoutBtn"); 
const logoutBtnApp = document.getElementById("logoutBtnApp");

const allPages = document.querySelectorAll(".page");

// --- API Keys ---
const OPENWEATHERMAP_API_KEY = '5a68735515c15c54366e665a388f6a96';
const MARKET_API_KEY = '5a3f12b7a9f8b4d8122d25d19e9927d6';
const DIAGNOSIS_API_KEY = '9a13a7c6b90c1f5d2b7c7b8c2d9e1f5d';
const GEMINI_API_KEY = 'AIzaSyCbdhnXy1JqSlhLTdOVNMb643AmQs4lOaw';

// --- Page Navigation & Modals ---
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
    
    if (mockUsers[username] === password) {
        localStorage.setItem('isLoggedIn', 'true');
        loginModal.classList.remove('active');
        checkUserSession();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    checkUserSession();
}

function checkUserSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasProfile = localStorage.getItem('smartHarvestersProfile');

    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (heroSignupBtn) heroSignupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
    if (logoutBtnApp) logoutBtnApp.style.display = isLoggedIn ? 'block' : 'none';

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

// --- Functions for Dashboard Data (mocked for brevity) ---
async function fetchWeather(location) { /* ... Your existing fetch logic ... */ }
async function fetchMarketData(crop) { /* ... Your existing mock data logic ... */ }
async function fetchSoilData(location) { /* ... Your existing mock data logic ... */ }

function initializeDashboard() {
    // Always use demo data if no user profile is present
    let farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile"));
    if (!farmerProfile) {
        farmerProfile = {
            name: "Demo Farmer",
            crop: "Rice",
            location: "Thrissur, Kerala",
            area: "2.5",
            sowingDate: "2025-08-01"
        };
    }

    const fakeWeather = {
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
            wind: '12 km/h SW',
            rain: '0.8 mm',
            sunrise: '06:12 AM',
            sunset: '06:45 PM',
            pressure: '1012 hPa',
            uv: 'High',
            visibility: '10 km'
        }
    };
    const fakeMarket = {
        price: '₹2,150/quintal',
        chart: [2100, 2150, 2120, 2180, 2200, 2150, 2170],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        trend: '+2.3% this week',
        lastUpdate: 'Today, 10:30 AM'
    };
    const fakeSoil = {
        npk: 'N: 120, P: 60, K: 80',
        ph: '6.7',
        chart: [6.5, 6.6, 6.7, 6.8, 6.7, 6.6, 6.7],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        moisture: '23%',
        organic: '2.1%'
    };
    const fakeCrop = {
        daysSinceSowing: 42,
        stage: 'Flowering',
        progress: 65,
        yield: '3.2 tons/acre',
        yieldInsight: 'Yield is on track for a good harvest.'
    };
    const fakeAlerts = [
        { tag: 'Severe', text: 'Heavy rain expected tomorrow. Take precautions.' },
        { tag: 'Moderate', text: 'Wind gusts may affect pollination.' },
        { tag: 'Info', text: 'Market price increased by 2% this week.' },
        { tag: 'Info', text: 'Soil moisture is optimal for rice.' }
    ];
    const fakeTips = [
        'Mulch your crops to retain soil moisture during hot days.',
        'Inspect your crops regularly for early signs of pests or disease.',
        'Irrigate early in the morning to reduce water loss from evaporation.',
        'Rotate crops each season to improve soil health and reduce pests.',
        'Test your soil pH every 3 months for optimal nutrient uptake.',
        'Use organic compost to boost soil fertility naturally.',
        'Keep farm records to track yield and input costs for better planning.'
    ];
    // Show a different tip each day (based on day of week)
    const today = new Date().getDay();
    const fakeTip = fakeTips[today % fakeTips.length];
    // Add extra data to dashboard
    // Market trend and update
    const marketTrend = document.getElementById('marketTrend');
    if (marketTrend) marketTrend.textContent = fakeMarket.trend;
    const marketUpdate = document.getElementById('marketUpdate');
    if (marketUpdate) marketUpdate.textContent = fakeMarket.lastUpdate;

    // Soil moisture and organic
    const soilMoisture = document.getElementById('soilMoisture');
    if (soilMoisture) soilMoisture.textContent = fakeSoil.moisture;
    const soilOrganic = document.getElementById('soilOrganic');
    if (soilOrganic) soilOrganic.textContent = fakeSoil.organic;

    // Weather details (pressure, uv, visibility)
    const weatherPressure = document.getElementById('weatherPressure');
    if (weatherPressure) weatherPressure.textContent = fakeWeather.details.pressure;
    const weatherUV = document.getElementById('weatherUV');
    if (weatherUV) weatherUV.textContent = fakeWeather.details.uv;
    const weatherVisibility = document.getElementById('weatherVisibility');
    if (weatherVisibility) weatherVisibility.textContent = fakeWeather.details.visibility;
    document.getElementById('phLevel').textContent = fakeSoil.ph;
    if (window.Chart) {
        const ctx = document.getElementById('soilChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: fakeSoil.labels,
                datasets: [{
                    label: 'Soil pH',
                    data: fakeSoil.chart,
                    borderColor: '#0A6640',
                    fill: false
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }

    // Market
    document.getElementById('currentPrice').textContent = fakeMarket.price;
    if (window.Chart) {
        const ctx = document.getElementById('marketChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: fakeMarket.labels,
                datasets: [{
                    label: 'Market Price',
                    data: fakeMarket.chart,
                    borderColor: '#FFD700',
                    fill: false
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }

    // Farm details (top)
    const farmDetails = document.getElementById('farmDetails');
    if (farmDetails) farmDetails.textContent = 'ATHIQ’s Farm (Rice, 2.5 acres)';

    console.log("Dashboard Initialized with fake data");
}

// --- Functions for AI Assistant ---
function initializeAiAssistant() {
    const chatBox = document.getElementById("chatBox");
    const textInput = document.getElementById("textInput");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const aiStatus = document.getElementById("aiStatus");
    
    // FIX: Clear chat history every time the assistant is opened
    if (chatBox) chatBox.innerHTML = '';

    if (!chatBox || !textInput || !sendBtn) {
        console.error("AI Assistant elements not found. Skipping initialization.");
        return;
    }

    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile"));
    const farmerName = farmerProfile ? farmerProfile.name : "Farmer";
    const farmerCrop = farmerProfile ? farmerProfile.crop : "your crop";
    const farmerLocation = farmerProfile ? farmerProfile.location : "your location";

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
        typingDiv.id = 'typing-indicator'; // Added ID for easy removal
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

    // FIX: Replaced mock logic with a real Gemini API call
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
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const data = await response.json();
            // Basic markdown for bolding text
            let responseText = data.candidates[0].content.parts[0].text;
            return responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
        recognition.lang = 'en-US';
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                recognition.start();
                if (aiStatus) {
                    aiStatus.textContent = "Listening...";
                    aiStatus.classList.add('typing');
                }
                voiceBtn.style.color = '#F44336';
            });
        }
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (textInput) textInput.value = transcript;
            processQuery(transcript);
        };
        recognition.onend = () => {
            if (voiceBtn) voiceBtn.style.color = 'var(--primary-color)';
        };
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (aiStatus) {
                aiStatus.textContent = "Error";
                aiStatus.classList.add('typing');
            }
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
    // ... (Your IntersectionObserver for animations remains the same)

    checkUserSession();

    if (signupBtn) signupBtn.addEventListener('click', (e) => { e.preventDefault(); onboardingModal.classList.add("active"); });
    if (heroSignupBtn) heroSignupBtn.addEventListener('click', (e) => { e.preventDefault(); onboardingModal.classList.add("active"); });
    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add("active"); });

    // FIX: Attached event listeners to the correct logout button variables
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutBtnApp) logoutBtnApp.addEventListener('click', handleLogout);

    if (onboardingForm) onboardingForm.addEventListener("submit", handleSignUp);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});
