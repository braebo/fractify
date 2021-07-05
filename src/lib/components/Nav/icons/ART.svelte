<script>
	import { theme } from '$lib/theme';
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { hoverState } from '../hoverStore';
	import { fly } from 'svelte/transition'
	import { spring } from 'svelte/motion'
	let w = 250
	let h = 500
	let pupil_x = -10
	let pupil_y = -10
	let space_x = 0
	let space_y = 0

	const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

	const eye = spring({x: pupil_x, y: pupil_y}, {
		stiffness: 0.05,
		damping: 0.82
	})
	const look_amount = 0.06
	const mouse = (e) => {
		requestAnimationFrame(() => {
			pupil_x = -75 + (e.clientX * look_amount * 1.8)
			pupil_y = clamp(-30 + (e.clientY * look_amount * 1), -35, 20)
			eye.set({x: pupil_x, y: pupil_y})
		})
	}
	let bf = 0.005, scale = 28
	
	let showControls = false;
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

<svelte:window on:mousemove={mouse} bind:innerWidth={w} bind:innerHeight={h} />

<div class="button" on:click={() => showControls = !showControls} title="Show Controls">
	 🎛
</div>

<div class="eye">
	<svg width="801" height="314" viewBox="0 0 801 314" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="eyeMask" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="-1" width="802" height="315">
			<path d="M397.791 0.232236C231.084 1.02393 0.672516 156.843 0.672516 156.843C0.672516 156.843 231.084 312.661 397.791 313.453C566.532 314.254 800.503 156.843 800.503 156.843C800.503 156.843 566.532 -0.56912 397.791 0.232236Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
		</mask>
		<g mask="url(#eyeMask)" filter="url(#plasma)">
			<image id="space" x="{$eye.x / 20 - 140}" y="{-440 + $eye.y / 5}" width="1200" height="1200" href="https://cdn.discordapp.com/attachments/238827698552569868/856077442976186399/Space.jpeg" alt>
			   <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 60 70"
                          to="360 60 70"
                          dur="500s"
                          repeatCount="indefinite"/>
			</image>
		</g>
		<filter id="plasma" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
			<feTurbulence type="turbulence" baseFrequency="{bf}" numOctaves="2" seed="1" stitchTiles="stitch" result="turbulence"/>
			<feComposite in="SourceGraphic" in2="turbulence" operator="lighter" result="composite1"/>
			<feDisplacementMap in2="turbulence" in="SourceGraphic"
												 scale="{scale}" xChannelSelector="R" yChannelSelector="G"/>
		</filter>
	</svg>
	<svg id="pupil" transform="translate({$eye.x}, {$eye.y})">
		<svg mask="url(#eyemask)" id="moon" width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask id="pupilMask" type="alpha" maskUnits="userSpaceOnUse" x="0" y="-1" width="801" height="314">
				<circle r="98" cx="100" cy="99" fill="white"/>
			</mask>
			<image mask="url(#pupilMask)" width="200" href="https://cdn.discordapp.com/attachments/238827698552569868/856077454892728350/Moon.jpg" alt />
		</svg>
	</svg>
</div>
{#if showControls}
<div class="variables" transition:fly={{y: 20}}>
	<div class="var">👁x {Math.round($eye.x)}</div>

	<div class="var">👁y {Math.round($eye.y)}</div>

	<div class="var">🌌x {Math.round($eye.x / 10 - 50)}</div>

	<div class="var">🌌y {Math.round(-340 + $eye.y / 5)}</div>
</div>
<br>
<div class="controls" transition:fly={{y: 20, delay: 50}}>
<div class="control">
	<h2>base frequency</h2>
	<input bind:value={bf} type="range" min="0.001" max="1" step="0.001"/>
	<div class="value">{bf}</div>
</div>

<div class="control">
	<h2>scale</h2>
	<input bind:value={scale} type="range" min="0.1" max="1000" step="0.01"/>
	<div class="value">{scale}</div>
</div>
</div>
{/if}

  
  <!-- width="82" height="34" viewBox="0 0 82 34" -->
	
  <!--
	<svg
		xmlns="http://www.w3.org/2000/svg"
		id="html-icon"
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
 -->
<style>
	#html-icon {
		cursor: pointer;
		pointer-events: auto;
	}
	.html-main {
		will-change: transform;
		backface-visibility: hidden;
	}
	h2 {
		max-width: 200px;
		width: 100%;
		display: flex;
		line-height: 10px;
		text-align: right;
		align-items: end;

	}
	.control {
		text-align: right;
		width: 75%;
		margin: auto;
		display: flex;
		line-height: 50px;
	}
	.value {
		width: 200px;
		font-weight: 500;
		margin: auto 1rem;
		font-size: 1.5rem;
	}
	input {
		display: flex;
		max-width: 300px;
		width: 100%;
		margin: 1rem auto;
		height: 20px;
		position: relative;
	}
	.eye {
		position: relative;
		display: flex;
		height: 350px;
		width: max-content;
		margin: 10rem auto;
	}
	#pupil {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		--size: 200px;
		width: var(--size);
		height: var(--size);
		margin: auto;
	}
	#space {
		transform-box: fill-box;
		transform-origin: 40% 45%;
	}
	h1 {
		color: lightblue;
	}
	.variables {
		display: flex;
		width: 500px;
		justify-content: space-around;
		margin: auto;
	}
	.var {
		width: 150px;
	}
	.button {
		font-size: 3rem;
		position: absolute;
		left: 1rem;
		cursor: pointer;
		filter: contrast(1.5) saturate(2);
	}
</style>
