// Calculator 
const buttons = document.querySelectorAll("button"); // selects all button elements
const textBox = document.getElementById("textBox");

let openParenthesesCount = 0; // Track the number of unmatched opening parentheses

buttons.forEach(button => {
    const buttonText = button.innerText;

    if (buttonText !== "=" && buttonText !== "C" && buttonText !== "←") {
        button.addEventListener("click", event => {
            let valueToAdd = buttonText;

            // Replace symbols for calculation
            if (buttonText === "x") valueToAdd = "*";
            if (buttonText === "÷") valueToAdd = "/";

            // Handle parentheses
            if (buttonText === "()") {
                const lastChar = textBox.value.slice(-1);
                
                // Add "(" if starting or after operator, otherwise add ")"
                if (openParenthesesCount === 0 || /[\+\-\*\/\(]/.test(lastChar)) {
                    valueToAdd = "(";
                    openParenthesesCount++; // Track opening parenthesis
                } else if (openParenthesesCount > 0) {
                    valueToAdd = ")";
                    openParenthesesCount--; // Track closing parenthesis
                } else {
                    return; // Ignore if ")" has no matching "("
                }
            }

            // Handle percentage
            if (buttonText === "%") {
                valueToAdd = "/100";
            }

            textBox.value += valueToAdd;
        });
    }
});
document.getElementById("percentage").addEventListener("click", () => {
    
    textBox.value = eval(textBox.value);
})

// Clear button functionality
document.getElementById("clear").addEventListener("click", () => {
    textBox.value = "";
    openParenthesesCount = 0; // Reset parentheses count on clear
});

// Equals button functionality
document.getElementById("equals").addEventListener("click", () => {
    try {
        textBox.value = eval(textBox.value);
        openParenthesesCount = 0; // Reset parentheses count after evaluation
    } catch {
        textBox.value = "Error";
    }
});

// Backspace button functionality
document.getElementById("backspace").addEventListener("click", () => {
    const lastChar = textBox.value.slice(-1);
    if (lastChar === "(") openParenthesesCount--;
    else if (lastChar === ")") openParenthesesCount++;
    textBox.value = textBox.value.slice(0, -1);
});


