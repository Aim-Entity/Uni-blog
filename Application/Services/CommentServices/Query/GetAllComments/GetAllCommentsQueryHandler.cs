using Application.Interfaces.Repositories;
using Application.Services.BlogServices.Query.GetAllBlogs;
using Domain.Entities.BlogEntities;
using Domain.Entities.CommentEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CommentServices.Query.GetAllComments
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, IEnumerable<Comment>>
    {
        private readonly ICommentRepository _commentRepository;

        public GetAllCommentsQueryHandler(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<IEnumerable<Comment>> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            var all = await _commentRepository.GetAll();
            return all;
        }
    }
}
