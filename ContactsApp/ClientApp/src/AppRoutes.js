import { FetchData } from "./components/FetchData";
import { Create } from "./components/Create";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

const AppRoutes = [
  {
    index: true,
    element: <FetchData />
  },
  {
      path: '/create',
      element: <Create />
  },
  {
    path: '/contact/:id',
    element: <Detail />
  },
  {
    path: '/contact/edit/:id',
    element: <Edit />
  },
  {
    path: '/contact/delete/:id',
    element: <Delete />
  }
];

export default AppRoutes;
