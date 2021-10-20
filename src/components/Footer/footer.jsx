import React from "react";

const Footer = (props) => {

    return (
        <div>
            <footer id="footer" className="bg-primary text-white d-flex-column text-center"  >
                <hr className="mt-0" />

                <div className="text-center">
                    <h4>You can find us at</h4>
                    <ul className="list-unstyled list-inline">
                        <li className="list-inline-item">
                            <a href="#!" className="sbtn btn-large mx-1" title="Facebook">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#!" className="sbtn btn-large mx-1" title="Linkedin">
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#!" className="sbtn btn-large mx-1" title="Twitter">
                                <i className="fab fa-twitter-square fa-2x"></i>
                            </a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#!" className="sbtn btn-large mx-1" title="Youtube">
                                <i className="fab fa-youtube-square fa-2x"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                {/* <!--/.Social buttons--> */}
                <hr className="mb-0" />
                {/* <!--Footer Links--> */}
                <div className="container text-left text-md-center">
                    <div className="row">
                        {/* <!--First column--> */}
                        <div className="col-md-3 mx-auto shfooter">
                            <h5 className="my-2 font-weight-bold d-none d-md-block">Product</h5>
                            <div className="d-md-none title" data-target="#Product" data-toggle="collapse">
                                <div className="mt-3 font-weight-bold">Product
                                    <div className="float-right navbar-toggler">
                                        <i className="fas fa-angle-down"></i>
                                        <i className="fas fa-angle-up"></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled collapse" id="Product">
                                <li><a href="https://codepen.io/jettaz">Create Websites</a></li>
                                <li><a href="https://codepen.io/jettaz">Secure Cloud Hosting</a></li>
                                <li><a href="https://codepen.io/jettaz">Engage Your Audience</a></li>
                                <li><a href="https://codepen.io/jettaz">Website Support</a></li>
                            </ul>
                        </div>
                        {/* <!--/.First column--> */}
                        <hr className="clearfix w-100 d-md-none mb-0" />
                        {/* <!--Second column--> */}
                        <div className="col-md-3 mx-auto shfooter">
                            <h5 className="my-2 font-weight-bold d-none d-md-block">Company</h5>
                            <div className="d-md-none title" data-target="#Company" data-toggle="collapse">
                                <div className="mt-3 font-weight-bold">Company
                                    <div className="float-right navbar-toggler">
                                        <i className="fas fa-angle-down"></i>
                                        <i className="fas fa-angle-up"></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled collapse" id="Company">
                                <li><a href="https://codepen.io/jettaz">About</a></li>
                                <li><a href="https://codepen.io/jettaz">Careers</a></li>
                                <li><a href="https://codepen.io/jettaz">Support</a></li>
                                <li><a href="https://codepen.io/jettaz">Pricing</a></li>
                                <li><a href="https://codepen.io/jettaz">FAQ</a></li>
                            </ul>
                        </div>
                        {/* <!--/.Second column--> */}
                        <hr className="clearfix w-100 d-md-none mb-0" />
                        {/* <!--Third column--> */}
                        <div className="col-md-3 mx-auto shfooter">
                            <h5 className="my-2 font-weight-bold d-none d-md-block">Resources</h5>
                            <div className="d-md-none title" data-target="#Resources" data-toggle="collapse">
                                <div className="mt-3 font-weight-bold">Resources
                                    <div className="float-right navbar-toggler">
                                        <i className="fas fa-angle-down"></i>
                                        <i className="fas fa-angle-up"></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled collapse" id="Resources">
                                <li><a href="https://codepen.io/jettaz">Blog</a></li>
                                <li><a href="https://codepen.io/jettaz">eBooks</a></li>
                                <li><a href="https://codepen.io/jettaz">Whitepapers</a></li>
                                <li><a href="https://codepen.io/jettaz">Comparison Guide</a></li>
                                <li><a href="https://codepen.io/jettaz">Website Grader</a></li>
                            </ul>
                        </div>
                        {/* <!--/.Third column--> */}
                        <hr className="clearfix w-100 d-md-none mb-0" />
                        {/* <!--Fourth column--> */}
                        <div className="col-md-3 mx-auto shfooter">
                            <h5 className="my-2 font-weight-bold d-none d-md-block">Get Help</h5>
                            <div className="d-md-none title" data-target="#Get-Help" data-toggle="collapse">
                                <div className="mt-3 font-weight-bold">Get Help
                                    <div className="float-right navbar-toggler">
                                        <i className="fas fa-angle-down"></i>
                                        <i className="fas fa-angle-up"></i>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled collapse" id="Get-Help">
                                <li><a href="https://codepen.io/jettaz" target="_blank">Help Center</a></li>
                                <li><a href="https://codepen.io/jettaz">Contact Us</a></li>
                                <li><a href="https://codepen.io/jettaz">Privacy Policy</a></li>
                                <li><a href="https://codepen.io/jettaz">Terms</a></li>
                                <li><a href="https://codepen.io/jettaz">Login</a></li>
                            </ul>
                        </div>
                        {/* <!--/.Fourth column--> */}
                    </div>
                </div>
                {/* <!--/.Footer Links--> */}
                <hr className="mb-0" />
                {/* <!--Copyright--> */}
                <div className="py-3 text-center">
                    Copyright 1993-
                    <script>
                        document.write(new Date().getFullYear())
                    </script> <a href="https://codepen.io/jettaz">Jettaz</a> | It is free for use
                </div>
                {/* <!--/.Copyright--> */}
            </footer>

        </div>
    )

}
export default Footer