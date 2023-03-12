using ContactsApp.Models;
using ContactsApp.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ContactsContext _context;

        public CategoryController(ContactsContext contactsContext)
        {
            _context = contactsContext;
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _context.Categories.Include(x => x.Subcategories).ToList();
            //wszystkie kategorie
        }
    }
}
