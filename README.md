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
