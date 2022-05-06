using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AngularEshop.Core.Utilities.Convertors
{
   public interface IViewRenderService
   {
      Task<string> RenderToStringAsync(string viewName, object model);
   }
}
