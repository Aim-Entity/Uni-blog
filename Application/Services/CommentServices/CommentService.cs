using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.CommentServices
{
    public class CommentService
    {
        private readonly ISender _sender;

        public CommentService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Dto>> GetAll()
        {
            return await _sender.Send(new GetAllCommentsQuery());
        }
    }
}
