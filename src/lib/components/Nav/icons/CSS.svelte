<script>
	import { theme } from '$lib/theme';
	import { createEventDispatcher } from 'svelte';
	import { hoverState } from '../hoverStore';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const dispatch = createEventDispatcher();

	const map_range = (value, x1, x2, y1, y2) => ((value - x1) * (y2 - y1)) / (x2 - x1) + y1;
	const y = tweened(5, { easing: cubicOut });
	$: blur = $y / 2;
	$: scale = map_range($y / 5, 5, 20, 1, 1.4);
	$: glare = map_range($y, 5, 20, 0, 1);
	$: shadow_opacity = map_range($y, 5, 20, 0, $theme == 'dark' ? 0 : 1);

	let hovering = false;
	$: foreignHover = () => $hoverState.item == 'CSS' && $hoverState.hovering;
	$: hovering || foreignHover() ? ($y = 20) : ($y = 5);

	let timer = null;
	export function smoothToggle(bool, delay = 200) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			hovering = bool;
			dispatch('toggle', {
				item: 'CSS',
				hovering: bool,
			});
		}, delay);
	}
</script>

<div
	style="width:219px;"
	class="svg-container"
	on:mouseover={() => smoothToggle(true, 0)}
	on:mouseout={() => smoothToggle(false, 10)}
