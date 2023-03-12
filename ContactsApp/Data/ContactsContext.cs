using Microsoft.EntityFrameworkCore;

namespace ContactsApp.Models
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options) : base(options)
        {}
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Subcategory> Subcategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //tworzenie relacji kontakty-kategorie 1 do wielu
            modelBuilder.Entity<Contact>()
                    .HasOne(e => e.Category)
                    .WithMany(e => e.Contacts)
                    .HasForeignKey(e => e.FKCategory)
                    .OnDelete(DeleteBehavior.SetNull);

            //tworzenie relacji podkategorie-kategorie 1 do wielu
            modelBuilder.Entity<Subcategory>()
                    .HasOne(e => e.Category)
                    .WithMany(e => e.Subcategories)
                    .HasForeignKey(e => e.FKCategory)
                    .OnDelete(DeleteBehavior.SetNull);

            //tworzenie relacji kontakt-podkategorie 1 do wielu
            modelBuilder.Entity<Contact>()
                    .HasOne(e => e.Subcategory)
                    .WithMany(e => e.Contacts)
                    .HasForeignKey(e => e.FKSubcategory)
                    .OnDelete(DeleteBehavior.SetNull);

        }
    }
}