
import gql from 'graphql-tag';

//LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

//Again, we import the gql tagged template literal functionality to create a GraphQL mutation called login. This will accept two variables, $email and $password, whose values we'll set up to be passed in as arguments when we integrate this with the login form page
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//In return, we expect the logged-in user's data and the token. With this token, we'll be able to perform other actions unique to the logged-in user.


//ADD_USER will execute the addUser mutation.
//Next, we need to create the mutation for creating a new user through the signup form page. :

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


//SAVE_BOOK will execute the saveBook mutation.


export const SAVE_BOOK = gql `
mutation saveBook(authors:[String], description: String, title: String, image: String, link: String){
  saveBook(authors: $authors, description: $description, title: $title, image: $imgae, link: $link){
    authors
    description
    title
    image
    link
  }
}

`;

//REMOVE_BOOK will execute the removeBook mutation.

export const REMOVE_BOOK = gql `
mutation removeBook(bookId: ID!) {
  removeBook(bookId: $bookId) {
    bookId
    title
    author
  }
}

`