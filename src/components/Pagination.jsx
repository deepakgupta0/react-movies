import React, { Component } from 'react'

export default class Pagination extends Component {
    render() {

        let{number,handleChangeNumber,pageNumberArray} = this.props
        return (
            <>
                {/* PAGINATOR */}
                <nav aria-label="...">
                    <ul class="pagination pagination-sm">
                        {
                            pageNumberArray.map((pageNumber) => {
                                if (pageNumber === number) {
                                    return (
                                        <li class="page-item active">
                                            <span class="page-link" href="#" tabIndex="-1" onClick={handleChangeNumber}>{pageNumber}</span>
                                        </li>
                                    )

                                }
                                else {
                                    return (
                                        <li class="page-item" key={pageNumber}>
                                            <span class="page-link" href="#" tabIndex="-1" onClick={handleChangeNumber}>{pageNumber}</span>
                                        </li>
                                    )
                                }

                            })
                        }

                    </ul>
                </nav>

            </>
        )
    }
}
