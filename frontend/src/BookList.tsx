// export default BookList;
import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems]);

  useEffect(() => {
    // Sort books when books array or sort order changes
    const sorted = [...books].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setSortedBooks(sorted);
  }, [books, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <h1>Books</h1>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={toggleSortOrder}>
          Sort by Title {sortOrder === 'asc' ? '(A-Z)' : '(Z-A)'}
        </button>
      </div>
      <br></br>
      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classificiation: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button
        className="btn btn-secondary me-2"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`btn ${pageNum === index + 1 ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-secondary me-2"
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br></br>
      <div className="mt-3">
        <label>
          Results per page:
          <select
            className="form-select d-inline-block ms-2"
            style={{ width: 'auto' }}
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList;
