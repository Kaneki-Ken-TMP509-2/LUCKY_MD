const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xpOFk2WERvMWZERTV0cXpRZWpLdE80RVJGNnpzYU1BTk1OUHF5RzBVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVE1LblhKRlFqOW5yOThQaTlaZ0ljb3hIa0dsNlBEcE44ZXJLWFBtRzFCTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTm1MUFJUeFhxMFJPYUtuditHakhTSnBiL09RbFJRZFFydXFnNm1RM1ZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQRG40elRGT1JKWnVtQ3BIRUZyZGVMcTZtWVd3ck1oakUyVTdQTEZMdDM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVNNkpCV2hTemJzZS85Q0o5b2Z2MzdOaU9mejBtUE5WWTRDaEhaSW93azQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt3UGhwU3ZjbloyQ3FhSkpheW1qQkJLUytBbDFkSU9xMERLTWovVzIrRlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0VlY3ZzOWtuTmtBdDRIa0ZBOGlFZ3M1VU1uY0ZycS82d1Z6bTB0MDltVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3lyaGJvU0xBeWhob1c0MXZqdnpqeVY5QlVtci9rZkVST0dieFNSaWNqOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlSRm54TEo4TC8zaEN5STlZQXZ5azYrRjBlRllpK3g4Tk96TFJtS0NJR2U3b3VRc2RBM1dLTXN5THJFYmZpdDFWV3lSRk1pcGFxUkNVcnVWbEEzU0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI2LCJhZHZTZWNyZXRLZXkiOiJUdDB1Zjk1dXRhOXFxNWdsckRoVGNaSlE0OStVb3ZVbWsxWVZDOFROejhRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyMTc4NzM2MzY0N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCRTNGMDM1NDgzMDMxOURCQ0RBRjA4QzY0MjI5NjhFRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4NjIwOTE5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMjE3ODczNjM2NDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDk3MzBDNzQwNUQ0MENDMUI3NDZBMTZDNzI2NzI2MUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODYyMDkxOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoicjJkMGFGVUdSek9neDcza3h5bmtGQSIsInBob25lSWQiOiJjNTNjYWY3Ny1mMDY0LTQzNjUtYWYyZi0xZTgzOGIzYTFlYjkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQXlVTFUzWlYwQndxQXlKNzZNZDRCTHpKdzBBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjY2QytVQk83d3J0S0VUMERkMUU2QS9RaDNhRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJXUjk2V0NLRSIsIm1lIjp7ImlkIjoiMjIxNzg3MzYzNjQ3OjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lLdW5zY0hFT2ZTb3JnR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBkR3lXcndNbElHK1UxemEvYzRwdEpGTkJPZThpV24zWm9PNE1PWU5WWFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1qK1kyN3F6STEyRDJuYjY3NXQ2RGM4VDFlRGJ2Q2tDNi9wamwzdFJMQlQ3NkxhRVlWS3p0SUttRkRjcmg1bnlWcGZpMDJUb2VhT3pUTW5HMGVQTkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJadnNaV0RzaUFSS1c0eFhRb0xsNmVoMk12WjBrVm45azRPMUE4QlgwdHhLNVpXUmtUdmZ1Y0VGODVjc1o3MHN1a0RvWlU4WW00aTFpU0J1REJncFJBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyMTc4NzM2MzY0Nzo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlQzUnNscThESlNCdmxOYzJ2M09LYlNSVFFUbnZJbHA5MmFEdUREbURWVjAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjg2MjA5MTUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTXJqIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255620814108,255764182801,255752593977",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ecRS5BQ.jpeg,https://files.catbox.moe/g73xvl.jpeg,https://files.catbox.moe/qh500b.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Dodoma',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
