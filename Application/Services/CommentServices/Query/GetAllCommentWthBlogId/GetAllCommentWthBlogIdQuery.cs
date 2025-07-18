using System;
using Domain.Entities.CommentEntities;
using MediatR;

namespace Application.Services.CommentServices.Query.GetAllCommentWthBlogId;

public record GetAllCommentWthBlogIdQuery(long blogId) : IRequest<IEnumerable<Comment>>;

