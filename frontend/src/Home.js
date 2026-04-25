import { useEffect } from "react";

function Home() {

    return (
        <>
            <div class="baner">
                <div class="container">
                    <div class="baner-grids">
                        <div class="col-md-6 baner-top">
                            <figure class="effect-bubba">
                                <img src="/assets/images/banner5.webp" alt="" />
                                <figcaption>
                                    <h4>All Types of Machinery Available</h4>
                                    <p>Machinery Like Tractor, Sprayer,Seeders.</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="col-md-6 baner-top">
                            <figure class="effect-bubba">
                                <img src="/assets/images/banner6.webp" alt="" />
                                <figcaption>
                                <h4>All Types of Machinery Available</h4>
                                <p>Machinery Like Tractor, Sprayer,Seeders.</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="clearfix"> </div>
                        <div class="baner-row">
                            <div class="col-md-4 baner-bottom">
                                <figure class="effect-bubba">
                                    <img src="/assets/images/banner7.jpg" alt="" />
                                    <figcaption>
                                        <h4>Seeders</h4>
                                        <p>All Type of Seeders Are Available</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="col-md-4 baner-bottom">
                                <figure class="effect-bubba">
                                    <img src="/assets/images/banner8.jpg" alt="" style={{width: "377px",height:"215px"}} />
                                    <figcaption>
                                        <h4>Sprayers</h4>
                                        <p>Sprayers Are Also Available</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="col-md-4 baner-bottom">
                                <figure class="effect-bubba">
                                    <img src="/assets/images/banner9.jpg" alt="" />
                                    <figcaption>
                                        <h4>Tractor</h4>
                                        <p>Small to Big Tractors Are Available</p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div class="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="news-info">
                <div class="container">
                    <h3 class="title">Welcome to FarmEquipRent</h3>
                </div>
            </div>
            
            <div class="container">
                <div class="news">
                    <div class="news-grids">
                        <div class="col-md-12 news-grid">

                            <div class="news-grid-left-info">
                                <h5>
                                    <p>Boost Your Farm's Efficiency with FarmEquipRent Farm Services.
                                    At FarmEquipRent, we understand the need to imporove the productivity and the challenges in acquiring and maintaining farm equipment. That's why we offer a convenient and cost-effective solution – FramEQuipRent Farm Services!</p>
                                    <p>
                                    Simplify your farming operations with FarmEquipRent's pay-per-use farm equipment rental service. Access a diverse range of advanced tools, including cultivators, rotavators, harvesters, and more, through our trusted FarmEquipRent partners. Enjoy the flexibility and cost-effectiveness of renting high-quality equipment without the burden of ownership.
                                    </p>
                                </h5>
                            </div>
                        </div>


                        <div class="clearfix"> </div>
                    </div>
                </div>
            </div>
           
            <div class="services" id="services">
                <div class="container">
                    <h3 class="title">Our Services</h3>
                    <div class="service-grids">
                        <div class="col-md-4 srvc-grids-info">
                            <div class="srvc-img">
                                <img src="/assets/images/tractor.png" style={{width:"80px", height:"80px"}} />
                            </div>
                            <h5>Advanced high quality equipment</h5>
                            
                        </div>
                        <div class="col-md-4 srvc-grids-info">
                            <div class="srvc-img">
                                <img src="/assets/images/book123.png" style={{width:"80px", height:"80px"}}/>
                            </div>
                            <h5>Easy booking</h5>
                          
                        </div>
                        <div class="col-md-4 srvc-grids-info">
                            <div class="srvc-img">
                                <img src="/assets/images/bill12.png" style={{width:"80px", height:"80px"}}/>
                            </div>
                            <h5>Bill Generate</h5>
                            
                        </div>


                        <div class="clearfix"> </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;