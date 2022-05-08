using AngularEshop.DataLayer.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngularEshop.DataLayer.Entities.Orders
{
   public class OrderDetail : BaseEntity
   {

	  #region Properties
	  public long OrderId { get; set; }
	  public long ProductId { get; set; }
	  public int Count { get; set; }
	  public int Price { get; set; }
	  #endregion

	  #region Relation

	  public Order Order { get; set; }
	  public Product.Product Product { get; set; }
	  #endregion
   }
}
