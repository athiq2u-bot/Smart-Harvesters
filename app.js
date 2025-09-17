const onboardingModal = document.getElementById("onboardingModal");
const onboardingForm = document.getElementById("onboardingForm");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const heroSignupBtn = document.getElementById("heroSignupBtn");
const navLinks = document.querySelector(".nav-links");

// Select both logout buttons by their unique IDs
const logoutBtnHomepage = document.getElementById("logoutBtnHomepage");
const logoutBtnDashboard = document.getElementById("logoutBtnDashboard");

// Select all page containers using a consistent class
const allPages = document.querySelectorAll(".page");

// --- Realistic API Keys ---
const OPENWEATHERMAP_API_KEY = '5a68735515c15c54366e665a388f6a96';
const MARKET_API_KEY = '5a3f12b7a9f8b4d8122d25d19e9927d6';
const DIAGNOSIS_API_KEY = '9a13a7c6b90c1f5d2b7c7b8c2d9e1f5d';

// --- Page Navigation Function ---
function showPage(pageId) {
    // Hide all pages by removing the active class
    allPages.forEach(page => page.classList.remove('active'));
    
    // Show the requested page by adding the active class
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Initialize specific pages when they are shown
        if (pageId === 'dashboard-page') {
            initializeDashboard();
        } else if (pageId === 'ai-page') {
            initializeAiAssistant();
        }
    }
}

// Function to handle navigation to a specific section on the homepage
function showHomepageSection(sectionId) {
    showPage('homepage');
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    checkUserSession(); // Fixed: Call checkUserSession after sign-up
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
        checkUserSession(); // Fixed: Call checkUserSession after login
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    checkUserSession(); // Rerun session check to update UI
}

function checkUserSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasProfile = localStorage.getItem('smartHarvestersProfile');

    // Update visibility of navigation buttons
    if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (signupBtn) signupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (heroSignupBtn) heroSignupBtn.style.display = isLoggedIn ? 'none' : 'block';
    if (logoutBtnHomepage) logoutBtnHomepage.style.display = isLoggedIn ? 'block' : 'none';
    if (logoutBtnDashboard) logoutBtnDashboard.style.display = isLoggedIn ? 'block' : 'none';

    // Update navigation links for logged-in users
    const existingDashboardLink = navLinks.querySelector('a[onclick*="dashboard-page"]');
    if (isLoggedIn) {
        if (!existingDashboardLink) {
            const dashboardLink = document.createElement('a');
            dashboardLink.href = '#';
            dashboardLink.textContent = 'Dashboard';
            dashboardLink.onclick = () => showPage('dashboard-page');
            navLinks.insertBefore(dashboardLink, navLinks.firstChild);
        }
        if (!hasProfile) {
            onboardingModal.classList.add('active');
        } else {
            showPage('dashboard-page');
        }
    } else {
        if (existingDashboardLink) {
            existingDashboardLink.remove();
        }
        showPage('homepage');
    }
}

// --- Functions for Dashboard Data ---
async function fetchWeather(location) {
    try {
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`);
        const geoData = await geoResponse.json();
        if (!geoData || geoData.length === 0) throw new Error("Location not found.");
        const { lat, lon } = geoData[0];
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`);
        const forecastData = await forecastResponse.json();
        return {
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            cloudiness: weatherData.clouds.all,
            condition: weatherData.weather[0].description,
            forecast: forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5)
        };
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return { temp: 'N/A', humidity: 'N/A', windSpeed: 'N/A', cloudiness: 'N/A', condition: 'Data unavailable', forecast: [] };
    }
}

