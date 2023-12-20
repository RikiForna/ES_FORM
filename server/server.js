"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");
let strObj;

let server = http.createServer((richiesta, risposta) => {
  let indirizzo = richiesta.headers.host + richiesta.url;
  let infoUrl = url.parse(indirizzo, true);

  let header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  console.log(infoUrl.pathname);
  switch (infoUrl.pathname) {
    case "/auto":
      fs.readFile("auto.json", (err, file) => {
        if (!err) {
          header["Content-Type"] = "application/json";
          risposta.writeHead(200, header);
          risposta.end(file);
          console.log(header);
        }
      });
      break;

    case "/register":
      strObj = "";

      richiesta.on("data", (dato) => {
        strObj += dato;
      });

      richiesta.on("end", () => {
        try {
          console.log("DATA: " + strObj);

          // parsifico il dato da stringa a oggetto js
          let obj = JSON.parse(strObj);

          fs.readFile("users.json", (err, file) => {
            if (!err) {
              const utenti = JSON.parse(file);

              const utenteEsistente = utenti.find(
                (utente) => utente.mail === obj.mail
              );

              if (!utenteEsistente) {
                // Se l'utente non esiste, lo aggiungo
                utenti.push(obj);

                // Scrivo l'obj su file con i dati aggiunti
                fs.writeFile(
                  "users.json",
                  JSON.stringify(utenti, null, 2),
                  (err) => {
                    if (!err) {
                      risposta.writeHead(200, { "Content-Type": "text/plain" });
                      risposta.end(utenteEsistente);
                    }
                  }
                );
              } else {
                // Se l'utente esiste già, restituisci un messaggio
                risposta.writeHead(200, { "Content-Type": "text/plain" });
                risposta.end("Utente già presente");
              }
            }
          });
        } catch (error) {
          console.error("Errore durante il parsing JSON:", error);
          risposta.writeHead(400, { "Content-Type": "text/plain" });
          risposta.end("Dati non validi o malformati");
        }
      });

      break;

    case "/controllaUtente":
      strObj = "";
      let trovato = false;

      richiesta.on("data", (dato) => {
        strObj += dato;
      });

      richiesta.on("end", () => {
        console.log("DATA: " + strObj);
        let obj = JSON.parse(strObj);

        fs.readFile("users.json", (err, file) => {
          if (!err) {
            const utenti = JSON.parse(file);

            utenti.forEach((utente) => {
              if (utente.mail == obj.mail && utente.pwd == obj.pwd)
                trovato = true;
            });

            console.log(trovato);

            header["Content-Type"] = "application/json";
            risposta.writeHead(200, header);
            risposta.end(trovato.toString());
            console.log(header);
          }
        });
      });

      break;

    case "/infoAutomobile":
      let id_automobili = "";
      let automobili = "";

      richiesta.on("data", (dato) => {
        id_automobili += dato;
      });

      richiesta.on("end", () => {
        console.log("DATA: " + id_automobili);

        fs.readFile("auto.json", (err, file) => {
          if (!err) {
            const arrAutomobili = JSON.parse(file);

            arrAutomobili.forEach((autoObj) => {
              if (autoObj.id_automobili == id_automobili) automobili = autoObj;
            });

            risposta.writeHead(200, { "Content-Type": "application/json" });
            risposta.end(JSON.stringify(automobili));
          }
        });
      });
      break;

    case "/compraAutomobile":
      strObj = "";

      richiesta.on("data", (dato) => {
        strObj += dato;
      });

      richiesta.on("end", () => {
        console.log("DATA:" + strObj);
        let obj = JSON.parse(strObj);

        fs.readFile("vendita.json", (err, file) => {
          if (err) {
            console.error(
              "errore nella lettura del file delle vendite.json",
              err
            );
            risposta.writeHead(500, { "Content-Type": " text/plain" });
            risposta.end("Errore interno");
            return;
          }

          const automobiliArr = JSON.parse(file);

          automobiliArr.push(obj);

          fs.writeFile(
            "autoSell.json",
            JSON.stringify(automobiliArr, null, 2),
            (err) => {
              risposta.writeHead(200, { "Content-Type": "application/json" });
              risposta.end("Dati aggiunti");
            }
          );
        });
      });
      break;
  }
});

// fondamentale per avviare il server
server.listen(1337);
console.log("il server è avviato sulla porta 1337");
