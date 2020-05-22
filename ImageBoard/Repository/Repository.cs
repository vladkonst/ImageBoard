using imageboard.interfaces;
using imageboard.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.Repository
{
    public class Repository<T> : IRepository<T> where T : class, IModelsBase
    {
        private ApplicationContext db;

        public Repository(ApplicationContext context)
        {
            db = context;
        }

        public void Create(T entity)
        {
            db.Set<T>().Add(entity);
        }

        public async Task<T> Delete(int id)
        {
            var entity = await db.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            db.Set<T>().Remove(entity);
            await db.SaveChangesAsync();

            return entity;
        }

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public List<T> GetAll()
        {
            return db.Set<T>().ToList();
        }

        public T GetById(int id)
        {
            return db.Set<T>().FirstOrDefault(x => x.Id == id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        async public Task<int> SaveAsync()
        {
           return await db.SaveChangesAsync();
        }

        public void Update(T entity)
        {
            EntityEntry dbEntityEntry = db.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }
    }
}
