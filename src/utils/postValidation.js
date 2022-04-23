export const isNewPostValid = (post) => {
   if (post.title.trim().length === 0 || post.body.trim().length === 0) {
      return false
   }
      return true
} 