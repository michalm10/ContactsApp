using ContactsApp.Models;
using ContactsApp.Service;
using Microsoft.AspNetCore.Mvc;

namespace ContactsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        private ContactsContext _context;

        public SubcategoryController(ContactsContext contactsContext)
        {
            _context = contactsContext;
        }

        [HttpGet]
        public IEnumerable<Subcategory> Get()
        {
            return _context.Subcategories.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Subcategory>> Post([FromBody] Subcategory subcategory)
        {
            //dodawanie podkategorii
            if (ModelState.IsValid)
            {
                var category = _context.Categories.FirstOrDefault(x => x.Id == subcategory.FKCategory);
                if (category == null) { subcategory.FKCategory = null; }
                _context.Subcategories.Add(subcategory);
                await _context.SaveChangesAsync();
                return Ok(subcategory);
            }
            return BadRequest("Wrong Values");
        }
    }
}
