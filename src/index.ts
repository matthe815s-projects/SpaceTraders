'use strict'

import Client from '../SpaceTraders.js/src/client/Client'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import WebClient from './WebClient'

if (!existsSync('config.json')) {
  console.log('No config.json found, creating one')
  writeFileSync('config.json', JSON.stringify({ token: '' }))
}

const config = JSON.parse(readFileSync('config.json', 'utf-8'))

const client = new Client()
const webClient = new WebClient(client)

client.Login(config.token)

client.on('ready', async () => {
  console.log('Client ready')
  webClient.start()

  console.log(`Current ship count: ${client.ships.cache.size}`)
  console.log(`Current system count: ${client.systems.cache.size}`)
})
