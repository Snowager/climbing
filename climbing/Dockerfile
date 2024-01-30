FROM node:20-alpine

WORKDIR /climbing

COPY . .

RUN npm install

EXPOSE 8081:8081

CMD ["npx", "expo", "start"]