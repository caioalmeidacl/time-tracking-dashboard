async function getData () {
    const response = await fetch("./data.json"); 
    const data = await response.json();
    return data;
}


// criar card para cada item no dashboard
function displayCards(data){     
    const dashboard = document.querySelector("#dashboard");

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
                    <h1>${item.timeframes.weekly.current}hrs</h1>
                    <p>Last Week - ${item.timeframes.weekly.previous}hrs</p>
                </div>   
            </div>       
        </div>
        `;
        dashboard.innerHTML += card;
    }
}

async function execute() {
    const data = await getData();    
    displayCards(data);
}
execute();