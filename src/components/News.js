import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 9,
        category: 'general',

    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }




    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e5ef5f574f68433d9146788cec46924f&pagesize=${this.props.pagesize}&page=1`;

        this.setState({ loading: true, })
        let data = await fetch(url);

        let parsedata = await data.json();

        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
    }

    prevpage = async () => {

        console.log("prev");

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e5ef5f574f68433d9146788cec46924f&pagesize=${this.props.pagesize}&page=${this.state.page - 1}`;

        this.setState({ loading: true, })

        let data = await fetch(url);

        let parsedata = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedata.articles,
            loading: false,

        })
    }

    nextpage = async () => {

        console.log("next");

        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e5ef5f574f68433d9146788cec46924f&pagesize=${this.props.pagesize}&page=${this.state.page + 1}`;

        this.setState({ loading: true, })

        let data = await fetch(url);

        let parsedata = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedata.articles,
            loading: false
        })
    }


    render() {
        return (
            <div>
                <h1 align="center" className='my-4' >Newsmonkey - Top {this.props.category} Headlines :</h1>

                {this.state.loading && <Spinner />}

                <div className="row md-4 container">

                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col md-4 my-3" >

                                <Newsitem bg={this.props.bgBack} title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} publish={element.publishedAt} source={element.source.name} />                           
                        </div>
                    })}


                </div>

                <div className='container d-flex justify-content-between my-5'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.prevpage}>&larr; Previous</button>

                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-warning" onClick={this.nextpage}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}
