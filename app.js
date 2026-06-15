let currentWeek = 1;

// Load saved data from localStorage
function loadSavedData() {
    const saved = localStorage.getItem('veggieTracker');
    return saved ? JSON.parse(saved) : {};
}

// Save data to localStorage
function saveData() {
    const data = loadData();
    const selected = document.querySelectorAll('.veg-checkbox:checked');
    data[`week_${currentWeek}`] = Array.from(selected).map(cb => cb.dataset.veg);
    localStorage.setItem('veggieTracker', JSON.stringify(data));
    showStatus('Progress saved!', 'success');
}

// Load data helper
function loadData() {
    return JSON.parse(localStorage.getItem('veggieTracker') || '{}');
}

// Render vegetable checkboxes for current week
function renderVegetables() {
    const container = document.getElementById('vegetableContainer');
    const savedData = loadSavedData();
    const weekKey = `week_${currentWeek}`;
    const selectedVeggies = savedData[weekKey] || [];

    let html = '';
    vegetableData.forEach(cat => {
        html += `<section class="category">`;
        html += `<h2>${cat.category}</h2>`;
        cat.vegetables.forEach(veg => {
            const checked = selectedVeggies.includes(veg) ? 'checked' : '';
            html += `<label class="veg-label">`;
            html += `<input type="checkbox" class="veg-checkbox" data-veg="${veg}" ${checked}>`;
            html += `${veg}`;
            html += `</label>`;
        });
        html += `</section>`;
    });
    container.innerHTML = html;

    document.getElementById('currentWeekDisplay').textContent = `Week ${currentWeek}`;
}

// Event Listeners
document.getElementById('prevWeek').addEventListener('click', () => {
    if (currentWeek > 1) {
        currentWeek--;
        renderVegetables();
    }
});

document.getElementById('nextWeek').addEventListener('click', () => {
    if (currentWeek < totalWeeks) {
        currentWeek++;
        renderVegetables();
    }
});

document.getElementById('saveBtn').addEventListener('click', saveData);

document.getElementById('resetWeekBtn').addEventListener('click', () => {
    if (confirm(`Clear all selections for Week ${currentWeek}?`)) {
        const saved = loadSavedData();
        delete saved[`week_${currentWeek}`];
        localStorage.setItem('veggieTracker', JSON.stringify(saved));
        renderVegetables();
        showStatus('Week reset.', 'info');
    }
});

// Auto-save when checkbox changes
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('veg-checkbox')) {
        saveData();
    }
});

function showStatus(msg, type) {
    const el = document.getElementById('statusMsg');
    el.textContent = msg;
    el.className = `status-${type}`;
    setTimeout(() => el.textContent = '', 3000);
}

// Initialize
renderVegetables();
