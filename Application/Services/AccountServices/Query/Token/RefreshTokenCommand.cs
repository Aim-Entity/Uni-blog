using System;
using MediatR;

namespace Application.Services.AccountServices.Query.Token;

public record RefreshTokenCommand(string? refreshToken) : IRequest;