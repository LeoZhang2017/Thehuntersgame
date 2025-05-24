// DOM Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeBtns = document.querySelectorAll('.close');
const navLinks = document.querySelectorAll('nav ul li a');
const stage1Nav = document.getElementById('stage1-nav');
const stage2Nav = document.getElementById('stage2-nav');
const stage3Nav = document.getElementById('stage3-nav');
const weaponsNav = document.getElementById('weapons-nav');
const creatorsNav = document.getElementById('creators-nav');
const sections = document.querySelectorAll('.section');
const homeSection = document.getElementById('home-section');
const stage1Section = document.getElementById('stage1-section');
const stage2Section = document.getElementById('stage2-section');
const stage3Section = document.getElementById('stage3-section');
const weaponsSection = document.getElementById('weapons-section');
const creatorsSection = document.getElementById('creators-section');
const stage1Card = document.getElementById('stage1-card');
const stage2Card = document.getElementById('stage2-card');
const stage3Card = document.getElementById('stage3-card');
const viewMoreButtons = document.querySelectorAll('.view-more');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const weaponsGrid = document.querySelector('.weapons-grid');

// Sample data for official announcements and notices
const officialAnnouncements = {
    stage1: [
        {
            title: "Warehouse Security Update",
            content: "New security measures implemented in the warehouse. All participants must undergo security screening before entry.",
            date: "2024-03-20",
            priority: "high"
        },
        {
            title: "Weapon Distribution Update",
            content: "AK-74 and QBB95 locations have been modified. Please review the updated warehouse map.",
            date: "2024-03-19",
            priority: "medium"
        }
    ],
    stage2: [
        {
            title: "Team Assignment Protocol",
            content: "Team assignments will be posted 24 hours before the arena battle. No team switching allowed after assignment.",
            date: "2024-03-20",
            priority: "high"
        },
        {
            title: "Arena Safety Measures",
            content: "New safety protocols implemented in the arena. All participants must review the updated safety guidelines.",
            date: "2024-03-18",
            priority: "medium"
        }
    ],
    stage3: [
        {
            title: "Forest Navigation Update",
            content: "New trap locations added to the forest. All participants must review the updated map before entering.",
            date: "2024-03-20",
            priority: "high"
        },
        {
            title: "Hunter Patrol Schedule",
            content: "Updated hunter patrol routes and schedules. Please review the new timing information.",
            date: "2024-03-19",
            priority: "medium"
        }
    ]
};

// Sample data for weapons
const weaponsData = [
    {
        name: "AK-74",
        location: "North Section",
        type: "Assault Rifle",
        ammo: "5.45x39mm"
    },
    {
        name: "QBB95",
        location: "East Wing",
        type: "Light Machine Gun",
        ammo: "5.8x42mm"
    },
    {
        name: "Rocket Launcher",
        location: "Armory",
        type: "Heavy Weapon",
        ammo: "RPG-7"
    },
    {
        name: "AKM",
        location: "South Section",
        type: "Assault Rifle",
        ammo: "7.62x39mm"
    },
    {
        name: "L86A2",
        location: "West Wing",
        type: "Light Support Weapon",
        ammo: "5.56x45mm"
    },
    {
        name: "AUG A3",
        location: "Central Area",
        type: "Assault Rifle",
        ammo: "5.56x45mm"
    }
];

// News Panel Functionality
const adminCode = 'LHMS';
const verifyCodeBtn = document.getElementById('verify-code');
const newsForm = document.getElementById('news-form');
const adminCodeInput = document.getElementById('admin-code');

// News Page Functionality
const newsNav = document.getElementById('news-nav');
const newsSection = document.getElementById('news-section');
const newsList = document.querySelector('.news-list');
const filterButtons = document.querySelectorAll('.filter-btn');

/**
 * Global array to store all news items/announcements
 * Each item contains: title, content, priority, and date
 */
let allNews = [];

/**
 * Adds a new announcement to the news system
 * @param {string} title - The announcement title
 * @param {string} content - The announcement content
 * @param {string} priority - Priority level ('high', 'medium', 'normal')
 * @param {string} date - Optional date string, defaults to current date
 */
function addNewsItem(title, content, priority, date) {
    const newsItem = {
        title,
        content,
        priority,
        date: date || new Date().toLocaleDateString()
    };
    
    allNews.unshift(newsItem); // Add to beginning of array (newest first)
    updateNewsList(); // Update the news page
    updateHomepageAnnouncements(); // Update the homepage highlights
}

