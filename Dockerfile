FROM node:12.2.0 as build

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g @nestjs/cli

COPY ["package.json","package-lock.json" ,"./"]

RUN npm install

COPY . .

RUN nest build

## Prod
FROM node:12.2.0-alpine as production

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ["package.json","package-lock.json","./"]

RUN npm install --only=prod
COPY . .
COPY --from=build /usr/src/app/dist /usr/src/app


EXPOSE 3000
CMD ["node","dist/main"]
