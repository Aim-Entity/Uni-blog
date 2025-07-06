using Application.Interfaces;
using Application.Services.AccountServices.Query.LoginUser;
using Application.Services.AccountServices.Query.Register;
using Application.Services.AccountServices.Query.Token;
using Domain.Entities.UserEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.AccountServices
{
    public class AccountServices : IAccountServices
    {
        private readonly ISender _sender;

        public AccountServices(ISender sender)
        {
            _sender = sender;
        }

        public async Task<User> RegisterAsync(CustomRegisterRequest registerRequest)
        {
            return await _sender.Send(new RegisterCommand(registerRequest));
        }

        public async Task<User> LoginAsync(Login login)
        {
            return await _sender.Send(new LoginCommand(login));
        }

        public async Task RefreshTokenAsync(string? refreshToken)
        {
            await _sender.Send(new RefreshTokenCommand(refreshToken));
        }
    }
}
