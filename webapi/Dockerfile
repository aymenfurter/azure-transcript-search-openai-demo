# Set the base image as the .NET 6.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory in the image to /app
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the files and build the project
COPY . ./
RUN dotnet publish -c Release -o out

# Generate runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app

# Expose the necessary ports. Ensure this aligns with your Kestrel configuration
EXPOSE 80
EXPOSE 443

# Copy the build output from the build image
COPY --from=build /app/out .

# Set the entry point for the container
ENTRYPOINT ["dotnet", "CopilotChatWebApi.dll"]
