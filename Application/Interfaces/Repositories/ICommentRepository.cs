using Domain.Entities.CommentEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>> GetAll();
        public Task<Comment> Create(Comment comment);
    }
}
