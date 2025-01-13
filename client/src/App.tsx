import React, { useEffect } from 'react';
import Layout from "./components/layout/Layout"
import Loader from "./components/ui/loader"

const App: React.FC = () => {
  const [isLoading,updateLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      updateLoading(false);
    }, 3000);
  }, []);
  if(isLoading){
    return (
      <Loader/>
    );
  }
  return (
   
    <Layout children={undefined}>
      {/* Additional content can be added here */}
    </Layout>
 
  );
};

export default App;