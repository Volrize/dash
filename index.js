//-------------- TANIMLAMALAR --------------
const Discord = require('discord.js')
const client = new Discord.Client({disableMentions:"everyone",ws: { intents: new Discord.Intents(Discord.Intents.ALL) }})
const efDB = require("efdb")
const db = new efDB({
	databaseName:"ekData",
	databaseFolder:"veriler",
	adapter:"YamlDB"
})
const fs = require("fs")
const moment = require("moment");
require("moment-duration-format");

//const millisCreated = new Date().getTime() - client.users.cache.get("554266211043770400").createdTimeStamp.getTime();
//    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
  
//----------- AYARLAMALAR ------------
client.ayarlar = {
	token: "ODQwMjI3NjkzOTcwNTg3NzE4.YJVJBA.wLIw43w_2TKm6YyadyFkHXTFS88",
	gelistirici:["716930725877907466"],
	oauthSecret: "DOwgCnq1hjbYbYd9_rNmW1v-6reZb-Wv",
	callbackURL: "http://dashhh.glitch.me/callback",
    id:"840227693970587718",
	prefix:"p!",
  goldlog:""
}
client.commands = new Discord.Collection()

var deasync = require('deasync');

function userBul(ID) {
  return deasync(async(_ID, cb) => {
    let output = null;

    try {
      let user = await client.users.fetch(_ID);

      output = { 
        tag: user.tag,
        avatar: user.avatarURL(),
        name:user.username,
        isbot:user.bot,
     };
    } catch(err) { output = {tag:"Bulunamadı#0000",isbot:null,name:"Bulunamadı",avatar:client.user.avatarURL()} }
    
    cb(null, output);
  })(ID);
}

 function kisalt(str) {
  var newstr = "";
  var koyulan = 0;
  if(str.length > 10) {
    dongu: for(var i = 0;i<str.length;i++) {
      const element = str.split("")[i];
      if(i >= 28) { 
        if(koyulan < 3) {
          newstr += " .";
          koyulan++;
        }else {
          break dongu;
        }
        
      }else newstr += element; 
    }
    return newstr;
  }else return str;
}

const zaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

function botista() {
	return {
		serverSize: client.guilds.cache.size,
		userSize:client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
		emojiSize:client.emojis.cache.size.toLocaleString(),
		channelSize:client.channels.cache.size.toLocaleString(),
		uptime:moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")
	}
}
client.db = db
client.stats = botista
client.kisibul = userBul
client.tools = {
	kisalt:kisalt
}
client.on("ready", async() => {
 console.log(`Bot Online`)
  require("./dash")(client)
})
let tag = ""
Object.keys(db.get(`viptime`) || "").map(id => {
setInterval(() => {
      let x = db.get(`viptime.${id}`);
    if(x) {
    if(x < Date.now()) {
  db.delete(`vip.${id}`);
db.delete(`viptime.${id}`);
      let embe = new Discord.MessageEmbed() 
.setColor("#FFEE58") 
.setDescription(`**${client.kisibul(id).tag}** Adlı kullanıcının vip üyeliği bitti`)
client.channels.cache.get(client.ayarlar.goldlog).send(embe);
    }
}else{
}    }, 1000)
                                   }) 



const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
//const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log("7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);