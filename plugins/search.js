const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "imdb",
    category: "search",
    desc: "Sends image of asked Movie/Series.",
    use: '<movie_name>',
    react :"🎞️",
    filename: __filename,
},
    async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    
    try {
        // Ensure q captures the movie name
        q = args.join(" ").trim();

        // Check if movie name is provided
        if (!q) {
            return reply(`*Please provide a movie name* ❗`);
        }

        // Fetch movie data from OMDB API
        let fids = await axios.get(`https://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`);

        // Handle if movie is not found
        if (fids.data.Response === "False") {
            return reply(`*Movie not found* ❗`);
        }

        // Formatting movie data
        let imdbt = "╭❰𝗘ꟾ𝖎✘𝗮 𝗠𝗼𝘃𝗶𝗲 𝗶𝗻𝗳𝗼❱❱\n┃\n╰\n";
        imdbt += `╰🎬 Title      : ${fids.data.Title}\n\n`;
        imdbt += `╰📅 Year       : ${fids.data.Year}\n\n`;
        imdbt += `╰⭐ Rated      : ${fids.data.Rated}\n\n`;
        imdbt += `╰📆 Released   : ${fids.data.Released}\n\n`;
        imdbt += `╰⏳ Runtime    : ${fids.data.Runtime}\n\n`;
        imdbt += `╰🌀 Genre      : ${fids.data.Genre}\n\n`;
        imdbt += `╰👨🏻‍💻 Director   : ${fids.data.Director}\n\n`;
        imdbt += `╰✍ Writer     : ${fids.data.Writer}\n\n`;
        imdbt += `╰👨 Actors     : ${fids.data.Actors}\n\n`;
        imdbt += `╰📃 Plot       : ${fids.data.Plot}\n\n`;
        imdbt += `╰🌐 Language   : ${fids.data.Language}\n\n`;
        imdbt += `╰🌍 Country    : ${fids.data.Country}\n\n`;
        imdbt += `╰🎖️ Awards     : ${fids.data.Awards}\n\n`;
        imdbt += `╰📦 BoxOffice  : ${fids.data.BoxOffice}\n\n`;
        imdbt += `╰🏙️  : ${fids.data.Production}\n\n`;
        imdbt += `╰🌟 imdbRating : ${fids.data.imdbRating}\n\n`;
        imdbt += `╰❎ imdbVotes  : ${fids.data.imdbVotes}`;
        imdbt += `╰═══════════════`;
        


        let cap="\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺"
        
        // Check if the poster exists
        const posterUrl = fids.data.Poster !== "N/A" ? fids.data.Poster : null;

        // Send movie info with or without poster
        if (posterUrl) {
            await conn.sendMessage(m.chat, {
                image: { url: posterUrl },
                caption: imdbt + cap,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: imdbt }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching the movie info* ❗`);
    }
});



cmd({
    pattern: "weather",
    category: "search",
    desc: "Sends weather information for the requested location.",
    use: '<city_name>',
    react: "🌦️",
    filename: __filename,
},
    async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {

    try {
        // Ensure q captures the location
        q = args.join(" ").trim();

        // Check if location name is provided
        if (!q) {
            return reply(`*Please provide a location name* ❗`);
        }

        // Fetch weather data from OpenWeatherMap API
        const apiKey = '060a6bcfa19809c2cd4d97a212b19273';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${apiKey}`;
        
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Handle if the city is not found
        if (data.cod === "404") {
            return reply(`*Location not found* ❗`);
        }

        // Extract and format data
        const { main, weather, wind, sys, name } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        let weatherInfo = "\n";
        weatherInfo += "╭❰🌦️ 𝗪𝗲𝗮𝘁𝗵𝗲𝗿 𝗜𝗻𝗳𝗼 ❱❱      \n";
        weatherInfo += "\n";
        weatherInfo += `╰📍 Location : ${name}, ${sys.country}\n\n`;
        weatherInfo += `╰🌡️ Temp     : ${main.temp}°C (Feels like: ${main.feels_like}°C)\n\n`;
        weatherInfo += `╰🔼 Max Temp : ${main.temp_max}°C\n\n`;
        weatherInfo += `╰🔽 Min Temp : ${main.temp_min}°C\n\n`;
        weatherInfo += `╰🌥️ Condition : ${weather[0].description}\n\n`;
        weatherInfo += `╰💨 Wind      : ${wind.speed} m/s\n\n`;
        weatherInfo += `╰🌫️ Humidity  : ${main.humidity}%\n\n`;
        weatherInfo += `╰🌅 Sunrise   : ${new Date(sys.sunrise * 1000).toLocaleTimeString()}\n\n`;
        weatherInfo += `╰🌇 Sunset    : ${new Date(sys.sunset * 1000).toLocaleTimeString()}`;
weatherInfo += `\n`;
weatherInfo += `╰═══════════════`;


        const footer = "\n> Generated by Elixa MD";

        // Send weather info with or without an icon
        await conn.sendMessage(m.chat, {
            image: { url: iconUrl },
            caption: weatherInfo + footer,
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching weather data* ❗`);
    }
});


cmd({
    pattern: "lyrics",
    category: "search",
    desc: "Fetch song lyrics for a given song.",
    use: '<song_name>',
    react: "🎶",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {

    try {
        q = args.join(" ").trim();
        if (!q) {
            return reply(`*Please provide a song name to fetch the lyrics* ❗`);
        }

        const apiUrl = `https://api.popcat.xyz/lyrics?song=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.lyrics) {
            return reply(`*Lyrics not found for "${q}"* ❗`);
        }

        const { title, artist, lyrics, image } = data;

        let lyricsInfo = "\n";
        lyricsInfo += "🎶 𝗟𝘆𝗿𝗶𝗰𝘀 𝗜𝗻𝗳𝗼       \n";
        lyricsInfo += "\n";
        lyricsInfo += `🎵 Title    : ${title}\n\n`;
        lyricsInfo += `🎤 Artist   : ${artist}\n\n`;
        lyricsInfo += `📜 Lyrics   :\n\n${lyrics}`;
        const footer = "\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺";

        const thumbnailUrl = image || null;

        if (thumbnailUrl) {
            await conn.sendMessage(m.chat, {
                image: { url: thumbnailUrl },
                caption: lyricsInfo + footer,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: lyricsInfo + footer }, { quoted: m });
        }

    } catch (error) {
        console.error(error);
        reply(`*An error occurred while fetching lyrics* ❗`);
    }
});







cmd({
    pattern: "google",
    alias: ['search', 'gsearch'],
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: '<text>',
    react: "🔗",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("Please provide a query. Example: .google Who is Suhail Tech.");
        const apiUrl = `https://api.giftedtech.my.id/api/search/google?apikey=gifted&query=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        if (!response.data.success) {
            return reply("No search results found.");
        }
        const results = response.data.results;
        if (!results || results.length === 0) {
            return reply("No results found for your query.");
        }
        let msg = `╭❰𝗘ꟾ𝖎✘𝗮 𝗚𝗼𝗼𝗴𝗹𝗲❱❱\n┃Google Search Results for: *${q}* ❱❱\n╰\n`;
        results.forEach(result => {
            msg += `┃● *Title:* ${result.title}\n`;
            msg += `┃●*Description:* ${result.description}\n`;
            msg += `┃● *Link:* ${result.url}\n╰═══════════════\n\n`;
        });
        const cap = `\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`;
        conn.sendMessage(from, { text: msg + cap });
        
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message || e}`);
    }
});



