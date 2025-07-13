using System;
using MediatR;

namespace Application.Services.AccountServices.Command.Token;

public record RefreshTokenCommand(string? refreshToken) : IRequest;