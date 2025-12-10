const { cmd } = require('../command');
const { toggleAntiDelete, getAntiDeleteStatus, getDeletedLog, clearDeletedLog } = require('../lib/antidel');

cmd({
    pattern: "antidelete",
    alias: ["antidel", "ad"],
    desc: "Toggle antidelete feature",
    category: "tools",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply, args, isOwner }) => {
    try {
        // Check if user is owner
        if (!isOwner) {
            await conn.sendMessage(from, { 
                text: '*❌ This command is only for bot owner*' 
            });
            return;
        }
        
        const [action, type] = args ? args.split(' ') : [];
        
        if (!action || !['on', 'off', 'status', 'log', 'clearlog'].includes(action.toLowerCase())) {
            const helpText = `╔═══════════════════════
║  *𝙰𝙽𝚃𝙸𝙳𝙴𝙻𝙴𝚃𝙴 𝙷𝙴𝙻𝙿*
╚═══════════════════════

┌─「 𝚄𝚂𝙰𝙶𝙴 」━━━━━━━━━━━━━━━
│ 
│  *📌 .antidelete on gc* - Enable for groups
│  *📌 .antidelete on dm* - Enable for DMs
│  *📌 .antidelete off gc* - Disable for groups
│  *📌 .antidelete off dm* - Disable for DMs
│  *📌 .antidelete status* - Check current status
│  *📌 .antidelete log* - View deleted messages log
│  *📌 .antidelete clearlog* - Clear the log
│ 
└────────────────────

*💡 Tips:*
• Use 'gc' for group chats
• Use 'dm' for direct messages
• Both can be enabled separately

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;
            
            await conn.sendMessage(from, { text: helpText });
            return;
        }
        
        if (action.toLowerCase() === 'status') {
            const status = getAntiDeleteStatus();
            const statusText = `╔═══════════════════════
║  *𝙰𝙽𝚃𝙸𝙳𝙴𝙻𝙴𝚃𝙴 𝚂𝚃𝙰𝚃𝚄𝚂*
╚═══════════════════════

┌─「 𝙲𝚄𝚁𝚁𝙴𝙽𝚃 𝚂𝚃𝙰𝚃𝚄𝚂 」━━━━━━━━
│ 
│  *👥 Group Chats:* ${status.gc ? '✅ ON' : '❌ OFF'}
│  *💬 Direct Messages:* ${status.dm ? '✅ ON' : '❌ OFF'}
│  *🕐 Last Updated:* ${status.timestamp.toLocaleString()}
│ 
└────────────────────

*📊 Monitoring:*
${status.gc ? '• Group messages are being monitored' : '• Group messages are not monitored'}
${status.dm ? '• DM messages are being monitored' : '• DM messages are not monitored'}

*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*`;
            
            await conn.sendMessage(from, { text: statusText });
            return;
        }
        
        if (action.toLowerCase() === 'log') {
            const log = getDeletedLog();
            if (log.length === 0) {
                await reply('*📭 No deleted messages in log*');
                return;
            }
            
            let logText = `╔═══════════════════════
║  *𝙳𝙴𝙻𝙴𝚃𝙴𝙳 𝙼𝙴𝚂𝚂𝙰𝙶𝙴𝚂 𝙻𝙾𝙶*
╚═══════════════════════

┌─「 𝚂𝚄𝙼𝙼𝙰𝚁𝚈 」━━━━━━━━━━━━━━━
│ 
│  *📊 Total Deleted:* ${log.length}
│  *🕐 Last Update:* ${new Date().toLocaleString()}
│ 
└────────────────────

`;
            
            // Show last 10 deleted messages
            const recentLog = log.slice(-10).reverse();
            recentLog.forEach((item, index) => {
                const time = item.timestamp.toLocaleTimeString();
                const type = item.type === 'group' ? '👥 Group' : '💬 DM';
                logText += `*${index + 1}. ${type} - ${time}*\n`;
            });
            
            logText += '\n*𝙿𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚂𝚒𝚕𝚊 𝚃𝚎𝚌𝚑*';
            
            await conn.sendMessage(from, { text: logText });
            return;
        }
        
        if (action.toLowerCase() === 'clearlog') {
            clearDeletedLog();
            await reply('*🗑️ Deleted messages log has been cleared*');
            return;
        }
        
        // Handle on/off actions
        if (!type || !['gc', 'dm'].includes(type.toLowerCase())) {
            await reply('*❌ Please specify type: gc (group) or dm (direct message)*');
            return;
        }
        
        const enable = action.toLowerCase() === 'on';
        const success = await toggleAntiDelete(conn, from, type.toLowerCase(), enable);
        
        if (!success) {
            await reply('*❌ Failed to update antidelete settings*');
        }
        
    } catch (error) {
        console.error('Error in antidelete command:', error);
        await reply(`*❌ Error:* ${error.message}`);
    }
});
