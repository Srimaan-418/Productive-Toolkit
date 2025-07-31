document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultContainer = document.getElementById('resultContainer');
    const unitToggle = document.querySelector('.unit-toggle');
    const weightUnitDisplay = document.getElementById('weightUnit');
    const heightUnitDisplay = document.getElementById('heightUnit');

    // Handle unit changes
    unitToggle.addEventListener('change', (e) => {
        const unit = e.target.value;
        if (unit === 'metric') {
            weightUnitDisplay.textContent = 'kg';
            heightUnitDisplay.textContent = 'cm';
            weightInput.placeholder = 'e.g., 70';
            heightInput.placeholder = 'e.g., 175';
        } else {
            weightUnitDisplay.textContent = 'lbs';
            heightUnitDisplay.textContent = 'in';
            weightInput.placeholder = 'e.g., 155';
            heightInput.placeholder = 'e.g., 69';
        }
        // Clear inputs on unit change
        weightInput.value = '';
        heightInput.value = '';
        resultContainer.style.display = 'none';
    });

    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
        let bmi;

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Please enter valid positive numbers for weight and height.');
            return;
        }

        // Calculate BMI based on selected unit
        if (selectedUnit === 'metric') {
            // BMI = weight (kg) / [height (m)]^2
            const heightInMeters = height / 100;
            bmi = weight / (heightInMeters * heightInMeters);
        } else {
            // BMI = 703 x weight (lbs) / [height (in)]^2
            bmi = 703 * (weight / (height * height));
        }
        
        const bmiFormatted = bmi.toFixed(1);
        
        // Save the result to localStorage
        localStorage.setItem('zenith-lastBMI', bmiFormatted);

        const { category, className } = getBmiCategory(bmi);

        resultContainer.innerHTML = `
            <p>Your BMI is</p>
            <div class="bmi-score">${bmiFormatted}</div>
            <div class="bmi-category ${className}">${category}</div>
        `;

        resultContainer.style.display = 'block';
    });

    function getBmiCategory(bmi) {
        if (bmi < 18.5) {
            return { category: 'Underweight', className: 'category-underweight' };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return { category: 'Normal weight', className: 'category-normal' };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return { category: 'Overweight', className: 'category-overweight' };
        } else {
            return { category: 'Obese', className: 'category-obese' };
        }
    }
});