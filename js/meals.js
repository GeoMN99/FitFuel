// Load meals from local storage or start with empty array
let meals = JSON.parse(localStorage.getItem('meals')) || [];
 
// Function to save meals to local storage
function saveMeals() {
    localStorage.setItem('meals', JSON.stringify(meals));
}
 
// Function to add a new meal
function addMeal() {
    // Grab values from input fields
    const name = document.getElementById('meal-name').value.trim();
    const portion = document.getElementById('meal-portion').value.trim();
    const calories = parseInt(document.getElementById('meal-calories').value.trim());
    const type = document.getElementById('meal-type').value;
 
    // Validate — make sure nothing is empty
    if (!name || !portion || isNaN(calories) || calories <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }
 
    // Create a meal object and save today's date automatically
    const meal = {
        name,
        portion,
        calories,
        type: type || 'General',
        date: new Date().toLocaleDateString()
    };
 
    // Push to array, save to local storage, re-render the list
    meals.push(meal);
    saveMeals();
    renderMeals();
 
    // Clear the input fields after adding
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-portion').value = '';
    document.getElementById('meal-calories').value = '';
    document.getElementById('meal-type').value = '';
}
 
// Function to delete a meal by its index
function deleteMeal(index) {
    meals.splice(index, 1);
    saveMeals();
    renderMeals();
}
 
// Function to render the meal list on the page
function renderMeals() {
    const list = document.getElementById('meal-list');
    const totalEl = document.getElementById('meal-total');
    list.innerHTML = '';
 
    if (meals.length === 0) {
        list.innerHTML = '<li style="color:#555;">No meals logged yet. Add one above!</li>';
        totalEl.textContent = 'Total Consumed: 0 kcal';
        return;
    }
 
    let total = 0;
    meals.forEach((m, i) => {
        total += m.calories;
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
            <strong>${m.name}</strong> - ${m.portion}
            <span class="badge">${m.type}</span>
            <br/><small style="color:#666;">${m.date}</small>
        </div>
        <div>
            <span class="kcal">${m.calories} kcal</span>
            <button class="delete-btn" data-index="${i}">🗑</button>
        </div>
        `;
        list.appendChild(li);
    });
 
    totalEl.textContent = `Total Consumed: ${total} kcal`;
 
    // Event listeners for all delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteMeal(index);
        });
    });
}
 
// ===== EVENT LISTENERS =====
// Wait for the page to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
 
    // Add Meal button event listener
    document.getElementById('add-meal-btn').addEventListener('click', addMeal);
 
    // Run on page load to display any saved meals
    renderMeals();
});