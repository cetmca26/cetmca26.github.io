import React, { useEffect, useState } from "react";
import "./Navbar.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = ({ onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    var header = $(".start-style");

    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll >= 10) {
        header.removeClass("start-style").addClass("scroll-on");
      } else {
        header.removeClass("scroll-on").addClass("start-style");
      }
    });

    $("body.hero-anime").removeClass("hero-anime");

    $("body").on("mouseenter mouseleave", ".nav-item", function (e) {
      if ($(window).width() > 750) {
        var _d = $(e.target).closest(".nav-item");
        _d.addClass("show");
        setTimeout(function () {
          _d[_d.is(":hover") ? "addClass" : "removeClass"]("show");
        }, 1);
      }
    });

    $("#switch").on("click", function () {
      if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("#switch").removeClass("switched");
      } else {
        $("body").addClass("dark");
        $("#switch").addClass("switched");
      }
    });

    return () => {
      $(window).off("scroll");
      $("#switch").off("click");
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="navigation-wrap bg-light start-header start-style">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-md navbar-expand-lg">
              <a className="navbar-brand">
                <img
                  src="../src/assets/logotext.png"
                  alt="Logo"
                  id="logo"
                  style={{
                    filter: isDarkMode
                      ? "invert(1) brightness(2)"
                      : "invert(0) brightness(2)",
                  }}
                />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                style={{
                  filter: isDarkMode
                    ? "invert(1) brightness(2)"
                    : "invert(0) brightness(2)",
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto py-4 py-md-0">
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1 active dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={() => onNavigate('home')}
                    >
                      Home
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#" onClick={() => onNavigate('about')}>
                          About Us
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="https://github.com/cetmca26">
                          Github
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={() => onNavigate('rules')}>
                          How to Contribute?
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Get Started
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1">
                    <a className="nav-link" href="#" onClick={() => onNavigate('projects')}>
                      Projects
                    </a>
                  </li>
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1">
                    <a className="nav-link" href="#" onClick={() => onNavigate('lab')}>
                      Lab
                    </a>
                  </li>
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="https://cetmca26.live/Study-Materials/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onClick={() => onNavigate('notes')}
                    >
                      Notes
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="https://cetmca26.live/Study-Materials/materials.html">
                        Semester 1
                      </a>
                      <a className="dropdown-item" href="https://cetmca26.live/Study-Materials/materials.html">
                        Semester 2
                      </a>
                      <a className="dropdown-item" href="#">
                        Semester 3
                      </a>
                      <a className="dropdown-item" href="#">
                        Semester 4
                      </a>
                    </div>
                  </li>
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1">
                    <a className="nav-link" href="#" onClick={() => onNavigate('team')}>
                      Meet the team
                    </a>
                  </li>
                  <li className="nav-item ps-4 ps-md-0 ms-0 ms-md-4 me-1">
                    <a className="nav-link" href="#">
                      Join Us
                    </a>
                  </li>
                  <li
                    className="ps-4 ps-md-0 ms-0 ms-md-4 me-1"
                    id="switch"
                    onClick={toggleDarkMode}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="material-symbols-outlined p-1" id="modes">
                      {isDarkMode ? "brightness_5" : "dark_mode"}
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
