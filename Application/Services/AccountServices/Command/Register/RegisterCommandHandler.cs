using System;
using Domain.Entities.UserEntities;
using Domain.Exceptions;
using Domain.Exceptions.Authentication;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.AccountServices.Command.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, User>
{
    private readonly UserManager<User> _userManager;

    public RegisterCommandHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<User> Handle (RegisterCommand command, CancellationToken cancellationToken) 
    {

        if(command.registerRequest.Password != command.registerRequest.ConfirmPassword)
        {
            throw new ConfirmPasswordNotMatchException();
        };

        var userExists = await _userManager.FindByEmailAsync(command.registerRequest.Email);

        if(userExists != null)
        {
            throw new UserAlreadyExistsException(command.registerRequest.Email);
        };

        var user = User.Create(command.registerRequest.Email, command.registerRequest.FirstName, command.registerRequest.LastName);
        user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, command.registerRequest.Password);

        var result = await _userManager.CreateAsync(user);

        if(!result.Succeeded)
        {
            throw new RegistrationFailedException(result.Errors.Select(x => x.Description));
        }

        return await _userManager.FindByEmailAsync(user.Email);
    }
}
