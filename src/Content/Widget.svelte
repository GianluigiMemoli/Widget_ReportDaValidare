
<script>
    /* NON MODIFICARE -> INIZIO */
    import ReportDaValidare from "./ReportDaValidare.svelte";

    export let showResult, showError, showLoading, showMaintenance, showProgressBar, updateProgressBar, getFormData;
    export let WIDGET_VISIBLE = false;
    /* NON MODIFICARE -> FINE */

    /* ESEMPIO FUNZIONAMENTO ->  INIZIO */
    import {Button} from 'svelte-materialify/src';

    setTimeout(() => {
        showResult();
    });
    /* ESEMPIO FUNZIONAMENTO ->  FINE */

</script>

<main style={WIDGET_VISIBLE ? "" : "display: none"}>


    <ReportDaValidare on:loading={(e) => {
        if(e.detail.loading){
            showLoading(e.detail.txt)
        } else {
            showResult();
        }
    }}></ReportDaValidare>

</main>

<style>

    main {
        width: 100%;
        height: 100%;
    }

</style>
