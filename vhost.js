const express = require('express')

class Vhost {
    /**
     * Virtual host contructor
     * 
     * @param {string} submdomain [based on pages subfolder]
     * @param {Object} nextApp [next js instance  ]
     * 
     */
    constructor (submdomain, nextApp) {
        this.expressApp =  express()
        this.nextApp = nextApp
        this.handle = this.nextApp.getRequestHandler()
        this.submdomain = submdomain
    }

    /**
     * Build virtualhost subdomains 
     * 
     * @returns {Express.Application} 
     */
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