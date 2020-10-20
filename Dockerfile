# Build
FROM node:12.16.3-alpine as build-env

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

COPY ./src/ /app/src/

RUN npm i && \
    npm audit fix
RUN npm run build

# Runtime
FROM node:12.16.3-alpine as runtime
ENV NODE_VERSION 12.16.3
RUN apk add --no-cache tzdata
ENV TZ 'America/Sao_Paulo'

WORKDIR /app

# Copy only the files needed at the runtime
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY --from=build-env /app/dist /app/dist

WORKDIR /app

RUN npm ci
RUN npm audit fix

ENV NODE_ENV=PROD
ENV HOST=0.0.0.0
CMD ["npm", "start"]
