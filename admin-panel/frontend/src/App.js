import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import { useSelector, useDispatch } from 'react-redux';
import ViewCourses from './admin/courses/ViewCourses';
import AddCourses from './admin/courses/AddCourses';
import ViewSingleCourse from './admin/courses/ViewSingleCourse';
import AddLectures from './admin/courses/AddLectures';
import EditCourse from './admin/courses/EditCourse';
import SetTarger from './admin/SetTarger';
import SetSubscription from './admin/SetSubscription';
import MainLayout from './admin/layout/MainLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { updateIsSubscribe } from './redux/actions/usersAction';
import EditLectures from './admin/courses/EditLectures';
import NotFound from './components/NotFound';
import ViewUsers from './admin/ViewUsers';
import ViewPurchaseHistory from './admin/ViewPurchaseHistory';
import { persistor } from './redux/store';
import CreateSections from './admin/forms/CreateSections';
import UploadForms from './admin/forms/UploadForms';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.token !== null && auth.token !== undefined;
  const isLoggedIn = token && auth.isLoggedIn;
  const user = auth.user
  // console.log(user)

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.type === 'user') {
      checkValidation();
    } else {
      console.log('You are Admin..!')
    }
  }, [auth.type, auth.token])

  const checkValidation = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_APIURL}/api/users/check-validation`, { subscriveDate: user.subscriptionDate }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        }
      })
        .then(response => {
          setIsLoading(false);

          if (response.data.isActive === 0) {
            alert('Your ID has been blocked. Contact support team.');
            persistor.purge().then(() => {
              window.location.reload();
            });
          }
          // console.log('successfully ge:', response.data);
        })
        .catch(error => {
          if (error?.response?.status === 401) {
            console.log('expire');
            dispatch(updateIsSubscribe(1));
          } else {
            console.error('There was an error saving the data:', error);
          }
        });
    } catch (error) {
      console.log(`${error?.message || error?.response?.data?.msg}`);
    }
  }


  const ScrollTOTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname])
    return null
  }


  return (
    <BrowserRouter>
      <ScrollTOTop />
      <Routes>
        {/* ---------------- admin access ---------------- */}
        <Route path={'/'} element={<MainLayout Component={AdminDashboard} />} />
        <Route path={'/setTarget'} element={<MainLayout Component={SetTarger} />} />
        <Route path={'/setSubscription'} element={<MainLayout Component={SetSubscription} />} />

        <Route path={'/addCourses'} element={<MainLayout Component={AddCourses} />} />
        <Route path={'/viewCourses'} element={<MainLayout Component={ViewCourses} />} />

        <Route path={'/viewSingleCourse'} element={<MainLayout Component={ViewSingleCourse} />} />
        <Route path='/editCourse/:id' element={<MainLayout Component={EditCourse} />} />


        <Route path={'/addLectures/:id'} element={<MainLayout Component={AddLectures} />} />
        <Route path={'/editLectures/:id'} element={<MainLayout Component={EditLectures} />} />

        <Route path={'/viewUsers'} element={<MainLayout Component={ViewUsers} />} />
        <Route path={'/viewPurchaseHistory'} element={<MainLayout Component={ViewPurchaseHistory} />} />

        <Route path={'/formsSection'} element={<MainLayout Component={CreateSections} />} />
        <Route path={'/uploadForms'} element={<MainLayout Component={UploadForms} />} />


        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
