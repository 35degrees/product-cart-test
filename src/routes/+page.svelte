<script>
	import data from '/src/lib/data.json';
	import Currency from '$lib/Currency.svelte';
	import Button from '$lib/Button.svelte';
	import CartItem from '$lib/CartItem.svelte';

	let cartItems = $state([]);
	let selected;
	let btn;

	let totalQuantity = $derived.by(() => {
		let cartTotal = 0;
		let totalAmount = 0;
		for (const quantity of cartItems) {
			cartTotal += quantity.quantity;
			totalAmount += quantity.total;
		}
		return {
			cartTotal,
			totalAmount
		};
	});

	function addItemToCart(data) {
		let total = 0;
		let stop = cartItems.find((item) => item.product === data.item);
		if (!stop) {
			cartItems.push({
				product: data.item,
				id: data.id,
				quantity: 1,
				price: data.price,
				total: data.price
			});
		}
	}

	// function findProperty(i) {
	// 	let myId = i + 1;
	// 	let hello = cartItems.find((item) => item.id === myId);
	// 	return hello;
	// }

	function decrement(i) {
		for (let object of cartItems) {
			if (object.id === i + 1) {
				if (object.quantity === 1) {
					removeItem(object.id);
				} else {
					object.quantity--;
					object.total -= object.price;
				}
			}
		}
	}
	function increment(i) {
		for (let object of cartItems) {
			if (object.id === i + 1) {
				if (object.quantity > 0) {
					object.quantity++;
					object.total += object.price;
				}
			}
		}
	}

	function getQuantity(i) {
		for (let object of cartItems) {
			if (object.id === i + 1) {
				return object.quantity;
			}
		}
	}

	function removeItem(id) {
		cartItems = cartItems.filter((item) => item.id !== id);
	}
	$inspect(cartItems);

	// onclick={() => {
	// 				cartItems.push({
	// 					id: data.id,
	// 					product: data.item,
	// 					quantity: 1,
	// 					price: data.price
	// 				});
	// 			}}
</script>

<div class="flex w-2/3 flex-row items-start justify-center gap-4">
	<div class="left flex h-auto flex-col gap-2 rounded-lg border-2 border-red-400 px-12 py-5">
		{#each data as data, i}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="relative flex flex-row items-center justify-between gap-10" aria-label="click ">
				<div class="flex flex-row items-center justify-start gap-4">
					<p class="text-lg capitalize text-black">{data.emoji}</p>
					<p class="text-lg capitalize text-black">{data.item}</p>
					<p class="text-lg capitalize text-black">
						{data.price}
					</p>
				</div>
				{#if cartItems.find((item) => item.id === i + 1)}
					<button
						class="change-btn w-[120px] select-none rounded-full bg-red-500 px-2 py-1 text-center"
					>
						<div class="space-between flex flex-row items-center justify-center gap-6 text-sm">
							<p class="minus-btn adjust-btn px-2" onclick={() => decrement(i)}>-</p>
							<p class="w-[100px]">{getQuantity(i)}</p>
							<p class="plus-btn adjust-btn" onclick={() => increment(i)}>+</p>
						</div>
					</button>
				{:else}
					<button
						bind:this={btn}
						onclick={() => addItemToCart(data)}
						class="add-btn w-[120px] select-none rounded-full border-red-300 px-2 py-1 text-center"
					>
						<p class="text-sm">Add Item</p>
					</button>
				{/if}
			</div>
		{/each}
	</div>
	<div
		class="right flex h-auto w-2/3 select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-red-400 px-12 py-5"
	>
		<h1>Your Cart {totalQuantity.cartTotal > 0 ? '(' + totalQuantity.cartTotal + ')' : ''}</h1>
		<div class="flex w-full flex-col items-start justify-start gap-3 p-2">
			{#each cartItems as item, i}
				<div class="flex flex-row items-center justify-start gap-2">
					<p class="text-sm text-black">{item.product}</p>
					<p>{item.quantity}</p>
					<p class="w-[80px]">Total: ${item.total}</p>
					<p class="cursor-pointer" onclick={() => removeItem(item.id)}>X</p>
				</div>
			{/each}
			<p class="text-xl font-bold">
				{totalQuantity.totalAmount ? 'Total: $' + totalQuantity.totalAmount : ''}
			</p>
		</div>
	</div>
</div>

<style>
	.add-btn {
		background-color: rgba(220, 132, 18, 0.67);
	}
	.selected {
		font-size: 2rem;
	}
</style>
