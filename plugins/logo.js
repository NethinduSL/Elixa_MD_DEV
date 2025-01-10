/*const maker = require('mumaker');
const config = require('../config');
const { cmd, commands } = require('../command');

let cap = `> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;

cmd({
    pattern: "deepsea", 
    category: "textpro",
    react:"🎆",
    desc: "Some text to image feature with various styles."
}, async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
    const text = args.join(" ").trim();
    
    if (!text) return reply('_Need text._');

    try {
        let anu = await maker.textpro('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', text);
        if (anu.image) {
            await conn.sendMessage(from, { image: { url: anu.image }, caption: cap }, { quoted: mek });
        } else {
            reply('_Error generating image._');
        }
    } catch (error) {
        console.error(error);
        reply('_Something went wrong. Try again later._');
    }
});*/
