import React from 'react'

const NewsItem =(props)=> {
  
    let {title,desc,url,newsUrl,date,author}= props;
    return (
      <div>
        <div className="card my-3" style={{width: "18rem"}}>
            <img src={url} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{desc}...</p>
                <p className='card-text'style={{fontSize :'10px'}}>By {author} on {new Date(date).toGMTString()}</p>
                <a href={newsUrl} target ="new" className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem
