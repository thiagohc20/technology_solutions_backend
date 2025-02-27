FROM node:18.17.1-alpine3.18 AS build

WORKDIR /usr/src/app

# Copy files
COPY ./src ./src
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./nest-cli.json .

# Install dependencies
RUN npm install
RUN npm run build --prod

ENV NODE_ENV production

# PROD STAGE
FROM node:18.17.1-alpine3.18 AS prod

WORKDIR /usr/src/app

# Copy src folder
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/tsconfig.json .

# Copy package.json and package-lock.json
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json

RUN npm i dotenv
RUN npm i typeorm
RUN npm i

# Update packages
RUN apk upgrade

EXPOSE 3000

# CMD ["sh", "-c", "npm run migration:run && node dist/main"]
CMD ["sh", "-c", "node dist/main"]