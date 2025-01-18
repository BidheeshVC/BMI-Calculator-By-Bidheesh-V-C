// Grabbing DOM elements for weight and height inputs and range sliders
const weightRange = document.getElementById('weightRange');
const heightRange = document.getElementById('heightRange');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const bmiIndicator = document.getElementById('bmiIndicator');
const resultsCard = document.getElementById('results');

// Sync the weight range slider with the weight input field and vice versa
weightRange.addEventListener('input', (e) => weightInput.value = e.target.value);
heightRange.addEventListener('input', (e) => heightInput.value = e.target.value);
weightInput.addEventListener('input', (e) => weightRange.value = e.target.value);
heightInput.addEventListener('input', (e) => heightRange.value = e.target.value);

/**
 * Function to get BMI data based on the calculated BMI value.
 * Returns an object containing:
 * - category: The BMI category
 * - colorClass: A CSS class for styling based on BMI category
 * - message: A description of the BMI category
 * - suggestions: Suggested actions for the user
 */
function getBMIData(bmi) {
	if (bmi < 18.5) {
		return {
			category: "Underweight",
			colorClass: "result-underweight",
			message: "You are below the healthy weight range.",
			suggestions: [
				"Increase your caloric intake with nutrient-rich foods",
				"Add healthy snacks between meals",
				"Try strength training to build muscle mass"
			]
		};
	} else if (bmi < 25) {
		return {
			category: "Normal Weight",
			colorClass: "result-normal",
			message: "You are in a healthy weight range. Keep it up! ",
			suggestions: [
				"Maintain your balanced diet and exercise routine",
				"Stay hydrated with 8 glasses of water daily",
				"Get 7-9 hours of quality sleep each night"
			]
		};
	} else if (bmi < 30) {
		return {
			category: "Overweight",
			colorClass: "result-overweight",
			message: "You are above the healthy weight range.",
			suggestions: [
				"Focus on portion control and mindful eating",
				"Include 30 minutes of cardio exercise daily",
				"Replace sugary drinks with water or green tea"
			]
		};
	} else {
		return {
			category: "Obese",
			colorClass: "result-obese",
			message: "Your weight poses increased health risks.",
			suggestions: [
				"Consult with a healthcare professional",
				"Start with low-impact exercises like walking or swimming",
				"Keep a food diary to track your intake"
			]
		};
	}
}

/**
 * Function to calculate BMI, update the UI, and display results.
 * - Grabs input values for weight and height.
 * - Validates the input values.
 * - Calculates BMI and determines the position of the indicator on the scale.
 * - Fetches BMI data and updates the UI with the corresponding category, message, and suggestions.
 */
function calculate() {
	const weight = parseFloat(weightInput.value);
	const height = parseFloat(heightInput.value) / 100;

	if (weight <= 0 || height <= 0) {
		alert("Please enter valid values");
		return;
	}

	// Calculate BMI using the formula: weight (kg) / height (m)^2
	const bmi = weight / (height * height);
	const roundedBMI = bmi.toFixed(1);

	// Animate the indicator with easing
	const position = ((bmi - 15) / (35 - 15)) * 100;
	bmiIndicator.style.left = `${Math.min(Math.max(position, 0), 100)}%`;

	// Get data related to the BMI category
	const bmiData = getBMIData(bmi);

	// Remove previous classes
	resultsCard.className = 'result-card p-4 text-center mb-4';

	// Force a reflow to restart animations
	void resultsCard.offsetWidth;

	// Add new classes with animation
	resultsCard.className = `result-card p-4 text-center mb-4 show ${bmiData.colorClass}`;

	// Update UI with calculated BMI, category, and message with staggered animations
	const bmiValueEl = document.getElementById('bmiValue');
	const bmiCategoryEl = document.getElementById('bmiCategory');
	const bmiMessageEl = document.getElementById('bmiMessage');

	bmiValueEl.style.opacity = '0';
	bmiCategoryEl.style.opacity = '0';
	bmiMessageEl.style.opacity = '0';

	setTimeout(() => {
		bmiValueEl.textContent = `BMI: ${roundedBMI}`;
		bmiValueEl.style.opacity = '1';
	}, 100);

	setTimeout(() => {
		bmiCategoryEl.textContent = bmiData.category;
		bmiCategoryEl.style.opacity = '1';
	}, 200);

	setTimeout(() => {
		bmiMessageEl.textContent = bmiData.message;
		bmiMessageEl.style.opacity = '1';
	}, 300);

	// Populate the suggestions list with staggered animation
	const suggestionsList = document.getElementById('suggestions');
	suggestionsList.innerHTML = bmiData.suggestions
		.map(suggestion => `<li>• ${suggestion}</li>`)
		.join('');
}

/**
 * Function to reset the inputs and UI to their default state.
 * - Resets weight and height to default values (70kg and 170cm).
 * - Resets the indicator with animation.
 * - Fades out content and suggestions, then calculates new values.
 */
function reset() {
	// Reset input values
	weightRange.value = 70;
	heightRange.value = 170;
	weightInput.value = 70;
	heightInput.value = 170;

	// Reset the indicator with animation
	bmiIndicator.style.left = '50%';

	// Keep the content but animate it away
	const bmiValueEl = document.getElementById('bmiValue');
	const bmiCategoryEl = document.getElementById('bmiCategory');
	const bmiMessageEl = document.getElementById('bmiMessage');
	const suggestionsList = document.getElementById('suggestions');

	// Fade out content
	[bmiValueEl, bmiCategoryEl, bmiMessageEl].forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(-10px)';
		el.style.transition = 'all 0.3s ease';
	});

	// Fade out suggestions
	Array.from(suggestionsList.children).forEach((li, index) => {
		li.style.opacity = '0';
		li.style.transform = 'translateX(-20px)';
		li.style.transition = 'all 0.3s ease';
	});

	// After content fades out, calculate new values
	setTimeout(() => {
		calculate(); // This will update with default values and show new animations
	}, 300);
}

// Add smooth animations to range inputs
weightRange.addEventListener('input', (e) => {
	weightInput.value = e.target.value;
	if (document.activeElement !== weightRange) {
		calculate();
	}
});

heightRange.addEventListener('input', (e) => {
	heightInput.value = e.target.value;
	if (document.activeElement !== heightRange) {
		calculate();
	}
});

weightInput.addEventListener('input', (e) => {
	weightRange.value = e.target.value;
	if (document.activeElement !== weightInput) {
		calculate();
	}
});

heightInput.addEventListener('input', (e) => {
	heightRange.value = e.target.value;
	if (document.activeElement !== heightInput) {
		calculate();
	}
});

// Initialize the calculation on page load to display default results
calculate();
