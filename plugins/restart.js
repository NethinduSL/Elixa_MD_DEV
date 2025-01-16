const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

const authorizedNumbers = [...config.OWNER_NUMBER, "94763936166", "94766428832","94770463141"];

cmd({
    pattern: "restart",
    desc: "restart the Elix",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!authorizedNumbers.includes(senderNumber)) {
            return reply("❌ You are not authorized to use this command.");
        }

        const { exec } = require("child_process");
        reply("Restarting Elixa✅🇱🇰...\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
        await sleep(1500);

        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restarting: ${error.message}`);
                return reply(`❌ Error: ${error.message}`);
            }

            if (stderr) {
                console.error(`Standard error: ${stderr}`);
                return reply(`⚠️ Warning: ${stderr}`);
            }

            console.log(`Standard output: ${stdout}`);
            reply("✅ Elix restarted successfully!");
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});







cmd({
    pattern: "updatec",
    desc: "update details of the Elix",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!authorizedNumbers.includes(senderNumber)) {
            return reply("❌ You are not authorized to use this command.");
        }

        const { exec } = require("child_process");
        reply("After restart Send .updateL✅🇱🇰...\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
        await sleep(1500);

        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error restarting: ${error.message}`);
                return reply(`❌ Error: ${error.message}`);
            }

            if (stderr) {
                console.error(`Standard error: ${stderr}`);
                return reply(`⚠️ Warning: ${stderr}`);
            }
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
