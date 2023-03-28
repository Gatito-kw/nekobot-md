// @ts-check
import * as ws from 'ws'
import path from 'path'
import chalk from 'chalk'
import storeSystem from './store.js'
import Helper from './helper.js'
import { HelperConnection } from './simple.js'
import importFile from './import.js'
import db, { loadDatabase } from './database.js'
import single2multi from './single2multi.js'
import P from 'pino'

/** @type {import('@adiwajshing/baileys')} */
// @ts-ignore
const {
    DisconnectReason,
    msgRetryCounterMap,
    default: makeWASocket,
    // useSingleFileAuthState
} = (await import('@adiwajshing/baileys')).default

const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ''}sessions`)
const authFile = `${Helper.opts._[0] || 'session'}.data.json`

let [
    isCredsExist,
    isAuthSingleFileExist,
    authState
] = await Promise.all([
    Helper.checkFileExists(authFolder + '/creds.json'),
    Helper.checkFileExists(authFile),
    storeSystem.useMultiFileAuthState(authFolder)
])

const store = storeSystem.makeInMemoryStore()

// Convert single auth to multi auth
if (Helper.opts['singleauth'] || Helper.opts['singleauthstate']) {
    if (!isCredsExist && isAuthSingleFileExist) {
        console.debug('- singleauth -', 'creds.json not found', 'compiling singleauth to multiauth...')
        await single2multi(authFile, authFolder, authState)
        console.debug('- singleauth -', 'compiled successfully')
        authState = await storeSystem.useMultiFileAuthState(authFolder)
    } else if (!isAuthSingleFileExist) console.error('- singleauth -', 'singleauth file not found')
}

const storeFile = `${Helper.opts._[0] || 'data'}.store.json`
store.readFromFile(storeFile)

// from: https://github.com/adiwajshing/Baileys/blob/master/src/Utils/logger.ts

/** @type {import('@adiwajshing/baileys').UserFacingSocketConfig} */
const connectionOptions = {
   printQRInTerminal: true,
   auth: authState.state,
   logger: P({
      level: 'silent'
   }),
   browser: ['NK - ねこ', 'Firefox', '3.0'],
   version: [2, 2308, 7]
}

/** 
 * @typedef {{ 
 *  handler?: typeof import('../handler').handler; 
 *  participantsUpdate?: typeof import('../handler').participantsUpdate; 
 *  groupsUpdate?: typeof import('../handler').groupsUpdate; 
 *  onDelete?:typeof import('../handler').deleteUpdate; 
 *  connectionUpdate?: typeof connectionUpdate; 
 *  credsUpdate?: () => void 
 * }} EventHandlers
 * @typedef {Required<import('@adiwajshing/baileys').UserFacingSocketConfig>['logger']} Logger
 * @typedef {ReturnType<typeof makeWASocket> & EventHandlers & { 
 *  isInit?: boolean; 
 *  isReloadInit?: boolean; 
 *  msgqueque?: import('./queque').default;
 *  logger?: Logger
 * }} Socket 
 */


/** @type {Map<string, Socket>} */
let conns = new Map();
/** 
 * @param {Socket?} oldSocket 
 * @param {{ 
 *  handler?: typeof import('../handler'); 
 *  isChild?: boolean; 
 *  connectionOptions?: Partial<import('@adiwajshing/baileys').UserFacingSocketConfig>; 
 *  store: typeof store 
 * }} opts
 */
async function start(oldSocket = null, opts = { store }) {
    /** @type {Socket} */
    let conn = makeWASocket({
       ...connectionOptions,
       ...opts.connectionOptions,
       msgRetryCounterMap,
       connectTimeoutMs: 60_000,
       generateHighQualityLinkPreview: false,
       patchMessageBeforeSending: (message) => {
			const requiresPatch = !!( message.buttonsMessage || message.listMessage || message.templateMessage)
			if (requiresPatch) {
			message = {
			viewOnceMessageV2: {
			message: {
				messageContextInfo: {
					deviceListMetadataVersion: 2,
					deviceListMetadata: {},
				},
				...message,
			},},}}
		return message;
		},
       getMessage: async key => {
       return {}
       }
    })
    HelperConnection(conn, { store: opts.store })

    if (oldSocket) {
        conn.isInit = oldSocket.isInit
        conn.isReloadInit = oldSocket.isReloadInit
    }
    if (conn.isInit == null) {
        conn.isInit = false
        conn.isReloadInit = true
    }

    store.bind(conn.ev, {
        groupMetadata: conn.groupMetadata
    })
    await reload(conn, false, opts).then((success) => console.log('- bind handler event -', success))

    return conn
}


let OldHandler = null
/** 
 * @param {Socket} conn 
 * @param {boolean} restartConnection
 * @param {{ 
 *  handler?: Promise<typeof import('../handler')> | typeof import('../handler'); 
 *  isChild?: boolean 
 * }} opts
 */
async function reload(conn, restartConnection, opts = {}) {
    if (!opts.handler) opts.handler = importFile(Helper.__filename(path.resolve('./handler.js'))).catch(console.error)
    if (opts.handler instanceof Promise) opts.handler = await opts.handler;
    if (!opts.handler && OldHandler) opts.handler = OldHandler
    OldHandler = opts.handler
    // const isInit = !!conn.isInit
    const isReloadInit = !!conn.isReloadInit
    if (restartConnection) {
        try { conn.ws.close() } catch { }
        // @ts-ignore
        conn.ev.removeAllListeners()
        Object.assign(conn, await start(conn) || {})
    }

    global.msgconfig = getMessageConfig()

    if (!isReloadInit) {
        if (conn.handler) conn.ev.off('messages.upsert', conn.handler)
        if (conn.participantsUpdate) conn.ev.off('group-participants.update', conn.participantsUpdate)
        if (conn.groupsUpdate) conn.ev.off('groups.update', conn.groupsUpdate)
        if (conn.onDelete) conn.ev.off('messages.delete', conn.onDelete)
        if (conn.connectionUpdate) conn.ev.off('connection.update', conn.connectionUpdate)
        if (conn.credsUpdate) conn.ev.off('creds.update', conn.credsUpdate)
    }
    if (opts.handler) {
        /** @type {typeof import('../handler')} */
        conn.handler = (opts.handler).handler.bind(conn)
        conn.participantsUpdate = (opts.handler).participantsUpdate.bind(conn)
        conn.groupsUpdate = (opts.handler).groupsUpdate.bind(conn)
        conn.onDelete = (opts.handler).deleteUpdate.bind(conn)
    }
    if (!opts.isChild) conn.connectionUpdate = connectionUpdate.bind(conn)
    conn.credsUpdate = authState.saveCreds.bind(conn)
    // conn.credsUpdate = authState.saveState.bind(conn)

    /** @typedef {Required<EventHandlers>} Event */
    conn.ev.on('messages.upsert', (conn).handler)
    conn.ev.on('group-participants.update', (conn).participantsUpdate)
    conn.ev.on('groups.update', (conn).groupsUpdate)
    conn.ev.on('messages.delete', (conn).onDelete)
    if (!opts.isChild) conn.ev.on('connection.update', (conn).connectionUpdate)
    conn.ev.on('creds.update', (conn).credsUpdate)

    conn.isReloadInit = false
    return true

}

/**
 * @this {Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['connection.update']} update
 */
async function connectionUpdate(update) {
    // console.log(update)
    const { connection, lastDisconnect, isNewLogin } = update
    if (isNewLogin) this.isInit = true
    // @ts-ignore
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
    if (code && code !== DisconnectReason.loggedOut && this?.ws.readyState !== ws.CONNECTING) {
        await reload(this, true).catch(console.error)
        global.timestamp.connect = new Date
    }
    // if (connection == 'open') console.log('- opened connection -')
        if (update.qr != 0 && update.qr != undefined) {
        console.log(chalk.bold(chalk.rgb(233, 36, 116)('\n\n📍 Escanee el código QR que se enviará a continuación, el código QR caduca en 20 Segundos.')))
        console.log('\nQR :', chalk.green(update.qr))
    }
    if (connection == 'connecting') this.logger.info('Conectando...')
    if (connection == 'open') this.logger.info('Conectado')
    if (connection == 'close') this.logger.warn('Desconectado')
    
    if (db.data == null) loadDatabase()
}

function getMessageConfig() {
   const welcome = '*Hola @user, bienvenido al Grupo @group.*'
   const bye = '*Adios @user.*'
   return {
      welcome,
      bye
   }
}

const conn = start(null, { store }).catch(console.error)


export default {
    start,
    reload,

    conn,
    conns,
    // logger,
    connectionOptions,

    authFolder,
    storeFile,
    authState,
    store,

    getMessageConfig
}
export {
    conn,
    conns,
    // logger
}