async function fetchMarketData(crop) {
    console.log(`Fetching market data for ${crop} with API Key: ${MARKET_API_KEY}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockData = {
        'rice': { currentPrice: 25.50, trend: [24.0, 24.5, 25.0, 25.8, 25.5] },
        'wheat': { currentPrice: 18.75, trend: [19.0, 18.8, 18.5, 18.0, 18.75] },
        'maize': { currentPrice: 12.00, trend: [11.5, 11.8, 12.0, 11.9, 12.0] },
        'potatoes': { currentPrice: 30.20, trend: [29.5, 30.0, 31.0, 30.8, 30.2] },
        'soybeans': { currentPrice: 45.00, trend: [44.0, 44.5, 45.0, 44.8, 45.0] },
        'coconut': { currentPrice: 35.00, trend: [34.5, 35.2, 34.8, 35.5, 35.0] },
        'rubber': { currentPrice: 150.00, trend: [148.0, 151.0, 150.5, 152.0, 150.0] },
        'cardamom': { currentPrice: 1200.00, trend: [1150.0, 1210.0, 1195.0, 1205.0, 1200.0] },
        'tea': { currentPrice: 250.00, trend: [245.0, 255.0, 248.0, 252.0, 250.0] }
    };
    return mockData[crop.toLowerCase()] || { currentPrice: 'N/A', trend: [] };
}

async function fetchSoilData(location) {
    console.log(`Fetching soil data for ${location}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        npk: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        ph: (Math.random() * 2 + 6).toFixed(1)
    };
}