/**
 * Updates the homepage announcements section
 * Shows only the most important and recent announcements:
 * - High priority announcements
 * - Announcements from the last 7 days
 * - Limited to 3 most recent items
 */
function updateHomepageAnnouncements() {
    const announcementsContainer = document.querySelector('.announcements-container');
    if (!announcementsContainer) return;

    // Clear existing announcements
    announcementsContainer.innerHTML = '';

    // Filter announcements for homepage:
    // 1. High priority announcements
    // 2. Announcements from the last 7 days
    // 3. Take only the 3 most recent
    const homepageAnnouncements = allNews
        .filter(item => item.priority === 'high' || 
                new Date(item.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .slice(0, 3);

    // Create and append announcement elements
    homepageAnnouncements.forEach(item => {
        const announcement = document.createElement('div');
        announcement.className = `announcement ${item.priority}`;
        announcement.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <span class="announcement-date">Official Notice - ${item.date}</span>
        `;
        announcementsContainer.appendChild(announcement);
    });
}

/**
 * Updates the news page with filtered announcements
 * @param {string} filter - Filter type ('all', 'high', 'medium', 'normal')
 */
function updateNewsList(filter = 'all') {
    newsList.innerHTML = '';
    
    // Filter announcements based on priority
    const filteredNews = filter === 'all' 
        ? allNews 
        : allNews.filter(item => item.priority === filter);
    
    // Create and append news items
    filteredNews.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = `news-item ${item.priority}`;
        newsElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <div class="news-meta">
                <span class="news-date">Posted on: ${item.date}</span>
                <span class="news-priority ${item.priority}">${item.priority.toUpperCase()}</span>
            </div>
        `;
        newsList.appendChild(newsElement);
    });
}

// Add event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state of filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Update news list with selected filter
        updateNewsList(button.dataset.filter);
    });
});

// Handle news page navigation
newsNav.addEventListener('click', (e) => {
    e.preventDefault();
    // Update navigation active states
    navLinks.forEach(l => l.classList.remove('active'));
    newsNav.classList.add('active');
    // Show news section
    sections.forEach(section => section.classList.remove('active'));
    newsSection.classList.add('active');
    window.scrollTo(0, 0);
});

/**
 * Handle new announcement submission
 * Processes the form data and adds a new announcement
 */
newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const priority = document.getElementById('news-priority').value;
    
    // Add new announcement
    addNewsItem(title, content, priority);
    
    // Reset form and UI
    newsForm.reset();
    newsForm.style.display = 'none';
    adminCodeInput.disabled = false;
    verifyCodeBtn.disabled = false;
    
    alert('Announcement posted successfully!');
});

/**
 * Initialize news system with existing announcements
 * Runs when the page loads
 */
document.addEventListener('DOMContentLoaded', () => {
    // Convert existing HTML announcements to news items
    const existingAnnouncements = document.querySelectorAll('.announcement');
    existingAnnouncements.forEach(announcement => {
        const title = announcement.querySelector('h4').textContent;
        const content = announcement.querySelector('p').textContent;
        const priority = announcement.classList.contains('high') ? 'high' : 
                        announcement.classList.contains('medium') ? 'medium' : 'normal';
        const date = announcement.querySelector('.announcement-date').textContent.replace('Official Notice - ', '');
        
        addNewsItem(title, content, priority, date);
    });

    // Initial update of homepage announcements
    updateHomepageAnnouncements();
});

// Initialize the forum
document.addEventListener('DOMContentLoaded', () => {
    // Populate official notices
    populateOfficialNotices();
    
    // Populate weapons grid
    populateWeaponsGrid();
    
    // Set up event listeners
    setupEventListeners();
    
    // Add creators to the footer
    addCreatorsToFooter();
});

// Function to populate official notices
function populateOfficialNotices() {
    const stages = ['stage1', 'stage2', 'stage3'];
    stages.forEach(stage => {
        const noticesList = document.querySelector(`#${stage}-section .notices-list`);
        if (noticesList) {
            officialAnnouncements[stage].forEach(notice => {
                const noticeElement = document.createElement('div');
                noticeElement.className = `announcement ${notice.priority}`;
                noticeElement.innerHTML = `
                    <h4>${notice.title}</h4>
                    <p>${notice.content}</p>
                    <span class="announcement-date">Official Notice - ${notice.date}</span>
                `;
                noticesList.appendChild(noticeElement);
            });
        }
    });
}

