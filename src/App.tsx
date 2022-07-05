import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";
import ReadingListPage from "./pages/ReadingListPage/ReadingListPage";

import "./App.scss";

const App: FC = (): ReactElement => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<ReadingListPage />} />
                    <Route path="authors" element={<AuthorsPage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
