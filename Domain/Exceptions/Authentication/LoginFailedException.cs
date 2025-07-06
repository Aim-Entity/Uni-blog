using System;

namespace Domain.Exceptions.Authentication;

public class LoginFailedException(string email) : Exception($"Invalid email: {email} or password");
