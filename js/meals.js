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

    
}