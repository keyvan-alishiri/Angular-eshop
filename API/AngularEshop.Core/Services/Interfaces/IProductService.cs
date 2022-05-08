using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AngularEshop.Core.DTOs.Products;
using AngularEshop.DataLayer.Entities.Product;

namespace AngularEshop.Core.Services.Interfaces
{
    public interface IProductService : IDisposable
    {
        #region product

        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task<FilterProductsDTO> FilterProducts(FilterProductsDTO filter);
        Task<Product> GetProductById(long productId);
       Task<List<Product>> GetRelatedProducts(long productId);
        Task<bool> IsExistsProductById(long productId);
      Task<Product> GetProductForUserOrder(long productId);
      #endregion

      #region Product Categories

      Task<List<ProductCategory>> GetAllActiveProductCategories();

      #endregion

      #region product Gallery
      Task <List<ProductGallery>> GetProductActiveGalleries(long productId);
      #endregion

      #region Product Comments
      Task AddCommentToProduct(ProductComment comment);
      Task<List<ProductCommentDTO>> GetActiveProductComments(long productId);
      Task<ProductCommentDTO> AddProductComment(AddProductCommentDTO comment, long userId);
      #endregion



   }
}