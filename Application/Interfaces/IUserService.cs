using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.UserEntities;

namespace Application.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAll();
    }
}
