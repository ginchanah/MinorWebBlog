// if tab is selected, set aria selected of corresponding tab thingy to aria-selected="true"

const leerdoelTabs = document.querySelectorAll("#leerdoelen [role='tab']")
const leerdoelPanels = document.querySelectorAll('#leerdoelen [role="tabpanel"]')

leerdoelPanels.forEach(panel => {
    panel.hidden = true       
})

let selectedTab = document.querySelector('[role="tab"][aria-selected="true"]') 

if (!selectedTab) {
    selectedTab = leerdoelTabs[0]
    if (selectedTab) {
        selectedTab.setAttribute('aria-selected', 'true')
    }
} 

if (selectedTab) {
    const panelId = selectedTab.getAttribute('aria-controls')
    const selectedPanel = document.getElementById(panelId)
    if (selectedPanel) {
        selectedPanel.hidden = false
    }
}

leerdoelTabs.forEach(tab => {
    const panelId = tab.getAttribute('aria-controls')

    // which panel is controlled by the tab
    const targetPanel = document.getElementById(panelId)

    

    tab.addEventListener("click", () => {
        

        // clear all leerdoelTabs + leerdoelPanels
        leerdoelTabs.forEach(t => t.setAttribute("aria-selected", "false"))

        leerdoelPanels.forEach(panel => {
            panel.hidden = true       
        })
    
        

        if (targetPanel) {
            targetPanel.hidden = false   
            tab.setAttribute("aria-selected", "true")
        }

    })

})


// menu button display none nav
console.log("hello")
const menuButton = document.getElementById("menu-button")
console.log(menuButton)
const navigation = document.getElementById("navigation")
console.log(navigation)

menuButton.addEventListener("click", () => {
    console.log("toggled")
    navigation.classList.toggle("hidden")
})
