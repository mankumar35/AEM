import React , {useEffect} from "react"
import sendCoords from "../functions/sendCoords"
import "./codepen.css"

const HomePage = () => {
    return(
        <div>
            <div class="first_section">
                <div class="container">
                    <div class="text">
                        <h1>Next generation digital banking</h1>
                        <p>Take your financial life online. Your Easybank account
                            will be a one-stop-shop for spending, saving,
                            budgeting, investing, and much more.</p>
                        <button onClick={sendCoords} class="btn btn_two"> Request invite</button>
                    </div>



                    <div class="image">
                        <img src="https://abdullahuc.github.io/bank-ui/assets/images/image-mockups.png" alt="" />
                    </div>

                </div>
            </div>

            <div class="second_section">
                <div class="container">
                    <div class="heading">
                        <h2>Why choose Easybank?</h2>
                        <p>We leverage Open Banking to turn your bank account into your financial hub.
                            <br /> Control your finances like never before.
                        </p>
                    </div>
                    <div class="text_two">


                        <div class="photo">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/icon-online.svg" alt="" />
                            <h3>Online Banking</h3>
                            <p>Our modern web and mobile applications allow you to keep track of your finances wherever you are
                                in the world.</p>
                        </div>


                        <div class="description">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/icon-budgeting.svg" alt="" />
                            <h3>Simple Budgeting</h3>
                            <p>See exactly where your money goes each month. Receive notifications when you’re close to hitting
                                your limits.</p>
                        </div>


                        <div class="photo">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/icon-onboarding.svg" alt=""/> 
                            <h3>Fast Onboarding</h3>
                            <p>We don’t do branches. Open your account in minutes online and start taking control of your
                                finances right away.</p>
                        </div>



                        <div class="photo">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/icon-api.svg" alt="" />
                            <h3>Open API</h3>
                            <p>Manage your savings, investments, pension, and much more from one account. Tracking your money
                                has never been easier.</p>
                        </div>

                    </div>
                </div>
            </div>
            
            <div class="third_section">
                <div class="container">
                    <h2>Latest Articles</h2>

                    <div class="text_three">

                        <div class="des">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/image-currency.jpg" alt="" />
                            <h5>By Claire Robinson</h5>
                            <h3>Receive money in any currency with no fees</h3>
                            <p>The world is getting smaller and we’re becoming more mobile. So why should you be forced to only
                                receive money in a single …</p>
                        </div>

                        <div class="des">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/image-restaurant.jpg" alt="" />
                            <h5>By Wilson Hutton</h5>
                            <h3>Treat yourself without worrying about money</h3>
                            <p>Our simple budgeting feature allows you to separate out your spending and set realistic limits
                                each month. That means you …</p>
                        </div>

                        <div class="des">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/image-plane.jpg" alt="" />
                            <h5>By Wilson Hutton</h5>
                            <h3>Take your Easybank card wherever you go</h3>
                            <p>We want you to enjoy your travels. This is why we don’t charge any fees on purchases while you’re
                                abroad. We’ll even show you …</p>
                        </div>

                        <div class="des">
                            <img src="https://abdullahuc.github.io/bank-ui/assets/images/image-confetti.jpg" alt="" />
                            <h5>By Claire Robinson</h5>
                            <h3>Our invite-only Beta accounts are now live!</h3>
                            <p>After a lot of hard work by the whole team, we’re excited to launch our closed beta. It’s easy to
                                request an invite through the site ...</p>
                        </div>

                    </div>
                </div>
            </div>
        
            <div class="footer">
                <div class="container">
                    <div class="main">
                        <div class="last">
                            <img srcset="https://abdullahuc.github.io/bank-ui/assets/images/output-onlinepngtools.png" alt="" />
                        </div>
                        <div class="icon">
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-youtube"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-pinterest"></i>
                            <i class="fab fa-instagram-square"></i>
                        </div>
                    </div>



                    <div class="links">
                        <div class="col_one">
                            <ul>
                                <li><a href="#">About</a> </li>
                                <li><a href="#">Contact</a> </li>
                                <li><a href="#">Blog</a> </li>
                            </ul>
                        </div>

                        <div class="col_two">
                            <ul>
                                <li><a href="#">Career</a> </li>
                                <li><a href="#">Support</a> </li>
                                <li><a href="#">Privacy Policy</a> </li>
                            </ul>
                        </div>
                    </div>


                    <div class="mail">
                        <div>
                            <button onClick={sendCoords} class="btn btn_three">Request Invite</button>
                        </div>
                        <p>©Easybank. All Rights Reserved</p>
                    </div>


                </div>
            </div>
            
        </div>
            )
        }

export default HomePage