>
	<svg
		id="css-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="222"
		height="290"
		fill="none"
		viewBox="-11 -5 222 290"
		style="filter:saturate({hovering || foreignHover() ? 1 : 0})"
	>
		<g class="CSS">
			<g class="Title">
				<!-- <g class="Title" filter="url(#title-shadow)"> -->
				<path
					fill="rgb(var(--dark-a))"
					fill-opacity="1"
					d="M54.045 0h26.901v11.23H65.294v11.23h15.652v11.231H54.045V0z"
					class="C"
				/>
				<path
					fill="rgb(var(--dark-a))"
					fill-opacity="1"
					d="M86.326 0h26.902v9.766H97.576v1.953h15.652v22.46H86.326V23.927h15.652v-1.953H86.326V0z"
					class="S1"
				/>
				<path
					fill="rgb(var(--dark-a))"
					fill-opacity="1"
					d="M118.608 0h26.902v9.766h-15.652v1.953h15.652v22.46h-26.902V23.927h15.652v-1.953h-15.652V0z"
					class="S2"
				/>
			</g>
			<g class="css-main" style="transform-origin:30%;transform:scale({scale})">
				<g class="Body" filter="url(#body-shadow)">
					<path
						fill="url(#body1-linear)"
						d="M189.71 49.13l-16.164 180.762L100.891 250l-72.455-20.08L12.29 49.13h177.42z"
					/>
					<path
						fill="url(#body2-linear)"
						d="M189.71 49.13l-16.164 180.762L100.891 250l-72.455-20.08L12.29 49.13h177.42z"
					/>
					<path
						fill="url(#body3-linear)"
						d="M189.71 49.13l-16.164 180.762L100.891 250l-72.455-20.08L12.29 49.13h177.42z"
					/>
				</g>
				<path
					fill="url(#glare-angular)"
					d="M159.709 218.382l13.812-154.469H101V234.63l58.709-16.248z"
					class="Glare"
				/>
				<g class="Middle3">
					<path fill="#EBEBEB" d="M49.305 130.965l1.99 22.173H101v-22.173H49.305z" />
					<path fill="url(#middle3-linear)" d="M49.305 130.965l1.99 22.173H101v-22.173H49.305z" />
				</g>
				<g class="Top3">
					<path fill="#EBEBEB" d="M101 86.086H45.305l2.02 22.174H101V86.086z" />
					<path fill="url(#top3-linear)" d="M101 86.086H45.305l2.02 22.174H101V86.086z" />
				</g>
				<g class="Bottom3">
					<path
						fill="#EBEBEB"
						d="M101 211.621v-23.07l-.097.026-24.737-6.668-1.581-17.684H52.288L55.4 199.04l45.498 12.609.102-.028z"
					/>
					<path
						fill="url(#bottom3-linear)"
						d="M101 211.621v-23.07l-.097.026-24.737-6.668-1.581-17.684H52.288L55.4 199.04l45.498 12.609.102-.028z"
					/>
				</g>
				<path
					fill="url(#right3-linear)"
					d="M128.274 153.138l-2.578 28.757-24.773 6.675v23.068l45.534-12.598.334-3.746 5.22-58.375.542-5.954 4.009-44.879h-55.639v22.174h31.298l-2.021 22.705h-29.277v22.173h27.351z"
					class="Right3"
				/>
			</g>
		</g>
		<defs>
			<linearGradient
				id="body1-linear"
				x1="101"
				x2="101"
				y1="49.131"
				y2="250"
				class="body1-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#5F76D0" />
				<stop offset="1" stop-color="#687FDC" />
			</linearGradient>
			<linearGradient
				id="paint1_linear"
				x1="21.89"
				x2="181.274"
				y1="149.565"
				y2="149.565"
				class="paint1_linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#408FD9" />
				<stop offset="1" stop-color="#4C3184" stop-opacity=".63" />
			</linearGradient>
			<linearGradient
				id="body3-linear"
				x1="101"
				x2="101"
				y1="49.131"
				y2="250"
				class="body3-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#5D7E9D" />
				<stop offset="1" stop-color="#5ECE99" stop-opacity="0" />
			</linearGradient>
			<linearGradient
				id="middle3-linear"
				x1="49.305"
				x2="101"
				y1="142.052"
				y2="142.052"
				class="middle3-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#C5C8DF" />
				<stop offset="1" stop-color="#E8EAF5" />
			</linearGradient>
			<linearGradient
				id="top3-linear"
				x1="45.305"
				x2="101"
				y1="97.173"
				y2="97.173"
				class="top3-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#C3C6DE" />
				<stop offset="1" stop-color="#E5E6EE" />
			</linearGradient>
			<linearGradient
				id="bottom3-linear"
				x1="52.288"
				x2="101"
				y1="187.937"
				y2="187.937"
				class="bottom3-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#C8CBE1" />
				<stop offset="1" stop-color="#E2E3EC" />
			</linearGradient>
			<linearGradient
				id="right3-linear"
				x1="100.923"
				x2="156.562"
				y1="141.157"
				y2="139.871"
				class="right3-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#fff" />
				<stop offset="1" stop-color="#E9F6FF" />
			</linearGradient>
			<filter
				id="body-shadow"
				width="301.419"
				height="237.869"
				x="-50"
				y="49.131"
				class="body-shadow"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 {shadow_opacity} 0" />
				<feOffset dy={$y} />
				<feGaussianBlur stdDeviation={blur} />
				<feColorMatrix values="0 0 0 0 0.459167 0 0 0 0 0.518383 0 0 0 0 0.633333 0 0 0 1 0" />
				<feBlend in2="BackgroundImageFix" result="drop-shadow" />
				<feBlend in="SourceGraphic" in2="drop-shadow" result="shape" />
			</filter>
			<!-- <filter
			id="title-shadow"
			width="100"
			height="42"
			x="50"
			y="0"
			class="title-shadow"
			color-interpolation-filters="sRGB"
			filterUnits="userSpaceOnUse"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
			<feOffset dy="4" />
			<feGaussianBlur stdDeviation="1" />
			<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
			<feBlend in2="BackgroundImageFix" result="drop-shadow2" />
			<feBlend in="SourceGraphic" in2="drop-shadow2" result="shape" />
		</filter> -->
			<radialGradient
				id="glare-angular"
				cx="0"
				cy={glare}
				r={glare + 0.7}
				class="glare-angular"
				gradientTransform="matrix(0 -170.717 72.5213 0 101 234.63)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset=".15" stop-color="#A5D4FF" />
				<stop offset="1" stop-color="#8DAFE2" />
			</radialGradient>
		</defs>
	</svg>
</div>

<style>
	#css-icon {
		cursor: pointer;
		pointer-events: auto;
	}
	.css-main {
		will-change: transform;
		backface-visibility: hidden;
	}
</style>
