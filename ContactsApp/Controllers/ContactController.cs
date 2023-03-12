using ContactsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using System.Collections.Generic;
using ContactsApp.Service;

namespace ContactsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private IRepository repository;
        private ContactsContext _context;
        public ContactController(ContactsContext contactsContext)
        {
            repository = new Repository(contactsContext);
            _context = contactsContext;
        }

        // GET: api/<ContactController>
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            //zwrócenie wszystkich kontaktów
            return repository.GetAll();
        }

        // GET api/<ContactController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> Get(int id)
        {
            //zwrócenie pojedynczego kontaktu
            return Ok(await repository.GetContact(id));
        }

        // POST api/<ContactController>
        [HttpPost]
        public async Task<ActionResult<Contact>> Post([FromBody] Contact contact)
        {
            //dodanie kontaktu
            Console.WriteLine(contact);
            if (ModelState.IsValid)
            {
                return Ok(await repository.AddContact(new Contact
                {
                    FirstName = contact.FirstName,
                    LastName = contact.LastName,
                    Email = contact.Email,
                    Phone = contact.Phone,
                    DateOfBirth = contact.DateOfBirth,
                    Password = contact.Password,
                    FKCategory = contact.FKCategory,
                    FKSubcategory = contact.FKSubcategory
                }));
            }
            return BadRequest("Wrong Values");
        }

        // PUT api/<ContactController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Contact>> Put(int id, [FromBody] Contact contact)
        {
            //aktualizacja kontaktu
            Console.WriteLine(contact);
            if (ModelState.IsValid)
            {
                return Ok(await repository.UpdateContact(id, contact));
            }
            return BadRequest("Wrong Values");
        }

        // DELETE api/<ContactController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            //usuwanie kontaktu
            return Ok(await repository.DeleteContact(id));
        }

    }
}
