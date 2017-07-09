FROM ubuntu:xenial

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install packages 
run apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm 
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]
