import assignment1 from "./assignment-1";

export type BookID = string;

export interface Book {
    id?: BookID,
    name: string,
    author: string,
    description: string,
    price: number,
    image: string,
};


async function listBooks(filters?: Array<{from?: number, to?: number}>) : Promise<Book[]>{
    return assignment1.listBooks(filters)
}

async function createBook(book: Book): Promise<BookID> {
  const result = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  if (!result.ok) {
    throw new Error(`Failed to create book: ${result.statusText}`);
  }

  const data = await result.json();
  return data.id;
}

async function updateBook(book: Book): Promise<BookID> {
  if (!book.id) throw new Error("Book ID required for update");

  const result = await fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  if (!result.ok) {
    throw new Error(`Failed to update book: ${result.statusText}`);
  }

  const data = await result.json();
  return data.id;
}




async function removeBook(bookId: BookID): Promise<void> {
    const result = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: "DELETE"
    });

    // DELETE success = 200 or 204
    if (!result.ok && result.status !== 204) {
        throw new Error(`Failed to delete book: ${result.statusText}`);
    }


}



const assignment = "assignment-2";

export default {
  assignment: "assignment-2",
  createBook,
  updateBook,
  removeBook,
  listBooks
};
