let currentWeek = 1;

// --- Core Functions ---

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

// --- Export to CSV ---

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

// --- Import from CSV ---

function importFromCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        try {
            const lines = text.split('\n');
            const importedData = {};
            
            // Skip header (line 0)
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

// --- Event Listeners ---

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

document.addEventListener('change', (e) => {
    if (e.target.classList.contains('veg-checkbox')) {
        saveData();
    }
});

// Initialize
renderVegetables();
