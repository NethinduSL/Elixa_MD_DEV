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





 

cmd({
    pattern: "update",
    desc: "Update the Elix",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!authorizedNumbers.includes(senderNumber)) {
            return reply("❌ You are not authorized to use this command.");
        }

        const { exec } = require("child_process");
        const fs = require("fs-extra");
        const path = require("path");
        const updatePath = "./update";
        const pluginsPath = "./plugins";
        const repoURL = "https://github.com/Eboxsl/Elixa_MD.git";

        reply("🔄 Updating plugins...\nPlease wait...");

        // Check if `update` folder exists, and delete it if found
        if (fs.existsSync(updatePath)) {
            fs.removeSync(updatePath);
            console.log("Previous update folder deleted.");
        }

        // Step 1: Clone the full repository into the `update` folder
        exec(`git clone --depth=1 ${repoURL} ${updatePath}`, (cloneError, cloneStdout, cloneStderr) => {
            if (cloneError) {
                console.error(`Error cloning repository: ${cloneError.message}`);
                return reply(`❌ Error: ${cloneError.message}`);
            }

            if (cloneStderr) {
                console.error(`Standard error during clone: ${cloneStderr}`);
            }

            // Step 2: Delete all files in the `plugins` folder
            if (fs.existsSync(pluginsPath)) {
                fs.removeSync(pluginsPath);
            }

            // Step 3: Copy files from `update/plugins` to `plugins`
            const newPluginsPath = path.join(updatePath, "plugins");
            if (fs.existsSync(newPluginsPath)) {
                fs.copySync(newPluginsPath, pluginsPath);
                reply("✅ Plugins updated successfully! Restarting the bot...");

                // Step 4: Restart the bot
                exec("pm2 restart all", (restartError, restartStdout, restartStderr) => {
                    if (restartError) {
                        console.error(`Error restarting bot: ${restartError.message}`);
                        return reply(`❌ Restart Error: ${restartError.message}`);
                    }

                    if (restartStderr) {
                        console.error(`Standard error during restart: ${restartStderr}`);
                    }

                    reply("🔄 Restart completed. Use .updateL✅🇱🇰 to confirm update.");

                    // Step 5: Clean up by removing the `update` folder
                    if (fs.existsSync(updatePath)) {
                        fs.removeSync(updatePath);
                        console.log("Temporary update folder deleted successfully.");
                    }
                });
            } else {
                reply("❌ Error: Plugins folder not found in the repository.");
                if (fs.existsSync(updatePath)) {
                    fs.removeSync(updatePath); // Clean up even if an error occurs
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
