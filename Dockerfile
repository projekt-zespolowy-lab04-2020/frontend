FROM node:latest
WORKDIR /app
COPY . .
CMD npm install ; npm run build
