const server = require('./server.js')

async function main() {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()

process.on('SIGTERM', () => process.exit(1))
