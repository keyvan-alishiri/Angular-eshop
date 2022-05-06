using AngularEshop.Core.Services.Interfaces;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AngularEshop.Core.Services.Implementations
{
   public class SendEmail : IMailSender
    {
      

      public SendEmail()
	  {

	  }
        public void Send(string to, string subject, string body)
        {
            var defaultEmail = "k.alishiri@gmail.com";

            var mail = new MailMessage();

            var SmtpServer = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress(defaultEmail, "فروشگاه انگولار");

            mail.To.Add(to);

            mail.Subject = subject;

            mail.Body = body;

            mail.IsBodyHtml = true;

            // System.Net.Mail.Attachment attachment;
            // attachment = new System.Net.Mail.Attachment("c:/textfile.txt");
            // mail.Attachments.Add(attachment);

           

            SmtpServer.Credentials = new System.Net.NetworkCredential(defaultEmail, "z4x3c2v1");

            SmtpServer.EnableSsl = true;
            SmtpServer.UseDefaultCredentials = true;
            SmtpServer.Port = 587;

         SmtpServer.Send(mail);
        }


      public async Task SendEmailAsync(string email, string subject, string message)
      {
         using (var Client = new SmtpClient())
         {
            var Credential = new NetworkCredential
            {
               UserName = "k.alishiri@gmail.com",
               Password = "z4x3c2v1",
            };

            Client.Credentials = Credential;
            Client.Host = "smtp.gmail.com";
            Client.Port = 587;
            Client.EnableSsl = true;

            using (var emailMessage = new MailMessage())
            {
               emailMessage.To.Add(new MailAddress(email));
               emailMessage.From = new MailAddress("k.alishiri@gmail.com");
               emailMessage.Subject = subject;
               emailMessage.IsBodyHtml = true;
               emailMessage.Body = message;

               Client.Send(emailMessage);
            };

            await Task.CompletedTask;
         }
      }
   }
}

