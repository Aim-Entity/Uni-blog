using Domain.Entities.BlogEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.BlogServices.Query.GetAllBlogs
{
    public record GetAllBlogsQuery() : IRequest<IEnumerable<Blog>>;

}
