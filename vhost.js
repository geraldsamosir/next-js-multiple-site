const express = require('express')

class Vhost {
    constructor (submdomain, nextApp) {
        this.expressApp =  express()
        this.nextApp = nextApp
        this.handle = this.nextApp.getRequestHandler()
        this.submdomain = submdomain
    }

    build() {
      this.expressApp.get('/', (req, res) => {
        return this.nextApp.render(req, res, `/${this.submdomain}`, req.query)
      })
    
      this.expressApp.get('/*', (req, res) => {
        return this.nextApp.render(req, res, `/${this.submdomain}${req.path}`, req.query)
      })
    
      this.expressApp.all('*', (req, res) => {
        return this.handle(req, res)
     })

     return this.expressApp
    }
}

module.exports = Vhost