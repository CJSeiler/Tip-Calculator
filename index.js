const tip5Btn = document.getElementById("tip5Btn")
const tip10Btn = document.getElementById("tip10Btn")
const tip15Btn = document.getElementById("tip15Btn")
const tip20Btn = document.getElementById("tip20Btn")
const tip25Btn = document.getElementById("tip25Btn")
const customTipBtn = document.getElementById("tipCustomBtn")
const billInput = document.getElementById("bill")
const peopleInput = document.getElementById("people")

billInput.addEventListener("keydown", (e) => {
    toFixedDecimalPlace(e.target.value, e.target)
})

customTipBtn.addEventListener("keyup", (e)=> {
    toFixedLength(e.target.value, e.target)
})

peopleInput.addEventListener("keyup", (e)=> {
    if(e.target.value < 0) e.target.value = ""
})


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

