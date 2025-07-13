using System;
using Application.Interfaces.Repositories;
using Domain.Entities.BlogEntities;
using MediatR;

namespace Application.Services.BlogServices.Command.CreateBlog;

public class CreateBlogCommandHandler : IRequestHandler<CreateBlogCommand, Blog>
{
    private readonly IUserRepository _userRepository;
    private readonly IBlogRepository _blogRepository;


    public CreateBlogCommandHandler(IUserRepository userRepository, IBlogRepository blogRepository)
    {
        _userRepository = userRepository;
        _blogRepository = blogRepository;
    }

    public async Task<Blog> Handle(CreateBlogCommand command, CancellationToken cancellationToken) {
        return await _blogRepository.Create(command.Blog);
    }

}
