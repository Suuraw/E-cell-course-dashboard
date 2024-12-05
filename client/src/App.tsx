import React from 'react';
import Layout from "./components/layout/Layout"

const App: React.FC = () => {
  return (
    <Layout children={undefined}>
      {/* Additional content can be added here */}
    </Layout>
  );
};

export default App;