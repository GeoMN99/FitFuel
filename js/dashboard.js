// Daily calorie goal
const DAILY_GOAL = 2000;
 
// Read from local storage — shared across all pages
const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
const meals = JSON.parse(localStorage.getItem('meals')) || [];
 
// Function to update the dashboard summary
function updateDashboard() {

    //Get today's date in the same format as saved dates
    const today = new Date().toLocaleDateString();

    //Filter only today's meals and workouts for the dashboard summary
    const todayMeals = meals.filter(m => m.date === today);
    const todayWorkouts = workouts.filter(w => w.date === today);
 
    // Add up all calories burned from today's workouts
    const totalBurned = todayWorkouts.reduce((sum, w) => sum + w.calories, 0);
 
    // Add up all calories consumed from today's meals
    const totalConsumed = todayMeals.reduce((sum, m) => sum + m.calories, 0);
 
    // Calculate net balance — burned minus consumed
    const netBalance = totalBurned - totalConsumed;

    // Update the summary cards
    document.getElementById('total-burned').textContent = `${totalBurned} kcal`;
    document.getElementById('total-consumed').textContent = `${totalConsumed} kcal`;

    //Update net balance and change colour based on positive
    const balanceEl = document.getElementById('net-balance');
    balanceEl.textContent = `${netBalance} kcal`;
    balanceEl.style.color = netBalance >= 0 ? '#39ff14' : '#ff4500';

    //Update progress bar based on calories consumed vs daily goal
    const progress = Math.min((totalConsumed / DAILY_GOAL) * 100, 100);
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-label').textContent =
        `${Math.round(progress)}% of daily ${DAILY_GOAL} kcal goal`;
}

// ===== EVENT LISTENERS =====
// Wait for the page to fully load before running
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
});