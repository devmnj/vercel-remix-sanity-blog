import sanityClient from "@sanity/client";

const client = sanityClient({
    projectId: "n2amzrlx",
    dataset: "production",
    apiVersion: "2022-10-21",
    token:'skQcx9731WkpA4fsaHnCxZeny1ykWRXMvY0oFkKUJJ2yUj3VW1t8KpqvP41DDts6gI8c4dR6fytnxDo72Pj5UFJc1jgSUxNI1i8QAdiQCavATFYq1WVg5FpoFNuOqfa9a0DfWCETVcgqy5EWDnKeMGpJT7Gj5cmSYDWYPKITWDBZ6VfcQvKY',
    useCdn: false,
    ignoreBrowserTokenWarning: true

  });

export default client;