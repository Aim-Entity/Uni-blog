using Application.Interfaces.Repositories;
using Domain.Entities.BlogEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.BlogServices.Query.GetAllBlogs
{
    public class GetAllBlogsQueryHandler : IRequestHandler<GetAllBlogsQuery, IEnumerable<Blog>>
    {
        private readonly IBlogRepository _blogRepository;

        public GetAllBlogsQueryHandler(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public async Task<IEnumerable<Blog>> Handle(GetAllBlogsQuery request, CancellationToken cancellationToken)
        {
            var blogs = await _blogRepository.GetAll();
            return blogs;
        }
    }
}
