import React, { createContext, useReducer, useState } from 'react'


export const ProvideContext = createContext()

export const ContextProvider = ({ children }) => {

  const addComment = (values, state) => {
    const postId = values.postId;
    var present = false
    if (state.comment != undefined) {
      for (var i = 0; i < state.comment.length; i++) {
        if (state.comment[i].postId == postId) {
          present = true
          state.comment[i].values.push(values.values)
        }
      }

      if (!present) {
        state.comment.push({
          "postId": postId,
          "values": [values.values]
        })
      }
    } else {
      state.comment.push({
        "postId": postId,
        "values": [values.values]
      })
    }



    return state.comment
  }


  const handleData = (state, action) => {
    console.log("Dropdown==>"+state.dropdown)
    switch (action.type) {
      case "open_dropdown":
        return { ...state, dropdown: [...state.dropdown,action.payload]};
        case "allow_to_edit":
          return { ...state, allowToEdit:action.payload};
      case "close_dropdown":
        return { ...state, dropdown: state.dropdown.filter(item => item != action.payload) }
      case "add_userPost":
        console.log("New post added--->"+action.payload)
        return { ...state, userPost:[...state.userPost, action.payload]  }
        case "remove_userPost":
        return { ...state, userPost:state.userPost.filter(post=>post.id!=action.payload) }
      case "toggle_modal":
        return { ...state, showModal: action.payload }
      case "set_username":
        return { ...state, username: action.payload }
      case "set_bio":
        return { ...state, bio: action.payload }
      case "follow_user":
        return { ...state, following: [...state.following, action.payload] }
      case "add_like":
        return { ...state, likes: state.likes.includes(action.payload) ? [state.likes.filter(ele => ele != action.payload)] : [...state.likes, action.payload] }
      case "bookmark":
        return { ...state, bookmark: state.bookmark.includes(action.payload) ? [state.bookmark.filter(mark => mark != action.payload)] : [...state.bookmark, action.payload] }
      case "toggle_createPost":
        return { ...state, createPost: action.payload }
      case "add_comment":
        return { ...state, comment: addComment(action.payload, state) }
        case "delete_comment":
          console.log("comment state---->"+JSON.stringify(state.comment))
          return { ...state, comment:  state.comment.filter(c=>c.id!=action.payload) }
      case "set_post":
        return { ...state, post: action.payload }
        case "follow":
          return { ...state, followers:[...state.followers, action.payload]}
          case "unfollow":
            return { ...state, followers:state.followers.filter(c=>c!=action.payload)}
      default:
        return state
    }
  }



  const [state, dispatch] = useReducer(handleData, { allowToEdit:false,showModal: false, dropdown:[], userPost:[], createPost: false, username: "", bio: "", following: [], post: {}, likes: [], bookmark: [], comment: [],followers:[] })
  // const[showModal,handleModal] = useState(false)


  return (
    <ProvideContext.Provider value={{ state, dispatch }}>{children}</ProvideContext.Provider>
  )
}
