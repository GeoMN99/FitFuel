// Load meals from local storage or start empty
let meals =JSON.parse(localStorage.getItem('meals'))

//Function to save meals to local storage
function saveMeals() {
    localStorage.setItem('meals', JSON.stringify(meals));
}

//Function to add meal
function addMEal() {
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
    document.getElementById('meal-portions').value = '';
    document.getElementById('meal-calories').value = '';
    document.getElementById('meal-type').value = '';
}

function deleteMeals(index) {
    meals.splice(index, 1);
    saveMeals();
    renderMeals();
}

