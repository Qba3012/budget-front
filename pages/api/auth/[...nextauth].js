import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
  secret: process.env.COGNITO_CLIENT_SECRET ? process.env.COGNITO_CLIENT_SECRET : '',
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ? process.env.COGNITO_CLIENT_ID : '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET ? process.env.COGNITO_CLIENT_SECRET : '',
      issuer: process.env.COGNITO_ISSUER,
    })
  ],
  callbacks: {
    async session({session, token}) {
      if(session.user)
      session.user.name = token.sub;
      return session
    }
  }
})