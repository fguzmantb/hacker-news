FROM node:10

RUN mkdir /opt/app

WORKDIR /opt/app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . .

ENV IS_DOCKER true

EXPOSE 3000

CMD [ "nodemon", "src/app.js" ]