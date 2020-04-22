FROM node
WORKDIR /app
COPY . .
CMD npm install ; npm run build
