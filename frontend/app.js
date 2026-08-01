/**
 * RetailVision AI - Modern ES6 Application State & Live FastAPI Frontend Bridge
 * Connects directly to running FastAPI backend at http://localhost:8000 with seamless offline fallback demo capability.
 * Now featuring Randomized Demonstrations across ALL 4 AI Modules in a sleek Bluish SaaS Theme!
 */

// Automatically adapt API URL between development (localhost) and deployed cloud production domains
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') 
    ? 'http://localhost:8000' 
    : window.location.origin;

// Global State
const appState = {
    currentView: 'landing',
    currentTab: 'overview',
    apiConnected: false,
    stats: {
        visitors: 124,
        sentiment: 92,
        scanned: 387,
        resolution: 95
    }
};

// 1. 20 Diversified E-Commerce Demo Products
const DEMO_PRODUCTS = [
    { label: "Nike Air Zoom Pegasus (Sportswear)", category: "Footwear (Shoes)", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", conf: 98.4, latency: 4.12, stock: "24 Units in Stock", alt1: ["Bags & Accessories", 1.2], alt2: ["Apparel / Clothing", 0.4] },
    { label: "Apple AirPods Max Wireless Headphones", category: "Store Electronics", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", conf: 99.1, latency: 3.84, stock: "12 Units in Stock", alt1: ["Smart Wearables", 0.7], alt2: ["Luxury Accessories", 0.2] },
    { label: "Sony Oiltan Leather Smart Watch", category: "Wearables & Luxury", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", conf: 97.6, latency: 4.45, stock: "8 Units in Stock", alt1: ["Store Electronics", 1.8], alt2: ["Footwear (Shoes)", 0.6] },
    { label: "North Face Winter Insulated Parka", category: "Apparel / Clothing", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop", conf: 96.8, latency: 5.10, stock: "19 Units in Stock", alt1: ["Outdoor Sports", 2.3], alt2: ["Bags & Accessories", 0.9] },
    { label: "Matte Black Commuter Travel Backpack", category: "Bags & Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", conf: 98.9, latency: 3.92, stock: "31 Units in Stock", alt1: ["Apparel / Clothing", 0.8], alt2: ["Footwear (Shoes)", 0.3] },
    { label: "Ray-Ban Classic Aviator Sunglasses", category: "Eyewear & Fashion", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", conf: 99.4, latency: 3.50, stock: "15 Units in Stock", alt1: ["Luxury Accessories", 0.5], alt2: ["Jewelry & Gems", 0.1] },
    { label: "Chanel No.5 Luxury Eau De Parfum", category: "Beauty & Cosmetics", img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop", conf: 98.2, latency: 4.05, stock: "6 Units (Low Stock)", alt1: ["Personal Wellness", 1.4], alt2: ["Luxury Glass", 0.4] },
    { label: "Polaroid OneStep Instant Film Camera", category: "Store Electronics", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop", conf: 97.9, latency: 4.60, stock: "9 Units in Stock", alt1: ["Home Appliances", 1.5], alt2: ["Toy & Collectibles", 0.6] },
    { label: "Adidas Ultraboost White Running Shoe", category: "Footwear (Shoes)", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop", conf: 99.0, latency: 3.75, stock: "42 Units in Stock", alt1: ["Apparel / Clothing", 0.7], alt2: ["Bags & Accessories", 0.3] },
    { label: "Apple iPhone 15 Pro Max (Titanium)", category: "Smartphones & Telephony", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop", conf: 99.8, latency: 3.20, stock: "5 Units (Special Display)", alt1: ["Store Electronics", 0.1], alt2: ["Smart Tablets", 0.1] },
    { label: "Artisanal Organic Colombian Roast Coffee (1kg)", category: "Groceries & Gourmet", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop", conf: 95.7, latency: 5.25, stock: "64 Units in Stock", alt1: ["Household pantry", 3.1], alt2: ["Confectionery", 1.2] },
    { label: "Hydro Flask Stainless Steel Water Bottle", category: "Sportswear & Outdoors", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop", conf: 98.6, latency: 4.10, stock: "38 Units in Stock", alt1: ["Home Kitchen", 1.1], alt2: ["Groceries & Wellness", 0.3] },
    { label: "Levi's 501 Original Fit Dark Indigo Denim", category: "Apparel / Clothing", img: "https://images.unsplash.com/photo-1542272604-7809323753cf?q=80&w=1000&auto=format&fit=crop", conf: 97.4, latency: 4.80, stock: "22 Units in Stock", alt1: ["Bags & Accessories", 1.9], alt2: ["Footwear (Shoes)", 0.7] },
    { label: "Canon EOS R5 Mirrorless Digital DSLR", category: "Store Electronics", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop", conf: 99.5, latency: 3.65, stock: "3 Units (Locked Cabinet)", alt1: ["Professional Audio", 0.4], alt2: ["Optical Accessories", 0.1] },
    { label: "Dyson Supersonic Ionic Hair Dryer", category: "Beauty & Appliances", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop", conf: 98.8, latency: 3.90, stock: "14 Units in Stock", alt1: ["Store Electronics", 0.9], alt2: ["Skincare & Beauty", 0.3] },
    { label: "MacBook Pro M3 Max Space Black (16-inch)", category: "Computing & Laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop", conf: 99.7, latency: 3.15, stock: "7 Units in Stock", alt1: ["Smart Tablets", 0.2], alt2: ["Store Electronics", 0.1] },
    { label: "L'Occitane Shea Butter Ultra Rich Cream", category: "Skincare & Beauty", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop", conf: 96.5, latency: 5.02, stock: "55 Units in Stock", alt1: ["Beauty & Cosmetics", 2.4], alt2: ["Groceries & Wellness", 1.1] },
    { label: "Gourmet Belgian Truffle Dark Chocolate Box", category: "Confectionery & Food", img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop", conf: 97.1, latency: 4.70, stock: "80 Units in Stock", alt1: ["Groceries & Gourmet", 2.2], alt2: ["Gift Sets", 0.7] },
    { label: "Bose SoundLink Flex Portable Bluetooth Speaker", category: "Store Electronics", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop", conf: 98.7, latency: 3.98, stock: "18 Units in Stock", alt1: ["Outdoor Sports", 1.0], alt2: ["Computing Accessories", 0.3] },
    { label: "Classic Cashmere Neutral Trench Coat", category: "Luxury Apparel", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop", conf: 98.3, latency: 4.30, stock: "9 Units in Stock", alt1: ["Apparel / Clothing", 1.3], alt2: ["Bags & Accessories", 0.4] }
];

// 2. 8 Diversified VIP Customer Profiles for Facial Recognition
const DEMO_FACES = [
    { id: 1008, name: "Alex Mercer", initials: "AM", tier: "VIP Gold Loyalty Member", visits: 24, pts: "1,450 pts", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-emerald-500", textCol: "text-emerald-300" },
    { id: 1014, name: "Elena Rostova", initials: "ER", tier: "Diamond Royalty Member", visits: 48, pts: "4,820 pts", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-blue-500", textCol: "text-blue-300" },
    { id: 1022, name: "Marcus Vance", initials: "MV", tier: "Platinum Star Member", visits: 15, pts: "920 pts", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-cyan-500", textCol: "text-cyan-300" },
    { id: 1035, name: "Chloe Zhao", initials: "CZ", tier: "VIP Gold Loyalty Member", visits: 31, pts: "2,100 pts", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-emerald-500", textCol: "text-emerald-300" },
    { id: 1040, name: "David Sterling", initials: "DS", tier: "Silver Explorer Member", visits: 6, pts: "340 pts", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-teal-500", textCol: "text-teal-300" },
    { id: 1055, name: "Aria Montgomery", initials: "AM", tier: "Diamond Royalty Member", visits: 62, pts: "7,450 pts", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-blue-500", textCol: "text-blue-300" },
    { id: 1061, name: "Vikram Patel", initials: "VP", tier: "Platinum Star Member", visits: 19, pts: "1,280 pts", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-cyan-500", textCol: "text-cyan-300" },
    { id: 1072, name: "Sophie Laurent", initials: "SL", tier: "VIP Gold Loyalty Member", visits: 28, pts: "1,890 pts", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop", badgeBg: "bg-emerald-500", textCol: "text-emerald-300" }
];

// 3. 12 Diversified Sentiment Review Samples (Positive, Negative, Neutral)
const DEMO_REVIEWS = [
    "The material quality on this winter jacket is absolutely exceptional, and the store pickup was incredibly fast! Highly recommend this brand for quality apparel.",
    "Terrible customer service today. The line at checkout took 45 minutes and the cashier was very unhelpful and rude. Very disappointed!",
    "The running shoes fit decently well and seem durable, but the color is slightly darker than the photos online.",
    "Absolutely love my new Apple AirPods wireless headphones! The noise cancellation is breathtaking and battery life lasts for days!",
    "I received a damaged coffee maker in my delivery box and customer support still hasn't answered my refund email after three days.",
    "Standard cotton t-shirt. Nothing extraordinary about the fabric, but it serves its daily purpose for the price point.",
    "Exceptional store atmosphere and the VIP loyalty rewards program saved me over $50 on my designer boots today!",
    "Worst shopping experience ever. Overpriced merchandise, rude staff members, and an extremely unfair return policy!",
    "The organic Colombian roast coffee beans smelled heavenly! Best aromatic coffee purchase I have ever made.",
    "Package arrived four days late and the outer cardboard package box was completely squished.",
    "The leather smart watch operates fine with basic fitness features, though the screen brightness under direct sunlight could be better.",
    "Splendid service! The AI checkout camera scanner kiosk made buying my groceries effortless and fun without waiting in line!"
];

// 4. 12 Diversified Chatbot FAQ Queries
const DEMO_CHAT_QUERIES = [
    "Can you explain your store return policy for footwear and winter coats?",
    "I need help tracking my express delivery for order number #84930 immediately.",
    "What time does the primary flagship store close on Saturday and Sunday nights?",
    "How can I enroll in the VIP Gold Tier rewards program to gain discount points?",
    "Do you accept Apple Pay and contactless payment terminals at your physical checkout desks?",
    "Are the Nike Air Zoom running sneakers currently in stock in men's size 11?",
    "Can I ship an online digital gift card to my sister in Europe for her birthday?",
    "What happens if my delivered package order arrives damaged or with missing items?",
    "How do I check the remaining reward point balance on my physical store gift card?",
    "Is there an expedited VIP checkout aisle available for returning Gold members?",
    "How does your biometric camera product scanning kiosk protect my facial biometric data?",
    "Where can I download the RetailVision mobile companion app for automatic loyalty check-ins?"
];

const tabTitles = {
    'overview': { title: 'Dashboard Overview', sub: 'Real-time surveillance, item tracking, and NLP interactions summary.' },
    'product-scanner': { title: 'In-Store Product Scanner', sub: 'MobileNetV2 deep learning classifier with instant confidence scoring.' },
    'face-recognition': { title: 'Customer Loyalty & Face Recognition', sub: 'LBPH biometric recognition and visit log automation under GDPR compliance.' },
    'sentiment-analysis': { title: 'Customer Review Sentiment Analyzer', sub: 'TF-IDF + Support Vector classification predicting feedback satisfaction tone.' },
    'chatbot': { title: 'AI Support Assistant & FAQ Bot', sub: 'Hybrid rule-based matching + machine learning intent classification fallback.' },
    'analytics': { title: 'Intelligence Analytics Hub', sub: 'Comprehensive visual breakdowns of store footfall, sentiment, and AI interactions.' }
};

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    setupCharCounter();
    testAPIHealth();
});

function switchView(targetView, targetTab = null) {
    const landing = document.getElementById('landing-page');
    const dashboard = document.getElementById('dashboard-page');

    if (targetView === 'dashboard') {
        landing.classList.add('hidden');
        dashboard.classList.remove('hidden');
        if (targetTab) setModuleTab(targetTab);
        window.scrollTo(0, 0);
        setTimeout(() => lucide.createIcons(), 50);
    } else {
        dashboard.classList.add('hidden');
        landing.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    appState.currentView = targetView;
}

function setModuleTab(tabId) {
    document.querySelectorAll('.module-view').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active-tab'));
    
    const activeView = document.getElementById(`view-${tabId}`);
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    
    if (activeView) activeView.classList.remove('hidden');
    if (activeBtn) activeBtn.classList.add('active-tab');
    
    if (tabTitles[tabId]) {
        document.getElementById('current-view-title').innerHTML = `<span>${tabTitles[tabId].title}</span>`;
        document.getElementById('current-view-subtitle').innerText = tabTitles[tabId].sub;
    }

    appState.currentTab = tabId;
    setTimeout(() => lucide.createIcons(), 50);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg animate-fade-in';
    
    let iconName = 'info';
    let colorClass = 'text-blue-400';
    if (type === 'success') { iconName = 'check-circle'; colorClass = 'text-emerald-400'; }
    if (type === 'warn') { iconName = 'alert-triangle'; colorClass = 'text-amber-400'; }
    if (type === 'error') { iconName = 'x-circle'; colorClass = 'text-rose-400'; }

    toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-4 h-4 ${colorClass} shrink-0"></i>
        <span class="flex-1 font-medium">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * MODULE 1: RANDOMIZED PRODUCT SCANNER
 */
async function runProductDemo() {
    if (appState.currentTab !== 'product-scanner') setModuleTab('product-scanner');
    
    const randomIndex = Math.floor(Math.random() * DEMO_PRODUCTS.length);
    const selected = DEMO_PRODUCTS[randomIndex];
    
    showToast(`Scanning retail item #${randomIndex + 1} of 20 in MobileNetV2 pipeline...`, 'info');
    
    document.getElementById('product-prompt-content').classList.add('hidden');
    const view = document.getElementById('product-image-view');
    view.classList.remove('hidden');
    
    const renderedImg = document.getElementById('product-rendered-img');
    if (renderedImg) renderedImg.src = selected.img;
    
    document.getElementById('product-waiting').classList.remove('hidden');
    document.getElementById('product-results').classList.add('hidden');
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/classify-product?index=${randomIndex}`, { method: 'POST' });
        const data = await res.json();
        if (data.success && data.prediction) {
            updateProductUI(data.prediction);
            return;
        }
    } catch (e) {}

    setTimeout(() => {
        updateProductUI({
            category: selected.category,
            product_label: selected.label,
            confidence: selected.conf,
            inference_time_ms: selected.latency,
            inventory_status: selected.stock,
            probabilities_breakdown: [
                [selected.category, selected.conf],
                [selected.alt1[0], selected.alt1[1]],
                [selected.alt2[0], selected.alt2[1]]
            ]
        });
    }, 450);
}

function updateProductUI(pred) {
    document.getElementById('product-waiting').classList.add('hidden');
    const results = document.getElementById('product-results');
    results.classList.remove('hidden');
    
    if (document.getElementById('result-label')) document.getElementById('result-label').innerText = pred.product_label || "Identified Item";
    if (document.getElementById('result-category')) document.getElementById('result-category').innerText = pred.category;
    if (document.getElementById('result-confidence')) document.getElementById('result-confidence').innerText = `${pred.confidence}%`;
    if (document.getElementById('result-latency')) document.getElementById('result-latency').innerText = `${pred.inference_time_ms || 4.12} ms`;
    if (document.getElementById('result-inventory')) document.getElementById('result-inventory').innerText = pred.inventory_status;
    
    const probs = pred.probabilities_breakdown || [
        [pred.category, pred.confidence],
        ["Secondary Class", 1.2],
        ["Other Categories", 0.4]
    ];

    if (document.getElementById('prob-name-1')) {
        document.getElementById('prob-name-1').innerText = probs[0][0];
        document.getElementById('prob-val-1').innerText = `${probs[0][1]}%`;
        document.getElementById('prob-bar-1').style.width = `${probs[0][1]}%`;
        
        document.getElementById('prob-name-2').innerText = probs[1][0];
        document.getElementById('prob-val-2').innerText = `${probs[1][1]}%`;
        document.getElementById('prob-bar-2').style.width = `${probs[1][1] * 2}%`;
        
        document.getElementById('prob-name-3').innerText = probs[2][0];
        document.getElementById('prob-val-3').innerText = `${probs[2][1]}%`;
        document.getElementById('prob-bar-3').style.width = `${probs[2][1] * 2}%`;
    }

    appState.stats.scanned++;
    if (document.getElementById('stat-scanned')) document.getElementById('stat-scanned').innerText = appState.stats.scanned;
    showToast(`Classification Complete: ${pred.product_label} (${pred.confidence}%)`, 'success');
    addActivityLog('Product Scan', `${pred.category} • ${pred.product_label} (${pred.confidence}%)`, 'text-blue-400');
    
    if (window.lucide) lucide.createIcons();
}

function resetProductScanner() {
    document.getElementById('product-prompt-content').classList.remove('hidden');
    document.getElementById('product-image-view').classList.add('hidden');
    document.getElementById('product-waiting').classList.remove('hidden');
    document.getElementById('product-results').classList.add('hidden');
    showToast('Product scanner reset.', 'info');
}

/**
 * MODULE 2: RANDOMIZED FACE RECOGNITION & LOYALTY DB
 */
async function runFaceDemo() {
    if (appState.currentTab !== 'face-recognition') setModuleTab('face-recognition');
    
    const randomIdx = Math.floor(Math.random() * DEMO_FACES.length);
    const vip = DEMO_FACES[randomIdx];
    
    showToast(`Matching facial biometric vector against SQLite customer DB...`, 'info');
    
    document.getElementById('face-prompt-content').classList.add('hidden');
    const view = document.getElementById('face-image-view');
    view.classList.remove('hidden');
    
    const img = document.getElementById('face-rendered-img');
    if (img) img.src = vip.img;
    
    if (document.getElementById('face-box-label')) {
        document.getElementById('face-box-label').className = `px-2 py-0.5 rounded ${vip.badgeBg} text-black text-[11px] font-extrabold font-mono tracking-tight shadow-md`;
        document.getElementById('face-box-label').innerText = `VIP ID: #${vip.id} (${vip.name})`;
    }
    
    document.getElementById('face-waiting').classList.remove('hidden');
    document.getElementById('face-results').classList.add('hidden');
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/recognize-face?customer_id=${vip.id}`, { method: 'POST' });
        const data = await res.json();
        if (data.success && data.customer_profile) {
            updateFaceUI(data.customer_profile, vip);
            return;
        }
    } catch (e) {}

    setTimeout(() => {
        updateFaceUI({
            customer_id: vip.id,
            name: vip.name,
            loyalty_tier: vip.tier,
            total_visits: vip.visits + 1,
            reward_balance_pts: vip.pts
        }, vip);
    }, 500);
}

function updateFaceUI(prof, vip) {
    document.getElementById('face-waiting').classList.add('hidden');
    document.getElementById('face-results').classList.remove('hidden');
    
    if (document.getElementById('face-initials')) {
        document.getElementById('face-initials').innerText = vip ? vip.initials : prof.name.substring(0,2).toUpperCase();
        document.getElementById('face-initials').className = `w-12 h-12 rounded-full border-2 border-emerald-400 ${vip ? vip.badgeBg + '/20' : 'bg-emerald-500/20'} flex items-center justify-center font-bold text-lg ${vip ? vip.textCol : 'text-emerald-300'}`;
    }
    if (document.getElementById('face-profile-name')) document.getElementById('face-profile-name').innerText = prof.name;
    if (document.getElementById('face-profile-tier')) {
        document.getElementById('face-profile-tier').innerText = prof.loyalty_tier;
        document.getElementById('face-profile-tier').className = `inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${vip ? vip.badgeBg : 'bg-emerald-500'} text-black mt-1`;
    }
    if (document.getElementById('face-profile-visits')) {
        document.getElementById('face-profile-visits').innerHTML = `${prof.total_visits} <span class="text-xs text-emerald-400 font-normal">(+1 today)</span>`;
    }
    if (document.getElementById('face-profile-points')) {
        document.getElementById('face-profile-points').innerText = typeof prof.reward_balance_pts === 'number' ? `${prof.reward_balance_pts} pts` : (prof.reward_balance_pts || "1,500 pts");
        document.getElementById('face-profile-points').className = "text-xl font-heading font-extrabold text-cyan-400 mt-1";
    }

    appState.stats.visitors++;
    if (document.getElementById('stat-visitors')) document.getElementById('stat-visitors').innerText = appState.stats.visitors;
    showToast(`Loyalty Check-in: ${prof.name} (${prof.loyalty_tier})`, 'success');
    addActivityLog('VIP Loyalty Check-in', `${prof.name} Verified (Visit #${prof.total_visits})`, 'text-emerald-400');
    
    if (window.lucide) lucide.createIcons();
}

function resetFaceScanner() {
    document.getElementById('face-prompt-content').classList.remove('hidden');
    document.getElementById('face-image-view').classList.add('hidden');
    document.getElementById('face-waiting').classList.remove('hidden');
    document.getElementById('face-results').classList.add('hidden');
    showToast('Facial scanner kiosk reset.', 'info');
}

/**
 * MODULE 3: RANDOMIZED SENTIMENT ANALYSIS
 */
function setupCharCounter() {
    const textarea = document.getElementById('sentiment-input');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
        textarea.addEventListener('input', (e) => {
            counter.innerText = `${e.target.value.length} chars`;
        });
    }
}

function runSentimentDemo() {
    if (appState.currentTab !== 'sentiment-analysis') setModuleTab('sentiment-analysis');
    
    // Pick random review from 12 samples
    const sampleText = DEMO_REVIEWS[Math.floor(Math.random() * DEMO_REVIEWS.length)];
    document.getElementById('sentiment-input').value = sampleText;
    if (document.getElementById('char-count')) document.getElementById('char-count').innerText = `${sampleText.length} chars`;
    
    showToast('Random review loaded into workspace. Submitting to TF-IDF vector classifier...', 'info');
    setTimeout(() => analyzeCustomSentiment(), 400);
}

async function analyzeCustomSentiment() {
    const text = document.getElementById('sentiment-input').value.trim();
    if (!text) {
        showToast('Please enter review text to evaluate.', 'warn');
        return;
    }
    
    document.getElementById('sentiment-waiting').classList.add('hidden');
    const results = document.getElementById('sentiment-results');
    results.classList.remove('hidden');
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/analyze-sentiment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        const data = await res.json();
        
        if (data.success && data.sentiment) {
            renderSentimentDiagnostic(data.sentiment.label.toLowerCase(), data.sentiment.confidence_pct, data.sentiment.probabilities, data.sentiment.extracted_keywords);
            return;
        }
    } catch (e) {}

    // Offline / Standalone evaluation logic
    const lower = text.toLowerCase();
    let tone = "positive";
    let conf = 94.8;
    let probs = { positive: 94.8, neutral: 4.2, negative: 1.0 };
    if (lower.includes('terrible') || lower.includes('worst') || lower.includes('rude') || lower.includes('damaged') || lower.includes('late') || lower.includes('disappointed')) {
        tone = "negative"; conf = 91.4; probs = { positive: 2.1, neutral: 6.5, negative: 91.4 };
    } else if (lower.includes('decent') || lower.includes('standard') || lower.includes('fine') || lower.includes('nothing extraordinary') || lower.includes('slightly')) {
        tone = "neutral"; conf = 85.0; probs = { positive: 10.5, neutral: 85.0, negative: 4.5 };
    }
    renderSentimentDiagnostic(tone, conf, probs, ['#customer_feedback', '#evaluated', '#nlp_tag']);
}

function renderSentimentDiagnostic(tone, conf, probs, keywords) {
    const label = document.getElementById('sentiment-label');
    const scoreText = document.getElementById('sentiment-score');
    const keywordsBox = document.getElementById('sentiment-keywords');
    const container = document.getElementById('sentiment-badge-container');

    if (tone === 'positive') {
        if (container) container.className = "p-5 rounded-xl bg-gradient-to-tr from-emerald-950/40 to-teal-900/30 border border-emerald-500/30 text-center relative overflow-hidden";
        label.className = "text-4xl font-heading font-extrabold text-emerald-400 flex items-center justify-center gap-2";
        label.innerHTML = `<span>Positive</span><i data-lucide="smile" class="w-8 h-8"></i>`;
        scoreText.innerText = `${conf}%`;
        scoreText.className = "text-emerald-400";
        showToast(`Review classified as Positive (${conf}% confidence).`, 'success');
        addActivityLog('Review Sentiment', `Positive Tone (${conf}% Conf.)`, 'text-emerald-400');
    } else if (tone === 'negative') {
        if (container) container.className = "p-5 rounded-xl bg-gradient-to-tr from-rose-950/40 to-pink-900/30 border border-rose-500/30 text-center relative overflow-hidden";
        label.className = "text-4xl font-heading font-extrabold text-rose-500 flex items-center justify-center gap-2";
        label.innerHTML = `<span>Negative</span><i data-lucide="frown" class="w-8 h-8"></i>`;
        scoreText.innerText = `${conf}%`;
        scoreText.className = "text-rose-500";
        showToast(`Review classified as Negative (${conf}% confidence).`, 'error');
        addActivityLog('Review Sentiment', `Negative Tone Detected (${conf}% Conf.)`, 'text-rose-400');
    } else {
        if (container) container.className = "p-5 rounded-xl bg-gradient-to-tr from-blue-950/40 to-cyan-900/30 border border-blue-500/30 text-center relative overflow-hidden";
        label.className = "text-4xl font-heading font-extrabold text-blue-400 flex items-center justify-center gap-2";
        label.innerHTML = `<span>Neutral</span><i data-lucide="meh" class="w-8 h-8"></i>`;
        scoreText.innerText = `${conf}%`;
        scoreText.className = "text-blue-400";
        showToast(`Review classified as Neutral tone (${conf}% confidence).`, 'info');
        addActivityLog('Review Sentiment', `Neutral Tone Evaluated (${conf}% Conf.)`, 'text-blue-400');
    }

    if (probs) {
        if (document.getElementById('prob-pos')) {
            document.getElementById('prob-pos').innerText = `${probs.positive || 10}%`;
            document.getElementById('bar-pos').style.width = `${probs.positive || 10}%`;
        }
        if (document.getElementById('prob-neu')) {
            document.getElementById('prob-neu').innerText = `${probs.neutral || 10}%`;
            document.getElementById('bar-neu').style.width = `${probs.neutral || 10}%`;
        }
        if (document.getElementById('prob-neg')) {
            document.getElementById('prob-neg').innerText = `${probs.negative || 10}%`;
            document.getElementById('bar-neg').style.width = `${probs.negative || 10}%`;
        }
    }

    if (keywords && keywordsBox) {
        keywordsBox.innerHTML = keywords.map(k => `<span class="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-cyan-300 font-mono text-xs">${k}</span>`).join('');
    }

    if (window.lucide) lucide.createIcons();
}

function clearSentiment() {
    document.getElementById('sentiment-input').value = "";
    if (document.getElementById('char-count')) document.getElementById('char-count').innerText = "0 chars";
    document.getElementById('sentiment-waiting').classList.remove('hidden');
    document.getElementById('sentiment-results').classList.add('hidden');
}

/**
 * MODULE 4: RANDOMIZED CHATBOT ASSISTANT
 */
function runChatDemo() {
    if (appState.currentTab !== 'chatbot') setModuleTab('chatbot');
    const randomQuery = DEMO_CHAT_QUERIES[Math.floor(Math.random() * DEMO_CHAT_QUERIES.length)];
    showToast('Sending random benchmark question to FAQ AI...', 'info');
    triggerQuickChat(randomQuery);
}

function triggerQuickChat(text) {
    document.getElementById('chat-input-field').value = text;
    sendChatMessage();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input-field');
    const text = input.value.trim();
    if (!text) return;
    
    appendChatMsg('user', text);
    input.value = '';
    
    try {
        const res = await fetch(`${API_BASE_URL}/api/v1/chatbot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        
        if (data.success && data.chat_response) {
            appendChatMsg('bot', data.chat_response.reply_text);
            addActivityLog('Chatbot FAQ Resolved', `Intent: ${data.chat_response.detected_intent}`, 'text-amber-400');
            return;
        }
    } catch (e) {}

    // Offline / Standalone rule fallback
    let reply = "<strong>Intent: General FAQ Support</strong><br>Our AI chatbot engine is active! Ask about store opening hours, order tracking, or return timeframes.";
    const lower = text.toLowerCase();
    if (lower.includes('return') || lower.includes('refund') || lower.includes('damaged')) {
        reply = "<strong>Intent: Return & Refund Policy (Rule Match)</strong><br>You have 30 days from purchase to return unworn items in original box for a full refund! Damaged deliveries are replaced immediately.";
    } else if (lower.includes('track') || lower.includes('order') || lower.includes('delivery')) {
        reply = "<strong>Intent: Order & Shipping Status (Rule Match)</strong><br>Order #84930 is Out for Delivery and will reach your designated address before 5:00 PM today!";
    } else if (lower.includes('hours') || lower.includes('close') || lower.includes('open') || lower.includes('weekend')) {
        reply = "<strong>Intent: Store Business Hours (Rule Match)</strong><br>Our primary flagship retail doors are open Monday through Saturday from 9:00 AM to 9:00 PM, and Sundays 10:00 AM to 6:00 PM.";
    } else if (lower.includes('vip') || lower.includes('gold') || lower.includes('loyalty') || lower.includes('point')) {
        reply = "<strong>Intent: VIP Loyalty Rewards (Rule Match)</strong><br>VIP Gold membership unlocks automatically after 20 verified visits or 1,000 reward points! You currently enjoy 15% off all apparel.";
    } else if (lower.includes('pay') || lower.includes('apple pay') || lower.includes('contactless')) {
        reply = "<strong>Intent: Accepted Payment Methods (Rule Match)</strong><br>Yes! We support Apple Pay, Google Wallet, tap-to-pay credit cards, and cash across all POS checkout terminals.";
    } else if (lower.includes('gift card') || lower.includes('balance') || lower.includes('sister') || lower.includes('europe')) {
        reply = "<strong>Intent: Gift Cards & International Services (Rule Match)</strong><br>Digital e-gift cards can be delivered globally instantly via email and redeemed both in-store and online without transaction fees!";
    } else if (lower.includes('stock') || lower.includes('size') || lower.includes('sneaker')) {
        reply = "<strong>Intent: Real-Time Inventory Lookup (Rule Match)</strong><br>Good news! Nike Air Zoom running sneakers in men's size 11 are currently available with 14 units in stock in Aisle 4.";
    }

    appendChatMsg('bot', reply);
    addActivityLog('AI Assistant Chat', `Resolved User FAQ Query`, 'text-amber-400');
}

function appendChatMsg(sender, htmlContent) {
    const messages = document.getElementById('chat-messages');
    const wrapper = document.createElement('div');
    wrapper.className = `flex items-start gap-3 animate-fade-in ${sender === 'user' ? 'justify-end' : ''}`;

    if (sender === 'user') {
        wrapper.innerHTML = `
            <div class="p-3.5 rounded-2xl rounded-tr-none bg-blue-600 text-white text-xs max-w-md leading-relaxed shadow-md">
                ${htmlContent}
            </div>
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">YOU</div>
        `;
    } else {
        wrapper.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs border border-amber-500/30">AI</div>
            <div class="p-4 rounded-2xl rounded-tl-none bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 max-w-lg leading-relaxed shadow-sm">
                ${htmlContent}
            </div>
        `;
    }
    
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
    if (window.lucide) lucide.createIcons();
}

function addActivityLog(type, details, colorClass) {
    const container = document.getElementById('overview-activity-log');
    if (!container) return;
    const row = document.createElement('div');
    row.className = "p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs flex items-start justify-between animate-fade-in";
    row.innerHTML = `
        <div>
            <span class="font-semibold ${colorClass}">${type}</span>
            <p class="text-zinc-400 mt-0.5">${details}</p>
        </div>
        <span class="text-[10px] text-emerald-400 font-medium">Just now</span>
    `;
    container.insertBefore(row, container.firstChild);
    if (container.children.length > 5) container.removeChild(container.lastChild);
}

function testAPIHealth() {
    fetch(`${API_BASE_URL}/api/v1/health`)
        .then(res => res.json())
        .then(data => {
            if (document.getElementById('api-status-dot')) document.getElementById('api-status-dot').className = "w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
            if (document.getElementById('api-status-text')) document.getElementById('api-status-text').innerText = "FastAPI Backend Online (200 OK)";
            appState.apiConnected = true;
            showToast('Connected to live FastAPI Machine Learning Server!', 'success');
        })
        .catch(err => {
            if (document.getElementById('api-status-dot')) document.getElementById('api-status-dot').className = "w-2 h-2 rounded-full bg-amber-400 animate-pulse";
            if (document.getElementById('api-status-text')) document.getElementById('api-status-text').innerText = "Frontend Standalone Demo Mode";
            appState.apiConnected = false;
            showToast('FastAPI server offline. Running on self-contained frontend demo mode.', 'warn');
        });
}

function initCharts() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#a1a1aa';
    Chart.defaults.font.family = 'Inter';
    
    const ctxFootfall = document.getElementById('chartFootfall');
    if (ctxFootfall) {
        new Chart(ctxFootfall, {
            type: 'line',
            data: {
                labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
                datasets: [{
                    label: 'Store Footfall & Loyalty Check-ins',
                    data: [12, 28, 65, 84, 95, 70, 42, 18],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: '#27272a', borderDash: [4, 4] }, beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const ctxSentiment = document.getElementById('chartSentiment');
    if (ctxSentiment) {
        new Chart(ctxSentiment, {
            type: 'doughnut',
            data: {
                labels: ['Positive (92%)', 'Neutral (6%)', 'Negative (2%)'],
                datasets: [{
                    data: [92, 6, 2],
                    backgroundColor: ['#10b981', '#3b82f6', '#f43f5e'],
                    borderColor: '#141417',
                    borderWidth: 4,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12, padding: 16 } }
                },
                cutout: '72%'
            }
        });
    }

    const ctxIntents = document.getElementById('chartIntents');
    if (ctxIntents) {
        new Chart(ctxIntents, {
            type: 'bar',
            data: {
                labels: ['Order Tracking #', 'Return Policies', 'Store Opening Hours', 'Inventory Check', 'VIP Discounts', 'Other FAQs'],
                datasets: [{
                    label: 'Automated Resolutions',
                    data: [95, 78, 56, 52, 44, 25],
                    backgroundColor: ['#3b82f6', '#60a5fa', '#06b6d4', '#38bdf8', '#10b981', '#64748b'],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                indexAxis: 'y',
                scales: {
                    x: { grid: { color: '#27272a' }, beginAtZero: true },
                    y: { grid: { display: false } }
                }
            }
        });
    }
}
