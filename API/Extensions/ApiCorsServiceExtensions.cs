using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApiCorsServiceExtensions
    {
        public static IServiceCollection AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("AllowAll"
                    , policy => policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("https://localhost:4200")));  

            return services;
        }
    }
}