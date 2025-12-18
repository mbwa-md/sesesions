const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const { silainfo, myquoted } = require('../config');

//=========== ALIVE COMMAND ===========//
cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime", "on", "active"],
    desc: "Check bot status and system info",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply, pushName, sender }) => {
    try {
        // Calculate memory usage
        const used = process.memoryUsage();
        const usedMB = (used.heapUsed / 1024 / 1024).toFixed(2);
        const totalMB = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMB = (os.freemem() / 1024 / 1024).toFixed(2);
        
        // Platform info
        const platform = os.platform();
        const arch = os.arch();
        const cpus = os.cpus().length;
        
        // Create status message with your design
        const txt = `
╭▸───────────────▸╮
│   「 𝐒𝐈𝐋𝐀 𝐌𝐃 𝐒𝐓𝐀𝐓𝐔𝐒 」   │
╰▸───────────────▸╯

╔► 𝐎𝐧𝐥𝐢𝐧𝐞 ✓
╚► 𝐔𝐩𝐭𝐢𝐦𝐞 : ${runtime(process.uptime())}

╔► 𝐌𝐞𝐦𝐨𝐫𝐲
╚► → ${usedMB} 𝐌𝐁 𝐔𝐬𝐞𝐝
╚► → ${freeMB} 𝐌𝐁 𝐅𝐫𝐞𝐞

╔► 𝐒𝐲𝐬𝐭𝐞𝐦
╚► → ${cpus} 𝐂𝐨𝐫𝐞𝐬
╚► → ${arch}
╚► → 𝐇𝐞𝐫𝐨𝐤𝐮

╔► 𝐒𝐢𝐠𝐧𝐞𝐝 𝐛𝐲 𝐒𝐢𝐥𝐚 𝐀𝐈
╚► 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝟏

╭▸───────────────▸╮
│    — 𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 —    │
╰▸───────────────▸╯`;

        await conn.sendMessage(
            from,
            {
                text: txt,
                ...silainfo()
            },
            { quoted: myquoted }
        );

    } catch (e) {
        console.error("Alive command error:", e);
        reply(`Error: ${e.message}`);
    }
});
