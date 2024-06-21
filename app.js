// js object for h1
const header = document.querySelector('h1')

// js object for the container which holds the  "meat" - the calculator
const app = document.getElementById('app')

// js object for the dynamic menu
const ddMenu = document.querySelector('#ddMenu')

// js object for the hamburger menu icon
const sandwitch = document.querySelectorAll('svg')

// js object for the whole html
const html = document.documentElement

///// Define the menu container /////
const menuContainer = document.querySelector('.menu-container')

// function to add class to transform to dark mode
const toggle = () => html.classList.toggle('dark')

// function to render the page choosen by the user
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}

// function to open the menu when small screen
const toggleMenu = (hide) => {
    // Added this here since for some reason it didnt work above....
    const ddMenu = document.getElementById('ddMenu');
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

// function to add row to the grid inside the calculator
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}

// Add monitor dynamiclly
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}

// returns a div with a button for the calculator
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}

// function to add row of buttons to the html
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}

// function to update the monitor on click on the calculator
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}

// function to add the calculator to the page
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}

// function to add about page
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}

// function to add contact page
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}

//my fucntion to add menu - responsive
const renderMenu = () => {
    // Mobile menu toggle button
    // Create new button js object
    const toggleButton = document.createElement('button')
    // add classes to the button
    toggleButton.className = 'block sm:hidden'
    // add callback function to the button
    toggleButton.onclick = () => toggleMenu(false);
    // add inndeHtml to the button
    toggleButton.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em" viewBox="0 0 448 512"
        >

            <path
                 fill="#ffffff"
                 d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
        </svg>
        <svg
            class="hidden"
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 384 512"
        >
            <path
                 fill="#ffffff"
                 d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
        </svg>
    `
    // Add button to the menu container
    menuContainer.appendChild(toggleButton)
    /////////////////////////////////////

    // Mobile dropdown menu
    const mobileMenu = document.createElement('div')
    mobileMenu.className = 'absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full'
    mobileMenu.id = 'ddMenu'
    mobileMenu.innerHTML = `
        <button class="block py-1 px-2" onclick="setView('Calculator')">Calculator</button>
        <button class="block py-1 px-2" onclick="setView('About')">About</button>
        <button class="block py-1 px-2" onclick="setView('Contact')">Contact</button>
    `
    menuContainer.appendChild(mobileMenu)

    // Desktop menu
    const desktopMenu = document.createElement('div')
    desktopMenu.className = 'justify-start gap-4 hidden sm:flex'
    desktopMenu.innerHTML = `
        <button onclick="setView('Calculator')">Calculator</button>
        <button onclick="setView('About')">About</button>
        <button onclick="setView('Contact')">Contact</button>
    `
    menuContainer.appendChild(desktopMenu)

    
}

// function to call switch between themes
const renderThemeToggle = () => {
    // Dark/Light mode toggle button
    const themeToggleButton = document.createElement('div')
    themeToggleButton.innerHTML = `
        <button class="dark:hidden block" onclick="toggle()">Dark</button>
        <button class="hidden dark:block" onclick="toggle()">Light</button>
    `
    menuContainer.appendChild(themeToggleButton)
}

renderMenu()
renderThemeToggle()
renderCalculator()