// Function to populate weapons grid
function populateWeaponsGrid() {
    const weaponsGrid = document.querySelector('.weapons-grid');
    if (weaponsGrid) {
        weaponsData.forEach(weapon => {
            const weaponElement = document.createElement('div');
            weaponElement.className = 'weapon-card';
            weaponElement.innerHTML = `
                <h4>${weapon.name}</h4>
                <p class="weapon-location">Location: ${weapon.location}</p>
                <p class="weapon-type">Type: ${weapon.type}</p>
                <p class="weapon-ammo">Ammo: ${weapon.ammo}</p>
            `;
            weaponsGrid.appendChild(weaponElement);
        });
    }
}

// Function to add creators to the footer
function addCreatorsToFooter() {
    const footerSection = document.querySelector('.footer-section:first-child');
    const creatorsList = document.createElement('p');
    creatorsList.className = 'creators-list';
    creatorsList.innerHTML = 'Created by: <strong>Sterling, Matthew, Leo & Henry</strong>';
    creatorsList.style.marginTop = '0.5rem';
    footerSection.appendChild(creatorsList);
}

// Function to set up event listeners
function setupEventListeners() {
    // Modal event listeners
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show relevant section
            if (this === stage1Nav) {
                stage1Section.classList.add('active');
            } else if (this === stage2Nav) {
                stage2Section.classList.add('active');
            } else if (this === stage3Nav) {
                stage3Section.classList.add('active');
            } else if (this === weaponsNav) {
                weaponsSection.classList.add('active');
            } else if (this === creatorsNav) {
                creatorsSection.classList.add('active');
            } else {
                homeSection.classList.add('active');
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Stage card buttons
    stage1Card.querySelector('.view-more').addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        stage1Nav.classList.add('active');
        sections.forEach(section => section.classList.remove('active'));
        stage1Section.classList.add('active');
        window.scrollTo(0, 0);
    });
    
    stage2Card.querySelector('.view-more').addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        stage2Nav.classList.add('active');
        sections.forEach(section => section.classList.remove('active'));
        stage2Section.classList.add('active');
        window.scrollTo(0, 0);
    });
    
    stage3Card.querySelector('.view-more').addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        stage3Nav.classList.add('active');
        sections.forEach(section => section.classList.remove('active'));
        stage3Section.classList.add('active');
        window.scrollTo(0, 0);
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, you would validate and send this to a server
        console.log('Login attempt:', { username, password });
        
        // Show a simple alert for demo purposes
        alert(`Welcome back, ${username}!`);
        
        // Close the modal
        loginModal.style.display = 'none';
        
        // Reset the form
        this.reset();
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        // Check if passwords match
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would validate and send this to a server
        console.log('Registration attempt:', { username, email, password });
        
        // Show a simple alert for demo purposes
        alert(`Welcome to The Hunter Games, ${username}! Your account has been created.`);
        
        // Close the modal
        registerModal.style.display = 'none';
        
        // Reset the form
        this.reset();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    // Add event listener for "Meet the Creators" link in footer
    const meetCreatorsLink = document.createElement('a');
    meetCreatorsLink.href = '#';
    meetCreatorsLink.textContent = 'Meet the Creators';
    meetCreatorsLink.style.display = 'block';
    meetCreatorsLink.style.marginTop = '0.5rem';
    
    meetCreatorsLink.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        creatorsNav.classList.add('active');
        sections.forEach(section => section.classList.remove('active'));
        creatorsSection.classList.add('active');
        window.scrollTo(0, 0);
    });
    
    document.querySelector('.footer-section:first-child').appendChild(meetCreatorsLink);

    verifyCodeBtn.addEventListener('click', () => {
        if (adminCodeInput.value === adminCode) {
            newsForm.style.display = 'block';
            adminCodeInput.value = '';
            adminCodeInput.disabled = true;
            verifyCodeBtn.disabled = true;
        } else {
            alert('Invalid admin code');
            adminCodeInput.value = '';
        }
    });
}

// Add additional CSS for weapon cards
const style = document.createElement('style');
style.innerHTML = `
    .weapon-card {
        background-color: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border-top: 4px solid var(--primary-color);
    }

    .weapon-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }

    .weapon-card h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }

    .weapon-info p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .creators-list {
        color: #ddd;
    }
`;
document.head.appendChild(style); 