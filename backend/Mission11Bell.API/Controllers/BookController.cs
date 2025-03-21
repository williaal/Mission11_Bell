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
        public IActionResult GetProjects(int pageHowMany = 5, int pageNum = 1)
        {
            var something = _bookContext.Books
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}
