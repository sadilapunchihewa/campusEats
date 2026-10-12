using CampusEats.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Render and Railway supply PORT. Docker uses 8080 when PORT is absent.
var platformPort = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(platformPort))
{
    if (!int.TryParse(platformPort, out var port) || port < 1 || port > 65535)
        throw new InvalidOperationException("PORT must be a number between 1 and 65535.");
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var frontendOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        if (frontendOrigins.Length > 0)
            policy.WithOrigins(frontendOrigins).AllowAnyHeader().AllowAnyMethod();
    });
});

// Register the service
builder.Services.AddSingleton<IMenuService, MenuService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}

// The hosting platform terminates public HTTPS; the container receives HTTP.

app.UseCors("Frontend");
app.UseAuthorization();

app.MapControllers();
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

app.Run();
