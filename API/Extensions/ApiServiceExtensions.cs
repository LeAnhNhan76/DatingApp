using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApiServiceExtensions
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services)
        {
            services.AddControllers();

            return services;
        }
    }
}