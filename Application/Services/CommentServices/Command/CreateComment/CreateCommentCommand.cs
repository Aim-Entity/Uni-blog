using System;
using Domain.Entities.CommentEntities;
using MediatR;

namespace Application.Services.CommentServices.Command.CreateComment;

public record CreateCommentCommand(Comment comment) : IRequest<Comment>;
