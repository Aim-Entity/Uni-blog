using Application.Interfaces;
using Application.Services.AccountServices;
using Domain.Entities.UserEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomAuthenticationController : ControllerBase
    {
        private readonly IAccountServices _accountService;

        public CustomAuthenticationController(IAccountServices accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("CustomRegister")]
        public async Task<ActionResult> CustomRegister([FromBody] CustomRegisterRequest registerRequest)
        {
            var res = await _accountService.RegisterAsync(registerRequest);

            return Ok(new 
            { 
                data = new {
                    email = res.Email, name = res.ToString(), token = res.RefreshToken
                },
                status = "success"
            });
        }

        [HttpPost]
        [Route("CustomLogin")]
        public async Task<ActionResult> CustomLogin(Login login)
        {
            var res = await _accountService.LoginAsync(login);

            return Ok(new
            {
                data = new { email = res.Email, name = res.ToString(), userId = res.Id},
                status = "success"
            });
        }

        [HttpPost]
        [Route("CustomRefresh")]
        public async Task<ActionResult> CustomRefresh()
        {
            var refreshToken = HttpContext.Request.Cookies["REFRESH_TOKEN"];

            await _accountService.RefreshTokenAsync(refreshToken);

            return Ok();
        }
    }
}
