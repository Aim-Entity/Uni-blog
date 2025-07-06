using System;

namespace Domain.Exceptions.Authentication;

public class RegistrationFailedException(IEnumerable<string> errorDescription) : Exception($"Registration failed with following errors: {string.Join(Environment.NewLine, errorDescription)}");
