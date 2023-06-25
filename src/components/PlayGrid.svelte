<script>
	import { onMount, tick } from 'svelte';
	import Dialog from './Dialog.svelte';
	import Device from 'svelte-device-info';
	import Confetti from './Confetti.svelte';

	const INITIAL_SPEED = 1270;
	const LOSER_MESSAGES = ['EPIC FAIL', 'EPIC NOOB'];
	let width, height;
	let dialog;
	//rows first
	let playGrid = Array.from({ length: 14 }, () => Array(9).fill(0));

	let current = { x: 0, y: playGrid.length - 1 };

	let speed = 1270;
	let multiplier = 1;
	let dead = false;
	let win = false;

	const activeCellColor = 'bg-gray-200/40';
	const clearedCellColor = 'bg-green-300/20';
	const deadCellColor = 'bg-red-400/70';

	const move = (x, y) => {
		if (x > playGrid[0].length - 1) {
			x = 0;
		}
		current.x = x;
		current.y = y;
	};

	const reset = () => {
		playGrid.forEach((row, y) => {
			row.forEach((_, x) => {
				playGrid[y][x] = 0;
			});
		});
		current.x = 0;
		current.y = playGrid.length - 1;
		speed = INITIAL_SPEED;
		multiplier = 1;
		dead = false;
		win = false;
		clearInterval(intervalId);
		intervalId = setInterval(() => move(current.x + 1, current.y), speed / 10);
	};

	$: if (dead) {
		clearInterval(intervalId);
		dialog.showModal();
	}

	$: if (win) {
		clearInterval(intervalId);
		dialog.showModal();
	}

	let intervalId;

	const handleEvent = () => {
		if (
			playGrid.length > current.y &&
			current.y === 0 &&
			playGrid[current.y + 1][current.x] === 1
		) {
			win = true;
		}
		//success action handler
		if (
			current.y + 1 >= playGrid.length ||
			playGrid[current.y + 1][current.x] === 1 ||
			current.y === playGrid.length - 1
		) {
			playGrid[current.y].fill(2);
			playGrid[current.y][current.x] = 1;

			speed -= 100 * multiplier;
			multiplier *= 0.95;
			current.y -= 1;

			// Decrease the interval time by 10ms for every decrease in current.y
			clearInterval(intervalId);
			intervalId = setInterval(() => move(current.x + 1, current.y), speed / 10);
		}
		//fail action handler
		else {
			dead = true;
		}
	};

	const handleKeyDown = (event) => {
		if (event.code === 'Space' && !dead && !win) {
			handleEvent();
		} else if (event.code === 'Space' && (dead || win)) {
			dialog.close();
		}
	};

	const handleTouchDown = () => {
		if (!dead && !win) {
			handleEvent();
		} else {
			dialog.close();
		}
	};

	const getLoserMessage = () => {
		const index = Math.floor(Math.random() * LOSER_MESSAGES.length);
		return LOSER_MESSAGES[index];
	};

	onMount(() => {
		intervalId = setInterval(() => move(current.x + 1, current.y), speed / 10);
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('touchstart', handleTouchDown);
	});
</script>

<svelte:window bind:outerHeight={height} bind:outerWidth={width} />
<div
	style="background-image: 
  linear-gradient(
    174deg,
    hsl(320, 18.07%, 48.82%) 0%,
    hsl(321.32, 18.26%, 48.94%) 8.1%,
    hsl(324.88, 18.79%, 49.25%) 15.8%,
    hsl(329.96, 19.57%, 49.74%) 23%,
    hsl(335.89, 20.84%, 50.35%) 29.8%,
    hsl(342.15, 22.57%, 51.05%) 36.4%,
    hsl(348.38, 24.5%, 51.81%) 42.7%,
    hsl(354.4, 26.55%, 52.59%) 48.8%,
    hsl(0.08, 28.69%, 53.35%) 54.9%,
    hsl(4.94, 32.61%, 52.85%) 60.9%,
    hsl(8.74, 36.31%, 52.28%) 67%,
    hsl(11.74, 39.65%, 51.67%) 73.1%,
    hsl(14.04, 42.5%, 51.06%) 79.4%,
    hsl(15.73, 44.72%, 50.53%) 86%,
    hsl(16.78, 46.15%, 50.14%) 92.8%,
    hsl(17.14, 46.67%, 50%) 100%
  );
"
	class="border-gray-400 border-2 overflow-hidden"
>
	<div class="">
		{#each playGrid as row, y}
			<div class="flex">
				{#each row as _, x}
					<div
						style={width > 680
							? `height: ${height / playGrid.length - 20}px`
							: `height: ${height / playGrid.length - 24}px`}
						class="aspect-square
                //active cell
                {current.x === x && current.y === y ? `${activeCellColor}` : ''}
                {current.x === x && current.y === y && dead ? `${deadCellColor}` : ''}
                //cleared cell
				{playGrid[y][x] === 1 ? `${clearedCellColor} border-[#111111]/10 border-t border-r border-l` : ''} 
                //cleared row
				{playGrid[y][x] === 2
							? 'bg-[#111111]/10  border border-[#111111]/5'
							: 'border border-[#111111]/10'}"
					/>
				{/each}
			</div>
		{/each}
	</div>
	<Dialog bind:dialog on:close={() => reset()}>
		{#if win}
			<Confetti />
			LEGEND, YOU WIN
		{/if}
		{#if dead}
			{getLoserMessage()} <br /><br />
			{!Device.isMobile ? 'SPACE TO PLAY AGAIN' : 'TAP TO PLAY AGAIN'}
		{/if}
	</Dialog>
</div>
