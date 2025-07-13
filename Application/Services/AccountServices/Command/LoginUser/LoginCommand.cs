using System;
using Domain.Entities.UserEntities;
using MediatR;

namespace Application.Services.AccountServices.Command.LoginUser;

public record LoginCommand(Login login) : IRequest<User>;