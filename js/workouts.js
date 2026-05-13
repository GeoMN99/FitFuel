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

function deleteWorkout(index) {
    workouts.splice(index, 1);
    saveWorkouts();
    renderWorkouts();
}

function renderWorkouts() {
    const list = document.getElementById('workout-list');
    const totalEl = document.getElementById('workout-total');
    list.innerHTML = '';

    if (workouts.length === 0) {
        list.innerHTML = '<li style="color:#555;">No workouts logged yet. Add one above!</li>';
        totalEl.textContent = 'Total Burned: 0 kcal';
        return;
    }

    let total = 0;
    workouts.forEach((w, i) => {
        total +=w.calories;
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
        <strong>${w.name}</strong> - ${w.duration} mins
        <span class="badge">${w.category}</span>
        <br/><small style="color:#666;">${w.date}</small>
        </div>
        <div>
        <span class="kcal">${w.calories} kcal</span>
        <button class="delete-btn" onclick="deleteWorkout(${i})">🗑</button>
        </div>
        `;
        list.appendChild(li);
    });
    totalEl.textContent = `Total Burned: ${total} kcal`;
}

// Run on page load
renderWorkouts();