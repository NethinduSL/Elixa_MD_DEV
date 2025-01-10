const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const os = require('os');




cmd({
    pattern: "remove",
    desc: "❌ Remove a group member by mentioning them.",
    category: "group",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, args, reply }) => {
    if (!isGroup) return reply("*ᴏɴʟʏ ᴀʟʟᴏᴡᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ* 🚫nn> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺*");
    if (!isBotAdmins) return reply("⚠️ **ᴍᴀᴋᴇ ᴍᴇ ᴀᴅᴍɪɴ*🙃/ɴ> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺ remove members!*");
    if (!isAdmins) return reply("🚨 *ꜰᴏʀ ᴀᴅᴍɪɴꜱ ᴏɴʟʏ 😎*");
    
    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to remove!*");

    try {
        const user = mentioned[0]; // Take the first mentioned user
        await conn.groupParticipantsUpdate(from, [user], "remove");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🚮 *Removed @${username} from the group.*\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝗿𝗮𝘁𝗲𝗱 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to remove the user. Make sure I have admin privileges.*");
    }
});



cmd({
    pattern: "promote",
    desc: "🔼 Promote a member to admin.",
    category: "group",
    react: "⬆️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("*ᴏɴʟʏ ᴀʟʟᴏᴡᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ* 🚫nn> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺*");
    if (!isBotAdmins) return reply("*ᴍᴀᴋᴇ ᴍᴇ ᴀᴅᴍɪɴ*🙃/ɴ> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺ promote members!*");
    if (!isAdmins) return reply("⚠️ *ꜰᴏʀ ᴀᴅᴍɪɴꜱ ᴏɴʟʏ 😎*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to promote!*");

    try {
        const user = mentioned[0];
        await conn.groupParticipantsUpdate(from, [user], "promote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `🎉 *Promoted @${username} to admin!*\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝗿𝗮𝘁𝗲𝗱 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to promote the user. Make sure I have admin privileges.*");
    }
});






cmd({
    pattern: "demote",
    desc: "🔽 Demote a member from admin.",
    category: "group",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    if (!isGroup) return reply("*ᴏɴʟʏ ᴀʟʟᴏᴡᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ* 🚫nn> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺*");
    if (!isBotAdmins) return reply("*ᴍᴀᴋᴇ ᴍᴇ ᴀᴅᴍɪɴ*🙃/ɴ> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺ demote members!*");
    if (!isAdmins) return reply("⚠️ *ꜰᴏʀ ᴀᴅᴍɪɴꜱ ᴏɴʟʏ 😎*");

    const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned || mentioned.length === 0) return reply("📌 *Please mention a valid user to demote!*");

    try {
        const user = mentioned[0];
        await conn.groupParticipantsUpdate(from, [user], "demote");
        const username = user.split("@")[0];

        await conn.sendMessage(from, {
            text: `😞 *Demoted @${username} from admin!* \n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘅𝗮 𝗠𝗗`,
            mentions: [user]
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to demote the user. Make sure I have admin privileges.*");
    }
});













cmd({
    pattern: "adminin",
    desc: "👑 Get a list of admins in the group.",
    category: "group",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, groupMetadata }) => {
    if (!isGroup) return reply("*ᴏɴʟʏ ᴀʟʟᴏᴡᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ* 🚫nn> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺*");

    try {
        const group = await conn.groupMetadata(from);
        const admins = group.participants.filter(p => p.isAdmin);
        const adminList = admins.map(admin => `👑 @${admin.id.split('@')[0]}`).join("\n") || "No admins in this group.";

        await conn.sendMessage(from, {
            text: `*👑 Admins of ${group.subject}*\n\n${adminList}\n\n> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`,
            mentions: admins.map(admin => admin.id)
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to fetch admin info.*");
    }
});




cmd({
    pattern: "groupinfo",
    desc: "ℹ️ Get detailed information about the group.",
    category: "group",
    react: "ℹ️",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, reply, groupMetadata }) => {
    if (!isGroup) return reply("*ᴏɴʟʏ ᴀʟʟᴏᴡᴇᴅ ɪɴ ɢʀᴏᴜᴘꜱ* 🚫nn> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺*");

    try {
        const group = await conn.groupMetadata(from);
        const participantCount = group.participants.length;
        const admins = group.participants.filter(p => p.isAdmin).map(admin => `┃ @${admin.id.split('@')[0]}`).join("\n") || "No admins.";

        const groupInfo = `
*ℹ️ Group Info of ${group.subject}:*
╭─────────────────
┃📛 *Group Name*: ${group.subject}
┃💬 *Description*: ${group.desc || "No description available."}
┃👥 *Participants*: ${participantCount}
┃🧑‍💻 *Admins*: 
┃${admins}
╰─────────────────
> 𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗲𝗱 𝗯𝘆 𝗘𝗹𝗶𝘇𝗮 𝗠𝗗`;

        await conn.sendMessage(from, {
            text: groupInfo,
            mentions: group.participants.filter(p => p.isAdmin).map(admin => admin.id)
        });
    } catch (e) {
        console.error(e);
        reply("❌ *Failed to fetch group info.*");
    }
});





cmd({
    pattern: "online",
    category: "group",
    
    filename: __filename,
    react: "☺️",
    desc: "Sends online users in the group",
},
async (conn, mek, m, { from, isGroup, participants, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Filter online users from the participants list
        const onlineUsers = participants.filter(p => p.isAdmin || p.isSuperAdmin || p.isOnline);

        if (onlineUsers.length === 0) {
            return reply("No online users found in this group.");
        }

        // Generate a list of online users
        const onlineList = onlineUsers.map(user => `@${user.id.split('@')[0]}`).join('\n');

        // Send the online users list
        await conn.sendMessage(from, {
            text: `😎 *Online Users:*\n\n${onlineList}\n\n> 𝗚𝗲𝟆𝗮𝗿𝗮𝐭𝗲𝙙 𝝗𝞤 𝗘ꟾ𝖎✘𝗮 ‐𝝡𝗗༺`,
            mentions: onlineUsers.map(user => user.id),
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching online users. Please try again.");
    }
});

