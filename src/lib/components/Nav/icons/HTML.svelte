<script>
	import { theme } from '$lib/theme';
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { hoverState } from '../hoverStore';
	const dispatch = createEventDispatcher();

	const map_range = (value, x1, x2, y1, y2) => ((value - x1) * (y2 - y1)) / (x2 - x1) + y1;
	const y = tweened(5, { easing: cubicOut });
	$: blur = $y / 2;
	$: scale = map_range($y / 5, 5, 20, 1, 1.4);
	$: glare = map_range($y, 5, 20, 0, 1);
	$: shadow_opacity = map_range($y, 5, 20, 0, $theme == 'dark' ? 0 : 1);

	let hovering = false;
	$: foreignHover = () => $hoverState.item == 'HTML' && $hoverState.hovering;
	$: hovering || foreignHover() ? ($y = 20) : ($y = 5);

	let timer = null;
	export function smoothToggle(bool, delay = 200) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			hovering = bool;
			dispatch('toggle', {
				item: 'HTML',
				hovering: bool,
			});
		}, delay);
	}
</script>

<div
	style="width:250px;"
	class="svg-container"
	on:mouseover={() => smoothToggle(true, 0)}
	on:mouseout={() => smoothToggle(false, 100)}
>
	<svg
		id="html-icon"
		xmlns="http://www.w3.org/2000/svg"
		width="250"
		height="300"
		fill="none"
		viewBox="19 -5 200 300"
		style="filter:saturate({hovering || foreignHover() ? 1 : 0})"
	>
		<path
			class="Title"
			fill="rgb(var(--dark-a))"
			d="M52.93 11h11.23v11.133h10.352V11h11.23v33.691h-11.23v-11.23H64.258v11.23H52.93V11zm47.656 11.23h-9.912V11h31.103v11.23h-9.961v22.461h-11.23v-22.46zM126.709 11h11.768l7.226 11.865L152.93 11h11.767v33.691h-11.23V27.992l-7.862 12.11-7.861-12.11v16.7h-11.035V11zm43.555 0h11.23v22.559h15.918V44.69h-27.148"
		/>
		<g class="html-main" style="transform-origin:50%;transform:scale({scale})">
			<g class="Body" filter="url(#html-body-shadow)">
				<path fill="#E44D26" d="M52.54 240.98L36.425 60.121h177.148l-16.113 180.762L124.854 261" />
				<path
					fill="url(#html-body-linear)"
					d="M52.54 240.98L36.425 60.121h177.148l-16.113 180.762L124.854 261"
				/>
			</g>
			<g class="Glare">
				<path fill="#F16529" d="M125 245.619V74.965h72.412l-13.818 154.297" />
				<path fill="url(#html-glare-angular)" d="M125 245.619V74.965h72.412l-13.818 154.297" />
			</g>
			<path
				fill="url(#left5-linear)"
				d="M69.336 97.084H125v22.168H93.652l2.051 22.705H125v22.119H75.39l-6.054-66.992zm7.031 78.125h22.266l1.562 17.725 24.805 6.64v23.145l-45.508-12.696"
				class="Left5"
			/>
			<path
				fill="url(#right5-linear)"
				d="M180.469 97.084h-55.567v22.168h53.516l2.051-22.168zm-4.053 44.873h-51.514v22.168h27.344l-2.588 28.809-24.756 6.64v23.047l45.411-12.598"
				class="Right5"
			/>
		</g>
		<defs>
			<linearGradient
				id="html-body-linear"
				x1="125"
				x2="125"
				y1="60.121"
				y2="261"
				class="html-body-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FF782D" />
				<stop offset="1" stop-color="#C94022" />
			</linearGradient>
			<linearGradient
				id="left5-linear"
				x1="49.907"
				x2="125"
				y1="159.901"
				y2="159.901"
				class="left5-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#CDA690" />
				<stop offset="1" stop-color="#E9D3C7" />
			</linearGradient>
			<linearGradient
				id="right5-linear"
				x1="124.902"
				x2="180.469"
				y1="152.148"
				y2="150.865"
				class="right5-linear"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#fff" />
				<stop offset="1" stop-color="#FFEDE9" />
			</linearGradient>
			<radialGradient
				id="html-glare-angular"
				cx="0"
				cy={glare}
				r={glare + 0.7}
				class="html-glare-angular"
				gradientTransform="matrix(0 -170.654 72.4121 0 125 245.619)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset=".25" stop-color="#FFCEB7" />
				<stop offset="1" stop-color="#FF9E70" />
			</radialGradient>
			<filter
				id="html-body-shadow"
				width="301.148"
				height="237.879"
				x="-50"
				y="60.121"
				class="html-body-shadow"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 {shadow_opacity} 0" />
				<feOffset dy={$y} />
				<feGaussianBlur stdDeviation={blur} />
				<feColorMatrix values="0 0 0 0 0.633333 0 0 0 0 0.46 0 0 0 0 0.46 0 0 0 1 0" />
				<feBlend in2="BackgroundImageFix" result="html-dropshadow" />
				<feBlend in="SourceGraphic" in2="html-dropshadow" result="shape" />
			</filter>
		</defs>
	</svg>
</div>

<style>
	#html-icon {
		cursor: pointer;
		pointer-events: auto;
	}
	.html-main {
		will-change: transform;
		backface-visibility: hidden;
	}
</style>
