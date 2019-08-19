FROM node:dubnium-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --verbose
COPY . ./

EXPOSE 5000
ENTRYPOINT ["npm", "run", "deploy"];
