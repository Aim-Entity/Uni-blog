using System;

namespace Domain.Exceptions.Authentication;

public class RefreshTokenException(string message) : Exception(message);
