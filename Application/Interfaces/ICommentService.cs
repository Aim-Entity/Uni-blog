using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.CommentEntities;

namespace Application.Interfaces
{
    public interface ICommentService
    {
        public Task<IEnumerable<Comment>> GetAll();
        public Task<Comment> CreateNew();
    }
}
