using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class DbServiceExtensions
    {
        public static IServiceCollection AddDbServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContextPool<ApplicationDbContext>(options => {
                options.UseSqlServer(
                    config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}