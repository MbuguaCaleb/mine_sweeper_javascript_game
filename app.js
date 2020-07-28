/*The purpose of this is that all our Html is loaded before loading any javascript*/
/*Alternative is passing my script tag after my javascript*/
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let bombAmount = 20;
  let squares = [];

  //create Board
  //Creates 100 squares through looping through and adding a unique id*/
  function createBoard() {
    //get shuffield game array with random bombs
    /**
     * creates an Array of 20 Elements and fills them
     * with a random value bomb.
     *
     * Array fill fills the array elements with a static value
     */
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');

    /**
     *
     * The concat() method is used to join two or more arrays.
     * This method does not change the existing arrays, but returns a new array,
     *  containing the values of the joined arrays.
     */
    const gameArray = emptyArray.concat(bombsArray);

    /*Randomly Modelling elements of the New Array*/
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      /*Adding classnames to the sqaures array from the result of the shuffled Array*/
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //normal click
      square.addEventListener('click', function (e) {
        click(square);
      });
    }

    /*Adding numbers to the neigbouring sqaures of the bomb*/
    for (let i = 0; i < squares.length; i++) {
      /*checking if the square is at the left edge*/
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i === width - 1;

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))
          total++;
        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        )
          total++;

        if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains('bomb')
        )
          total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb'))
          total++;
        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        )
          total++;
        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        )
          total++;

        if (i < 89 && squares[i + width].contains('bomb')) total++;

        squares[i].setAttribute('data', total);
      }
    }
  }

  /*calling the create board function*/
  createBoard();

  //clieck function
  function click(square) {
    if (square.classList.contains('bomb')) {
      alert('Game Over');
    }
  }
});
