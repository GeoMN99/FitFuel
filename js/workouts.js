// Load workouts from local storage or start empty
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

//Function to save workouts to local storage
function saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Function to add a new workout
function addWorkout() {
    const name = document.getElementById('workout-name').value.trim();
    const duration = document.getElementById('workout-duration').value.trim();
    const calories = parseInt(document.getElementById('workout-calories').value.trim());
    const category = document.getElementById('workout-category').value;

    if (!name || !duration || isNaN(calories) || calories <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    } 

    // Save with today's date
    const workout = {
        name,
        duration,
        calories,
        category: category || 'General',
        date: new Date().toLocaleDateString()
    };

    workouts.push(workout);
    saveWorkouts();
    renderWorkouts();

    // Clear form
    document.getElementById('workout-name').value = '';
    document.getElementById('workout-duration').value = '';
    document.getElementById('workout-calories').value = '';
    document.getElementById('workout-category').value = '';
}