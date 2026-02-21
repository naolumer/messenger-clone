import {withAuth} from "next-auth/middleware"

export default withAuth ({
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    }
})

export const config = {
    matcher : [
        "/users/:path*",
        "/conversations/:path*"
    ]
}
