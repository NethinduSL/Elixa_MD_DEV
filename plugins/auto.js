const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');

// Auto Voice
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_voice.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_VOICE === 'true') {
          await conn.sendPresenceUpdate('recording', from);
          await conn.sendMessage(from, { 
            audio: { url: data[text] }, 
            mimetype: 'audio/mpeg', 
            ptt: true 
          }, { quoted: mek });
        }
      }
    } else {
      console.error(`Auto Voice file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Voice: ${error.message}`);
  }
});

// Auto Sticker
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_sticker.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_STICKER === 'true') {
          await conn.sendMessage(from, { 
            sticker: { url: data[text] }, 
            package: 'yourName' 
          }, { quoted: mek });
        }
      }
    } else {
      console.error(`Auto Sticker file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Sticker: ${error.message}`);
  }
});

// Auto Reply
cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/auto_reply.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase() && config.AUTO_REPLY === 'true') {
          await m.reply(data[text]);
        }
      }
    } else {
      console.error(`Auto Reply file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Reply: ${error.message}`);
  }
})



//

cmd({
  on: 'body'
},
async (conn, mek, m, { from, body, isOwner }) => {
  try {
    const filePath = path.join(__dirname, '../Elixa/badword.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      for (const text of data) {
        const regex = new RegExp(`\\b${escapeRegExp(text)}\\b`, 'i');
        if (regex.test(body) && config.AUTO_BADWORD === 'true') {
          await conn.sendMessage(from, { text: "🚫 Bad word detected!\n🔥 \n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺" });
          await conn.sendMessage(from, { delete: mek.key });
          break;
        }
      }
    } else {
      console.error(`Auto Reply file not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error in Auto Reply: ${error.message}`);
  }
});
