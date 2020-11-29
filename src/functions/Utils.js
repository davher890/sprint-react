
const utils = {
	ageCalculator: function(birth){
	    var curr  = new Date();
	    var diff = curr.getTime() - birth;
	    return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)), 0)
	},

	getCategories: function(){
		return [
			// { id : "", name : ""},
			{ id : "SENIOR", name : "SENIOR"},
			{ id : "SUB23", name : "SUB23"},
			{ id : "SUB20", name : "SUB20"},
			{ id : "SUB18", name : "SUB18"},
			{ id : "SUB16", name : "SUB16"},
			{ id : "SUB14", name : "SUB14"},
			{ id : "SUB12", name : "SUB12"},
			{ id : "SUB10", name : "SUB10"},
			{ id : "SUB8", name : "SUB8"}
		]
	},

	getDorsalCategories: function(){
		return [
			// { id : "", name : ""},
			{ id : "SM", name : "SM" },
			{ id : "SF", name : "SF" },
			{ id : "U23M", name : "U23M" },
			{ id : "U20F", name : "U20F" },
			{ id : "U18F", name : "U18F" },
			{ id : "U20M", name : "U20M" },
			{ id : "U16M", name : "U16M" },
			{ id : "U23F", name : "U23F" },
			{ id : "U14M", name : "U14M" },
			{ id : "U10M", name : "U10M" },
			{ id : "U14F", name : "U14F" },
			{ id : "U10F", name : "U10F" },
			{ id : "U18M", name : "U18M" },
			{ id : "U12M", name : "U12M" }
		]
	},

	getPaymentTypes: function(){
		return [
			// { id : "", name : ""},
			{ id : "CASH", name : "Efectivo"},
			{ id : "TRANSFER", name : "Transferencia"},
			{ id : "DOM", name : "Domiciliación Bancaria"},
			{ id : "SUBV", name : "Subvencionado"},
		]
	},

	getFeeTypes: function(sportSchoolId){
		if (sportSchoolId === 1){

			// Santa Ana
			return [
	            // { id : '', name : ''},
	            { id : 'CLUB', name : 'Club'},
	            { id : 'PISTAS', name : 'Pistas'},
	            { id : 'LIC_PISTAS', name : 'Licencia/Pistas'},
	            { id : 'ENTRENADOR', name : 'Entrenadores'},
	        ]
	    }

	    else if (sportSchoolId === 2){

	        // Paracuellos
	        return [
	            // { id : '', name : ''},
	            { id : 'CLLUB', name : 'Club'}
	        ]
	    }

	    else if (sportSchoolId === 3){

	        // Externos
	        return [
	            // { id : '', name : ''},
	            { id : 'LICENCIA', name : 'Licencia'},
	            { id : 'SOCIO', name : 'Socio'},
	            { id : 'ENTRENADOR', name : 'Entrenadores'},
	        ]
	    }
	    else {
	    	return []
    	}
	},

	leftPadding: function(str, max,c) {
		str = str.toString();
		return str.length < max ? utils.leftPadding(c + str, max) : str;
	}
}

export default utils;