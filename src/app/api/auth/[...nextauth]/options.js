import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
      profile(profile) {
        console.log("Profile GitHub: ", profile);

        const userRole =
          profile?.email === "himanshu@kollegeapply.com"
            ? "admin"
            : "User";

        return {
          ...profile,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
      async profile(profile) {
        console.log("Profile Google: ", profile);

        // const isUserRegistered = await saveUserDataToDatabase(profile);

        // if (!isUserRegistered) {
        //   console.error("User not registered. Please sign up.");
        // }

        const userRole = "User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Credentials:", credentials);

          const response = await fetch(
            "https://kap-test-backend.onrender.com/Kapapi/login/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization:
              "Basic " +
              btoa(
                `abhinay@gmail.com:qwertyuiop`
              ),
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log("API Response:", responseData);

            let userRole = "user";

            if (credentials.email === "admin@kollegeapply.com") {
              userRole = "admin";
            }

            if (responseData.tokens && responseData.tokens.access) {
              const user = {
                id: responseData.tokens.access,
                email: credentials.email,
                role: userRole,
              };

              return Promise.resolve(user);
            } else {
              console.error(
                "Authentication failed. Missing 'tokens.access' in the response."
              );
              return Promise.resolve(null);
            }
          } else {
            console.error(
              "Authentication failed. Response status:",
              response.status
            );
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

export default options;

// async function saveUserDataToDatabase(profile) {
//   try {
//     const response = await fetch(
//       "https://kap-test-backend.onrender.com/Kapapi/signup/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: profile.email,
//           name: profile.name,
//         }),
//       }
//     );

//     if (response.ok) {
//       console.log("User data saved successfully");
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to save user data:", errorData);
//     }
//   } catch (error) {
//     console.error("Error saving user data:", error);
//   }
// }
