FROM node:18-alpine
LABEL name=gerisea/webapp version=1.0.0

RUN yarn global add typescript react-scripts

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

VOLUME [ "/app/node_modules" ]

EXPOSE 3000

CMD [ "yarn", "start" ]
