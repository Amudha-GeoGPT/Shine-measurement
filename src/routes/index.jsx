import ErrorPage from "../error-page";
import CropImage from "../components/CropPage/CropImage/CropImage";
import ImageCrop from "../components/CropPage/CropPage";
import FileUpload from "../components/FileUpload/FileUpload";
import DashboardLayout from "../components/Layout/dashboard-layout/dashboardlayout";
import CalculationTable from "../components/Graphs/CalculationTable/CalculationTable";
import GraphResult from "../components/Graphs/GraphResult/GraphResult";
import ImageResult from "../components/Graphs/ImageResult/ImageResult";
import GraphHeader from "../components/Graphs/GraphHeader";
import Experiements from "../components/Mainpage/Pages/Experiments";
import { Navigate } from "react-router-dom";
const routes = [
    {
      path: "/",
      element: <DashboardLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Experiements /> },
        { path: "/preview", element: <CropImage /> },
        { path: "/CropImage", element: <ImageCrop /> },
        { path: "/CreateExperiment", element: <FileUpload /> },
        {
          path: "/graph",
          element: <GraphHeader />, // GraphHeader as a fixed element
          children: [
            {
              index: true, 
              element: <Navigate to="graph-results" replace />,
            },
            { path: "graph-results", element: <GraphResult /> },
            { path: "image-result", element: <ImageResult /> },
            { path: "calculation-results", element: <CalculationTable /> },
          ],
        },
      ],
    },
  ];

export default routes;