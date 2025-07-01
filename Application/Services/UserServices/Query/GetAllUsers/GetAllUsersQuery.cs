using Domain.Entities.UserEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices.Query.GetAllUsers
{
    public record GetAllUsersQuery() : IRequest<IEnumerable<User>>;
}
