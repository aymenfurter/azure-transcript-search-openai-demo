FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG QUESTION_1
ARG QUESTION_2
ARG QUESTION_3
ARG QUESTION_4
ARG TARGET_URL

RUN echo "export const environment = {" > ./src/environments/environment.ts && \
    echo "  sampleQueries: [" >> ./src/environments/environment.ts && \
    echo "    \"$QUESTION_1\"," >> ./src/environments/environment.ts && \
    echo "    \"$QUESTION_2\"," >> ./src/environments/environment.ts && \
    echo "    \"$QUESTION_3\"" >> ./src/environments/environment.ts && \
    echo "  ]," >> ./src/environments/environment.ts && \
    echo "  targetUrl: \"$TARGET_URL\"" >> ./src/environments/environment.ts && \
    echo "};" >> ./src/environments/environment.ts



RUN npm run build

FROM nginx:1.23

COPY --from=0 /app/dist/webui /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

