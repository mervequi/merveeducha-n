// Web3.js ile Ethereum'a bağlanalım
let web3;
let contract;
const contractAddress = 'AKILLI_SÖZLEŞME_ADRESİNİZ';
const abi = [...] // Akıllı sözleşmenin ABI

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Akıllı sözleşmeye bağlanalım
        contract = new web3.eth.Contract(abi, contractAddress);
        loadBooks();
    } else {
        alert("Ethereum cüzdanı gerekli!");
    }
}

async function loadBooks() {
    const bookCount = await contract.methods.bookCount().call();
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = '';
    
    for (let i = 1; i <= bookCount; i++) {
        const book = await contract.methods.books(i).call();
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Yazar: ${book.author}</p>
            <p>${book.description}</p>
        `;
        bookList.appendChild(bookDiv);
    }
}

document.getElementById("submit-comment").addEventListener("click", async () => {
    const comment = document.getElementById("comment-input").value;
    const bookId = 1;  // Örnek olarak ilk kitabı seçtik

    const accounts = await web3.eth.getAccounts();
    await contract.methods.addComment(bookId, comment).send({ from: accounts[0] });
    alert("Yorumunuz başarıyla eklendi!");
});

init();

