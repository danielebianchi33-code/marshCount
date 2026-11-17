# MarshCount

Flyendship - Pess, grapin e capott

App per sorteggiare le coppie, registrare il pescato e vedere la classifica.
Funziona anche senza connessione e si installa su Android e iPhone (PWA).

## Pubblicare su GitHub Pages

1. Crea un repository su github.com (ad esempio `marshcount`).
2. Carica tutti i file di questa cartella nella radice del repository.
3. Vai in **Settings > Pages**, scegli **Deploy from a branch**, ramo `main`, cartella `/ (root)`, e salva.
4. Dopo un minuto l'app è online su `https://TUO-UTENTE.github.io/marshcount/`.

## Installare sul telefono

- **Android (Chrome):** apri il link, menu a tre puntini, **Installa app**.
- **iPhone (Safari):** apri il link, tasto Condividi, **Aggiungi alla schermata Home**.

Dopo la prima apertura con connessione, l'app funziona anche offline.

## Aggiornare l'app

Sostituisci `index.html` (e gli altri file modificati) nel repository e cambia il numero
`CACHE = "marshcount-v1"` in `sw.js` (ad esempio `v2`). I telefoni si aggiornano alla
apertura successiva con connessione.

## Dati

I dati (partecipanti, eventi, catture, foto) restano nella memoria di ogni telefono: non
vengono inviati da nessuna parte e non sono condivisi tra telefoni diversi. Usa
**Backup completo** nella home per salvarli o spostarli.

## Sincronizzazione condivisa (Google Fogli)

1. Crea un Google Foglio vuoto (ad esempio `MarshCount`).
2. Estensioni > Apps Script: incolla il contenuto di `marshcount-script.gs` (file a parte, non va su GitHub)
   e cambia la password nella prima riga.
3. Distribuisci > Nuova distribuzione > App web. Esegui come: io. Chi ha accesso: chiunque. Autorizza i permessi.
4. Copia l'indirizzo che finisce con `/exec`.
5. In MarshCount, in fondo alla home, apri **Sincronizzazione (Google Fogli)**, incolla indirizzo e password
   e tocca **Salva e collega**. Si fa una volta per telefono: il primo telefono carica i dati, gli altri li scaricano.

La sincronizzazione funziona solo dall'app pubblicata (GitHub Pages) o installata, non dall'anteprima di Claude.
Se modifichi lo script, crea una **nuova distribuzione** o aggiorna la versione di quella esistente.

## Foto delle catture (Google Drive)

Quando registri una cattura puoi spuntare **Allega la foto del pesce**, oppure aggiungerla dopo con il pulsante 📷
accanto alla cattura. La foto intera va in una cartella di Google Drive (di default `MarshCount foto`, nome
modificabile in cima a `marshcount-script.gs`); la miniatura viaggia insieme ai dati e si vede su tutti i telefoni.

Per attivarlo, aggiorna lo script (l'indirizzo `/exec` **non cambia** se aggiorni la distribuzione esistente):
1. Apps Script: sostituisci tutto il codice con quello di `marshcount-script.gs` e rimetti la tua password.
2. Dal menu delle funzioni scegli `autorizza` e premi **Esegui**: concedi l'accesso a Google Drive.
3. Distribuisci > Gestisci distribuzioni > matita (modifica) > Versione: **Nuova versione** > Distribuisci.

Senza rete la foto resta in coda sul telefono e parte da sola appena torna la connessione.
