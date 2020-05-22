using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imageboard.interfaces
{
    interface IRepository<T> : IDisposable
        where T : class
    {
        List<T> GetAll(); // получение всех объектов
        T GetById(int id); // получение одного объекта по id
        void Create(T item); // создание объекта
        void Update(T item); // обновление объекта
        Task<T> Delete(int id); // удаление объекта по id
        void Save();  // сохранение изменений
    }
}
