const { proto, generateWAMessageFromContent, downloadContentFromMessage, generateForwardMessageContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const settings = require('../settings');
const fs = require('fs');
const path = require('path');

// Define fakevCard for quoting messages
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SILA AI  ✅",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Meta\nORG:SILA AI;\nTEL;type=CELL;type=VOICE;waid=255612491554:+255612491554\nEND:VCARD`
        }
    }
};

// User menu states storage
const userMenuStates = new Map();

// Menu pages configuration
const menuPages = [
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐌𝐄𝐍𝐔",
        description: `Welcome! Use reactions to navigate:\n⬅️ Previous  ➡️ Next\n🔢 Go to page  ❌ Close`,
        sections: [
            {
                title: "━━〔 𝐀𝐈 〕━━━━━━━━",
                commands: [
                    { name: ".ai", emoji: "🤖" },
                    { name: ".gpt", emoji: "🧠" },
                    { name: ".gemini", emoji: "✨" },
                    { name: ".bard", emoji: "🎯" },
                    { name: ".ask", emoji: "❓" },
                    { name: ".chatbot", emoji: "💬" },
                    { name: ".sora", emoji: "🎬" },
                    { name: ".imagine", emoji: "🖼️" },
                    { name: ".flux", emoji: "🌀" }
                ]
            },
            {
                title: "━━〔 𝐆𝐄𝐍𝐄𝐑𝐀𝐋 〕━━━━━━━━",
                commands: [
                    { name: ".help", emoji: "❓" },
                    { name: ".menu", emoji: "📋" },
                    { name: ".ping", emoji: "🏓" },
                    { name: ".alive", emoji: "💚" },
                    { name: ".owner", emoji: "👑" },
                    { name: ".joke", emoji: "😂" },
                    { name: ".quote", emoji: "💭" },
                    { name: ".fact", emoji: "📚" },
                    { name: ".weather", emoji: "🌤️" },
                    { name: ".news", emoji: "📰" }
                ]
            }
        ]
    },
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐏𝐀𝐆𝐄 𝟐",
        description: `Page 2/6 - Use reactions to navigate`,
        sections: [
            {
                title: "━━〔 𝐀𝐃𝐌𝐈𝐍 〕━━━━━━━━",
                commands: [
                    { name: ".ban", emoji: "⛔" },
                    { name: ".promote", emoji: "📈" },
                    { name: ".demote", emoji: "📉" },
                    { name: ".mute", emoji: "🔇" },
                    { name: ".unmute", emoji: "🔊" },
                    { name: ".delete", emoji: "🗑️" },
                    { name: ".kick", emoji: "👢" },
                    { name: ".warn", emoji: "⚠️" },
                    { name: ".antilink", emoji: "🔗" },
                    { name: ".tagall", emoji: "🏷️" }
                ]
            },
            {
                title: "━━〔 𝐈𝐌𝐀𝐆𝐄 〕━━━━━━━━",
                commands: [
                    { name: ".sticker", emoji: "🖼️" },
                    { name: ".simage", emoji: "📸" },
                    { name: ".removebg", emoji: "🎭" },
                    { name: ".remini", emoji: "✨" },
                    { name: ".blur", emoji: "🔍" },
                    { name: ".crop", emoji: "✂️" },
                    { name: ".meme", emoji: "🤣" },
                    { name: ".take", emoji: "📦" },
                    { name: ".emojimix", emoji: "🧩" },
                    { name: ".tgsticker", emoji: "📲" }
                ]
            }
        ]
    },
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐏𝐀𝐆𝐄 𝟑",
        description: `Page 3/6 - Use reactions to navigate`,
        sections: [
            {
                title: "━━〔 𝐎𝐖𝐍𝐄𝐑 〕━━━━━━━━",
                commands: [
                    { name: ".mode", emoji: "🔧" },
                    { name: ".settings", emoji: "⚙️" },
                    { name: ".update", emoji: "🔄" },
                    { name: ".setpp", emoji: "🖼️" },
                    { name: ".autoreact", emoji: "❤️" },
                    { name: ".autostatus", emoji: "📊" },
                    { name: ".autoread", emoji: "👁️" },
                    { name: ".anticall", emoji: "📵" },
                    { name: ".pmblocker", emoji: "🚫" },
                    { name: ".clearsession", emoji: "🧹" }
                ]
            },
            {
                title: "━━〔 𝐅𝐔𝐍 〕━━━━━━━━",
                commands: [
                    { name: ".compliment", emoji: "💝" },
                    { name: ".insult", emoji: "😠" },
                    { name: ".flirt", emoji: "😘" },
                    { name: ".ship", emoji: "💑" },
                    { name: ".simp", emoji: "🥺" },
                    { name: ".stupid", emoji: "🤪" },
                    { name: ".character", emoji: "👤" },
                    { name: ".wasted", emoji: "💀" },
                    { name: ".trivia", emoji: "🧩" },
                    { name: ".truth", emoji: "🙊" }
                ]
            }
        ]
    },
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐏𝐀𝐆𝐄 𝟒",
        description: `Page 4/6 - Use reactions to navigate`,
        sections: [
            {
                title: "━━〔 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 〕━━━━━━━━",
                commands: [
                    { name: ".play", emoji: "🎵" },
                    { name: ".song", emoji: "🎶" },
                    { name: ".video", emoji: "🎬" },
                    { name: ".ytmp4", emoji: "📹" },
                    { name: ".instagram", emoji: "📸" },
                    { name: ".facebook", emoji: "👥" },
                    { name: ".tiktok", emoji: "🎵" },
                    { name: ".spotify", emoji: "🎧" },
                    { name: ".igs", emoji: "🖼️" },
                    { name: ".igsc", emoji: "📽️" }
                ]
            },
            {
                title: "━━〔 𝐆𝐀𝐌𝐄 〕━━━━━━━━",
                commands: [
                    { name: ".tictactoe", emoji: "❌" },
                    { name: ".hangman", emoji: "🪢" },
                    { name: ".guess", emoji: "🎯" },
                    { name: ".answer", emoji: "📝" },
                    { name: ".dare", emoji: "😈" },
                    { name: ".8ball", emoji: "🎱" },
                    { name: ".attp", emoji: "✨" },
                    { name: ".lyrics", emoji: "📝" },
                    { name: ".trt", emoji: "🌐" },
                    { name: ".ss", emoji: "📱" }
                ]
            }
        ]
    },
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐏𝐀𝐆𝐄 𝟓",
        description: `Page 5/6 - Use reactions to navigate`,
        sections: [
            {
                title: "━━〔 𝐓𝐄𝐗𝐓𝐌𝐀𝐊𝐄𝐑 〕━━━━━━━━",
                commands: [
                    { name: ".metallic", emoji: "🔗" },
                    { name: ".neon", emoji: "💡" },
                    { name: ".glitch", emoji: "🌀" },
                    { name: ".fire", emoji: "🔥" },
                    { name: ".thunder", emoji: "⚡" },
                    { name: ".matrix", emoji: "📟" },
                    { name: ".hacker", emoji: "💻" },
                    { name: ".blackpink", emoji: "🖤" },
                    { name: ".ice", emoji: "❄️" },
                    { name: ".snow", emoji: "🌨️" }
                ]
            },
            {
                title: "━━〔 𝐀𝐍𝐈𝐌𝐄 〕━━━━━━━━",
                commands: [
                    { name: ".neko", emoji: "🐱" },
                    { name: ".waifu", emoji: "👩" },
                    { name: ".loli", emoji: "👧" },
                    { name: ".poke", emoji: "👉" },
                    { name: ".hug", emoji: "🤗" },
                    { name: ".kiss", emoji: "💋" },
                    { name: ".pat", emoji: "👋" },
                    { name: ".cry", emoji: "😢" },
                    { name: ".wink", emoji: "😉" },
                    { name: ".facepalm", emoji: "🤦" }
                ]
            }
        ]
    },
    {
        title: "⚡️ 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐏𝐀𝐆𝐄 𝟔",
        description: `Page 6/6 - Last page!`,
        sections: [
            {
                title: "━━〔 𝐌𝐈𝐒𝐂 〕━━━━━━━━",
                commands: [
                    { name: ".heart", emoji: "❤️" },
                    { name: ".lgbt", emoji: "🏳️‍🌈" },
                    { name: ".circle", emoji: "⭕" },
                    { name: ".jail", emoji: "🚔" },
                    { name: ".passed", emoji: "🎖️" },
                    { name: ".glass", emoji: "🥃" },
                    { name: ".comrade", emoji: "☭" },
                    { name: ".tweet", emoji: "🐦" },
                    { name: ".ytcomment", emoji: "💬" },
                    { name: ".triggered", emoji: "😤" }
                ]
            },
            {
                title: "━━〔 𝐔𝐓𝐈𝐋𝐈𝐓𝐈𝐄𝐒 〕━━━━━━━━",
                commands: [
                    { name: ".git", emoji: "💻" },
                    { name: ".github", emoji: "🐙" },
                    { name: ".sc", emoji: "📜" },
                    { name: ".script", emoji: "📄" },
                    { name: ".repo", emoji: "📁" },
                    { name: ".groupinfo", emoji: "👥" },
                    { name: ".vv", emoji: "📊" },
                    { name: ".jid", emoji: "🆔" },
                    { name: ".url", emoji: "🔗" },
                    { name: ".cleartmp", emoji: "🧹" }
                ]
            }
        ]
    }
];

