using Application.Interfaces;
using Application.Services.CommentServices.Command.CreateComment;
using Application.Services.CommentServices.Query.GetAllComments;
using Domain.Entities.CommentEntities;
using MediatR;
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
        public async Task<Comment> Create(Comment comment)
        {
            return await _sender.Send(new CreateCommentCommand(comment));
        }
    }
}
