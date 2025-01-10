const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "nethindu",
    desc: "A creter of bot",
    category: "owner",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Fetching data from the GitHub repository
        const response = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
        
        // Access the NT value from the response data
        const ntValue = response.data.NT;  // Ensure this is correct based on the response structure
        
        // Send the NT value in the reply
        await reply(`${ntValue}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 ‐𝝡𝗗༺`);
        
        // React to the message
        await conn.sendMessage(from, {
            react: { text: '🖥️', key: mek.key }
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);  // Log the error for debugging
        await reply("An error occurred while processing the request.");
    }
});


cmd({
    pattern: "jithula",
    desc: "A creater of bot",
    category: "owner",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Fetching data from the GitHub repository
        const response = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
        
        // Access the NT value from the response data
        const JBValue = response.data.JB;  // Ensure this is correct based on the response structure
        
        // Send the NT value in the reply
        await reply(`${JBValue}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 ‐𝝡𝗗༺`);
        
        // React to the message
        await conn.sendMessage(from, {
            react: { text: '❤️', key: mek.key }
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);  // Log the error for debugging
        await reply("An error occurred while processing the request.");
    }
});



cmd({
    pattern: "updatel",
    desc: "update bot",
    category: "owner",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Fetching data from the GitHub repository
        const response = await axios.get('https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/publicconfig.js');
        
        // Access the NT value from the response data
        const upValue = response.data.UPDATE;  // Ensure this is correct based on the response structure
        
        // Send the NT value in the reply
        await reply(`${upValue}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 ‐𝝡𝗗༺`);
        
        // React to the message
        await conn.sendMessage(from, {
            react: { text: '❤️', key: mek.key }
        });

    } catch (error) {
        console.error("Error fetching data:", error.message);  // Log the error for debugging
        await reply("An error occurred while processing the request.");
    }
});
