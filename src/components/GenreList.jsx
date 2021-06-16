import React, { Component } from 'react'

export default class GenreList extends Component {
    render() {
        let{genres,handleGenre} = this.props;
        return (
            <>
                <ul class="list-group">
                    {
                        genres.map((genre) => {
                            return (<li class="list-group-item" key={genre._id} onClick={() => { handleGenre(genre.name) }}>{genre.name}</li>
                            );
                        })
                    }
                </ul>
            </>
        )
    }
}
