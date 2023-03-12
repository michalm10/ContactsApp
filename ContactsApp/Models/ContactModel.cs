using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using Microsoft.Identity.Client.Extensions.Msal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace ContactsApp.Models
{
    //email unikalny w bazie danych
    [Index(nameof(Email), IsUnique = true)]
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string? FirstName { get; set; }
        [Required]
        [StringLength(50)]
        public string? LastName { get; set; }
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }
        [Required]
        [StringLength(30)]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", 
            ErrorMessage="Length between 8-30, At least 1 lower and upper case and at least 1 number")]
        public string? Password { get; set; }
        public int? FKCategory { get; set; } = default;

        public Category? Category { get; set; }

        public int? FKSubcategory { get; set; } = default;

        public Subcategory? Subcategory { get; set; }

        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{9,15}$", ErrorMessage = "Invalid Phone Number")]
        public string? Phone { get; set; }

        [DataType(DataType.Date)]
        [Required]
        public DateTime DateOfBirth { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
