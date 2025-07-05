using Application.Interfaces;
using Application.Services.BlogServices;
using Application.Services.CategoryServices;
using Application.Services.CommentServices;
using Application.Services.TagServices;
using Application.Services.UserServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public static class ConfigureService
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<IUserService, UserService>();

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}
