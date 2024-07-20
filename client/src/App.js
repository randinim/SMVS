import { useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Inquiries from "./pages/Inquiries/Inquiries";
import { Crisp } from "crisp-sdk-web";
import Shop from "./pages/Shop/Shop";
import AddProduct from "./pages/Admin/Products/Addproduct";
// import Productlist from "./pages/Admin/Products/Products";
import UpdateProduct from "./pages/Admin/Products/Updateproduct";
// import AddProduct from "./pages/Products/Addproduct";

import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import CreateProfile from "./pages/Profile/CreateProfile";

import AddVehicles from "./pages/Profile/AddVehicles";
import UpdateVehicle from "./pages/Profile/UpdateVehicle";
import ShowVehicle from "./pages/Profile/ShowVehicle";

import Card from "./pages/Card/Card";
import { RentalService } from "./pages/Rentals/RentalService";
import CarsMain from "./pages/Rentals/CarsMain";

// import { NewVehicleForm } from "./pages/Rentals/NewVehicleForm";
import VansMain from "./pages/Rentals/VansMain";
import JeepsMain from "./pages/Rentals/JeepsMain";
import { CarsDetails } from "./pages/Rentals/CarsDetails";
import { VansDetails } from "./pages/Rentals/VansDetails";
import { JeepsDetails } from "./pages/Rentals/JeepsDetails";
import { AdminPanel } from "./pages/Admin/Admin";
import { AdminInquiry } from "./pages/Admin/Inquiries/AdminInquiry";
import UpdateInquiryForm from "./pages/Admin/Inquiries/UpdateInquiryForm";
import { VehicleRentalReport } from "./pages/Rentals/JeepsDetails";
import Rental from "./pages/Admin/Rental/Rental";
// import { VehicleRentalReport } from "./pages/Rentals/JeepsDetails";
import Cart from "./pages/Cart/Cart";
import { AdminFeedback } from "./pages/Admin/Feedback/AdminFeedback";
import { FeedbackForm } from "./pages/Shop/FeedbackForm";
import { AdminTransaction } from "./pages/Admin/Transactions/AdminTransaction";

function App() {
  useEffect(() => {
    Crisp.configure("472b8c52-0771-4647-8563-c4c3ead5b1ce");
    // const [count, setCount] = useState(0);
  });

  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route exact path="/signin" Component={Login} />
          <Route exact path="/signup" Component={Register} />
          <Route exact path="/inquiry" Component={Inquiries} />
          <Route exact path="/inquiry/update" Component={UpdateInquiryForm} />

          <Route exact path="/profile" Component={Profile} />
          <Route exact path="/UpdateProfile" Component={UpdateProfile} />
          <Route exact path="/CreateProfile" Component={CreateProfile} />
          <Route exact path="/AddVehicles" Component={AddVehicles} />
          <Route exact path="/UpdateVehicle" Component={UpdateVehicle} />
          <Route exact path="/ShowVehicle" Component={ShowVehicle} />

          <Route exact path="/profile/card" Component={Card} />
          <Route exact path="/profile/card/:cardId" Component={Card} />
          <Route exact path="/profile/cart" Component={Cart} />
          <Route exact path="/shop" Component={Shop} />
          <Route exact path="/shop/feedback" Component={FeedbackForm} />
          <Route exact path="/admin/addproduct" Component={AddProduct} />
          <Route exact path="/admin/UpdateProduct/" Component={UpdateProduct} />

          <Route exact path="/rentalservice" Component={RentalService} />

          {/* <Route exact path="/newvehicleform" Component={NewVehicleForm} /> */}

          <Route exact path="/rentalservice/vansmain" Component={VansMain} />
          <Route exact path="/rentalservice/carsmain" Component={CarsMain} />
          <Route exact path="/rentalservice/jeepsmain" Component={JeepsMain} />
          <Route exact path="/carsdetails" Component={CarsDetails} />
          <Route exact path="/vansdetails" Component={VansDetails} />
          <Route exact path="/jeepsdetails" Component={JeepsDetails} />

          {/* Admin Panel Routes */}
          <Route exact path="/admin" Component={AdminPanel} />
          <Route exact path="/admin/inquiries" Component={AdminInquiry} />
          <Route
            exact
            path="/admin/products/feedback"
            Component={AdminFeedback}
          />
          <Route
            exact
            path="/admin/transactions"
            Component={AdminTransaction}
          />

          {/* Why is this not getting tagged */}
        </Routes>
      </>
    </Router>
  );
}

export default App;
