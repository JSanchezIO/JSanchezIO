FROM node:18 AS build-env
WORKDIR /app
RUN npm install --global pnpm@7
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm ci:build

FROM node:18-alpine
WORKDIR /app
RUN npm install --global pnpm@7
COPY --from=build-env /app/dist ./dist
COPY --from=build-env /app/package.json /app/pnpm-lock.yaml ./
ENV NPM_CONFIG_LOGLEVEL=error
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile --ignore-scripts
CMD ["node", "./dist/index.js"]