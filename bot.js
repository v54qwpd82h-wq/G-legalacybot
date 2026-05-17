const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inisyalize Kliyan WhatsApp la ak memwa otomatik
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Afiche Kòd QR a nan tèminal la pou w ka skane l
client.on('qr', (qr) => {
    console.log('--- SKANE KÒD QR SA A AK WHATSAPP OU ---');
    qrcode.generate(qr, { small: true });
});

// Lè bot la fin konekte avèk siksè
client.on('ready', () => {
    console.log('🎉 Bot G-Legacy a pare e li kòmanse kouri!');
});

// Sistèm Repons Otomatik la
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname || 'Kliyan';
    const body = msg.body.trim();

    // Nou sèlman reponn si se yon moun ki ekri, pa nan gwoup
    if (!chat.isGroup) {
        
        // 1. MESAJ BYENVENI (Si moun lan ekri Bonjou, Alo, Yo, oswa nenpòt lòt mo)
        if (body.toLowerCase() === 'bonjou' || body.toLowerCase() === 'bonswa' || body.toLowerCase() === 'alo' || body.toLowerCase() === 'menu') {
            const menuText = `👋 Alo ${name}! Byenvini nan *G-LEGACY* — Tech & Design. ⚡\nMwen se asistan otomatik Germain an. Kijan m ka ede w jodi a?\n\n*Chwazi yon opsyon nan tape nimewo a:* \n\n[1] 🌐 *Sèvis Web / Sit Web*\n[2] 📱 *Devlopman Aplikasyon Mobile*\n[3] 🎨 *Design, Logo & Branding*\n[4] 📣 *Maketing & Pwomosyon*\n[5] 👤 *Pale ak Germain dirèkteman*`;
            await client.sendMessage(msg.from, menuText);
        }

        // 2. REPONS POU OPSYON YO
        else if (body === '1') {
            await client.sendMessage(msg.from, `🌐 *SÈVIS WEB — G-LEGACY*\n\nNou bati sit web pwofesyonèl, landing pages, ak sit e-commerce k ap monte vizibilite w nan nivo siperyè.\n\n*Sa n ofri:*\n- Sit vitrin pou biznis\n- Landing Page pou vann pwodwi\n- Sit E-commerce konplè\n\n_Pou n diskite pri pwojè w la, tape *5* pou w kite yon mesaj pou Germain._`);
        } 
        
        else if (body === '2') {
            await client.sendMessage(msg.from, `📱 *APLIKASYON MOBILE — G-LEGACY*\n\nNou devlope aplikasyon mobil pwofesyonèl pou Android (fichye APK) ak iOS, adapte ak bezwen biznis ou oswa sistèm chat otomatik ou bezwen.\n\n_Tape *5* pou w pale ak Germain sou pwojè sa a._`);
        } 
        
        else if (body === '3') {
            await client.sendMessage(msg.from, `🎨 *DESIGN & BRANDING — G-LEGACY*\n\nBay biznis ou yon idantite vizyèl pwofesyonèl.\n\n*Sèvis nou yo:*\n- Kreyasyon Logo eksklizif\n- Afich ak Flyères pou rezo sosyal\n- Bannann / Katalòg\n- Chwa non ak estil mak`);
        } 
        
        else if (body === '4') {
            await client.sendMessage(msg.from, `📣 *MAKETING & PWOMOSYON — G-LEGACY*\n\nNou ede w grandi odyans ou byen rapid:\n- Pwomosyon Chèn YouTube\n- Pwomosyon Chèn WhatsApp\n- Estrateji vizibilite sou Rezo Sosyal yo.`);
        } 
        
        else if (body === '5') {
            await client.sendMessage(msg.from, `👤 *Mesaj ou anrejistre!* Germain ap pran kontak avè m byen rapid kounye a. Mèsi pou pasyans ou! 🙏✨`);
            // Opsyonèl: Ou ka fè bot la voye yon notifikasyon bay pwòp tèt ou isit la.
        }
    }
});

client.initialize();
