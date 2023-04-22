// create header and start a new game
const h1 = document.createElement('h1');
const div = document.createElement('div');
const btn = document.createElement('button');
const p = document.createElement('p');
btn.className = 'btn btn-success btn-lg text-center';
btn.id = 'btnStart';
btn.innerText = 'Reset Game';
const body = document.querySelector('body');
p.innerText = 'Jeopardy';
h1.className = 'display-2 p-2 text-center';
p.id = 'header';
p.className = 'lead';
body.append(h1);
h1.append(p);
body.append(div);
div.className = 'container-fluid text-center';
div.append(btn);
const btnStartGame = document.querySelector('#btnStart');
btnStartGame.addEventListener('click', function (evt) {
  evt.preventDefault();
  setupAndStart();
});
setupAndStart();
let categories = [];
// let intCount = 0;

async function getCategoryIds() {
  const rndNum = Math.floor(Math.random() * 1456);
  console.log(rndNum);
  const getIDs = await axios.get(
    'http://jservice.io/api/categories?count=6&offset=' + rndNum
  );
  for (let i = 0; i < getIDs.data.length; i++) {
    categories.push(getIDs.data[i]);
  }
  console.log(categories);
  getCategory(getIDs.data);
}

function getCategory(catId) {
  const tableDiv = document.createElement('div');
  const rowDiv = document.createElement('div');
  body.append(tableDiv);
  tableDiv.append(rowDiv);
  tableDiv.className = 'container-fluid p-3 ';
  tableDiv.id = 'tableDiv';
  rowDiv.className = 'row text-center';
  // newTable.border = '1';

  showLoadingView();
  //   console.log(catId);
  for (let i = 0; i < catId.length; i++) {
    const colDiv = document.createElement('div');
    colDiv.className =
      'col divHeaders d-flex align-items-center justify-content-center';
    rowDiv.append(colDiv);
    colDiv.innerText = catId[i].title.toUpperCase();
    colDiv.style.color = '#060ce9';
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
  const varName = 'tableDiv';

  const getTableDiv = document.querySelector(`#${varName}`);
  for (let i = 0; i < 5; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = 'row ';
    newDiv.id = i;
    newDiv.style.backgroundColor = '#060ce9';
    getTableDiv.append(newDiv);
  }
  let getQuestion = [];
  for (let y = 0; y < questions.length; y++) {
    const oneQuestion = await axios.get(
      'http://jservice.io/api/clues?&category=' + questions[y].id
    );
    getQuestion.push(oneQuestion.data);
  }

  hideLoadingView();

  // fillQuestions();
  for (let j = 0; j < 5; j++) {
    const getNewDiv = document.getElementById(j);
    for (let v = 0; v < 6; v++) {
      const newDiv = document.createElement('div');
      newDiv.className =
        'col divQuestions d-flex align-items-center justify-content-center';
      newDiv.id = v.toString() + j.toString();
      newDiv.innerText = '$' + (j + 1) + '00';
      // data-toggle="tooltip" data-placement="top" title="Tooltip on top"
      newDiv.title = 'Click for Question';
      getNewDiv.append(newDiv);
      newDiv.addEventListener('click', function () {
        // // alert(newDiv.id);
        // const getDivID = document.getElementById(newDiv.id);
        // getDivID.style.backgroundColor = 'white';

        fillQuestions(j, v);
      });
    }
  }

  function fillQuestions(x, y) {
    // alert(x + ' ' + y);
    // const makeP = document.createElement('p');
    const getQuestionDiv = document.getElementById(y.toString() + x.toString());
    getQuestionDiv.style.fontSize = '1.2rem';
    getQuestionDiv.innerText = getQuestion[y][x].question;
    getQuestionDiv.title = 'Click to Answer';
    getQuestionDiv.addEventListener('click', function (evt) {
      evt.preventDefault();
      getQuestionDiv.style.pointerEvents = 'none';
      const setAnswer = prompt(getQuestion[y][x].question);
      const questionLC = getQuestion[y][x].answer.toLowerCase();
      if (setAnswer) {
        if (questionLC.includes(setAnswer.toLowerCase())) {
          alert('Correct');
          getQuestionDiv.style.backgroundColor = '#28a200';
        } else {
          alert('Sorry...incorrect');
          getQuestionDiv.style.backgroundColor = 'red';
        }
        getQuestionDiv.innerText = getQuestion[y][x].answer;
      }
    });
  }
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

function showLoadingView() {
  newSpinner = document.createElement('i');
  newSpinner.className = 'fa-solid fa-arrows-spin fa-spin';
  newSpinner.style.fontSize = '15rem';
  spinnerDiv = document.createElement('div');
  spinnerDiv.className = 'div col-12 text-center';
  spinnerDiv.id = 'txtLoader';
  tableDiv.append(spinnerDiv);
  spinnerDiv.append(newSpinner);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  const hidDiv = document.querySelector('#txtLoader');
  hidDiv.style.display = 'none';
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
function emptyBoard() {
  getTableDiv = document.querySelector('#tableDiv');
  if (getTableDiv) {
    getTableDiv.remove();
    categories = [];
  }
}
function setupAndStart() {
  emptyBoard();
  getCategoryIds();
}
