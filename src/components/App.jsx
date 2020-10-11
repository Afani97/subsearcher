import { createState, createEffect } from 'solid-js'
import Header from './Header.jsx'
import PostGrid from './PostGrid.jsx'
import ApiService from '../ApiService'
import Paginate from './Paginate.jsx'
import updateSortButton from '../helpers'

const App = () => {
  const [state, setState] = createState({
    searchTerm: null,
    sortBy: 'hot',
    posts: [],
    before: [],
    after: []
  })

  createEffect(() => {
    if (state.searchTerm === null) { searchReddit('memes') }
  }, [])

  const baseURL = (searchTerm) => `https://oauth.reddit.com/r/${searchTerm}/${state.sortBy}?g=US`

  const filterPosts = (posts) => {
    return posts.filter(c => {
      // TODO: Make this cleaner
      return (!(c.data.url.includes('gallery'))) &&
                (!(c.data.url.includes('gif'))) &&
                !c.data.is_video &&
                (!(c.data.url.includes('comments'))) &&
                (!(c.data.url.includes('yout'))) &&
                (!(c.data.url.includes('imgur')))
    }).map(c => {
      return {
        title: c.data.title,
        imageUrl: c.data.url
      }
    })
  }

  const searchReddit = (searchTerm) => {
    ApiService.get(baseURL(searchTerm)).then(data => {
      updateSortButton('hot')
      setState({
        searchTerm: searchTerm,
        before: [],
        after: [...state.after, data.data.after],
        posts: filterPosts(data.data.children)
      })
    })
  }

  const beforePage = () => {
    const beforeState = Array.from(state.before)
    const before = beforeState.pop()
    const afterState = Array.from(state.after)
    afterState.pop()

    if (before) {
      const url = baseURL(state.searchTerm) + `&before=${before}&count=0`
      ApiService.get(url).then(data => {
        setState({
          before: beforeState,
          after: afterState,
          posts: filterPosts(data.data.children)
        })
      })
    }
  }

  const afterPage = () => {
    const afterState = state.after
    const after = afterState.pop()
    if (after) {
      const url = baseURL(state.searchTerm) + `&after=${after}&count=0`
      ApiService.get(url).then(data => {
        setState({
          before: [...state.before, after],
          after: [...state.after, data.data.after],
          posts: filterPosts(data.data.children)
        })
      })
    }
  }

  const changeSortBy = (sortBy) => {
    setState({ sortBy: sortBy })
    let url = baseURL(state.searchTerm)
    if (sortBy === 'top' || sortBy === 'controversial') { url += '&top=day' }
    ApiService.get(url).then(data => {
      setState({
        before: [],
        after: [...state.after, data.data.after],
        posts: filterPosts(data.data.children)
      })
    })
  }

  return (
    <div class='container h-full bg-white dark:bg-gray-800'>
      <div class='absolute h-40 w-screen z-50 sm:px-10 bg-white dark:bg-gray-800'>
        <Header searchReddit={searchReddit} />
      </div>
      <div class='w-screen h-40' />
      <div class='absolute w-screen z-0 px-2 sm:px-10 bg-white dark:bg-gray-800'>
        <Paginate
          before={state.before[state.before.length - 1]} beforePage={beforePage}
          after={state.after[state.after.length - 1]} afterPage={afterPage}
          changeSortBy={changeSortBy}
        />
        <PostGrid posts={state.posts} />
        <Paginate
          before={state.before[state.before.length - 1]} beforePage={beforePage}
          after={state.after[state.after.length - 1]} afterPage={afterPage}
        />
      </div>
    </div>

  )
}

export default App
