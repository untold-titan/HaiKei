FROM ubuntu

RUN apt-get update
RUN apt-get -y git nodejs lsb-release

RUN curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

RUN echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

RUN apt-get update
RUN apt-get install redis

RUN npm i -g yarn
RUN cd cosumet-api
RUN yarn
RUN cd ..
RUN yarn
