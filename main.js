const URL = "https://api.lyrics.ovh/suggest";
const handleClick = async function () {
  const myEndPoint = document.getElementById("input-field").value;

  const res = await fetch(`${URL}/${myEndPoint}`);

  const data = await res.json();

  const songDataArr = data.data;

  const firstTenElements = songDataArr.slice(0, 5);

  const songTitle = document.getElementById("song-name");
  const authorName = document.getElementById("author");

  firstTenElements.map((song) => {
    const title = song.title;
    const author = song.artist.name;
    const parentDiv = document.getElementById("search-result");

    // Create the child div element dynamically using JavaScript
    const ChildDiv = document.createElement("div");
    ChildDiv.classList.add(
      "single-result",
      "row",
      "align-items-center",
      "my-3",
      "p-3"
    );

    // Set the inner HTML content
    ChildDiv.innerHTML = `
        <div class="col-md-9">
            <h3 id="song-name" class="lyrics-name">${title}</h3>
            <p id="author" class="author lead">
                Album by <span>${author}</span>
            </p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success">Get Lyrics</button>
        </div>
    `;

    const button = ChildDiv.querySelector("button");
    button.addEventListener("click", () => handleGetLyrics(title, author));

    // Append the created ChildDiv to the parentDiv
    parentDiv.appendChild(ChildDiv);
  });
};

const handleGetLyrics = async function (title, author) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${author}/${title}`);

  const data = await res.json();

  const { lyrics } = data;

  const lyricsEl = document.getElementById("lyrics");
  lyricsEl.innerText = lyrics;

  console.log(lyrics);
};
document.getElementById("search-btn").addEventListener("click", handleClick);
