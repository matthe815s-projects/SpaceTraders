import path from 'path'
import Client from '../SpaceTraders.js/src/client/Client'
import Ship from '../SpaceTraders.js/src/client/ships/Ship'
import express, { Response } from 'express'
import SafeStringify from 'fast-safe-stringify'

export default class WebClient {
  private client: Client
  public app: any

  constructor (client: Client) {
    this.client = client
    this.app = express()
    this.app.use(express.static(path.resolve(__dirname, 'public')))
    this.app.use(express.static(path.resolve(__dirname, 'build')))
    this.app.set('view engine', 'ejs')
    this.app.set('views', path.join(__dirname, '/build'))
  }

  start () {
    this.app.listen(3000, () => console.log('Listening on port 3000'))
    this.registerEndpoints()
  }

  registerEndpoints () {
    this.app.get('/api/ships', (req: any, res: Response) => {
      const ships: Ship[] = []

      this.client.ships.cache.forEach((ship: any) => {
        const { client: _,  nav: { route: { origin: { system: __ }, destination: { system: ___ } } }, ...shipData } = ship
        ships.push(shipData)
      })

      res.json(ships)
    })
  }
}
