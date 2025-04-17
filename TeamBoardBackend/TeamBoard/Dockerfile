# Base image with ASP.NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Build image with .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project and restore dependencies
COPY ["TeamBoard.csproj", "./"]
RUN dotnet restore "TeamBoard.csproj"

# Copy the rest of the source code
COPY . .

# Build the app
RUN dotnet build "TeamBoard.csproj" -c Release -o /app/build

# Publish the app
RUN dotnet publish "TeamBoard.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage: build lightweight runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# Start the application
ENTRYPOINT ["dotnet", "TeamBoard.dll"]
