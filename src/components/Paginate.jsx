import updateSortButton from '../helpers'
import { Show } from 'solid-js'

const Paginate = (props) => {
  const updateSortby = (e) => {
    const sortBy = e.target.id
    updateSortButton(sortBy)
    props.changeSortBy(sortBy)
  }

  return (
    <div class='flex justify-between mb-5'>
      <PaginateButton
        value={props.before}
        newPage={props.beforePage}
        buttonTitle='Prev'
      />
      <Show when={props.changeSortBy !== undefined}>
        <div class='dark:bg-gray-500 rounded py-2 px-1'>
          <button class='btn-sm btn-blue sortBy sm:mr-2' id='hot' onClick={(e) => updateSortby(e)}>🔥</button>
          <button class='btn-sm sortBy sm:mr-2' id='top' onClick={(e) => updateSortby(e)}>🔝</button>
          <button class='btn-sm sortBy sm:mr-2' id='new' onClick={(e) => updateSortby(e)}>🆕</button>
          <button class='btn-sm sortBy' id='controversial' onClick={(e) => updateSortby(e)}>🙀</button>
        </div>
      </Show>
      <PaginateButton
        value={props.after}
        newPage={props.afterPage}
        buttonTitle='Next'
      />
    </div>
  )
}

const PaginateButton = (props) => {
  return (
    <Show when={props.value !== null && props.value !== undefined} fallback={<div class='btn invisible'>Prev</div>}>
      <button
        class='btn btn-blue'
        onClick={() => props.newPage()}
      >
        {props.buttonTitle}
      </button>
    </Show>
  )
}

export default Paginate
