FROM alpine:latest
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 80
CMD ["npm", "start"]

# docker run -it <image-id>
# docker run -it -p 80:80 <image-id> 