import React, { Component } from 'react'


export default class Newsitem extends Component {

  render() {

    let { title, description, imageurl, newsurl, author, publish, source,bg } = this.props

    return (
      <div className='container'>
        <div className={`card newscard`} style={{ width: '18rem', backgroundColor: bg }} >
          <img src={!imageurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTW_XvTHnKgIpsO0IrzokA8q62K0jFpgXdQ&usqp=CAU" : imageurl} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}
              <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                {source}
                <span class="visually-hidden">unread messages</span>
              </span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><strong>Author: </strong>{author ? author : 'unknown'} <br /><strong>Published At: </strong>{publish ? publish : 'Not Specified'}</p>
            <a href={newsurl} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
