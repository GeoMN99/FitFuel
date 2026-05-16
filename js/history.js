// Read all saved data from local storage
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
const meals = JSON.parse(localStorage.getItem('meals')) || [];
 
// Function to render all history on the page
function renderHistory() {
 
    // ===== WORKOUT HISTORY =====
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
                <span class="badge">${w.category}</span>
                <br/><small style="color:#666;">${w.date}</small>
            </div>
            <div>
                <span class="kcal">${w.calories} kcal</span>
            </div>
            `;
            wList.appendChild(li);
        });
    }
 
    // ===== MEAL HISTORY =====
    const mList = document.getElementById('history-meal-list');
    mList.innerHTML = '';
 
    if (meals.length === 0) {
        mList.innerHTML = '<li style="color:#555;">No meals logged yet.</li>';
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
            mList.appendChild(li);
        });
    }
}
 
// Function to clear all data from local storage
function clearAll() {
    if (confirm('Are you sure you want to clear ALL your data? This cannot be undone.')) {
        localStorage.removeItem('workouts');
        localStorage.removeItem('meals');
        renderHistory();
        alert('All data cleared.');
    }
}
 
// ===== EVENT LISTENERS =====
// Wait for the page to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
 
    // Clear All button event listener
    document.getElementById('clear-all-btn').addEventListener('click', clearAll);
 
    // Run on page load to display saved history
    renderHistory();
});