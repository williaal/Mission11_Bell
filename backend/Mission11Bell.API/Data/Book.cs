using System.ComponentModel.DataAnnotations;

namespace Mission11Bell.API.Data
{
    public class Book
    {
        [Key]
        [Required]
        public int BookID { get; set; }
        [Required]
        public required string Title { get; set; }
        [Required]
        public required string Author { get; set; }
        [Required]
        public required string Publisher { get; set; }
        [Required]  
        public required string ISBN { get; set; }
        [Required]
        public required string Classification { get; set; }
        [Required]
        public required string Category { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
