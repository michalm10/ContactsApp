using ContactsApp.Models;

namespace ContactsApp.Service
{
    public interface IRepository
    {
        IEnumerable<Contact> GetAll();
        Task<Contact> GetContact(int id);
        Task<Contact> AddContact(Contact contact);
        Task<Contact> UpdateContact(int id, Contact contact);
        Task<bool> DeleteContact(int id);
    }
}
