# Hetzner Status to Discord Webhook

Dieses Node.js-Skript bietet eine schnelle und effiziente Methode, um Statusaktualisierungen von Hetzner direkt an einen Discord-Channel über einen Webhook zu senden. Speziell für Ereignisse in der Region Frankfurt optimiert, holt das Skript die neuesten Einträge aus dem Hetzner Status Atom-Feed, filtert sie nach Relevanz und formatiert sie anschließend für eine klare und präzise Darstellung in Discord.

## Funktionen

- **Automatische Abfrage**: Holt regelmäßig Status-Updates von Hetzner über deren öffentlichen Atom-Feed.
- **Discord-Integration**: Sendet formatierte Nachrichten über einen vordefinierten Discord Webhook.
- **Zeitstempel-Konvertierung**: Wandelt ISO-Datumsangaben in Discord-kompatible Zeitstempel um.
- **Filterung nach Region**: Speziell auf Ereignisse in Frankfurt abgestimmte Filterung der Feed-Einträge.

## Abhängigkeiten

- `axios` für HTTP-Anfragen.
- `xml2js` zur Umwandlung von XML-Antworten in JavaScript-Objekte.
- `moment` zur Verarbeitung und Konvertierung von Datumsangaben.

## Schnellstart

1. Installieren Sie die erforderlichen Pakete:
   ```bash
   npm install axios xml2js moment
   
   node hetznerbot.js

