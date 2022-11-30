# Quick ID Verification

This project is to demonstrate how to setup a project with [AWS Amplify](https://aws.amazon.com/amplify/) with React/NextJS as a web application with a Lambda as the backend that connects with [Amazon Rekognition](https://aws.amazon.com/rekognition/) for Identity Verification.

## Demo

The demo app is available [here](https://main.d48eefq6oxypm.amplifyapp.com/).

## Development

### Prerequisites

We need to have installed the following services:

- [GIT](https://git-scm.com/)
- [nvm](https://github.com/nvm-sh/nvm) | Optional - Check for the `node` and `npm` version from [package.json](./package.json) `engines` to use the same versions of the project
- AWS Account
- [Amplify](https://docs.amplify.aws/cli/start/install/)

### Project Setup

1. Fork the project and clone your GitHub project

   ```bash
   git clone https://github.com/${USER_NAME}/quick-id-verification
   ```

2. Install node and npm version of the project

   ```bash
   nvm use
   npm install -g npm@${NPM_VERSION}
   ```

3. Install project dependencies

   ```bash
   npm ci
   ```

4. Install Amplify

   Next, if you do not have the AWS Amplify CLI installed, please follow the instructions at [AWS Amplify - Installation](https://docs.amplify.aws/cli/start/install/).

### Amplify Project Setup

If amplify has not been configure, run `amplify configure` to connect Amplify with the local environment.

### Initialize Amplify

Initialize a new Amplify project

```bash
 amplify init
 ? Enter a name for the project: myquickidverification${YOUR_NAME}
 ? Enter a name for the environment: production
 ? Choose your default editor: Visual Studio Code (or your preferred editor)
 ? Choose the type of app that youre building: javascript
 ? What javascript framework are you using: react
 ? Source Directory Path: src
 ? Distribution Directory Path: .next
 ? Build Command: npm run-script build
 ? Start Command: npm run-script start
 ? Do you want to use an AWS profile? Y
 ? Please choose the profile you want to use: <your profile>
```

### Add Hosting

The project runs as SSR Web App, and Amplify only allows Continuos Deployment git-based with SSR Web Apps, and following the Amplify instructions to connect the repository.

```bash
amplify add hosting
? Select the plugin module to execute: Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type: Continuous deployment (Git-based deployments)
```

### Publish Content

Deploy the app to Amplify using `amplify publish`.

This will create a Node 18.x lambda with in-line policies for Rekognition and an endpoint using the API Gateway available to the frontend.

### Frontend Build

The hosting of the frontend is trigger when pushing a new commit to repository.

## ID Verification Logic

After the user has uploaded the two images and the request has been sent to the backend for verification:

1. The images of the user and the ID are checked using the `DetectFaces API` by checking the face quality individually of each image.
2. The two images are compared using the `CompareFaces API` to make ensure the two images are a matched.

## Enable PR Preview with Amplify

By default, PR Previews with Amplify are only available with private repositories. Follow the instructions from [AWS Amplify - Hosting - Pull-request previews](https://docs.amplify.aws/guides/hosting/pull-request-previews/q/platform/js/) to enable it.

## AWS Pricing Calculator

Using the AWS Pricing Calculator, an estimation has been created based on 1000 Check ID Verifications. The estimation is available [here](https://calculator.aws/#/estimate?id=1745bd834cb3f5a09916bda1414f245da56ceab0).

## One Click Deployment App

Using the One Click Deployment will build the web app ready to be used without any local configuration.

[![Amplify Button](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/juancarlosjr97/quick-id-verification)

## Acknowledgment

The project has been inspired on a [AWS Example](https://github.com/aws-samples/amazon-rekognition-id-verification-sample-with-amplify).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file.
