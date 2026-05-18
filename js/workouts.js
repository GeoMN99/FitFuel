// Load workouts from local storage or start with empty array
let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
 
// Function to save workouts to local storage
function saveWorkouts() {
    localStorage.setItem('workouts', JSON.stringify(workouts));
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


 
// Function to add a new workout
function addWorkout() {
    // Grab values from input fields
    const name = document.getElementById('workout-name').value.trim();
    const duration = document.getElementById('workout-duration').value.trim();
    const calories = parseInt(document.getElementById('workout-calories').value.trim());
    const category = document.getElementById('workout-category').value;
 
    // Validate — make sure nothing is empty
    if (!name || !duration || isNaN(calories) || calories <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }
 
    // Create a workout object and save today's date automatically
    const workout = {
        name,
        duration,
        calories,
        category: category || 'General',
        date: new Date().toLocaleDateString()
    };
 
    // Push to array, save to local storage, re-render the list
    workouts.push(workout);
    saveWorkouts();
    renderWorkouts();
    showSuccess('✅ Workout added successfully!');
 
    // Clear the input fields after adding
    document.getElementById('workout-name').value = '';
    document.getElementById('workout-duration').value = '';
    document.getElementById('workout-calories').value = '';
    document.getElementById('workout-category').value = '';
}
 
// Function to delete a workout by its index
function deleteWorkout(index) {
    workouts.splice(index, 1);
    saveWorkouts();
    renderWorkouts();
}
 
// Function to render the workout list on the page
function renderWorkouts() {
    const list = document.getElementById('workout-list');
    const totalEl = document.getElementById('workout-total');
    list.innerHTML = '';

    //Get today's date in the same format as saved dates
    const today = new Date().toLocaleDateString();

    //Split workouts into today and previous
    const todayWorkouts = workouts.filter(w => w.date === today);
    const previousWorkouts = workouts.filter(w => w.date !== today);
 
    if (workouts.length === 0) {
        list.innerHTML = '<li style="color:#555;">No workouts logged yet. Add one above!</li>';
        totalEl.textContent = 'Total Burned: 0 kcal';
        return;
    }

    //Today's workouts
    if (todayWorkouts.length > 0) {
        const todayHeader = document.createElement('li');
        todayHeader.innerHTML = '<strong style="color:#ff4500;">📅 Today</strong>';
        todayHeader.style.background = 'transparent';
        todayHeader.style.borderBottom = '1px solid #ff4500';
        list.appendChild(todayHeader);

        todayWorkouts.forEach((w, i) => {
            const index = workouts.indexOf(w);
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${w.name}</strong> - ${w.duration} mins
                <span class="badge">${w.category}</span>
                <br/><small style="color:#666;">${w.date}</small>
            </div>
            <div>
                <span class="kcal">${w.calories} kcal</span>
                <button class="delete-btn" data-index="${index}">🗑</button>
            </div>
            `;
            list.appendChild(li);
        });
    }

    //Previous workouts
    if (previousWorkouts.length > 0) {
        const prevHeader = document.createElement('li');
        prevHeader.innerHTML = '<strong style="color: #aaa;">🕑 Previous Workouts</strong>';
        prevHeader.style.background = 'transparent';
        prevHeader.style.borderBottom = '1px solid #333';
        list.appendChild(prevHeader);

        previousWorkouts.forEach((w, i) => {
            const index = workouts.indexOf(w);
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <strong>${w.name}</strong> - ${w.duration} mins
                <span class="badge">${w.category}</span>
                <br/><small style="color:#666;">${w.date}</small>
            </div>
            <div>
                <span class="kcal">${w.calories} kcal</span>
                <button class="delete-btn" data-index="${index}">🗑</button>
            </div>
            `;
            list.appendChild(li);
        });
    }

    //Calculate total for today only
    const total = todayWorkouts.reduce((sum, w) => sum + w.calories, 0);
    totalEl.textContent = `Total Burned Today: ${total} kcal`;

    //Event listeners for all delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteWorkout(index);
        });
    });
}
 
 
// ===== EVENT LISTENERS =====
// Wait for the page to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
 
    // Add Workout button event listener
    document.getElementById('add-workout-btn').addEventListener('click', addWorkout);
 
    // Run on page load to display any saved workouts
    renderWorkouts();
});