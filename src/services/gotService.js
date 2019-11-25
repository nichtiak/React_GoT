
export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
            `, received ${res.status}`);
        }
        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const resBooks = await this.getResource(`/books/`);
        return resBooks.map(this._transformBooks);
    }
    async getBooks(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBooks(book);
    }

    async getAllHouses() {
        const resHouses = await this.getResource(`/houses/`);
        return resHouses.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: char.url.substring(char.url.lastIndexOf('/') +1)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.culture,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

}

// const got = new GotService();


// got.getAllCharacters()
//     .then(res => console.log(res));
// got.getAllCharacters()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     });


// got.getAllBooks()
//     .then(res => console.log(res));
// got.getAllBooks()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     });
    

// got.getAllHouses()
//     .then(res => console.log(res));
// got.getAllHouses()
//     .then(res => {
//         res.forEach(item => console.log(item.name));
//     });
    

