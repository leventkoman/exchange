import Header from "./components/layouts/Header.tsx";
import Body from "./components/layouts/Body.tsx";
import Footer from "./components/layouts/Footer.tsx";

function App() {

  return (
      <div className={"flex flex-col h-screen"} >
          <Header/>
          <Body/>
          <Footer/>
      </div >
  )
}

export default App
