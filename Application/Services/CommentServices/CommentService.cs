using Application.Interfaces;
using Application.Services.CommentServices.Command.CreateComment;
using Application.Services.CommentServices.Query.GetAllComments;
using Application.Services.CommentServices.Query.GetAllCommentWthBlogId;
using Domain.Entities.CommentEntities;
using MediatR;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CommentServices
{
    public class CommentService : ICommentService
    {
        private readonly ISender _sender;

        public CommentService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await _sender.Send(new GetAllCommentsQuery());
        }

        public async Task<IEnumerable<Comment>> AllCommentWthBlogId(long blogId)
        {
            return await _sender.Send(new GetAllCommentWthBlogIdQuery(blogId));
        }

        public async Task<CreateCommentDto> Create(CreateCommentDto comment)
        {
            return await _sender.Send(new CreateCommentCommand(comment));
        }
    }
}
