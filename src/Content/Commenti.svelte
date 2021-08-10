<script>
    import {beforeUpdate} from "svelte";
    import {get} from "svelte/store";
    import {Textarea,ListItem, Button, Icon, List, Subheader} from "svelte-materialify";
    import  {mdiPlus} from "@mdi/js";
    import {commenti} from "./stores";
    let _commenti;
    let showComp = false;
    beforeUpdate(() => {
       _commenti = get(commenti);
       console.log(_commenti);
    });
    let value="";
    function addCommento(){
        _commenti.push(value);
        value = "";
        commenti.update((self) => self = _commenti);
    }
    function removeCommento(idx){
        console.log(idx);
        _commenti.splice(idx, 1);
        _commenti = _commenti;
        commenti.update((self) => self = _commenti);
    }
</script>
{#if showComp}
    <div id="componentCommenti">
        <div id="textArea">
            <Textarea noResize outlined bind:value style="max-width: 30vw; height: 10vh;">Commenti<Button primary fab size="small" slot="append" on:click={addCommento}><Icon path={mdiPlus}></Icon></Button></Textarea>
        </div>
        <div id="commentiList">
            <List style="max-height: 30vh; overflow-y: scroll">
            <Subheader>Commenti</Subheader>
            {#each _commenti as commento, idx}
                <ListItem on:click={() => removeCommento(idx)}>{commento}</ListItem>
            {/each}
            </List>
        </div>
    </div>
    {:else}
    <Button on:click={() => showComp = !showComp}>Commenti</Button>
{/if}
<style>
    #componentCommenti{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 5%;

    }
    #textArea{
        width: 60%;
    }
    #commentiList{
        width: 30%;

    }
</style>
