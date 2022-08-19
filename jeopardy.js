// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

const h1 = document.createElement('h1');
const div = document.createElement('div');
const btn = document.createElement('button');
btn.className = 'btn btn-success btn-lg text-center';
btn.id = 'btnStart';
btn.innerText = 'Start/Reset Game';
const body = document.querySelector('body');
h1.innerText = 'Jeopardy';
h1.className = 'display-2 p-2 text-center';
h1.id = 'header';
body.append(h1);
body.append(div);
div.className = 'container-fluid text-center';
div.append(btn);
const btnStartGame = document.querySelector('#btnStart');
btnStartGame.addEventListener('click', function (evt) {
  evt.preventDefault();
  setupAndStart();
});

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const rndNum = Math.floor(Math.random() * 1000);
  const getIDs = await axios.get(
    'http://jservice.io/api/categories?count=6&offset=' + rndNum
  );
  for (let i = 0; i < getIDs.data.length; i++) {
    categories.push(getIDs.data[i]);
  }
  //   console.log(categories);
  getCategory(categories);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
  const newTable = document.createElement('table');
  const tableDiv = document.createElement('div');
  body.append(tableDiv);
  tableDiv.append(newTable);
  tableDiv.className = 'container-fluid p-3';
  newTable.className = 'table shadow text-center';
  // newTable.border = '1';
  newTable.innerHTML =
    '<thead id=tableHeader><tr id=headerTR class=tr></tr></thead>';
  const getTR = document.querySelector('#headerTR');

  //   console.log(catId);
  for (let i = 0; i < catId.length; i++) {
    const newTD = document.createElement('td');
    getTR.append(newTD);
    newTD.innerText = catId[i].title.toUpperCase();
    // newTD.style.width = '17.5%';
  }
  fillTable(catId);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(questions) {
  //   console.log(questions[0].id);
  const getQuestion = await axios.get(
    'http://jservice.io/api/clues?value=5&category=271'
  );
  console.log(getQuestion);
  const getTR = document.querySelector('#tableHeader');
  const newTBody = document.createElement('tbody');
  const newTR = document.createElement('tr');
  getTR.append(newTBody);
  newTBody.append(newTR);

  const newTD = document.createElement('td');
  newTR.append(newTD);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  getCategoryIds();
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
