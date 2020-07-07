<script>
	import TreeItem from "./TreeItem.svelte";
	import Graph from "./Graph.svelte";
	import { Header, ContentSwitcher, Switch, TextInput, FormGroup, FormLabel, Dropdown} from "carbon-components-svelte";
	import model from "./model";
	import { getScopeIndices } from "./tools";

	const diagrams = ['context', 'tag']
	$: selected = 0
	$: diagram = diagrams[selected];

	let allTags = Array.from(findTags(model.model.elements))
	let allTagsDropdown = allTags.map(function (el, i) {
		return {id: i, text: el};
	})
	let selectedTag = -1;
	let tag = ""
	$: if (selectedTag >= 0) {
		tag = allTags[selectedTag]
	}

	let scope = ""
	let scopeIndices = []
	let scopeInput = ""
	let scopeValid = true;

	$: setScope(scopeInput)

	function setScope(newScope) {
		if (newScope.length == 0) {
			scope = "";
			scopeValid = true;
			scopeIndices = []
			return;
		}

		let newScopeInd = getScopeIndices(model.model.elements, newScope.split("/"));

		if (newScopeInd.length > 0) {
			scope = newScope;
			scopeIndices = newScopeInd;
			scopeInput = scopeInput
			scopeValid = true
			return;
		}

		scopeValid = false;
	}

	function findTags(elements) {
		let tags = new Set()
		if (!elements) {
			return tags;
		}

		elements.forEach((el) => {
			if (el.tags) {
				el.tags.forEach((t) => tags.add(t))
			}
			const childTags = findTags(el.children)
			childTags.forEach((t) => tags.add(t))
		})

		return tags
	}

</script>

<Header company="Archie" platformName="Architecture explorer"/>
<ul class="side-nav bx--side-nav--expanded bx--side-nav">
	{#each model.model.elements as el, i}
		<TreeItem inScope={i == scopeIndices[0] && scopeIndices} name={el.name} children={el.children}></TreeItem>
	{/each}
</ul>

<main class="bx--content">
	<div class="bx--grid">
		<div class="bx--row">
			<FormGroup class="bx--col-lg-4">
				<FormLabel>Diagram Type</FormLabel>
				<ContentSwitcher bind:selectedIndex={selected}>
					<Switch name={'context'} text='Context' />
					<Switch name={'tag'} text='Tag' />
				</ContentSwitcher>
			</FormGroup>
			<FormGroup class="bx--col-lg-4">
				<TextInput bind:value={scopeInput} labelText="Scope" invalidText="Scope not found" invalid={!scopeValid}/>
			</FormGroup>
			<FormGroup class="bx--col-lg-4">
				<!-- <TextInput   /> -->
				<Dropdown label="" disabled={diagram == 'context'} items={allTagsDropdown} bind:selectedIndex={selectedTag} titleText="Tag"/>
			</FormGroup>
		</div>
		<div class="bx--row">
			<div class="bx--col">
				<Graph {diagram} {model} {scope} {tag} />
			</div>
		</div>
	</div>
</main>


<style lang="scss">
    @import "node_modules/@carbon/layout/scss/layout.scss";

	.side-nav {
		background: #f4f4f4;
	}

	ul {
		padding: $spacing-04 $spacing-04 0 0;

	}
</style>
