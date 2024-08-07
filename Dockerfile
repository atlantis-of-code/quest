# Client side compilation
FROM atlantisofcode/base AS client
COPY quest-client /quest/quest-client
RUN \
	cd /quest/quest-client && \
	npm install && \
	npm run build

# Server side compilation
FROM atlantisofcode/base AS server
COPY quest-server /quest/quest-server
RUN \
	cd /quest/quest-server && \
    npm install && \
	npm run build && \
    npm prune --omit=dev

# Production image
FROM atlantisofcode/base AS production

COPY --from=server /quest/quest-server/dist/ /quest/quest-server/dist
COPY --from=server /quest/quest-server/public/ /quest/quest-server/public
COPY --from=server /quest/quest-server/package.json /quest/quest-server/package.json
COPY --from=server /quest/quest-server/node_modules /quest/quest-server/node_modules
COPY --from=server /quest/quest-server/aoc-server-config.json /quest/quest-server/aoc-server-config.json

COPY --from=client /quest/quest-client/dist/quest-client/. /quest/quest-server/public/

EXPOSE 3000

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /quest/quest-server

ENTRYPOINT ["npm", "run", "start"]
