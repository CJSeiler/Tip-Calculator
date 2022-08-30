const tipButtonsArray = Array.from(document.querySelectorAll(".calculator-tip-btn"))
const customTipBtn = document.getElementById("customTipBtn")
const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("people")
const inputValidity = document.getElementById("inputValidity")
const tipAmountText = document.getElementById("tipAmount")
const totalAmountText = document.getElementById("totalAmount")
const resetBtn = document.getElementById("resetBtn")

tipButtonsArray.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        selectTipPercentage(e)
        calculateTotal()
    })
})

function selectTipPercentage(e) {
    tipButtonsArray.forEach(button => {
        if(button.classList.contains("selected")) {
            button.classList.remove("selected")
        } else return
    })
    e.target.classList.add("selected")
    
}

billInput.addEventListener("keyup", (e) => {
    e.preventDefault()
    toFixedDecimalPlace(e.target.value, e.target, 2)
    calculateTotal()
})

customTipBtn.addEventListener("keyup", (e)=> {
    e.preventDefault()
    toFixedLength(e.target.value, e.target)
    calculateTotal()
})

peopleInput.addEventListener("keyup", (e)=> {
    e.preventDefault()
    let {value} = e.target
    toFixedDecimalPlace(value, e.target, 0)
    if(value < 1) inputValidity.classList.remove("hide")
    if(value > 0 || value === "") inputValidity.classList.add("hide") 
    if(e.key === "-") e.target.value = value.substring(0, value.length)
    calculateTotal()
})

resetBtn.addEventListener("click", resetCalculator)

// fixes number as type string to given decimal place e.g. 1, 2, 3, etc.
function toFixedDecimalPlace(value, target, decimalPlace) {
    if(!value.includes(".")) return value

    let decimalIndex = value.indexOf(".")
    let number = value.substring(0, decimalIndex)
    let decimalNumber = value.substring(decimalIndex, value.length)
    let fixedDecimalNumber = decimalNumber.substring(0, decimalPlace + 1)
    let fixedValue = number + fixedDecimalNumber
    target.value = fixedValue
}

function toFixedLength(value, target) {
    if(!value.length > 2) return
    target.value = value.substring(0,2)
}

function calculateTipPercentage() {
    const selectedTip = tipButtonsArray.find(button => button.classList.contains("selected"))
    let selectedTipNumber

    if(selectedTip === customTipBtn) {
        return selectedTipNumber = Number(selectedTip.value)
    } else {
        const percentIndex = selectedTip.textContent.indexOf("%")
        return selectedTipNumber = Number(selectedTip.textContent.substring(0, percentIndex))
    }

}

function calculateTipAmount() {
    const tipPercentage = calculateTipPercentage() / 100
    const numOfPeople = Number(peopleInput.value)
    const bill = Number(billInput.value)
    const tipAmount = tipPercentage * bill / numOfPeople

    tipAmountText.textContent = `$${tipAmount.toFixed(2)}`
    return Number(tipAmount.toFixed(2))
}

function calculateTotal() {
    const bill = Number(billInput.value)
    const numOfPeople = Number(peopleInput.value)
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