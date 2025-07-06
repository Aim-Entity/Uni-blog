using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities.UserEntities;

namespace Application.Interfaces
{
    public interface IAccountServices
    {
        Task<User> RegisterAsync(CustomRegisterRequest registerRequest);
        Task<User> LoginAsync(Login login);
        Task RefreshTokenAsync(string? refreshToken);
    }
}
