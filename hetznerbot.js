const axios = require('axios');
const xml2js = require('xml2js');
const moment = require('moment');

// Set your Discord webhook URL
const webhookUrl = 'YOUR-DISCORD-WEBHOOK-HERE';

// Function to convert ISO date to Discord timestamp format
function toDiscordTimestamp(isoDate) {
    const unixTimestamp = moment(isoDate).unix();
    return `<t:${unixTimestamp}:F>`;
}

// Variable to store the last status
let lastStatus = '';

async function fetchStatus() {
    try {
        const response = await axios.get('https://status.hetzner.com/de.atom');
        const parsedData = await xml2js.parseStringPromise(response.data);

        const entries = parsedData.feed.entry;
        if (!entries || entries.length === 0) {
            console.error('No entries found in the feed.');
            return [];
        }

        // Filter entries for Frankfurt
        const frankfurtEntries = entries.filter(entry => {
            const title = entry.title[0];
            return title.includes('Frankfurt');
        });

        return frankfurtEntries.map(entry => {
            const title = entry.title ? entry.title[0] : 'No title available';
            const category = entry.category ? entry.category[0].$.term : 'No category available';
            const updated = entry.updated ? entry.updated[0] : 'No update time available';
            let start = 'No start time available';
            let end = 'No end time available';
            let contentArray = [];
            if (entry.content && entry.content[0].div && entry.content[0].div[0].p) {
                contentArray = entry.content[0].div[0].p;
                contentArray = contentArray.filter(paragraph => {
                    if (paragraph.includes('Start:')) {
                        start = paragraph.replace('Start: ', '');
                        return false;
                    } else if (paragraph.includes('Vorraussichtliches Ende:')) {
                        end = paragraph.replace('Vorraussichtliches Ende: ', '');
                        return false;
                    }
                    return true;
                });
            }

            return { title, category, updated, contentArray, start, end };
        });
    } catch (error) {
        console.error('Error fetching the status:', error);
        return [];
    }
}

async function sendStatusToWebhook() {
    const statusUpdates = await fetchStatus();
    if (statusUpdates.length === 0) {
        console.log('No Frankfurt related updates found.');
        return;
    }

    // Create a string representation of the current status to compare with the last status
    const currentStatus = JSON.stringify(statusUpdates);

    if (currentStatus !== lastStatus) {
        lastStatus = currentStatus;

        statusUpdates.forEach(update => {
            const startTimestamp = toDiscordTimestamp(update.start);
            const endTimestamp = toDiscordTimestamp(update.end);
            const message = {
                content: `**${update.title}**\n**Category:** ${update.category}\n*Updated at: ${update.updated}*`,
                embeds: [
                    {
                        title: update.title,
                        description: `${update.contentArray.join('\n')}`,
                        fields: [
                            {
                                name: 'Start',
                                value: startTimestamp,
                                inline: true,
                            },
                            {
                                name: 'End',
                                value: endTimestamp,
                                inline: true,
                            }
                        ],
                        timestamp: new Date(),
                    },
                ],
            };

            axios.post(webhookUrl, message).then(() => {
                console.log('Message sent successfully');
            }).catch(error => {
                console.error('Error sending message:', error);
            });
        });
    } else {
        console.log('No changes detected in the status.');
    }
}

// Send the status updates immediately and then check every 30 minutes
sendStatusToWebhook();
setInterval(sendStatusToWebhook, 1800000); // 30 minutes
