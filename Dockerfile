FROM node:14.18.3

WORKDIR /home/node/app

# Install deps
COPY . ./home/node/app


COPY . .

COPY ./package.json .
RUN mv /home/node/app/.env.example  /home/node/app/.env

RUN npm cache clean  --force
RUN npm install --production
RUN npm prune --production
RUN npm run build




# Start the app
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD [ "npm", "start" ]

