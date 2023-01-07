# Next.js Multiple Site (Subdomain) 🏋️‍♂️

## Development requirement 🏗
1. check  your local pc dns `/etc/host`
2. makesure subdomain has to asign to localhost
3. just run usually to install and run node.js package

## Production requirement 🚢

### 1. Using Docker 🐳
1. make sure the domain in .env.example has same with domain on mapping to the server
2. make sure subdomain is name with folder name in `pages` subfolder

### 2. In CPanel 🚤
on progress

## Apps Flow 

### 1. Using Docker 🐳
```mermaid
  sequenceDiagram
    actor Client
    Client ->> DNS Server: get address of subdomain
    DNS Server ->> Client: address
    Client ->> Nginx Proxy : request in
    par Inside Docker
        Nginx Proxy ->> next-multiple-site: request in
        Nginx Proxy ->> Nginx Proxy: all filter custom <br>like :<br> 1. rate limit <br> 2. security<br> 3.validator ect
        Nginx Proxy ->> next-multiple-site: request forward
        next-multiple-site ->> next-multiple-site: check subdomin comming
        next-multiple-site ->> Nginx Proxy: response
    end
    Nginx Proxy ->> Client: response
```
### 2. In CPanel 🚤
```mermaid
 sequenceDiagram
    actor Client
    Client ->> DNS Server: get address of subdomain
    DNS Server ->> Client: address
    Client ->> Hosting Proxy : request in
    Hosting Proxy ->> next-multiple-site: request in
    Hosting Proxy ->> Hosting Proxy: all filter custom <br>like :<br> 1. rate limit <br> 2. security<br> 3.validator ect
    Hosting Proxy ->> next-multiple-site: request forward
    next-multiple-site ->> next-multiple-site: check subdomin comming
    next-multiple-site ->> Hosting Proxy: response
    Hosting Proxy ->> Client: response 

   
```