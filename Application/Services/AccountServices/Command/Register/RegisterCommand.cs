using System;
using Domain.Entities.UserEntities;
using MediatR;

namespace Application.Services.AccountServices.Command.Register;

public record RegisterCommand(CustomRegisterRequest registerRequest) : IRequest<User>;