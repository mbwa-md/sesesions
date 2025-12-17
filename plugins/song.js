const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

// Fonts function
const fonts = {
    bold: (text) => `*${text}*`,
    songHeader: () => "╭━━━〔 🎵 𝚂𝙾𝙽𝙶 𝙸𝙽𝙵𝙾 🎵 〕━━━┈⊷",
    songLine: () => "┃🎵│",
    songFooter: () => "╰━━━━━━━━━━━━━━━┈⊷",
    songTemplate: (title, duration, channel) => {
        return `${fonts.songHeader()}
${fonts.songLine()} 𝚃𝙸𝚃𝙻𝙴 :❯ ${fonts.bold(title)}
${fonts.songLine()} 𝙳𝚄𝚁𝙰𝚃𝙸𝙾𝙽 :❯ ${fonts.bold(duration)}
${fonts.songLine()} 𝙲𝙷𝙰𝙽𝙽𝙴𝙻 :❯ ${fonts.bold(channel)}
${fonts.songFooter()}

🎵 *Powered by Sila MD*`;
    }
};

// Get config for PREFIX
const config = require('../config');

// Main command - aliases nyingi
cmd({
    pattern: "song",
    alias: ["play", "music", "audio", "yt", "youtube", "playvid", "video", "mp3", "mp4", "dl"],
    desc: "Search and download YouTube audio/video",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react, sender, pushName }) => {
    try {
        if (!q) {
            return reply(`❌ *Please provide song title!*\nExample: ${config.PREFIX}song faded`);
        }
        
        await react("🔍");
        await reply("🎵 *Searching for song...*");
        
        // Search YouTube
        const search = await yts(q);
        const videos = search.videos;
        
        if (!videos || videos.length === 0) {
            await react("❌");
            return reply("❌ *No songs/videos found!*\nPlease try another search.");
        }
        
        // Take first result
        const video = videos[0];
        
        const songInfo = fonts.songTemplate(
            video.title,
            video.timestamp || "N/A",
            video.author.name
        );
        
        // Create buttons for download options
        const buttonMessage = {
            image: { url: video.thumbnail },
            caption: songInfo,
            footer: `Requested by: ${pushName || sender.split('@')[0]}`,
            buttons: [
                { 
                    buttonId: `song_audio_${video.videoId}`, 
                    buttonText: { displayText: '🎧 Audio' } 
                },
                { 
                    buttonId: `song_video_${video.videoId}`, 
                    buttonText: { displayText: '📹 Video' } 
                },
                { 
                    buttonId: `song_audiodoc_${video.videoId}`, 
                    buttonText: { displayText: '💿 Audio Doc' } 
                },
                { 
                    buttonId: `song_videodoc_${video.videoId}`, 
                    buttonText: { displayText: '🎥 Video Doc' } 
                }
            ]
        };
        
        // Store video info temporarily for button responses
        global.songCache = global.songCache || {};
        global.songCache[video.videoId] = {
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            author: video.author.name,
            duration: video.timestamp,
            timestamp: Date.now()
        };
        
        // Clean old cache after 5 minutes
        setTimeout(() => {
            delete global.songCache[video.videoId];
        }, 5 * 60 * 1000);
        
        await conn.sendMessage(from, buttonMessage, { quoted: m });
        await react("✅");
        
    } catch (error) {
        console.error("Song command error:", error);
        await react("❌");
        reply("❌ *Search failed!*\nPlease try again later.");
    }
});

