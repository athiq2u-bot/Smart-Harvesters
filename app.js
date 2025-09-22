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
    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile"));
    if (!farmerProfile) return;
    
    // ... (The rest of your dashboard initialization logic remains here)
    console.log("Dashboard Initialized for", farmerProfile.name);
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
