export function getRandomCarName() {

	const carBrands = [
		'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger', 
		'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
		'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
		'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
		'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown', 
		'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola', 
		'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
		'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
		'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
	];

	const carModels = [
		'Durango', 'Ram', 'Luxus', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla',
		'C4Cactus', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
		'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
		'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Luxus Class',  'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
	];

	function getRandomNumber(max: number) {
		const random = Math.random() * (max + 1);
		return Math.floor(random);
	}
	
	const brandsLimit = carBrands.length-1;
	const modelsLimit = carModels.length-1;

	const brandIndex = getRandomNumber(brandsLimit);
	const modelIndex = getRandomNumber(modelsLimit);
	return carBrands[brandIndex]  + ' ' + carModels[modelIndex];

}

export function generateRandomColor() {
	const colors = ['#f5e2be', '#ecbca4', '#d99994', '#a4747c', '#6f6068', '#a47c48', '#f4df76', '#d89948',
		'#ffa91e', '#ff9a00', '#ec8a28', '#e7803a', '#e36700', '#d25500'];
		const colorLimit = colors.length - 1;
		function getRandomNumber(max: number) {
		const random = Math.random() * (max + 1);
		return Math.floor(random);
	}
	return colors[getRandomNumber(colorLimit)];
}