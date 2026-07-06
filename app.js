// Session management with localStorage persistence
let isLoggedIn = false;

// Application Data Structure
let dashboardData = {
    activities: ["Present on Time", "Holly Mass Coordination", "Assembly Coordination", "Class Coordination", "Extra Activity Participation", "Overall Discipline"],
    classes: ["1st STD", "2nd STD", "3rd STD", "4th STD", "5th STD", "6th STD", "7th STD", "8th STD", "9th STD", "10th STD", "11th STD", "12th STD"],
    years: {
        "2026": {
            "January": { "activity_scores": {}, "totals": {} },
            "February": { "activity_scores": {}, "totals": {} },
            "March": { "activity_scores": {}, "totals": {} },
            "April": { "activity_scores": {}, "totals": {} },
            "May": { "activity_scores": {}, "totals": {} },
            "June": {
                "activity_scores": {
                    "Present on Time": {"1st STD": 5, "2nd STD": 0, "3rd STD": 0, "4th STD": 0, "5th STD": 0, "6th STD": 0, "7th STD": 0, "8th STD": 0, "9th STD": 0, "10th STD": 0, "11th STD": 0, "12th STD": 0},
                    "Holly Mass Coordination": {"1st STD": 0, "2nd STD": 0, "3rd STD": 0, "4th STD": 0, "5th STD": 2, "6th STD": 0, "7th STD": 0, "8th STD": 0, "9th STD": 0, "10th STD": 10, "11th STD": 0, "12th STD": 0},
                    "Assembly Coordination": {"1st STD": 0, "2nd STD": 0, "3rd STD": 0, "4th STD": 0, "5th STD": 0, "6th STD": 0, "7th STD": 0, "8th STD": 0, "9th STD": 0, "10th STD": 0, "11th STD": 0, "12th STD": 3},
                    "Class Coordination": {"1st STD": 0, "2nd STD": 0, "3rd STD": 0, "4th STD": 0, "5th STD": 0, "6th STD": 0, "7th STD": 0, "8th STD": 0, "9th STD": 0, "10th STD": 0, "11th STD": 0, "12th STD": 0},
                    "Extra Activity Participation": {"1st STD": 0, "2nd STD": 9, "3rd STD": 0, "4th STD": 5, "5th STD": 0, "6th STD": 0, "7th STD": 0, "8th STD": 4, "9th STD": 0, "10th STD": 0, "11th STD": 0, "12th STD": 0},
                    "Overall Discipline": {"1st STD": 0, "2nd STD": 0, "3rd STD": 0, "4th STD": 0, "5th STD": 0, "6th STD": 0, "7th STD": 0, "8th STD": 0, "9th STD": 0, "10th STD": 0, "11th STD": 0, "12th STD": 0}
                },
                "totals": {"1st STD": 5, "2nd STD": 9, "3rd STD": 0, "4th STD": 5, "5th STD": 2, "6th STD": 0, "7th STD": 0, "8th STD": 4, "9th STD": 0, "10th STD": 10, "11th STD": 0, "12th STD": 3}
            },
            "July": { "activity_scores": {}, "totals": {} },
            "August": { "activity_scores": {}, "totals": {} },
            "September": { "activity_scores": {}, "totals": {} },
            "October": { "activity_scores": {}, "totals": {} },
            "November": { "activity_scores": {}, "totals": {} },
            "December": { "activity_scores": {}, "totals": {} }
        },
        "2027": {
            "January": { "activity_scores": {}, "totals": {} },
            "February": { "activity_scores": {}, "totals": {} },
            "March": { "activity_scores": {}, "totals": {} },
            "April": { "activity_scores": {}, "totals": {} },
            "May": { "activity_scores": {}, "totals": {} },
            "June": { "activity_scores": {}, "totals": {} },
            "July": { "activity_scores": {}, "totals": {} },
            "August": { "activity_scores": {}, "totals": {} },
            "September": { "activity_scores": {}, "totals": {} },
            "October": { "activity_scores": {}, "totals": {} },
            "November": { "activity_scores": {}, "totals": {} },
            "December": { "activity_scores": {}, "totals": {} }
        }
    },
    point_options: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};

// Current selection
let currentYear = "2026";
let currentMonth = "July"; // Default to July 2026 as per requirements

