<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    export let model;
    export let diagram = "context";
    export let tag = "";
    export let scope = "";

    $: url = buildURL(diagram, scope, tag)
    $: renderModel(url, model);

    function buildURL(diagram, scope, tag) {
        let u = new URL("http://localhost:8080/diagram/" + diagram)

        if (tag) {
            u.searchParams.append("tag", tag)
        }

        if (scope) {
            u.searchParams.append("scope", scope)
        }

        return u.href
    }

    async function renderModel(url, model) {
        while (typeof d3 == 'undefined') {
            await new Promise(r => setTimeout(r, 1000));
        }

        const res = await axios({
            method: "POST",
            url,
            data: model,
        })
        d3.select("#graph").graphviz()
            .renderDot(res.data);
    }

</script>

<div id="graph"></div>

<style>
    :global(#graph > svg) {
        width: 100%;
    }
</style>
