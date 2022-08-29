const tipButtons = document.querySelectorAll("#tipBtn")
const customTipBtn = document.getElementById("tipCustomBtn")
const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("people")
const tipAmount = document.getElementById("tipAmount")
const totalAmount = document.getElementById("totalAmount")

tipButtons.forEach(button => {
    button.addEventListener("click", (e) => selectTipPercentage(e))
})

function selectTipPercentage(e) {
    console.log("clicked")
    tipButtons.forEach(button => {
        if(button.classList.contains("selected")) {
            button.classList.remove("selected")
        } else return
    })
    e.target.classList.add("selected")
}

billInput.addEventListener("keydown", (e) => {
    toFixedDecimalPlace(e.target.value, e.target)
})

// customTipBtn.addEventListener("keyup", (e)=> {
//     toFixedLength(e.target.value, e.target)
// })

peopleInput.addEventListener("keyup", (e)=> {
    if(e.target.value < 0) e.target.value = ""
})

tipButtons[2].addEventListener("click", calculateTotal)


// fixes number as type string to 2 decimal places
function toFixedDecimalPlace(value, target) {
    if(!value.includes(".")) return value

    let decimal = value.indexOf(".")
    let number = value.substring(0, decimal)
    let decimalNumber = value.substring(decimal, value.length)
    let fixedDecimalNumber = decimalNumber.substring(0, 2)
    let fixedValue = number + fixedDecimalNumber
    target.value = fixedValue
}

function toFixedLength(value, target) {
    if(!value.length > 3) return
    
    target.value = value.slice(0, 3)
}

function calculateTipAmount() {
    const selectedTip = tipButtons.find(button => button.classList.contains("selected")).textContent
    const tipPercentage = selectedTip / 100
    const numOfPeople = 4
    const bill = billInput.value
    const tipAmount = tipPercentage * bill / numOfPeople

    return Number(tipAmount.toFixed(2))
}

function calculateTotal() {
    const bill = billInput.value
    const numOfPeople = 4
    const tipAmount = calculateTipAmount()
    const billTotal = Number(bill / numOfPeople)

    console.log( billTotal + tipAmount)
}