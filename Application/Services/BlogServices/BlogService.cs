using Application.Interfaces;
using Application.Services.BlogServices.Query.GetAllBlogs;
using Domain.Entities.BlogEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.BlogServices
{
    public class BlogService : IBlogService
    {
        private readonly ISender _sender;

        public BlogService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Blog>> GetAll()
        {
            return await _sender.Send(new GetAllBlogsQuery());
        }
    }
}
