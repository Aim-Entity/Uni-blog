using System;
using Application.Interfaces.Repositories;
using Domain.Entities.CommentEntities;
using MediatR;

namespace Application.Services.CommentServices.Query.GetAllCommentWthBlogId;

public class GetAllCommentWthBlogIdQueryHandler : IRequestHandler<GetAllCommentWthBlogIdQuery, IEnumerable<Comment>>
{
    private readonly ICommentRepository _commentRepository;

    public GetAllCommentWthBlogIdQueryHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task<IEnumerable<Comment>> Handle(GetAllCommentWthBlogIdQuery request, CancellationToken cancellationToken)
    {
        var all = await _commentRepository.GetAllWithBlogId(request.blogId);
        return all;
    }
}
