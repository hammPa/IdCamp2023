const RENDER_EVENT = 'render-book';
const bookshelf = [];

const formInputBook = document.querySelector('#inputBook');
const inputTitle = document.querySelector('#inputBookTitle');
const inputAuthor = document.querySelector('#inputBookAuthor');
const inputYear = document.querySelector('#inputBookYear');
const inputIsComplete = document.querySelector("#inputBookIsComplete");
const inputSubmit = document.querySelector("#bookSubmit");


const searchBookTitle = document.querySelector('#searchBookTitle');
const searchSubmit = document.querySelector('#searchSubmit');

inputIsComplete.addEventListener('change', () => {
    document.querySelector(".tombolAdd").innerText = (inputIsComplete.checked ? "Selesai Dibaca" : "Belum Selesai Dibaca");
});

document.addEventListener('DOMContentLoaded', () => {
    formInputBook.addEventListener('submit', (e) => {
        console.log("submit jalan");
        e.preventDefault();
        addBook();
    });
    if(isExist()){
        if(localStorage.getItem(STORAGE_KEY) !== null){
            const dataFromStorage = getBookList();
            bookshelf.push(...dataFromStorage);
            document.dispatchEvent(new Event(RENDER_EVENT));
        }
    }
    searchSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        document.dispatchEvent(new Event(RENDER_EVENT));
    });
});


const generateID = () => {
    return +new Date();
}

const generateNewBook = (id, title, author, year, isComplete) => {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
}

const addBook = () => {
    const id = generateID();
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const year = parseInt(inputYear.value);
    const isComplete = inputIsComplete.checked;
    const book = generateNewBook(id, title, author, year, isComplete);

    bookshelf.push(book); 
    console.log("add book jalan");
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

const displayBook = book => {
    const tagArticle = document.createElement('article');
    tagArticle.classList.add("book_item");
    const tagH3 = document.createElement('h3');
    const tagPenulis = document.createElement('p');
    const tagTahun = document.createElement('p');
    const tagDiv = document.createElement('div');
    tagDiv.classList.add("action");
    const tagButton1 = document.createElement('button');
    const tagButton2 = document.createElement('button');

    tagButton1.innerText = (book.isComplete ? "Selesai Dibaca" : "Belum Selesai Dibaca");
    tagButton1.classList.add('green');
    tagDiv.append(tagButton1);
    tagButton2.innerText = "Hapus Buku";
    tagButton2.classList.add('red');
    tagDiv.append(tagButton2);

    tagArticle.classList.add('book_item');
    tagArticle.setAttribute('id', `Book - ${book.id}`);
    tagH3.innerText = `${book.title}`;
    tagArticle.append(tagH3);
    
    tagPenulis.innerText = `Penulis : ${book.author}`;
    tagArticle.append(tagPenulis);
    tagTahun.innerText = `Tahun : ${book.year}`;
    tagArticle.append(tagTahun);

    tagArticle.append(tagDiv);

    return tagArticle;
}


document.addEventListener(RENDER_EVENT, () => {
    console.log("event jalan")
    const incompleteBookshelfList = document.querySelector("#incompleteBookshelfList");
    const completeBookshelfList = document.querySelector("#completeBookshelfList");
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';
    
    const titleToSearch = searchBookTitle.value.toLowerCase();

    for(const book of bookshelf){
        const bookElement = displayBook(book);
        console.log(titleToSearch);
        if(book.title.toLowerCase().includes(titleToSearch)){
            if(book.isComplete) completeBookshelfList.appendChild(bookElement);
            else incompleteBookshelfList.appendChild(bookElement);
        }
    }
});


document.addEventListener('click', (e) => {
    if(e.target.classList.contains("green")){
        const idTarget = e.target.parentElement.parentElement.id.split('-')[1];
        for(const book of bookshelf){
            if(book.id == idTarget){
                book.isComplete = (book.isComplete==true ? false : true); 
            }
        }
        console.log(e.target.parentElement.parentElement);
    }
    
    if(e.target.classList.contains("red")){
        const idTarget = e.target.parentElement.parentElement.id.split('-')[1];
        const namaBuku = document.querySelector(".namaBuku");
        const namaPenulis = document.querySelector(".namaPenulis");
        const okeHapus = document.querySelector(".okeHapus");
        document.querySelector('.container').style.display = 'block';
        for(const book of bookshelf){
            if(book.id == idTarget){
                namaBuku.innerText = book.title;
                namaPenulis.innerText = book.author;
                bookshelf.splice(book, 1);
                okeHapus.addEventListener('submit', () => {
                    e.preventDefault();
                    document.querySelector(".container").style.display = 'none';
                });
            }
        } 
    }

    
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
})




const STORAGE_KEY = 'key';
const SAVED_EVENT = 'saved-book';
const isExist = () => (typeof Storage !== 'undefined' ? true : false);
const saveBook = () => {
    if(isExist()){
        const parsed  = JSON.stringify(bookshelf); 
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

document.addEventListener(SAVED_EVENT, () => {
    console.log(localStorage.getItem(STORAGE_KEY));
});


function getBookList(){
    if(isExist()) return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    else return [];
}


