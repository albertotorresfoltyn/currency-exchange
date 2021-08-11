# Anyfin Challenge

## Risponsabilities

### Server

Create a NodeJs GraphQL server which allows you to look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to SEK. Requests should require a valid JWT obtained from a separate /login endpoint and should be rate limited to 30 requests per minute. 

### Web

Create a simple web interface for your NodeJs server using React.js which allows users to:

1. Search and add countries to a list displaying the full country name, population and currency (be mindful of no of requests you make to server)
2. Enter an amount in SEK and get the amount converted into local currency next to each country in the list. Feel free to use any npm packages you like as long as they're OSS, but you need to be able to motivate your choices and we value concise, well structured code with a small footprint.

## Starting
### Prerequisites

be sure you have this utilities installed on your local machine:

- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/install/)

### Running

- Create/configure `.env` environment with your credentials for the server and the web projects. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.

- Run `docker-compose up` to start the server.
