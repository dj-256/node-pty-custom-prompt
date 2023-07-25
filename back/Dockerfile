FROM ubuntu:22.04
EXPOSE 6060
RUN apt update \
    && apt install sudo npm -y \
    && echo "PS1=\"\e[1;32m\u@tuto\e[0m:\e[1;34m\w\e[0m\$ \"" >> /root/.bashrc
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY main.js .
CMD ["node", "main.js"]