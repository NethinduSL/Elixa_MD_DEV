
const config = require('../config');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const axios = require('axios');
const { fetchJson } = require('../lib/functions');
const { getBuffer } = require('../lib/functions');
const { Buffer } = require('buffer');

cmd({
    pattern: "song",
    desc: "Download Songs By Elixa.",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid song name or URL 🙃");

        let videoUrl;

        try {
            const search = await yts(q);
            if (!search.videos.length) throw new Error("No results found");

            const data = search.videos[0];
            videoUrl = data.url;

            const desc = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗦𝗼𝗻𝗴 🎵 ❱❱
│
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
┃ ɪꜰ ɴᴏᴛ ᴡᴏʀᴋꜱ ᴜꜱᴇ ꜱᴏɴɢ2
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

            await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

            const down = await fg.yta(videoUrl);
            const downloadUrl = down.dl_url;

            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
            return conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mp3", fileName: `${data.title}.mp3`, caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗" }, { quoted: mek });
        } catch (err) {
            console.warn("Primary method failed:", err.message);
            if (!videoUrl) throw new Error("No video URL found for fallback");
        }

        try {
            
    const response = await axios.get(`https://bk9.fun/download/youtube2?url=${videoUrl}`);
const { BK9 } = response.data; // Access the BK9 array directly

if (!BK9 || BK9.length === 0) {
    return;
}

const { mediaLink, title } = BK9[0]; // Accessing the first object in the BK9 array

// Sending audio message with mediaLink
await conn.sendMessage(from, {
    audio: { url: mediaLink },
    mimetype: "audio/mpeg",
    fileName: `${title}.mp3`
}, { quoted: mek });

// Sending document message with mediaLink
await conn.sendMessage(from, {
    document: { url: mediaLink },
    mimetype: "audio/mpeg",
    fileName: `${title}.mp3`,
    caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗🔥"
}, { quoted: mek });



            
            
            
        
    
/*    const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${videoUrl}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;
    
    
    if (!result || !result.download_url) throw new Error("No results from API");

//            const { download_url, title } = result;

            const { download_url, title } = result;

           await conn.sendMessage(from, {
                audio: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

            return conn.sendMessage(from, {
                document: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });


            const apiUrl = `https://api.giftedtech.my.id/api/download/dlmp3q?apikey=gifted&quality=128&url=${videoUrl}`;
            const response = await axios.get(apiUrl);
            const { result } = response.data;
    
    
    if (!result || !result.download_url) throw new Error("No results from API");

//            const { download_url, title } = result;

            const { download_url, title } = result;

           await conn.sendMessage(from, {
                audio: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`
            }, { quoted: mek });

            return conn.sendMessage(from, {
                document: { url: download_url },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
            }, { quoted: mek });


*/
        } catch (fallbackError) {
            console.error("Fallback method failed:", fallbackError.message);
            return reply(`Error: Both methods failed. Please try again later 🙃`);
        }
    } catch (finalError) {
        console.error("Unexpected error:", finalError.message);
        reply(`Error: ${finalError.message || "Something went wrong 🙃"}`);
    }
});





cmd({
    pattern: "video",
    desc: "Download videos By Elixa.",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL 🙃");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `        
╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗗 𝗩𝗶𝗱𝗲𝗼 🎬❱❱
┃
╰📌𝗧𝗶𝘁𝗹𝗲: ${data.title}
╰🔗𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${data.description}
╰🕦𝗧𝗶𝗺𝗲: ${data.timestamp}
╰📤𝗔𝗴𝗼: ${data.ago}
╰👁️𝗩𝗶𝗲𝘄𝘀: ${data.views}
╰═══════════════

> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: data.title + ".mp4", caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗" }, { quoted: mek });

    } catch (err) {
        console.warn("Primary method failed:", err.message);
        if (!videoUrl) throw new Error("No video URL found for fallback");
    }

    try {
        const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${videoUrl}`;
        const response = await axios.get(apiUrl);
        const { result } = response.data;

        if (!result || !result.download_url) throw new Error("No results from API");

        const { download_url, title } = result;

        await conn.sendMessage(from, {
            video: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`
        }, { quoted: mek });

        return conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
            caption: "𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗"
        }, { quoted: mek });

    } catch (fallbackError) {
        console.error("Fallback method failed:", fallbackError.message);
        return reply(`Error: Both methods failed. Please try again later 🙃`);
    }
});




