# Keyano - Space Tourism Frontend

[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-markdown.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
![](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sarthakarora1208/space-tourism-frontend">
    <img src="https://user-images.githubusercontent.com/42542489/181535957-35921d70-45d1-4a3f-8388-403b014d6431.gif" alt="Logo">
  </a>

  <h3 align="center">Keyano Space Tourism</h3>

  <p align="center">
    <a href="https://devpost.com/software/keyano-space-tourism"><strong>Explore the docs »</strong></a>
    <br />
	World's first space marketplace. Get your ticket to space now!
    <br />
    <a href="https://youtu.be/eOFrOCmDVV4">View Demo</a>
    ·
    <a href="https://github.com/sarthakarora1208/space-tourism-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/sarthakarora1208/space-tourism-frontend/issues">Request Feature</a>
  </p>
</p>

## Introduction

This project was bootstrapped with Vite.

# Getting Started with the React App

Install all the packages and run the react app

```
npm install
npm run start
```

#### AWS Cognito

You need to create a user pool in [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) and then need to add the credentials to the [config](./src/config/config.ts) file.

```json
const DEVELOPMENT = {
  amplifyConfig: {
    aws_project_region: 'YOUR_AWS_REGION',
    aws_cognito_identity_pool_id: '',
    aws_cognito_region: 'YOUR_AWS_REGION',
    aws_user_pools_id: 'YOUR_USER_POOL_ID',
    aws_user_pools_web_client_id: 'YOUR_USER_POOL_WEB_CLIENT_ID',
    oauth: {},
    aws_appsync_graphqlEndpoint: '',
    aws_appsync_region: '',
    aws_appsync_authenticationType: '',
  },
  ENVIRONMENT: 'development',
}

```

# To get a production build

```
npm run build
```

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
