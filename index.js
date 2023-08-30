let myLeads = []
const inputEl = document.getElementById("input-el")
const inpuutBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads", myLeads ))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads);
}

function render(leads) {
    let ListItems = ""
    for (let i = 0; i < leads.length; i++) {
        ListItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `

    }
    ulEl.innerHTML = ListItems
}

inpuutBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deletBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})



