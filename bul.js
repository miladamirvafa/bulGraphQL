const API_URL = "https://bul-api-url.com/api/graphql";

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

const bulgql = (query) => {
  return query.loc.source.body;
};
export { bulMutation, bulQuery, bulgql };
