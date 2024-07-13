async function getData() {
    const response = await fetch("./data.json");
    const data = response.json();
    return data;
}

function displayCards(data, period){     
    const dashboard = document.querySelector("#dashboard");
    dashboard.innerHTML = "";
    for(let item of data) {
        const card =
        ` 
        <div class="cards">
            <div class="template" style="background-color: ${item.icon.backgroundColor}">
                <img src="${item.icon.path}" alt="Icon">
            </div>  
            <div id="content">
                <div class="title">
                    <h1>${item.title}</h1>
                    <p>...</p>
                </div>
                <div class="time">
                    <h1>${item.timeframes[period].current}hrs</h1>
                    <p>Last Week - ${item.timeframes[period].previous}hrs</p>
                </div>   
            </div>       
        </div>
        `;
        dashboard.innerHTML += card;
    }
}



// feats
const menu = document.querySelector(".menu"); 
function updatePeriod (e) {
    // data manipulation
    const periods = ["daily", "weekly","monthly"];
    const period = periods.find(period => e.target.textContent.toLowerCase() === period);    

    if(period === undefined) return; 

    // css manipulation
    const items = document.querySelectorAll(".menu li"); 
    const actived = [...items].find(li => li.classList.contains('active'));
    
    // verification to don't make another request
    if(period === actived.textContent.toLocaleLowerCase()) return;

    const item = document.querySelector(`.menu li:nth-child(${periods.indexOf(period) + 1})`);
    actived.classList.toggle("active");
    item.classList.toggle("active");
    
    // success
    load(period);
}
menu.addEventListener("click", updatePeriod);

async function load(period="weekly") {
    const data = await getData();
    const defaultActiveMenu = document.querySelector(".menu li:nth-child(2)");
    defaultActiveMenu.classList.toggle("active", period == "weekly");   
    displayCards(data, period);
}

load();