using AngularEshop.DataLayer.Entities.Account;
using AngularEshop.DataLayer.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AngularEshop.DataLayer.Entities.Product
{
   public class ProductComment : BaseEntity
   {
	  #region Properties

	  
	  public long ProductId { get; set; }
	  public long UserId { get; set; }

	  public long? ParentId { get; set; }
	  [Display(Name = "نظر")]
	  [Required(ErrorMessage = "لطفا {0} را وارد کنید")]
	  [MaxLength(100, ErrorMessage = "تعداد کاراکتر های {0} نمیتواند بیشتر از {1} باشد")]
	  public string Text { get; set; }
	  public bool IsAccepted { get; set; }
	  #endregion

	  #region Relations

	  [ForeignKey("ParentId")]
	  public ProductComment ParentComment { get; set; }
	  public Product Product { get; set; }
	  public User User { get; set; }
	  #endregion
   }
}
