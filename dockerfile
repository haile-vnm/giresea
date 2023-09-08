FROM node:18-alpine
LABEL name=gerisea/webapp version=1.0.0

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start" ]
