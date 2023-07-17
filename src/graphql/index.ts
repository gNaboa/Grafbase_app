

export const getUserQuery =`
query GetUser($email:String!) {
    user(by: {email:$email}) {
      name
      id
      email
      githubUrl
      avatarUrl
      description
      linkedinUrl
    }
  }
`


export const createUserQuery=`
mutation UserCreate($input:UserCreateInput!) {
    userCreate(input: $input) {
      user {
        name
        email
        avatarUrl
        description
        githubUrl
        linkedinUrl
      }
    }
  }
`