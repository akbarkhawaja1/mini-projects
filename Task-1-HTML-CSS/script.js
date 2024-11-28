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
}

darkModeToggle.addEventListener('click', () =>{
	body.classList.toggle('dark-mode')

	if(body.classList.contains('dark-mode')){
		localStorage.setItem('darkMode', 'enabled')
	}
	else{
		localStorage.setItem('darkMode', 'disabled')

	}
})