// Generate menu message
function generateMenuPage(pageIndex, pushname, prefix, mode, version) {
    const page = menuPages[pageIndex];
    const totalPages = menuPages.length;
    
    let menuText = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n`;
    menuText += `│        ${page.title}        │\n`;
    menuText += `├────────────────────────────────────┤\n`;
    menuText += `│    𝐔𝐒𝐄𝐑: ${pushname || 'User'}        │\n`;
    menuText += `│    𝐏𝐑𝐄𝐅𝐈𝐗: ${prefix}                 │\n`;
    menuText += `│    𝐌𝐎𝐃𝐄: ${mode}                 │\n`;
    menuText += `│    𝐕𝐄𝐑𝐒𝐈𝐎𝐍: ${version}              │\n`;
    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    
    menuText += `${page.description}\n\n`;
    
    page.sections.forEach(section => {
        menuText += `${section.title}\n`;
        section.commands.forEach(cmd => {
            menuText += `${cmd.emoji} ${cmd.name}\n`;
        });
        menuText += `\n`;
    });
    
    menuText += `📄 Page ${pageIndex + 1}/${totalPages}\n`;
    menuText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    menuText += `⬅️ : Previous  |  ➡️ : Next\n`;
    menuText += `🔢 : Go to page  |  ❌ : Close\n`;
    menuText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    menuText += `𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐈𝐋𝐀 𝐌𝐃`;
    
    return menuText;
}

// Send menu with buttons
async function sendMenuWithButtons(sock, chatId, pushname, prefix, mode, version, pageIndex = 0) {
    const menuText = generateMenuPage(pageIndex, pushname, prefix, mode, version);
    
    const buttons = [
        { buttonId: 'prev', buttonText: { displayText: '⬅️ Previous' }, type: 1 },
        { buttonId: 'next', buttonText: { displayText: '➡️ Next' }, type: 1 },
        { buttonId: 'close', buttonText: { displayText: '❌ Close' }, type: 1 },
        { buttonId: 'page1', buttonText: { displayText: '🔢 Page 1' }, type: 1 },
        { buttonId: 'page2', buttonText: { displayText: '🔢 Page 2' }, type: 1 },
        { buttonId: 'page3', buttonText: { displayText: '🔢 Page 3' }, type: 1 },
        { buttonId: 'page4', buttonText: { displayText: '🔢 Page 4' }, type: 1 },
        { buttonId: 'page5', buttonText: { displayText: '🔢 Page 5' }, type: 1 },
        { buttonId: 'page6', buttonText: { displayText: '🔢 Page 6' }, type: 1 },
        { buttonId: 'help', buttonText: { displayText: '❓ Help' }, type: 1 }
    ];
    
    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: menuText,
                footer: 'Use buttons below to navigate',
                buttons: buttons,
                headerType: 1,
                viewOnce: false
            }, { quoted: fakevCard });
        } else {
            await sock.sendMessage(chatId, {
                text: menuText,
                footer: 'Use buttons below to navigate',
                buttons: buttons,
                headerType: 1
            }, { quoted: fakevCard });
        }
        
        // Store user's current page
        userMenuStates.set(chatId, pageIndex);
        
    } catch (error) {
        console.error('Error sending menu:', error);
        await sock.sendMessage(chatId, { text: menuText }, { quoted: fakevCard });
    }
}

// Handle button interactions
async function handleMenuButton(sock, chatId, userId, buttonId) {
    const currentPage = userMenuStates.get(chatId) || 0;
    const totalPages = menuPages.length;
    let newPage = currentPage;
    
    switch(buttonId) {
        case 'prev':
            newPage = currentPage > 0 ? currentPage - 1 : totalPages - 1;
            break;
        case 'next':
            newPage = currentPage < totalPages - 1 ? currentPage + 1 : 0;
            break;
        case 'page1':
            newPage = 0;
            break;
        case 'page2':
            newPage = 1;
            break;
        case 'page3':
            newPage = 2;
            break;
        case 'page4':
            newPage = 3;
            break;
        case 'page5':
            newPage = 4;
            break;
        case 'page6':
            newPage = 5;
            break;
        case 'help':
            await sock.sendMessage(chatId, { 
                text: 'How to use menu:\n• Click buttons to navigate\n• Use prefix + command to execute\n• Example: .ping'
            }, { quoted: fakevCard });
            return;
        case 'close':
            await sock.sendMessage(chatId, { 
                text: 'Menu closed! Type .menu2 to open again.'
            });
            userMenuStates.delete(chatId);
            return;
        default:
            return;
    }
    
    // Get user info for updated menu
    const user = await sock.onWhatsApp(userId).catch(() => null);
    const pushname = user && user[0] ? user[0].name || 'User' : 'User';
    
    const config = {}; // You might want to get this from your config system
    const prefix = config && config.PREFIX ? config.PREFIX : '.';
    const mode = settings.mode || '𝐏𝐔𝐁𝐋𝐈𝐂';
    const version = settings.version || '𝟑.𝟎.𝟎';
    
    await sendMenuWithButtons(sock, chatId, pushname, prefix, mode, version, newPage);
}

// Main menu2 command
async function menu2Command(sock, chatId, message, pushname, config) {
    const prefix = config && config.PREFIX ? config.PREFIX : '.';
    const mode = settings.mode || '𝐏𝐔𝐁𝐋𝐈𝐂';
    const version = settings.version || '𝟑.𝟎.𝟎';
    
    // Extract user ID from message
    const userId = message.key.participant || message.key.remoteJid;
    
    await sendMenuWithButtons(sock, chatId, pushname, prefix, mode, version, 0);
}

// Export both the command and button handler
module.exports = {
    menu2Command,
    handleMenuButton,
    userMenuStates
};