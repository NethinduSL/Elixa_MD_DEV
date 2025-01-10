const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "news",
    category: "search",
    desc: "Fetch the latest news from the Hiru API.",
    use: "",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            const apiUrl = `https://bit-x-apis.vercel.app/hiru`;
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
                return reply(`*No news available at the moment* ❗`);
            }

            const { newsURL, title, image, text, Power } = data;

            let newsInfo = "📰 𝗟𝗮𝘁𝗲𝘀𝘁 𝗡𝗲𝘄𝘀 𝗔𝗧 𝗛𝗜𝗥𝗨\n\n";
            newsInfo += `📌 *Title*: ${title}\n\n`;
            newsInfo += `📖 *Details*:\n${text}\n\n`;
            newsInfo += `> 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 *${Power}*\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;

            if (image) {
                await conn.sendMessage(m.chat, {
                    image: { url: image },
                    caption: newsInfo,
                }, { quoted: m });
            } else {
                await conn.sendMessage(m.chat, { text: newsInfo }, { quoted: m });
            }

        } catch (error) {
            console.error(error);
            reply(`*An error occurred while fetching news* ❗`);
        }
    }
);
