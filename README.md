# Template widget

La seguente repository serve per la creazione di widget compatibili per il nuovo sistema dashboard sviluppato da Sense Square.

## [Come usare github?](https://www.notion.so/maxmoffa/Collaborare-con-Github-78e94ad0d10949aa98b8a0dd4c398116)
-> Nel caso specifico bisognerà eseguire un "fork" della repository e successivamente un "clone" della repository

## [Come usare Svelte?](https://www.notion.so/maxmoffa/Guida-Svelte-47899a33e26e4a77bdc3e581b9e38e9d)

## Get started

Esegui il fork usando il tasto in alto a destra denominato "fork" (clonera la repository sul tuo profilo)

Successivamente per iniziare a lavorare al progetto esegui il seguente comando da terminale (copierà il tuo fork sul computer che stai usando)

```bash
git clone https://github.com/Sense-Square/template-widget-container.git
```

Installa le dipendenze...

```bash
cd svelte-app
npm install
```

...dopo esegui [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Vai all'indirizzo [localhost:5000](http://localhost:5000). Dovresti poter vedere il contenuto di default del template.

Per procedere modifica il contenuto del file Widget.svelte e osserva i cambiamenti nel browser (esso è presente al path /src/Content).

Per modificare le configurazioni del widget (dimensioni, nome, id, ...), modifica il file Constants.js

## Funzionalità del widget

*Attenzione! Cancella esclusivamente le parti che fanno parte dell'esempio*

All'interno del widget saranno presenti delle funzionalità di base, esse sono relative ai caricamenti e a svariati messaggi informativi.

### showResult()
Questo comando consentirà di mostrare il contenuto del file widget.svelte, esso servirà alla fine di ogni caricamento

### showError(text)
Questo comando consentirà in caso di errore di spiegare all'utente cosa è successo (usare solo se l'errore verificatosi non consente il funzionamento del widget)

### showMaintenance(text)
Questo comando consentirà in caso di manutenzione di spiegare all'utente cosa sta succedendo

### showLoading(text)
Questo comando mostrerà all'utente una barra di caricamento generica (non mostra il progresso del caricamento)

### showProgressBar(text, value)
Questo comando mostrerà la barra di caricamento (mostra il progresso del caricamento), il parametro "value" indica il valore iniziale del caricamento

### updateProgressBar(text, value)
Questo comando consentirà di eseguire un update della barra di caricamento (in modo tale da aggiornare il progresso)

## Costanti del widget
All'interno del file "Constants.js" vi sono svariate costanti che possono essere modificate a seconda del widget che si vuole sviluppare

### THEME
la costante "THEME" non deve essere modificata, essa contiene i colori da usare nel widget (è importata di default nel file Widget.svelte)
![Esempio tema](https://raw.githubusercontent.com/MaxMoffa/public-files/main/Palette%20Colori.png)

### Widget Dimension
Le costanti presenti in questa sezione si riferiscono alla dimensione che il widget può assumere all'interno della griglia (prova a modificarli ed osserva i cambiamenti sul browser)
#### isResizable
Se impostata a false renderà il widget fisso, esso non potrà essere spostato o modificato nella pagina
#### WIDGET_DEFAULT_DIMENSION
Indica la dimensione di default del widget nella griglia
#### WIDGET_MAX_DIMENSION
Indica la dimensione massima del widget nella griglia
#### WIDGET_MIN_DIMENSION
Indica la dimensione minima del widget nella griglia