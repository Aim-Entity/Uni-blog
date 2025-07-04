﻿using Application.Interfaces;
using Application.Services.UserServices.Query.GetAllUsers;
using Domain.Entities.UserEntities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly ISender _sender;

        public UserService(ISender sender)
        {
            _sender = sender;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _sender.Send(new GetAllUsersQuery());
        }
    }
}
