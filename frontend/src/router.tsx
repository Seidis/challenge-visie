import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/components/pages/Home";
import PersonForms from "@/components/pages/PersonForms";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas">
          <Route path=":id_pessoa" element={<PersonForms />} />
          <Route path=":id_pessoa/edit" element={<PersonForms edit={true} />} />
          <Route path="adicionar" element={<PersonForms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
