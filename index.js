const tipButtonsArray = Array.from(document.querySelectorAll(".calculator-tip-btn"))
const customTipBtn = document.getElementById("customTipBtn")
const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("people")
const inputValidity = document.getElementById("inputValidity")
const tipAmountText = document.getElementById("tipAmount")
const totalAmountText = document.getElementById("totalAmount")
const resetBtn = document.getElementById("resetBtn")
const calculatorForm = document.getElementById("calculator")

let selectedTip = tipButtonsArray.find(button => button.classList.contains("selected"))

calculator.addEventListener("keyup", calculateTotal)
calculator.addEventListener("click", calculateTotal)

tipButtonsArray.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        selectTipPercentage(e)
    })
})

billInput.addEventListener("keyup", (e) => {
    toFixedLength(e.target.value, e.target, 8)
    toFixedDecimalPlace(e.target.value, e.target, 2)
})

customTipBtn.addEventListener("keyup", (e)=> {
    toFixedLength(e.target.value, e.target, 2)
})

peopleInput.addEventListener("keyup", (e)=> {
    let {value} = e.target
    toFixedDecimalPlace(value, e.target, 0) // prevents user from entering decimal number

    if(value < 1) inputValidity.classList.remove("hide")
    if(value > 0 || value === "") inputValidity.classList.add("hide") 
    if(e.key === "-") e.target.value = "" // resets input if "-" is pressed
})

resetBtn.addEventListener("click", resetCalculator)

// fixes number as type string to given decimal place e.g. 1, 2, 3, etc.
function toFixedDecimalPlace(value, target, decimalPlace) {
    if(!value.includes(".")) return value
    
    const decimalIndex = value.indexOf(".")
    const number = value.substring(0, decimalIndex)
    const decimalNumber = value.substring(decimalIndex, value.length)
    const fixedDecimalNumber = decimalNumber.substring(0, decimalPlace + 1)
    const fixedValue = number + fixedDecimalNumber
    target.value = fixedValue
}

// fixes input value to given length
function toFixedLength(value, target, length) {
    if(value.length > length) {
        target.value = value.substring(0,length)
    }
}

function selectTipPercentage(e) {
    tipButtonsArray.forEach(button => {
        if(button.classList.contains("selected")) {
            button.classList.remove("selected")
        } else return
    })
    
    selectedTip = e.target
    e.target.classList.add("selected")
    
}

function calculateTipPercentage() {
    // if selecting custom tip, use input value. if using tip button, use text content
    if(selectedTip === customTipBtn) {
        return Number(selectedTip.value) / 100
    } else {
        const percentIndex = selectedTip.textContent.indexOf("%")
        return Number(selectedTip.textContent.substring(0, percentIndex)) / 100
    }

}

function calculateTipAmount() {
    const tipPercentage = calculateTipPercentage()
    const numOfPeople = Number(peopleInput.value)
    const bill = Number(billInput.value)
    const tipAmount = tipPercentage * bill / numOfPeople

    tipAmountText.textContent = `$${tipAmount.toFixed(2)}`
    return Number(tipAmount.toFixed(2))
}

function calculateTotal() {
    const bill = Number(billInput.value)
    const numOfPeople = Number(peopleInput.value)
    // doesn't allow less than 1 in peopleInput
    if(numOfPeople < 1) {
        tipAmountText.textContent = "$0.00"
        totalAmountText.textContent = "$0.00"
        return
    }
    const tipAmount = calculateTipAmount()
    const billTotal = (bill + tipAmount) / numOfPeople

    totalAmountText.textContent = `$${billTotal.toFixed(2)}`
}

function resetCalculator() {
    tipAmountText.textContent = "$0.00"
    totalAmountText.textContent = "$0.00"
    billInput.value=""
    peopleInput.value="0"

    tipButtonsArray.forEach(button => {
        button.classList.remove("selected")
    })

    billInput.focus()
}

// function resetInput() {
//     if(e.key === "-") e.target.value = value.substring(0, value.length)
// }