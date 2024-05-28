'use strict'

import Client from '../SpaceTraders.js/src/client/Client'
import {existsSync, readFileSync, writeFileSync} from 'fs'
import WebClient from './WebClient'
import Contract from "../SpaceTraders.js/src/client/contracts/Contract";
import {Trait} from "../SpaceTraders.js/src/client/systems/SystemManager";

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

  console.log(client.systems.cache)

  if (client.ships.cache.size < 3) {
    for (const system of Array.from(client.systems.cache.values())) {
      await system.find(Trait.SHIPYARD)
    }
  }
})

client.on('contractsLoad', (contracts: Contract[]) => {
  console.log(`Current contract count: ${contracts.length}; Accepted: ${contracts.filter((contract: Contract) => contract.accepted).length}`)

  for (const contract of contracts) {
    console.log("Accepted:")
    console.log(contract.terms.deliver)
  }
})
