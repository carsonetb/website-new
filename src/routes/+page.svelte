<script lang="ts">
	import { resolve } from '$app/paths';
	import Bold from '../components/Bold.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
</script>

<div
	class="grid h-auto w-full grid-cols-1 bg-background p-1 md:p-6 xl:h-screen xl:grid-cols-2 xl:overflow-hidden"
>
	<div
		class="mx-0 my-0 rounded-2xl bg-foreground px-5 py-5 pt-10 md:mx-5 md:my-5 md:px-10 2xl:px-40 2xl:py-27"
	>
		<div class="mb-10">
			<h1 class="font-mono text-5xl xl:text-4xl 2xl:text-5xl">
				<span class="text-classes">CarsonBates</span> <span class=" text-standard">&#123</span>
			</h1>
			<h4 class="ml-8 font-serif text-2xl text-comments italic">
				or:
				<a
					href="https://github.com/carsonetb"
					target="_blank"
					class="font-mono text-link not-italic">carsonetb</a
				>
			</h4>
			<h4 class="ml-8 font-serif text-2xl text-comments italic">
				contact:
				<a href="mailto:me@carsonetb.com" target="_blank" class="font-mono text-link not-italic"
					>me@carsonetb.com</a
				>
			</h4>
			<h4 class="ml-8 font-serif text-2xl text-comments italic">
				<a href={resolve('/photography' as any)} target="_blank" class=" text-link">photography</a>
			</h4>
			<h1 class="font-mono text-5xl text-standard xl:text-4xl 2xl:text-5xl">&#125</h1>
		</div>
		<p>
			I'm interested in
			<Bold>robotics</Bold>,
			<Bold>game development</Bold>, and
			<Bold>compiler design</Bold>. I'm currently a member of
			<a href="https://github.com/frc3636" target="_blank" class="font-semibold text-link underline"
				>FRC Team 3636, The Generals!</a
			>
		</p>
		<p>
			I have knowledge of many languages, including
			<span class="font-mono text-classes">C</span>,
			<span class="font-mono text-classes">C++</span>,
			<span class="font-mono text-classes">C#</span>,
			<span class="font-mono text-classes">GDScript</span>,
			<span class="font-mono text-classes">Haskell</span>,
			<span class="font-mono text-classes">Java</span>,
			<span class="font-mono text-classes">Javascript</span>,
			<span class="font-mono text-classes">Kotlin</span>,
			<span class="font-mono text-classes">OCaml</span>,
			<span class="font-mono text-classes">Python</span>,
			<span class="font-mono text-classes">Rust</span>.
		</p>
		<p>I'm working on integrating a blog into this website, so that's coming soon!</p>
		<p class="mt-5 font-serif text-comments italic 2xl:mt-20">
			ESTRAGON: Charming spot. Inspiring prospects. Let's go. <br />
			VLADIMIR: We can't. <br />
			ESTRAGON: Why not? <br />
			VLADIMIR: We're waiting for Godot. <br />
		</p>
	</div>

	<section
		class="mx-5 my-5 flex h-auto flex-col gap-4 rounded-2xl px-5 py-15 md:px-15 xl:h-full xl:overflow-y-auto"
	>
		<h1 class="font-mono text-3xl text-comments xl:hidden">// Projects</h1>
		<ProjectCard
			title="Hydro"
			language="Rust"
			description="A flexible compiled programming language."
			url="https://github.com/carsonetb/hydro"
		/>
		<ProjectCard
			title="FRCPython"
			language="Python"
			description="A robotics simulation tool, built in to robot code."
			url="https://github.com/carsonetb/frc-python"
		/>
		<ProjectCard
			title="ProjectPrometheus"
			language="Godot"
			description="Programmed by me, best-in-show-winning entry of Epimetheus Games for OGPC 2023-24"
			url="https://github.com/epimetheusgames/project-prometheus"
		/>
		<ProjectCard
			title="EyeSore"
			language="Godot"
			description="Programmed in part by me, best-in-show-winning entry of Epimetheus Games for OGPC 2022-23"
			url="https://github.com/epimetheusgames/eyesore"
		/>
		<ProjectCard
			title="CBLangLLVM"
			language="Python"
			description="A compiler for my programming language."
			url="https://github.com/carsonetb/cblang-llvm"
		/>
		<ProjectCard
			title="CBLang"
			language="C++"
			description="An interpreter for my programming language."
			url="https://github.com/carsonetb/cblang"
		/>
		<ProjectCard
			title="ChessChallenge"
			language="C#"
			description="A chess engine built for Sebastian Lague's chess challenge."
			url="https://github.com/carsonetb/chess-challenge"
		/>
		<ProjectCard
			title="ProceduralPlanets"
			language="Godot"
			description="A port of Sebastian Lague's amazing Procedural Planets project to Godot 4."
			url="https://github.com/carsonetb/procedural-planets"
		/>
	</section>
</div>
