using AngularEshop.Core.DTOs.Products;
using AngularEshop.Core.Services.Interfaces;
using AngularEshop.Core.Utilities.Common;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AngularEshop.WebApi.Controllers
{

   public class ProductsController : SiteBaseController
   {
	  #region constructor
	  private IProductService productService;

	  public ProductsController(IProductService productService)
	  {
		 this.productService = productService;
	  }

	  #endregion

	  #region products

	  [HttpGet("filter-Products")]
	  public async Task<IActionResult> GetProducts([FromQuery]FilterProductsDTO filter)
	  {

		 var products =await productService.FilterProducts(filter);
		 //await Task.Delay(4000);
		 return JsonResponseStatus.Success(products);
	  }
	  #endregion

	  #region get products categories

	  [HttpGet("active-categories")]
	  public async Task<IActionResult> GetProductsCategories()
	  {
		 return JsonResponseStatus.Success(await productService.GetAllActiveProductCategories());
	  }
	  #endregion

	  #region Get Single Product
	  [HttpGet("single-product/{id}")]
	   public async Task<IActionResult> GetProduct(long id)
	  {
		 var product = await productService.GetProductById(id);
		 var productGalleries =await productService.GetProductActiveGalleries(id);
		 if(product != null)
		 {
			return  JsonResponseStatus.Success( new { product = product, galleries = productGalleries });
		 }
		 return JsonResponseStatus.NotFound();
	  }
	  #endregion

	  #region Related products
	  [HttpGet("related-products/{id}")]
	  public async Task<IActionResult> GetRelatedProducts(long id)
	  {
		 var relatedProducts = await productService.GetRelatedProducts(id);
		 return JsonResponseStatus.Success(relatedProducts);
	  }
	  #endregion

	  #region Product Comments
	  [HttpGet("product-comments/{ProductId}")]
	  public async Task<IActionResult> GetProductComments(long ProductId)
	  {
		 var comments =await productService.GetActiveProductComments(ProductId);
		 return JsonResponseStatus.Success(comments);
	  }
	  #endregion

   }
}
