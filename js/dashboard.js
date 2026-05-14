const DAILY_GOAL =2000;

//Read from local storage - shared accross all pages
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
const meals = JSON.parse(localStorage.getItem('meals'))  || [];

function updateDashboard() {
    const totalBurned = workouts.reduce((sum, w) => sum + w.calories, 0);
    const totalConsumed = meals.reduce((sum, m) => sum + m.calories, 0);
    const netBalance = totalBurned - totalConsumed;

    document.getElementById('total-burned').textContent = `${totalBurned} kcal`;
    document.getElementById('total-consumed').textContent = `${totalConsumed} kcal`;

    const balanceEl = document.getElementById('net-balance');
    balanceEl.textContent = `${netBalance} kcal`;
    balanceEl.style.color = netBalance >= 0 ? '#39ff14' : '#ff4500';

    const progress = Math.min((totalConsumed / DAILY_GOAL) * 100, 100);
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% of ${DAILY_GOAL} kcal`;
}

updateDashboard();