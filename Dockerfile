FROM node:slim
# Note: we could have used alpine, but for development we better
# have debian with bash and other small goodies pre-installed

USER node

VOLUME /home/node/app

WORKDIR /home/node/app

CMD ["scripts/docker-entrypoint.sh"]
