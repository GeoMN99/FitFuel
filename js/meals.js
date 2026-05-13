// Load meals from local storage or start empty
let meals =JSON.parse(localStorage.getItem('meals')) || [];

//Function to save meals to local storage
function saveMeals() {
    localStorage.setItem('meals', JSON.stringify(meals));
}

//Function to add meal
function addMeal() {
    const name = document.getElementById('meal-name').value.trim();
    const portion = document.getElementById('meal-portion').value.trim();
    const calories = parseInt(document.getElementById('meal-calories').value.trim());
    const type = document.getElementById('meal-type').value;

    if (!name || !portion || isNaN(calories) || calories <= 0) {
        alert('Please fill in all fields correctly');
        return;
    }

    const meal = {
        name,
        portion,
        calories,
        type: type || 'General',
        date: new Date().toLocaleDateString()
    };

    meals.push(meal);
    saveMeals();
    renderMeals();

    //Clear inputs
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-portion').value = '';
    document.getElementById('meal-calories').value = '';
    document.getElementById('meal-type').value = '';
}

function deleteMeal(index) {
    meals.splice(index, 1);
    saveMeals();
    renderMeals();
}

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
        <strong>${m.name}</strong> — ${m.portion}
        <span class="badge">${m.type}</span>
        <br/><small style="color:#666;">${m.date}</small>
      </div>
      <div>
        <span class="kcal">${m.calories} kcal</span>
        <button class="delete-btn" onclick="deleteMeal(${i})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = `Total Consumed: ${total} kcal`;
}

//Run on page load
renderMeals();