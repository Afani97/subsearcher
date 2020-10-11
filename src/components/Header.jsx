import { createState } from 'solid-js'
import ApiService from '../ApiService'

const Header = ({ searchReddit }) => {
  const [state, setState] = createState({ subreddit: 'memes' })

  const handleChange = e => {
    e.preventDefault()
    const searchTerm = e.target.value

    setState({ subreddit: searchTerm })

    const url = `https://oauth.reddit.com/api/subreddit_autocomplete?include_over_18=false&include_profiles=false&query=${searchTerm}`
    ApiService.get(url).then(data => {
      const subs = data.subreddits.map(s => s.name)
      const matchList = document.getElementById('match-list')
      if (subs.length > 0) {
        const html = subs.map(sub => `<div class="mb-1 text-sm sm:text-base tracking-normal ">${sub}</div>`).join('')
        matchList.innerHTML = html
      } else {
        matchList.innerHTML = ''
      }
    })
  }

  const clickFromDropDown = e => {
    const searchTerm = e.target.innerHTML
    setState({ subreddit: searchTerm })
    document.getElementById('match-list').innerHTML = ''
    searchReddit(searchTerm)
  }

  const search = () => {
    if (state.subreddit.length > 0) {
      document.getElementById('match-list').innerHTML = ''
      searchReddit(state.subreddit)
    }
  }

  return (
    <div class='mb-10'>
      <h1 class='flex justify-center text-3xl text-black-500 dark:text-white my-3'>SubSearcher</h1>
      <div class='flex justify-center'>
        <input
          class='shadow appearance-none border rounded mr-2 w-1/2 sm:w-2/3 sm:py-2 sm:px-3 sm:mr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          placeholder='Search a subreddit'
          value={state.subreddit}
          onInput={e => handleChange(e)}
          autocomplete='off'
          autocorrect='off'
          autocapitalize='off'
          spellcheck='false'
        />
        <button
          class='btn btn-blue'
          onClick={() => search()}
        >Search
        </button>
      </div>
      <div class='flex justify-center'>
        <div class='w-1/2 mr-2 sm:w-2/3 sm:px-3 sm:mr-3'>
          <div
            id='match-list' onClick={(e) => clickFromDropDown(e)}
            class='border border-solid rounded-b sm:px-3 sm:-mx-3 bg-white'
          />
        </div>
        <button class='btn invisible'>Search</button>
      </div>
    </div>
  )
}

export default Header
