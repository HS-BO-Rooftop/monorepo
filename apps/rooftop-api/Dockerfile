FROM node:16-alpine

WORKDIR /app

COPY ./dist/apps/rooftop-api .

# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN apk add --update make gcc g++ 
# Install git
RUN apk add --no-cache git

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG VERSION=unknown
ENV VERSION=${VERSION}


RUN npm install pg
RUN npm install --omit=dev
# RUN yarn add reflect-metadata tslib rxjs @nestjs/platform-express apollo-server-express@^2.25.3 cors mssql
# RUN npm install reflect-metadata tslib pg

EXPOSE 3000

CMD ["node", "./main.js"]