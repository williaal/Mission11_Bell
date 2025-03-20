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
        public IEnumerable<Book> GetProjects()
        {
            var something = _bookContext.Books.ToList();
            return something;
        }
    }
}
