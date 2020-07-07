<script>
    import { createEventDispatcher } from 'svelte';
    import { Icon } from "carbon-components-svelte";
    import ChevronDown16 from 'carbon-icons-svelte/lib/ChevronDown16';
    import View16 from 'carbon-icons-svelte/lib/View16';

    const dispatch = createEventDispatcher();

    export let name;
    export let children = []
    export let expanded = false;
    export let inScope = [];
    $: childScope = inScope && inScope.slice(1)

    function setInScope(child) {
        dispatch("scope", child ? name + "/" + child : name)
    }

</script>

<li>
    <div class:inScope={inScope.length > 0} on:click="{e => expanded = !expanded}">
        <span>{name}</span>
        {#if children.length > 0}
            <span class="expand">
                <Icon render={ChevronDown16}/>
            </span>
        {/if}
        <span class="view">
            <Icon render={View16} on:click={setInScope}/>
        </span>
    </div>
    {#if expanded && children}
        <ul>
            {#each children as kid, i}
                {#if typeof kid == "string"}
                    <svelte:self on:setInScope inScope={i == childScope[0] && inScope} name={kid}/>
                {:else}
                     <svelte:self on:setInScope inScope={i == childScope[0] && inScope} {...kid}/>
                {/if}
            {/each}
        </ul>
    {/if}
</li>

<style lang="scss">
    @import "node_modules/@carbon/layout/scss/layout.scss";

    .inScope {
        font-weight: bold;
    }

    li {
        margin-left: $spacing-04;
    }
    li div {
        padding: $spacing-03;
        cursor: pointer;
        display: flex;
    }

    li div:hover {
        background-color: #e0e0e0;
    }

    li div:hover > .view {
        opacity: 50%;
    }

    .view {
        margin-left: auto;
        opacity: 0;
    }

    .expand {
        padding-left: $spacing-01;
    }

    li div > .view:hover {
        opacity: 100%;
    }
</style>
