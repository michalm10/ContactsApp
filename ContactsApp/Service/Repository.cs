using ContactsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Numerics;

namespace ContactsApp.Service
{
    public class Repository : IRepository
    {
        private ContactsContext _context;

        public Repository(ContactsContext contactsContext)
        {
            _context = contactsContext;
        }

        public async Task<Contact> GetContact(int id)
        {
            //zwracanie pojedynczego kontaktu jeśli istnieje
            var contact = await _context.Contacts.Include(e => e.Category).Include(e => e.Subcategory).FirstOrDefaultAsync(x => x.Id == id);
            return contact;
        }

        public IEnumerable<Contact> GetAll()
        {
            //zwracanie wszystkich kontaktów
            return _context.Contacts.Include(e => e.Category).Include(e => e.Subcategory).ToList();
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            //dodawanie kontaktu ze sprawdzeniem poprawności kluczy obcych
            var category = _context.Categories.FirstOrDefault(x => x.Id == contact.FKCategory);
            var subcategory = _context.Subcategories.FirstOrDefault(x => x.Id == contact.FKSubcategory);
            if (category == null) { contact.FKCategory = null; }
            if (subcategory == null) { contact.FKSubcategory = null; }
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> DeleteContact(int id)
        {
            //usuwanie kontaktu jeśli istnieje
            var ToRemove = _context.Contacts.FirstOrDefault(x => x.Id == id);
            if (ToRemove != null)
            {
                _context.Remove(ToRemove);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Contact> UpdateContact(int id, Contact contact)
        {
            var ToEdit = _context.Contacts.FirstOrDefault(x => x.Id == id);

            //aktualizacja kontaktu ze sprawdzeniem poprawności kluczy obcych
            if (ToEdit != null)
            {
                ToEdit.FirstName = contact.FirstName;
                ToEdit.LastName = contact.LastName;
                ToEdit.Email = contact.Email;
                ToEdit.Phone = contact.Phone;
                ToEdit.Password = contact.Password;
                ToEdit.DateOfBirth = contact.DateOfBirth;
                //Console.WriteLine(contact);
                if (contact.FKCategory != null && _context.Categories.FirstOrDefault(x => x.Id == contact.FKCategory) != null)
                {
                    ToEdit.FKCategory = contact.FKCategory;
                }
                else
                {
                    ToEdit.FKCategory = null;
                }
                if (contact.FKSubcategory != null && _context.Subcategories.FirstOrDefault(x => x.Id == contact.FKSubcategory) != null)
                {
                    ToEdit.FKSubcategory = contact.FKSubcategory;
                }
                else
                {
                    ToEdit.FKSubcategory = null;
                }
                _context.Update(ToEdit);
                await _context.SaveChangesAsync();
            }
            return ToEdit;
        }
    }
}