function initializeDashboard() {
    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile"));
    if (!farmerProfile) return;
    
    // Select dashboard elements and add null checks
    const farmDetails = document.getElementById("farmDetails");
    const daysSinceSowing = document.getElementById("daysSinceSowing");
    const cropStage = document.getElementById("cropStage");
    const cropProgressBar = document.getElementById("cropProgressBar");
    const projectedYield = document.getElementById("projectedYield");
    const alertsList = document.getElementById("alertsList");
    const dailyTip = document.getElementById("dailyTip");
    const currentTemp = document.getElementById("currentTemp");
    const currentCondition = document.getElementById("currentCondition");
    const currentHumidity = document.getElementById("currentHumidity");
    const forecastList = document.getElementById("forecastList");
    const npkLevels = document.getElementById("npkLevels");
    const phLevel = document.getElementById("phLevel");
    const currentPrice = document.getElementById("currentPrice");

    if (farmDetails) {
        farmDetails.textContent = `${farmerProfile.name}'s Farm (${farmerProfile.crop}, ${farmerProfile.area} acres)`;
    }

    const cropData = {
        rice: { baseYield: 3.5, growthCycle: 120, stages: { vegetative: 40, flowering: 80, harvest: 120 }, tips: ["Ensure proper drainage to prevent root rot.", "Apply a balanced fertilizer after 30 days of sowing."] },
        wheat: { baseYield: 2.0, growthCycle: 150, stages: { vegetative: 50, flowering: 100, harvest: 150 }, tips: ["Check for signs of rust disease.", "Timely weeding helps reduce competition for nutrients."] },
        maize: { baseYield: 4.5, growthCycle: 100, stages: { vegetative: 30, flowering: 60, harvest: 100 }, tips: ["Monitor for corn borer infestations.", "Maize needs consistent moisture, especially during tasseling."] },
        potatoes: { baseYield: 15, growthCycle: 90, stages: { vegetative: 30, flowering: 50, harvest: 90 }, tips: ["Hilling is crucial to prevent greening of tubers.", "Watch out for late blight disease, especially in cool, wet weather."] },
        soybeans: { baseYield: 1.8, growthCycle: 110, stages: { vegetative: 35, flowering: 70, harvest: 110 }, tips: ["Proper seed inoculation is essential for nitrogen fixation.", "Scout for soybean aphid colonies on a weekly basis."] },
        coconut: { baseYield: 10000, growthCycle: 3650, stages: { vegetative: 1000, flowering: 2000, harvest: 3650 }, tips: ["Regular application of coconut husk is a great source of potassium.", "Maintain a clean basin around the tree to prevent pests."] },
        rubber: { baseYield: 1800, growthCycle: 7300, stages: { vegetative: 2000, flowering: 5000, harvest: 7300 }, tips: ["Proper tapping technique is vital to ensure tree longevity.", "Protect young trees from sun scorching with shades."] },
        cardamom: { baseYield: 250, growthCycle: 730, stages: { vegetative: 180, flowering: 400, harvest: 730 }, tips: ["Cardamom thrives in shade, so intercropping is often beneficial.", "Timely irrigation is crucial during the flowering and capsule development stages."] },
        tea: { baseYield: 2.5, growthCycle: 365, stages: { vegetative: 90, flowering: 200, harvest: 365 }, tips: ["Pruning is essential to maintain the flush and quality of leaves.", "Soil pH is critical for tea. Aim for a pH of 4.5 to 5.5."] }
    };
    const mockAlerts = { vegetative: { type: "info", message: "Initial irrigation is crucial for germination." }, flowering: { type: "severe", message: "Warning: High humidity can cause fungal diseases. Consider a preventative fungicide spray." } };

    async function updateDashboard() {
        const weather = await fetchWeather(farmerProfile.location);
        if (currentTemp) currentTemp.textContent = `${weather.temp}°C`;
        if (currentCondition) currentCondition.textContent = weather.condition;
        if (currentHumidity) currentHumidity.textContent = `${weather.humidity}%`;
        const currentWind = document.querySelector('#currentWind');
        if (currentWind) currentWind.textContent = `${weather.windSpeed} m/s`;
        const currentCloudiness = document.querySelector('#currentCloudiness');
        if (currentCloudiness) currentCloudiness.textContent = `${weather.cloudiness}%`;

        if (forecastList) {
            forecastList.innerHTML = weather.forecast.map(item => {
                const date = new Date(item.dt * 1000);
                return `<li><strong>${date.toDateString().substring(0, 3)}:</strong> ${item.main.temp}°C, ${item.weather[0].description}</li>`;
            }).join('');
        }
        
        const sowingDate = new Date(farmerProfile.sowingDate);
        const today = new Date();
        const days = Math.floor((today - sowingDate) / (1000 * 60 * 60 * 24));
        if (daysSinceSowing) daysSinceSowing.textContent = `Days since Sowing: ${days}`;
        const cropInfo = cropData[farmerProfile.crop.toLowerCase()] || {};
        const totalDays = cropInfo.growthCycle || 100;
        const progressPercentage = Math.min((days / totalDays) * 100, 100);
        if (cropProgressBar) cropProgressBar.style.width = `${progressPercentage}%`;
        let stage = "Early Growth";
        if (days >= cropInfo.stages.vegetative) stage = "Vegetative Stage";
        if (days >= cropInfo.stages.flowering) stage = "Flowering Stage";
        if (days >= cropInfo.stages.harvest) stage = "Harvest Ready";
        if (cropStage) cropStage.textContent = `Stage: ${stage}`;
        const projected = (farmerProfile.area * (cropInfo.baseYield || 1)).toFixed(2);
        if (projectedYield) projectedYield.textContent = `Projected Yield: ${projected} tons`;

        const alerts = [];
        if (days >= cropInfo.stages.vegetative && days < cropInfo.stages.flowering) { alerts.push(mockAlerts.vegetative); }
        if (days >= cropInfo.stages.flowering && days < cropInfo.stages.harvest) { alerts.push(mockAlerts.flowering); }
        if (alerts.length === 0) { alerts.push({ type: "info", message: "No major alerts. Your farm is in great condition!" }); }
        if (alertsList) {
            alertsList.innerHTML = alerts.map(alert => `<li><span class="alert-tag ${alert.type}">${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</span> ${alert.message}</li>`).join('');
        }
        if (dailyTip) dailyTip.textContent = cropInfo.tips ? cropInfo.tips[Math.floor(Math.random() * cropInfo.tips.length)] : "No tips available for this crop.";

        const soilData = await fetchSoilData(farmerProfile.location);
        if (npkLevels) npkLevels.textContent = `N:${soilData.npk[0]} P:${soilData.npk[1]} K:${soilData.npk[2]}`;
        if (phLevel) phLevel.textContent = soilData.ph;
        updateSoilChart(soilData.npk);

        const marketData = await fetchMarketData(farmerProfile.crop);
        if (currentPrice) currentPrice.textContent = `₹${marketData.currentPrice.toFixed(2)}/kg`;
        updateMarketChart(marketData.trend);
    }
    updateDashboard();

    const yieldData = { labels: ['Sowing', 'Vegetative', 'Flowering', 'Harvest'], datasets: [{ label: 'Projected Yield', data: [0.1, 1.2, 2.5, 3.5], borderColor: '#0A6640', backgroundColor: 'rgba(10, 102, 64, 0.2)', tension: 0.4, fill: true }] };
    const yieldConfig = { type: 'line', data: yieldData, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Yield (tons)' } }, x: { title: { display: true, text: 'Growth Stage' } } } } };
    const yieldChartElement = document.getElementById('yieldChart');
    if (yieldChartElement) { new Chart(yieldChartElement, yieldConfig); }

    let soilChart;
    function updateSoilChart(data) {
        const soilChartElement = document.getElementById('soilChart');
        if (!soilChartElement) return;
        if (soilChart) {
            soilChart.destroy();
        }
        const soilData = { labels: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)'], datasets: [{ label: 'NPK Levels', data: data, backgroundColor: ['#FFD700', '#2196F3', '#FF5722'], borderColor: '#fff', hoverOffset: 4 }] };
        const soilConfig = { type: 'doughnut', data: soilData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } } };
        soilChart = new Chart(soilChartElement, soilConfig);
    }

    let marketChart;
    function updateMarketChart(data) {
        const marketChartElement = document.getElementById('marketChart');
        if (!marketChartElement) return;
        if (marketChart) {
            marketChart.destroy();
        }
        const marketData = { labels: ['Day -4', 'Day -3', 'Day -2', 'Day -1', 'Today'], datasets: [{ label: 'Market Price (₹/kg)', data: data, borderColor: '#FF5722', tension: 0.4, fill: false }] };
        const marketConfig = { type: 'line', data: marketData, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Price (₹)' } }, x: { display: false } } } };
        marketChart = new Chart(marketChartElement, marketConfig);
    }
}

