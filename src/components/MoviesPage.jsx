import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovies'
import Pagination from './Pagination'
import GenreList from './GenreList'

export default class MoviesPage extends Component {

    state = {
        movies: [],
        value: "",
        limit: 4,
        number: 1,
        genres: [{ _id: 1, name: "All Genres" }],
        currentGenre: "All Genres"
    }

    delete = (movieObj) => {
        let newMoviesArray = this.state.movies.filter((movie) => {
            return movie._id !== movieObj._id
        })
        this.setState({
            movies: newMoviesArray,
        })
    }

    handleChange = (e) => {

        this.setState({
            value: e.target.value,
            number: 1 //to avoid searching conflict with page number
        });
    }

    handleChangeLimit = (e) => {
        this.setState({
            limit: e.target.value
        });
    }

    handleChangeNumber = (e) => {

        this.setState({
            number: parseInt(e.target.textContent)
        });
    }

    sortByStock = (e) => {

        let className = e.target.className;
        let sortedMovies;
        if (className === "fas fa-sort-up") {
            sortedMovies = this.state.movies.sort((movieObj1, movieObj2) => {
                return movieObj1.numberInStock - movieObj2.numberInStock
            })
        } else {
            sortedMovies = this.state.movies.sort((movieObj1, movieObj2) => {
                return movieObj2.numberInStock - movieObj1.numberInStock
            })
        }

        this.setState({
            movies: sortedMovies
        });
    }
    sortByRate = (e) => {

        let className = e.target.className;
        let sortedMovies;
        if (className === "fas fa-sort-up") {
            sortedMovies = this.state.movies.sort((movieObj1, movieObj2) => {
                return movieObj1.dailyRentalRate - movieObj2.dailyRentalRate
            })
        } else {
            sortedMovies = this.state.movies.sort((movieObj1, movieObj2) => {
                return movieObj2.dailyRentalRate - movieObj1.dailyRentalRate
            })
        }

        this.setState({
            movies: sortedMovies
        });
    }
    handleGenre = (genreName) => {
        this.setState({
            currentGenre: genreName,
            number: 1
        });
    }

    render() {

        // FILTERING PURPOSE
        let newMoviesArray = this.state.movies.filter((movie) => {
            if (this.state.currentGenre === "All Genres") {
                return movie.title.toLowerCase().startsWith(this.state.value.toLowerCase());
            }
            else {
                return movie.title.toLowerCase().startsWith(this.state.value.toLowerCase()) && movie.genre.name === this.state.currentGenre;
            }
        })

        //PAGINATION PURPOSE
        let limit = parseInt(this.state.limit);
        let totalPages = 0;
        let pageNumberArray = [];
        let idx1 = (this.state.number - 1) * limit;
        let idx2 = idx1 + limit - 1;
        totalPages = Math.ceil(newMoviesArray.length / limit);
        newMoviesArray = newMoviesArray.slice(idx1, idx2 + 1);

        for (let i = 0; i < totalPages; i++) {
            pageNumberArray.push(i + 1);
        }

        // console.log(number, limit);
        // if (isNaN(limit)) {
        // console.log(typeof this.state.number);
        // console.log(typeof this.state.limit);
        //page number 2
        //limit 4
        //4-7
        // let idx1 = (number - 1) * limit;
        // let idx2 = idx1 + limit - 1;
        // totalPages = newMoviesArray.length / limit;
        // newMoviesArray = newMoviesArray.slice(idx1, idx2 + 1);

        // for (let i = 0; i < totalPages; i++) {
        //     pageNumberArray.push(i + 1);
        // }

        return (

            <div>
                <div className="container">
                    {/* Movies Component */}
                    <div className="row">
                        <div className="col-3">
                            <GenreList genres={this.state.genres} handleGenre={this.handleGenre}></GenreList>
                        </div>
                        <div className="col">
                            {/* INPUTS */}

                            <form action="">
                                <input type="text" value={this.state.value} onChange={this.handleChange} />
                                {/* <input type="text" value={this.state.limit} onChange={this.handleChangeLimit} placeholder="limit" /> */}
                                {/* <input type="text" value={this.state.number} onChange={this.handleChangeNumber} placeholder="page number" /> */}
                            </form>

                            {/* TABLE */}
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">
                                            <i className="fas fa-sort-up" onClick={this.sortByStock}></i>
                                            Stock
                                            <i className="fas fa-sort-down" onClick={this.sortByStock}></i>
                                        </th>
                                        <th scope="col">
                                            <i className="fas fa-sort-up" onClick={this.sortByRate}></i>
                                            Rate
                                            <i className="fas fa-sort-down" onClick={this.sortByRate}></i>
                                        </th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        newMoviesArray.map((movie) => {
                                            return (
                                                <tr key={movie._id}>
                                                    <td>{movie.title}</td>
                                                    <td>{movie.genre.name}</td>
                                                    <td>{movie.numberInStock}</td>
                                                    <td>{movie.dailyRentalRate}</td>
                                                    <td><button className="btn btn-danger" onClick={() => { this.delete(movie) }}>Danger</button></td>
                                                </tr>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination pageNumberArray={pageNumberArray} handleChangeNumber={this.handleChangeNumber} number={this.state.number}></Pagination>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    async componentDidMount() {
        let moviePromise = await fetch('https://react-backend101.herokuapp.com/movies');
        let movies = await moviePromise.json();

        let genrePromise = await fetch('https://react-backend101.herokuapp.com/genres');
        let genre = await genrePromise.json();

        this.setState({
            movies: movies.movies,
            genres: [...this.state.genres, ...genre.genres]
        })
    }
}
