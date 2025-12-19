const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

// Define combined fakevCard with Christmas and regular version
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA AI 🎅",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:SILA AI CHRISTMAS\nORG:SILA AI;\nTEL;type=CELL;type=VOICE;waid=255612491554:+255612491554\nEND:VCARD`
        }
    }
};

cmd({
    pattern: "menu3",
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝚂𝙸𝙻𝙰 𝙼𝙳 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝙱𝙾𝚃*
╚═══════════════════════
┌─「 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 」
│ *𝗢𝘄𝗻𝗲𝗿 :* ${config.OWNER_NAME}
│ *𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 :* NodeJs
│ *𝗠𝗼𝗱𝗲 :* ${config.MODE}
│ *𝗣𝗿𝗲𝗳𝗶𝘅 :* ${config.PREFIX}
│ *𝗩𝗲𝗿𝘀𝗶𝗼𝗻 :* 3.0.0 Premium
└────────────────────

┌─「 𝙼𝙴𝙽𝚄 𝚂𝙴𝙲𝚃𝙸𝙾𝙽𝚂 」━━━━━━━━━━━━
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗔𝗜 𝗠𝗘𝗡𝗨
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • aimenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗔𝗡𝗜𝗠𝗘 𝗠𝗘𝗡𝗨
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • animemenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡𝗦
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • reactions
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • convertmenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗙𝗨𝗡
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • funmenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • dlmenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗚𝗥𝗢𝗨𝗣
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • groupmenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗢𝗪𝗡𝗘𝗥
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • ownermenu
│ ┃ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┃ 𝗢𝗧𝗛𝗘𝗥
│ ┣━━━━━━━━━━━━━━━━━━━━━
│ ┃ • othermenu
│ 
└────────────────────

🔗 *Channel:* https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02

${config.DESCRIPTION}

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}aimenu`, buttonText: { displayText: '🤖 AI MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}animemenu`, buttonText: { displayText: '🎌 ANIME' }, type: 1 },
            { buttonId: `${config.PREFIX}reactions`, buttonText: { displayText: '💫 REACTIONS' }, type: 1 },
            { buttonId: `${config.PREFIX}dlmenu`, buttonText: { displayText: '📥 DOWNLOAD' }, type: 1 },
            { buttonId: `${config.PREFIX}groupmenu`, buttonText: { displayText: '👥 GROUP' }, type: 1 },
            { buttonId: `${config.PREFIX}ownermenu`, buttonText: { displayText: '👑 OWNER' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "SILA MD | Premium Bot",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "reactions",
    desc: "Shows the reaction commands",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝚁𝙴𝙰𝙲𝚃𝙸𝙾𝙽𝚂 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙰𝙵𝙵𝙴𝙲𝚃𝙸𝙾𝙽 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • bully @tag
│ ┣ • cuddle @tag
│ ┣ • hug @tag
│ ┣ • kiss @tag
│ ┣ • pat @tag
│ ┣ • slap @tag
│ ┣ • lick @tag
│ ┣ • bite @tag
│ ┣ • glomp @tag
│ ┣ • handhold @tag
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • cry @tag
│ ┣ • blush @tag
│ ┣ • smile @tag
│ ┣ • wink @tag
│ ┣ • happy @tag
│ ┣ • shy @tag
│ ┣ • anger @tag
│ ┣ • cringe @tag
│ ┣ • smug @tag
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • awoo @tag
│ ┣ • yeet @tag
│ ┣ • bonk @tag
│ ┣ • kill @tag
│ ┣ • wave @tag
│ ┣ • highfive @tag
│ ┣ • nom @tag
│ ┣ • poke @tag
│ ┣ • dance @tag
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}funmenu`, buttonText: { displayText: '😎 FUN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}animemenu`, buttonText: { displayText: '🎌 ANIME MENU' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// dlmenu
cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝚂𝙾𝙲𝙸𝙰𝙻 𝙼𝙴𝙳𝙸𝙰 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • facebook <url>
│ ┣ • tiktok <url>
│ ┣ • twitter <url>
│ ┣ • insta <url>
│ ┣ • pinterest <url>
│ ┣ • fb2 <url>
│ ┣ • tt2 <url>
│ ┣ • pins <url>
│ 
┌─「 𝙼𝚄𝚂𝙸𝙲 & 𝚅𝙸𝙳𝙴𝙾 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • spotify <url>
│ ┣ • play <song>
│ ┣ • play2 <song>
│ ┣ • play3 <song>
│ ┣ • audio <song>
│ ┣ • song <song>
│ ┣ • ytmp3 <url>
│ ┣ • ytmp4 <url>
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • video <query>
│ ┣ • video2 <query>
│ ┣ • video3 <query>
│ ┣ • darama <name>
│ 
┌─「 𝙾𝚃𝙷𝙴𝚁 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • mediafire <url>
│ ┣ • apk <app>
│ ┣ • apk2 <app>
│ ┣ • img <query>
│ ┣ • gdrive <url>
│ ┣ • ssweb <url>
│ ┣ • tiks <url>
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}convertmenu`, buttonText: { displayText: '🔄 CONVERTER' }, type: 1 },
            { buttonId: `${config.PREFIX}othermenu`, buttonText: { displayText: '🔧 OTHER MENU' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu
cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙶𝚁𝙾𝚄𝙿 𝙼𝙰𝙽𝙰𝙶𝙴𝙼𝙴𝙽𝚃 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • add @tag
│ ┣ • remove @tag
│ ┣ • kick @tag
│ ┣ • promote @tag
│ ┣ • demote @tag
│ ┣ • grouplink
│ ┣ • revoke
│ ┣ • dismiss
│ 
┌─「 𝙶𝚁𝙾𝚄𝙿 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • setwelcome <text>
│ ┣ • setgoodbye <text>
│ ┣ • updategname <name>
│ ┣ • updategdesc <text>
│ ┣ • getpic
│ ┣ • ginfo
│ 
┌─「 𝙶𝚁𝙾𝚄𝙿 𝙲𝙾𝙽𝚃𝚁𝙾𝙻 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • lockgc
│ ┣ • unlockgc
│ ┣ • mute
│ ┣ • unmute
│ ┣ • disappear on
│ ┣ • disappear off
│ ┣ • invite
│ 
┌─「 𝚃𝙰𝙶𝙶𝙸𝙽𝙶 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • tag <text>
│ ┣ • hidetag <text>
│ ┣ • tagall
│ ┣ • tagadmins
│ ┣ • senddm <text>
│ 
┌─「 𝙾𝚃𝙷𝙴𝚁 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • kickall
│ ┣ • kickall2
│ ┣ • kickall3
│ ┣ • allreq
│ ┣ • joinrequests
│ ┣ • nikal
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}ownermenu`, buttonText: { displayText: '👑 OWNER MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}othermenu`, buttonText: { displayText: '🔧 OTHER MENU' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu
cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙵𝚄𝙽 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙵𝚄𝙽 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • shapar @tag
│ ┣ • rate @tag
│ ┣ • insult @tag
│ ┣ • hack @tag
│ ┣ • ship @tag1 @tag2
│ ┣ • character @tag
│ ┣ • pickup @tag
│ ┣ • joke
│ 
┌─「 𝚁𝙴𝙰𝙲𝚃𝙸𝙾𝙽𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • hrt @tag
│ ┣ • hpy @tag
│ ┣ • syd @tag
│ ┣ • anger @tag
│ ┣ • shy @tag
│ ┣ • kiss @tag
│ ┣ • mon @tag
│ ┣ • cunfuzed @tag
│ 
┌─「 𝙸𝙽𝚃𝙴𝚁𝙰𝙲𝚃𝙸𝚅𝙴 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • setpp
│ ┣ • hand @tag
│ ┣ • nikal @tag
│ ┣ • hold @tag
│ ┣ • hug @tag
│ ┣ • hifi @tag
│ ┣ • poke @tag
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}reactions`, buttonText: { displayText: '💫 REACTIONS' }, type: 1 },
            { buttonId: `${config.PREFIX}animemenu`, buttonText: { displayText: '🎌 ANIME MENU' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu
cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙾𝚃𝙷𝙴𝚁 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝚃𝙸𝙼𝙴 & 𝙳𝙰𝚃𝙴 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • timenow
│ ┣ • date
│ ┣ • count
│ ┣ • countx
│ 
┌─「 𝙲𝙰𝙻𝙲𝚄𝙻𝙰𝚃𝙸𝙾𝙽𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • calculate <exp>
│ ┣ • flip
│ ┣ • coinflip
│ ┣ • roll
│ 
┌─「 𝚃𝙴𝚇𝚃 𝚃𝙾𝙾𝙻𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • fancy <text>
│ ┣ • define <word>
│ ┣ • rw
│ ┣ • cpp
│ ┣ • fact
│ 
┌─「 𝙻𝙾𝙶𝙾 & 𝙳𝙴𝚂𝙸𝙶𝙽 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • logo <text>
│ ┣ • rcolor
│ ┣ • pair
│ ┣ • pair2
│ ┣ • pair3
│ 
┌─「 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • news
│ ┣ • movie <name>
│ ┣ • weather <city>
│ ┣ • wikipedia <query>
│ ┣ • githubstalk <user>
│ 
┌─「 𝚄𝚃𝙸𝙻𝙸𝚃𝚈 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • srepo
│ ┣ • save
│ ┣ • gpass
│ ┣ • yts <query>
│ ┣ • ytv <query>
│ ┣ • insult
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}dlmenu`, buttonText: { displayText: '📥 DOWNLOAD' }, type: 1 },
            { buttonId: `${config.PREFIX}convertmenu`, buttonText: { displayText: '🔄 CONVERTER' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu
cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙼𝙰𝙸𝙽 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙱𝙾𝚃 𝙲𝙾𝙽𝚃𝚁𝙾𝙻 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • ping
│ ┣ • live
│ ┣ • alive
│ ┣ • runtime
│ ┣ • uptime
│ ┣ • restart
│ 
┌─「 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • repo
│ ┣ • owner
│ ┣ • menu
│ ┣ • menu2
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 FULL MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}ownermenu`, buttonText: { displayText: '👑 OWNER MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📋 ALL COMMANDS' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu
cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙾𝚆𝙽𝙴𝚁 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙱𝙾𝚃 𝙲𝙾𝙽𝚃𝚁𝙾𝙻 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • restart
│ ┣ • shutdown
│ ┣ • updatecmd
│ 
┌─「 𝙼𝙴𝙽𝚄 𝙲𝙾𝙽𝚃𝚁𝙾𝙻 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • menu
│ ┣ • menu2
│ ┣ • listcmd
│ ┣ • allmenu
│ 
┌─「 𝙾𝚆𝙽𝙴𝚁 𝚃𝙾𝙾𝙻𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • owner
│ ┣ • block @tag
│ ┣ • unblock @tag
│ ┣ • fullpp
│ ┣ • setpp
│ 
┌─「 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • repo
│ ┣ • alive
│ ┣ • ping
│ ┣ • gjid
│ ┣ • jid
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}mainmenu`, buttonText: { displayText: '🗿 BASIC MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📋 ALL COMMANDS' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Owner only commands",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu
cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • sticker
│ ┣ • sticker2
│ ┣ • emojimix
│ ┣ • take <text>
│ 
┌─「 𝙰𝚄𝙳𝙸𝙾/𝚅𝙸𝙳𝙴𝙾 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • tomp3
│ ┣ • tts <text>
│ ┣ • trt <text>
│ 
┌─「 𝙴𝙽𝙲𝙾𝙳𝙸𝙽𝙶 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • base64 <text>
│ ┣ • unbase64 <text>
│ ┣ • binary <text>
│ ┣ • dbinary <text>
│ 
┌─「 𝚄𝚁𝙻 𝚃𝙾𝙾𝙻𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • tinyurl <url>
│ ┣ • url <text>
│ ┣ • urldecode <text>
│ ┣ • urlencode <text>
│ 
┌─「 𝚃𝙴𝚇𝚃 𝚃𝙾𝙾𝙻𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • fancy <text>
│ ┣ • repeat <text>
│ ┣ • ask <text>
│ ┣ • readmore <text>
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}dlmenu`, buttonText: { displayText: '📥 DOWNLOAD' }, type: 1 },
            { buttonId: `${config.PREFIX}othermenu`, buttonText: { displayText: '🔧 OTHER MENU' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// anime menu 
cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙰𝙽𝙸𝙼𝙴 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙲𝙷𝙰𝚁𝙰𝙲𝚃𝙴𝚁𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • fack
│ ┣ • dog
│ ┣ • awoo
│ ┣ • garl
│ ┣ • waifu
│ ┣ • neko
│ ┣ • megnumin
│ ┣ • maid
│ ┣ • loli
│ ┣ • foxgirl
│ ┣ • naruto
│ 
┌─「 𝙰𝙽𝙸𝙼𝙴 𝙶𝙸𝚁𝙻𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • animegirl
│ ┣ • animegirl1
│ ┣ • animegirl2
│ ┣ • animegirl3
│ ┣ • animegirl4
│ ┣ • animegirl5
│ 
┌─「 𝙰𝙽𝙸𝙼𝙴 𝙸𝙼𝙰𝙶𝙴𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • anime1
│ ┣ • anime2
│ ┣ • anime3
│ ┣ • anime4
│ ┣ • anime5
│ 
┌─「 𝙽𝙴𝚆𝚂 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • animenews
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}funmenu`, buttonText: { displayText: '😎 FUN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}reactions`, buttonText: { displayText: '💫 REACTIONS' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// ai menu 
cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╔═══════════════════════
║  *𝙰𝙸 𝙼𝙴𝙽𝚄*
╚═══════════════════════

┌─「 𝙶𝙿𝚃 𝙰𝙸 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • ai <query>
│ ┣ • gpt <query>
│ ┣ • gpt2 <query>
│ ┣ • gpt3 <query>
│ ┣ • gpt4 <query>
│ ┣ • gptmini <query>
│ 
┌─「 𝙰𝙳𝚅𝙰𝙽𝙲𝙴𝙳 𝙰𝙸 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • meta <query>
│ ┣ • bing <query>
│ ┣ • blackbox <query>
│ ┣ • luma <query>
│ ┣ • copilot <query>
│ 
┌─「 𝙸𝙼𝙰𝙶𝙴 𝙰𝙸 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • imagine <text>
│ ┣ • imagine2 <text>
│ 
┌─「 𝚂𝙿𝙴𝙲𝙸𝙰𝙻 𝙰𝙸 」
│ 
│ ┏━━━━━━━━━━━━━━━━━━━━━
│ ┣ • dj <query>
│ ┣ • khan <query>
│ ┣ • jawad <query>
│ 
└────────────────────

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 MAIN MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}othermenu`, buttonText: { displayText: '🔧 OTHER MENU' }, type: 1 },
            { buttonId: `${config.PREFIX}listcmd`, buttonText: { displayText: '📋 ALL COMMANDS' }, type: 1 }
        ];

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/jwmx1j.jpg` },
                caption: dec,
                ...fakevCard,
                footer: "Click buttons for other menus",
                buttons: buttons,
                headerType: 1,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402325089913@newsletter',
                        newsletterName: 'SILA MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
