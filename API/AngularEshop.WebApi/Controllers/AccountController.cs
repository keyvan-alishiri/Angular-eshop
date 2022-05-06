﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AngularEshop.Core.DTOs.Account;
using AngularEshop.Core.Services.Interfaces;
using AngularEshop.Core.Utilities.Common;
using AngularEshop.Core.Utilities.Extensions.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AngularEshop.WebApi.Controllers
{

    public class AccountController : SiteBaseController
    {
        #region costructor

        private IUserService userService;

        public AccountController(IUserService userService)
        {
            this.userService = userService;
        }

        #endregion

        #region Register

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO register)
        {
            if (ModelState.IsValid)
            {
                var res = await userService.RegisterUser(register);

                switch (res)
                {
                    case RegisterUserResult.EmailExists:
                        return JsonResponseStatus.Error(new { info = "EmailExist" });
                }
            }

            return JsonResponseStatus.Success();
        }

        #endregion

        #region Login

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO login)
        {
            if (ModelState.IsValid)
            {
                var res = await userService.LoginUser(login);

                switch (res)
                {
                    case LoginUserResult.IncorrectData:
                        return JsonResponseStatus.NotFound(new { message = "حساب کاربری وجود ندارد" });

                    case LoginUserResult.NotActivated:
                        return JsonResponseStatus.Error(new { message = "حساب کاربری شما فعال نشده است" });

                    case LoginUserResult.Success:
                        var user = await userService.GetUserByEmail(login.Email);
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AngularEshopJwtBearer"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokenOptions = new JwtSecurityToken(
                            issuer: "https://localhost:44302",
                            claims: new List<Claim>
                            {
                               
                                new Claim(ClaimTypes.Name, user.Email),
                                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                                
                            },
                            
                            expires: DateTime.Now.AddDays(30),
                            signingCredentials: signinCredentials
                        );
                  
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                        return JsonResponseStatus.Success(new {
                           token = tokenString,
                           expireTime = 30, 
                           firstName = user.FirstName,
                           lastName = user.LastName,
                           userId = user.Id ,
                           address=user.Address
                        });
                }
            }

            return JsonResponseStatus.Error();
        }

	  #endregion

	  #region Check User Authentication
      [HttpPost("check-auth")]
	  public async Task<IActionResult> CheckUserAuth()
	  {
         
		 if (User.Identity.IsAuthenticated)
		 {
            var user =await userService.GetUserByUserId(User.GetUserId());
            return JsonResponseStatus.Success( new {
               firstName =user.FirstName,
               lastName=user.LastName,
               address=user.Address,
               email=user.Email,

            });
            

         }
         return JsonResponseStatus.Error();
	  }
	  #endregion



	  #region Activate User Account
      [HttpGet("activate-account/{id}")]
      public async Task<IActionResult> ActivateAccount(string id)
	  {
         var user =await userService.GetUserByEmailActiveCode(id);
         if(user!= null)
		 {
            userService.ActivateUser(user);
            return JsonResponseStatus.Success();
		 }
         return JsonResponseStatus.NotFound();
	  }
	  #endregion

	  #region Sign Out

	  [HttpGet("sing-out")]
        public async Task<IActionResult> LogOut()
        {
            if (User.Identity.IsAuthenticated)
            {
                await HttpContext.SignOutAsync();
                return JsonResponseStatus.Success();
            }

            return JsonResponseStatus.Error();
        }

        #endregion
    }
}