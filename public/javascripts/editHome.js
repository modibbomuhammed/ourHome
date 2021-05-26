var select = document.getElementById("state");
var locations = document.getElementById("location")
var submitbtn = document.querySelector('#submit-btn')
var imageUpload = document.getElementById('imageUpload')

var lagosOptions = ['Alimosho', 'Ajah','Ajeromi-Ifelodun', 'Kosofe', 'Mushin', 'Oshodi-Isolo', 'Ojo', 'Ikorodu', 'Surulere', 'Agege', 'Ifako-Ijaiye', 'Somolu', 'Amuwo-Odofin', 'Lagos Mainland', 'Ikeja', 'Lagos Island', 'Eti-Osa', 'Badagry', 'Apapa', 'Epe', 'Ibeju-Lekki'] 

var abujaOptions = ['Abaji', 'Apo', 'Asokoro', 'Bwari', 'Central Area', 'Cultural Zones', 'Dakibiyu', 'Dakwo', 'Dape', 'Dei-Dei', 'Diplomatic Zones', 'Duboyi', 'Durumi', 'Dutse', 'Gaduwa', 'Galadimawa', 'Garki', 'Gudu', 'Guzape District', 'Gwarinpa','Idu Industrial', 'Gwagwalada', 'Ija', 'Institution and Research', 'Jabi', 'Jahi', 'Jukwoyi', 'Kaba', 'Kubasa', 'Kado', 'Kafe', 'Kagini', 'Karmo', 'Karsana', 'Karshi', 'Karu', 'Katampe', 'Kaura', 'Kpeyegyi', 'Kubwa', 'Kuje', 'Kukwuaba', 'Kurudu', 'Kwali', 'Kyami', 'Lokogoma District', 'Lugbe District', 'Mabuchi', 'Maitama District', 'Mbora', 'Mpape', 'Nyanya', 'Okanje', 'Orozo', 'Utako', 'Wumba', 'Wuse', 'Wuse 2', 'Wuye']


select.addEventListener('change', function(e){
	if(select.value === 'Lagos'){
		removeElements()
		addLagos()
	} else if (select.value === 'Abuja'){
		removeElements()
		addAbuja()   
	} else {
		removeElements()
		var el = document.createElement("option");
		el.textContent = 'location';
		el.value = '0';
		locations.appendChild(el);
	}
})

// window.addEventListener('load', function(e){
// 	let serverState = currentState
// 	for(x = 1; x < state.length; x++){
// 		if(serverState == state[x].value){	
// 			state.value = state[x].value
// 			for(x = 1; x < state.length; x++){
// 				if(state.value === 'Abuja'){
// 					addAbuja()	
// 					locations.value = currentLocation
// 				} else {
// 					addLagos()
// 					locations.value = currentLocation
// 				}	
// 			}
// 		}
// 	}
// })
	

submitbtn.addEventListener('click', (e) => {
	var deletePics =  document.querySelectorAll('input:checked').length
	var currentPics = document.getElementsByClassName('deleteCheckbox').length
	var picturesUpload = imageUpload.files.length || 0
	var total = picturesUpload + currentPics - deletePics
	if(total > 10){
		alert(`You can't have more than 10 pictures. Please remove ${total - 10} photo${total - 10 === 1 ? '': 's'}`)
		e.preventDefault()
	}
})



function removeElements(){
	while (locations.firstElementChild) {
		locations.removeChild(locations.firstElementChild)
	}
}


function addLagos(){
	for(var i = 0; i < lagosOptions.length; i++) {
		var opt = lagosOptions[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		// locations.removeChild('option')
		let element = document.getElementById("top");
		locations.appendChild(el);
	}
}


function addAbuja(){
	for(var i = 0; i < abujaOptions.length; i++) {
		var opt = abujaOptions[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		locations.appendChild(el);
	}
}