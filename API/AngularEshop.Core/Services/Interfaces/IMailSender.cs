using System.Threading.Tasks;

namespace AngularEshop.Core.Services.Interfaces
{
    public interface IMailSender
    {
        void Send(string to, string subject, string body);

      Task SendEmailAsync(string email, string subject, string message);
   }
}