using System;
using Application.Interfaces.Auth;
using Application.Interfaces.Repositories;
using Domain.Entities.UserEntities;
using Domain.Exceptions.Authentication;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Shared.Options;

namespace Application.Services.AccountServices.Query.LoginUser;

public class LoginCommandHandler : IRequestHandler<LoginCommand, User>
{
    private readonly UserManager<User> _userManager;

    private readonly IAuthTokenProcessor _authTokenProcessor;
    private readonly IUserRepository _userRepository;

    private readonly JwtOptions _jwtOptions;

    public LoginCommandHandler(IAuthTokenProcessor authTokenProcessor, UserManager<User> userManager, IUserRepository userRepository, IOptions<JwtOptions> jwtOptions)
    {
        _authTokenProcessor = authTokenProcessor;
        _userManager = userManager;
        _userRepository = userRepository;
        _userManager = userManager;
        _jwtOptions = jwtOptions.Value;
    }

    public async Task<User> Handle(LoginCommand command, CancellationToken cancellationToken) {
        var user = await _userManager.FindByEmailAsync(command.login.Email);

        bool checkPassword = await _userManager.CheckPasswordAsync(user, command.login.Password);

        if (user == null || !checkPassword)
        {
            throw new LoginFailedException(command.login.Email);
        };

        var (jwtToken, expirationDateInUTC) = _authTokenProcessor.GenerateJwtToken(user);
        var refreshTokenValue = _authTokenProcessor.GenerateRefreshToken();

        var refreshTokenExpirationDateInUtc = DateTime.Now.AddMinutes(_jwtOptions.ExpiryTimeInMinutes);

        user.RefreshToken = refreshTokenValue;
        user.RefreshTokenExpiresAtUTC = refreshTokenExpirationDateInUtc;

        await _userManager.UpdateAsync(user);

        _authTokenProcessor.WriteAuthenticationTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUTC);
        _authTokenProcessor.WriteAuthenticationTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);

        return user;
    }
}
