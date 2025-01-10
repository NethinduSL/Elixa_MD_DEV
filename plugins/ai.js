const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson, getBuffer } = require('../lib/functions');




cmd({
    pattern: "aiimg",
    category: "ai",
    react: "🎆",
    filename: __filename,
    desc: "AI image generator"
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide the text to generate the image.");
        }

        const text = args.join(" ");
        const aiimg = `https://bk9.fun/ai/magicstudio?prompt=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(aiimg);

        await conn.sendMessage(from, { image: buffer, caption: `Here is your generated image for: ${text}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        mek.reply("An error occurred while generating the image. Please try again.");
    }
});



cmd({
    pattern: "ai",
    desc: "AI Search for advanced information retrieval.",
    category: "ai",
    react: "😎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/GPT4o?q=${q}&userId=${senderNumber}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});





cmd({
    pattern: "gemini",
    desc: "Interact with Gemini AI, a versatile model.",
    category: "ai",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/gemini?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "llama",
    desc: "Explore with the insightful Llama AI.",
    category: "ai",
    react: "🦙",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/llama?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "blackbox",
    desc: "Jeeves AI, your personal assistant for queries.",
    category: "ai",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/blackbox?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "jeeves",
    desc: "BlackBox AI, the innovator's choice.",
    category: "ai",
    react: "🫡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/jeeves-chat?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "aiserch",
    desc: "AI Search for advanced information retrieval.",
    category: "ai",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let data = await fetchJson(`https://bk9.fun/ai/ai-search?q=${q}`);
        return reply(`${data.BK9}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`);
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
