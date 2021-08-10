const draftUrl = "https://sqd.sensesquare.eu:5002/richiesta_draft";

let apikey =  '2HHWGTKFP7XQ';

export async function getDrafts(){
    const data = new FormData();
    data.append("apikey", apikey);
    return await fetch(draftUrl, {
        method: "POST",
        body: data
    }).then(r => r.json());
}

export async function reportFinale(draft, commenti){
    const data = new FormData();
    data.append("apikey", apikey);
    data.append("progetto", draft.progetto);
    data.append("periodo", draft.periodo);
    draft.dati.commenti = commenti;
    data.append("dati", JSON.stringify(draft.dati));
    data.append("frequenza", draft.frequenza);

    return await fetch("https://sqd.sensesquare.eu:5002/report_finale", {
        body: data,
        method: "POST",

    }).then(r => r.json());

}
export async function downloadPDF(draft){

    const formData = new FormData();
    formData.append("dati", JSON.stringify(draft.dati));
    formData.append("apikey", apikey);
    return await fetch("https://sqd.sensesquare.eu:5002/richiesta_report",{
        method: "POST",
        body: formData
    }).then(response =>
        response.blob()
    )
        .then(blob => {

            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = draft.progetto+".pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
}