// Chart instances
let classChart = null;
let activityChart = null;

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Faith Formation Dashboard initializing...');
    try {
        loadDataFromStorage();
        loadAuthFromStorage();
        setupEventListeners();
        checkAuthStatus();
        console.log('Initialization complete');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Authentication Functions with localStorage persistence
function loadAuthFromStorage() {
    try {
        const saved = localStorage.getItem('faithDashboardAuth');
        if (saved === 'true') {
            isLoggedIn = true;
            console.log('User already logged in from localStorage');
        }
    } catch (error) {
        console.error('Error loading auth from storage:', error);
    }
}

function saveAuthToStorage() {
    try {
        localStorage.setItem('faithDashboardAuth', isLoggedIn.toString());
        console.log('Auth state saved to localStorage:', isLoggedIn);
    } catch (error) {
        console.error('Error saving auth to storage:', error);
    }
}

function checkAuthStatus() {
    try {
        const loginView = document.getElementById('loginView');
        const dashboardView = document.getElementById('dashboardView');
        
        console.log('Checking auth status:', isLoggedIn);
        
        if (isLoggedIn) {
            if (loginView) loginView.classList.add('hidden');
            if (dashboardView) dashboardView.classList.remove('hidden');
            initializeDashboard();
            console.log('Dashboard displayed');
        } else {
            if (loginView) loginView.classList.remove('hidden');
            if (dashboardView) dashboardView.classList.add('hidden');
            console.log('Login page displayed');
        }
    } catch (error) {
        console.error('Error in checkAuthStatus:', error);
    }
}

function attemptLogin(username, password) {
    console.log('Login attempt with:', username, '[password hidden]');
    
    try {
        if (username && username.trim() === 'admin' && password && password.trim() === 'faith2026') {
            isLoggedIn = true;
            saveAuthToStorage();
            console.log('Login successful');
            checkAuthStatus();
            showToast('Login successful!', 'success');
            return true;
        } else {
            console.log('Login failed - invalid credentials. Expected: admin/faith2025, Got:', username, '/', password);
            return false;
        }
    } catch (error) {
        console.error('Error in login function:', error);
        return false;
    }
}

function logout() {
    try {
        isLoggedIn = false;
        localStorage.removeItem('faithDashboardAuth');
        console.log('User logged out');
        checkAuthStatus();
        showToast('Logged out successfully', 'success');
    } catch (error) {
        console.error('Error in logout:', error);
    }
}

// Dashboard Initialization
function initializeDashboard() {
    try {
        console.log('Initializing dashboard...');
        updateDateTime();
        setInterval(updateDateTime, 60000); // Update every minute
        
        // Set default selections
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        
        if (yearSelect) yearSelect.value = currentYear;
        if (monthSelect) monthSelect.value = currentMonth;
        
        updateBreadcrumb();
        updateCurrentPeriodDisplay();
        ensureMonthDataExists(currentYear, currentMonth);
        renderAll();
        updateDataSummary();
        
        // Initialize charts after a small delay to ensure DOM is ready
        setTimeout(() => {
            initializeCharts();
        }, 100);
        
        console.log('Dashboard initialized');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

// Data Management Functions
function loadDataFromStorage() {
    try {
        const saved = localStorage.getItem('faithDashboardData');
        if (saved) {
            const parsedData = JSON.parse(saved);
            // Merge saved data with default structure
            dashboardData = { ...dashboardData, ...parsedData };
            console.log('Data loaded from localStorage');
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

function saveDataToStorage() {
    try {
        localStorage.setItem('faithDashboardData', JSON.stringify(dashboardData));
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function ensureMonthDataExists(year, month) {
    try {
        if (!dashboardData.years[year]) {
            dashboardData.years[year] = {};
        }
        
        if (!dashboardData.years[year][month]) {
            dashboardData.years[year][month] = { "activity_scores": {}, "totals": {} };
        }
        
        if (!dashboardData.years[year][month].activity_scores || Object.keys(dashboardData.years[year][month].activity_scores).length === 0) {
            // Initialize with zeros
            dashboardData.years[year][month].activity_scores = {};
            dashboardData.activities.forEach(activity => {
                dashboardData.years[year][month].activity_scores[activity] = {};
                dashboardData.classes.forEach(className => {
                    dashboardData.years[year][month].activity_scores[activity][className] = 0;
                });
            });
        }
        
        // Calculate totals for this month
        calculateMonthTotals(year, month);
    } catch (error) {
        console.error('Error ensuring month data exists:', error);
    }
}

function calculateMonthTotals(year, month) {
    try {
        if (!dashboardData.years[year] || !dashboardData.years[year][month] || !dashboardData.years[year][month].activity_scores) {
            return;
        }
        
        const totals = {};
        dashboardData.classes.forEach(className => {
            let total = 0;
            dashboardData.activities.forEach(activity => {
                total += dashboardData.years[year][month].activity_scores[activity][className] || 0;
            });
            totals[className] = total;
        });
        
        dashboardData.years[year][month].totals = totals;
    } catch (error) {
        console.error('Error calculating month totals:', error);
    }
}

function calculateAggregateTotals() {
    try {
        const aggregates = {};
        dashboardData.classes.forEach(className => {
            aggregates[className] = 0;
        });
        
        // Sum across all years and months
        Object.keys(dashboardData.years).forEach(year => {
            Object.keys(dashboardData.years[year]).forEach(month => {
                if (dashboardData.years[year][month].totals) {
                    dashboardData.classes.forEach(className => {
                        aggregates[className] += dashboardData.years[year][month].totals[className] || 0;
                    });
                }
            });
        });
        
        return aggregates;
    } catch (error) {
        console.error('Error calculating aggregate totals:', error);
        return {};
    }
}

function calculateAggregateRankings() {
    try {
        const aggregates = calculateAggregateTotals();
        const sortedClasses = Object.keys(aggregates).sort((a, b) => aggregates[b] - aggregates[a]);
        
        return {
            first: sortedClasses[0] || '',
            second: sortedClasses[1] || '',
            third: sortedClasses[2] || ''
        };
    } catch (error) {
        console.error('Error calculating rankings:', error);
        return { first: '', second: '', third: '' };
    }
}

function countMonthsWithData() {
    try {
        let count = 0;
        Object.keys(dashboardData.years).forEach(year => {
            Object.keys(dashboardData.years[year]).forEach(month => {
                if (dashboardData.years[year][month].totals && Object.values(dashboardData.years[year][month].totals).some(total => total > 0)) {
                    count++;
                }
            });
        });
        return count;
    } catch (error) {
        console.error('Error counting months with data:', error);
        return 0;
    }
}

// UI Update Functions
function updateDateTime() {
    try {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        };
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleDateString('en-IN', options) + ' IST';
        }
    } catch (error) {
        console.error('Error updating date time:', error);
    }
}

function updateBreadcrumb() {
    try {
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = `Currently Editing: ${currentMonth} ${currentYear}`;
        }
    } catch (error) {
        console.error('Error updating breadcrumb:', error);
    }
}

function updateCurrentPeriodDisplay() {
    try {
        const display = document.getElementById('currentPeriodDisplay');
        if (display) {
            display.textContent = `${currentMonth} ${currentYear}`;
        }
    } catch (error) {
        console.error('Error updating current period display:', error);
    }
}

function updateDataSummary() {
    try {
        const monthsElement = document.getElementById('monthsWithData');
        if (monthsElement) {
            monthsElement.textContent = countMonthsWithData();
        }
    } catch (error) {
        console.error('Error updating data summary:', error);
    }
}

function getScoreCategory(score) {
    if (score >= 15) return 'high-score';
    if (score >= 5) return 'medium-score';
    return 'low-score';
}

function renderScoresGrid() {
    try {
        const scoresGrid = document.getElementById('scoresGrid');
        if (!scoresGrid) return;
        
        const aggregates = calculateAggregateTotals();
        scoresGrid.innerHTML = '';
        
        dashboardData.classes.forEach(className => {
            const score = aggregates[className];
            const scoreItem = document.createElement('div');
            scoreItem.className = `score-item ${getScoreCategory(score)}`;
            scoreItem.innerHTML = `
                <div class="score-item-class">${className}</div>
                <div class="score-item-total">${score}</div>
            `;
            scoresGrid.appendChild(scoreItem);
        });
    } catch (error) {
        console.error('Error rendering scores grid:', error);
    }
}

function renderRankings() {
    try {
        const rankingsContainer = document.getElementById('rankingsContainer');
        if (!rankingsContainer) return;
        
        const rankings = calculateAggregateRankings();
        const aggregates = calculateAggregateTotals();
        
        rankingsContainer.innerHTML = '';
        
        const positions = [
            { key: 'first', label: '1st Place', class: 'first' },
            { key: 'second', label: '2nd Place', class: 'second' },
            { key: 'third', label: '3rd Place', class: 'third' }
        ];
        
        positions.forEach(position => {
            const className = rankings[position.key];
            if (className) {
                const rankingItem = document.createElement('div');
                rankingItem.className = `ranking-item ${position.class}`;
                rankingItem.innerHTML = `
                    <div class="ranking-position">${position.label}</div>
                    <div class="ranking-class">${className}</div>
                    <div class="ranking-score">${aggregates[className] || 0}</div>
                `;
                rankingsContainer.appendChild(rankingItem);
            }
        });
    } catch (error) {
        console.error('Error rendering rankings:', error);
    }
}

function renderScoreEntryGrid() {
    try {
        const scoreGrid = document.getElementById('scoreGrid');
        if (!scoreGrid) return;
        
        scoreGrid.innerHTML = '';
        
        // Header row
        const headerRow = document.createElement('div');
        headerRow.className = 'grid-cell grid-header';
        headerRow.textContent = 'Activity / Class';
        scoreGrid.appendChild(headerRow);
        
        dashboardData.classes.forEach(className => {
            const headerCell = document.createElement('div');
            headerCell.className = 'grid-cell grid-header';
            headerCell.textContent = className;
            scoreGrid.appendChild(headerCell);
        });
        
        // Activity rows
        dashboardData.activities.forEach(activity => {
            // Row header
            const rowHeader = document.createElement('div');
            rowHeader.className = 'grid-cell grid-row-header';
            rowHeader.textContent = activity;
            scoreGrid.appendChild(rowHeader);
            
            // Score cells
            dashboardData.classes.forEach(className => {
                const scoreCell = document.createElement('div');
                scoreCell.className = 'grid-cell';
                
                const select = document.createElement('select');
                select.className = 'score-select';
                select.setAttribute('data-activity', activity);
                select.setAttribute('data-class', className);
                
                const currentScore = dashboardData.years[currentYear][currentMonth].activity_scores[activity][className] || 0;
                
                dashboardData.point_options.forEach(point => {
                    const option = document.createElement('option');
                    option.value = point;
                    option.textContent = point;
                    if (point === currentScore) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                
                // Add event listener
                select.addEventListener('change', function(event) {
                    handleScoreChange(event);
                });
                
                scoreCell.appendChild(select);
                scoreGrid.appendChild(scoreCell);
            });
        });
    } catch (error) {
        console.error('Error rendering score entry grid:', error);
    }
}

function renderAll() {
    try {
        renderScoresGrid();
        renderRankings();
        renderScoreEntryGrid();
        updateCharts();
        updateDataSummary();
    } catch (error) {
        console.error('Error in renderAll:', error);
    }
}

// Event Handlers
function handleScoreChange(event) {
    try {
        const activity = event.target.getAttribute('data-activity');
        const className = event.target.getAttribute('data-class');
        const newScore = parseInt(event.target.value);
        
        console.log(`Updating score: ${activity} - ${className}: ${newScore} for ${currentMonth} ${currentYear}`);
        
        // Update the data
        dashboardData.years[currentYear][currentMonth].activity_scores[activity][className] = newScore;
        
        // Recalculate totals for current month
        calculateMonthTotals(currentYear, currentMonth);
        
        // Update displays immediately (aggregate totals and rankings)
        renderScoresGrid();
        renderRankings();
        updateCharts();
        updateDataSummary();
        
        // Auto-save to storage
        saveDataToStorage();
        
        showToast(`Updated ${className} - ${activity}: ${newScore}`, 'success');
    } catch (error) {
        console.error('Error handling score change:', error);
    }
}

function handleYearMonthChange() {
    try {
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        
        if (yearSelect && monthSelect) {
            const newYear = yearSelect.value;
            const newMonth = monthSelect.value;
            
            currentYear = newYear;
            currentMonth = newMonth;
            
            updateBreadcrumb();
            updateCurrentPeriodDisplay();
            ensureMonthDataExists(currentYear, currentMonth);
            renderAll();
            
            showToast(`Switched to ${currentMonth} ${currentYear}`, 'success');
        }
    } catch (error) {
        console.error('Error handling year/month change:', error);
    }
}

// Chart Functions
function initializeCharts() {
    try {
        initializeClassChart();
        initializeActivityChart();
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

function initializeClassChart() {
    try {
        const canvas = document.getElementById('classScoresChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const aggregates = calculateAggregateTotals();
        
        if (classChart) {
            classChart.destroy();
        }
        
        classChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dashboardData.classes,
                datasets: [{
                    label: 'Aggregate Score (All Months)',
                    data: dashboardData.classes.map(className => aggregates[className]),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B', '#1FB8CD', '#FFC185'],
                    borderColor: '#1FB8CD',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Score (All Months)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Class'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing class chart:', error);
    }
}

function initializeActivityChart() {
    try {
        const canvas = document.getElementById('activityScoresChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        if (activityChart) {
            activityChart.destroy();
        }
        
        // Calculate aggregate activity totals
        const activityAggregates = {};
        dashboardData.activities.forEach(activity => {
            activityAggregates[activity] = 0;
        });
        
        Object.keys(dashboardData.years).forEach(year => {
            Object.keys(dashboardData.years[year]).forEach(month => {
                if (dashboardData.years[year][month].activity_scores) {
                    dashboardData.activities.forEach(activity => {
                        dashboardData.classes.forEach(className => {
                            activityAggregates[activity] += dashboardData.years[year][month].activity_scores[activity][className] || 0;
                        });
                    });
                }
            });
        });
        
        activityChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: dashboardData.activities,
                datasets: [{
                    label: 'Total Score (All Months)',
                    data: dashboardData.activities.map(activity => activityAggregates[activity]),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing activity chart:', error);
    }
}

function updateCharts() {
    try {
        if (classChart) {
            const aggregates = calculateAggregateTotals();
            classChart.data.datasets[0].data = dashboardData.classes.map(className => aggregates[className]);
            classChart.update('none');
        }
        
        if (activityChart) {
            // Calculate aggregate activity totals
            const activityAggregates = {};
            dashboardData.activities.forEach(activity => {
                activityAggregates[activity] = 0;
            });
            
            Object.keys(dashboardData.years).forEach(year => {
                Object.keys(dashboardData.years[year]).forEach(month => {
                    if (dashboardData.years[year][month].activity_scores) {
                        dashboardData.activities.forEach(activity => {
                            dashboardData.classes.forEach(className => {
                                activityAggregates[activity] += dashboardData.years[year][month].activity_scores[activity][className] || 0;
                            });
                        });
                    }
                });
            });
            
            activityChart.data.datasets[0].data = dashboardData.activities.map(activity => activityAggregates[activity]);
            activityChart.update('none');
        }
    } catch (error) {
        console.error('Error updating charts:', error);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    try {
        // Login form - Critical fix with better error handling
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            console.log('Login form found, adding event listener');
            
            loginForm.addEventListener('submit', function(e) {
                console.log('Login form submission detected');
                e.preventDefault();
                e.stopPropagation();
                
                try {
                    const usernameField = document.getElementById('username');
                    const passwordField = document.getElementById('password');
                    const errorElement = document.getElementById('loginError');
                    
                    if (!usernameField || !passwordField) {
                        console.error('Username or password field not found');
                        return;
                    }
                    
                    const username = usernameField.value;
                    const password = passwordField.value;
                    
                    console.log('Login attempt with credentials:', username, '[password hidden]');
                    
                    if (attemptLogin(username, password)) {
                        // Clear form
                        loginForm.reset();
                        if (errorElement) {
                            errorElement.classList.add('hidden');
                        }
                        console.log('Login successful, form cleared');
                    } else {
                        if (errorElement) {
                            errorElement.textContent = 'Invalid username or password. Use admin/faith2025';
                            errorElement.classList.remove('hidden');
                        }
                        console.log('Login failed, showing error');
                    }
                } catch (loginError) {
                    console.error('Error in login form handler:', loginError);
                }
            });
            
            console.log('Login form event listener added successfully');
        } else {
            console.error('Login form not found!');
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
            console.log('Logout button event listener added');
        }
        
        // Year/Month selectors
        const yearSelect = document.getElementById('yearSelect');
        const monthSelect = document.getElementById('monthSelect');
        if (yearSelect && monthSelect) {
            yearSelect.addEventListener('change', handleYearMonthChange);
            monthSelect.addEventListener('change', handleYearMonthChange);
            console.log('Year/Month selectors event listeners added');
        }
        
        // Save changes button
        const saveBtn = document.getElementById('saveChangesBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                saveDataToStorage();
                showToast('All changes saved successfully!', 'success');
            });
        }
        
        // Reset current month button
        const resetBtn = document.getElementById('resetCurrentBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                const modal = document.getElementById('resetModal');
                const message = document.getElementById('resetModalMessage');
                if (modal && message) {
                    message.textContent = `Are you sure you want to reset all scores for ${currentMonth} ${currentYear}? This action cannot be undone.`;
                    modal.classList.remove('hidden');
                }
            });
        }
        
        // Reset all data button
        const resetAllBtn = document.getElementById('resetAllBtn');
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', function() {
                const modal = document.getElementById('resetModal');
                const message = document.getElementById('resetModalMessage');
                if (modal && message) {
                    message.textContent = 'Are you sure you want to reset ALL data for ALL months and years? This action cannot be undone.';
                    modal.classList.remove('hidden');
                    modal.setAttribute('data-reset-type', 'all');
                }
            });
        }
        
        // Reset modal actions
        const cancelResetBtn = document.getElementById('cancelResetBtn');
        if (cancelResetBtn) {
            cancelResetBtn.addEventListener('click', function() {
                const modal = document.getElementById('resetModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.removeAttribute('data-reset-type');
                }
            });
        }
        
        const confirmResetBtn = document.getElementById('confirmResetBtn');
        if (confirmResetBtn) {
            confirmResetBtn.addEventListener('click', function() {
                const modal = document.getElementById('resetModal');
                const resetType = modal ? modal.getAttribute('data-reset-type') : null;
                
                if (resetType === 'all') {
                    resetAllData();
                } else {
                    resetCurrentMonth();
                }
                
                if (modal) {
                    modal.classList.add('hidden');
                    modal.removeAttribute('data-reset-type');
                }
            });
        }
        
        // Export/Import buttons
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportData);
        }
        
        const importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', function() {
                const importFile = document.getElementById('importFile');
                if (importFile) {
                    importFile.click();
                }
            });
        }
        
        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.addEventListener('change', importData);
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                renderAll();
                showToast('Data refreshed!', 'success');
            });
        }
        
        console.log('All event listeners setup complete');
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Utility Functions
function resetCurrentMonth() {
    try {
        dashboardData.activities.forEach(activity => {
            dashboardData.classes.forEach(className => {
                dashboardData.years[currentYear][currentMonth].activity_scores[activity][className] = 0;
            });
        });
        
        calculateMonthTotals(currentYear, currentMonth);
        renderAll();
        saveDataToStorage();
        
        showToast(`All scores for ${currentMonth} ${currentYear} have been reset to 0`, 'success');
    } catch (error) {
        console.error('Error resetting current month:', error);
    }
}

