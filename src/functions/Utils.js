
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const utils = {

	getMonth: function (month) {
		return monthNames[month]
	},

	ageCalculator: function (birthDate) {
		var curr = new Date();
		var diff = curr.getTime() - birthDate;
		return Math.max(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)), 0)
	},

	calculateCategory: function (year) {
		const currentYear = new Date().getFullYear()
		let category = "MASTER"
		switch (currentYear - year) {
			case 6:
			case 7:
				category = "SUB8"
				break;
			case 8:
			case 9:
				category = "SUB10"
				break;
			case 10:
			case 11:
				category = "SUB12"
				break;
			case 12:
			case 13:
				category = "SUB14"
				break;
			case 14:
			case 15:
				category = "SUB16"
				break;
			case 16:
			case 17:
				category = "SUB18"
				break;
			case 18:
			case 19:
				category = "SUB20"
				break;
			case 20:
			case 21:
			case 22:
				category = "SUB23"
				break;
			default:
				if (currentYear - year < 6) {
					category = "SUB8"
				}
				if (currentYear - year <= 35) {
					category = "SENIOR"
				}
				else {
					category = "MASTER"
				}
				break;
		}
		return category
	},

	getCategories: function () {
		return [
			{ id: "", name: "" },
			{ id: "MASTER", name: "MASTER" },
			{ id: "SENIOR", name: "SENIOR" },
			{ id: "SUB23", name: "SUB23" },
			{ id: "SUB20", name: "SUB20" },
			{ id: "SUB18", name: "SUB18" },
			{ id: "SUB16", name: "SUB16" },
			{ id: "SUB14", name: "SUB14" },
			{ id: "SUB12", name: "SUB12" },
			{ id: "SUB10", name: "SUB10" },
			{ id: "SUB8", name: "SUB8" }
		]
	},

	getDorsalCategories: function () {
		return [
			{ id: "", name: "" },
			{ id: "SM", name: "SM" },
			{ id: "SF", name: "SF" },
			{ id: "U23M", name: "U23M" },
			{ id: "U20F", name: "U20F" },
			{ id: "U18F", name: "U18F" },
			{ id: "U20M", name: "U20M" },
			{ id: "U16M", name: "U16M" },
			{ id: "U23F", name: "U23F" },
			{ id: "U14M", name: "U14M" },
			{ id: "U10M", name: "U10M" },
			{ id: "U14F", name: "U14F" },
			{ id: "U10F", name: "U10F" },
			{ id: "U18M", name: "U18M" },
			{ id: "U12M", name: "U12M" }
		]
	},

	getPaymentTypes: function () {
		return [
			{ id: "", name: "" },
			{ id: "CASH", name: "Efectivo" },
			{ id: "TRANSFER", name: "Transferencia" },
			{ id: "DOM", name: "Domiciliación Bancaria" },
			{ id: "SUBV", name: "Subvencionado" },
		]
	},

	getFeeTypes: function (sportSchoolId) {
		if (sportSchoolId === 1) {

			// Santa Ana
			return [
				{ id: '', name: '' },
				{ id: 'CLUB', name: 'Club' },
				{ id: 'PISTAS', name: 'Pistas' },
				{ id: 'LIC_PISTAS', name: 'Licencia/Pistas' },
				{ id: 'ENTRENADOR', name: 'Entrenadores' },
			]
		}

		else if (sportSchoolId === 2) {

			// Paracuellos
			return [
				{ id: '', name: '' },
				{ id: 'CLLUB', name: 'Club' }
			]
		}

		else if (sportSchoolId === 3) {

			// Externos
			return [
				{ id: '', name: '' },
				{ id: 'LICENCIA', name: 'Licencia' },
				{ id: 'SOCIO', name: 'Socio' },
				{ id: 'ENTRENADOR', name: 'Entrenadores' },
			]
		}
		else {
			return []
		}
	},

	leftPadding: function (str, max, c) {
		str = str.toString();
		return str.length < max ? utils.leftPadding(c + str, max) : str;
	}
}

export default utils;