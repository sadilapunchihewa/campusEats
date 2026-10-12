FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY CampusEats.Api.csproj ./
RUN dotnet restore CampusEats.Api.csproj
COPY . .
RUN dotnet publish CampusEats.Api.csproj -c Release -o /app/publish --no-restore /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080
USER app
ENTRYPOINT ["dotnet", "CampusEats.Api.dll"]
