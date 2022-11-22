FROM node:19-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
# Disable next.js telemetry (see https://nextjs.org/telemetry#how-do-i-opt-out)
RUN npx next telemetry disable
RUN npm run build
EXPOSE 4200
CMD npm run start
