# University of Catania - Web Programming - Homework 2

## Sito Web realizzato mediante utilizzo del Framework Laravel

## Feauture:

-   4 tipologie di login: studente, preside, docente, segretario;
-   logout;

-   Signup come amministratore (Lavoratore - segretario);

Profilo studente:

-   visualizzazione voti;
-   visualizzazione presenze;
-   visualizzazione orario scolastico;
-   messaggistica tra gli studenti appartenenti alla stessa classe;

Profilo preside:

-   aggiunta circolari;

Profilo docente:

-   aggiunta/modifica voti;
-   aggiunta/modifica presenze;
-   visualizzazione orario scolastico;

Profilo segretario:

-   aggiunta/modifica studente;
-   aggiunta/modifica lavoratore (preside, docente, segretario);
-   aggiunta insegnamento;

Nella homepage sono mostrati dinamicamente:

-   sedi;
-   docenti;
-   circolari;

E' possibile in qualsiasi momento (sia avendo effettuato login che non) accedere alla sezione attivita' dalla navbar, all'interno della quale e' possibile utilizzare
due API REST:

-   mathJS, che permette di risolvere equazioni;
-   Harvard Art Museums API, che permette di accedere alle gallerie dell'harvard art museum;

Note:

-   configurazione nome database nel file dbconfig.php. Nome attuale: "scuola3".
-   All'aggiunta di utenti da parte del segretario (sia studente che lavoratore) inserie mail valida, in quanto la password per accedere col nuovo account inserito verra'
    inviata via mail tramite API SendGrid.
-   nella homepage, nella sezione 'docenti' sono listati i docenti che hanno un insegnamento attivo, per visualizzare altri docenti oltre a quello inserito mediante la query all'interno del file 'struttura.sql', e' necesssario aggiungere un docente dalla sezione 'aggiungi lavoratore' e un insegnamento relativo al docente dalla sezione 'aggiungi insegnamento', entrambe accessibili dal profilo di un segretario.
