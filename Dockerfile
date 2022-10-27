FROM node:16-alpine
ARG ENV
WORKDIR /app
COPY . .

ENV APP_ENV=${ENV}
# EXPOSE 8769
RUN npm install
RUN npm run build
RUN npm prune --production
CMD node dist/main.js