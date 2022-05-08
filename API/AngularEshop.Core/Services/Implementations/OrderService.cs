using AngularEshop.Core.Services.Interfaces;
using AngularEshop.DataLayer.Entities.Orders;
using AngularEshop.DataLayer.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AngularEshop.Core.Services.Implementations
{
   public class OrderService : IOrderService
   {
	  #region constructor  
	  private readonly IGenericRepository<Order> _orderRepository;
	  private readonly IGenericRepository<OrderDetail> _orderDetailRepository;
	  private readonly IUserService _userService;
	  private readonly IProductService _productService;

	  public OrderService(IGenericRepository<Order> orderRepository, IGenericRepository<OrderDetail> orderDetailRepository, IUserService userService, IProductService productService)
	  {
		 _orderRepository = orderRepository;
		 _orderDetailRepository = orderDetailRepository;
		 _userService = userService;
		 _productService = productService;
	  }

	 








	  #endregion


	  #region order

	  public async Task<Order> CreateUserOrder(long userId)
	  {
		 var order = new Order
		 {
			UserId = userId,
		 };
		 await _orderRepository.AddEntity(order);
		 await _orderDetailRepository.SaveChanges();

		 return order;
	  }


	  public async Task<Order> GetUserOpenOrder(long userId)
	  {
		 var order = await _orderRepository.GetEntitiesQuery()
			.SingleOrDefaultAsync(s => s.UserId == userId && !s.IsPay && !s.IsDelete);

		 if(order == null)
		 
			order = await CreateUserOrder(userId);


		 return order;

		 
	  }
	  #endregion 


	  #region Order Detail

	  public async Task AddProductToOrder(long userId, long productId, int count)
	  {
		 var user = await _userService.GetUserByUserId(userId);
		 var product = await _productService.GetProductForUserOrder(productId);

		 if(user != null && product !=null)
		 {
			var order = await GetUserOpenOrder(userId);
			var detail = new OrderDetail
			{
			   OrderId = order.Id,
			   ProductId = productId,
			   Count = count,
			   Price = product.Price,
			};

			await _orderDetailRepository.AddEntity(detail);
			await _orderDetailRepository.SaveChanges();
		 }
	  }
	  #endregion

	  #region Dispose
	  public void Dispose()
	  {
		 _orderDetailRepository.Dispose();
		 _orderRepository.Dispose();
	  }

	
	  #endregion
   }
}
