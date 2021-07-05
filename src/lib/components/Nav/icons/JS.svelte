<script>
	import { createEventDispatcher } from 'svelte';
	import { hoverState } from '../hoverStore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const dispatch = createEventDispatcher();

	const map_range = (value, x1, x2, y1, y2) => ((value - x1) * (y2 - y1)) / (x2 - x1) + y1;
	const y = tweened(5, { easing: cubicOut });
	$: blur = $y / 2;
	$: scale = map_range($y / 5, 5, 20, 1, 1.4);
	$: glare = map_range($y, 5, 20, 0, 1);
	$: opacity = map_range($y, 5, 20, 0, 1);

	let hovering = false;
	$: foreignHover = () => $hoverState.item == 'JS' && $hoverState.hovering;
	$: hovering || foreignHover() ? ($y = 20) : ($y = 5);

	let timer = null;
	export function smoothToggle(bool, delay = 100) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			hovering = bool;
			dispatch('toggle', {
				item: 'JS',
				hovering: bool,
			});
		}, delay);
	}
</script>

<div
	style="width:275px;margin-left:-18px"
	class="svg-container"
	on:mouseover={() => smoothToggle(true, 0)}
	on:mouseout={() => smoothToggle(false, 50)}
>
	<svg
		id="js-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="300"
		height="300"
		fill="none"
		viewBox="0 0 326 326"
		style="transform-origin:30%;transform:scale({scale});filter:saturate({hovering || foreignHover() ? 1 : 0})"
	>
		<g filter="url(#js-shadow)">
			<g class="Square">
				<path fill="#F7DF1E" d="M284 20H42a4 4 0 00-4 4v242a4 4 0 004 4h242a4 4 0 004-4V24a4 4 0 00-4-4z" />
				<path
					fill="url(#square-radial)"
					d="M284 20H42a4 4 0 00-4 4v242a4 4 0 004 4h242a4 4 0 004-4V24a4 4 0 00-4-4z"
				/>
			</g>
			<path
				fill="#0C1117"
				d="M205.937 215.313c5.035 8.223 11.587 14.266 23.174 14.266 9.734 0 15.953-4.865 15.953-11.587 0-8.055-6.389-10.909-17.104-15.595l-5.873-2.52c-16.952-7.222-28.214-16.27-28.214-35.397 0-17.619 13.425-31.032 34.405-31.032 14.936 0 25.674 5.199 33.413 18.81l-18.294 11.746c-4.028-7.222-8.373-10.067-15.119-10.067-6.881 0-11.242 4.365-11.242 10.067 0 7.048 4.365 9.901 14.444 14.266l5.873 2.516c19.961 8.559 31.23 17.285 31.23 36.904 0 21.151-16.615 32.739-38.928 32.739-21.818 0-35.913-10.397-42.81-24.024l19.092-11.092zm-82.989 2.036c3.691 6.548 7.048 12.084 15.12 12.084 7.718 0 12.587-3.02 12.587-14.762V134.79h23.492v80.198c0 24.325-14.262 35.397-35.079 35.397-18.81 0-29.703-9.734-35.243-21.458l19.123-11.578z"
				class="JS"
			/>
		</g>
		<defs>
			<radialGradient
				id="square-radial"
				cx="0"
				cy={glare / 2}
				r={glare + 1.3}
				class="square-radial"
				gradientTransform="rotate(-177.23 97.923 89.792) scale(170.709)"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#F8FB82" />
				<stop offset="1" stop-color="#F8DF1F" />
			</radialGradient>
			<filter
				id="js-shadow"
				width="360"
				height="378"
				x="-17"
				y="-2"
				class="js-shadow"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 {opacity} 0" />
				<feOffset dy={$y} />
				<feGaussianBlur stdDeviation={blur} />
				<feColorMatrix values="0 0 0 0 0.433333 0 0 0 0 0.413653 0 0 0 0 0.236528 0 0 0 0.57 0" />
				<feBlend in2="BackgroundImageFix" result="js-dropShadow" />
				<feBlend in="SourceGraphic" in2="js-dropShadow" result="shape" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feOffset dy="5" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
				<feColorMatrix values="0 0 0 0 0.962397 0 0 0 0 0.966667 0 0 0 0 0.753194 0 0 0 0.81 0" />
				<feBlend in2="shape" result="innerShadow1" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feOffset dy="-2" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
				<feBlend in2="innerShadow1" result="innerShadow2" />
			</filter>
		</defs>
	</svg>
</div>

<style>
	#js-icon {
		cursor: pointer;
		pointer-events: auto;
	}
	.Square {
		will-change: transform;
		backface-visibility: hidden;
	}
</style>
