document.getElementById('show-meals').addEventListener('click', function() {
    fetch('meals.json')
        .then(response => response.json())
        .then(meals => {
            const selectedMeal = document.getElementById('meal-select').value;
            const selectedTime = document.getElementById('time-select').value;
            const selectedDiets = Array.from(document.querySelectorAll('#diet-select input:checked')).map(input => input.value);
            const selectedCalories = document.getElementById('calories-select').value;

            const mealList = document.getElementById('meal-list');
            mealList.innerHTML = '';

            const filteredMeals = meals.filter(meal => {
                if (!meal.katagoriler.includes(selectedMeal)) {
                    return false;
                }
                if (selectedTime === '0-15' && meal.hazırlanma_süresi <= 15) {
                    return true;
                }
                if (selectedTime === '15-30' && meal.hazırlanma_süresi > 15 && meal.hazırlanma_süresi <= 30) {
                    return true;
                }
                if (selectedTime === '30+' && meal.hazırlanma_süresi > 30) {
                    return true;
                }
                return false;
            }).filter(meal => {
                if (selectedDiets.length === 0) {
                    return true;
                }
                return selectedDiets.every(diet => meal.diyet.includes(diet));
            }).filter(meal => {
                if (selectedCalories === 'low' && meal.kalori >= 0 && meal.kalori <= 500) {
                    return true;
                }
                if (selectedCalories === 'medium' && meal.kalori > 500 && meal.kalori <= 800) {
                    return true;
                }
                if (selectedCalories === 'high' && meal.kalori > 800) {
                    return true;
                }
                return false;
            });

            filteredMeals.forEach(meal => {
                const listItem = document.createElement('li');
                listItem.textContent = meal.isim;
                listItem.dataset.mealName = meal.isim; // Data attribute for meal name
                mealList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching meals:', error));
});

document.getElementById('meal-list').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'LI') {
        const mealName = event.target.dataset.mealName;
        localStorage.setItem('selectedMeal', mealName);
        window.location.href = 'meal-details.html';
    }
});
