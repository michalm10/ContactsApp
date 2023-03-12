using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ContactsApp.Models
{
    public class Subcategory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string? Name { get; set; }
        public int? FKCategory { get; set; } = default;

        [JsonIgnore]
        public Category? Category { get; set; }

        [JsonIgnore]
        public ICollection<Contact>? Contacts { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
