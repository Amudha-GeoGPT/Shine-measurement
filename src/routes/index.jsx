import ErrorPage from "../error-page";
import CropImage from "../components/crop-page/preview-image/preview-image";
import ImageCrop from "../components/crop-page/crop-page";
import FileUpload from "../components/file-upload/file-upload";
import DashboardLayout from "../components/Layout/dashboard-layout/dashboard-layout";
import CalculationTable from "../components/Graphs/calculation-table/calculation-table";
import GraphResult from "../components/Graphs/graph-result/graph-result";
import ImageResult from "../components/Graphs/image-result/image-result";
import GraphHeader from "../components/Graphs/graph-header";
import Experiements from "../components/main-pages/Pages/experiments";
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