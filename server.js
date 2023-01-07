const express = require('express')
const next = require('next')
const vhost = require('vhost')
const Vhost = require('./vhost')

const {promises: {readdir, access}} = require("fs");

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
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
    mainServer.use(vhost(`${subDomain}.localhost`, vHosts[subDomain]))
  }

  mainServer.listen(port, (err) => {
    if (err) throw err

    console.log(`> Ready on http://localhost:${port}`)
  })
})
