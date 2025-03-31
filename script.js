// DOM element selectors
let topNews = document.querySelector('#topNews .newsBox');
let sportsNews = document.querySelector('#sportsNews .newsBox');
let businessNews = document.querySelector('#businessNews .newsBox');
let techNews = document.querySelector('#techNews .newsBox');
let worldNews = document.querySelector('#worldNews .newsBox');
let politicsNews = document.querySelector('#politicsNews .newsBox');
let entertainmentNews = document.querySelector('#entertainmentNews .newsBox');

let header = document.querySelector('.header');
let toggleMenu = document.querySelector('.bar');
let menu = document.querySelector('nav ul');

// Toggle menu functionality
if (toggleMenu && menu) {
    toggleMenu.addEventListener('click', () => {
        toggleMenu.classList.toggle('active');
        menu.classList.toggle('activeMenu');
    });
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header?.classList.add('sticky');
    } else {
        header?.classList.remove('sticky');
    }
});

// API Keys
const newsDataApiKey = "pub_9034b4d3a4144e2bb1b3faafc7892f23"; // NewsData API Key
const newsApiKey = "9034b4d3a4144e2bb1b3faafc7892f23"; // NewsAPI Key

const fetchData = async (category) => {
    const url = `https://newsdata.io/api/1/news?apikey=${newsDataApiKey}&country=pk&category=${category}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

const fetchTeslaNews = async () => {
    const url = `https://newsapi.org/v2/everything?q=tesla&from=2025-02-28&sortBy=publishedAt&apiKey=${newsApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching Tesla news:", error);
        return [];
    }
};

const renderNews = async (category, container) => {
    if (!container) return;
    const data = await fetchData(category);
    let html = data.map(newsItem => `
        <div class="newsCard">
            <div class="img">
                <img src="${newsItem.image_url || 'default-image.jpg'}" alt="${category} news image">
            </div>
            <div class="text">
                <div class="title">
                    <a href="${newsItem.link}" target="_blank"><p>${newsItem.title.length < 100 ? newsItem.title : newsItem.title.slice(0, 100) + '...'}</p></a>
                </div>
            </div>
        </div>
    `).join('');
    container.innerHTML = html || "<p>No news available.</p>";
};

// Fetch and render news for all categories
renderNews('top', topNews);
renderNews('world', worldNews);
renderNews('politics', politicsNews);
renderNews('entertainment', entertainmentNews);
renderNews('sports', sportsNews);
renderNews('business', businessNews);
renderNews('technology', techNews);

// Fetch and render Tesla news
fetchTeslaNews().then(data => {
    if (topNews) {
        let html = data.map(newsItem => `
            <div class="newsCard">
                <div class="img">
                    <img src="${newsItem.urlToImage || 'default-image.jpg'}" alt="Tesla news image">
                </div>
                <div class="text">
                    <div class="title">
                        <a href="${newsItem.url}" target="_blank"><p>${newsItem.title.length < 100 ? newsItem.title : newsItem.title.slice(0, 100) + '...'}</p></a>
                    </div>
                </div>
            </div>
        `).join('');
        topNews.innerHTML += html || "<p>No Tesla news available.</p>";
    }
});

// Newsletter subscription
let subscribeButton = document.querySelector('.newsletter button');
let emailInput = document.querySelector('.newsletter input[type="email"]');

if (subscribeButton && emailInput) {
    subscribeButton.addEventListener('click', () => {
        let email = emailInput.value;
        if (email && validateEmail(email)) {
            alert('Thank you for subscribing!');
            emailInput.value = ''; // Clear input field after submission
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
