<script>
    import {createEventDispatcher, onMount} from "svelte";
    import {selectedPeriodo, selectedFrequenza, drafts, selectedProgetto, selectedDraft, commenti} from "./stores";
    import {downloadPDF, getDrafts, reportFinale} from "./requests";
    import DynamicSelect from "./DynamicSelect.svelte";
    import {get} from "svelte/store";
    import {Button} from "svelte-materialify";
    import DataSelector from "./DataSelector.svelte";
    import Table from "./Table.svelte";
    import Commenti from "./Commenti.svelte";
    import Plot from "./Plot.svelte";

    let _dataToShow, _inquinanti;
    let titoli = [];
    let freqs = [];
    let periodi = [];
    let _currProgetto;
    let step = 0;
    let dati = {};

    $: if (_currProgetto && _currProgetto.length > 0) {
        let _drafts = get(drafts);
        let freqSet = new Set();
        _drafts.forEach(draft => {
            if (draft.progetto == _currProgetto) {
                freqSet.add(draft.frequenza);
            }
        });
        selectedProgetto.update((s) => s = _currProgetto);
        freqs = Array.from(freqSet);
    } else freqs = [];

    let _currFrequenza;
    $:
        if (_currFrequenza && _currFrequenza.length > 0) {
            let _drafts = get(drafts);
            periodi = [];
            _drafts.forEach(draft => {
                if (draft.progetto == _currProgetto && draft.frequenza == _currFrequenza) {
                    periodi.push(draft.periodo);
                }
            });
            selectedFrequenza.update((s) => s = _currFrequenza);
        } else periodi = [];

    let _currPeriodo;
    $: if (_currPeriodo) {
        selectedPeriodo.update(s => s = _currPeriodo);
        let _drafts = get(drafts);
        _drafts.forEach(draft => {
            if (draft.progetto == _currProgetto && draft.frequenza == _currFrequenza && draft.periodo == _currPeriodo) {
                selectedDraft.update(s => s = draft);
                const fonti = ["ssq", "copernicus", "arpa_eea"];
                Object.keys(draft.dati).forEach(k => {
                    if (fonti.includes(k)) {
                        dati[k] = draft.dati[k];
                    }
                })
                console.log(dati);
            }
        });
    }
    onMount(() => {
        getDrafts().then(response => {
            let titoliSet = new Set();
            let _drafts = response.result;
            drafts.update(self => self = _drafts);
            _drafts.forEach(draft => titoliSet.add(draft.progetto));
            titoli = Array.from(titoliSet);
        });
    });

    function save() {
        reportFinale(get(selectedDraft), get(commenti)).then((r) => {
            alert(r.message);
        })
    }

    let dataPlot;
    const dispatch = createEventDispatcher();
    function getPdf(){
        dispatch("loading", {loading: true, txt: "Creazione pdf" });
        downloadPDF(get(selectedDraft)).then(() => {
            dispatch("loading", {loading: false })
        });
    }
</script>
{#if step == 0}
    <div class="centered">
        <DynamicSelect labelValue="Progetti" data={titoli} on:selectChanged={(e) => _currProgetto = e.detail.data}></DynamicSelect>
        <br>
        <DynamicSelect labelValue="Frequenza" data={freqs} on:selectChanged={(e) => _currFrequenza = e.detail.data}></DynamicSelect>
        <br>
        <DynamicSelect labelValue="Periodo" data={periodi} on:selectChanged={(e) => _currPeriodo = e.detail.data}></DynamicSelect>
        <div class="buttonFooter aloneEnd">
            <Button class="primary" on:click={() => {
                if((_currPeriodo && _currFrequenza && _currProgetto) && (_currPeriodo.length && _currFrequenza.length && _currProgetto.length))
                    step++;
            }}>Avanti</Button>
        </div>
    </div>
{/if}
{#if step == 1}
    <div class="centered">
        <Button class="primary" style="width: 30vw" on:click={() => step = 2}>Tabella</Button>
        <Button class="primary" style="width: 30vw" on:click={() => step = 3}>Grafico</Button>
        <Button class="primary" style="width: 30vw" on:click={getPdf}>Download pdf</Button>
        <div class="buttonFooter aloneStart">
            <Button style="width: 30vw" on:click={() => step = 0}>Indietro</Button>
        </div>
    </div>
{/if}
{#if step == 2}
    <div class="centered">
        <DataSelector dati={dati} on:showData={(e) => {_dataToShow=e.detail.data;_inquinanti = e.detail.inquinanti}}></DataSelector>
        <Table dataToShow={_dataToShow} inquinanti={_inquinanti}></Table>
        <Commenti></Commenti>
        <div class="buttonFooter">
            <Button class="secondary" on:click={() => {step = 1;}}>Indietro</Button>
            <Button class="primary" on:click={() => save()}>Salva</Button>
        </div>
    </div>
{/if}
{#if step == 3}
    <div class="centered">
        <DataSelector isPlot={true} dati={dati} on:showData={(e) => {console.log(e.detail); dataPlot = e}}></DataSelector>
        <Plot data={dataPlot}></Plot>
        <div id="commentiContainer">
            <Commenti></Commenti>
        </div>
        <div class="buttonFooter">
            <Button class="secondary" on:click={() => {step = 1;}}>Indietro</Button>
            <Button class="primary" on:click={() => save()}>Salva</Button>
        </div>
    </div>
{/if}
<style>

    .buttonFooter{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-end;
        width: 100%;
        height: 100%;
    }
    .aloneEnd{
        justify-content: flex-end;
    }
    .aloneStart{
        justify-content: flex-start;
    }
    .centered{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    #componentCommenti{
        margin: 2em;
    }

</style>
