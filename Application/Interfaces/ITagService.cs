using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.TagEntities;

namespace Application.Interfaces
{
    public interface ITagService
    {
        public Task<IEnumerable<Tag>> GetAll();
        public Task<Tag> CreateNew();
    }
}
