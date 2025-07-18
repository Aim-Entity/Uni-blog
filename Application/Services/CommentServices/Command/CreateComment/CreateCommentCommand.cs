using System;
using Domain.Entities.CommentEntities;
using MediatR;
using Shared.DTOs;

namespace Application.Services.CommentServices.Command.CreateComment;

public record CreateCommentCommand(CreateCommentDto comment) : IRequest<CreateCommentDto>;
