using System;
using Application.Interfaces.Repositories;
using Domain.Entities.CommentEntities;
using MediatR;

namespace Application.Services.CommentServices.Command.CreateComment;

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Comment>
{
    private readonly ICommentRepository _commentRepository;

    public CreateCommentCommandHandler(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }

    public async Task<Comment> Handle(CreateCommentCommand command, CancellationToken cancellationToken) {
        return await _commentRepository.Create(command.comment);
    }
}
