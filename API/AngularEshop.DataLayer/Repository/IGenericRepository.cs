using System;
using System.Linq;
using System.Threading.Tasks;
using AngularEshop.DataLayer.Entities.Common;

namespace AngularEshop.DataLayer.Repository
{
    public interface IGenericRepository<TEntity> : IDisposable where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetEntitiesQuery();

        Task<TEntity> GetEntityById(long entityId);

        Task AddEntity(TEntity entity);

        void UpdateEntity(TEntity entity);

        void DeleteEntity(TEntity entity);

        Task DeleteEntity(long entityId);

        Task SaveChanges();
    }
}