cmd({
    pattern: "apk",
    desc: "Convert text to speech.",
    category: "download",
    filename: __filename,
    use: '<Enter your text here>',
}, async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const text = args.join(" ").trim();

        if (!text) {
            return reply("Please provide text to convert to speech.");
        }

        // Fetch the APK details
        const data = await axios.get(`https://bk9.fun/download/apk?id=${q}`);

        // Construct the message using the fetched data
        const message = `
╭❰𝗘ꟾ𝖎✘𝗮 𝗔𝗣𝗞❱❱
┃
╰📌 App: ${data.data.BK9.name}
╰📅 Last Updated: ${data.data.BK9.lastup}
╰🛠️ Package: ${data.data.BK9.package}
╰═══════════════
> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺
`;

        // Send the download link first
        
        // Sending the image and message
        await conn.sendMessage(from, {
            image: { url: data.data.BK9.icon },
            caption: message
        }, { quoted: mek });


const downloadMessage = `ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴘᴇᴇᴅ ɪꜱ ᴅᴇᴘᴇɴᴅ ᴏɴ ꜱᴇʀᴠᴇʀ ʀᴀᴍ ꜱᴏᴍᴇᴛɪᴍᴇꜱ ɪᴛ ᴍᴀʏ ʙᴇ ɴᴏᴛ ᴅᴏᴡɴʟᴏᴀᴅᴅᴇᴅ ᴛʜᴇɴ ᴜꜱᴇ ʟɪɴᴋ\n\n📥 Click the link to download the APK: ${data.data.BK9.dllink}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;
        await conn.sendMessage(from, {
            text: downloadMessage
        }, { quoted: mek });



        
        // Sending the APK file
        await conn.sendMessage(
            from,
            {
                audio: { url: data.data.BK9.dllink },
                mimetype: "application/vnd.android.package-archive",
                fileName: `${q}.apk`,
            }
        );

    } catch (error) {
        console.error("TTS Error:", error);
        return conn.reply(`An error occurred while generating the TTS audio: ${error.message}`);
    }
});




cmd({
    pattern: "ss",
    category: "download",
    filename: __filename,
    react: "🔥",
    desc: "Sends a screenshot of a website"
}, async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide a valid link to generate a screenshot.");
        }

        // Clean the provided URL
        let text = args.join(" ").trim();
        text = text.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\s+/g, '');

        // Ensure the URL is valid after cleaning
        if (!text.includes(".")) {
            return reply("The provided text doesn't look like a valid link. Please try again.");
        }

        // Construct the API URL for screenshot
        const apiUrl = `https://api.microlink.io/?url=https%3A%2F%2F${encodeURIComponent(text)}&screenshot=true&embed=screenshot.url`;

        // Fetch the screenshot
        const buffer = await getBuffer(apiUrl);

        // Send the screenshot image
        await conn.sendMessage(
            from, 
            { image: buffer, caption: `Here is your screenshot for: ${text}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺` }, 
            { quoted: mek }
        );
    } catch (e) {
        console.error(e);
        reply("An error occurred while generating the screenshot. Please try again.");
    }
});


cmd({
    pattern: "sspdf",
    category: "download",
    filename: __filename,
    react: "🔥",
    desc: "Sends a PDF of a website"
}, async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("Please provide a valid link to generate a PDF.");
        }

        let text = args.join(" ").trim();
        text = text.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\s+/g, '');

        if (!text.includes(".")) {
            return reply("The provided text doesn't look like a valid link. Please try again.");
        }

        const apiUrl = `https://api.microlink.io/?url=https%3A%2F%2F${encodeURIComponent(text)}&pdf=true&embed=pdf`;

        const response = await axios.get(apiUrl);
        const { status, url, size_pretty, type } = response.data;

        if (status !== "success" || type !== "pdf") {
            return reply("Failed to generate the PDF. Please try again.");
        }

        const pdfBuffer = await axios.get(url, { responseType: "arraybuffer" });

        const websiteName = text.split('.')[0];
        const fileName = `${text}_web.pdf`;

        await conn.sendMessage(
            from, 
            { 
                document: pdfBuffer.data, 
                mimetype: 'application/pdf', 
                fileName, 
                caption: `PDF generated for: ${text}\nFile Name: ${fileName}\nSize: ${size_pretty}\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺` 
            }, 
            { quoted: mek }
        );
    } catch (e) {
        console.error(e);
        reply("An error occurred while generating the PDF. Please try again.");
    }
});



cmd({
    pattern: "img",
    category: "download",
    react: "🌠",
    filename: __filename,
    desc: "Sends code of text"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {


try {

    if (args.length === 0) {
            return reply("Please provide the text to generate the QR code.");
        }

        const text = args.join(" ");
        // Fetch data from the API
        const apiURL = `https://bk9.fun/pinterest/search?q=${encodeURIComponent(text)}`;
        const { data } = await axios.get(apiURL);

        if (data.status && Array.isArray(data.BK9) && data.BK9.length > 0) {
            const images = data.BK9.slice(0, 5); // Get the first four images

            for (const image of images) {
                if (image.images_url) {
                    // Send each image to the chat
                    await conn.sendMessage(from, {
                        image: { url: image.images_url },
                        caption: `💫 ${image.grid_title || "No title provided"}\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`
                    }, { quoted: mek });
                }
            }

            reply("✅ Sent the first four images successfully!\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺");
        } else {
            reply("❌ No images found in the API response.");
        }
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the images.");
}
    
});

