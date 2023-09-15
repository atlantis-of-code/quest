# Client side compilation
FROM registry.jeronibrunet.com/aoc-node-base:18 AS client
ARG configuration=prod-quest
COPY .npmrc /root/.npmrc
COPY quest-client /quest/quest-client
RUN \
	cd /quest/quest-client && \
    npm install @atlantis-of-code/aoc-client@latest && \
	npm ci && \
	npx npm run build:$configuration && \
	rm /root/.npmrc

# Server side compilation
FROM registry.jeronibrunet.com/aoc-node-base:18 AS server
COPY .npmrc /root/.npmrc
COPY quest-server /quest/quest-server
RUN \
	cd /quest/quest-server && \
    npm install @atlantis-of-code/aoc-server@latest && \
	npm ci && \
	npm run build && \
    npm prune --omit=dev && \
	rm /root/.npmrc

# Production image
FROM registry.jeronibrunet.com/aoc-node-base:18 AS production

COPY --from=server /quest/quest-server/dist/ /quest/quest-server/dist
COPY --from=server /quest/quest-server/public/ /quest/quest-server/public
COPY --from=server /quest/quest-server/package.json /quest/quest-server/package.json
COPY --from=server /quest/quest-server/node_modules /quest/quest-server/node_modules
COPY --from=server /quest/quest-server/aoc-server-config.json /quest/quest-server/aoc-server-config.json

COPY --from=client /quest/quest-client/dist/quest-client/es/. /quest/quest-server/public/

EXPOSE 3000

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /quest/quest-server

ENTRYPOINT ["npm", "run", "start"]
