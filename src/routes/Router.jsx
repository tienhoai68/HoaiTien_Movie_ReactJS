import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import Booking from "../pages/Booking/Booking";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminUsers from "../pages/AdminUser/AdminUsers";
import AdminFilm from "../pages/AdminFilm/AdminFilm";
import EditFilm from "../pages/AdminFilmEdit/EditFilm";
import Login from "../components/Login/Login";
import AuthGuard from "../guards/AuthGuard";
import NoAuthGuard from "../guards/NoAuthGuard";
import MovieList from "../pages/MovieList/MovieList";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import AddFilm from "../pages/AdminFilmAddnew/AddFilm";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminGuard from "../guards/AdminGuard";
import AdminShowTime from "../pages/AdminFilm/components/AdminShowTime";
import AdminHome from "../pages/AdminHome/AdminHome";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
        },
        {
          path: "/movie-detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/movie-list",
          element: <MovieList />,
        },
        {
          path: "/booking/:bookingId",
          element: (
            <AuthGuard>
              <Booking />
            </AuthGuard>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        {
          path: "/admin",
          element: <AdminHome />,
        },
        {
          path: "/admin/user",
          element: <AdminUsers />,
        },
        {
          path: "/admin/films",
          element: <AdminFilm />,
        },
        {
          path: "/admin/films/addnew",
          element: <AddFilm />,
        },
        {
          path: "/admin/films/edit/:filmId",
          element: <EditFilm />,
        },
        {
          path: "/admin/films/showtime/:filmId",
          element: <AdminShowTime />,
        },
      ],
    },

    {
      path: "/login",
      element: (
        <NoAuthGuard>
          <Login />
        </NoAuthGuard>
      ),
    },
  ]);
  return routing;
}
