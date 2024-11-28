window.addEventListener('hashchange', function(){
	if(window.location.hash === ''){
		document.getElementById('welcome-message').style.display = 'block'

	}
	else {
		document.getElementById('welcome-message').style.display = 'none'
	}
	
})

if (window.location.hash === '') {
	document.getElementById('welcome-message').style.display = 'block'
}
else{
	document.getElementById('welcome-message').style.display = 'none'
}

const darkModeToggle = document.getElementById('dark-mode-toggle')
const body = document.body;

if(localStorage.getItem('darkMode') === 'enabled'){
	body.classList.add('dark-mode')
	darkModeToggle.textContent = 'Light Mode'
}
else{
	darkModeToggle.textContent = 'Dark Mode'
}

darkModeToggle.addEventListener('click', () =>{
	body.classList.toggle('dark-mode')

	if(body.classList.contains('dark-mode')){
		darkModeToggle.textContent = 'Light Mode'
		localStorage.setItem('darkMode', 'enabled')
	}
	else{
		darkModeToggle.textContent = 'Dark Mode'
		localStorage.setItem('darkMode', 'disabled')

	}
})