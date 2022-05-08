using AngularEshop.DataLayer.Entities.Orders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AngularEshop.Core.Services.Interfaces
{
   public interface IOrderService :IDisposable
   {

	  #region order
	  Task<Order> CreateUserOrder(long userId);
	  Task<Order> GetUserOpenOrder(long userId);
	  #endregion


	  #region Order Detail

	  Task AddProductToOrder(long userId, long productId, int count);
	  #endregion
   }
}
