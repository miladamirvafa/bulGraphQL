# bulGraphQL
# Simple &amp; Fast GraphQL client

Since Next.js introduced the new app router, there have been many problems integrating existing GraphQL clients such as Apollo or Urql with projects.

Most of the problems occur when dealing with server-side components, where we can't use useMutation as expected, and there are many other issues that are frustrating for developers.

During my last projects, I faced many problems using these clients, so I decided to build something from scratch to improve my experience.

Using the JavaScript Fetch API, I managed to resolve these issues, resulting in a client that works seamlessly with both server-side and client-side components.
Let's dive in.

Assuming the API URL to be:

const API_URL = "https://bul-api-url.com/api/graphql";

For queries, I used the following code:

```
const bulQuery = async ({ query, cookies, variables, apiUrl }) => {
  const Cookie = cookies
    ? cookies
        .map((cookie) => [cookie?.name, cookie?.value].join("="))
        .join("; ")
    : undefined;
  const res = await fetch(apiUrl || API_URL, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      query: `${query}`,
      variables,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie,
    },
  }).then((res) => res.json());
  return res;
};

```

For mutations, I used this code:

```
const bulMutation = async ({ query, cookies, variables, apiUrl }) => {
  const Cookie = cookies
    ? cookies
        .map((cookie) => [cookie?.name, cookie?.value].join("="))
        .join("; ")
    : undefined;
  return await fetch(apiUrl || API_URL, {
    cache: "no-cache",
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      query: `${query}`,
      variables,
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie,
    },
  }).then((res) => res.json());
};

```

Here's how I declared a query:

```
const GET_POST = `
query GetPost($where: PostWhereUniqueInput!) {
  post(where: $where) {
    id
    title
    slug
  }
}
`;

```

If you still prefer using gql, I added this method to return the string part of the query:


```
const bulgql = (query) => {
  return query.loc.source.body;
};

```

By the way, I have published the code on a GitHub repository with examples
https://github.com/miladamirvafa/bulGraphQL