function resetAllData() {
    try {
        // Reset all months in all years
        Object.keys(dashboardData.years).forEach(year => {
            Object.keys(dashboardData.years[year]).forEach(month => {
                dashboardData.activities.forEach(activity => {
                    if (!dashboardData.years[year][month].activity_scores) {
                        dashboardData.years[year][month].activity_scores = {};
                    }
                    if (!dashboardData.years[year][month].activity_scores[activity]) {
                        dashboardData.years[year][month].activity_scores[activity] = {};
                    }
                    dashboardData.classes.forEach(className => {
                        dashboardData.years[year][month].activity_scores[activity][className] = 0;
                    });
                });
                calculateMonthTotals(year, month);
            });
        });
        
        renderAll();
        saveDataToStorage();
        showToast('All data for all months and years has been reset to 0', 'warning');
    } catch (error) {
        console.error('Error resetting all data:', error);
    }
}

function exportData() {
    try {
        const dataStr = JSON.stringify(dashboardData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `faith_formation_multi_year_data_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showToast('All data exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('Error exporting data', 'error');
    }
}

function importData(event) {
    try {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Validate imported data structure
                if (importedData.activities && importedData.classes && importedData.years) {
                    dashboardData = importedData;
                    
                    // Ensure current selection is valid
                    if (!dashboardData.years[currentYear] || !dashboardData.years[currentYear][currentMonth]) {
                        currentYear = "2025";
                        currentMonth = "July";
                    }
                    
                    // Update UI
                    const yearSelect = document.getElementById('yearSelect');
                    const monthSelect = document.getElementById('monthSelect');
                    if (yearSelect) yearSelect.value = currentYear;
                    if (monthSelect) monthSelect.value = currentMonth;
                    
                    updateBreadcrumb();
                    updateCurrentPeriodDisplay();
                    ensureMonthDataExists(currentYear, currentMonth);
                    renderAll();
                    
                    saveDataToStorage();
                    showToast('Data imported successfully!', 'success');
                } else {
                    showToast('Invalid file format!', 'error');
                }
            } catch (error) {
                console.error('Error parsing imported file:', error);
                showToast('Error reading file!', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    } catch (error) {
        console.error('Error in import data:', error);
        showToast('Error importing data', 'error');
    }
}

function showToast(message, type = 'success') {
    try {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) {
            console.log('Toast message:', message);
            return;
        }
        
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    } catch (error) {
        console.error('Error showing toast:', error);
    }
}
