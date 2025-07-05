using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.CategoryEntities;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        public Task<IEnumerable<Category>> GetAll();
    }
}
