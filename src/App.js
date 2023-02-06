import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { saveToLocalStorage } from "./redux/persistStore";
import store from "./redux/store";
import { routes } from "./routes";

function App() {
  useEffect(() => {
    if (typeof window !== undefined) {
      store.subscribe(() => {
        saveToLocalStorage(store.getState());
      });
    }
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map((route, k) => (
              <Route path={route.path} key={k} element={route.component} />
            ))}
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center">
                  No page found
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
