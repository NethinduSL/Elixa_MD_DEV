const config = require('../config');
const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const fg = require('api-dylux');
const { fetchJson } = require('../lib/functions');

const { Buffer } = require('buffer');
// Song download command
cmd({
    pattern: "song2",
    desc: "Download Songs By Elixa.",
    category: "download",
    react:"🎵",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide a valid song name or URL 🙃");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ɪꜰ ɴᴏᴛ ᴡᴏʀᴋ ᴜꜱᴇ ꜱᴏɴɢ
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Fetching the song download URL from API
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${url}`;
        const response = await axios.get(apiUrl);
        const data2 = response.data;

        if (!data2.success || !data2.result) {
            return reply("Failed to download the song 🙃");
        }

        const { download_url, title } = data2.result;

        // Send audio as a playable file
        await conn.sendMessage(from, {
            audio: { url: download_url },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: mek });

        // Send audio as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong 🙃"}`);
    }
});

// Video download command
cmd({
    pattern: "video2",
    desc: "Download video By Elixa.",
    category: "download",
    react:"🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide a valid video name or URL 🙃");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗶𝗱𝗲𝗼 🎬 ❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ɪꜰ ɴᴏᴛ ᴡᴏʀᴋ ᴜꜱᴇ ᴠɪᴅᴇᴏ
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Fetching the video download URL from API
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${url}`;
        const response = await axios.get(apiUrl);
        const data2 = response.data;

        if (!data2.success || !data2.result) {
            return reply("Failed to download the video 🙃");
        }

        const { download_url, title } = data2.result;

        // Send video as a playable file
        await conn.sendMessage(from, {
            video: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`
        }, { quoted: mek });

        // Send video as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || "Something went wrong 🙃"}`);
    }
});




cmd({
    pattern: "songurl",
    desc: "Download Songs By Elixa.",
    react:"🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) {
            return reply("Please provide a valid song name or URL 🙃");
        }

        // Notify user about the download initiation
        await conn.sendMessage(from, { text: "Downloading 🎵" }, { quoted: mek });

        // Primary download method
        try {
            const down = await fg.yta(q); // Assuming `fg.yta` is a function for downloading YouTube audio
            const { dl_url: downloadUrl, title } = down;

            await conn.sendMessage(from, { 
                audio: { url: downloadUrl }, 
                mimetype: "audio/mpeg" 
            }, { quoted: mek });

            return conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "audio/mp3",
                fileName: `${title}.mp3`,
                caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });

        } catch (primaryError) {
            console.warn("Primary method failed:", primaryError.message);
        }

        // Fallback method
        try {
            const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${q}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;

            if (!result || !result.download_url) {
                throw new Error("No results from API");
            }

            const { download_url: downloadUrl, title } = result;

            await conn.sendMessage(from, {
                audio: { url: downloadUrl },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

            return conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });

        } catch (fallbackError) {
            console.error("Fallback method failed:", fallbackError.message);
            return reply("Error: Both methods failed. Please try again later 🙃");
        }
    } catch (finalError) {
        console.error("Unexpected error:", finalError.message);
        return reply(`Error: ${finalError.message || "Something went wrong 🙃"}`);
    }
    
});





cmd({
    pattern: "videourl",
    desc: "Download Songs By Elixa.",
    react:"🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) {
            return reply("Please provide a valid song name or URL 🙃");
        }

        // Notify user about the download initiation
        await conn.sendMessage(from, { text: "Downloading 🎵" }, { quoted: mek });

        // Primary download method
        try {
            const down = await fg.yta(q); // Assuming `fg.yta` is a function for downloading YouTube audio
            const { dl_url: downloadUrl, title } = down;

            await conn.sendMessage(from, { 
                audio: { url: downloadUrl }, 
                mimetype: "audio/mpeg" 
            }, { quoted: mek });

            return conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "audio/mp3",
                fileName: `${title}.mp3`,
                caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });

        } catch (primaryError) {
            console.warn("Primary method failed:", primaryError.message);
        }

        // Fallback method
        try {
            const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${q}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;

            if (!result || !result.download_url) {
                throw new Error("No results from API");
            }

            const { download_url: downloadUrl, title } = result;

            await conn.sendMessage(from, {
            video: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`
        }, { quoted: mek });

        // Send video as a downloadable document
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
            caption: "®𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });


        } catch (fallbackError) {
            console.error("Fallback method failed:", fallbackError.message);
            return reply("Error: Both methods failed. Please try again later 🙃");
        }
    } catch (finalError) {
        console.error("Unexpected error:", finalError.message);
        return reply(`Error: ${finalError.message || "Something went wrong 🙃"}`);
    }
});




