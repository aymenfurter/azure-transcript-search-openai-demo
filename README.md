# Turn any YouTube Channel Into a Chatbot
<img style="border-radius: 10px;" src="architecture.png?raw=true">

This example demonstrates how to create a ChatGPT-style application using the Retrieval Augmented Generation (RAG). It leverages Azure's OpenAI Service to access the ChatGPT model (gpt-3.5-turbo) and employs Azure Cognitive Search Vector Search for data indexing and retrieval.

## Features
- Chat Interface
- Ask question related to the videos, and get answers from the video transcripts
- Directly jump to the video section where the answer is found through the embedded video player or the links found in the answer

<img style="border-radius: 10px;" src="screenshot.png?raw=true">

## Prerequisites 
To deploy the application, please ensure that you have the following dependencies installed on your machine.
* [Azure Developer CLI](https://aka.ms/azure-dev/install)
* [Python 3.9+](https://www.python.org/downloads/)
* [Node.js 14+](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)
* [Bash / WSL](https://learn.microsoft.com/en-us/windows/wsl/install) 

## Installation
1. Clone the repository and navigate to the project root
2. Run `azd auth login`
3. Run `azd up`
4. Specify the target locations for the Azure resources aswell as the name of the  channel you want to index. 

Important: Based on the video size and the number of videos, the indexing process can take up one hour. By default, only the first 20 videos are indexed. You can change this by modifying the `prepdocs.sh` file.

### Sample deployment output
    $ azd up
    ? Enter a new environment name: lexfridman
    ? Select an Azure Subscription to use: 1. Your Subscription
    ? Select an Azure location to use:  7. (Asia Pacific) Central India (centralindia)

    Packaging services (azd package)

    (✓) Done: Packaging service api
    - Package Output: /tmp/azddeploy2823501235.zip
    (✓) Done: Packaging service web
    - Package Output: /tmp/azddeploy817139155.zip

    Provisioning Azure resources (azd provision)
    Provisioning Azure resources can take some time

    ? Enter a value for the 'openAiResourceGroupLocation' infrastructure parameter:  2. (Europe) West Europe (westeurope)
    ? Save the value in the environment for future use Yes
    ? Enter a value for the 'youTubeChannelName' infrastructure parameter: lexfridman
    ? Save the value in the environment for future use Yes
    You can view detailed progress in the Azure Portal:
    https://portal.azure.com/...

    (✓) Done: Resource group: rg-lexfridman
    (✓) Done: App Service plan: appbackend
    (✓) Done: App Service: appfrontend
    (✓) Done: Azure OpenAI: csa
    (✓) Done: Search service: gpt
    Executing postprovision hook => ./scripts/prepdocs.sh

    Deploying services (azd deploy)

    (✓) Done: Deploying service api
    - Endpoint: https://appbackend.azurewebsites.net/

    (✓) Done: Deploying service web
    - Endpoint: https://appfrontend.azurewebsites.net/
