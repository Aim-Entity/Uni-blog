using System;
using Domain.Entities.UserEntities;

namespace Application.Interfaces.Auth;

public interface IAuthTokenProcessor
{
    (string JwtToken, DateTime expiresAtUtc) GenerateJwtToken(User user);
    string GenerateRefreshToken();

    void WriteAuthenticationTokenAsHttpOnlyCookie(string cookieName, string token, DateTime expiration);
}
