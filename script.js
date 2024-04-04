document.getElementById('date_range').valueAsDate = new Date();

const incomeBarContainer = document.querySelector(".income_bars");
// create income bars
function createBars(nums) {
    for (let i = 0; i <= nums; i++) {
        const barsNew = document.createElement("div")
        barsNew.className = "bar_inc";
        barsNew.style.height = `${Math.round(Math.random() * 90)}%`;
        incomeBarContainer.appendChild(barsNew);
    }
}

createBars(30);


// create expenses bar
const expenseBarContainer = document.querySelector(".expenses_bars");
function createExpbar(nums) {
    for (let i = 0; i <= nums; i++) {
        const expBar = document.createElement("div");
        expBar.className = "bar_exp";
        expBar.style.height = `${Math.round(Math.random() * 90)}%`;
        expenseBarContainer.appendChild(expBar);
    }
}

createExpbar(30);


// Number formater
const formatCurrency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
})
const balanceEl = document.querySelectorAll(".balance");

balanceEl.forEach(balance => {
    balance.textContent = formatCurrency.format(balance.textContent);
})
const lastAmEl = document.querySelectorAll(".last_am");
const accAmEl = document.querySelectorAll(".acc_amount");

lastAmEl.forEach(numEl => {
    numEl.textContent = formatCurrency.format(numEl.textContent);
})
accAmEl.forEach(numEl => {
    numEl.textContent = formatCurrency.format(numEl.textContent);
})
// card balance format
const visaBalEl = document.querySelector(".visa_balance");
visaBalEl.textContent = formatCurrency.format(visaBalEl.textContent.replace(/\D/g, ""))

// add line to 1 and 7th bar and give bars random height
const bars = document.querySelectorAll(".bar_inc");
bars.forEach((inc_bar, index) => {
    if (index === 0 || index % 6 === 0) {
        // console.log(inc_bar)
        inc_bar.classList.add("inc22");
    }
})

// fill all figure with currency
const accAmount = document.querySelectorAll(".acc_amount");
accAmount.forEach(amount => {
    const last = amount.parentElement.nextElementSibling.querySelector("span").textContent;

    const perFugure = amount.nextElementSibling.firstChild;
    // percentage calculator
    const perChanV = Math.abs(amount.textContent.replace(/\D/g, "") - last.replace(/\D/g, "")).toFixed(2);
    const percA = (perChanV * 100) / last.replace(/\D/g, "");
    perFugure.textContent = percA.toFixed(2)
    // end percetage calculator


    const changeColor = amount.nextElementSibling.querySelector("span");


    if (amount.textContent > last) {
        changeColor.textContent = "north_east"
        changeColor.parentElement.style.color = "#00d473";
    } else {
        changeColor.parentElement.style.color = "orangered";
    }

    const currValue = amount.textContent;
    amount.textContent = currValue;
})


// close menu
const fullMenuBtn = document.querySelector(".fullscreen");
const nav = document.querySelector("nav");
const navBtn = document.querySelector(".menu_btn");
navBtn.addEventListener("click", (e) => {
    // nav.style.transform = "translateX(-100%)";
    nav.style.display = "none";
    fullMenuBtn.style.display = "block"
})

fullMenuBtn.addEventListener("click", (e) => {
    nav.style.display = "flex";
    fullMenuBtn.style.display = "none"
})


// random user

async function getUser() {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];
    const { first, last } = user.name;
    const picture = user.picture.large
    const email = user.email

    const nameEl = document.querySelector(".bio_name");
    const picEl = document.querySelector(".bio_img");
    const emailEl = document.querySelector(".email_addr");

    nameEl.textContent = `${first} ${last}`;
    picEl.src = picture;
    emailEl.href = `mailto:${email}`;
    emailEl.textContent = email;
}

getUser();