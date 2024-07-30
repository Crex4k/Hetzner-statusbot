🚀 Hetzner Status to Discord Webhook
Dieses Node.js-Skript bietet eine schnelle und effiziente Methode, um Statusaktualisierungen von Hetzner direkt an einen Discord-Channel über einen Webhook zu senden. Speziell für Ereignisse in der Region Frankfurt optimiert, holt das Skript die neuesten Einträge aus dem Hetzner Status Atom-Feed, filtert sie nach Relevanz und formatiert sie anschließend für eine klare und präzise Darstellung in Discord.

🔧 Funktionen
Automatische Abfrage: Holt regelmäßig Status-Updates von Hetzner über deren öffentlichen Atom-Feed.
Discord-Integration: Sendet formatierte Nachrichten über einen vordefinierten Discord Webhook.
Zeitstempel-Konvertierung: Wandelt ISO-Datumsangaben in Discord-kompatible Zeitstempel um.
Filterung nach Region: Speziell auf Ereignisse in Frankfurt abgestimmte Filterung der Feed-Einträge.

📦 Abhängigkeiten
axios für HTTP-Anfragen.
xml2js zur Umwandlung von XML-Antworten in JavaScript-Objekte.
moment zur Verarbeitung und Konvertierung von Datumsangaben.

🚀 Schnellstart
Installieren Sie die erforderlichen Pakete:
bash
Code kopieren
npm install axios xml2js moment
Konfigurieren Sie Ihre Webhook-URL in webhookUrl.
Starten Sie das Skript, um sofortige Statusaktualisierungen zu erhalten und alle 30 Minuten nach neuen Updates zu suchen:
bash
Code kopieren
node hetznerStatusToDiscord.js

💡 Verwendung
Das Skript ist ideal für Systemadministratoren und Entwickler, die Dienststatus von Hetzner überwachen und proaktiv über geplante oder ungeplante Ausfälle informiert sein möchten, insbesondere für Dienste in der Frankfurt-Region. Setzen Sie das Skript ein, um Ihr Team über Discord auf dem Laufenden zu halten!