// Handle button responses
cmd({
    on: "click",
    fromMe: false,
    dontAddCommandList: true
},
async (conn, mek, m, { from, body, reply, react, sender }) => {
    try {
        // Check if it's a song button click
        if (body && body.startsWith('song_')) {
            const parts = body.split('_');
            if (parts.length < 3) return;
            
            const type = parts[1]; // audio, video, audiodoc, videodoc
            const videoId = parts[2];
            
            // Get cached video info
            const videoInfo = global.songCache?.[videoId];
            if (!videoInfo) {
                return reply("❌ *Session expired!*\nPlease search again.");
            }
            
            await react("⏬");
            await reply(`⬇️ *Downloading ${type}...*`);
            
            const youtubeUrl = videoInfo.url;
            let downloadUrl = '';
            let fileName = '';
            let messageType = '';
            
            switch(type) {
                case 'audio':
                    // Try multiple MP3 APIs
                    const mp3Apis = [
                        `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(youtubeUrl)}`,
                        `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(youtubeUrl)}&format=mp3`
                    ];
                    
                    let mp3Found = false;
                    for (const api of mp3Apis) {
                        try {
                            const response = await axios.get(api, { timeout: 30000 });
                            if (response.data && (response.data.url || response.data.audio)) {
                                downloadUrl = response.data.url || response.data.audio;
                                mp3Found = true;
                                break;
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    
                    if (!mp3Found) {
                        await react("❌");
                        return reply("❌ *Failed to download audio!*");
                    }
                    
                    fileName = `${videoInfo.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 50)}.mp3`;
                    messageType = 'audio';
                    break;
                    
                case 'video':
                    const videoApi = `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(youtubeUrl)}&format=mp4`;
                    try {
                        const response = await axios.get(videoApi, { timeout: 60000 });
                        if (response.data && (response.data.url || response.data.video)) {
                            downloadUrl = response.data.url || response.data.video;
                        } else {
                            throw new Error('No video URL');
                        }
                    } catch (e) {
                        await react("❌");
                        return reply("❌ *Failed to download video!*");
                    }
                    
                    fileName = `${videoInfo.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 50)}.mp4`;
                    messageType = 'video';
                    break;
                    
                case 'audiodoc':
                    const audioDocApi = `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(youtubeUrl)}`;
                    try {
                        const response = await axios.get(audioDocApi, { timeout: 30000 });
                        if (response.data && response.data.url) {
                            downloadUrl = response.data.url;
                        } else {
                            throw new Error('No audio URL');
                        }
                    } catch (e) {
                        await react("❌");
                        return reply("❌ *Failed to download audio document!*");
                    }
                    
                    fileName = `${videoInfo.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 50)}.mp3`;
                    messageType = 'document';
                    break;
                    
                case 'videodoc':
                    const videoDocApi = `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(youtubeUrl)}&format=mp4`;
                    try {
                        const response = await axios.get(videoDocApi, { timeout: 60000 });
                        if (response.data && response.data.url) {
                            downloadUrl = response.data.url;
                        } else {
                            throw new Error('No video URL');
                        }
                    } catch (e) {
                        await react("❌");
                        return reply("❌ *Failed to download video document!*");
                    }
                    
                    fileName = `${videoInfo.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 50)}.mp4`;
                    messageType = 'document';
                    break;
                    
                default:
                    return reply("❌ *Invalid option!*");
            }
            
            if (!downloadUrl) {
                await react("❌");
                return reply("❌ *Download failed!*");
            }
            
            // Send the downloaded file
            if (messageType === 'audio') {
                await conn.sendMessage(from, {
                    audio: { url: downloadUrl },
                    mimetype: 'audio/mpeg',
                    fileName: fileName,
                    caption: `*${videoInfo.title}*\n🎵 Downloaded via SILA MD`
                });
            } else if (messageType === 'video') {
                await conn.sendMessage(from, {
                    video: { url: downloadUrl },
                    caption: `*${videoInfo.title}*\n📹 Downloaded via SILA MD`,
                    fileName: fileName
                });
            } else if (messageType === 'document') {
                const mimetype = type.includes('audio') ? 'audio/mpeg' : 'video/mp4';
                await conn.sendMessage(from, {
                    document: { url: downloadUrl },
                    fileName: fileName,
                    mimetype: mimetype,
                    caption: `*${videoInfo.title}*\n📁 Downloaded as Document via SILA MD`
                });
            }
            
            await react("✅");
            
            // Clean cache after successful download
            delete global.songCache[videoId];
        }
    } catch (error) {
        console.error("Button handler error:", error);
        await react("❌");
        reply("❌ *Download failed!*\nPlease try again.");
    }
});

// Alternative command for direct URL download
cmd({
    pattern: "ytdl",
    alias: ["ytdown", "download"],
    desc: "Download from YouTube URL",
    category: "downloader",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q || !q.includes('youtube.com') || !q.includes('youtu.be')) {
            return reply(`❌ *Please provide YouTube URL!*\nExample: ${config.PREFIX}ytdl https://youtube.com/watch?v=...`);
        }
        
        // Get video info
        const search = await yts({ videoId: q.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || '' });
        if (!search.video) {
            await react("❌");
            return reply("❌ *Invalid YouTube URL!*");
        }
        
        const video = search.video;
        
        const songInfo = fonts.songTemplate(
            video.title,
            video.timestamp || "N/A",
            video.author.name
        );
        
        // Create buttons for download options
        const buttonMessage = {
            image: { url: video.thumbnail },
            caption: songInfo,
            footer: "YouTube Downloader",
            buttons: [
                { 
                    buttonId: `song_audio_${video.videoId}`, 
                    buttonText: { displayText: '🎧 Audio' } 
                },
                { 
                    buttonId: `song_video_${video.videoId}`, 
                    buttonText: { displayText: '📹 Video' } 
                },
                { 
                    buttonId: `song_audiodoc_${video.videoId}`, 
                    buttonText: { displayText: '💿 Audio Doc' } 
                },
                { 
                    buttonId: `song_videodoc_${video.videoId}`, 
                    buttonText: { displayText: '🎥 Video Doc' } 
                }
            ]
        };
        
        // Store in cache
        global.songCache = global.songCache || {};
        global.songCache[video.videoId] = {
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            author: video.author.name,
            duration: video.timestamp,
            timestamp: Date.now()
        };
        
        await conn.sendMessage(from, buttonMessage, { quoted: m });
        await react("✅");
        
    } catch (error) {
        console.error("YTDL command error:", error);
        await react("❌");
        reply("❌ *Invalid URL or download failed!*");
    }
});

// Command to show search results with multiple options
cmd({
    pattern: "search",
    alias: ["find", "lookup"],
    desc: "Search YouTube videos",
    category: "search",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) {
            return reply(`❌ *Please provide search query!*\nExample: ${config.PREFIX}search faded`);
        }
        
        await react("🔍");
        await reply("🔎 *Searching YouTube...*");
        
        const search = await yts(q);
        const videos = search.videos.slice(0, 5);
        
        if (!videos.length) {
            await react("❌");
            return reply("❌ *No videos found!*");
        }
        
        let resultText = `*📺 YouTube Search Results*\n\n`;
        
        videos.forEach((video, index) => {
            resultText += `${index + 1}. *${video.title}*\n`;
            resultText += `   ⏱️ ${video.timestamp} | 👁️ ${video.views}\n`;
            resultText += `   👤 ${video.author.name}\n`;
            resultText += `   📥 ${config.PREFIX}song ${video.title.substring(0, 30)}\n\n`;
        });
        
        resultText += `\n*Reply with number to download*\nExample: *1* for first result`;
        
        await reply(resultText);
        await react("✅");
        
        // Store for number selection
        global.searchResults = global.searchResults || {};
        global.searchResults[sender] = videos;
        
    } catch (error) {
        console.error("Search command error:", error);
        await react("❌");
        reply("❌ *Search failed!*");
    }
});
