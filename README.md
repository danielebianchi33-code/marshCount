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
   (la lista dei 6 utenti è già dentro; non serve cambiare nulla).
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

Per controllare che lo script sia aggiornato: nel riquadro **Sincronizzazione** tocca **Verifica script**
(oppure apri l'indirizzo `/exec` nel browser: deve comparire `"foto":true`). Le foto non ancora caricate
si vedono con ⏳ (in attesa) o ⚠️ (errore) accanto alla miniatura, e si rimandano con **Invia foto in attesa**.

## Notifiche push (Firebase)

Quando qualcuno registra una cattura, gli altri telefoni ricevono: chi ha preso il pesce, il pesce, il punteggio finale
e una frase per consolarsi. Non arriva a chi ha inserito la cattura né al pescatore che l'ha presa.

Una volta sola, tu:
1. console.firebase.google.com > Aggiungi progetto (Analytics non serve).
2. Impostazioni progetto > Generali > Le tue app > icona Web `</>` > registra l'app: copia i valori `firebaseConfig`.
3. Impostazioni progetto > Cloud Messaging > Configurazione web > Genera coppia di chiavi: copia la chiave pubblica (`vapidKey`).
4. Impostazioni progetto > Account di servizio > Genera nuova chiave privata: scarica il file JSON (resta segreto).
5. Apps Script > Impostazioni progetto > Proprietà script, aggiungi:
   - `FIREBASE_WEB_CONFIG` = {"apiKey":"…","authDomain":"…","projectId":"…","storageBucket":"…","messagingSenderId":"…","appId":"…","vapidKey":"…"}
   - `FCM_SERVICE_ACCOUNT` = l'intero contenuto del file JSON del punto 4
6. Sostituisci il codice dello script con il nuovo `marshcount-script.gs`, esegui `autorizza` (concedi i permessi) e crea una **nuova versione** della distribuzione.

Su ogni telefono: installa l'app (iPhone: Safari > Condividi > Aggiungi alla schermata Home, iOS 16.4 o successivo, e apri dall'icona),
poi in fondo alla home apri **Notifiche push**, scegli chi sei e tocca **Attiva notifiche** e poi **Invia notifica di prova**.

## Login (solo i 6 pescatori)

Per entrare servono email e password. Entrano solo i 6 pescatori elencati in `USERS` nello script
(nessuno può registrarsi). Le password non sono scritte da nessuna parte: nello script ci sono solo
sale e impronta (hash), e nell'app non c'è nessuna email.

- Il **primo accesso** su ogni telefono richiede la rete e l'indirizzo `/exec` dello script (si inserisce una volta sola).
  Poi l'accesso resta memorizzato, anche offline, fino a **Esci** (in fondo alla home).
- Dopo 5 tentativi sbagliati l'accesso si blocca per 15 minuti.
- Il riquadro **Sincronizzazione** non chiede più la password condivisa: usa l'accesso del login.
- Il telefono associa da solo l'utente al suo pescatore: le notifiche push usano quel nome.
- **Per aggiornare lo script prima dell'app:** incolla il nuovo `marshcount-script.gs`, Distribuisci > Gestisci distribuzioni > Nuova versione.
  Poi carica `index.html` e `sw.js` su GitHub. I telefoni con la vecchia versione dell'app non sincronizzano più finché non si aggiornano.
- **Cambiare una password:** serve una nuova impronta nello script (chiedila a Claude): i vecchi accessi di quell'utente smettono di valere.
- **Disconnettere tutti:** in Apps Script > Impostazioni progetto > Proprietà script, elimina `TOKEN_SECRET`.

## Amministratori e utenti normali

- **Amministratori** (all'inizio DaDo e Jonny): creano e modificano eventi, scelgono partecipanti e pesci dell'evento,
  gestiscono il catalogo pesci, sorteggiano e cambiano le coppie, importano i backup.
- **Utenti normali**: inserendo catture e biscotti per sé e per i compagni del proprio gruppo (coppia o trio del turno),
  possono anche cancellarli. Vedono tutto il resto, ma non lo modificano. Consigli e profili restano aperti a tutti.
- La casella **Amministratore** è nel profilo di ogni pescatore e la cambiano solo gli amministratori. Deve restare almeno un amministratore.
- I limiti li fa rispettare anche lo script (non solo i pulsanti). Un cambio di ruolo arriva ai telefoni con la prossima sincronizzazione.
- Gli amministratori iniziali sono in `DEFAULT_ADMINS` nello script; una volta cambiati dall'app, vale la lista salvata nelle Proprietà script (`ADMINS`).

## Notifica di sorpasso

Dopo ogni modifica fatta su un telefono (pesce, biscotto, cancellazione, cambio di coppie) l'app confronta la classifica
dell'evento con quella di prima. Chi era davanti e ora sta dietro riceve una notifica con i nomi di chi lo ha superato
e il suo punteggio attuale. Un pareggio non è un sorpasso. La notifica parte dal telefono che ha fatto la modifica
(non da quelli che ricevono i dati dopo) e non arriva a chi sorpassa. Per usarla serve lo script aggiornato.

## Link d'invito (niente indirizzo da incollare)

Dopo il login, in fondo alla home il pulsante **Copia link d'invito** copia un link del tipo
`https://TUO-UTENTE.github.io/marshcount/?s=INDIRIZZO-DELLO-SCRIPT`. Mandalo ai 6 pescatori: aprendolo, l'app memorizza
l'indirizzo (poi lo toglie dalla barra) e il login chiede solo email e password. L'indirizzo non è scritto nel codice su GitHub.
Se l'app è già collegata, il link non cambia nulla. Su iPhone apri il link in Safari, aggiungi l'app alla schermata Home e aprila da lì:
se il campo dell'indirizzo ricompare, incolla l'indirizzo una volta (si fa una volta sola).

## Foto di pesci e profili su Drive

Le foto dei pesci (caricate da un amministratore) e quelle dei profili vanno nella stessa cartella di Drive delle foto delle
catture (`MarshCount foto`). Nei dati viaggia solo il loro codice: gli altri telefoni scaricano la foto e la tengono in memoria,
quindi non si perdono più, nemmeno cancellando i dati del sito o cambiando telefono. Le foto già presenti sui telefoni
(amministratori per i pesci, ognuno per il proprio profilo) vengono caricate in automatico alla prima sincronizzazione dopo
l'aggiornamento. Serve lo script aggiornato (nuova versione della distribuzione).

## Profili

I profili (nomi, descrizioni, foto) li modificano solo gli amministratori, sia nell'app sia nello script. Serve lo script aggiornato.

## Consigli

I consigli vanno sul foglio (righe `idea:`). Solo gli amministratori vedono il pulsante "Elimina"; lo script rifiuta le eliminazioni degli altri. Un consiglio eliminato resta sul foglio come riga marcata come cancellata.

## Frasi delle notifiche

L'archivio `NOTIF_DB` dentro `index.html` contiene 100 frasi per le catture e 100 per i sorpassi. Ogni telefono le pesca a rotazione, senza ripeterne una finché non sono uscite tutte. Il file `notifiche-db.json` (nella cartella del progetto) è la stessa lista in forma leggibile.
