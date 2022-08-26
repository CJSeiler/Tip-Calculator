const tip5Btn = document.getElementById("tip5Btn")
const tip10Btn = document.getElementById("tip10Btn")
const tip15Btn = document.getElementById("tip15Btn")
const tip20Btn = document.getElementById("tip20Btn")
const tip25Btn = document.getElementById("tip25Btn")
const customTipBtn = document.getElementById("tipCustomBtn")
const billInput = document.getElementById("bill")

billInput.addEventListener("keyup", () => {
   let value = billInput.value
   if(value.indexOf(".") === -1) return
    value = toFixedDecimalPlace(value)
    billInput.value = value
})


// fixes number as type string to 2 decimal places
function toFixedDecimalPlace(value) { 
    return parseFloat(value).toFixed(2)
}

