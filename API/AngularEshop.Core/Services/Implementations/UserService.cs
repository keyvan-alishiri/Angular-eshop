﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularEshop.Core.DTOs.Account;
using AngularEshop.Core.Security;
using AngularEshop.Core.Services.Interfaces;
using AngularEshop.Core.Utilities.Convertors;
using AngularEshop.DataLayer.Entities.Account;
using AngularEshop.DataLayer.Repository;
using Microsoft.EntityFrameworkCore;

namespace AngularEshop.Core.Services.Implementations
{
    public class UserService : IUserService
    {
        #region constructor

        private IGenericRepository<User> userRepository;
        private IPasswordHelper passwordHelper;
        private IMailSender mailSender;
        private IViewRenderService renderView;

	  

	  public UserService(IGenericRepository<User> userRepository, IPasswordHelper passwordHelper, IMailSender mailSender, IViewRenderService renderView)
        {
            this.userRepository = userRepository;
            this.passwordHelper = passwordHelper;
            this.mailSender = mailSender;
           this.renderView = renderView;
      }

        #endregion

        #region User Section

        public async Task<List<User>> GetAllUsers()
        {
            return await userRepository.GetEntitiesQuery().ToListAsync();
        }

    
      public async Task<RegisterUserResult> RegisterUser(RegisterUserDTO register)
        {
            if (IsUserExistsByEmail(register.Email))
                return RegisterUserResult.EmailExists;

            var user = new User
            {
                Email = register.Email.SanitizeText(),
                Address = register.Address.SanitizeText(),
                FirstName = register.FirstName.SanitizeText(),
                LastName = register.LastName.SanitizeText(),
                EmailActiveCode = Guid.NewGuid().ToString(),
                Password = passwordHelper.EncodePasswordMd5(register.Password)
            };

            await userRepository.AddEntity(user);

            await userRepository.SaveChanges();

		 var body = await renderView.RenderToStringAsync("Email/ActivateAccount", user);
         await mailSender.SendEmailAsync(register.Email, "تست فعالسازی ایمیل", body);
		 //mailSender.Send(register.Email, "تست فعالسازی ایمیل", body);

		 return RegisterUserResult.Success;
        }

        public bool IsUserExistsByEmail(string email)
        {
            return userRepository.GetEntitiesQuery().Any(s => s.Email == email.ToLower().Trim());
        }

        public async Task<LoginUserResult> LoginUser(LoginUserDTO login)
        {
            var password = passwordHelper.EncodePasswordMd5(login.Password);

            var user = await userRepository.GetEntitiesQuery()
                .SingleOrDefaultAsync(s => s.Email == login.Email.ToLower().Trim() && s.Password == password);

            if (user == null) return LoginUserResult.IncorrectData;

            if (!user.IsActivated) return LoginUserResult.NotActivated;

            return LoginUserResult.Success;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await userRepository.GetEntitiesQuery().SingleOrDefaultAsync(s => s.Email == email.ToLower().Trim());
        }

      public async Task<User> GetUserByUserId(long userId)
      {
         return await userRepository.GetEntityById(userId);
      }


      #endregion

      #region dispose

      public void Dispose()
        {
            userRepository?.Dispose();
        }

	  public void ActivateUser(User user)
	  {
		 user.IsActivated = true;
         user.EmailActiveCode = Guid.NewGuid().ToString();
         userRepository.UpdateEntity(user);
         userRepository.SaveChanges();
	  }

	  public Task<User> GetUserByEmailActiveCode(string emailActiveCode)
	  {
		 return userRepository.GetEntitiesQuery().SingleOrDefaultAsync(s => s.EmailActiveCode == emailActiveCode);
	  }



	  #endregion
   }
}
