import { Show, For } from 'solid-js'

const PostGrid = (props) => {
  return (
    <Show
      when={props.posts.length > 0}
      fallback={<div class='flex justify-center dark:text-white'> Loading...  </div>}
    >
      <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <For each={props.posts}>
          {post => <Post title={post.title} imageUrl={post.imageUrl} />}
        </For>
      </div>
    </Show>
  )
}

const Post = ({ title, imageUrl }) => {
  return (
    <div class='sm:rounded sm:overflow-hidden sm:shadow-lg mb-10 pb-2 border-solid
                    border-b-2 border-black sm:border-none
                    dark:bg-gray-700'
    >
      <div class='px-6 py-4'>
        <div class='font-bold text-xl mb-2 dark:text-white'>{title}</div>
      </div>
      <img src={imageUrl} loading='lazy' class='object-cover' />
    </div>
  )
}

export default PostGrid
