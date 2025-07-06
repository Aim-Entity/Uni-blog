using System;

namespace Domain.Exceptions.Authentication;

public class ConfirmPasswordNotMatchException() : Exception("Passwords Do Not Match");
