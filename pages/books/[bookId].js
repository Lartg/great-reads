import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import classNames from "classnames";
import Comment from "../../components/Comment";

export default withPageAuthRequired(Book);

function Book() {
  const router = useRouter();
  const bookId = router.query.bookId;

  const [book, setBook] = useState({});
  const cover = `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`;

  async function getBook() {
    const Book = await fetch(`/api/books/${bookId}`).then((res) => res.json());
    setBook(Book);
  }

  useEffect(() => {
    getBook();
  }, []);

  // redo the styling & add ratings
  return (
    <main>
      {/* Book Info */}
      <div className={classNames("flex flex-row w-full text-white py-4 px-3", "md:px-6")}>
        <div>
          <img src={cover} className={classNames("w-20")} />
        </div>

        <div className={classNames("flex flex-col mx-2", "md:mx-4")}>
          <div className={classNames("flex flex-col text-left max-w-48")}>
            <h1 className="">{book.title}</h1>
            <h2 className="text-xs text-white/70">By {book.author}</h2>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className={classNames("flex flex-col w-full text-white py-4 px-3", "md:px-6")}>
        <div className={classNames("border-b")}>
          <h1>Comments</h1>
        </div>
        <div>
          {book.comments?.map((comment, i) => {
            return <Comment comment={comment} key={i} />;
          })}
        </div>
      </div>
    </main>
  );
}