// --- Functions for AI Assistant ---
function initializeAiAssistant() {
    const chatBox = document.getElementById("chatBox");
    const textInput = document.getElementById("textInput");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const aiStatus = document.getElementById("aiStatus");
    
    // Check for the required elements before proceeding
    if (!chatBox || !textInput || !sendBtn) {
        console.error("AI Assistant elements not found. Skipping initialization.");
        return;
    }

    const farmerProfile = JSON.parse(localStorage.getItem("smartHarvestersProfile"));
    const farmerName = farmerProfile ? farmerProfile.name : "Farmer";
    const farmerCrop = farmerProfile ? farmerProfile.crop : "your crop";
    const farmerLocation = farmerProfile ? farmerProfile.location : "your location";

    const knowledgeBase = {
        greetings: [`Hello ${farmerName}! I'm Vera, your personalized farm advisor. How can I help with your ${farmerCrop} farm?`, `Hi ${farmerName}! What's on your mind today?`],
        rice: {
            pest: "For Rice, watch out for the Brown Plant Hopper and Rice Stem Borer. Systemic insecticides are effective. For organic solutions, a Neem oil spray works well.",
            disease: "Rice Blast and Sheath Blight are common. Maintain proper plant spacing and consider a preventative fungicide application.",
            irrigation: "Paddy fields need to be submerged. Maintain a water depth of 5-10 cm, but be careful of waterlogging, which can cause root damage.",
            fertilizer: "Apply NPK fertilizer in a split application. Urea provides nitrogen for healthy leaf growth. Consult your soil health card for precise dosages.",
            hack: "A simple hack to check soil moisture is the 'squeeze test.' Squeeze a handful of soil; if it forms a ball but crumbles easily, the moisture is just right."
        },
        wheat: {
            pest: "Aphids and armyworms are common pests. A balanced insecticide application can control them.",
            disease: "Wheat Rust is a major threat. Use disease-resistant varieties if possible and apply a broad-spectrum fungicide early in the season.",
            irrigation: "Wheat needs irrigation at critical growth stages: crown root initiation, jointing, and flowering. Over-irrigation can lead to fungal issues.",
            fertilizer: "Wheat requires a high amount of nitrogen. Apply DAP and Urea at the time of sowing and during the vegetative stage.",
            hack: "To prevent seed-borne diseases, treat your seeds with a fungicide before sowing. It's a simple step that can prevent major losses later on."
        },
        maize: {
            pest: "Common pests for maize are the Corn Borer and Fall Armyworm. You can use pheromone traps for monitoring or insecticides as needed.",
            disease: "Maize is susceptible to Leaf Blight. Proper field sanitation and fungicidal sprays can help.",
            irrigation: "Maize is a heavy feeder of water. It needs consistent watering, especially during the silking stage.",
            fertilizer: "Apply a good starter fertilizer with phosphorus at planting. Nitrogen is critical during the vegetative and reproductive stages.",
            hack: "For weed control, consider inter-row cultivation. This reduces herbicide use and helps aerate the soil."
        },
        potatoes: {
            pest: "Colorado Potato Beetles are a major threat. Hand-picking or using specific insecticides can manage them.",
            disease: "Late Blight is a devastating disease. Use resistant varieties and a preventative fungicide program is highly recommended.",
            irrigation: "Potatoes require consistent soil moisture to prevent issues like common scab. Drip irrigation is ideal.",
            fertilizer: "Potatoes need balanced NPK. Potassium is especially important for tuber size and quality.",
            hack: "Hilling your potato plants regularly helps protect the tubers from sunlight, which prevents them from turning green."
        },
        soybeans: {
            pest: "Soybean Aphids can cause significant yield loss. Monitor their populations closely.",
            disease: "Soybean Cyst Nematode is a major threat. Using resistant varieties is the best long-term strategy.",
            irrigation: "Soybeans are drought-tolerant but irrigation during pod-filling can significantly increase yields.",
            fertilizer: "Soybeans fix their own nitrogen from the air. A small amount of starter nitrogen is fine, but phosphorus and potassium are more important.",
            hack: "Proper seed inoculation with Rhizobium bacteria can boost nitrogen fixation and plant health."
        },
        coconut: {
            pest: "The Rhinoceros beetle and Red palm weevil are major pests. Pheromone traps and prophylactic treatments can be effective.",
            disease: "Root wilt and Bud rot are common diseases. Remove affected palms and maintain good field sanitation.",
            irrigation: "Regular watering, especially during summer, is vital for high yield. Basins should be mulched to retain moisture.",
            fertilizer: "Coconuts need a balanced fertilizer mix rich in potassium. Apply organic manure annually.",
            hack: "Intercropping with crops like pepper or cocoa can provide additional income and create a beneficial ecosystem for the palms."
        },
        rubber: {
            pest: "Scale insects and mealybugs are common. Use contact insecticides or a neem-based solution.",
            disease: "Powdery mildew and abnormal leaf fall are frequent issues. Fungicide sprays during the defoliation and refoliation periods are crucial.",
            irrigation: "Rubber trees are generally rainfed, but young plants need regular watering during dry spells.",
            fertilizer: "Apply a balanced NPK mixture, particularly during the rainy season. Young trees require more nitrogen for growth.",
            hack: "Cover cropping with legumes helps suppress weeds, prevent soil erosion, and enrich the soil with nitrogen."
        },
        cardamom: {
            pest: "Shoot borer and thrips are the main pests. Integrated pest management, including natural predators, is recommended.",
            disease: "A common issue is Katte or mosaic disease. Use disease-free seedlings and rogue out infected plants immediately.",
            irrigation: "Cardamom thrives on moisture. Drip irrigation is ideal, and it's essential to irrigate during dry periods to ensure flowering.",
            fertilizer: "Apply organic manure and a balanced fertilizer. Cardamom responds well to foliar sprays of micronutrients.",
            hack: "Cardamom is an understory crop. Maintaining a light shade by preserving forest trees is key to its growth and productivity."
        },
        tea: {
            pest: "Tea mosquito bug, termites, and red spider mites are common. Use pest-specific pesticides and maintain clean tea gardens.",
            disease: "Blister blight is a major fungal disease. Use resistant clones and apply fungicides during high-humidity periods.",
            irrigation: "Tea requires well-distributed rainfall. Drip or sprinkler irrigation is necessary during drought periods to prevent yield loss.",
            fertilizer: "Tea requires high nitrogen, so frequent application of urea is common. An acidic soil pH (4.5-5.5) is critical for nutrient uptake.",
            hack: "The 'plucking' technique is vital. A good plucker will take only the 'two leaves and a bud' to ensure high-quality tea."
        },
        general: {
            weather: async () => {
                const weather = await fetchWeather(farmerLocation);
                return `The current weather in ${farmerLocation} is ${weather.condition} with a temperature of ${weather.temp}°C, a humidity of ${weather.humidity}%, and wind speed of ${weather.windSpeed} m/s. You can also check the 5-day weather forecast on your dashboard.`;
            },
            soil: "For healthy soil, consider crop rotation and the use of organic matter like compost. It improves soil structure and nutrient retention. You can also view your NPK and pH levels on your dashboard.",
            market: async () => {
                const market = await fetchMarketData(farmerCrop);
                return `The current market price for ${farmerCrop} is ₹${market.currentPrice.toFixed(2)} per kg.`;
            },
        },
        default: "I'm sorry, I can't find information on that. Could you please rephrase your question or ask about a different farming topic? For example, you can ask about 'pests', 'irrigation', or 'fertilizers' for your crop."
    };

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
        typingDiv.innerHTML = `<span class="ai-avatar">👩‍🌾</span><div class="message-bubble typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        if (aiStatus) {
            aiStatus.textContent = "Typing...";
            aiStatus.classList.remove('online');
            aiStatus.classList.add('typing');
        }
        return typingDiv;
    }

    async function getAiResponse(query) {
        const lowerQuery = query.toLowerCase();
        const cropInfo = knowledgeBase[farmerCrop.toLowerCase()];
        let response = knowledgeBase.default;

        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            response = knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        } else if (lowerQuery.includes('weather') || lowerQuery.includes('forecast') || lowerQuery.includes('rain')) {
            response = await knowledgeBase.general.weather();
        } else if (lowerQuery.includes('market') || lowerQuery.includes('price')) {
            response = await knowledgeBase.general.market();
        } else if (lowerQuery.includes('pest') || lowerQuery.includes('insect') || lowerQuery.includes('bug')) {
            response = cropInfo?.pest || knowledgeBase.default;
        } else if (lowerQuery.includes('disease') || lowerQuery.includes('fungus')) {
            response = cropInfo?.disease || knowledgeBase.default;
        } else if (lowerQuery.includes('irrigation') || lowerQuery.includes('water')) {
            response = cropInfo?.irrigation || knowledgeBase.default;
        } else if (lowerQuery.includes('fertilizer') || lowerQuery.includes('nutrient')) {
            response = cropInfo?.fertilizer || knowledgeBase.default;
        } else if (lowerQuery.includes('hack') || lowerQuery.includes('tip') || lowerQuery.includes('trick')) {
            response = cropInfo?.hack || knowledgeBase.default;
        } else if (lowerQuery.includes('soil') || lowerQuery.includes('ph') || lowerQuery.includes('npk')) {
            response = knowledgeBase.general.soil;
        } else if (lowerQuery.includes('image') || lowerQuery.includes('photo')) {
            response = `I can't analyze images just yet, but if you have a photo of a pest or disease, you can use the "Pest & Disease Diagnosis" tool on the Resources page to get a quick answer.`;
        } else {
            response = knowledgeBase.default;
        }
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 1000));
        return response;
    }

    async function processQuery(query) {
        if (!query.trim()) return;
        addMessage(query, 'user');
        textInput.value = '';
        const typingIndicator = showTypingIndicator();
        const aiResponse = await getAiResponse(query);
        chatBox.removeChild(typingIndicator);
        addMessage(aiResponse, 'ai');
        if (aiStatus) {
            aiStatus.textContent = "Online";
            aiStatus.classList.remove('typing');
            aiStatus.classList.add('online');
        }
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        if (voiceBtn) { // Null check for the voice button
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
    addMessage(knowledgeBase.greetings[0], 'ai');
}

document.addEventListener('DOMContentLoaded', () => {
    // Check for the existence of homepage sections before running animations
    const homepageHeader = document.getElementById("homepage-header");
    const homepageSections = document.getElementById("homepage-sections");
    if (homepageHeader && homepageSections) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        animatedElements.forEach(el => observer.observe(el));
    }

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
        loginModal.classList.add('active');
    });
    
    // Attach event listeners to both logout buttons
    if (logoutBtnHomepage) logoutBtnHomepage.addEventListener('click', handleLogout);
    if (logoutBtnDashboard) logoutBtnDashboard.addEventListener('click', handleLogout);

    if (onboardingForm) onboardingForm.addEventListener("submit", handleSignUp);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});