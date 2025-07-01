using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public class UserService
    {
        private readonly ISender _sender;

        public UserService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<Dto>> GetAll()
        {
            return await _sender.Send(new GetAllUsersQuery());
        }
    }
}
