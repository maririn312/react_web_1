# NomadX Web Front

[![Github Action Badge][github-nodejs-action-badge]][github-nodejs-action]

## Cheatsheet of Project

### Commands

* `yarn` to install package of nodejs
* `yarn start` to start development server on port 8080
* `yarn test` to run unit test
* `docker build -t nomadx_front .` to build docker image
* `docker tag [image_id] [dockerhub_username]/nomadx_front:[prod/test-version]` tag a image 
* `docker run -d -p 80:80 [dockerhub_username]/nomadx_front` to run a container with custom name
* `docker push [dockerhub_username]/nomadx_front:[prod/test-version]` upload to dockerhub


### Links
* Generate DTO(Data Transfer Object) with [quicktype.io](https://app.quicktype.io/)
* [Redux with TypeScript](https://redux.js.org/usage/usage-with-typescript)

## Licence
NomadX(c) copyright. 2022

[github-nodejs-action]: https://github.com/dalai0302/urgoo/actions
[github-nodejs-action-badge]: https://github.com/dalai0302/urgoo/actions/workflows/node.js.yml/badge.svg 
[test-coverage-badge]: https://github.com/dalai0302/urgoo/tree/master/coverage/badge-functions.svg 
