FROM node:alpine
WORKDIR /app
COPY . .
CMD npm install ; npm run build
