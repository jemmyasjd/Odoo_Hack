import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the list of books when the component mounts
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/books`
        );
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/books/${bookId}`
      );
      setMessage(response?.data?.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      // Remove the deleted book from the state
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="w-[85%] sm:w-[100%] h-[100%] pb-10 flex flex-col items-center">
      {message && (
        <p className="absolute top-24 rounded-md shadow-lg left-[28%] bg-emerald-600 text-white p-2">
          {message}
        </p>
      )}
      <h2 className="text-2xl font-bold mb-5">Book List</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 py-2">Book Name</th>
            <th className="border-b-2 py-2">Author</th>
            <th className="border-b-2 py-2">Rating</th>
            <th className="border-b-2 py-2">Genre</th>
            <th className="border-b-2 py-2">Price</th>
            <th className="border-b-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border-b-2 py-2">{book.bookname}</td>
              <td className="border-b-2 py-2">{book.authorname}</td>
              <td className="border-b-2 py-2">{book.rating}</td>
              <td className="border-b-2 py-2">{book.type}</td>
              <td className="border-b-2 py-2">{book.price}</td>
              <td className="border-b-2 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteBook;
