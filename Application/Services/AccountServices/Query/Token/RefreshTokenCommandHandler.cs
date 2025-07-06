using System;
using Application.Interfaces.Auth;
using Application.Interfaces.Repositories;
using Domain.Entities.UserEntities;
using Domain.Exceptions.Authentication;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Shared.Options;

namespace Application.Services.AccountServices.Query.Token;

public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand>
{
    private readonly UserManager<User> _userManager;

    private readonly IAuthTokenProcessor _authTokenProcessor;
    private readonly IUserRepository _userRepository;

    private readonly JwtOptions _jwtOptions;

    public RefreshTokenCommandHandler(IAuthTokenProcessor authTokenProcessor, UserManager<User> userManager, IUserRepository userRepository, IOptions<JwtOptions> jwtOptions)
    {
        _authTokenProcessor = authTokenProcessor;
        _userManager = userManager;
        _userRepository = userRepository;
        _userManager = userManager;
        _jwtOptions = jwtOptions.Value;
    }
    public async Task Handle (RefreshTokenCommand command, CancellationToken cancellationToken) 
    {

        if (string.IsNullOrEmpty(command.refreshToken))
            {
                throw new RefreshTokenException("Refresh token is missing");
            }

            var user = await _userRepository.GetUserByRefreshTokenAsync(command.refreshToken);

            if(user == null)
            {
                throw new RefreshTokenException("Unable to retrieve user for refresh token");
            }

            if(user.RefreshTokenExpiresAtUTC < DateTime.UtcNow)
            {
                throw new RefreshTokenException("Session expired");
            }

            var (jwtToken, expirationDateInUTC) = _authTokenProcessor.GenerateJwtToken(user);
            var refreshTokenValue = _authTokenProcessor.GenerateRefreshToken();

            var refreshTokenExpirationDateInUtc = DateTime.Now.AddMinutes(_jwtOptions.ExpiryTimeInMinutes);

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUTC = refreshTokenExpirationDateInUtc;

            await _userManager.UpdateAsync(user);

            _authTokenProcessor.WriteAuthenticationTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUTC);
            _authTokenProcessor.WriteAuthenticationTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
    }
}
