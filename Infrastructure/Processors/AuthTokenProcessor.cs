using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.Interfaces.Auth;
using Domain.Entities.UserEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Shared.Options;

namespace Infrastructure.Processors;

public class AuthTokenProcessor : IAuthTokenProcessor
{
    private readonly JwtOptions _jwtOptions;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthTokenProcessor(IOptions<JwtOptions> jwtOptions, IHttpContextAccessor httpContextAccessor)
    {
        _jwtOptions = jwtOptions.Value;
        _httpContextAccessor = httpContextAccessor;
    }

    public (string JwtToken, DateTime expiresAtUtc) GenerateJwtToken(User user)
    {
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Secret));

        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), // Sub = type of the subject
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Jti = Unique identifier of each token
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.ToString()),
        };

        var expires = DateTime.Now.AddMinutes(_jwtOptions.ExpiryTimeInMinutes);

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            expires: expires,
            signingCredentials: credentials);

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        return (jwtToken, expires);
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public void WriteAuthenticationTokenAsHttpOnlyCookie(string cookieName, string token, DateTime expiration)
    {
        _httpContextAccessor.HttpContext.Response.Cookies.Append(cookieName, token, new CookieOptions
        {
            HttpOnly = true,
            Expires = expiration,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
    }
}
