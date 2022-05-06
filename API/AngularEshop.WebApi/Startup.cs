using AngularEshop.Core.Security;
using AngularEshop.Core.Services.Implementations;
using AngularEshop.Core.Services.Interfaces;
using AngularEshop.Core.Utilities.Convertors;
using AngularEshop.Core.Utilities.Extensions.Connection;
using AngularEshop.DataLayer.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.IO;
using System.Text;

namespace AngularEshop.WebApi
{
   public class Startup
   {
	  
	  public Startup(IConfiguration configuration,IWebHostEnvironment hostingEnvironment)
	  {
		 Configuration = configuration;
		 HostingEnvironment = hostingEnvironment;
	  }

	  public IConfiguration Configuration { get; }
	  public Microsoft.AspNetCore.Hosting.IWebHostEnvironment HostingEnvironment { get; }

	  // This method gets called by the runtime. Use this method to add services to the container.
	  public void ConfigureServices(IServiceCollection services)
	  {
		 services.AddSingleton<IConfiguration>(
			new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile($"appsettings.json")
			.Build());



		 #region Add DBContext
		 services.AddApplicationDBContext(Configuration);
		 services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
		 

		 #endregion

		 #region Application Services
		 services.AddScoped<IUserService, UserService>();
		 services.AddScoped<ISliderService, SliderService>();
		 services.AddScoped<IProductService, ProductService>();
		 services.AddScoped<IPasswordHelper, PasswordHelper>();
		 services.AddScoped<IMailSender, SendEmail>();
		 services.AddTransient<IViewRenderService, RenderViewToString>();
		 #endregion

		 #region Authentication


		 services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			 .AddJwtBearer(options =>
			 {
				
				options.TokenValidationParameters = new TokenValidationParameters
				{
				   ValidateIssuer = true,
				   ValidateAudience = false,
				   ValidateLifetime = true,
				   ValidateIssuerSigningKey = true,
				   ValidIssuer = "https://localhost:44302",
				   
				   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("AngularEshopJwtBearer"))
				};
			 });

		
		 #endregion
		 services.AddControllers();
		 services.AddRazorPages();

		 #region CORS
		 services.AddCors(opt =>
		 {
			opt.AddPolicy("CorsPolicy", policy =>
			{
			   policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:4200").Build();
			});
		 });

		 #endregion

	  }

	  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	  {
		 if (env.IsDevelopment())
		 {
			app.UseDeveloperExceptionPage();
		 }

		 app.UseHttpsRedirection();
		 app.UseStaticFiles();
		 app.UseCors("CorsPolicy");
		 
		 
		 app.UseRouting();
		 app.UseAuthentication();
		 app.UseAuthorization();
		 
		

		 app.UseEndpoints(endpoints =>
		 {
			endpoints.MapControllers();
		 });


		 
	  }
   }
}
