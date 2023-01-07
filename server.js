
const express = require('express')
const dotenv = require('dotenv')
const next = require('next')
const vhost = require('vhost')
const Vhost = require('./vhost')
const {promises: {readdir, access}} = require("fs");
dotenv.config()

const { env: {PORT, NODE_ENV, DOMAIN_NAME }} = process

const port = PORT || 3000
const domainName = DOMAIN_NAME
const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


const getListSubdomain = async () => {
  let pages =  await readdir('./pages', {withFileTypes: true})
  pages = pages.filter(page=> page.isDirectory)
  
  return pages.map(page => page.name)
}

app.prepare().then(async() => {
  const mainServer = express()

  const subDomains = await getListSubdomain()

  const vHosts = {}
  
  for( subDomain of subDomains) {
    vHosts[subDomain] = new Vhost(subDomain, app)
    vHosts[subDomain] = vHosts[subDomain].build()
    mainServer.use(vhost(`${subDomain}.${domainName}`, vHosts[subDomain]))
  }

  mainServer.listen(port, (err) => {
    if (err) throw err

    console.log(`> Ready on ${domainName}:${port}`)
  })
})
