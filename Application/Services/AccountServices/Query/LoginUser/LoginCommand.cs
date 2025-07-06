using System;
using Domain.Entities.UserEntities;
using MediatR;

namespace Application.Services.AccountServices.Query.LoginUser;

public record LoginCommand(Login login) : IRequest<User>;