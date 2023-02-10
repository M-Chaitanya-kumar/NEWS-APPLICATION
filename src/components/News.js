import React, {  useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {


  

  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[page,setPage]=useState(1);
  const[totalResults,setTotalResults]=useState(0);
  // document.title = `${this.props.category.toUpperCase().charAt(0)+this.props.category.slice(1)} - NewsMonkey`


  
  
  const updateNews = async()=>
  {
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=f9ca756b69f74fa08eebb64a5ae49405&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading : true});
    setLoading(true);
    let data=await fetch(url);
    let parsedData=await data.json();

    setArticles(parsedData.articles);
    setLoading(false);
    setPage(page);
    

  }

  // async componentDidMount()
  // {
  //   let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f9ca756b69f74fa08eebb64a5ae49405&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data= await fetch(url);
  //   let parsedData=await data.json();
  //   this.setState({
  //     articles : parsedData.articles,
  //     totalResults : parsedData.totalResults,
  //     loading : false
  //   });

  useEffect(()=>{
    updateNews();
  },[]);
  // }

  // prev = async()=>
  // {
  //   console.log("Prev");
  //   let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f9ca756b69f74fa08eebb64a5ae49405&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading : true});
  //   let data=await fetch(url);
  //   let parsedData=await data.json();
  //   this.setState({
  //     articles : parsedData.articles,
  //     page : this.state.page - 1,
  //     loading : false
  //   })
  // }

  // next = async()=>
  // {
  //   if(this.state.page+1 > (Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   {

  //   }
  //   else{

  //       console.log("next");
  //       let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f9ca756b69f74fa08eebb64a5ae49405&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`;
  //       this.setState({loading : true});  
  //       let data=await fetch(url);
  //       let parsedData=await data.json();
  //       this.setState({
  //         articles : parsedData.articles,
  //         page : this.state.page + 1,
  //         loading : false

  //       })
  //   }
  // }
  const fetchMoreData = async() =>
  {
    console.log(loading);
    // this.setState({page : this.state.page +1})
    setPage(page+1);
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=f9ca756b69f74fa08eebb64a5ae49405&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    setLoading(true);
    let data= await fetch(url);
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
  }


  
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"25px 0px"}}>Latest Updates on {props.category.charAt(0).toUpperCase()+props.category.slice(1)}</h1>
        {/* {this.state.loading && <Loading/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>} 
          endMessage={<p style={{textAlign : "center", color:'red'}}>You have scrolled up to the last page</p>}
        >
          <div className='container'>
          <div className='row'>
              {articles.map( (element)=>{
                  return (
                  <div className='col col-md-4' key={element.url}>
                    <NewsItem title={element.title?element.title:""} desc={element.description?element.description.slice(0,96):""} url={element.urlToImage} newsUrl={element.url} author={element.author}
                    date={element.publishedAt}/>
                  </div>)
              })}
              
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled ={this.state.page<=1} className='btn btn-dark' onClick={this.prev}>Previous</button>
          <button disabled ={this.state.page+1 > (Math.ceil(this.state.totalResults/this.props.pageSize))} className='btn btn-dark' onClick={this.next}>Next</button>
        </div> */}
      </div>
    )
  
}

export default News;

News.defaultProps={
  pageSize : 5,
  category : 'general'
}

News.propTypes={
  pageSize : PropTypes.number,
  category : PropTypes.string
}