import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isloading: true}

  componentDidMount() {
    this.getblogsData()
  }

  getblogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      topic: eachItem.topic,
      title: eachItem.title,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
    }))
    this.setState({blogsData: formattedData, isloading: false})
  }

  render() {
    const {blogsData, isloading} = this.state
    return (
      <div className="blog-list-container">
        {isloading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
