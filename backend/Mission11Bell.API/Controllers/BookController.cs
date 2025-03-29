using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Bell.API.Data;

namespace Mission11Bell.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetProjects(int pageHowMany = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var something = query
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();

            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
        [HttpGet("GetBookTypes")]
            public IActionResult GetBookTypes ()
                {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
                }
        }
}

