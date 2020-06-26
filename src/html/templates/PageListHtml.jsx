import React from "react";

import { Link } from "react-router-dom";

const LIST = [
  {
    route: "/html/sign-up",
    title: "Signup step 1"
  },
  {
    route: "/html/sign-up-2",
    title: "Signup step 2"
  },
  {
    route: "/html/sign-up-3",
    title: "Signup step 3"
  },
  {
    route: "/html/sign-up-4",
    title: "Signup step 4"
  },
  {
    route: "/html/sign-in-number",
    title: "Sign in number"
  },
  {
    route: "/html/new-password",
    title: "New Password"
  },
  {
    route: "/html/forgot-password",
    title: "Forgot Password"
  },
  {
    route: "/html/new-user",
    title: "New User"
  },
  {
    route: "/html/profile",
    title: "Profile"
  },
  {
    route: "/html/customer-address",
    title: "Manage Addresses"
  },
  {
    route: "/html/sp-add-product",
    title: "SP Add Product"
  },
  {
    route: "/html/sp-add-service",
    title: "SP Add Service"
  },
  {
    route: "/html/sp-add-post",
    title: "SP Add Post"
  },
  {
    route: "/html/sp-product-list",
    title: "SP Product list"
  },
  {
    route: "/html/general",
    title: "Main Page (Posts)"
  },
  {
    route: "/product-detail",
    title: "Product detail page"
  },
  {
    route: "/product",
    title: "Post detail page"
  },
  {
    route: "/services-categories",
    title: "Services categories"
  },
  {
    route: "/services-list",
    title: "Services list"
  },
  {
    route: "/sp-list",
    title: "SP list"
  },
  {
    route: "/sp-detail",
    title: "SP detail page"
  },
  {
    route: "/about-us",
    title: "About Us"
  },
  {
    route: "/contact-us",
    title: "Contact Us"
  },
  {
    route: "/admin-dashboard",
    title: "Admin Dashboard"
  },
  {
    route: "/verification",
    title: "Verification"
  },
  {
    route: "/service-request-details",
    title: "Service request details"
  },
  {
    route: "/requests-list-user",
    title: "Requests list User"
  },
  {
    route: "/requests-list-sp",
    title: "Requests list (SP)"
  },
  {
    route: "/response-form",
    title: "Response form"
  },
  {
    route: "/request-details",
    title: "Request details"
  },
  {
    route: "/bids",
    title: "Bids"
  }
];

function PageListHtml(props) {
  return (
    <div className="page-list-wrap">
      <div className="page-list__logo">
        <img src="/img/logo.svg" alt="" />
      </div>
      <ul className="page-list">
        {LIST.map(page => (
          <li key={page.route} className="page-list__item">
            <Link className="page-list__link" to={page.route} target="_blank">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageListHtml;
