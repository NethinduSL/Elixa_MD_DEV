const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config');
// Global premium feature flag
let premiumActive = true;
let down = true;

const imageUrl = "https://raw.githubusercontent.com/Eboxsl/ELAUTO/refs/heads/main/movie.png";

// Activate premium feature
cmd({
    pattern: "activepro",
    category: "premium",
    desc: "Activates premium feature for all users.",
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    premiumActive = true;
    console.log("Premium feature activated:", premiumActive);
    return reply(`*Premium feature activated for all users* ✅ By creator.`);
});

// Deactivate premium feature
cmd({
    pattern: "inactivepro",
    category: "premium",
    desc: "Deactivates premium feature for all users.",
    
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    premiumActive = false;
    console.log("Premium feature deactivated:", premiumActive);
    return reply(`*Premium feature deactivated for all users* ✅ By creator.`);
});



cmd({
    pattern: "downon",
    category: "premium",
    desc: "Activates premium feature for all users.",
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    down = true;
    console.log("Premium feature activated:", premiumActive);
    return reply(`*Premium feature activated for all users* ✅ By creator.`);
});

// Deactivate premium feature
cmd({
    pattern: "downoff",
    category: "premium",
    desc: "Deactivates premium feature for all users.",
    
    filename: __filename,
}, async (conn, mek, m, { senderNumber, reply }) => {
    const authorizedNumbers = [
        "94766428832",
        "94763936166",
        "94770463141",
        "94786874741",
        "94774534093"
    ];

    if (!authorizedNumbers.includes(senderNumber)) {
        return reply(`*This command is restricted to authorized numbers* ❗`);
    }

    down = false;
    console.log("Premium feature deactivated:", premiumActive);
    return reply(`*Premium feature deactivated for all users* ✅ By creator.`);
});

// Fetch movie details
cmd({
    pattern: "movies",
    category: "movie",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react: "🎬",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/movie?query=${encodeURIComponent(query)}`);
        const { data } = response;

        if (data.status !== "success" || !data.data || !data.data.length) {
            return reply(`*Movie not found* ❗`);
        }

        let movieDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼❱❱\n┃\n";
        for (const movie of data.data) {
            movieDetails += `🎬 Title: ${movie.movieName}\n`;
            movieDetails += `📅 Year: ${movie.year}\n`;
            movieDetails += `⭐ IMDB Rating: ${movie.imdbRating}\n`;
            movieDetails += `🔗 Link: ${movie.link}\n╰═══════════════\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺\n`;
        }

        const chatId = m.chat || mek.key.remoteJid;

        // Send movie details with the image
        return await conn.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: movieDetails,
        });
    } catch (error) {
        console.error("An error occurred while fetching movie data:", error);
        return reply(`*An error occurred while fetching movie data* ❗`);
    }
});

// Fetch movie download links
cmd({
    pattern: "dl",
    category: "movie",
    desc: "Fetches movie download links.",
    use: "<movie_link>",
    send: "🎥 Fetching download links...",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/moviedl?q=${encodeURIComponent(query)}`);
        const { data } = response;

        if (! data.downloadLinks || !data.downloadLinks.length) {
            return reply(`*No download links found for the movie* ❗`);
        }

        let downloadDetails = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗟𝗶𝗻𝗸𝘀❱❱\n┃\n";
        data.downloadLinks.forEach(link => {
            downloadDetails += `📽️ Quality: ${link.quality}\n`;
            downloadDetails += `📦 Size: ${link.size}\n`;
            downloadDetails += `🔗 Link: ${link.link}\n╰═══════════════\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺\n`;
        });
        const chatId = m.chat || mek.key.remoteJid;
return await conn.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: downloadDetails,
        });
        
    } catch (error) {
        console.error("An error occurred while fetching download links:", error);
        return reply(`*An error occurred while fetching download links* ❗`);
    }
});

// Fetch alternative movie download links
cmd({
    pattern: "dll",
    category: "movie",
    desc: "Fetches movie download links.",
    use: "<movie_qulityname>",
    send: "🎥 Fetching download links...",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }

    const query = args.join(" ").trim();
    if (!query) {
        return reply(`*Please provide a movie name* ❗`);
    }

    try {
        const response = await axios.get(`https://bit-x-apis.vercel.app/moviedll?q=${encodeURIComponent(query)}`);
        const { data } = response;

        if (!data.originalLink || !data.apiLink) {
            return reply(`*No download links found for the movie* ❗`);
        }

        // Prepare the download details message
        const downloadDetails = `╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱❱❱\n┃\n` +
            `🔗 *Original Link:* ${data.originalLink}\n` +
            `🔗 *API Link:* ${data.apiLink}\n╰═══════════════\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;

        // Send the download details as a reply
        reply(downloadDetails);

        // Send the API link as a document
    

    } catch (error) {
        console.error("An error occurred while fetching download links:", error);
        return reply(`*An error occurred while fetching download links* ❗`);
    }
});



cmd({
    pattern: "fit",
    category: "movie",
    react:"✅",
    desc: "Fetches movie download links.",
    use: "<movie_directlink>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply ,args}) => {
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }

    if (!premiumActive) {
        return reply(`*This is a premium feature* ❗`);
    }
    if (!down) {
        return reply(`*This is off low memory* ❗`);
    }
const mediaUrl = args.join(" ").trim();

    if (!mediaUrl) {
        return reply(`*Please provide a movie name* ❗`);
    }
    

    try {
        await reply('✔️ Media Downloading started!');
        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

        const message = {
            document: mediaBuffer,
            caption: `${datas}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mimetype: "video/mp4",
            fileName: `${datas} 🎬Elixa🎬.mp4`,
        };

        await conn.sendMessage(m.chat, message);
        await reply('✔️ Media sent successfully!');
    } catch (error) {
        console.error('Error fetching or sending:', error);
        await reply('*Error fetching or sending the media. Please try again!*');
    }
});
