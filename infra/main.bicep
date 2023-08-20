targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

// Variables
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = {
  // Add your desired tags here
}

param resourceGroupName string = ''
var openAiServiceName = ''
var openAiSkuName = 'S0' 
var chatGptDeploymentName = 'gpt-35-turbo'
var chatGptModelName = 'gpt-35-turbo'
var chatGptDeploymentCapacity = 100
var embeddingDeploymentName = 'text-embedding-ada-002'
var embeddingDeploymentCapacity = 60
param embeddingModelName string = 'text-embedding-ada-002'
param openAiResourceGroupName string = ''
@description('Location for the OpenAI resource group')
@allowed(['eastus', 'francecentral', 'southcentralus', 'uksouth', 'westeurope'])
@metadata({
  azd: {
    type: 'location'
  }
})
param openAiResourceGroupLocation string

@description('A name for the YouTube channel to use for the search index (without the @, e.g. lexfridman)')
param youTubeChannelName string

var searchServiceName = ''
var searchServiceSkuName = 'standard' // Change to your desired SKU

var abbrs = loadJsonContent('abbreviations.json')
resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

resource openAiResourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' existing = if (!empty(openAiResourceGroupName)) {
  name: !empty(openAiResourceGroupName) ? openAiResourceGroupName : resourceGroup.name
}

// OpenAI Deployment
module openAi 'core/ai/cognitiveservices.bicep' = {
  name: 'openai'
  scope:  openAiResourceGroup
  params: {
    name: !empty(openAiServiceName) ? openAiServiceName : '${abbrs.cognitiveServicesAccounts}${resourceToken}'
    location: openAiResourceGroupLocation
    tags: tags
    sku: {
      name: openAiSkuName
    }
    deployments: [
      {
        name: chatGptDeploymentName
        model: {
          format: 'OpenAI'
          name: chatGptModelName
          version: '0301' 
        }
        sku: {
          name: 'Standard'
          capacity: chatGptDeploymentCapacity
        }
      }
      {
        name: embeddingDeploymentName
        model: {
          format: 'OpenAI'
          name: embeddingModelName
          version: '2'
        }
        capacity: embeddingDeploymentCapacity
      }
    ]
  }
}

// Cognitive Search Deployment
module searchService 'core/search/search-services.bicep' = {
  name: 'search-service'
  scope: resourceGroup 
  params: {
    name: !empty(searchServiceName) ? searchServiceName : 'gptkb-${resourceToken}'
    location: location
    tags: tags
    authOptions: {
      aadOrApiKey: {
        aadAuthFailureMode: 'http401WithBearerChallenge'
      }
    }
    sku: {
      name: searchServiceSkuName
    }
    semanticSearch: 'free'
  }
}

module appServicePlan './core/host/appserviceplan.bicep' = {
  name: 'appserviceplan'
  scope: resourceGroup
  params: {
    name: '${abbrs.appBackend}${resourceToken}'
    location: location
    tags: tags
    sku: {
      name: 'B1'
    }
  }

}
// Application Backend Deployment
module appBackendDeployment './app/api.bicep' = {
  name: 'appbackend-deployment'
  scope: resourceGroup
  params: {
    name: '${abbrs.appBackend}${resourceToken}'
    location: location
    appServicePlanId: appServicePlan.outputs.id
    allowedOrigins: [
      appFrontendDeployment.outputs.SERVICE_WEB_URI
    ]
    appSettings: {
      AZURE_OPENAI_DEPLOYMENT_NAME: chatGptDeploymentName
      AZURE_OPENAI_ENDPOINT: openAi.outputs.endpoint
      AZURE_OPENAI_API_KEY: openAi.outputs.primaryKey
      ACS_INSTANCE: searchService.outputs.name
      ACS_KEY: searchService.outputs.primaryKey
    }
  }
}

// Application Frontend Deployment
module appFrontendDeployment './app/web.bicep' = {
  name: 'appfrontend-deployment'
  scope: resourceGroup
  params: {
    name: '${abbrs.appFrontend}${resourceToken}'
    appServicePlanId: appServicePlan.outputs.id
    location: location
  }
}

module frontendSettings './core/host/appservice-appsettings.bicep' = {
  name: 'frontend-appsettings'
  scope: resourceGroup
  params: {
    name: appFrontendDeployment.outputs.SERVICE_WEB_NAME
    appSettings: {
      UI_APP_API_BASE_URL: appBackendDeployment.outputs.SERVICE_API_URI
    }
  }
}

// Data outputs
output AZURE_OPENAI_DEPLOYMENT_NAME string = chatGptDeploymentName
output AZURE_OPENAI_ENDPOINT string = openAi.outputs.endpoint
output AZURE_OPENAI_API_KEY string = openAi.outputs.primaryKey
output ACS_INSTANCE string = searchService.outputs.name
output ACS_KEY string = searchService.outputs.primaryKey

// App outputs
output APP_BACKEND_NAME string = appBackendDeployment.outputs.SERVICE_API_NAME
output APP_BACKEND_URL string = appBackendDeployment.outputs.SERVICE_API_URI
output APP_FRONTEND_NAME string = appFrontendDeployment.outputs.SERVICE_WEB_NAME
output APP_FRONTEND_URL string = appFrontendDeployment.outputs.SERVICE_WEB_URI

output YOUTUBE_CHANNEL_NAME string = youTubeChannelName
