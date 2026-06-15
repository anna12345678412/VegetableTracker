let currentWeek = 1;
let isDashboardVisible = false;

// ===========================================
// CORE FUNCTIONS
// ===========================================

function loadSavedData() {
    try {
        return JSON.parse(localStorage.getItem('veggieTracker')) || {};
    } catch (e) {
        console.error("Error loading data:", e);
        return {};
    }
}

function saveData() {
    const data = loadSavedData();
    const selected = document.querySelectorAll('.veg-checkbox:checked');
    const weekKey = `week_${currentWeek}`;
    
    data[weekKey] = Array.from(selected).map(cb => cb.dataset.veg);
    localStorage.setItem('veggieTracker', JSON.stringify(data));
    showStatus(`Saved Week ${currentWeek}!`, 'success');
}

function renderVegetables() {
    const container = document.getElementById('vegetableContainer');
    const savedData = loadSavedData();
    const weekKey = `week_${currentWeek}`;
    const selectedVeggies = savedData[weekKey] || [];

    let html = '';
    vegetableData.forEach(cat => {
        html += `<section class="category"><h2>${cat.category}</h2>`;
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

function showStatus(msg, type) {
    const el = document.getElementById('statusMsg');
    el.textContent = msg;
    el.className = `status-msg status-${type}`;
    setTimeout(() => el.textContent = '', 4000);
}

// ===========================================
// DASHBOARD FUNCTIONS
// ===========================================

function calculateStats() {
    const data = loadSavedData();
    
    // Total weeks with any data
    const weeksWithEntries = Object.keys(data).filter(k => data[k].length > 0).length;
    
    // Total vegetable selections across all weeks
    let totalSelections = 0;
    Object.values(data).forEach(v => totalSelections += v.length);
    
    // Calculate average completion rate
    let completionRates = [];
    Object.keys(data).forEach(key => {
        const count = data[key].length;
        const percent = (count / getTotalVeggieCount()) * 100;
        if (count > 0) {
            completionRates.push(percent);
        }
    });
    const avgCompletion = completionRates.length > 0 
        ? Math.round(completionRates.reduce((a,b) => a + b, 0) / completionRates.length)
        : 0;
    
    return {
        weeksTracked: weeksWithEntries,
        totalSelections,
        avgCompletion
    };
}

function getCategoryCounts() {
    const data = loadSavedData();
    const categoryCounts = {};
    
    vegetableData.forEach(cat => {
        categoryCounts[cat.category] = 0;
    });
    
    Object.values(data).forEach(vegList => {
        vegList.forEach(vegName => {
            for(let catObj of vegetableData) {
                if(catObj.vegetables.includes(vegName)) {
                    categoryCounts[catObj.category]++;
                    break;
                }
            }
        });
    });
    
    return categoryCounts;
}

function getTopVegetables(limit = 5) {
    const data = loadSavedData();
    const veggieCounts = {};
    
    Object.values(data).forEach(vegList => {
        vegList.forEach(vegName => {
            veggieCounts[vegName] = (veggieCounts[vegName] || 0) + 1;
        });
    });
    
    return Object.entries(veggieCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
}

function getTotalVeggieCount() {
    return vegetableData.reduce((sum, cat) => sum + cat.vegetables.length, 0);
}

function getCurrentWeekProgress() {
    const data = loadSavedData();
    const weekKey = `week_${currentWeek}`;
    const selected = data[weekKey]?.length || 0;
    const total = getTotalVeggieCount();
    return { selected, total, percent: Math.round((selected / total) * 100) };
}

function renderDashboard() {
    const stats = calculateStats();
    const progress = getCurrentWeekProgress();
    const categoryCounts = getCategoryCounts();
    const topVeggies = getTopVegetables(5);
    const maxCategory = Math.max(...Object.values(categoryCounts), 1);
    
    // Update stat cards
    document.getElementById('totalWeeksTracked').textContent = stats.weeksTracked;
    document.getElementById('totalVeggieCount').textContent = stats.totalSelections;
    document.getElementById('completionRate').textContent = `${stats.avgCompletion}%`;
    
    // Update weekly progress bar
    document.getElementById('weeklyProgressFill').style.width = `${progress.percent}%`;
    document.getElementById('selectedCount').textContent = progress.selected;
    document.getElementById('totalCount').textContent = progress.total;
    
    // Render category bars
    let categoryHtml = '';
    Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, count]) => {
            const percent = (count / maxCategory) * 100;
            categoryHtml += `
                <div class="category-bar">
                    <span class="category-name">${category}</span>
                    <div class="category-bar-bg">
                        <div class="category-bar-fill" style="width: ${percent}%"></div>
                    </div>
                    <span class="bar-count">${count}</span>
                </div>
            `;
        });
    document.getElementById('categoryBars').innerHTML = categoryHtml;
    
    // Render top vegetables
    if (topVeggies.length > 0) {
        let topHtml = '<ul class="top-list">';
        topVeggies.forEach(([name, count], index) => {
            topHtml += `
                <li class="top-item">
                    <span class="rank-number">${index + 1}</span>
                    <span class="veg-name">${name}</span>
                    <span class="veg-count">${count}×</span>
                </li>
            `;
        });
        topHtml += '</ul>';
        document.getElementById('topVegetables').innerHTML = topHtml;
    } else {
        document.getElementById('topVegetables').innerHTML = 
            '<p style="text-align:center;color:#888;">No data yet - start tracking!</p>';
    }
}

function toggleDashboard() {
    const dashboard = document.getElementById('dashboard');
    const btn = document.getElementById('viewDashboardBtn');
    
    isDashboardVisible = !isDashboardVisible;
    
    if (isDashboardVisible) {
        dashboard.classList.remove('hidden');
        btn.textContent = '🥬 Back to Tracker';
        renderDashboard();
        document.getElementById('vegetableContainer').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        dashboard.classList.add('hidden');
        btn.textContent = '📊 View Dashboard';
        document.getElementById('vegetableContainer').classList.remove('hidden');
        document.querySelector('.controls').classList.remove('hidden');
    }
}

// ===========================================
// EXPORT/IMPORT FUNCTIONS
// ===========================================

function exportToCSV() {
    const data = loadSavedData();
    if (Object.keys(data).length === 0) {
        showStatus("No data to export yet!", "info");
        return;
    }

    let csvContent = "Week,Category,Vegetable Name\n";
    
    Object.keys(data).forEach(key => {
        const weekNum = key.replace("week_", "");
        data[key].forEach(vegName => {
            let category = "Unknown";
            for(let catObj of vegetableData) {
                if(catObj.vegetables.includes(vegName)) {
                    category = catObj.category;
                    break;
                }
            }
            csvContent += `Week ${weekNum},${category},${vegName}\n`;
        });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `veggie-tracker-data-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus("Download started!", "success");
}

function importFromCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        try {
            const lines = text.split('\n');
            const importedData = {};
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const parts = line.split(',');
                if (parts.length >= 3) {
                    const weekPart = parts[0].trim(); 
                    const category = parts[1].trim();
                    const vegName = parts[2].trim();

                    const weekMatch = weekPart.match(/Week (\d+)/);
                    if (weekMatch) {
                        const weekKey = `week_${weekMatch[1]}`;
                        if (!importedData[weekKey]) {
                            importedData[weekKey] = [];
                        }
                        importedData[weekKey].push(vegName);
                    }
                }
            }

            const currentStored = loadSavedData();
            Object.assign(currentStored, importedData);
            localStorage.setItem('veggieTracker', JSON.stringify(currentStored));
            
            showStatus(`Imported data for ${Object.keys(importedData).length} weeks!`, "success");
            renderVegetables();
            document.getElementById('fileInput').value = '';

        } catch (err) {
            console.error(err);
            showStatus("Error reading CSV file.", "error");
        }
    };
    reader.readAsText(file);
}

// ===========================================
// EVENT LISTENERS
// ===========================================

document.getElementById('prevWeek').addEventListener('click', () => {
    if (currentWeek > 1) { currentWeek--; renderVegetables(); }
});

document.getElementById('nextWeek').addEventListener('click', () => {
    if (currentWeek < totalWeeks) { currentWeek++; renderVegetables(); }
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

document.getElementById('exportBtn').addEventListener('click', exportToCSV);
document.getElementById('fileInput').addEventListener('change', importFromCSV);
document.getElementById('viewDashboardBtn').addEventListener('click', toggleDashboard);

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('veg-checkbox')) {
        saveData();
    }
});

// Initialize
renderVegetables();
