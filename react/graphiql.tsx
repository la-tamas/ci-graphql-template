import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { createRoot } from 'react-dom/client';

import 'graphiql/graphiql.css';

const fetcher = createGraphiQLFetcher({
  url: 'http://localhost:8080/graphql',
});

const rootElemet = document.getElementById('root')!

const root = createRoot(rootElemet)

root.render(<GraphiQL fetcher={fetcher} />)