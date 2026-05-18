// Load meals from local storage or start with empty array
let meals = JSON.parse(localStorage.getItem('meals')) || [];
 
// Function to save meals to local storage
function saveMeals() {
    localStorage.setItem('meals', JSON.stringify(meals));
}

// Function to show a success message
function showSuccess(message) {
    //Create the message element
    const msg = document.createElement('div');
    msg.classList.add('success-message');
    msg.textContent = message;

    // Add it to the page
    document.body.appendChild(msg);

    // After 2 seconds start fading out
    setTimeout(function() {
        msg.classList.add('fade-out');
    }, 2000);

    //After 2.5 seconds remove it from  the page completely
    setTimeout(function() {
        msg.remove();
    }, 2500);
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
    showSuccess('✅ Meal added successfully!');
    
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

    //Get today's date in the same format as saved dates
    const today = new Date().toLocaleDateString();

    //Split meals into today and previous
    const todayMeals = meals.filter(m => m.date === today);
    const previousMeals = meals.filter(m => m.date !== today);
 
    if (meals.length === 0) {
        list.innerHTML = '<li style="color:#555;">No meals logged yet. Add one above!</li>';
        totalEl.textContent = 'Total Consumed: 0 kcal';
        return;
    }
 
    //Today's meals
    if (todayMeals.length > 0) {
        const todayHeader = document.createElement('li');
        todayHeader.innerHTML = '<strong style="color:#ff4500;">📅 Today</strong>';
        todayHeader.style.background = 'transparent';
        todayHeader.style.borderBottom = '1px solid #ff4500';
        list.appendChild(todayHeader);

        todayMeals.forEach((m, i) => {
            const index = meals.indexOf(m);
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${m.name}</strong> - ${m.portion}
                <span class="badge">${m.type}</span>
                <br/><small style="color:#666;">${m.date}</small>
            </div>
            <div>
                <span class="kcal">${m.calories} kcal</span>
                <button class="delete-btn" data-index="${index}">🗑</button>
            </div>
            `;
            list.appendChild(li);
        });
    }

    //Previous meals
    if (previousMeals.length > 0) {
        const prevHeader = document.createElement('li');
        prevHeader.innerHTML = '<strong style="color: #aaa;">🕑 Previous Meals</strong>';
        prevHeader.style.background = 'transparent';
        prevHeader.style.borderBottom = '1px solid #333';
        list.appendChild(prevHeader);

        previousMeals.forEach((m, i) => {
            const index = meals.indexOf(m);
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${m.name}</strong> - ${m.portion}
                <span class="badge">${m.type}</span>
                <br/><small style="color:#666;">${m.date}</small>
            </div>
            <div>
                <span class="kcal">${m.calories} kcal</span>
                <button class="delete-btn" data-index="${index}">🗑</button>
            </div>
            `;
            list.appendChild(li);
        });
    }

    //Calculate total for today only
    const total = todayMeals.reduce((sum, m) => sum + m.calories, 0);
    totalEl.textContent = `Total Consumed Today: ${total} kcal`;

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