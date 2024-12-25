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
 * - suggestions: Suggested actions for the user (commented out for now)
 */
function getBMIData(bmi) {
	if (bmi < 18.5) {
		return {
			category: "Underweight",
			colorClass: "result-underweight",
			message: "You are below the healthy weight range.",
			suggestions: [
				// We can add actionable suggestions here for underweight users
			]
		};
	} else if (bmi < 25) {
		return {
			category: "Normal Weight",
			colorClass: "result-normal",
			message: "You are in a healthy weight range.",
			suggestions: [
				// We can add actionable suggestions here for users with normal weight
			]
		};
	} else if (bmi < 30) {
		return {
			category: "Overweight",
			colorClass: "result-overweight",
			message: "You are above the healthy weight range.",
			suggestions: [
				// We can add actionable suggestions here for overweight users
			]
		};
	} else {
		return {
			category: "Obese",
			colorClass: "result-obese",
			message: "Your weight poses increased health risks.",
			suggestions: [
				// We can add actionable suggestions here for obese users
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

	// Determine the position of the indicator on the scale (range: 15 to 35 BMI)
	const position = ((bmi - 15) / (35 - 15)) * 100;
	bmiIndicator.style.left = `${Math.min(Math.max(position, 0), 100)}%`;

	// Get data related to the BMI category
	const bmiData = getBMIData(bmi);

	// Update UI with calculated BMI, category, and message
	document.getElementById('bmiValue').textContent = `BMI: ${roundedBMI}`;
	document.getElementById('bmiCategory').textContent = bmiData.category;
	document.getElementById('bmiMessage').textContent = bmiData.message;

	// Populate the suggestions list
	const suggestionsList = document.getElementById('suggestions');
	suggestionsList.innerHTML = bmiData.suggestions
		.map(suggestion => `<li>• ${suggestion}</li>`)
		.join('');

	// Apply the appropriate styling class for the BMI category
	resultsCard.className = 'result-card p-4 text-center mb-4 show ' + bmiData.colorClass;
}

/**
 * Function to reset the inputs and UI to their default state.
 * - Resets weight and height to default values (70kg and 170cm).
 * - Clears the results card and re-centers the BMI indicator.
 */
function reset() {
	weightRange.value = 70;
	heightRange.value = 170;
	weightInput.value = 70;
	heightInput.value = 170;
	resultsCard.className = 'result-card p-4 text-center mb-4';
	bmiIndicator.style.left = '50%';
}

// Initialize the calculation on page load to display default results
calculate();
