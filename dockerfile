FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
EXPOSE 8888
CMD ["npm", "start"]