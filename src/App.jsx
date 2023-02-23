import Fuse from "fuse.js";

function App() {
  const movies = [
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: 1994,
    },
    { title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
    {
      title: "The Godfather: Part II",
      director: "Francis Ford Coppola",
      year: 1974,
    },
    { title: "The Dark Knight", director: "Christopher Nolan", year: 2008 },
    { title: "12 Angry Men", director: "Sidney Lumet", year: 1957 },
  ];

  const fuse = new Fuse(movies, {
    keys: ["title", "director"],
  });

  const q = fuse.search("Nolan");
  q.forEach((result) => console.log(result.item.title));

  return <>Hello, World!</>;
}

export default App;
