using System;
using Domain.Entities.BlogEntities;
using MediatR;

namespace Application.Services.BlogServices.Command.CreateBlog;

public record CreateBlogCommand(Blog Blog) : IRequest<Blog>;

