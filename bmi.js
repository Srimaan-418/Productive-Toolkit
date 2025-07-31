window.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("bmiResult");

  calculateBtn.addEventListener("click", () => {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      result.textContent = "Please enter valid height and weight.";
      result.style.color = "#ff6b6b"; // error red
      return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(2);

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
      result.style.color = "#ffc107"; // amber
    } else if (bmi < 25) {
      category = "Normal weight";
      result.style.color = "#4caf50"; // green
    } else if (bmi < 30) {
      category = "Overweight";
      result.style.color = "#ff9800"; // orange
    } else {
      category = "Obese";
      result.style.color = "#f44336"; // red
    }

    result.textContent = `Your BMI is ${bmiRounded} (${category}).`;
  });
});
