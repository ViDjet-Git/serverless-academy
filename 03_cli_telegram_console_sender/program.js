const { program } = require('commander');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

process.env.NTBA_FIX_350 = true;

const token = '6560684640:AAFu2sFolWPTBRXLUuKz7GUgsK_AOeTd7to';
const bot = new TelegramBot(token, {polling: true});
const chatId = fs.readFileSync('chat.txt');


program.command('message')
  .alias('m')
  .description('Send message from Bot')
  .argument('<string>', 'Message to send')
  .action(async (str) => {
    await bot.sendMessage(chatId, str);
    console.log(`You sended a message: ${str}`);
    process.exit(0);
  });

program.command('photo')
  .alias('p')
  .description('Send picture from Bot')
  .argument('<string>', 'Path to picture')
  .action(async (str) => {
    if(fs.existsSync(str)){ 
      await bot.sendPhoto(chatId, str);
      console.log(`You sended a photo: ${str}`);
    } else{
      console.log("File DOESN'T EXIST by path: " + str);
    }
    process.exit(0);
  });

program.parse();