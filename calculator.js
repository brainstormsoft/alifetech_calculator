const Calculator = document.querySelectorAll(".calculator");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const functionalities = document.querySelectorAll(".functionality");
const equalTo = document.querySelectorAll(".calculate");
const Theme = document.querySelector(".theme");
const dotMenu = document.querySelector(".dotMenu");
const dotMenuChildren = document.querySelector(".dotMenu").children;
const Keyboard = document.querySelectorAll(".keyboard");
const themeModeDropdown = document.querySelectorAll(".dot-dd");
const calculator = document.getElementById('system');
const displayWorking = document.getElementById('show-working');
const displayAnswer = document.getElementById('show-answer');
const calculatorKeys = document.getElementById('calculator-keys').children;

// clickEffect() takes care of the click effect...
function clickEffect(keys, effectColor, restColor) {

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];

    key.addEventListener("click", function () {
      key.style.backgroundColor = effectColor;
      key.style.transition = "2s";

      setTimeout(function () {
        key.style.backgroundColor = restColor;
        key.style.transition = "2s";
      }, 300)
    })
  }

}

// reusing the function for four different instances...
clickEffect(numbers, "grey", "transparent");
clickEffect(functionalities, "grey", "transparent");
clickEffect(equalTo, "white", "rgb(255,30,0)");
clickEffect(operators, "grey", "rgb(221,221,221)");
//click effect module stops here...

let themeMode = false;
function reuseTheme(nodes, bgColor, textColor) {
  for (i = 0; i < nodes.length; i++) {
    let node = nodes[i];

    node.style.backgroundColor = bgColor;
    node.style.color = textColor;
    node.style.transition = "2s";
  }
}

Theme.addEventListener("click", function () {
  dropDownEffect(themeModeDropdown, "none");

  if (themeMode == false) {
    reuseTheme(Calculator, "rgb(38, 46, 41)", "white");
    reuseTheme(Keyboard, "#121212", "white");
    reuseTheme(numbers, "transparent", "white");
    reuseTheme(functionalities, "transparent", "white");
    reuseTheme(dotMenuChildren, "transparent", "white");

    Theme.innerHTML = "Light mode";

    return themeMode = true;
  } else {
    reuseTheme(Calculator, "#fff", "#121212");
    reuseTheme(Keyboard, "rgb(236, 240, 236)", "#121212");
    reuseTheme(numbers, "transparent", "#121212");
    reuseTheme(functionalities, "transparent", "#121212");
    reuseTheme(dotMenu, "transparent", "#121212");
    reuseTheme(dotMenuChildren, "transparent", "#121212");

    Theme.innerHTML = "Dark mode";

    return themeMode = false;
  }
})


function dropDownEffect(nodes, state) {
  nodes.forEach((val, i, arr) => {
    let node = nodes[i];

    node.style.display = state;
  });
}

let dropdownStateMode = false;

dotMenu.addEventListener("click", function () {

  if (dropdownStateMode == false) {
    dropDownEffect(themeModeDropdown, "flex")

    return dropdownStateMode = true;
  } else {
    dropDownEffect(themeModeDropdown, "none")

    return dropdownStateMode = false;
  }
})

function paddingScreen(node, defaultNUm, constantValue, charLimit) {
  let nodeChar = node.textContent;
  let nodeLength = nodeChar.length;

  let paddingValues = [];

  for (let i = defaultNUm; i > 0; i -= constantValue) {
    paddingValues.push(i);
  }

  if (nodeLength < charLimit) {
    node.style.paddingLeft = `${paddingValues[nodeLength - 1]}%`;
  } else {
    node.innerHTML = "Character limit Error";
    node.style.paddingLeft = "50%";
  }
}
//validating padding on the display screens...
//paddingScreen(displayWorking, 89, 5, 19);
//paddingScreen(displayAnswer, 90, 3.5, 25);
/*these functions above make the characters displayed on the screen pad properly */

//this is the end of the features unit...

//I'm no longer creating a separate file, I'll start working fro here.
// light: okay  bro...
for (let i = 0; i < calculatorKeys.length; i++) {
  let keys = calculatorKeys[i];
  keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      let key = e.target;
      let action = key.dataset.action;
      let keyContent = key.textContent;
      let displayedNum = displayWorking.textContent;
      let showWorking = displayWorking.innerHTML


      // I'm trying to check if the event will work
      // We will probably delete it later if it makes our work wordy.
      if (!action) {
        console.log('Number key!');
      }
      if (
        action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('Operator key!')
      }
      if (action === 'decimal') {
        console.log('Decimal key!')
      }
      if (action === 'clear') {
        console.log('Clear key!')
      }
      if (action === 'equal') {
        console.log('Equal key!')
      }
      if (action === 'delete') {
        console.log('Delete Key!')
      }
      if (action === 'percent') {
        console.log('Percentage Key!')
      }

      // I want to add a custom attribute here don't know if it'll suitable sha.
      // If it's not I'll remove it and think of something else.

      if (
        action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        key.classList.add('is-pressed')
        calculator.dataset.previousKeyType = 'operator'
      }
      if (action === 'percent') {
        key.classList.add('is-pressed')
        calculator.dataset.previousKeyType = 'percent'
      }

      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-pressed'))

      let previousKeyType = calculator.dataset.previousKeyType

      if (!action) {
        if (displayedNum === '0'
        ) {
          displayWorking.textContent = keyContent
        } else {
          displayWorking.textContent = displayedNum + keyContent
        }
      }

      if (
        action === 'plus' ||
        action === 'minus' ||
        action === 'multiply' ||
        action === 'divide' ||
        action === 'percent'
      ) {
        calculator.dataset.firstValue = displayedNum
        calculator.dataset.operator = action
        displayWorking.textContent = displayedNum + keyContent
      }

      if (action === 'equal') {
        let firstValue = calculator.dataset.firstValue
        let operator = calculator.dataset.operator
        let secondValue = displayedNum

        if (previousKeyType !== 'operator') {
          keys.removeEventListener()
        }
        displayAnswer.textContent = calculate(firstValue, operator, secondValue)

      }

      if (action === 'clear') {
        calculator.dataset.firstValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.secondValue = '';
        calculator.dataset.previousKeyType = '';
        displayWorking.textContent = 0;
        displayAnswer.textContent = 0;
        calculator.dataset.previousKeyType = 'clear'
      }
    }
  })
}



//Ermmm I'm going to write the calculate function here so that it'll be easier for you guys to find.
// Also this function is only for simple calculations 


const calculate = (firstNumber, operator, secondNumber) => {
  let result = ''

  if (operator === 'plus') {
    result = parseFloat(firstNumber) + parseFloat(secondNumber);
  } else if (operator === 'minus') {
    result = parseFloat(firstNumber) - parseFloat(secondNumber);
  } else if (operator === 'multiply') {
    result = parseFloat(firstNumber) * parseFloat(secondNumber);
  } else if (operator === 'divide') {
    result = parseFloat(firstNumber) / parseFloat(secondNumber);
  }
  return result;
}