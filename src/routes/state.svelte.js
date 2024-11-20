class Quantity1 {
	number1 = $state(0);

	increment() {
		this.number1++;
	}

	decrement() {
		this.number1--;
	}
}

export const quantity1 = new Quantity1();

class Quantity2 {
	number2 = $state(0);

	increment() {
		this.number2++;
	}

	decrement() {
		this.number2--;
	}
}

export const quantity2 = new Quantity2();

class PizzaQuantity {
	pizzaNumber = $state(0);

	increment() {
		this.pizzaNumber++;
	}

	decrement() {
		this.pizzaNumber--;
	}
}

export const pizzaQuantity = new PizzaQuantity();

// class BeefQuantity {
// 	beefNumber = $state(0);

// 	increment() {
// 		this.beefNumber++;
// 	}

// 	decrement() {
// 		this.beefNumber--;
// 	}
// }

// export const beefQuantity = new BeefQuantity();
