// Read all saved data from local storage
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
const meals = JSON.parse(localStorage.getItem('meals')) || [];

// Render functions for history page
function renderHistory() {
    // Workouts History
    const wList = document.getElementById('history-workout-list');
    wList.innerHTML = '';

    if (workouts.length === 0) {
        wList.innerHTML = '<li style="color:#555;">No workouts logged yet.</li>';
    } else {
        workouts.forEach((w, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
            <strong>${w.name}</strong> - ${w.duration} mins
            <span style="color:#666;">${w.date}</span>
            </div>
            <div>
            <span class="kcal">${w.calories} kcal</span>
            </div>
            `;
            wList.appendChild(li);
        });
    }

    // Meals History
    const Mlist = document.getElementById('history-meal-list');
    Mlist.innerHTML = '';

    if (meals.length === 0) {
        Mlist.innerHTML = '<li style="color:#555;">No meals logged yet.</li>';
    } else {
        meals.forEach((m, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
            <strong>${m.name}</strong> - ${m.portion}
            <span class="badge">${m.type}</span>
            <br/><small style="color:#666;">${m.date}</small>
            </div>
            <div>
            <span class="kcal">${m.calories} kcal</span>
            </div>
            `;
            Mlist.appendChild(li);
        });
    }
}

// Clear all data from local storage
function clearAll() {
    if (confirm('Are you sure you want to clear All your Data? This action cannot be undone.')) {
        localStorage.removeItem('workouts');
        localStorage.removeItem('meals');
        renderHistory();
        alert('All data cleared!');
    }
}

renderHistory();