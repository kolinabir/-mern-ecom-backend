/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()

process.on('unhandledRejection', (err: any) => {
  console.log(
    `unHandledRejection is detected 🔥🔥🔥  , shutting down ... server`,
  )
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', (err: any) => {
  console.log(
    `unCaughtException is detected 🔥🔥🔥  , shutting down ... server`,
  )
  process.exit(1)
})
