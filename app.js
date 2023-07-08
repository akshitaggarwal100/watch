const hrEl = document.querySelector(".hr")
const minEl = document.querySelector(".min")
const secEl = document.querySelector(".sec")
const clock = document.querySelector(".clock")
const clockBtn = document.querySelector(".clockBtn")
const timerBtn = document.querySelector(".timerBtn")
const timerForm = document.querySelector(".hide")

let clockID
let timerID
let timerTimeoutID

function displayClock() {
    clearInterval(timerID)
    clearTimeout(timerTimeoutID)

    clockID = setInterval(() => {
        const d = new Date()
        const hour = d.getHours()
        const min = d.getMinutes()
        const sec = d.getSeconds()

        hrEl.innerText = hour
        minEl.innerText = min
        secEl.innerText = sec
    }, 1000)
}

displayClock()

clockBtn.addEventListener("click", () => {
    start.disabled = false
    timerForm.className = "hide"
    clearInterval(timerID)
    clearInterval(clockID)
    clearTimeout(timerTimeoutID)

    displayClock()
})

timerBtn.addEventListener("click", () => {
    timerForm.className = "timerForm"
})

const start = timerForm.start

timerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    start.disabled = true
    clearInterval(clockID)

    let timerHr = timerForm.hrInput.value || 0
    let timerMin = timerForm.minInput.value || 0
    let timerSec = timerForm.secInput.value || 0

    const total = (timerHr * 3600 + timerMin * 60 + timerSec) * 1000

    timerID = setInterval(() => {

        timerSec = timerSec === 0 ? 59 : --timerSec

        timerMin =
            timerSec === 59
                ?
                timerMin === 0
                    ?
                    59
                    :
                    --timerMin
                :
                timerMin

        timerHr =
            timerMin === 59 && timerSec === 59
                ?
                --timerHr
                :
                timerHr

        hrEl.innerText = timerHr
        minEl.innerText = timerMin
        secEl.innerText = timerSec
    }, 1000)

    timerTimeoutID = setTimeout(() => {
        clearInterval(timerID)

        hrEl.innerText = 0
        minEl.innerText = 0
        secEl.innerText = 0

        start.disabled = false

        const timeUpPopup = document.createElement("div")
        timeUpPopup.className = "timeUp"
        timeUpPopup.innerText = "Time is Over"
        document.body.appendChild(timeUpPopup)

        setTimeout(() => {
            timeUpPopup.remove()
        }, 2000)

    }, total)
})

const stop = timerForm.stop

stop.addEventListener("click", () => {
    clearInterval(timerID)
    clearTimeout(timerTimeoutID)
    start.disabled = false
})