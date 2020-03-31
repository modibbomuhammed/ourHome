window.addEventListener('load', function(e){
	let serverState = currentState
	for(x = 1; x < state.length; x++){
		if(serverState == state[x].value){	
			state.value = state[x].value
			for(x = 1; x < state.length; x++){
				if(state.value === 'Abuja'){
					addAbuja()	
					locations.value = currentLocation
				} else {
					addLagos()
					locations.value = currentLocation
				}	
			}
		}
	}
})
