FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=service_1 --prod /prod/service_1
RUN pnpm deploy --filter=service_2 --prod /prod/service_2
RUN pnpm deploy --filter=web       --prod /prod/web

FROM base AS service_1
COPY --from=build /prod/service_1 /prod/service_1
WORKDIR /prod/service_1
EXPOSE 3001
CMD [ "pnpm", "start" ]

FROM base AS service_2
COPY --from=build /prod/service_2 /prod/service_2
WORKDIR /prod/service_2
EXPOSE 3002
CMD [ "pnpm", "start" ]

FROM nginx:stable-alpine as web
COPY --from=build /prod/web/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]