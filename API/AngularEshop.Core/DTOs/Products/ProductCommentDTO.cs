﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AngularEshop.Core.DTOs.Products
{
   public class ProductCommentDTO
   {
	  public long Id { get; set; }
	  public long UserId { get; set; }
	  public string Text { get; set; }
	  public string UserFullName { get; set; }
	  public string CreateDate { get; set; }
	 
   }
    public enum AddProductCommentResult
   {
	  Success,
	  NotFound,
	  Error
   }

}
