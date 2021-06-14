import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovies'

export default class MoviesPage extends Component {

    state = {
        movies: getMovies(),
        value: "",
        limit: 4,
        number: 1

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
            value: e.target.value
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

    render() {
        // FILTERING PURPOSE
        let newMoviesArray = this.state.movies.filter((movie) => {
            return movie.title.toLowerCase().startsWith(this.state.value.toLowerCase());
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
                        <div className="col-3"></div>
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

                            {/* PAGINATOR */}
                            <nav aria-label="...">
                                <ul class="pagination pagination-sm">
                                    {
                                        pageNumberArray.map((pageNumber) => {
                                            if (pageNumber === this.state.number) {
                                                return (
                                                    <li class="page-item active">
                                                        <span class="page-link" href="#" tabindex="-1" onClick={this.handleChangeNumber}>{pageNumber}</span>
                                                    </li>
                                                )

                                            }
                                            else {
                                                return (
                                                    <li class="page-item">
                                                        <span class="page-link" href="#" tabindex="-1" onClick={this.handleChangeNumber}>{pageNumber}</span>
                                                    </li>
                                                )
                                            }

                                        })
                                    }

                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
