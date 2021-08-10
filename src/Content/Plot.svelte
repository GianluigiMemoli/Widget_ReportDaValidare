<script>
    import DataSelector from "./DataSelector.svelte";
    import Chart from 'chart.js/auto';

    export let data;
    $: if(data){
        draw(data);
    }
    let ctx;
    function getDataForAxes(valueName, values){
        let data  = [];
        values.forEach(record => {
            if(record.hasOwnProperty(valueName)){
                data.push(record[valueName]);
            }
        })
        return data;
    }
    let plot;
    function draw(payload){
        let dataToPlot = payload.detail;
        console.log(dataToPlot);
        let yAxis = getDataForAxes("timestamp",dataToPlot.data);
        let xAxis = getDataForAxes(dataToPlot.inquinante, dataToPlot.data);
        if(plot){
            plot.destroy();
        }
         plot = new Chart(ctx, {
            type: "line",
            data: {
                labels: yAxis,
                datasets: [{
                    label: dataToPlot.inquinante,
                    data: xAxis
                }]
            }
        })
    }

</script>


<div id="chartContainer">
    <canvas id="plot" width="500" height="500" bind:this={ctx}>

    </canvas>
</div>

<style>
    #chartContainer{
        margin: 2em;
    }
</style>
